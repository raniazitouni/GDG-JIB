import ListCards from "../../components/Internships/ListCards";
import pic from "../../../public/Assets/eventAssets/internship-pic.svg";
import SearchBar from "../../components/Internships/SearchBar";
import PopUP from "../../components/Internships/PopUp";
import { useState, useEffect } from "react";
import { fetchData } from "../../utils/utils";

const Internships = () => {
  const [internshipsList, setInternshipsList] = useState([]);

  const [IsClicked, SetIsClicked] = useState(false); // to open the pop up and close it
  const [searchValue, setSearchValue] = useState(""); // Store input value
  const [formData, setFormData] = useState({
    Domaine: "",
    Type: "",
    duree: "",
  });

  const fetchSearch = async (requestBody) => {
    const res = await fetchData(
      "http://localhost:8000/search/opportunities/",
      "POST",
      requestBody
    );
    console.log("hii");

    console.log(res.Opportunities);

    if (res.error) {
      console.error("error:", res.error);
    } else {
      setInternshipsList(res.Opportunities);
    }
  };

  useEffect(() => {
    const requestBody = { searchValue: searchValue };
    fetchSearch(requestBody);
  }, [searchValue]);

  useEffect(() => {
    const fetchOpps = async () => {
      const res = await fetchData("http://localhost:8000/info/opps/", "GET");

      console.log(res.Opportunities);

      if (res.error) {
        console.error("error:", res.error);
      } else {
        setInternshipsList(res.Opportunities);
      }
    };

    fetchOpps();
  }, []);

  function clickHandler() {
    SetIsClicked(!IsClicked);
  }

  return (
    <div className="relative h-screen w-full bg-[#f3f3f3] ">
      <div className=" pt-[16px] pl-[64px] pr-[64px] ">
        <SearchBar
          clickHandler={clickHandler}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <ListCards internships={internshipsList} />
      </div>

      <div>
        {IsClicked && (
          <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-lg opacity-100">
              <PopUP
                clickHandler={clickHandler}
                formData={formData}
                setFormData={setFormData}
                fetchSearch={fetchSearch}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
