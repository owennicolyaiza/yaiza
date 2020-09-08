import React, { forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import videoConnect from '../components/video';
import { VIDEO_URL } from '../lib/constants';

const HeroPanel = forwardRef(({ video, videoEl, project, isVideoPlaying, isMobile, playVideo, pauseVideo }, ref) => {
  const { data = {} } = project;
  const videoFile = data["hero-video-file"];
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
        <video
          ref={ref}
          id="VideoPlayer"
          autoPlay
          loop
          poster={heroImageUrl}
          onCanPlayThrough={() => {
          }}>
          <source src={`${VIDEO_URL}${videoFile}.webm`} type="video/webm" />
          <source src={`${VIDEO_URL}${videoFile}.mp4`} type="video/mp4" />
        </video>
      }


    </div>)
    : (<div
      key={heroClasses}
      className={heroClasses}
      style={{ 'backgroundImage': `url(${heroImageUrl})` }} />);
});

export default videoConnect(HeroPanel)
