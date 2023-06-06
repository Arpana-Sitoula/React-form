import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import {useForm, SubmitHandler} from 'react-hook-form'

type Inputs = {
    name: string,
    email: string,
    phone: number,
    gender: string,
};

const ChakraForm = () => {

const {register, handleSubmit, reset, formState:{errors}}  = useForm<Inputs>() ;
const onSubmit: SubmitHandler<Inputs> = data => 
{console.log(data);
reset()};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors?.name ? true:false}>
                <FormLabel>Name</FormLabel>
                <Input type='text' {...register('name', {required: true, maxLength: 20,minLength:5})}/>
                {errors?.name && <FormErrorMessage>{errors.name.type}</FormErrorMessage>}
            </FormControl>
            <Button type='submit'>Submit</Button>
        </form>
    )
}

export default ChakraForm