"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectLayoutProps {
  children: React.ReactNode;
  shouldRedirect: boolean;
  redirectUrl: string;
}

const RedirectLayout = ({
  children,
  shouldRedirect,
  redirectUrl,
}: RedirectLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(redirectUrl);
    }
  }, [shouldRedirect, redirectUrl, router]);

  return <>{children}</>;
};

export default RedirectLayout;
