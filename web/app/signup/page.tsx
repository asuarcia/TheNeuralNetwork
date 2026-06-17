import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { authErrorMessage } from "@/lib/auth/errors";

export const metadata: Metadata = {
  title: "Create account — TheNeuralNetwork",
};

export default async function SignupPage(props: PageProps<"/signup">) {
  const sp = await props.searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/dashboard";
  const error = authErrorMessage(typeof sp.error === "string" ? sp.error : undefined);

  return (
    <AuthShell>
      <AuthForm mode="signup" next={next} initialError={error} />
    </AuthShell>
  );
}
