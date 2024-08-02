import { useState } from "react";

const useDropdown = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const closeDropdown = () => setOpenDropdownIndex(null);

  return { openDropdownIndex, toggleDropdown, closeDropdown };
};

export default useDropdown;
