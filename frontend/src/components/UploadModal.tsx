import { Button } from "@material-tailwind/react"
import { useState, useCallback, useRef } from "react"
import Modal from "./Modal"
import useUploadModal from "../hooks/useUploadModal"
import toast from "react-hot-toast"
import axios from "../api/axios"
import usePosts from "../hooks/usePosts"
import { useAuthUser } from "react-auth-kit"

type Props = {}

export default function UploadModal({ }: Props) {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const ref = useRef<HTMLInputElement>(null)
  const [body, setBody] = useState('')
  const auth = useAuthUser()
  const currentUser = auth()
  const { mutate: mutatePosts } = usePosts()
  const formData = new FormData()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    setSelectedFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    ref.current?.click()
  }

  const handleSubmit = useCallback(async () => {
    console.log(body)
    if (selectedFile) {
      setIsLoading(true)
      console.log(body)
      formData.append('body', body)
      formData.append('image', selectedFile, selectedFile.name)
      formData.append('userId', currentUser!.userId)
      
      console.log(body)
      
      console.log(formData.get('body'))

      await axios.post('/posts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          toast.success('Post created')
          mutatePosts()
          uploadModal.onClose()
        })
        .catch((err: any) => {
          toast.error('Something went wrong')
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
          setBody('')
          setSelectedFile(undefined)
          setPreview('')
        })
    }
    else {
      toast.error('Please select an image')
    }
  }, [selectedFile, body, currentUser!.userId, mutatePosts, formData])

  const bodyContent = (
    <div className="flex flex-col gap-6">
      {preview ? (
        <div className="flex flex-col p-4 gap-6 items-center justify-center">
          <textarea
            disabled={isLoading}
            onChange={(event) => setBody(event.target.value)}
            value={body}
            className="
                border border-black
                rounded-lg
                p-4
                disabled:opacity-80
                peer
                resize-none 
                w-full 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-black 
              "
            placeholder='What do you wanna talk about? ...'>
          </textarea>
          <img src={preview} alt={selectedFile!.name} className="rounded-lg" />
          <div className="flex items-end justify-end">
            <Button size='lg' onClick={handleSubmit}>Post</Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="p-4 flex flex-col items-center gap-2 rounded-lg cursor-pointer"
        >
          <Button fullWidth className="flex text-lg items-center gap-3 px-20 py-8 m-16">
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
            Select image to post
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            ref={ref}
          />
        </div>
      )}
    </div>
  )

  return (
    <Modal
      header={currentUser!.username}
      disabled={isLoading}
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      handleSubmit={handleSubmit}
      body={bodyContent}
    />
  )
}
