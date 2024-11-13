import CloseIcon from "@/svg/Close";
import NotificationIcon from "@/svg/Notifications";

const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]">
      {/* Container */}
      <div className="flex w-full items-center justify-between">
        {/*Left  */}
        <div className="flex items-center gap-x-4">
          <NotificationIcon className="dark:fill-blue_1" />
          <div className="flex flex-col">
            <span className="text-white">Get notified of new messages</span>
            <span className="text-gray-400 mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
            </span>
          </div>
        </div>
        {/* Right */}
        <div>
          <CloseIcon className="dark:fill-dark_svg_2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
