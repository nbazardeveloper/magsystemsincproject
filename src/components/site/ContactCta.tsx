import { Button } from "@/components/site/Button";

type ContactCtaProps = {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "ghost";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function ContactCta({
  children,
  variant = "filled",
  className = "",
  onClick,
}: ContactCtaProps) {
  return (
    <Button href="/#contact" variant={variant} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}