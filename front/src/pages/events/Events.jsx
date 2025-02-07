
import ListCards from "../../components/Events/ListCards";
import pic from "../../../public/Assets/eventAssets/image-Event.png";
import SearchBar from "../../components/Events/SearchBar";
import PopUP from "../../components/Events/PopUP";
import { useState  , useEffect} from "react";
const Events = () => {
  const eventsList = [
    {
      image: pic,
      title: "Conférence Tech 2025",
      link: "#",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      domaine: "Technologie",
      type: "Conférence",
      date: "15 Mars 2025",
      location: "Paris",
    },
    {
      image: pic,
      title: "Atelier UI/UX",
      link: "#",
      description: "Un atelier pour améliorer vos compétences en design UX.",
      domaine: "Design",
      type: "Workshop",
      date: "20 Mars 2025",
      location: "Lyon",
    },
    {
      image: pic,
      title: "Hackathon IA",
      link: "#",
      description: "Compétition de 48h pour innover avec l'intelligence artificielle.",
      domaine: "IA",
      type: "Hackathon",
      date: "25 Mars 2025",
      location: "Marseille",
    },
    {
      image: pic,
      title: "Meetup Développeurs",
      link: "#",
      description: "Rencontrez des développeurs et partagez vos expériences.",
      domaine: "Développement",
      type: "Meetup",
      date: "5 Avril 2025",
      location: "Toulouse",
    },
    
    {
      image: pic,
      title: "Workshop Cloud Computing",
      link: "#",
      description: "Apprenez à déployer des applications dans le cloud.",
      domaine: "Cloud",
      type: "Workshop",
      date: "18 Avril 2025",
      location: "Bordeaux",
    },
  ];


  const [IsClicked, SetIsClicked] = useState(false); // to open the pop up and close it
  const [searchValue, setSearchValue] = useState(""); // Store input value
  const [formData, setFormData] = useState({
    Domaine: "",
    Type: "",
    Wilaya: "",
  });

  const [dataToSend, setDataToSend] = useState({ searchValue, formData });

      useEffect(() => {
        setDataToSend({ searchValue, formData });
      }, [searchValue, formData]);

  console.log("/n search part : " , searchValue);
  console.log("/n formData part : " , formData);
  console.log("DATA TO SEND",dataToSend);
   // INTEGRATION ICI
  function clickHandler() {
    SetIsClicked(!IsClicked);
  }


  return (
    <div className="relative h-screen w-full "> 
      <div className="bg-[#f3f3f3] pt-[16px] pl-[64px] pr-[64px] ">
        <SearchBar clickHandler={clickHandler} searchValue={searchValue} setSearchValue={setSearchValue}/>
        <ListCards events={eventsList} SetIsClicked={SetIsClicked} IsClicked={IsClicked} />
      </div>
  
      <div >
      {IsClicked && (
  <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
    <div className="bg-white rounded-lg opacity-100"> 
      <PopUP clickHandler={clickHandler} formData={formData} setFormData={setFormData} />
    </div>
  </div>
)}

      </div>

  
      
    </div>
  );
  
};

export default Events;
