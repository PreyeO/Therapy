import { useState } from "react";
import { motion } from "framer-motion";
import { CardContent, CardTitle } from "@/components/ui/card";
import FullLogo from "@/components/ui/logos/FullLogo";
import String from "@/assets/image/String.png";
import { Button } from "../../ui/button";
import WelcomeAnimation from "@/components/screens/welcome/WelcomeAnimate";
import HeroImage from "../../images/HeroImage";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      {!animationComplete && (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      {animationComplete && (
        <div className="flex flex-col justify-center items-center lg:w-[1000px] mx-auto h-screen">
          <div className="flex flex-col justify-center items-center  scale-75 lg:scale-75 md:scale-80 bg-transparent 3xl:scale-100">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: -50 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="gap-5 flex flex-col justify-center items-center"
            >
              <FullLogo width={220} height={156} />
              <CardTitle className="  font-bold lg:text-[45px] lg:leading-[52px] text-heading_black_text text-center text-xl leading-6 px-[5%] lg:px-0">
                Seamlessly Connect with Leading clinicians for Virtual and In
                person sessions
                <img
                  src={String}
                  alt="images for health care professionals"
                  width={141.51}
                  height={14}
                  className="ml-[20%]"
                />
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            >
              <CardContent>
                <div className="mx-auto mb-6">
                  <HeroImage />
                </div>
              </CardContent>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
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
