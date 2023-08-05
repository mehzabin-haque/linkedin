import axios from "axios"
import { useCallback, useState } from "react"
import { useAuthUser } from "react-auth-kit"
import { toast } from "react-hot-toast"
import usePosts from "../hooks/usePosts"

type Props = {}

export default function Form({ }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()

  const { mutate: mutatePosts } = usePosts()

  const [body, setBody] = useState('')
  //TODO add image uploading functionality here

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)
    await axios.post('/posts', {
      body,
      //TODO add image uploading functionality here
      })
      .then(() => {
        toast.success('Post created successfully')
        setBody('')
        mutatePosts()
        // mutatePost()
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
      //TODO write the actual form
      <div>Form</div>
    )
  }