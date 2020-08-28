import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { getProjectOverview } from '../../lib/api';
import { RichText } from 'prismic-reactjs';
import ImageSlider from '../../components/ImageSlider';
import SVGRightChevron from '../../components/SVG/SVGRightChevron';
import SVGLeftChevron from '../../components/SVG/SVGLeftChevron';
import SVGYaizaLogo from '../../components/SVG/SVGYaizaLogo'

// // External modules
// import ExecutionEnvironment from 'exenv';
import { Play, Mute, Seek } from 'react-html5video';
import Link from 'next/link';
import HeroPanel from '../../components/HeroPanel';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.videoPlayer = null;
    this.handleScroll = this.handleScroll.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
  }

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
      window.addEventListener('scroll', this.handleScroll);
      setTimeout(() => {
        if (this.videoPlayer) this.playVideo()
      }, 4000)

    }
    if (ExecutionEnvironment.canUseDOM) {
      document.body.classList.add('light')
      if (this.props.mobile) {
        setTimeout(() => {
          const VP = document.getElementById('VideoPlayer')
          if (VP) VP.setAttribute('controls', 'controls')
        }, 4000)
      }
    }
  }

  componentWillUnmount() {
    if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (ExecutionEnvironment.canUseDOM) {
      document.body.classList.remove('light')
    }
  }

  handleScroll(event) {
    if (!this.videoPlayer) return;
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > this.props.headerHeight) {
      this.pauseVideo()
    }
    else {
      this.playVideo();
    }
  }

  playVideo() {
    this.videoPlayer.play();
  }

  pauseVideo() {
    this.videoPlayer.pause();
  }

  render() {


  }
}


export default function Project({ project, preview, paths }) {
  const router = useRouter();

  if (!project) return null;

  const { uid } = project;

  if ((!router.isFallback && !uid) || Object.keys(project).length === 0) {
    return <ErrorPage statusCode={404} />;
  }

  const handleScroll = (event) => {
    if (!this.videoPlayer) return;
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > this.props.headerHeight) {
      this.pauseVideo()
    }
    else {
      this.playVideo();
    }
  }

  const playVideo = () => {
    this.videoPlayer.play();
  }

  const pauseVideo = () => {
    this.videoPlayer.pause();
  }

  useEffect(() => {
    document.body.classList.add('light')
    window.addEventListener('scroll', this.handleScroll)
    setTimeout(() => {
      if (this.videoPlayer) this.playVideo()
    }, 4000)

    return () => {
      document.body.classList.remove('light')
    }
  }, [])

  if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      if (this.videoPlayer) this.playVideo()
    }, 4000)

    if (this.props.mobile) {
      setTimeout(() => {
        const VP = document.getElementById('VideoPlayer')
        if (VP) VP.setAttribute('controls', 'controls')
      }, 4000)
    }

  }

  const { data: { contentArea = [] } = {} } = project

  const pageContentOutput = contentArea.length
    ? contentArea.map((slice, index) => {
      const sliceLabel = slice.slice_label || '';
      const sliceValue = slice.value
      console.log('====> sliceValue:', sliceValue)
      switch (slice.slice_type) {
        case 'Content':
          const contentClasses = `content-container ${sliceLabel}`;
          return (<Fade bottom spy={uid} key={index}>
            <div className={contentClasses}>
              <RichText render={sliceValue} />
            </div>
          </Fade>);
        case 'Content Dark':
          const contentDarkClasses = `content-container content-container--dark ${sliceLabel}`;
          return (<Fade bottom spy={uid} key={index}>
            <div className={contentDarkClasses}>
              <RichText render={sliceValue} />
            </div>
          </Fade>)
        case 'Image':
          const image = sliceValue[0]
          const imageClasses = `projects-image-container ${sliceLabel}`;
          if (!sliceValue?.length) return;
          if (sliceValue?.length === 1) {
            let imageObj = image.Image.url;
            let linkUid = image.Link.uid;
            let heading = image.Heading;
            let subHeading = image.Subheading;
            subHeading = subHeading.split(',');
            return (<Fade bottom spy={uid} key={index}>
              <div className={imageClasses}>
                <Link href={`/projects/${linkUid}`} as={`/projects/${linkUid}`}>
                  <a>
                    <div className="projects-image-container__angle"></div>
                    <div className="projects-image-container__content">
                      <h2>
                        {heading}
                      </h2>
                      <div className="sub-headings">
                        {subHeading && subHeading.map((word, index) => <p key={index}>{word}</p>)}
                      </div>
                    </div>
                    <Image url={imageObj}></Image>
                  </a>
                </Link>
              </div>
            </Fade>);
          }
        case 'Image Group':
          const imageGroup = slice.value[0];
          const imageGroupClasses = 'projects-image-group-container';
          let imageObj = imageGroup.Image.url;
          let tallImage = imageGroup?.ImageType === 'True';
          let linkUid = imageGroup.Link.uid;
          let heading = imageGroup.Heading;
          let subHeading = imageGroup.Subheading;
          subHeading = subHeading.split(',');
          let image1Classes = classNames({
            'tall-image': tallImage
          })
          let imageObj2 = imageGroup?.Image2.url;
          let tallImage2 = imageGroup?.Image2Type === 'True';
          let image2Classes = classNames({
            'tall-image': tallImage2
          });
          let linkUID2 = imageGroup?.Link2.uid;
          let heading2 = imageGroup?.Heading2;
          let subHeading2 = imageGroup?.Subheading2;
          subHeading2 = subHeading2 && subHeading2.split(',');

          return (
            <div key={index} className={sliceLabel}>
              <div className={imageGroupClasses}>
                <Fade bottom spy={uid}>
                  <Link href={`/projects/${linkUid}`}>
                    <a>
                      <div className="projects-image-container__angle"></div>
                      <div className="projects-image-container__content">
                        <h2>
                          {heading}
                        </h2>
                        <div className="sub-headings">
                          {subHeading && subHeading.map((word, index) => <p key={index}>{word}</p>)}
                        </div>
                      </div>
                      <Image url={imageObj}></Image>
                    </a>
                  </Link>
                </Fade>
                <Fade bottom spy={uid}>
                  <Link href={`/projects/${linkUID2}`}>
                    <a>
                      <div className="projects-image-container__angle"></div>
                      <div className="projects-image-container__content">
                        <h2>
                          {heading2}
                        </h2>
                        <div className="sub-headings">
                          {subHeading2 && subHeading2.map((word, index) => <p key={index}>{word}</p>)}
                        </div>
                      </div>
                      <Image url={imageObj2}></Image>
                    </a>
                  </Link>
                </Fade>
              </div>
            </div>
          );

      }
    })
    : null;

  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
          <div id="project" className="container">
            <HeroPanel project={project} />
            {pageContentOutput}
            <h1 style={{color: 'white'}}>HELLO WORLD</h1>
          </div>
        )}
    </>
  );
}


export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview,
      project: (await getProjectOverview()) ?? null,
    },
  };
}
