/* eslint-disable react/prop-types */
import InternshipCard from "./InternshipCard";

export function ListCards({ internships }) {

  return (
    <div
      className="pb-20 max-h-[calc(100vh-100px)] grid grid-cols-1 
           md:grid-cols-3 gap-x-[0px] gap-y-[23px] w-full bg-[#f3f3f3] overflow-y-auto"
    >
      {internships.map((card, index) => (
        <InternshipCard
          key={index}
          {...card}
        
       
        />
      ))}
    </div>
  );
}

export default ListCards;
