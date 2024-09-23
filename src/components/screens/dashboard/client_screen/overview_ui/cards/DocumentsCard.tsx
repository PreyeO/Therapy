import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { documentData } from "@/constants/DataManager";
import File from "@/assets/icon/file.svg";

const DocumentsCard = () => {
  return (
    <Card className="h-auto  bg-white rounded-lg ">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between  font-bold text-[15.21px] lg:text-lg items-center">
          <CardTitle className="">Clinical Documents</CardTitle>
          <Button
            variant="link"
            className="text-[#8BA05F] lg: text-[11.83px] text-sm  font-medium bg-transparent"
          >
            view all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" flex flex-col gap-5">
          {documentData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex  gap-3 justify-center items-center">
                <img src={File} alt="Upload file icon" width={34} height={34} />
                <div className="flex flex-col">
                  <h2 className="text-[12.68] lg:text-[14px] font-normal text-primary_black_text ">
                    {item.name}
                  </h2>
                  <p className=" font-medium lg:text-[12px] text-[10.14] text-[#A8A8A8]">
                    {item.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <div className="">{item.acceptIcon}</div>
                <div className="">{item.rejectIcon}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsCard;
