import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar } from '@material-tailwind/react';
import axios from '../api/axios';

type Props = {
  data: Record<string, any>
  userId?: string
}

export default function PostItem({ data = {} }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()
  const [user, setUser] = useState({} as Record<string, any>)

  // const goToUser = useCallback((ev: any) => {
  //   ev.stopPropagation();
  //   window.location.href = `/users/${data.user.id}`
  // }, [data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt])

  useEffect(() => {
    // fetch info about the user
    const user = async () => {
      await axios.get(`/users/${currentUser?.userId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    user()
  }, [])

  return (
    <div
      className="
        border-b-[1px] 
        border-gray-800 
        p-5 
        cursor-pointer 
        hover:bg-blue-50 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar src={user?.profileImage || '/placeholder.png'} alt='avatar' size='sm' />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              // onClick={goToUser}
              className=" 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {currentUser?.name}
            </p>
            
            <span className="text-gray-600 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="mt-1">
            {data?.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-gray-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-blue-400
            ">
              {data?.image && (
                <img src={data?.image} alt="Loading..." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}