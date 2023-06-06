import {
  Button,
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
  name: string;
  email: string;
  phone: number;
  gender: string;
  password: string;
  confirmPw: string;
};

const SignUp = () => {
  const formSchema = yup.object().shape({
    password: yup.string(),
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
    defaultValues: {
      gender: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Signup> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors?.name ? true : false}>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          {...register("name", { required: true, maxLength: 20, minLength: 5 })}
        />
        {errors.name && <FormErrorMessage>{errors.name.type}</FormErrorMessage>}
      </FormControl>

      <FormControl isRequired isInvalid={errors?.name ? true : false}>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          {...register("name", { required: true, maxLength: 20, minLength: 5 })}
        />
        {errors.name && <FormErrorMessage>{errors.name.type}</FormErrorMessage>}
      </FormControl>

      <FormControl isRequired isInvalid={errors?.email ? true : false}>
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
        {errors.email?.type === "required" && (
          <FormErrorMessage>Email is required</FormErrorMessage>
        )}
        {errors.email?.type === "pattern" && (
          <FormErrorMessage>Invalid email address</FormErrorMessage>
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
        {errors.phone?.type === "pattern" && (
          <FormErrorMessage>Invalid phone number</FormErrorMessage>
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
        {errors.gender?.type === "required" && (
          <FormErrorMessage>This field is required</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormControl isRequired isInvalid={errors.password ? true : false}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/),
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

        <FormControl isInvalid={errors.confirmPw ? true : false}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" {...register("confirmPw")} />

          {errors.confirmPw && (
            <FormErrorMessage>Password do not match</FormErrorMessage>
          )}
        </FormControl>
      </FormControl>

      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUp;
