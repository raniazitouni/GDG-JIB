import ListCards from "../../components/Events/ListCards";
import pic from "../../../public/Assets/eventAssets/image-Event.png";
import SearchBar from "../../components/Events/SearchBar";
import PopUP from "../../components/Events/PopUP";
import { useState, useEffect } from "react";
import { fetchData } from "../../utils/utils";
const Events = () => {
  const [eventsList, setEventList] = useState([]);

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

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetchData("http://localhost:8000/info/events/", "GET");

      console.log(res.events);

      if (res.error) {
        console.error("error:", res.error);
      } else {
        setEventList(res.events);
      }
    };

    fetchEvents();
  }, []);

  const clickHandler = async (e) => {
    SetIsClicked(!IsClicked);

    // console.log(requestBody);

    const res = await fetchData(
      "http://localhost:8000/search/search_events",
      "POST",
      dataToSend
    );

    if (res.error) {
      console.error("error:", res.error);
    } else {
      setEventList(res.events);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative h-screen bg-[#f3f3f3]">
      <div className=" pt-[16px] pl-[64px] pr-[64px] ">
        <SearchBar
          clickHandler={clickHandler}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <ListCards
          events={eventsList}
          SetIsClicked={SetIsClicked}
          IsClicked={IsClicked}
        />
      </div>

      {IsClicked && (
        <div className="absolute inset-0 flex justify-center items-center bg-bg_gris bg-opacity-60 z-20">
          <PopUP
            clickHandler={clickHandler}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}
    </div>
  );
};

export default Events;
