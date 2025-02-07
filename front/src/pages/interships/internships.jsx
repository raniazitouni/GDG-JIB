
import ListCards from "../../components/Internships/ListCards";
import pic from "../../../public/Assets/eventAssets/internship-pic.svg";
import SearchBar from "../../components/Internships/SearchBar";
import PopUP from "../../components/Internships/PopUp";
import { useState  , useEffect} from "react";
const Internships = () => {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiii");
  const internshipsList = [
    {
      img: pic,
      title: "Conférence Tech 2025",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      duree: "2-3 mois",
      location: "Paris",
      


    },
    {
      img: pic,
      title: "Conférence Tech 2025",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      duree: "2 mois",
      location: "Lyon",
    },
    {
      img: pic,
      title: "Conférence Tech 2025",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      duree: "2 mois",
      location: "Paris",
    },
    {
      img: pic,
      title: "Conférence Tech 2025",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      duree: "2 mois",
      location: "Paris",
    },
    
    {
      img: pic,
      title: "Conférence Tech 2025",
      description: "Une conférence incontournable sur les nouvelles technologies.",
      duree: "2 mois",
      location: "Paris",
    },
  ];


  const [IsClicked, SetIsClicked] = useState(false); // to open the pop up and close it
  const [searchValue, setSearchValue] = useState(""); // Store input value
  const [formData, setFormData] = useState({
    Domaine: "",
    Type: "",
    duree: "",
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
        <ListCards internships={internshipsList}  />
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

export default Internships;
