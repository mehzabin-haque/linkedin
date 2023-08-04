import { Avatar } from "@material-tailwind/react"
import { useState, useEffect } from "react"

type Props = {}

export default function Sidebar({ }: Props) {
  const [img, setImg] = useState('')
  const [name, setName] = useState('')

  //unnecessary useEffect, replace this with data from fetched user
  useEffect(() => {
    setName('Shazzad Hossain')
    setImg('/placeholder.png')
  }, [])

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-center'>
        <Avatar src={img} alt='avatar' size='xxl' />
        <p className='font-bold text-2xl mt-8'>
          {name}
        </p>
      </div>
    </div>
  )
}