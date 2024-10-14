import { useEffect } from "react";
import Title from "@/components/ui/Titles/Title";
import ClientTable from "./ClientTable";
import { useAppointmentsStore } from "@/store/useAppointment"; // Import the Zustand store

const ClientScreen = () => {
  const { clients, loading, fetchAllClients } = useAppointmentsStore(); // Use Zustand store to get clients and loading state

  useEffect(() => {
    // Fetch clients when the component is mounted
    fetchAllClients(); // Call fetchAllClients without parameters
  }, [fetchAllClients]);

  return (
    <div className="my-7">
      <div className="bg-white px-[2%] mt-6 w-full overflow-x-auto">
        <div className="flex justify-between">
          <Title title="Clients" className="text-2xl font-medium py-10" />
        </div>

        {/* Render the ClientTable with clients data */}
        <div className="min-w-[687px] w-full mt-10">
          <ClientTable clients={clients} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ClientScreen;
