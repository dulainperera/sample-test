import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdsSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const ads = [
    {
      id: 1,
      imageUrl: 'https://mistertlk.s3.ap-southeast-1.amazonaws.com/property/rentals/675_1_1643892453.jpg',
      title: 'Construction Project Opportunity',
      description: 'New commercial building project in Colombo.',
      company: 'ABC Construction'
    },
    {
      id: 2,
      imageUrl: 'https://static.infra.global/wp-content/uploads/2023/03/09144600/F-2-134-768x432.jpg',
      title: 'Infrastructure Development',
      description: 'Major infrastructure development project seeking partners.',
      company: 'XYZ Developers'
    },
    {
      id: 3,
      imageUrl: 'https://infra.global/wp-content/uploads/2023/03/F-2-133-768x432.jpg',
      title: 'Road Construction Tender',
      description: 'New highway development project open for bidding.',
      company: 'Highway Builders Ltd'
    },
    {
      id: 4,
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/614845680.jpg?k=bd3be5a5f8ba84986f39bba92250413bdb1858bc367962a1335b49bb539eaf3f&o=&hp=1',
      title: 'Building Renovation',
      description: 'Historic building renovation project in Kandy.',
      company: 'Heritage Constructors'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? ads.length - 1 : prev - 1));
  };

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden mb-4 sm:mb-8">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[450px]">
        <div 
          className="absolute w-full h-full transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {ads.map((ad) => (
            <div key={ad.id} className="min-w-full h-full">
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-[180px] sm:h-[250px] lg:h-[300px] object-cover"
              />
              <div className="p-3 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{ad.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">{ad.description}</p>
                <p className="text-xs sm:text-sm text-yellow-600">Posted by: {ad.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button 
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {ads.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-yellow-500 w-6' : 'bg-gray-300'
              }`}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-yellow-500 transition-all duration-500"
          style={{ width: `${(currentSlide + 1) * (100 / ads.length)}%` }}
        />
      </div>
    </div>
  );
};

export default AdsSlideshow;