import PropTypes from 'prop-types';

const PastProjects = ({ projects }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Past Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={project.image} 
                alt={project.title}
                className="h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{project.title}</h3>
              <p>{project.description}</p>
              <div className="text-sm text-gray-600">
                Completed: {project.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
PastProjects.propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired, // Assuming project ID is a number
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired, // Or string if you store the year as a string
      })
    ).isRequired,
  };

export default PastProjects;
