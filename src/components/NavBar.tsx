import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import UserButton from "./auth/user-button";

export const NavLinks = [
  { href: "/", key: "Inspiration", text: "Inspiration" },
  { href: "/", key: "Find Projects", text: "Find Projects" },
  { href: "/", key: "Learn Development", text: "Learn Development" },
  { href: "/", key: "Career Advancement", text: "Career Advancement" },
  { href: "/", key: "Hire Developers", text: "Hire Developers" },
];

const Navbar = async () => {
  const user = await currentUser();
  const userData = await db.user.findUnique({ where: { id: user?.id } });

  return (
    <nav className="flex justify-between items-center px-8 w-full border-b border-nav-border gap-4">
      <div className="flex-1 flex justify-start items-center gap-10">
        <Link href="/" className="flex justify-center items-center pb-4">
          <Image
            src="/image.png"
            width={100}
            height={100}
            className="w-20"
            alt="Flexible image"
          ></Image>
        </Link>
        <ul className="lg:flex hidden font-normal text-sm gap-7">
          {NavLinks.map((link, index) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center gap-4">
        <UserButton image={userData?.image} />
        <Button className="bg-success hover:bg-pink-500">Upload</Button>
      </div>
    </nav>
  );
};

export default Navbar;
