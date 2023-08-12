import React, { useCallback, useMemo } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar } from '@material-tailwind/react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

type Props = {
  data: Record<string, any>
  userId?: string
}

export default function PostItem({ data = {}, userId }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    window.location.href = `/users/${data.user.id}`
  }, [data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

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
        <Avatar src={currentUser?.profileImage || '/placeholder.png'} alt='avatar' size='sm' />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className=" 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span
              // onClick={goToUser}
              className="
                text-gray-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-gray-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="mt-1">
            {data.body}
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
              {data.image && (
                <img src={data.image} alt="Loading..." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}