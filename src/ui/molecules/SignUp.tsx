import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Signup = {
  fname: string;
  lname: string;
  email: string;
  phone: number;
  gender: string;
  password: string;
  confirmPw: string;
};

const SignUp = () => {
  const formSchema = yup.object().shape({
    fname: yup
      .string()
      .required("This field is required")
      .min(2, "Too short")
      .max(10, "Too long"),
    lname: yup
      .string()
      .required("This field is required")
      .min(2, "Too short")
      .max(10, "Too long"),
    email: yup
      .string()
      .required("This field is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
        "Invalid email"
      ),
    phone: yup
      .string()
      .matches(
        /^\+?[0-9]{1,3}[-. (]?\d{1,3}[-. )]?[-. ]?\d{1,4}[-. ]?\d{1,4}$/,
        "Invalid phone number"
      ),
    password: yup
      .string()
      .required("This field is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain atleast 1 number and speical character"
      ),
    confirmPw: yup
      .string()
      .required("Password is mendatory")
      .oneOf([yup.ref("password")]),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Signup>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Signup> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors?.fname ? true : false}>
        <FormLabel>First Name</FormLabel>
        <Input type="text" {...register("fname")} />
        {errors.fname && (
          <FormErrorMessage>{errors.fname?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors?.lname ? true : false}>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" {...register("lname")} />
        {errors.lname && (
          <FormErrorMessage>{errors.lname?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors?.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("email")} />
        {errors.email && (
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors?.phone ? true : false}>
        <FormLabel>Phone number</FormLabel>
        <Input
          {...register("phone", {
            pattern: new RegExp(
              /^\+?[0-9]{1,3}[-. (]?\d{1,3}[-. )]?[-. ]?\d{1,4}[-. ]?\d{1,4}$/
            ),
          })}
        />
        {errors.phone && (
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={errors.gender ? true : false}>
        <FormLabel>Choose your gender:</FormLabel>
        <Select
          {...register("gender", {
            required: true,
          })}
        >
          <option disabled value="">
            {" "}
            Choose one option
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
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

        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.confirmPw ? true : false}>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" {...register("confirmPw")} />

        {errors.confirmPw && (
          <FormErrorMessage>Password do not match</FormErrorMessage>
        )}
      </FormControl>

      <button className="btn" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
