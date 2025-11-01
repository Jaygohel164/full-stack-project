"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { DiscribeSchema, SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
export const profileUpdate = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }


  const update = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
      profileCreated: true,
    },
  });

  return { success: "Profile Updated!" };
};

export const discribe = async (values: z.infer<typeof DiscribeSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const update = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });


  return { success: "Profile Updated!" };
};
