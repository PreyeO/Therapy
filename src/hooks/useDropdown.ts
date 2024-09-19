import { useState } from "react";

const useDropdown = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeDropdown = () => setOpenDropdownIndex(null);

  return { openDropdownIndex, toggleDropdown, closeDropdown };
};

export default useDropdown;
