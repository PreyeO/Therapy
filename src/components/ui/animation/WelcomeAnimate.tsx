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
    }, 2000); // delay for showing the initial background color

    const logoTimer = setTimeout(() => {
      setExpandDiv(true);
    }, 4000); // duration for the initial logo pop-up effect

    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 5000); // delay for ending the animation

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
            width: "40%", // Initial width of the logo div
            height: "40%", // Initial height of the logo div
            borderRadius: "50%", // Initial border radius to keep it circular
            backgroundColor: "#6D7C43", // Initial background color (same as the background)
            position: "absolute", // Position the logo div absolutely for expansion
            top: "50%", // Align to the center vertically
            left: "50%", // Align to the center horizontally
            translateX: "-50%", // Adjust horizontal position to center
            translateY: "-50%", // Adjust vertical position to center
          }}
          animate={{
            width: "100%", // Expand to fill the screen horizontally
            height: "100%", // Expand to fill the screen vertically
            borderRadius: "10%", // Remove border radius for a square shape
            backgroundColor: "#ffffff", // Change background color to white
            zIndex: 1, // Ensure it's above other elements
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
