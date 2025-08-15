"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Define the type for video data
interface VideoData {
  src: string;
  alt: string;
}

const WebShopVideo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Initialize the state to track play/pause status of each video
  const [playingVideo, setPlayingVideo] = useState<{ index: number; playing: boolean }[]>([
    { index: 0, playing: !isMobile },
    { index: 1, playing: !isMobile },
  ]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Callback ref function to set video elements in the videoRefs array
  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  };

  const handlePlayPause = (index: number) => {
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      // Determine the new play/pause status
      const isPlaying = playingVideo.find((video) => video.index === index)?.playing || false;

      if (isPlaying) {
        currentVideo.pause();
        setPlayingVideo((prevState) => prevState.map((video) =>
          video.index === index ? { ...video, playing: false } : video
        ));
      } else {
        currentVideo.play();
        setPlayingVideo((prevState) => [
          ...prevState.filter((video) => video.index !== index),
          { index, playing: true }
        ]);
      }
    }
  };

  const handlePause = (index: number) => {
    setPlayingVideo((prevState) => prevState.map((video) =>
      video.index === index ? { ...video, playing: false } : video
    ));
  }

  const handlePlay = (index: number) => {
    setPlayingVideo((prevState) => [
      ...prevState.filter((video) => video.index !== index),
      { index, playing: true }
    ]);
  }

  const videoData: VideoData[] = [
    { src: "/video/video_1.mp4", alt: "Video 1" },
    { src: "/video/video_2.mp4", alt: "Video 2" },
    // Add more video data as needed
  ];

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);

      // Update playingVideo state based on mobile detection
      setPlayingVideo([
        { index: 0, playing: !isMobileDevice },
        { index: 1, playing: !isMobileDevice },
      ]);
    };

    checkMobile(); // Initial check on component mount
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-wrap gap-[30px] md:gap-0">
      {videoData.map((video, index) => (
        <div key={index} className="relative w-full pb-[60%] md:pb-[27%] md:w-1/2">
          <video
            autoPlay={!isMobile}
            ref={setVideoRef(index)}
            className="absolute w-full h-full object-cover"
            controls={false}
            muted
            loop
            onPause={() => handlePause(index)}
            onPlay={() => handlePlay(index)}
          >
            <source src={video.src} type="video/mp4" />
          </video>
          <button
            onClick={() => handlePlayPause(index)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image
              width={100}
              height={100}
              src={playingVideo.find((video) => video.index === index)?.playing ? "/images/pause.svg" : "/images/play.svg"}
              alt={playingVideo.find((video) => video.index === index)?.playing ? "Pause" : "Play"}
              className="w-[70px] h-[70px]"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default WebShopVideo;
