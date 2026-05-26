import { Link } from "@tanstack/react-router";

export function Button({
  children,
  variant = "filled",
  href,
  to,
  type,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "ghost";
  href?: string;
  to?: string;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 h-11 text-[14px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    filled: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-foreground/20 text-foreground hover:bg-foreground/5",
    ghost: "text-primary hover:opacity-80",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick}>{children}</a>;
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
