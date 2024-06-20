import * as React from "react";

interface DropdownProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bg-white border shadow-md z-10 translate-x-[-100px] translate-y-[-15px] w-[149px] py-7 rounded-md pl-3">
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center p-1 hover:bg-gray-200"
            onClick={() => {
              onClose();
              item.onClick();
            }}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
