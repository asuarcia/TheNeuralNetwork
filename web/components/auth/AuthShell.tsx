import Link from "next/link";
import { Brain } from "lucide-react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden">
      {/* Dot grid + violet glow, matching the landing aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

      <Link href="/" className="relative z-10 flex items-center gap-2 mb-12 group">
        <Brain className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors" />
        <span className="text-xl font-bold tracking-tight">
          <span className="text-white">The</span>
          <span className="text-violet-400">Neural</span>
          <span className="text-purple-500">Network</span>
        </span>
      </Link>

      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </main>
  );
}
