import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/ui/loader_effects/LoadingOverlay";
import Empty from "./pages/DashboardPage/clinician/Empty";
import EmailProfile from "./pages/DashboardPage/clinician/ProfileScreen/EmailUpdates";
import BusinessServices from "./pages/DashboardPage/clinician/ProfileScreen/BusinessServices";
import BusinessPeriods from "./pages/DashboardPage/clinician/ProfileScreen/BusinessPeriods";
import AppointmentProfile from "./pages/DashboardPage/clinician/ProfileScreen/AppointmentProfile";
import Profile from "./pages/DashboardPage/clinician/ProfileScreen/Profile";
import ProfileLayout from "./components/screens/dashboard/clinician_screen/profile_ui/ProfileLayout";
import ClientDashboard from "./components/layouts/ClientDashboard";
import Clinicians from "./pages/DashboardPage/client/Clinicians";
import ClinicianProfile from "./pages/DashboardPage/client/ClinicainProfile";
import ClientAppointments from "./pages/DashboardPage/client/ClientAppointments";

// Lazy load the components
const Landing = lazy(() => import("@/pages/Landing"));
const Signin = lazy(() => import("@/pages/Signin"));
const Signup = lazy(() => import("@/pages/signupPage/Signup"));
const PasswordReset = lazy(
  () => import("@/pages/PasswordResetPage/PasswordReset")
);
const Overview = lazy(() => import("@/pages/DashboardPage/clinician/Overview"));
const ClientOverview = lazy(
  () => import("@/pages/DashboardPage/client/ClientOverview")
);
const Schedule = lazy(() => import("@/pages/DashboardPage/clinician/Schedule"));
const DashboardLayout = lazy(
  () => import("./components/layouts/DashboardLayout")
);

const Appointment = lazy(
  () => import("@/pages/DashboardPage/clinician/Appointment")
);
const ClientsOverview = lazy(
  () => import("@/pages/DashboardPage/clinician/ClientsOverview")
);
const AccountSetup = lazy(
  () =>
    import("@/pages/DashboardPage/clinician/account_setup_page/AccountSetup")
);
const ClientSetup = lazy(
  () => import("@/pages/DashboardPage/client/account_setup_page/ClientSetup")
);
const Clients = lazy(() => import("./pages/DashboardPage/clinician/Clients"));

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
            <Route path="/clientsetup" element={<ClientSetup />} />
            <Route path="passwordreset" element={<PasswordReset />} />
            <Route path="/clinician_dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Overview />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="clients" element={<Clients />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="profile" element={<ProfileLayout />}>
                <Route path="" element={<Profile />} />
                <Route
                  path="appointmentinfo"
                  element={<AppointmentProfile />}
                />
                <Route
                  path="businessperiodinfo"
                  element={<BusinessPeriods />}
                />
                <Route path="businessservices" element={<BusinessServices />} />
                <Route path="emailinfo" element={<EmailProfile />} />
              </Route>
              <Route path="clientoverview" element={<ClientsOverview />} />

              <Route path="empty" element={<Empty />} />
            </Route>

            <Route path="/client_dashboard" element={<ClientDashboard />}>
              <Route path="" element={<ClientOverview />} />
              <Route path="clinicians" element={<Clinicians />} />
              <Route path="clinician_profile" element={<ClinicianProfile />} />
              <Route
                path="client_appointment"
                element={<ClientAppointments />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
