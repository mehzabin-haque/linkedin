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
      <div className="flex  items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <div className="text-center">
                    
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign Up</h2>
                </div>

                <form className="mt-6 w-80 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Your form inputs here */}
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

      <Button
          type='submit'
          ripple={true}
          className='mt-6 tracking-[2px] text-sm rounded-full'
          fullWidth
        >
          Sign Up
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Already a member?{' '}
          <Button onClick={onButtonClick} size='lg' variant='text'>
            Sign In
          </Button>
        </Typography>
                </form>

            </div>
        </div>
    </Card>
  )
}

export default Register
