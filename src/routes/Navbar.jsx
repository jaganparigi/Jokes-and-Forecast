import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  function onClickSimpsons() {
    navigate(`/simpsons`);
  }

  function onClickRoot() {
    navigate(`/root`);
  }

  function onClickInputForm() {
    navigate(`/inputform`);
  }

  function onClickWeather() {
    navigate(`/weather`);
  }

  return (
    <ul id="nav">
      <div id="navEl" onClick={onClickSimpsons}>
        Simpsons
      </div>
      <div id="navEl" onClick={onClickRoot}>
        Contacts
      </div>
      <div id="InputForm" onClick={onClickInputForm}>
        Input Form
      </div>
      <div id="Weather" onClick={onClickWeather}>
        Weather
      </div>
    </ul>
  );
}
