// import { useMutation, UseMutationOptions } from "@tanstack/react-query";
// import { sendOTPToEmail } from "@/services/api/auth";
// import { OTPResponse } from "@/types/authType";
// import { toast } from "react-toastify";

// export const useSendOTP = (
//   options?: UseMutationOptions<OTPResponse | undefined, Error, string>
// ) => {
//   return useMutation<OTPResponse | undefined, Error, string>(sendOTPToEmail, {
//     onSuccess: (data) => {
//       if (data) {
//         toast.success("OTP sent to your email.");
//         if (options?.onSuccess) {
//           options.onSuccess(data, "" as string, undefined);
//         }
//       } else {
//         toast.error("Failed to send OTP.");
//       }
//     },
//     onError: (error) => {
//       toast.error(`Error sending OTP: ${error.message}`);
//       if (options?.onError) {
//         options.onError(error, "" as string, undefined);
//       }
//     },
//     ...options,
//   });
// };
