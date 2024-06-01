import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/logos/Logo";

interface InitialAnimationProps {
  onAnimationComplete: () => void;
}

const WelcomeAnimation: React.FC<InitialAnimationProps> = ({
  onAnimationComplete,
}) => {
  const [showInitialBackground, setShowInitialBackground] = useState(true);
  const [showInitialLogo, setShowInitialLogo] = useState(false);
  const [expandDiv, setExpandDiv] = useState(false);

  useEffect(() => {
    const backgroundTimer = setTimeout(() => {
      setShowInitialBackground(false);
      setShowInitialLogo(true);
    }, 2000);

    const logoTimer = setTimeout(() => {
      setExpandDiv(true);
    }, 4000);

    const completeTimer = setTimeout(() => {
      localStorage.setItem("animationComplete", "true");
      onAnimationComplete();
    }, 5000);

    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <motion.div
      initial={{ backgroundColor: "#6D7C43" }}
      animate={{ backgroundColor: showInitialLogo ? "#6D7C43" : "transparent" }}
      transition={{ duration: 1 }}
      className="flex flex-col justify-center items-center h-screen w-full bg-main-background"
    >
      {showInitialBackground && (
        <div className="flex justify-center items-center h-screen w-full bg-[#6D7C43] bg-main-background" />
      )}

      {showInitialLogo && !expandDiv && (
        <motion.div
          initial={{ scale: 0.2, scaleX: 4 }}
          animate={{ scale: 1, scaleX: 1 }}
          transition={{
            type: "spring",
            ease: "linear",
            bounce: 0.5,
            x: { duration: 1 },
          }}
          className="flex flex-col justify-center items-center"
        >
          <div className="logo bg-white rounded-full w-40 h-40 flex justify-center items-center">
            <Logo />
          </div>
        </motion.div>
      )}

      {expandDiv && (
        <motion.div
          initial={{
            width: "40%",
            height: "40%",
            borderRadius: "50%",
            backgroundColor: "#6D7C43",
            position: "absolute",
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: "100%",
            height: "100%",
            borderRadius: "10%",
            backgroundColor: "#ffffff",
            zIndex: 1,
          }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center w-full h-full bg-main-background"
        >
          <div className="logo w-full h-full flex justify-center items-center">
            <Logo />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WelcomeAnimation;
