import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DownloadVideo.css";
import { FaDownload } from "react-icons/fa"; // أيقونة التحميل
import youtube from "../../Assest/6512cfc26e3ee8ff26a2185b_ico-YouTube.svg";
import YouTube from "react-youtube";
import girlPhone from "../../Assest/girlPhone.jpg";
import RowSection2 from "../rowSection2/RowSection2";
import Card from "../Card/Card";
import quality from "../../Assest/icons8-quality-64.png";
import fast from "../../Assest/icons8-fast-50.png";
import infinite from "../../Assest/icons8-infinite-32.png";
import devices from "../../Assest/icons8-devices-50.png";
import Footer from "../Footer/Footer";

const baseUrl="https://download-youtube-django.onrender.com"

const DownloadVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [fileURL, setFileURL] = useState(null);

  const handleDownload = async () => {
    setLoading(true);

    const vUrl = new URL(videoUrl);
    const videoId = vUrl.searchParams.get("v");
    setVideoId(videoId);

    try {
      const response = await axios.post(
        "http://localhost:8000/download_video/",
        { video_url: videoUrl }
      );
      setLoading(false);
      setTaskId(response.data.task_id);
    } catch (error) {
      console.error("Error starting download:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoFilePath) {
      const downloadURL = `http://localhost:8000/download_file/${taskId}/`;

      const downloadFile = async () => {
        try {
          const response = await axios.get(downloadURL, {
            responseType: "blob", // استجابة السيرفر ستكون كبلوب (Binary Large Object)
          });

          // إنشاء رابط مؤقت للملف المنزل
          const url = window.URL.createObjectURL(new Blob([response.data]));
          setFileURL(url);
        } catch (error) {
          console.error("Failed to download file:", error);
        }
      };

      downloadFile();
    }

    // تنظيف الرابط المؤقت عند تفكيك المكون
    return () => {
      if (fileURL) {
        window.URL.revokeObjectURL(fileURL);
      }
    };
  }, [fileURL, taskId, videoFilePath]);

  // useEffect(() => {
  //   // تحميل الفيديو تلقائيًا عند توفره
  //   if (videoFilePath) {
  //     console.log(videoFilePath);
  //     const link = document.createElement("a");
  //     link.href = videoFilePath;
  //     link.download = "video.mp4";
  //     link.click();
  //   }
  // }, [videoFilePath]);

  useEffect(() => {
    let interval;
    if (taskId) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/download_status/${taskId}/`
          );
          setProgress(response.data);
          if (response.data.status === "completed") {
            clearInterval(interval);
            fetchVideo(taskId);
          }
        } catch (error) {
          console.error("Error fetching download status:", error);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [taskId]);

  const fetchVideo = async (taskId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/download_status/${taskId}/`
      );
      setProgress(response.data);
      if (response.data.status === "completed") {
        setVideoFilePath(response.data.video_file_path);
      }
    } catch (error) {
      console.error("Error fetching video file path:", error);
    }
  };

  function bytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
  const options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <img className="youtube " src={youtube} alt="" />
      <h1>YouTube Video Downloader</h1>
      <h3 className="w-96 center mx-auto my-7">
        Paste the YouTube video URL and instantly download videos for offline
        viewing.
      </h3>
      <div className="inputContainer m-5">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
          }}
          placeholder="Enter YouTube video link for download"
        />
        <button onClick={handleDownload} disabled={loading}>
          {loading ? (
            "Loading..."
          ) : (
            <p className="flex flex-row items-center">
              <FaDownload className="icon" />
              Download
            </p>
          )}
        </button>
      </div>
      <div className="h-20 to-red-600"></div>

      {progress && (
        <div>
          {progress.status === "started" && (
            <div className="font-medium text-3xl">Start download wait ...</div>
          )}

          {progress.status === "downloading" && (
            <div>
              <p>
                Downloaded {bytesToMB(progress.downloaded_bytes)} MB of{" "}
                {bytesToMB(progress.total_bytes)} MB.
              </p>
              <p>the remaining time : {Math.floor(progress.eta)} s</p>
            </div>
          )}

          {progress.status === "completed" && (
            <p className="font-medium text-3xl mb-4">Download completed!</p>
          )}

          {progress.status === "error" && (
            <p>Error: {Math.floor(progress.error)}</p>
          )}
        </div>
      )}

      {videoFilePath && (
        <div>
          <h2 className="mb-2">Video Downloaded:</h2>
          <a
            className="savebtn"
            href={`http://localhost:8000/download_file/${taskId}/`}
            download
          >
            Save Video
          </a>
        </div>
      )}

      {videoId && (
        <YouTube
          style={{ width: 640, marginInline: "auto" }}
          className="youtubeVideo my-5 "
          videoId={videoId}
          opts={options}
        />
      )}
      <section className="section1">
        <div className="title">
          Free <span>YouTube</span>{" "}
        </div>
        <div className="title2">Video Downloader</div>
        <p>
          With This Platform, You Can Easily Download Any Video From YouTube For
          Free
        </p>
      </section>
      <section className="section2">
        <div className="w-3/4">
          <img src={girlPhone} alt="" />
        </div>
        <div className="text">
          <div>
            <div className="title">How to use</div>
            <div className="title2">
              <span>YouTube</span> Downloader
            </div>
          </div>
          <div>
            <RowSection2
              num="01"
              title="Find Video"
              text="
                  Find The Video You Want From Among The Videos Available On
                  YouTube And Copy Its Link."
            />
            <RowSection2
              num="02"
              title="Paste Video"
              text="
                  
                  Paste The Copied Link In The Desired Box And Then Wait For The
                  System To Display The Desired Video Download Links In
                  Different Formats And Sizes."
            />
            <RowSection2
              num="03"
              title="Download Video"
              text="And In The Last Step, Click On Download From The Displayed
                  List And Download The Desired Video And Save It On Your
                  Device."
            />
          </div>
        </div>
      </section>

      <section className="section3">
        <div className="title">Why To Choose </div>
        <div className="title2 mb-12">
          <span>VideoMax</span> Downloader
        </div>
        <div className="flex gap-4">
          <Card
            img={quality}
            title="High Quality"
            text="You Can Download All The Videos In The YouTube Library Without
            Losing Quality And In A Short Time. All Videos Can Be Downloaded In
            Mp4 And Even Mp3 Formats."
          />
          <Card
            img={fast}
            title="Fast Downloading"
            text="Using X YouTube Downloader, Quickly Download Your Desired Videos
            From YouTube With Just A Few Simple Clicks Without Wasting Any Time
            Or Paying Extra Fees."
          />
          <Card
            img={infinite}
            title="Unlimited Download"
            text="Through This Platform, You Can Download The Videos You Want At Any
            Time And Without Limiting The Number Of Downloads. Transfer Speed Is
            Up To KB/S."
          />
          <Card
            img={devices}
            title="Support all devices"
            text="YouTube Downloader Is A Web-Based And Online Platform That You Can
            Use Any Operating System, Including Windows, Linux, iPhones, And
            Android."
          />
        </div>
      </section>
    </div>
  );
};

export default DownloadVideo;
