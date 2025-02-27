// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
// import { FormState, clinicianSetupFormSchema } from "@/types/formSchema";

// interface SecondStepProps {
//   updateAccountSetup: (data: Partial<FormState>) => void;
//   formState: FormState;
// }

// const SecondStep = ({ updateAccountSetup, formState }: SecondStepProps) => {
//   const form = useForm<Partial<FormState>>({
//     resolver: zodResolver(clinicianSetupFormSchema),
//     defaultValues: formState, // Set default values from formState
//   });

//   const onSubmit = (data: Partial<FormState>) => {
//     updateAccountSetup({ business_address: data.business_address });
//   };

//   return (
//     <div className="flex flex-col lg:gap-20 gap-10 items-center">
//       <div className="text-center py-6 mt-6">
//         <SetupHeader
//           title="What’s your business address?"
//           subtitle="Fill in your business address."
//         />
//       </div>
//       <Form {...form}>
//         <form
//           id="step-1-form"
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col gap-5 w-full mb-3"
//         >
//           <div className="flex gap-6 flex-wrap w-full">
//             <FormField
//               control={form.control}
//               name="business_address.state"
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
//                     State
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       className="h-16 text-placeholder_text font-sm font-normal w-full"
//                       autoComplete="off"
//                       placeholder="Enter state name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-[#E75F51] text-[13px] font-light" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="business_address.city"
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
//                     City
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       className="h-16 text-placeholder_text font-sm font-normal w-full"
//                       autoComplete="off"
//                       placeholder="Enter city name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-[#E75F51] text-[13px] font-light" />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex gap-6 flex-wrap w-full">
//             <FormField
//               control={form.control}
//               name="business_address.street_address"
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel className="md:text-base text-sm  font-medium text-primary_black_text">
//                     Street
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       className="h-16 text-placeholder_text font-sm font-normal w-full"
//                       autoComplete="off"
//                       placeholder="Enter street name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-[#E75F51] text-[13px] font-light" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="business_address.postal_code"
//               render={({ field }) => (
//                 <FormItem className="flex-grow">
//                   <FormLabel className="md:text-base text-sm font-medium text-primary_black_text">
//                     Zipcode
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       className="h-16 text-placeholder_text font-sm font-normal w-full"
//                       autoComplete="off"
//                       placeholder="Enter zipcode number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-[#E75F51] text-[13px] font-light" />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default SecondStep;
