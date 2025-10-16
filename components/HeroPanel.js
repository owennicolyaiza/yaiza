import React, { forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import { VIDEO_URL } from '../lib/constants';

const HeroPanel = forwardRef(({ project, isVideoPlaying, isMobile, playVideo, pauseVideo, setHasVideoPlayed, hasVideoPlayed }, ref) => {
  const { data = {} } = project;
  // const videoFile = data["hero-video-file"];
  const videoFile = '';
  const heroImage = data["hero-image"]?.url;
  const heroImageUrl = `${heroImage}&w=1400`;
  let heroClasses = classNames({
    'hero': true,
    'fadeIn': true,
    'animated': true,
    'has-image': heroImage !== undefined,
    'video-container': videoFile !== undefined,
    'active': videoFile !== undefined && isVideoPlaying
  });


  const toggleVideoPlay = () => {
    setHasVideoPlayed(true);
    if (isVideoPlaying) {
      return pauseVideo();
    }
    return playVideo();
  }
  return (videoFile)
    ? (<div
      key={videoFile}
      className={heroClasses}>
      {isMobile &&
        <video
          poster={heroImageUrl}
          id="VideoPlayer"
          onCanPlayThrough={() => {
            // Do stuff
          }}>
          <source src={`${VIDEO_URL}${videoFile}.webm`} type="video/webm" />
          <source src={`${VIDEO_URL}${videoFile}.mp4`} type="video/mp4" />
        </video>}
      {!isMobile &&
        <>
          <button type="button" className={`play-button ${isVideoPlaying ? 'paused' : ''}`} onClick={toggleVideoPlay}></button>
          <video
            ref={ref}
            id="VideoPlayer"
            loop
            poster={heroImageUrl}
          >
            <source src={`${VIDEO_URL}${videoFile}.webm`} type="video/webm" />
            <source src={`${VIDEO_URL}${videoFile}.mp4`} type="video/mp4" />
          </video>
        </>
      }


    </div>)
    : (<div
      key={heroClasses}
      className={heroClasses}
      style={{ 'backgroundImage': `url(${heroImageUrl})` }} />);
});

export default HeroPanel
