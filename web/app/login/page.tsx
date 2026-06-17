import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";
import { authErrorMessage } from "@/lib/auth/errors";

export const metadata: Metadata = {
  title: "Sign in — TheNeuralNetwork",
};

export default async function LoginPage(props: PageProps<"/login">) {
  const sp = await props.searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/dashboard";
  const error = authErrorMessage(typeof sp.error === "string" ? sp.error : undefined);

  return (
    <AuthShell>
      <AuthForm mode="login" next={next} initialError={error} />
    </AuthShell>
  );
}
