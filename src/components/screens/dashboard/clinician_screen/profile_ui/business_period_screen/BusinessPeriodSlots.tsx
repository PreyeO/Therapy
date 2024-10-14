// BusinessPeriodSlots Component
import { useEffect, useState } from "react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore"; // Zustand store
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { Edit, Trash2, X } from "lucide-react";
import { truncateToFirstTwoWords } from "@/lib/utils";
import BusinessPeriodsHeader from "../../../components/BusinessPeriodHeader";
import TimeSelect from "../../components/TimeSelect";
import ConfirmationCard from "../../../components/ConfirmationCard"; // Import ConfirmationCard component
import SuccessDialog from "../../../components/SuccessDialog"; // Import SuccessDialog component
import UpdateCard from "./UpdateCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";

import { FetchedBusinessPeriod } from "@/types/formSchema"; // Import the correct type

const BusinessPeriodSlots = () => {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] =
    useState<FetchedBusinessPeriod | null>(null); // Updated type for selectedPeriod
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Control success dialog visibility

  const {
    fetchedBusinessPeriods,
    loading,
    fetchBusinessPeriods,
    deleteBusinessPeriod,
    fetchAppointmentAddresses,
  } = useBusinessPeriodsStore(); // Access state and methods from Zustand

  // Fetch the business periods on component mount
  useEffect(() => {
    fetchBusinessPeriods();
  }, [fetchBusinessPeriods, fetchAppointmentAddresses]);

  // Handler for the delete button click
  const handleDeleteClick = (periodId: string) => {
    setSelectedPeriodId(periodId); // Set the ID of the period to be deleted
    setIsModalVisible(true); // Show the confirmation modal
  };

  const handleEditClick = (period: FetchedBusinessPeriod) => {
    setSelectedPeriod(period); // Set the selected period object for pre-filling
  };

  // Confirm deletion handler, only called when "Yes" is clicked
  const confirmDelete = async () => {
    if (selectedPeriodId) {
      try {
        await deleteBusinessPeriod(selectedPeriodId); // Call the delete function without triggering a refresh
        setIsModalVisible(false); // Hide the confirmation modal

        // Trigger refresh and wait for it to complete before showing the success dialog
        await fetchBusinessPeriods();
        setShowSuccess(true); // Show success message after deletion and refresh
      } catch (error) {
        console.error("Error during delete:", error); // Log any errors
      }
    }
  };

  // Handler for closing the success modal
  const handleSuccessClose = () => {
    setShowSuccess(false); // Close success dialog
    setSelectedPeriodId(null);
    setSelectedPeriod(null); // Reset the selected period
  };

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  if (!fetchedBusinessPeriods.length) {
    return <div>No business periods available.</div>;
  }

  return (
    <>
      {/* Removed the form tag to prevent unwanted form submission */}
      <div className="flex flex-col mt-6 gap-10">
        {/* Header */}
        <BusinessPeriodsHeader showActions={true} />

        <div className="flex flex-col gap-5">
          {fetchedBusinessPeriods.map((period, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Time Slot Row */}
              <div className="flex items-center justify-center gap-10">
                <h3 className="w-1/4 text-center md:text-base text-[9.19px] font-bold">
                  {period.day_of_week}
                </h3>

                <div className="w-[30%]">
                  <TimeSelect
                    placeholder={period.opening_hour || "08:00"}
                    value={period.opening_hour}
                  />
                </div>

                <div className="w-[30%]">
                  <TimeSelect
                    placeholder={period.closing_hour || "18:00"}
                    value={period.closing_hour}
                  />
                </div>
                <div className="w-[30%]">
                  <div className="border h-12 flex items-center justify-center rounded-xl gap-3">
                    {period.business_locations?.length ? (
                      <p className="text-[9px] md:text-[14px] text-[#041827B2] text-center">
                        {period.business_locations
                          .map((location) =>
                            truncateToFirstTwoWords(
                              `${location.location.street_address}, ${location.location.city}, ${location.location.state}, ${location.location.postal_code}`
                            )
                          )
                          .join("; ")}
                      </p>
                    ) : (
                      <p className="text-[9px] md:text-[12px] text-gray-500 italic">
                        No locations available
                      </p>
                    )}
                  </div>
                </div>

                {/* Edit and Delete Button Flex */}
                <div className="w-[15%] flex justify-center gap-4">
                  <div className="border md:w-[103px] w-[59.17px] h-12 flex items-center justify-center rounded-xl gap-3">
                    <Dialog>
                      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                      <DialogTrigger asChild>
                        {/* Set the button type explicitly to prevent form submission */}
                        <button
                          className="cursor-pointer bg-transparent"
                          type="button"
                          onClick={() => handleEditClick(period)}
                        >
                          <Edit color="#8BA05F" size={20} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="h-[350px]">
                        <div className="flex justify-between">
                          <DialogTitle className="text-[25px] text-[#041827] font-medium">
                            Edit Business Period
                          </DialogTitle>
                          <DialogClose className="bg-[#1DBA4A1A] w-[36px] h-[36px] rounded-full flex justify-center items-center">
                            <X size={24} />
                          </DialogClose>
                        </div>

                        {/* Pass the selected period and showSuccess handler to the UpdateCard component */}
                        {selectedPeriod && (
                          <UpdateCard
                            period={selectedPeriod}
                            onClose={handleSuccessClose}
                            setShowSuccess={setShowSuccess}
                          />
                        )}
                      </DialogContent>
                      <DialogOverlay />
                    </Dialog>

                    <button
                      type="button"
                      className="cursor-pointer bg-transparent"
                      onClick={() => handleDeleteClick(period.id)}
                    >
                      <Trash2 color="red" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalVisible && !showSuccess && (
        <ConfirmationCard
          isVisible={isModalVisible}
          message="Are you sure you want to delete this business period?"
          onConfirm={confirmDelete} // Handle deletion and show success without closing the portal
          onCancel={() => setIsModalVisible(false)} // Close modal if cancelled
          submessage="This action cannot be undone."
        />
      )}

      {/* Success Dialog Display */}
      <SuccessDialog
        isVisible={showSuccess}
        title="Success!"
        subtitle="The business period has been successfully updated."
        label="Close"
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default BusinessPeriodSlots;
