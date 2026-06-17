export function authErrorMessage(code: string | undefined): string | undefined {
  switch (code) {
    case "not_configured":
      return "Accounts aren't connected yet — add your Supabase keys to enable sign in.";
    case "oauth":
      return "Could not start the social sign-in. Please try again.";
    case "auth_callback":
      return "Sign-in link expired or was invalid. Please try again.";
    case "rate":
      return "Too many attempts. Please wait a minute and try again.";
    default:
      return undefined;
  }
}
