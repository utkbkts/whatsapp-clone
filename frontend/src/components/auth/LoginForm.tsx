import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/validation/auth-schema";
import AuthInput from "./AuthInput";
import { useUserStore } from "@/store/user-store";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { loading, signIn } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await signIn(data);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">welcome back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <div>
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-semibold text-blue_1 hover:text-blue_2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
