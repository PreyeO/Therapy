import { useState } from "react";
import { motion } from "framer-motion";
import { CardContent, CardTitle } from "@/components/ui/card";
import FullLogo from "@/components/ui/logos/FullLogo";
import String from "@/assets/image/String.png";
import { Button } from "../ui/button";
import WelcomeAnimation from "@/components/welcome/WelcomeAnimate";
import HeroImage from "../images/HeroImage";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!animationComplete && (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      {animationComplete && (
        <div className="flex flex-col justify-center items-center lg:w-[763px] mx-auto h-screen">
          <div className="flex flex-col justify-center items-center scale-75 bg-transparent">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="gap-5 flex flex-col justify-center items-center"
            >
              <FullLogo width={220} height={156} />
              <CardTitle className="  font-bold lg:text-[45px] lg:leading-[52px] text-heading_black_text text-center text-xl leading-6 px-[5%] lg:px-0">
                Make Online And Live Consultation Easily With Top Therapist
                <img
                  src={String}
                  alt="images for health care professionals"
                  width={141.51}
                  height={14}
                  className="ml-[15%]"
                />
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
            >
              <CardContent>
                <div className="mx-auto my-10">
                  <HeroImage />
                </div>
              </CardContent>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-col gap-5"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-16 lg:w-[556px] w-[388px] text-xl font-medium"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  size="lg"
                  className="h-16 lg:w-[556px] w-[388px] text-xl font-medium bg-transparent text-army_green border border-army_green"
                >
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
