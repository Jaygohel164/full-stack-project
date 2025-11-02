"use client";

import { resend } from "@/actions/resend-email";
import { MailCheck } from "lucide-react";
import { FC } from "react";
import { toast } from "./ui/use-toast";

interface verifyEmailProps {
  email: string;
}

const VerifyEmail: FC<verifyEmailProps> = ({ email }) => {
  const handleResendEmail = () => {
    resend(email).then((data: any) => {
      console.log(data.success);
      toast({
        title: "Success",
        description: data.success,
      });
    });
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto py-8">
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Please verify your email...</h1>
        <span className="mb-4">
          <MailCheck className="text-4xl text-pink-500 w-28 h-28" size={25} />
        </span>
        <p className="mb-2 text-center">
          Please verify your email address. We&apos;ve sent a confirmation email
          to: <br />
          <span className="font-semibold">{email}</span>
        </p>
        <p className="mb-4">
          Click the confirmation link in that email to begin using this site.
        </p>
        <p className="mb-2">
          Don&apos;t receive the email? Check your Spam folder. it may have been
          caught by a filter.
        </p>
        <p className="mb-2">
          If you still don&apos;t see it, you can{" "}
          <span
            className="text-pink-500 font-semibold cursor-pointer"
            onClick={handleResendEmail}
          >
            resend the confirmation email.
          </span>
        </p>
        <p>
          Wrong email address?{" "}
          <span className="text-pink-500 font-semibold">Change it.</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
