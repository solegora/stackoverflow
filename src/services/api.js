import axios from "axios";

const API_BASE_URL = "https://api.stackexchange.com/2.2";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
        pagesize: 20,
        order: "desc",
        sort: "reputation",
        site: "stackoverflow"
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("Response Error:", error.response.data);
      console.log("Status Code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Request Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.log("Error:", error.message);
    }
    throw new Error("Failed to fetch users");
  }
};
