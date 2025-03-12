// src/components/CompanyProfile/CompanyDetails.jsx
import PropTypes from 'prop-types'; 

const CompanyDetails = ({ company }) => {
  return (
    <div className="card">
      <figure className="relative">
        <img src={company.coverImage} alt={company.name} className="w-full h-80 object-cover rounded-lg" />
        <div className="avatar absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-48 h-48 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 bg-white shadow-2xl border-4 border-white">
            <img src={company.profileIcon} alt={company.name + ' Logo'} className="object-cover" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center pt-32">
        <h2 className="card-title text-2xl font-bold">{company.name}</h2>
        <p className="text-gray-600">{company.license}</p>
        <p>{company.description}</p>
        <div className="mt-4 space-x-2">
          <div className="badge badge-outline">Established: {company.established}</div> 
          <div className="badge badge-outline">Location: {company.location}</div>
          <div className="badge badge-outline">Employees: {company.employees}</div>
        </div>
        <div className="mt-4">
          {company.services.map((service, index) => (
            <div key={index} className="badge bg-yellow-500 text-white mr-2 mb-2">{service}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

CompanyDetails.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    established: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    employees: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    coverImage: PropTypes.string.isRequired,
    profileIcon: PropTypes.string.isRequired,
  }).isRequired,
};
  
export default CompanyDetails;

