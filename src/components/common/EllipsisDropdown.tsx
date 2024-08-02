import * as React from "react";

interface DropdownItem {
  label: string;
  color: string;
  onClick: () => void;
  icons?: React.ReactNode;
}

interface EllipsisDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

const EllipsisDropdown: React.FC<EllipsisDropdownProps> = ({
  items,
  isOpen,
  onClose,
}) => {
  return (
    <div className="">
      {isOpen && (
        <div className="absolute right-20 mt-2 w-40 bg-white shadow-lg rounded-md py-4 items-center">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
              style={{ color: item.color }}
            >
              {item.icons}
              <span className="ml-2">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EllipsisDropdown;
