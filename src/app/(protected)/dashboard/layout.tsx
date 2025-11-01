import NavBar from "@/components/NavBar";
import VerifyEmail from "@/components/verify-email";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const user = await currentUser();
  const userData = await db.user.findUnique({ where: { id: user?.id } });

  return (
    <>
      <div className="relative w-full  top-0 left-0">
        <NavBar />
      </div>
      <div className="md:p-10 w-full h-full flex flex-col gap-y-10 items-center justify-center">
        {userData?.emailVerified ? (
          children
        ) : (
          <VerifyEmail email={userData?.email ?? ""} />
        )}
      </div>
    </>
  );
};

export default Layout;
