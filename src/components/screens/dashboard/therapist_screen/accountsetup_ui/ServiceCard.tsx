import { Card, CardContent } from "@/components/ui/card";
import DialogForm from "../profile_ui/clinic_Screen/DialogForm";

const ServiceCard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-[2%]">
      <Card className="md:w-[50%] w-full py-10 px-5 rounded-3xl bg-white">
        <CardContent className="pt-10">
          <DialogForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
