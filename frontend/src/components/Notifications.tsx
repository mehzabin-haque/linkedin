import { useEffect, useMemo } from "react";
import useNotifications from "../hooks/useNotifcations";
import { FaBell } from "react-icons/fa";
import { formatDistanceToNowStrict } from "date-fns";
import NotificationItem from "./NotificationItem";

const NotificationsFeed = () => {
  const { data: fetchedNotifications = [], mutate } = useNotifications();



  useEffect(() => {
    mutate();
  }, []);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  console.log(fetchedNotifications);

  return (
    <div className="flex flex-col w-full">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row w-full items-center p-4 gap-4 border-b-[1px] border-neutral-800">
          <NotificationItem data={notification} />
        </div>
      ))}
    </div>
  );
}

export default NotificationsFeed;