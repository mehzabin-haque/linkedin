import { useCallback, useState } from "react"
import { useAuthUser } from "react-auth-kit"
import { toast } from "react-hot-toast"
import usePosts from "../hooks/usePosts"
import { Avatar, Button } from "@material-tailwind/react"
import axios from '../api/axios'
import useUploadModal from "../hooks/useUploadModal"

type Props = {}

export default function Form({ }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()
  const { mutate: mutatePosts } = usePosts()
  const uploadModal = useUploadModal()
  const [body, setBody] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)
    console.log(currentUser!)
    await axios.post('/posts', {
      userId: currentUser!.userId,
      body
    })
      .then(() => {
        toast.success('Post created successfully')
        setBody('')
        mutatePosts()
      })
      .catch((err: any) => {
        toast.error('Something went wrong')
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [body, mutatePosts])

  return (
    <div className="border-b-[1px] border-gray-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar src={currentUser?.profileImage || '/placeholder.png'} alt='avatar' size='sm' />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(event) => setBody(event.target.value)}
            value={body}
            className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-gray-500 
              "
            placeholder='Start a post'>
          </textarea>
          <hr
            className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-gray-800 
                transition"
          />

          <div className="mt-4 flex flex-row justify-between">
            <Button onClick={uploadModal.onOpen} size='sm' disabled={isLoading} variant="gradient" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Photo
            </Button>
            {!isLoading && body ? (
              <Button size='sm' onClick={onSubmit}>Post</Button>
            ) : (
              <Button size='sm' disabled>Post</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}