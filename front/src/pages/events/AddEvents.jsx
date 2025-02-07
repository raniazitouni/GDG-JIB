/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {fetchData} from "../../utils/utils.js"


const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetchData("http://localhost:3000/events");
      console.log(res);
      
      setEvents(res); // Store the events in state
    };

    getEvents(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  return <>events</>;
}

export default Events