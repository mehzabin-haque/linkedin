import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import { FaBell } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AiFillClockCircle } from "react-icons/ai";

type Props = {
  data: Record<string, any>;
};

export default function NotificationItem({ data }: Props) {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full items-center gap-4">
        <IconContext.Provider value={{ color: "#ff7e5f", size: "1.5em" }}>
          <FaBell />
        </IconContext.Provider>
        <p className="text-lg font-semibold text-blue-700">
          {data?.body}
        </p>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <IconContext.Provider value={{ color: "#a0aec0", size: "1em" }}>
          <AiFillClockCircle />
        </IconContext.Provider>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
