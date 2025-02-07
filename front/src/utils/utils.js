import axios from "axios";

export const fetchData = async (
  url,
  method = "GET",
  data = null,
  token = null
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      url,
      method,
      headers,
      data, 
    });

    return response.data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: error.message };
  }
};
