import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { motion } from "framer-motion";

interface MyComponentProps {
  title: string;
  subtitle: string;
  label: string;
  onButtonClick: () => void;
  className?: string;
}

const Success: FC<MyComponentProps> = ({
  title,
  subtitle,
  label,
  onButtonClick,
  className,
}) => {
  return (
    <div
      className={`flex flex-col mx-auto min-h-screen justify-center max-w-[829px] ${className} `}
    >
      <Card className="flex flex-col justify-center gap-[40px] mx-auto md:p-10 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            bounce: 0.8,
          }}
        >
          <CardHeader className="flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                type: "spring",
                bounce: 0.8,
              }}
            >
              <Check className="text-[50px] text-white bg-army_green rounded-full h-[100px] w-[100px] p-3 " />
            </motion.div>
            <CardTitle className="pt-8 md:text-[25.03px] text-base font-bold text-primary_black_text">
              {title}
            </CardTitle>
            <CardDescription className=" font-normal md:text-[16.93px] text-[9.55px] text-placeholder_text">
              {subtitle}
            </CardDescription>
          </CardHeader>

          <Button
            onClick={onButtonClick}
            className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full"
          >
            {label}
          </Button>
        </motion.div>
      </Card>
    </div>
  );
};

export default Success;
