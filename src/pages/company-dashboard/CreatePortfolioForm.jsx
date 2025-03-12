import { useState } from "react";
import { ArrowLeft, Upload, Plus, Trash2, FileText } from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePortfolioForm = ({ onCancel }) => {
  // Add navigate hook near the top of your component
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    licenseNumber: "",
    shortDescription: "",
    establishedYear: "",
    location: "",
    employeeCount: "",
    services: [],
    projects: [
      {
        name: "",
        description: "",
        completionYear: "",
        images: [],
      },
    ],
    annualRevenue: "",
    fundingSources: "",
    certifications: [
      {
        name: "",
        organization: "",
        issueDate: "",
        expiryDate: "",
        image: null,
      },
    ],
    email: "",
    phone: "",
    website: "",
    // Removed linkedin field
  });

  // Add this validation function after your state declarations
  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1: // Company Details
        if (!formData.companyName.trim()) return "Company name is required";
        if (!formData.licenseNumber.trim()) return "License number is required";
        if (!formData.shortDescription.trim()) return "Description is required";
        if (!formData.cidaGrading) return "CIDA grading is required";
        if (!formData.engineerCapacity) return "Engineer capacity is required";
        if (!formData.establishedYear) return "Established year is required";
        if (!formData.employeeCount) return "Employee count is required";
        return null;

      case 2: // Services
        if (formData.services.length === 0)
          return "Please select at least one service";
        return null;

      case 3: // Projects
        const invalidProject = formData.projects.find(
          (project) =>
            !project.name.trim() ||
            !project.description.trim() ||
            !project.completionYear
        );
        if (invalidProject) return "Please complete all project details";
        return null;

      case 4: // Financial Info
        // Optional step - no validation required
        return null;

      case 5: // Certifications
        const invalidCert = formData.certifications.find(
          (cert) =>
            !cert.name.trim() || !cert.organization.trim() || !cert.issueDate
        );
        if (invalidCert) return "Please complete all certification details";
        return null;

      case 6: // Contact Info
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) return "Email is required";
        if (!emailRegex.test(formData.email))
          return "Please enter a valid email";
        if (!formData.phone.trim()) return "Phone number is required";
        return null;

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: "Company Details" },
    { number: 2, title: "Services" },
    { number: 3, title: "Past Projects" },
    { number: 4, title: "Financial Info" },
    { number: 5, title: "Certifications" },
    { number: 6, title: "Contact Info" },
  ];

  const serviceOptions = [
    "Residential Construction",
    "Commercial Construction",
    "Industrial Construction",
    "Renovation",
    "Interior Design",
    "Architectural Services",
    "Project Management",
    "Civil Engineering",
    "MEP Services",
    "Landscaping",
  ];

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          completionYear: "",
          images: [],
        },
      ],
    }));
  };
  const handleCertificateImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert("File size should be less than 10MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((cert, i) =>
          i === index ? { ...cert, image: file } : cert
        ),
      }));
    }
  };
  const handleRemoveCertificateImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, image: null } : cert
      ),
    }));
  };
  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          organization: "",
          issueDate: "",
          expiryDate: "",
          image: null,
        },
      ],
    }));
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e, projectIndex) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === projectIndex
          ? {
              ...project,
              images: [...project.images, ...files],
            }
          : project
      ),
    }));
  };
  // Add this function before the return statement
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return renderCompanyDetails();
      case 2:
        return renderServices();
      case 3:
        return renderProjects();
      case 4:
        return renderFinancial();
      case 5:
        return renderCertifications();
      case 6:
        return renderContact();
      default:
        return null;
    }
  };

  const renderCompanyDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CIDA Grading
          </label>
          <select
            name="cidaGrading"
            value={formData.cidaGrading}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          >
            <option value="">Select CIDA Grade</option>
            <option value="CS1">CS1</option>
            <option value="CS2">CS2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
            <option value="C3">C3</option>
            <option value="C4">C4</option>
            <option value="C5">C5</option>
            <option value="C6">C6</option>
            <option value="C7">C7</option>
            <option value="C8">C8</option>
            <option value="C9">C9</option>
            <option value="C10">C10</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Engineer Capacity
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="engineerCapacity"
              value={formData.engineerCapacity}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              required
            />
            <span className="text-sm text-gray-500 mt-1">engineers</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Established Year
          </label>
          <input
            type="number"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Employees
          </label>
          <input
            type="number"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleInputChange}
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Select Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {serviceOptions.map((service) => (
          <div
            key={service}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              formData.services.includes(service)
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200 hover:border-yellow-300"
            }`}
            onClick={() => handleServiceToggle(service)}
          >
            <p className="text-sm font-medium">{service}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-8">
      {formData.projects.map((project, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg relative">
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={project.name}
                onChange={(e) => handleInputChange(e, "projects", index)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Completion Year
              </label>
              <input
                type="number"
                name="completionYear"
                value={project.completionYear}
                onChange={(e) => handleInputChange(e, "projects", index)}
                min="1900"
                max={new Date().getFullYear()}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleInputChange(e, "projects", index)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Images
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                multiple
                accept="image/*"
                className="mt-1 block w-full"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddProject}
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
      >
        <Plus className="w-5 h-5" />
        Add Another Project
      </button>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Annual Revenue Range
          <span className="ml-1 text-gray-400">(Optional)</span>
        </label>
        <select
          name="annualRevenue"
          value={formData.annualRevenue}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
        >
          <option value="">Select Range</option>
          <option value="< 1M">Less than $1M</option>
          <option value="1M-5M">$1M - $5M</option>
          <option value="5M-10M">$5M - $10M</option>
          <option value="10M-50M">$10M - $50M</option>
          <option value="> 50M">More than $50M</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Funding Sources
          <span className="ml-1 text-gray-400">(Optional)</span>
        </label>
        <textarea
          name="fundingSources"
          value={formData.fundingSources}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
          placeholder="List your major funding sources or investors..."
        />
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-8">
      {formData.certifications.map((cert, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg relative">
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveCertification(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certification Name
              </label>
              <input
                type="text"
                name="name"
                value={cert.name}
                onChange={(e) => handleInputChange(e, "certifications", index)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <input
                type="text"
                name="organization"
                value={cert.organization}
                onChange={(e) => handleInputChange(e, "certifications", index)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={cert.issueDate}
                onChange={(e) => handleInputChange(e, "certifications", index)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
                <span className="ml-1 text-gray-400">(Optional)</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={cert.expiryDate}
                onChange={(e) => handleInputChange(e, "certifications", index)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Certificate Image
                <span className="ml-1 text-gray-400">(PDF, JPG, PNG)</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-yellow-500 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor={`certificate-${index}`}
                      className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={`certificate-${index}`}
                        type="file"
                        name="certificateImage"
                        onChange={(e) => handleCertificateImageChange(e, index)}
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              {cert.image && (
                <div className="mt-2 flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {cert.image.type === "application/pdf" ? (
                      <FileText className="h-10 w-10 text-gray-400" />
                    ) : (
                      <img
                        src={URL.createObjectURL(cert.image)}
                        alt="Certificate preview"
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {cert.image.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(cert.image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificateImage(index)}
                    className="ml-4 bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCertification}
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
      >
        <Plus className="w-5 h-5" />
        Add Another Certification
      </button>
    </div>
  );

  const renderContact = () => {
    // Add logging for debugging
    console.log("Contact form data:", {
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      // Removed linkedin
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
              <span className="ml-1 text-gray-400">(Optional)</span>
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
              placeholder="https://"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      // Add project images
      formData.projects.forEach((project) => {
        project.images.forEach((image) => {
          formDataObj.append("projectImages", image);
        });
      });

      // Add certificate images
      formData.certifications.forEach((cert) => {
        if (cert.image) {
          formDataObj.append("certificateImages", cert.image);
        }
      });

      // Create a clean copy of form data for JSON serialization
      const cleanFormData = {
        ...formData,
        // Structure contact information as expected by the backend
        contactInformation: {
          email: formData.email,
          phoneNumber: formData.phone, // Note: changed from 'phone' to 'phoneNumber'
          website: formData.website,
        },
        // Clear binary data
        projects: formData.projects.map((project) => ({
          ...project,
          images: [],
        })),
        certifications: formData.certifications.map((cert) => ({
          ...cert,
          image: null,
        })),
      };

      // Remove standalone contact fields since they're now in contactInformation
      delete cleanFormData.email;
      delete cleanFormData.phone;
      delete cleanFormData.website;

      // Log the data being sent to verify contact info structure
      console.log("Sending data:", cleanFormData);

      formDataObj.append("companyData", JSON.stringify(cleanFormData));

      const response = await axios.post(
        "http://localhost:8080/company/portfolio",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const createdCompany = response.data;
        console.log("Created company:", createdCompany);
        navigate(`/company/profile/${createdCompany.id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error creating company portfolio: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the handleNextStep function
  const handleNextStep = () => {
    const error = validateStep(activeStep);
    if (error) {
      alert(error);
      return;
    }

    if (activeStep === steps.length) {
      handleSubmit(); // Remove the event parameter since it's not needed here
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <button
          onClick={onCancel}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Company Portfolio
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center ${
                step.number === activeStep ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step.number === activeStep
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                {step.number}
              </div>
              <span className="text-sm mt-1">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between pt-8 border-t">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => prev - 1)}
            className={`px-4 py-2 text-gray-600 hover:text-gray-800 ${
              activeStep === 1 ? "invisible" : ""
            }`}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleNextStep}
            className={`bg-yellow-500 text-white px-6 py-2 rounded-md transition-colors
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"}`}
          >
            {activeStep === steps.length
              ? isSubmitting
                ? "Submitting..."
                : "Submit"
              : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

CreatePortfolioForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CreatePortfolioForm;
