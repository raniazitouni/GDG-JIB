/* eslint-disable react/prop-types */

import search from "../../../public/Assets/eventAssets/search.svg";
import ButtonFilters from "./ButtonFilters";

export function SearchBar({ clickHandler  ,searchValue,  setSearchValue}) {
  

  return (
    <div className="flex flex-row items-center justify-between gap-6 mb-[16px]">
      
      <div className="flex items-center bg-white shadow-md rounded-lg px-3 py-2 w-full">
        <img src={search} alt="Search Icon" className="w-5 h-5 mr-2" />
        <input
          type="text"
          className="w-full px-3 py-1 outline-none text-gray-700 bg-transparent"
          placeholder="Rechercher..."
          value={searchValue} // Bind input to state
          onChange={(e) => setSearchValue(e.target.value)} // Update state on change
        />
      </div>

      <ButtonFilters clickHandler={clickHandler} />
      
    </div>
  );
}

export default SearchBar;
