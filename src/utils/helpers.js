import axios from "axios";

// this function is used to set the axios settings
export const setAxiosSettings = () => {
  //   axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
  //   axios.defaults.baseURL = "http://localhost:5000";
  //   const token = Cookies.get("access_token");
  const token = JSON.parse(localStorage.getItem("user_token"))
  //   if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${encodeURIComponent(
    token
  )}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  //   }
};

export function formatTime(hours, minutes, seconds) {
  // Convertimos los minutos y segundos a cadenas de texto
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Devolvemos el formato de hora
  return hours + ":" + minutes + ":" + seconds;
}