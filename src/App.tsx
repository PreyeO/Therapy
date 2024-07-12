import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/ui/loader_effects/LoadingOverlay";
import Patients from "./pages/DashboardPage/therapist/Patients";
import Empty from "./pages/DashboardPage/therapist/Empty";

// Lazy load the components
const Landing = lazy(() => import("@/pages/Landing"));
const Signin = lazy(() => import("@/pages/Signin"));
const Signup = lazy(() => import("@/pages/signupPage/Signup"));
const PasswordReset = lazy(
  () => import("@/pages/PasswordResetPage/PasswordReset")
);
const Overview = lazy(() => import("./pages/DashboardPage/therapist/Overview"));
const Schedule = lazy(() => import("./pages/DashboardPage/therapist/Schedule"));
const DashboardLayout = lazy(
  () => import("./components/layouts/DashboardLayout")
);
const Appointment = lazy(
  () => import("./pages/DashboardPage/therapist/Appointment")
);
const PatientsOverview = lazy(
  () => import("./pages/DashboardPage/therapist/PatientsOverview")
);
const AccountSetup = lazy(
  () => import("./pages/DashboardPage/therapist/AccountSetup")
);

function App() {
  return (
    <div className="font-CabinetGrotesk">
      <BrowserRouter>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/accountsetup" element={<AccountSetup />} />
            <Route path="passwordreset" element={<PasswordReset />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Overview />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="patients" element={<Patients />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="patientoverview" element={<PatientsOverview />} />
              <Route path="empty" element={<Empty />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
