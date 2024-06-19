import * as React from "react";

interface DropdownProps {
  items: { label: string; onClick: () => void }[];
  isOpen: boolean;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bg-white border shadow-md z-10 translate-x-[-100px] translate-y-[-15px] w-[149px] py-2 rounded-md">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="p-1 hover:bg-gray-200"
            onClick={() => {
              onClose();
              item.onClick();
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
