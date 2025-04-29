import React from 'react';

const videoUrls = [
    "https://www.youtube.com/embed/Ti9Q2AeKbQQ", // Tech Short
    "https://www.youtube.com/embed/1V_xRb0x9aw", // Motivation
    "https://www.youtube.com/embed/ZCGBwZ3pC7Y", // Workout
    "https://www.youtube.com/embed/3tmd-ClpJxA", // Music Reel (Dua Lipa)
    "https://www.youtube.com/embed/hTWKbfoikeg", // Nirvana clip
    "https://www.youtube.com/embed/5y_KJAg8bHI", // Comedy Short
    "https://www.youtube.com/embed/lTRiuFIWV54", // Travel Vertical
    "https://www.youtube.com/embed/_C7sdTLWxu0", // Street Interview
    "https://www.youtube.com/embed/tgbNymZ7vqY", // Animation / meme
    "https://www.youtube.com/embed/BBAyRBTfsOU", // Cooking short
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
