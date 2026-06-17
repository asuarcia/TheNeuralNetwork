"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getLessonContext } from "@/content/curriculum";

// Marks a lesson complete (when signed in) and advances to the next lesson.
export async function markLessonComplete(formData: FormData) {
  const course = String(formData.get("course") ?? "");
  const lesson = String(formData.get("lesson") ?? "");
  const ctx = getLessonContext(course, lesson);
  const dest = ctx?.next ? `/learn/${course}/${ctx.next.slug}` : "/dashboard";

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const now = new Date().toISOString();
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_slug: `${course}/${lesson}`,
        status: "completed",
        completed_at: now,
        updated_at: now,
      });
    }
  }

  redirect(dest);
}
