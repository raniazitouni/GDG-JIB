/* eslint-disable react/prop-types */
import Card from "./Card";


export function ListCards({ events,  IsClicked }) {
  console.log(IsClicked);
  return (
    <>
      <div
        className="h-[650px] overflow-auto grid grid-cols-1 
      md:grid-cols-3 gap-x-[0px] gap-y-[23px] w-full bg-[#f3f3f3]"
      >
        {events.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
        <div className="relative h-full">
        
        </div>
      
      
    </>
  );
}

export default ListCards;
