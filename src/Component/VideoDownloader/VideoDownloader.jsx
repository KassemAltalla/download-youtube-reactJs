import React, { useState } from "react";
import axios from "axios";
import "./VideoDownloader.css";

const VideoDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const getCsrfToken = () => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, 10) === "csrftoken=") {
          cookieValue = decodeURIComponent(cookie.substring(10));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrfToken = getCsrfToken();

  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/download/",
        { video_url: videoUrl },
        {
          responseType: "blob", // مهم للتعامل مع البيانات الثنائية (binary)
        }
      );

      // إنشاء رابط تنزيل
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      // تعيين اسم الملف
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : "video.mp4";
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the video", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default VideoDownloader;
