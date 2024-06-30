import { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M9.5 3.5H13.5V7.5"
        stroke="#8BA05F"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 3.5L7.85 9.15C7.75654 9.24161 7.63088 9.29293 7.5 9.29293C7.36912 9.29293 7.24346 9.24161 7.15 9.15L4.85 6.85C4.75654 6.75839 4.63088 6.70707 4.5 6.70707C4.36912 6.70707 4.24346 6.75839 4.15 6.85L0.5 10.5"
        stroke="#8BA05F"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
