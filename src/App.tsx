import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./components/ui/loader_effects/LoadingOverlay";
import Empty from "./pages/DashboardPage/therapist/Empty";
import BusinessPeriods from "./pages/DashboardPage/therapist/ProfileScreen/BusinessPeriods";

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
  () =>
    import("@/pages/DashboardPage/therapist/account_setup_page/AccountSetup")
);
const Patients = lazy(() => import("./pages/DashboardPage/therapist/Patients"));
const Profile = lazy(
  () => import("./pages/DashboardPage/therapist/ProfileScreen/Profile")
);
const AppointmentProfile = lazy(
  () =>
    import("./pages/DashboardPage/therapist/ProfileScreen/AppointmentProfile")
);
const EmailProfile = lazy(
  () => import("./pages/DashboardPage/therapist/ProfileScreen/EmailUpdates")
);
const ProfileLayout = lazy(
  () =>
    import(
      "./components/screens/dashboard/therapist_screen/profile_ui/ProfileLayout"
    )
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
                <Route path="emailinfo" element={<EmailProfile />} />
              </Route>
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
