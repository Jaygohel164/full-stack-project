"use server";

import * as z from "zod";
import { signIn } from "next-auth/react";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // If email verification is required:
  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(existingUser.email);
  //   await sendVerificationEmail(verificationToken.email, verificationToken.token);
  //   return { success: "Confirmation email sent!" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login Successful!" };
  } catch (error) {
    console.error("Login failed:", error);

    if (error instanceof Error) {
      if (error.message.includes("CredentialsSignin")) {
        return { error: "Invalid credentials!" };
      }
      return { error: error.message || "Something went wrong!" };
    }

    return { error: "Unexpected error occurred!" };
  }
};
