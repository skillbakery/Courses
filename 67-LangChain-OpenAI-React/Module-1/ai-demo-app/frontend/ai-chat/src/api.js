import axios from "axios";
//Module 1 - Implementation
export const sendMessage = async (message) => {
  const res = await axios.post("http://localhost:5000/chat", { message });
  return res.data;
};

/* Use this when checking Module 6 - Demo instead of the above code
export const sendMessage = async (message) => {
  const res = await axios.post("http://localhost:5000/cache/chat", { prompt:message });
  console.log(res);
  return {
    answer: res.data.reply,
  };
  
};

*/