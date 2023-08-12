import { useSignIn } from 'react-auth-kit'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import { Card, Typography, Input, Button } from '@material-tailwind/react'
import toast from 'react-hot-toast'

type Props = {
  onButtonClick: () => void
}

function Login({ onButtonClick }: Props) {
  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const signIn = useSignIn();

  const onSubmit = async (data: any) => {
    await axios
      .post(`/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        toast.success('Logged in successfully')
        const id = response.data.userId

        signIn({
          token: response.data.token,
          expiresIn: 60 * 60 * 6,
          tokenType: 'Bearer',
          authState: { userId: response.data.userId, email: response.data.email, isLoggedIn: true, name: response.data.name },
        })

        window.location.href = `/feed/:${id}`
        console.log(response)
      })
      .catch((error) => {
        if (error.response.status === 401) toast.error('Invalid credentials')
        console.log(error.response.data)
      });
  };

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
          <Input
            crossOrigin={undefined} variant='standard'
            size='lg'
            label='Email'
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
  )
}

export default Login