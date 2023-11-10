import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import { FaBell } from "react-icons/fa"
type Props = {
  data: Record<string, any>
}

export default function NotificationItem({ data }: Props) {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full items-center gap-2">
        <FaBell />
        <p className="">
          {data?.body}
        </p>
      </div>
      <p className="text-gray-600 text-sm">
        {createdAt}
      </p></div>
  )
}