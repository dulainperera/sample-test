import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyProfile from "../../components/CompanyProfile/CompanyProfile";
import ClientNavbar from "../../components/ClientNavbar";
import CompanyNavbar from "../../components/CompanyNavbar";

const CompanyProfilePage = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        console.log("Fetching company data for ID:", id);
        const response = await axios.get(
          `http://localhost:8080/company/portfolio/${id}`
        );
        console.log("Received company data:", response.data);

        // Transform the data to match the expected structure
        const companyData = {
          id: response.data.id,
          companyName: response.data.companyName,
          licenseNumber: response.data.licenseNumber,
          shortDescription: response.data.shortDescription,
          establishedYear: response.data.establishedYear,
          location: response.data.location || "",
          employeeCount: response.data.employeeCount,
          cidaGrading: response.data.cidaGrading,
          engineerCapacity: response.data.engineerCapacity,
          services: response.data.services || [],
          projects: response.data.pastProjects || [],
          annualRevenue: response.data.annualRevenue,
          fundingSources: response.data.fundingSources,
          certifications: response.data.certifications || [],
          email: response.data.contactInformation?.email || "",
          phone: response.data.contactInformation?.phoneNumber || "", // Changed from phone to phoneNumber
          website: response.data.contactInformation?.website || "",
          linkedin: response.data.contactInformation?.linkedin || ""
        };

        setCompany(companyData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError(err.message || "Failed to load company profile");
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);

  // Add console.log to debug the data
  useEffect(() => {
    if (company) {
      console.log("Company data:", company);
    }
  }, [company]);

  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setIsSidebarMinimized(event.detail);
    };

    window.addEventListener("sidebarStateChange", handleSidebarStateChange);
    return () => {
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarStateChange
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <ClientNavbar />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarMinimized ? "ml-20" : "ml-80"
          } p-4`}
        >
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex">
        <ClientNavbar />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarMinimized ? "ml-20" : "ml-80"
          } p-4`}
        >
          <div>{error || "Company not found."}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      
      <CompanyNavbar/>
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarMinimized ? "ml-20" : "ml-80"
        }`}
      >
        <div className="container mx-auto p-4">
          <CompanyProfile company={company} />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
