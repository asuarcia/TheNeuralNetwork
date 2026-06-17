import "server-only";
import { promises as fs } from "fs";
import path from "path";

// Reads the raw MDX source for a lesson from the repo content folder.
// Returns null if the file doesn't exist yet (lesson not authored).
export async function readLessonSource(
  courseSlug: string,
  lessonSlug: string
): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "courses",
    courseSlug,
    `${lessonSlug}.mdx`
  );
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}
