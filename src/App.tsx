// import { Button } from "@/components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import PasswordReset from "@/pages/PasswordReset";
// import { Toaster } from "@/components/ui/sonner.tsx";
import Testing from "./pages/Testing";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className=" bg-main-background font-CabinetGrotesk">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="passwordreset" element={<PasswordReset />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
