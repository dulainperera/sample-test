import PropTypes from 'prop-types';

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0" 
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/soft-yellow-watercolor-simple-texture-background_1055-15342.jpg?t=st=1740555930~exp=1740559530~hmac=92b52380084a2f908b85e86c575001d12ab7c4555779f27a37ee29c8816a74ae&w=996')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -10 // Make sure it's behind everything
        }}
      />
      
      {/* Glass Overlay */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: -5
        }}
      />
      
      {/* Content */}
      <div className="relative z-0 min-h-screen">
        {children}
      </div>
    </div>
  );
};

BackgroundWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default BackgroundWrapper;