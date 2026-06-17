import { Lightbulb, Info, TriangleAlert } from "lucide-react";

type CalloutType = "tip" | "note" | "warning";

const styles: Record<CalloutType, { icon: typeof Info; cls: string; iconCls: string }> = {
  tip: { icon: Lightbulb, cls: "border-violet-500/30 bg-violet-500/5", iconCls: "text-violet-400" },
  note: { icon: Info, cls: "border-sky-500/30 bg-sky-500/5", iconCls: "text-sky-400" },
  warning: { icon: TriangleAlert, cls: "border-amber-500/30 bg-amber-500/5", iconCls: "text-amber-400" },
};

export function Callout({
  type = "tip",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { icon: Icon, cls, iconCls } = styles[type];
  return (
    <div className={`my-8 flex gap-4 rounded-xl border px-5 py-4 ${cls}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconCls}`} />
      <div className="text-neutral-300 leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}
