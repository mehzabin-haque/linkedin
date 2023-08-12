import { useCallback } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface Props {
  header?: string
  disabled?: boolean
  isOpen: boolean
  onClose: () => void
  handleSubmit: () => void
  body?: React.ReactElement
}

export default function Modal({ header, disabled, isOpen, onClose, handleSubmit, body }: Props) {
  const handleClose = useCallback(() => {
    if (disabled) return

    onClose()
  }, [onClose, disabled])

  if (!isOpen) return null

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-gray-900
          bg-opacity-90
        "
      >
        <div className="relative w-full lg:w-3/6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full
            bg-white 
            outline-none 
            focus:outline-none
            "
          >
            <div className="
              flex 
              items-center 
              justify-between 
              pt-6 pr-6
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">
                {header}
              </h3>
              <button
                className="
                  pr-1 pt-1 
                  ml-auto
                  border-0  
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div className="relative px-10 pb-4 flex-auto">
              {body}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}