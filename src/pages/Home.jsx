import React, { useContext } from "react";
import Feed from "../components/Ui/Feed";
import Status from "../components/Ui/Status";
import { SearchContext } from "../context/SearchContext";

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  return (
    <div>
      <Status />
      <Feed searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
