// Language: JavaScript (JSX)
import React from "react";
import PropTypes from 'prop-types';

const Card = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default Card;