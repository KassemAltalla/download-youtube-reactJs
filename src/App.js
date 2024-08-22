import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import VideoDownloader from "./Component/VideoDownloader/VideoDownloader";
import DownloadVideo from "./Component/DownloadVideo/DownloadVideo";
import Footer from "./Component/Footer/Footer";

function App() {
  return (
    <div className="App">
      <DownloadVideo />
      <Footer />
    </div>
  );
}

export default App;
