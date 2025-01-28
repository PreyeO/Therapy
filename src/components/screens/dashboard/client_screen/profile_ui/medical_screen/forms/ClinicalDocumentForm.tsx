import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicalDocumentSchema } from "@/types/formSchema";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { ToastContainer } from "react-toastify";
import useMedicalsSubmit from "@/hooks/useMedicalsSubmit";
import { Upload, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import FileIcon from "@/assets/icon/file.svg";
import { Form } from "@/components/ui/form";

const ClinicalDocumentForm = () => {
  const form = useForm({
    resolver: zodResolver(clinicalDocumentSchema),
  });

  const {
    clinicalDocuments,
    updateClinicalDocuments,
    clientProfileId,
    fetchProfileMedicals,
  } = useBusinessPeriodsStore();

  const { loading, handleFormSubmit } = useMedicalsSubmit();

  // State to manage progress and file details
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!["application/pdf", "image/png", "image/jpeg"].includes(file.type)) {
        alert("Invalid file type. Only .pdf, .png, and .jpg are allowed.");
        return;
      }

      setFileSelected(true); // Mark file as selected
      setUploadProgress(0); // Reset progress
      form.setValue("file_upload", file); // Attach file to the form state
      simulateProgress(); // Start simulating progress
      console.log(file);
      console.log(typeof file);
    }
  };

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop progress when it reaches 100%
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10%
      });
    }, 500); // Adjust interval for desired speed
  };

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data); // Debugging: Log submitted data

    if (!clientProfileId) {
      console.error("No clientProfileId found");
      return;
    }

    // Filter out pre-existing documents
    const newDocuments = clinicalDocuments.filter((doc) => !doc.id);

    // Construct payload for new file uploads
    const payload = {
      ...data,
      clinical_documents: [
        ...newDocuments, // Include new documents only
        { file_upload: data.file_upload }, // Include the uploaded file
      ],
    };

    console.log("Payload to Submit:", payload);

    try {
      setUploadProgress(50); // Simulate progress halfway through
      await handleFormSubmit(
        async () => {
          await updateClinicalDocuments(payload.clinical_documents);
          await fetchProfileMedicals(clientProfileId);
          setUploadProgress(100); // Complete progress
        },
        form.reset,
        () => {
          setUploadProgress(0); // Reset progress on completion
          setFileSelected(false); // Reset file selection state
        }
      );
    } catch (error) {
      console.error("Error uploading clinical document:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 scale-95">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {fileSelected ? (
            <div className="flex flex-col items-center justify-center h-[149px] max-w-[769px] border-2 border-dashed border-[#D0D5DD] rounded-lg hover:border-primary_hover ">
              <div className="flex items-center gap-[20px]">
                <img
                  src={FileIcon}
                  alt="file icon of document"
                  className="w-[44.82px] h-[44.82px]"
                />
                <div className="flex flex-col gap-[9.6px] h-[85.21px] w-[490.74px]">
                  <p className="font-medium">Uploading File</p>
                  <div className="h-2 rounded-[19.21px] w-full bg-[#F9FAFB] ">
                    <Progress value={uploadProgress} />
                  </div>
                  <div className="flex">
                    <p>image.png</p>
                    <span> |</span> <p>{uploadProgress}%</p>
                  </div>
                </div>
                <X
                  size={32}
                  color="#98A2B3"
                  className="cursor-pointer"
                  onClick={() => {
                    setFileSelected(false);
                    setUploadProgress(0);
                  }}
                />
              </div>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center h-[196px] max-w-[769px] border-2 border-dashed border-army_green rounded-lg cursor-pointer hover:border-primary_hover"
            >
              <div className="flex flex-col items-center gap-[20.49px] w-[400px]">
                <Upload className="" color="#6D7C43 " size={34.15} />
                <p className="text-sm font-normal leading-[24.1px] text-[#BDBDBD] text-center">
                  <span className="text-army_green">Click here </span> to upload
                  your file or drag and drop, you can upload multiple documents
                </p>
                <p className="text-[#F93939] font-light text-[11.47px]">
                  (only .png, .jpg, .jpeg & .pdf are allowed)
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <ButtonLoader
            loading={loading}
            text="Upload Document"
            className="rounded-full h-[63px] text-xl font-medium mt-[66.17px]"
          />
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ClinicalDocumentForm;
