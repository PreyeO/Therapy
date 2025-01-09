import { Plus, Trash2 } from "lucide-react";
import ProfileHeader from "./ui/ProfileHeader";
import ContentTitle from "./ui/ContentTitle";
import ContentSubtitle from "./ui/ContentSubtitle";
import ProfileButton from "./ui/ProfileButton";
import { useDialogState } from "@/store";
import SocialSupportForm from "./forms/SocialSupportForm";
import MedicalDialog from "./ui/MedicalDialog";
import { useEffect } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import useDeleteItem from "@/hooks/useDeleteItem";
import { deleteSocialSupport } from "@/services/api/clients/account_setup";
import VerificationCard from "../../../components/VerificationCard";
import Success from "@/components/ui/notifications/Success";
import { ToastContainer } from "react-toastify";

const SocialSupport = () => {
  const { isOpen, setDialogContent, closeDialog } = useDialogState();

  const {
    socialSupports,
    fetchProfileMedicals,
    clientProfileId,
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
      await deleteSocialSupport(id);
      if (clientProfileId) {
        await fetchProfileMedicals(clientProfileId); // Refresh social supports
      }
    },
    "socialSupports",
    updateState,
    clientProfileId ? () => fetchProfileMedicals(clientProfileId) : null
  );

  const handleOpenDialog = () => {
    setDialogContent(<SocialSupportForm />);
  };

  return (
    <div className="flex flex-col gap-[67px]">
      <ProfileHeader
        label="Add social support"
        title="Social Support"
        icon={<Plus size={18} color="white" />}
        onAdd={handleOpenDialog}
      />

      {loading ? (
        <div className="relative w-full h-[200px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        socialSupports.map((support, index) => (
          <div className="flex flex-col gap-[28px]" key={support.id || index}>
            <div className="flex gap-[114px]">
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Type" />
                <ContentSubtitle
                  content={support.social_support_type || "N/A"}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <ContentTitle title="Strength" />
                <ContentSubtitle content={support.strength || "N/A"} />
              </div>
            </div>
            <div className="flex flex-col gap-[6px] ">
              <ContentTitle title="Description" />
              <ContentSubtitle content={support.description || "N/A"} />
            </div>
            <div className="flex flex-col gap-[6px]  ">
              <ContentTitle title="Note" />
              <ContentSubtitle content={support.notes || "N/A"} />
            </div>
            <ProfileButton
              icon={<Trash2 size={18} color="white" />}
              label="Delete social support"
              className="bg-[#FF2626]"
              onClick={() => handleDeleteClick(support.id)}
            />
          </div>
        ))
      )}

      <MedicalDialog
        open={isOpen}
        onClose={closeDialog}
        title="Add Social Support"
        formComponent={<SocialSupportForm />}
      />

      {/* Verification Modal */}
      {isVerificationOpen && (
        <MedicalDialog
          open={isVerificationOpen}
          onClose={handleCancelDelete}
          title="Confirm Deletion"
          className="text-center text-red-600 "
          formComponent={
            <VerificationCard
              onYes={handleConfirmDelete}
              onNo={handleCancelDelete}
              title="Are you sure you want to delete this social support?"
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
                title="Social Support Deleted"
                subtitle="The social support was successfully deleted from your records."
                label="Close"
                onButtonClick={handleSuccessClose}
                className="bg-transparent w-[500px] rounded-xl h-fit"
              />
            }
          />
        </div>
      )}

      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </div>
  );
};

export default SocialSupport;
