import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/validation/auth-schema";
import AuthInput from "./AuthInput";
import { useUserStore } from "@/store/user-store";
import { Link } from "react-router-dom";
import PictureInput from "./PictureInput";
import { useState } from "react";

const RegisterForm = () => {
  const { loading, signup } = useUserStore();
  const [readablePicture, setReadablePicture] = useState<string | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      status: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    await signup({ ...data, picture });
  };
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name={"name"}
            placeholder="Full Name"
            type="text"
            register={register}
            error={errors.name?.message}
          />
          <AuthInput
            name={"email"}
            placeholder="Email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <AuthInput
            name={"status"}
            placeholder="Status(Optional)"
            type="text"
            register={register}
            error={errors.status?.message}
          />
          <AuthInput
            name={"password"}
            placeholder="Password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <PictureInput
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />
          <button
            className="w-full font-semibold py-2 bg-black/60 text-white focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300 focus:scale-105"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-semibold text-blue_1 hover:text-blue_2"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
