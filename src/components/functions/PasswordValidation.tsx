import { useEffect, useState } from "react";

interface PasswordValidationProps {
  password: string;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
}) => {
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordRequirements({
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    });
  }, [password]);

  return (
    <div className="flex justify-between mb-4">
      <div
        className={`flex items-center justify-center flex-col  ${
          passwordRequirements.minLength ? "text-green-500 " : "text-gray-500 "
        }`}
      >
        <span className="font-normal text-base pb-4">6+</span>
        <span className="font-normal text-sm text-[#B7B7B7]">Characters</span>
      </div>
      <div
        className={`flex items-center justify-center flex-col ${
          passwordRequirements.hasUpperCase
            ? "text-green-500 "
            : "text-gray-500 "
        }`}
      >
        <span className="font-normal text-base pb-4">AA</span>
        <span className="font-normal text-sm text-[#B7B7B7]">Uppercase</span>
      </div>
      <div
        className={`flex items-center justify-center flex-col ${
          passwordRequirements.hasLowerCase
            ? "text-green-500 "
            : "text-gray-500 "
        }`}
      >
        <span className="font-normal text-base pb-4">Aa</span>
        <span className="font-normal text-sm text-[#B7B7B7]">Lowercase</span>
      </div>
      <div
        className={`flex items-center justify-center flex-col ${
          passwordRequirements.hasNumber ? "text-green-500 " : "text-gray-500 "
        }`}
      >
        <span className="font-normal text-base pb-4">123</span>
        <span className="font-normal text-sm text-[#B7B7B7]">Numbers</span>
      </div>
      <div
        className={`flex items-center justify-center flex-col ${
          passwordRequirements.hasSpecialChar
            ? "text-green-500 "
            : "text-gray-500 "
        }`}
      >
        <span className="font-normal text-base pb-4">#*+</span>
        <span className="font-normal text-sm text-[#B7B7B7]">
          Special Character
        </span>
      </div>
    </div>
  );
};

export default PasswordValidation;
