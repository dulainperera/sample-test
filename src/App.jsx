import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/client-dashboard/Home";
import Login from "./pages/Authentication/Login";
import CompanyHome from "./pages/company-dashboard/CompanyHome";
import ClientInsights from "./pages/insights/ClientInsights";
import CompanyInsights from "./pages/insights/CompanyInsights";
import RegisteredCompaniesPage from "./pages/companies/RegisteredCompaniesPage";
import CompanyProfilePage from "./pages/companies/CompanyProfilePage";
import SettingsPageClient from "./pages/Settings/SettingsPageClient";
import SettingsPageCompany from "./pages/Settings/SettingsPageCompany";
import CompanyTenderDashboard from "./pages/CompanyTender/CompanyTenderDashboard.jsx";

import CompanyPortfolio from "./pages/company-dashboard/CompanyPortfolio";
import ContactsCompany from "./pages/Contacts/ContactsCompany";
import ContactsClient from "./pages/Contacts/ContactsClient";
import CompanyProfileEdit from "./pages/company-dashboard/CompanyProfileEdit";
import CreateTender from "./pages/ClientTender/CreateTender.jsx";
import ClientTender from "./pages/ClientTender/ClientTender.jsx";
import TenderHeatmap from "./pages/CompanyTender/TenderHeatmap.jsx";
import ActiveBids from "./pages/CompanyTender/ActiveBids.jsx";
import TenderAnalytics from "./pages/CompanyTender/TenderAnalytics.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/client">
            <Route path="home" element={<Home />} />
            <Route path="companies" element={<RegisteredCompaniesPage />} />
            <Route path="companies/:id" element={<CompanyProfilePage />} />
            <Route path="settings" element={<SettingsPageClient />} />
            <Route path="tender" element={<ClientTender />} />
            <Route path="tender/create" element={<CreateTender />} />
            <Route path="insights" element={<ClientInsights />} />
            <Route path="contacts" element={<ContactsClient />} />
           
          </Route>

          <Route path="/company">
            <Route path="home" element={<CompanyHome />} />
            <Route path="portfolio" element={<CompanyPortfolio />} />
            <Route path="settings" element={<SettingsPageCompany />} />
            <Route path="insights" element={<CompanyInsights />} />
            <Route path="contacts" element={<ContactsCompany />} />
            <Route path="profile/:id" element={<CompanyProfileEdit />} />
            <Route path="tender" element={<CompanyTenderDashboard />} />
            <Route path="tender/heatmap" element={<TenderHeatmap />} />
          <Route path="tender/bids" element={<ActiveBids />} />
          <Route path="tender/analytics" element={<TenderAnalytics />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
