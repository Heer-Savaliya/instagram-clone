import React from 'react';

const videoUrls = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      "https://www.youtube.com/embed/BBAyRBTfsOU", 
       "https://www.youtube.com/embed/5y_KJAg8bHI",
    "https://www.youtube.com/embed/lTRiuFIWV54", 
        "https://www.youtube.com/embed/W6NZfCO5SIk",
  "https://www.youtube.com/embed/2vjPBrBU-TM", 
  "https://www.youtube.com/embed/jfKfPfyJRdk", 
  "https://www.youtube.com/embed/IUN664s7N-c", 
  "https://www.youtube.com/embed/oHg5SJYRHA0", 
    "https://www.youtube.com/embed/1V_xRb0x9aw", 
    "https://www.youtube.com/embed/3tmd-ClpJxA", 
    "https://www.youtube.com/embed/hTWKbfoikeg",
    "https://www.youtube.com/embed/tgbNymZ7vqY", 

  ];
  

const Reels = () => {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Reels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videoUrls.map((url, index) => (
          <div key={index} className="relative pb-[177.77%] overflow-hidden rounded-xl shadow-md">
            <iframe
              src={url}
              title={`YouTube video ${index}`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
