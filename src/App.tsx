import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/ui/loader_effects/LoadingOverlay";
import Empty from "./pages/DashboardPage/clinician/Empty";
import EmailUpdates from "./pages/DashboardPage/clinician/ProfileScreen/EmailUpdates";
import BusinessServices from "./pages/DashboardPage/clinician/ProfileScreen/BusinessServices";
import BusinessPeriods from "./pages/DashboardPage/clinician/ProfileScreen/BusinessPeriods";
import Profile from "./pages/DashboardPage/clinician/ProfileScreen/Profile";
import ProfileLayout from "./components/screens/dashboard/clinician_screen/profile_ui/ProfileLayout";
import ClientDashboard from "./components/layouts/ClientDashboard";
import ClinicianProfile from "./pages/DashboardPage/client/ClinicainProfile";
import Clinicians from "./pages/DashboardPage/client/Clinicians";
import Test from "./pages/Test";
import EmergencyContacts from "./pages/DashboardPage/client/ProfileScreen/EmergencyContacts";

import EmailUpdate from "./pages/DashboardPage/client/ProfileScreen/EmailUpdate";
import ClientProfileLayout from "./components/screens/dashboard/client_screen/profile_ui/ClientProfileLayout";
import ClientProfile from "./pages/DashboardPage/client/ProfileScreen/ClientProfile";
import Medical from "./pages/DashboardPage/client/ProfileScreen/Medical";

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
const Clients = lazy(() => import("@/pages/DashboardPage/clinician/Clients"));
const ClientAppointments = lazy(
  () => import("@/pages/DashboardPage/client/ClientAppointments")
);
const Support = lazy(() => import("@/pages/DashboardPage/Support"));

function App() {
  return (
    <div className="font-CabinetGrotesk">
      <BrowserRouter>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            {/* general routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/accountsetup" element={<AccountSetup />} />
            <Route path="/clientsetup" element={<ClientSetup />} />
            <Route path="passwordreset" element={<PasswordReset />} />

            {/* clinician dashboard routes */}
            <Route path="/clinician_dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Overview />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="clients" element={<Clients />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="support" element={<Support />} />
              <Route
                path="clientoverview/:appointmentId"
                element={<ClientsOverview />}
              />
              <Route path="empty" element={<Empty />} />
              <Route path="profile" element={<ProfileLayout />}>
                <Route path="" element={<Profile />} />
                <Route
                  path="businessperiodinfo"
                  element={<BusinessPeriods />}
                />
                <Route path="businessservices" element={<BusinessServices />} />
                <Route path="emailinfo" element={<EmailUpdates />} />
              </Route>
            </Route>

            {/* client dashboard routes */}

            <Route path="/client_dashboard" element={<ClientDashboard />}>
              <Route path="" element={<ClientOverview />} />
              <Route path="clinicians" element={<Clinicians />} />
              <Route path="clinician_profile" element={<ClinicianProfile />} />
              <Route
                path="client_appointment"
                element={<ClientAppointments />}
              />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<ClientProfileLayout />}>
                <Route path="" element={<ClientProfile />} />
                <Route
                  path="emergencycontact"
                  element={<EmergencyContacts />}
                />
                <Route path="medicalinfo" element={<Medical />} />
                <Route path="emailinfo" element={<EmailUpdate />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
