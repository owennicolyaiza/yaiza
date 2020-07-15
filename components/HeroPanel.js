import React from 'react';
import classNames from 'classnames';
import { default as Video } from 'react-html5video';
import { VIDEO_URL } from '../lib/constants';

const HeroPanel = ({ project, isVideoPlaying, isMobile }) => {
  const { data } = project
  console.log('====> data:', data)
  const videoFile = data["hero-video-file"];
  const heroImage = data["hero-image"]?.url;
  const heroImageUrl = `${heroImage}&w=1400`;
  console.log('====> videoFile:', videoFile)
  console.log('====> heroImage:', heroImage)
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
          ref={(player) => { this.videoPlayer = player; }}
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
};

export default HeroPanel
