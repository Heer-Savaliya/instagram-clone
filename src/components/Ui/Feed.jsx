import React from "react";
import FeedCard from "./FeedCard";

const Feed = ({searchQuery}) => {
  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Feeds</h1>
        <h3 className="text-xs px-6 py-1 border-2 border-gray-300 rounded-4xl bg-gray-100 text-gray-600">
          Popular
        </h3>
      </div>

      {/* feed container */}
      <div className="py-3 flex flex-col gap-7">
        <FeedCard searchQuery={searchQuery}/>
      </div>
    </div>
  );
};

export default Feed;
