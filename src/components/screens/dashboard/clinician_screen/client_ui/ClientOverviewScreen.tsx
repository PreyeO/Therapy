import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientProfile } from "@/services/api/clients/account_setup";
import { FullClientProfile } from "@/types/formSchema";
import MedicalTabs from "../../components/medicals/MedicalTabs";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
// import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

const ClientOverviewScreen: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [clientData, setClientData] = useState<FullClientProfile | null>(null);

  // const { loading } = useBusinessPeriodsStore();

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) {
        setError("⚠️ No client ID found.");
        return;
      }

      console.log("🔍 Received clientId from URL:", clientId);

      try {
        // ✅ Correctly type the API response
        const data: FullClientProfile = await getClientProfile(clientId);
        if (!data) {
          setError("⚠️ No client data found.");
          return;
        }

        setClientData(data);
      } catch (error) {
        setError("Failed to fetch client details.");
      }
    };

    fetchClientData();
  }, [clientId]);

  // if (loading) {
  //   return (
  //     <div className="relative w-full h-[200px] flex justify-center items-center">
  //       <SmallLoader />
  //     </div>
  //   );
  // }
  if (error) return <p className="text-red-500">{error}</p>;
  if (!clientData)
    return (
      <div className="relative w-full h-[200px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );

  return (
    <div className="flex gap-5 flex-wrap my-7">
      <Card className="rounded-lg bg-white w-full lg:w-[40%]">
        <CardContent className="flex items-center gap-[25px] w-[385px]">
          <CardHeader className="">
            <Avatar className="lg:w-[150px] lg:h-[150px] w-[117px] h-[117px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {/* {clientData.first_name[0]}
                {clientData.last_name[0]} */}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="text-[21.15px] lg:text-3xl font-bold text-primary_black_text">
              {clientData.preferred_name}
            </CardTitle>
            <div className="w-[260px]">
              <div className="flex gap-4 lg:text-lg text-[12.69px] font-normal text-[#5C5C5C]">
                <div className="flex flex-col gap-4">
                  <h3>Gender</h3>
                  <h3>Age</h3>
                </div>
                <div className="flex flex-col gap-4">
                  <h3>{clientData.gender}</h3>
                  {/* <h3>
                    {new Date().getFullYear() -
                      new Date(clientData.date_of_birth).getFullYear()}
                  </h3> */}
                </div>
              </div>
            </div>
            {/* <div>
              {clientData.medical_conditions?.length ? (
                <ul>
                  {clientData.medical_conditions.map((condition) => (
                    <li key={condition.id}>
                      <strong>{condition.name}</strong> -{" "}
                      {condition.diagnosis_date || "N/A"}
                      {condition.notes && <p>{condition.notes}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No medical conditions listed.</p>
              )}
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Personal Details Card */}
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
              {/* <h4 className="text-[#041827]">{clientData.last_name}</h4> */}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">First Name</h4>
              {/* <h4 className="text-[#041827]">{clientData.first_name}</h4> */}
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
              {/* <h4 className="text-[#041827]">{clientData.email}</h4> */}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[#041827B2]">Address</h4>
            <h4 className="text-[#041827]">
              {clientData.address?.street_address}, {clientData.address?.city},
              {clientData.address?.state} {clientData.address?.postal_code}
            </h4>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white px-6 ">
        {clientData && (
          <div className="bg-white px-6 ">
            <MedicalTabs
              className="flex gap-10"
              data={clientData}
              readOnly={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOverviewScreen;
