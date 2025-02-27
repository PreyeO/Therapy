import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface VerificationCardProps {
  onYes: () => void;
  onNo: () => void;
  title: string;
  loading?: boolean;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  onYes,
  onNo,
  title,
  loading = false,
}) => (
  <Card className="flex flex-col w-full justify-center h-[300px]">
    <CardTitle className="text-[25px] font-medium text-center">
      {title}
    </CardTitle>
    <CardContent className="flex flex-col justify-center">
      <p className="text-center text-lg text-red-600 ">
        This action cannot be undone.
      </p>
      <div className="flex mt-10 gap-4 text-xl font-medium">
        <Button
          onClick={onNo}
          className=" border border-army_green w-full rounded-full text-army_green bg-white h-[55px]"
          disabled={loading}
        >
          No
        </Button>
        <Button
          onClick={onYes}
          className=" text-white bg-army_green w-full rounded-full h-[55px]"
          disabled={loading}
        >
          Yes
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default VerificationCard;
