import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";

type Props = {};

export default function Sidebar({ }: Props) {
  const [name, setName] = useState('');
  const auth = useAuthUser();
  const currentUser = auth();
  const signOut = useSignOut();

  useEffect(() => {
    setName(currentUser?.name || '');
  }, []);

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-center gap-8'>
        <img src="/link.png" alt="Link Logo" width={100} className="mb-8 border-gradient" />
        <p className='font-bold text-3xl text-black mt-8'>
          {name }
        </p>
        {/* add button with sign out functionality */}
        <Button
  onClick={() => signOut()}
  size='lg'
  variant="gradient"
  ripple={true}
  className="flex items-center gap-3 bg-gradient-to-r from-black via-gray-800 to-black px-8 py-3 rounded-full text-white hover:shadow-lg transform hover:scale-105 transition-transform"
>
  Sign Out
</Button>
      </div>
    </div>
  );
}
