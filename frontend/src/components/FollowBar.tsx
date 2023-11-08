import { useAuthUser } from "react-auth-kit"
import useUsers from "../hooks/useUsers"
import { Avatar } from "@material-tailwind/react"

type Props = {}

export default function FollowBar({ }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()

  const { data: users = [] } = useUsers()

  if (users.length === 0) return null

  return (
    <div className="px-6 py-4 hidden lg:block">
        <div className="rounded-xl p-4">
          <h2 className="text-xl font-semibold">Following</h2>
          <div className="flex flex-col gap-6 mt-4">
            {users.map((user: Record<string, any>) => (
              (user.email !== currentUser!.email) &&
              <div key={user.id} className="flex flex-row gap-4">
                <Avatar src={user?.profileImage || '/placeholder.png'} alt='avatar' size='sm' />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}