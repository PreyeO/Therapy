import { Card, CardContent, CardTitle } from "@/components/ui/card";
import FullLogo from "@/components/images/FullLogo";
import HeroImage from "@/assets/image/HeroImage.png";
import String from "@/assets/image/String.png";
import { Button } from "../ui/button";

const WelcomeScreen = () => {
  return (
    <section className=" flex flex-col justify-center items-center  max-w-[763px] mx-auto h-screen">
      <Card className=" flex flex-col justify-center items-center gap-5">
        <FullLogo />

        <CardTitle className="font-bold lg:text-[45px] lg:leading-[52px] text-heading_black_text text-center text-xl leading-6 ">
          Make Online And Live Consultation Easily With Top Therapist
          <img
            src={String}
            alt="images for health care professionals"
            width={141.51}
            height={14}
            className="ml-[15%]"
          />
        </CardTitle>
        <CardContent>
          <img
            src={HeroImage}
            alt="images for health care professionals"
            width={504.95}
            height={286.7}
            className="mx-auto"
          />
        </CardContent>

        <Button size="lg">Get Started</Button>
      </Card>
    </section>
  );
};

export default WelcomeScreen;
