"use client";
import { Header } from "@/components/Header";
import { FormError } from "@/components/form-error";

import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { profileUpdate } from "@/actions/profile";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [uploadedImage, setUploadedImage] = useState<any>("/ideogram.jpg");
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();

  const router = useRouter();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      location: undefined,
      image: user?.image || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      profileUpdate(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            router.push("/welcome");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const ProfilePicture = () => {
    return (
      <div className="relative">
        {isLoading ? (
          <div className="w-28 h-28 rounded-full bg-gray-300 animate-pulse"></div>
        ) : (
          <Image
            src={uploadedImage || user?.image}
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-28 h-28 border-2 p-1 border-dashed rounded-full object-cover"
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto flex justify-center items-center flex-col space-y-4">
      <Card className="md:w-[600px] xl:w-[800px] w-full border-none shadow-none">
        <CardHeader>
          <Header
            label="Let others get to know you better! You can do these later"
            title="Welcome Let`s create your profile"
          />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <div className="w-full flex justify-start items-center">
                  <p className="text-xl font-bold text-center">Add an avatar</p>
                </div>

                <div className="flex justify-start gap-10 items-center ">
                  <ProfilePicture />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadButton
                            {...field}
                            className="ut-button:bg-pink-400 hover:ut-button:bg-pink-500"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setUploadedImage(res[0].url);
                              form.setValue("image", res[0].url);
                              setIsLoading(false);
                            }}
                            onUploadError={(error: Error) => {
                              toast(`ERROR! ${error.message}`);
                            }}
                            onUploadBegin={() => {
                              setIsLoading(true);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold">
                        Add your location
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter a location"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isLoading}
                type="submit"
                className="bg-pink-400 hover:bg-pink-500 px-10"
              >
                Next
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
