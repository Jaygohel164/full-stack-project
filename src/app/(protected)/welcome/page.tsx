"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { DiscribeSchema, SettingsSchema } from "@/schemas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { discribe } from "@/actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RadioGroup } from "@nextui-org/react";
import FormQuestion from "@/components/form-question";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WelcomePage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof DiscribeSchema>>({
    resolver: zodResolver(DiscribeSchema),
    defaultValues: {
      discribe: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof DiscribeSchema>) => {
    startTransition(() => {
      discribe(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            router.push("/dashboard");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto flex justify-center items-center flex-col h-full">
      <Card className="border-none shadow-none space-y-8 h-full md:flex justify-center items-center flex-col">
       
        <div className="w-full flex flex-col gap-y-4 mt-10  text-center items-center justify-center">
            <h1 className="text-4xl font-bold">
              Welcome Let`s create your profile
            </h1>
            <p className="text-muted-foreground text-sm">
              What brings you to here
            </p>
          </div>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6 flex justify-center items-center flex-col" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 ">
                <div className="flex justify-center gap-8 items-center">
                  <FormField
                    control={form.control}
                    name="discribe"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            color="success"
                            className="w-full py-4 flex justify-center items-center"
                            {...field}
                          >
                            <div className="flex w-full justify-center items-center gap-8 flex-col md:flex-row ">
                              <FormQuestion
                                description="I`m a designer looking to share my work"
                                value="I`m a designer looking to share my work"
                              >
                                <Image
                                  src={"/image.png"}
                                  height={1000}
                                  width={1000}
                                  alt=""
                                  className="w-44"
                                />
                              </FormQuestion>
                              <FormQuestion
                                description="I`m looking to hire a designer"
                                value="I`m looking to hire a designer"
                              >
                                <Image
                                  src={"/image.png"}
                                  height={1000}
                                  width={1000}
                                  alt=""
                                  className="w-44"
                                />
                              </FormQuestion>
                              <FormQuestion
                                description="I`m looking for design inspiration"
                                value="I`m looking for design inspiration"
                              >
                                <Image
                                  src={"/image.png"}
                                  height={1000}
                                  width={1000}
                                  alt=""
                                  className="w-44"
                                />
                              </FormQuestion>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit" className="bg-pink-400 hover:bg-pink-500 px-10">
                Finish
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;
