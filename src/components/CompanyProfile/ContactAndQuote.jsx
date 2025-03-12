import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ContactAndQuote = ({ companyId }) => {
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    navigate(`/quote-request?companyId=${companyId}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="btn-group">
        <button className="btn btn-primary">Message</button>
        <button onClick={handleRequestQuote} className="btn btn-secondary">
          Request Quote
        </button>
      </div>
    </div>
  );
};

ContactAndQuote.propTypes = {
    companyId: PropTypes.string.isRequired, // Or number if companyId is a number
  };

export default ContactAndQuote;
