import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/validation/auth-schema";
import AuthInput from "./AuthInput";

const RegisterForm = () => {
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
    },
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
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
            name={"password"}
            placeholder="Password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <button
            className="w-full font-semibold py-2 bg-black/60 text-white focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300 focus:scale-105"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
