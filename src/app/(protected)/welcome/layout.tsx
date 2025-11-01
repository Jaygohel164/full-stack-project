import RedirectLayout from "@/components/RedirectLayout";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  // const user = await currentUser();
  // const userData = await db.user.findUnique({ where: { id: user?.id } });

  // if (userData?.discribe) {
  //   return (
  //     <RedirectLayout redirectUrl="/dashboard" shouldRedirect={true}>
  //       {children}
  //     </RedirectLayout>
  //   );
  // }
  return (
    <div className="md:p-10 w-full h-full flex flex-col gap-y-10 items-center justify-center ">
      {children}
    </div>
  );
};

export default Layout;
