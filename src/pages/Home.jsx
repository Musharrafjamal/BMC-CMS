import bgVideo from "../assets/bg-video-1.mp4";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <video src={bgVideo} autoPlay muted loop className="video-bg" />
      <div className="content">
        <h1>
          Welcome to{" "}
          <span className="company-name">
            Book <span className="orange">my</span> Carrer
          </span>
        </h1>
        <p className="info">Founder Sajid Sir</p>
        <Link className="btn" to={'/login'} > Continue</Link>
      </div>
    </div>
  );
};

export default Home;
