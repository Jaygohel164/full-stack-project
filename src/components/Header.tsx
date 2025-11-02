import { Lato } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Lato({
  subsets: ["latin"],
  weight: ["700"],
});

interface HeaderProps {
  label: string;
  title: string;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-start text-center justify-center">
      <h1 className={cn("text-4xl font-bold", font.className)}>{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
