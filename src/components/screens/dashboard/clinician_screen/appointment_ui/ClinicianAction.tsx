// import React, { useState } from 'react';
// import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
// import { updateAppointmentStatus } from '@/services/api/clinicians/appointment';
// import WarningCard from './WarningCard';
// import VerificationCard from './VerificationCard';
// import Success from '@/components/ui/notifications/Success';
// import { useAppointmentsStore } from '@/store/useAppointment';
// import { toast } from 'react-toastify';

// const ClinicianAction = ({ appointmentId, startTime, refreshTable }) => {
//   const [currentModal, setCurrentModal] = useState(null);
//   const { updateAppointmentInState } = useAppointmentsStore(); // Zustand action

//   const handleCancelClick = () => setCurrentModal('verification');
//   const handleVerificationYes = () => {
//     const isLateCancellation = new Date(startTime).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;
//     if (isLateCancellation) {
//       setCurrentModal('warning');
//     } else {
//       performAppointmentAction('Client Canceled');
//     }
//   };
//   const handleWarningYes = () => {
//     setCurrentModal(null);
//     performAppointmentAction('Late Cancel');
//   };

//   const performAppointmentAction = async (status) => {
//     try {
//       await updateAppointmentStatus(appointmentId, { status });
//       updateAppointmentInState(appointmentId, { status });
//       refreshTable(); // Re-fetch data
//       setCurrentModal('success');
//     } catch (error) {
//       toast.error('Failed to update appointment status.');
//     }
//   };

//   return (
//     <>
//       {/* Button Trigger */}
//       <button onClick={handleCancelClick}>Cancel Appointment</button>

//       {/* Verification Modal */}
//       <Dialog open={currentModal === 'verification'} onOpenChange={() => setCurrentModal(null)}>
//         <DialogOverlay />
//         <DialogContent>
//           <VerificationCard onYes={handleVerificationYes} onNo={() => setCurrentModal(null)} />
//         </DialogContent>
//       </Dialog>

//       {/* Warning Modal */}
//       <Dialog open={currentModal === 'warning'} onOpenChange={() => setCurrentModal(null)}>
//         <DialogOverlay />
//         <DialogContent>
//           <WarningCard onYes={handleWarningYes} onNo={() => setCurrentModal(null)} />
//         </DialogContent>
//       </Dialog>

//       {/* Success Modal */}
//       <Dialog open={currentModal === 'success'} onOpenChange={() => setCurrentModal(null)}>
//         <DialogOverlay />
//         <DialogContent>
//           <Success title="Appointment Canceled" subtitle="The appointment has been successfully canceled." />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ClinicianAction;
