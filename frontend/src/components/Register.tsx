import { Card, Typography, Input, Button } from '@material-tailwind/react'
import axios from '../api/axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSignIn } from 'react-auth-kit'

type Props = {
  onButtonClick: () => void
}

function Register({ onButtonClick }: Props) {
  const form = useForm()
  const { register, handleSubmit, formState } = form
  const signIn = useSignIn();
  const { errors } = formState
  
  const onSubmit = async (data: any) => {
    console.log('here')
    await axios
      .post(`/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        toast.success('Registered successfully')
        const id = response.data.userId

        signIn({
          token: response.data.token,
          expiresIn: 60 * 60 * 6,
          tokenType: 'Bearer',
          authState: { userId: response.data.id, email: response.data.email, isLoggedIn: true, name: response.data.name },
        })

        console.log(response)
        window.location.href = `/feed/:${id}`
      })
      .catch((error) => {
        if (error.response.status === 450) {
          toast.error('Email already exists')
        }
        console.log(error)
      })
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h3' color='blue'>
        Sign Up
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            crossOrigin={undefined} variant='standard'
            size='lg'
            label='Name'
            id='name'
            {...register('name', {
              required: { value: true, message: 'Name is required' },
            })}          />
          {errors?.name && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
              Name is required
            </p>
          )}
          <Input
            crossOrigin={undefined} variant='standard'
            size='lg'
            type='email'
            label='Email'
            id='email'
            {...register('email', {
              required: { value: true, message: 'Email required' },
            })}          />
          {errors?.email && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
              Email is required
            </p>
          )}
          <Input
            crossOrigin={undefined} variant='standard'
            type='password'
            size='lg'
            label='Password'
            id='password'
            {...register('password', {
              required: { value: true, message: 'Password required' },
            })}          />
          {errors?.password && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
              Password is required
            </p>
          )}
        </div>
        <Button
          type='submit'
          ripple={true}
          className='mt-6 tracking-[2px] text-sm rounded-full'
          fullWidth
        >
          Sign Up
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Already have an account?{' '}
          <Button onClick={onButtonClick} size='lg' variant='text'>
            Sign In
          </Button>
        </Typography>
      </form>
    </Card>
  )
}

export default Register
