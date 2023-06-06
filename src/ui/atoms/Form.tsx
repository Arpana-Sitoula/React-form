import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  firstName: string
  lastName: string
}

const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

export default function Form() {
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, minLength:2 })} />
      {errors.firstName?.type === 'required' && <p role="alert">{errors.firstName.type}</p>}
      <input {...register("lastName", { required: true })} />
      {errors.lastName && <h1>Required</h1>}
      <input type="submit" />
    </form>
  );
}
