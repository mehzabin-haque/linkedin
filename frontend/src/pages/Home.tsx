import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"

type Props = {}

function Home({}: Props) {
  const [signin, setSignin] = useState(true)

  const handleButtonClick = () => {
    setSignin(!signin)
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen">
  <div className="flex flex-col xl:flex-row items-center justify-center space-y-10 xl:space-y-0 xl:space-x-10">
    <div className="flex flex-col  items-center justify-center w-full">
      <img src="/link.png" alt="Link Logo" width={100} className="mb-8" />
      {signin ? <Login onButtonClick={handleButtonClick} /> : <Register onButtonClick={handleButtonClick} />}
    </div>
  </div>
</div>

  )
}

export default Home