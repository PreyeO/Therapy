import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Signin from "@/pages/Signin";
import Signup from "@/pages/signupPage/Signup";
import PasswordReset from "@/pages/PasswordResetPage/PasswordReset";
import "react-toastify/dist/ReactToastify.css";
import Overview from "./pages/DashboardPage/therapist/Overview";
import Schedule from "./pages/DashboardPage/therapist/Schedule";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Appointment from "./pages/DashboardPage/therapist/Appointment";

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
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Overview />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="appointment" element={<Appointment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
