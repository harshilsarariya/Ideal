import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { searchBar } from "../../api/user";

const SearchBar = ({ setUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSearch = async () => {
    const { data } = await searchBar(
      searchQuery.trim().charAt(0).toUpperCase() +
        searchQuery.slice(1).toLowerCase()
    );
    setUsers(data);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Searchbar
      className="bg-white rounded-lg m-2"
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBar;
