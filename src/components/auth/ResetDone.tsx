import { FC } from "react";
import Success from "../ui/notifications/Success";

export const ResetDone: FC = () => {
  return (
    <div className=" w-full  flex flex-col justify-center mx-auto my-[100px]">
      <Success />
    </div>
  );
};
