// import { Button } from "@/components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import PasswordReset from "@/pages/PasswordReset";

import Testing from "./pages/Testing";

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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
