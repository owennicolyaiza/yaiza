import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { default as Video } from 'react-html5video';
import { VIDEO_URL } from '../lib/constants';

const HeroPanel = forwardRef(({ project, isVideoPlaying, isMobile }, ref) => {
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
        <Video
          poster={heroImageUrl}
          id="VideoPlayer"
          onCanPlayThrough={() => {
            // Do stuff 
          }}>
          <source src={`${VIDEO_URL}${videoFile}.webm`} type="video/webm" />
          <source src={`${VIDEO_URL}${videoFile}.mp4`} type="video/mp4" />
        </Video>}
      {!isMobile &&
        <Video
          ref={ref}
          id="VideoPlayer"
          autoplay
          loop
          poster={heroImageUrl}
          onCanPlayThrough={() => {
          }}>
          <source src={`${VIDEO_URL}${videoFile}.webm`} type="video/webm" />
          <source src={`${VIDEO_URL}${videoFile}.mp4`} type="video/mp4" />
        </Video>}

    </div>)
    : (<div
      key={heroClasses}
      className={heroClasses}
      style={{ 'backgroundImage': `url(${heroImageUrl})` }} />);
});

export default HeroPanel
