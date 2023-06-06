import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: number;
  gender: string;
};

const ChakraForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors?.name ? true : false}>
        <FormLabel>Name</FormLabel>
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ChakraForm;
