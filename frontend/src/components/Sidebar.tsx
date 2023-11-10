import { Button } from "@material-tailwind/react"
import { useState, useEffect } from "react"
import { useAuthUser, useSignOut } from "react-auth-kit"

type Props = {}

export default function Sidebar({ }: Props) {
  const [name, setName] = useState('')
  const auth = useAuthUser()
  const currentUser = auth()
  const signOut = useSignOut()

  useEffect(() => {
    setName(currentUser?.name || '')
  }, [])

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-center gap-8'>
        <p className="text-4xl tracking-[2px] font-bold text-blue-700">LinkedIn</p>
        <p className='font-bold text-3xl mt-8'>
          {name}
        </p>
        {/* add button with sign out functionality */}
        <Button onClick={() => signOut()} size='lg' variant="gradient" className="flex items-center gap-3">
          Sign Out
        </Button>
      </div>
    </div>
  )
}