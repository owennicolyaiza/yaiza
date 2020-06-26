import React from 'react';
import classNames from 'classnames';
import { default as Video } from 'react-html5video';

const HeroPanel = ({ project }) => {
  const videoFile = project?.data["hero-video-file"]?.value;
  const heroImage = project?.data["hero-image"]?.url;
  const heroImageUrl = `${heroImage}&w=1400`;
  let heroClasses = classNames({
    'hero': true,
    'fadeIn': true,
    'animated': true,
    'has-image': heroImage !== undefined,
    'video-container': videoFile !== undefined,
    'active': videoFile !== undefined && this.props.isYoutubeVideoPlaying
  });
  return (videoFile)
    ? (<div
      key={videoFile}
      className={heroClasses}>
      {this.props.mobile &&
        <Video
          poster={heroImageUrl}
          id="VideoPlayer"
          onCanPlayThrough={() => {
            // Do stuff 
          }}>
          <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
          <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
        </Video>}
      {!this.props.mobile &&
        <Video
          ref={(player) => { this.videoPlayer = player; }}
          id="VideoPlayer"
          autoplay
          loop
          poster={heroImageUrl}
          onCanPlayThrough={() => {
          }}>
          <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
          <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
        </Video>}

    </div>)
    : (<div
      key={heroClasses}
      className={heroClasses}
      style={{ 'backgroundImage': `url(${heroImageUrl})` }} />);
};

export default HeroPanel
