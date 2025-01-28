import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import ProfileHeader from "./ui/ProfileHeader";
import MedicalDialog from "./ui/MedicalDialog";
import ClinicalDocumentForm from "./forms/ClinicalDocumentForm";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import { useDialogState } from "@/store";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteClinicalDocument } from "@/services/api/clients/account_setup";
import FileIcon from "@/assets/icon/file.svg";

const ClinicalDocument = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();
  const {
    clinicalDocuments,
    clientProfileId,
    fetchProfileMedicals,
    loading,
    updateState,
  } = useBusinessPeriodsStore();

  useEffect(() => {
    if (clientProfileId) {
      fetchProfileMedicals(clientProfileId);
    }
  }, [clientProfileId, fetchProfileMedicals]);

  const {
    isVerificationOpen,
    isSuccessOpen,
    isDeleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleSuccessClose,
  } = useDeleteItem(
    async (id) => {
      await deleteClinicalDocument(id); // Backend delete service
    },
    "clinicalDocuments",
    updateState,
    () => {
      if (clientProfileId) {
        return fetchProfileMedicals(clientProfileId); // Refetch data
      }
      console.error("Client profile ID is null");
    }
  );

  const handleOpenDialog = () => {
    setDialogContent(<ClinicalDocumentForm />);
  };

  const getFileNameFromURL = (url) => {
    try {
      return url.split("/").pop().split("?")[0]; // Extract file name from URL
    } catch (error) {
      return "Unknown File"; // Fallback in case of error
    }
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add clinical documents"
        title="Clinical Document"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : clinicalDocuments.length === 0 ? (
        <p className="text-center text-gray-500">
          No documents uploaded yet. Use the "Add clinical documents" button to
          upload.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-[11px]">
          {clinicalDocuments.map((doc) => (
            <div
              key={doc.id}
              className="w-[399px] h-[76px] bg-[#6D7C430D] flex justify-between items-center px-5 rounded-[15px]"
            >
              <div className="flex gap-1 items-center">
                <img src={FileIcon} alt="file icon of document" />
                <div className="flex flex-col w-[300px]">
                  <p className="text-sm font-normal ">
                    {doc.file ? getFileNameFromURL(doc.file) : "No File Found"}
                  </p>
                </div>
              </div>
              <Trash
                size={20}
                color="#FF2626"
                className="cursor-pointer"
                onClick={() => handleDeleteClick(doc.id)}
              />
            </div>
          ))}
        </div>
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Clinical Document"
        formComponent={<ClinicalDocumentForm />}
      />

      {/* Confirmation Modal */}
      {isVerificationOpen && (
        <MedicalDialog
          open={isVerificationOpen}
          onClose={handleCancelDelete}
          title="Confirm Deletion"
          formComponent={
            <VerificationCard
              onYes={handleConfirmDelete}
              onNo={handleCancelDelete}
              title="Are you sure you want to delete this document?"
              loading={isDeleting}
            />
          }
        />
      )}

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="text-center flex flex-col justify-center mx-auto items-center">
          <MedicalDialog
            open={isSuccessOpen}
            onClose={handleSuccessClose}
            formComponent={
              <Success
                title="Clinical Document Deleted"
                subtitle="The clinical document was successfully deleted from your records."
                label="Close"
                onButtonClick={handleSuccessClose}
                className="bg-transparent w-[500px] rounded-xl h-fit"
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default ClinicalDocument;
