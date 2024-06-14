import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/logos/Logo";
import FullLogo from "@/components/ui/logos/FullLogo"; // Import the FullLogo component

interface InitialAnimationProps {
  onAnimationComplete: () => void;
}

const WelcomeAnimation: React.FC<InitialAnimationProps> = ({
  onAnimationComplete,
}) => {
  const [showInitialBackground, setShowInitialBackground] = useState(true);
  const [showInitialLogo, setShowInitialLogo] = useState(false);
  const [expandDiv, setExpandDiv] = useState(false);
  const [showFullLogo, setShowFullLogo] = useState(false); // New state for FullLogo
  const [slideDown, setSlideDown] = useState(false);

  useEffect(() => {
    const backgroundTimer = setTimeout(() => {
      setShowInitialBackground(false);
      setShowInitialLogo(true);
    }, 1000);

    const logoTimer = setTimeout(() => {
      setExpandDiv(true);
    }, 2000);

    const fullLogoTimer = setTimeout(() => {
      setShowFullLogo(true);
    }, 3500);

    const slideDownTimer = setTimeout(() => {
      setSlideDown(true);
    }, 4500);

    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 5000);

    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(logoTimer);
      clearTimeout(fullLogoTimer);
      clearTimeout(slideDownTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="w-[1728px]">
      <motion.div
        initial={{ backgroundColor: "#6D7C43" }}
        animate={{
          backgroundColor: showInitialLogo ? "#6D7C43" : "white",
        }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center h-screen bg-main-background"
      >
        {showInitialBackground && (
          <div className="flex justify-center items-center h-screen w-full bg-[#6D7C43] bg-main-background" />
        )}

        {showInitialLogo && !expandDiv && (
          <motion.div
            initial={{ scale: 0.2, scaleX: 3 }}
            animate={{ scale: 1, scaleX: 1 }}
            transition={{
              type: "spring",
              bounce: 0.7,
              ease: "easeInOut",
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
              borderRadius: "100%",
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
              borderRadius: "0",
              backgroundColor: "#ffffff",
              zIndex: 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex justify-center items-center w-full h-full bg-main-background"
          >
            {!slideDown && !showFullLogo && (
              <div className="logo w-full h-full flex justify-center items-center">
                <Logo />
              </div>
            )}

            {showFullLogo && (
              <motion.div
                initial={{
                  opacity: 1,
                }}
                className="logo w-full h-full flex justify-center items-center"
              >
                <FullLogo width={150} height={100} />
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomeAnimation;
