import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import Form from "../components/Form"
import NotificationsFeed from "../components/Notifications"

type Props = {}

export default function Feed({ }: Props) {
  return (
    <div className='h-screen pt-4 lg:pt-16'>
      <div className="container h-full mx-auto px-8 xl:px-20">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-2">
            <Sidebar/>
          </div>
          <div className="col-span-8 lg:col-span-7 border-x-[1px] border-neutral-800">
            <Form />
            <Post />
          </div>
          <div className="col-span-3">
            <NotificationsFeed />
          </div>
        </div>
      </div>
    </div>)
}