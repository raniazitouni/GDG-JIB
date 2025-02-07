/* eslint-disable react/prop-types */
import filterIcon from "../../../public/Assets/eventAssets/filters.svg";

export function ButtonFilters({ clickHandler }) {
  return (
    <button
      onClick={() => clickHandler()}
      className="flex items-center bg-[#46237A] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#351A5A] transition duration-300"
    >
      <img src={filterIcon} alt="Filter Icon" className="w-5 h-5 mr-2" />
      Filtres
    </button>
  );
}

export default ButtonFilters;
