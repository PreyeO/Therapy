import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientProfileByAppointmentId } from "@/services/api/clinicians/appointment";
import { ClientProfileData } from "@/types/formSchema"; // Import the type

const ClientOverview: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>(); // Get appointmentId from route params

  const [clientData, setClientData] = useState<ClientProfileData | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientProfileByAppointmentId(
          appointmentId as string
        );
        setClientData(data);
      } catch (error) {
        console.error("Failed to fetch client data:", error);
      }
    };
    fetchClientData();
  }, [appointmentId]);

  if (!clientData) return <p>Loading client data...</p>;

  return (
    <div className="flex gap-5 flex-wrap my-7">
      <Card className="rounded-lg bg-white w-full lg:w-[40%]">
        <CardContent className="flex items-center gap-[25px] w-[385px]">
          <CardHeader className="">
            <Avatar className="lg:w-[150px] lg:h-[150px] w-[117px] h-[117px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {clientData.first_name[0]}
                {clientData.last_name[0]}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="text-[21.15px] lg:text-3xl font-bold text-primary_black_text">
              {clientData.first_name} {clientData.last_name}
            </CardTitle>
            <div className="w-[260px]">
              <div className="flex gap-4 lg:text-lg text-[12.69px] font-normal text-[#5C5C5C]">
                <div className="flex flex-col gap-4">
                  <h3>Gender</h3>
                  <h3>Age</h3>
                </div>
                <div className="flex flex-col gap-4">
                  <h3>{clientData.gender}</h3>
                  <h3>
                    {new Date().getFullYear() -
                      new Date(clientData.date_of_birth).getFullYear()}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg w-full lg:w-[58%] my-4 lg:my-0 bg-white">
        <CardHeader>
          <CardTitle className="lg:text-2xl text-base font-medium text-primary_black_text">
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 lg:text-[17px] text-[13.22px] font-normal">
          <div className="flex lg:gap-[114px] gap-7">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Last Name</h4>
              <h4 className="text-[#041827]">{clientData.last_name}</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">First Name</h4>
              <h4 className="text-[#041827]">{clientData.first_name}</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Date of birth</h4>
              <h4 className="text-[#041827]">{clientData.date_of_birth}</h4>
            </div>
          </div>
          <div className="flex gap-10 lg:gap-[80px]">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Phone number</h4>
              <h4 className="text-[#041827]">{clientData.phone_number}</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Email</h4>
              <h4 className="text-[#041827]">{clientData.email}</h4>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[#041827B2]">Address</h4>
            <h4 className="text-[#041827]">
              {clientData.address.street_address}, {clientData.address.city},{" "}
              {clientData.address.state} {clientData.address.postal_code}
            </h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOverview;
