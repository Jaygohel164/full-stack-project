import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="flex w-full h-full  mx-auto bg-white rounded-lg shadow-lg ">
      <div className="hidden bg-cover lg:block lg:w-1/3">
        <Image
          src="https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80"
          alt=""
          className="w-full h-full"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full px-6 py-8 md:px-8 lg:w-2/3 flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
