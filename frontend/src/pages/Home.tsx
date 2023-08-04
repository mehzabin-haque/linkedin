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
    <>
      <div className="mt-10 flex flex-col xl:flex-row items-center justify-center h-[78vh] space-y-10 xl:space-x-[-20rem]">
        <div className="mt-4 flex flex-col space-y-10 items-center justify-center w-full">
          <img src="/logo.png" width={200} className="" />
          <p className="text-3xl md:text-3xl leading-tight">
            Find jobs through your community
          </p>
        </div>
        <div className="h-full xl:w-full flex items-center justify-center">
          {(signin === true)?
            ( <Login onButtonClick={handleButtonClick} /> ) 
            :
            ( <Register onButtonClick={handleButtonClick} />)
          }
        </div>
      </div>
    </>
  )
}

export default Home