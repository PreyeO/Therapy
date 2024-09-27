import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
import { Upload } from "lucide-react";

const ClinicalDocForm = () => {
  return (
    <div className="flex flex-col gap-16 w-full mb-16">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Upload Clinical Documents"
          subtitle="Upload your medical reports. You can still update or remove it in
profile"
        />
      </div>
      <div className="flex flex-col text-army_green">
        <button className="flex  rounded-full p-4 items-center bg-[#6D7C431A] w-[222px] mx-auto justify-center gap-3">
          <Upload size={14} />
          <p>Upload Report</p>
        </button>
      </div>

      {/* <form id="step-3-form">
        <button type="submit" className="hidden">
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default ClinicalDocForm;
