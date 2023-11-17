import { useEffect, useMemo, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, Button } from '@material-tailwind/react';
import axios from '../api/axios';

type Props = {
  data: Record<string, any>;
  userId?: string;
};

export default function PostItem({ data = {} }: Props) {
  const auth = useAuthUser();
  const currentUser = auth();
  const [user, setUser] = useState({} as Record<string, any>);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  useEffect(() => {
    // fetch info about the user
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${currentUser?.userId}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [currentUser?.userId]);

  return (
    <div
      className="
        border rounded-md
        bg-white
        p-5 
        cursor-pointer 
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar
          src={user?.profileImage || '/placeholder.png'}
          alt="avatar"
          size="sm"
          className="border-2 border-blue-400 rounded-full"
        />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="
                font-semibold 
                cursor-pointer 
                hover:underline
                text-lg
              "
            >
              {currentUser?.name}
            </p>
            <span className="text-gray-600 text-sm">{createdAt}</span>
          </div>
          <div
            className="
              mt-2 
              text-gray-800
              text-base
              leading-6
              max-h-28
              overflow-hidden
            "
          >
            {data?.body}
          </div>
          {data?.image && (
            <div className="mt-3">
              <img src={data?.image} alt="Post Image" className="rounded-md shadow-md" />
            </div>
          )}
          <div className="flex flex-row items-center mt-3 gap-4">
            <Button
              color="blue"
              size="sm"
              ripple={true}
              onClick={() => console.log('Like clicked')}
            >
              Like
            </Button>
            <Button
              color="pink"
              size="sm"
              ripple={true}
              onClick={() => console.log('Comment clicked')}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
