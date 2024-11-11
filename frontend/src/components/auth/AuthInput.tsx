interface AuthInputProps {
  error: string | undefined;
  name: string;
  type: string;
  placeholder: string;
  register: any;
}

const AuthInput = ({
  error,
  name,
  type,
  placeholder,
  register,
}: AuthInputProps) => {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        {...register(name)}
        className="w-full dark:bg-dark_bg_3 text-base py-2 outline-none px-2"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AuthInput;
