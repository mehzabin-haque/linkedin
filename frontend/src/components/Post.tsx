import { useAuthUser } from "react-auth-kit"
import usePosts from "../hooks/usePosts"
import PostItem from "./PostItem"

type Props = {}

export default function Post({ }: Props) {
  const auth = useAuthUser()
  const currentUser = auth()
  
  const { data: posts = [] } = usePosts()


  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={currentUser?.userId} key={post.id} data={post} />
      ))}
    </>
  )
}