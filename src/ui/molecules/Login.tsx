import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Login = {
  email: string;
  password: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = (data) => {
    reset();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register("email", {
            required: true,
            pattern: new RegExp(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            ),
          })}
        />
        {errors.email?.type === "pattern" && (
          <FormErrorMessage>Invalid email</FormErrorMessage>
        )}
        {errors.email?.type === "required" && (
          <FormErrorMessage>Email is required</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.password ? true : false}>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: new RegExp(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            ),
          })}
        />
        {errors.password?.type === "required" && (
          <FormErrorMessage>This field is required</FormErrorMessage>
        )}
        {errors.password?.type === "minLength" && (
          <FormErrorMessage>Password is too short</FormErrorMessage>
        )}
        {errors.password?.type === "pattern" && (
          <FormErrorMessage>
            Password must contain number and special character
          </FormErrorMessage>
        )}
      </FormControl>
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
