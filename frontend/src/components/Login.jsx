import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const backend = 'http://localhost:5000';

export default function Login({ onButtonClick }) {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    await axios.post(`${backend}/login`, {
      email: data.email,
      password: data.password
    })
    .then((response) => {
      toast.success('Logged in successfully')
      window.location.href = '/'
      console.log(response);
    })
    .catch((error) => {
      toast.error('Invalid credentials')
    })
  }

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h3' color='blue'>
        Sign In
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input variant='standard' size='lg' label='Email' />
          <Input
            variant='standard'
            type='password'
            size='lg'
            label='Password'
          />
        </div>
        <Button
          type='submit'
          ripple={true}
          className='mt-6 tracking-[2px] text-sm rounded-full'
          fullWidth
        >
          Sign In
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Don't have an account?{' '}
          <Button onClick={onButtonClick} size='lg' variant='text'>
            Sign Up
          </Button>
        </Typography>
      </form>
    </Card>
  );
}
