import React, { useEffect, useRef } from "react";
import { DropdownItem } from "@/types/formSchema"; // Importing DropdownItem from your type file

interface EllipsisDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

const EllipsisDropdown: React.FC<EllipsisDropdownProps> = React.memo(
  ({ items, isOpen, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="absolute"
        ref={dropdownRef}
        role="menu"
        aria-expanded={isOpen}
      >
        <div className="absolute right-1 w-40 bg-white shadow-lg rounded-md py-2 z-50 mt-[-20px]">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.onClick();
                onClose(); // Close dropdown on item click
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
              style={{ color: item.color }}
              role="menuitem"
              tabIndex={0}
            >
              {item.icons && <span className="mr-2">{item.icons}</span>}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default EllipsisDropdown;
