/* eslint-disable react/prop-types */
import Calendar_Days from "../../../public/Assets/eventAssets/Calendar_Days.svg";
import Map_Pin from "../../../public/Assets/eventAssets/Map_Pin.svg";

export function Card({
  img,
  nom,
  lien,
  description,
  domaine,
  type,
  date,
  location,
}) {
  const imgUrl = `http://127.0.0.1:8000${img}`;


  return (
    <div className="w-[350px] relative px-4  py-3.5 gap-4 rounded bg-white flex flex-col shadow-lg shadow-gray-400 transition-shadow ">
      {/* Image */}
      <img
        className="w-full h-48 object-cover rounded"
        src={imgUrl}
        alt={nom}
      />

      {/* Titre */}
      <h2 className="text-main_blue text-[20px] font-black mt-2">{nom}</h2>

      {/* Description */}
      <p className="text-gray-600 text-[13px] font-extralight">{description}</p>

      {/* Domaine & Type */}
      <div className="flex justify-between w-full">
        <p className="bg-[#46237A] text-white text-sm px-4 h-[30px] flex items-center justify-center rounded-md w-auto">
          {domaine}
        </p>
        <p className="bg-[#46237A] text-white text-sm px-4 h-[30px] flex items-center justify-center rounded-md w-auto">
          {type}
        </p>
      </div>

      {/* Date & Location */}
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-x-2">
          <img className="w-5 h-5 object-cover rounded" src={Calendar_Days} />
          <p className="text-black text-sm">{date}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <img className="w-5 h-5 object-cover rounded" src={Map_Pin} />
          <p className="text-black text-sm">{location}</p>
        </div>
      </div>

      {/* Lien */}
      {lien && (
        <a
          href={lien}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-blue-500 hover:underline"
        >
          Inscription Link
        </a>
      )}
    </div>
  );
}

export default Card;