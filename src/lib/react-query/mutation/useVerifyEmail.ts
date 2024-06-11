// lib/react-query/mutation/useVerifyEmail.ts
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/services/api";
import { VerifyEmailResponse } from "@/types/model";

export const useVerifyEmail = () => {
  return useMutation<
    VerifyEmailResponse,
    Error,
    { userId: string; otp: string }
  >(({ userId, otp }) => verifyEmail(userId, otp));
};
