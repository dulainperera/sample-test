import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const ClientReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const difference = star - rating;
          let starColor = '';
          
          if (difference <= 0) {
            // Full star
            starColor = 'text-yellow-400';
          } else if (difference > 0 && difference < 1) {
            // Half star
            return (
              <div key={star} className="relative">
                <Star className="w-5 h-5 text-gray-300" fill="currentColor" />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                </div>
              </div>
            );
          } else {
            // Empty star
            starColor = 'text-gray-300';
          }

          return (
            <Star 
              key={star} 
              className={`w-5 h-5 ${starColor}`} 
              fill="currentColor"
            />
          );
        })}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{review.clientName}</h3>
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-6">
        Leave a Review
      </button>
    </section>
  );
};

ClientReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      clientName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string
    })
  ).isRequired,
};

export default ClientReviews;