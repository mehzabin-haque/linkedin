import FollowBar from "../components/FollowBar"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import Form from "../components/Form"

type Props = {}

export default function Feed({ }: Props) {
  return (
    <div className='h-screen pt-4 lg:pt-16'>
      <div className="container h-full mx-auto px-10 xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            <Form />
            <Post />
          </div>
          <FollowBar />
        </div>
      </div>
    </div>)
}