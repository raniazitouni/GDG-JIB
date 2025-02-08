/* eslint-disable react/prop-types */
import Calendar_Days from "../../../public/Assets/eventAssets/Calendar_Days.svg"
import Map_Pin from "../../../public/Assets/eventAssets/Map_Pin.svg"
import { useNavigate } from "react-router-dom";

export function InternshipCard({ img, title , description , duree , location }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-[350px] relative px-4 py-3.5 gap-4 rounded bg-white flex flex-col shadow-lg shadow-gray-400 transition-shadow duration-300 hover:cursor-pointer"
      onClick={()=>{navigate("/ApplyInternships")}}
    >
      {/* Image */}
      <img className="w-full h-48 object-cover rounded" src={img} alt={title} />

      {/* Titre */}
      <h2 className="text-main_blue text-[20px] font-black mt-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-[13px] font-extralight">{description}</p>

      {/* Date & Location */}
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-x-2">
          <img className="w-5 h-5 object-cover rounded" src={Calendar_Days} />
          <p className="text-black text-sm">{duree}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <img className="w-5 h-5 object-cover rounded" src={Map_Pin} />
          <p className="text-black text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default InternshipCard;
