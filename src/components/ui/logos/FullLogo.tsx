import Logo1 from "@/assets/image/Logo1.png";
import { FC } from "react";

interface LogoProps {
  width: number;
  height: number;
}

const FullLogo: FC<LogoProps> = ({ width, height }) => {
  return (
    <img
      src={Logo1}
      alt="This is R&R therapy full company logo"
      width={width}
      height={height}
    />
  );
};

export default FullLogo;
