import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient({});
// const queryClient = new QueryClient();
// <QueryClientProvider client={queryClient}></QueryClientProvider>
//     <ReactQueryDevtools initialIsOpen={false} />

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
