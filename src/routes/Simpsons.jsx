import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

// export async function loader() {
//   const res = await axios.get("https://thesimpsonsquoteapi.glitch.me/quotes");
//   return res?.data?.[0] || [];
// }

export default function Simpsons() {
  const [simpson, setSimpson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(`/`);
  };

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(
        "https://thesimpsonsquoteapi.glitch.me/quotes"
      );
      setSimpson(res.data?.[0]);
    } catch (err) {
      setError("fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  console.log(simpson);

  if (loading)
    return (
      <div className="loader-container">
        <div className="bouncing-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="simpsons">
      <button className="back-button" onClick={onClickBack}>
        <AiOutlineArrowLeft className="back-arrow" />
      </button>
      <section className="body">
        <div className="left">
          <img src={simpson.image} className="image"></img>
        </div>
        <div className="right">
          <h1 className="head">Simpsons</h1>
          <p className="quote">{simpson.quote}</p>
          <p className="name">~{simpson.character}</p>
        </div>
      </section>
      <div className="button-container">
        <button className="refresh" onClick={fetchQuotes}>
          Refresh
        </button>
      </div>
    </div>
  );
}
