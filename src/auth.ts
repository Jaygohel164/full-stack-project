// import {NextAuth} from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// import { db } from "@/lib/db";
// import { getUserById } from "@/data/user";
// import { getAccountByUserId } from "@/data/account";
// import authConfig from "@/auth.config";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider !== "credentials") return true;
//       return true;
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email as string;
//         session.user.isOAuth = token.isOAuth as boolean;
//         session.user.image = token.picture;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);
//       if (!existingUser) return token;

//       const existingAccount = await getAccountByUserId(existingUser.id);

//       token.isOAuth = !!existingAccount;
//       token.name = existingUser.name;
//       token.email = existingUser.email;

//       return token;
//     },
//   },
//   ...authConfig,
// });
