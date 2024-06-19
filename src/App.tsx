import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Signin from "@/pages/Signin";
import Signup from "@/pages/signupPage/Signup";
import PasswordReset from "@/pages/PasswordResetPage/PasswordReset";
import "react-toastify/dist/ReactToastify.css";
import Testing from "./pages/Testing";
import Test from "./pages/DashboardPage/test";
import Overview from "./pages/DashboardPage/therapist/Overview";
import Schedule from "./pages/DashboardPage/therapist/Schedule";
import DashboardLayout from "./components/layouts/DashboardLayout";

function App() {
  return (
    <>
      <div className=" font-CabinetGrotesk">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="passwordreset" element={<PasswordReset />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/test" element={<Test />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="overview" element={<Overview />} />
              <Route path="schedule" element={<Schedule />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
