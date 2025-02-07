/* eslint-disable react/prop-types */
import InternshipCard from "./InternshipCard";


export function ListCards({ internships }) {
  return (

   <div
           className="h-[650px] overflow-auto grid grid-cols-1 md:grid-cols-3 gap-x-[0px] gap-y-[23px] w-full bg-[#f3f3f3]"
         >
           {internships.map((card, index) => (
             <InternshipCard key={index} {...card} />
           ))}
         </div>

  );
}

export default ListCards;
