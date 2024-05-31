import { useState } from "react";
import { UserCategory } from "@/components/auth/UserCategory";
import { RegisterDataType } from "@/types";

const Category = () => {
  const [userType, setUserType] = useState<
    RegisterDataType["userType"] | undefined
  >(undefined);

  const handleNext = () => {
    console.log("Next button clicked");
    // Add your logic to handle the next step
  };

  const handleType = (type: RegisterDataType["userType"]) => {
    setUserType(type);
  };

  return (
    <main className="h-screen">
      <UserCategory
        handleNext={handleNext}
        handleType={handleType}
        type={userType}
      />
    </main>
  );
};

export default Category;
