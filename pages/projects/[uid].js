import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { getAllProjects, getProject } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import { RichText } from 'prismic-reactjs';
import ImageSlider from '../../components/ImageSlider';
import SVGRightChevron from '../../components/SVG/SVGRightChevron';
import SVGLeftChevron from '../../components/SVG/SVGLeftChevron';
import SVGYaizaLogo from '../../components/SVG/SVGYaizaLogo'

// // External modules
// import ExecutionEnvironment from 'exenv';
import { default as Video, Play, Mute, Seek } from 'react-html5video';
import Link from 'next/link';
import HeroPanel from '../../components/HeroPanel';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

const PrevNextLinks = ({ paths, uid }) => {
  const thisIndex = paths.findIndex(path => path === `/projects/${uid}`);
  const nextProjectURL = thisIndex !== paths.length - 1 && `${paths[(thisIndex + 1)]}`;
  const prevProjectURL = thisIndex > 0 && `${paths[(thisIndex - 1)]}`;


  return (
    <div className="prev-next-links-container animated fadeIn delayed-animation">
      {nextProjectURL && uid === 'about-me' &&
        <div className="prev">
          <Link href='/projects/[uid]' as={nextProjectURL}>
            <a className="prev-link" >My Latest Projects</a>
          </Link>
        </div>
      }
      {uid === 'about-me' &&
        <div className="next image">
          <img src="/assets/me-laughing-web.jpg" className="img-responsive" />
        </div>
      }
      {prevProjectURL && uid !== 'about-me' &&
        <div className="prev">
          <Link href='/projects/[uid]' as={prevProjectURL}>
            <a className="prev-link">Previous Project</a>
          </Link>
        </div>}
      {nextProjectURL && uid !== 'about-me' &&
        <div className="next">
          <Link href='/projects/[uid]' as={nextProjectURL}>
            <a className="next-link">Next Project</a>
          </Link>
        </div>}
    </div>
  );
}

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

  useEffect(() => {
    document.body.classList.add('light')

    return () => {
      document.body.classList.remove('light')
    }
  }, [])

  const { data: { contentArea = [] } = {} } = project
  let slicesArray = [];

  const pageContentOutput = contentArea.length
    ? contentArea.map((slice, index) => {
      const sliceLabel = slice.slice_label || '';
      const sliceValue = slice.value[0] || {}
      switch (slice.slice_type) {
        case 'content':
          const contentClasses = `content-container ${sliceLabel}`;
          return (<Fade bottom spy={uid} appear={true} key={index}>
            <div className={contentClasses}>
              <div>
                <RichText render={slice.value} />
              </div>
            </div>
          </Fade>);
        case 'Content Dark':
          const contentDarkClasses = `content-container content-container--dark ${sliceLabel}`;
          return (<Fade bottom spy={uid} appear={true} key={index}>
            <div className={contentDarkClasses}>
              <RichText render={slice.value} />
            </div>
          </Fade>);
        case 'Logo':
          const logoBGColor = sliceValue["background-colour"];
          const logoCaption = sliceValue["caption"];
          const hasCaption = logoCaption ? 'has-caption' : '';
          const logoClasses = `logo-container ${sliceLabel} ${hasCaption}`;
          const logoIcon = sliceValue["icon"].url;
          return (
            <Fade bottom spy={uid} appear={true} key={index}>
              <div className={logoClasses} style={{ backgroundColor: logoBGColor }}>
                <div>
                  {logoIcon &&
                    <div className="image-roll-icon">
                      <img src={logoIcon} className="img-responsive" />
                    </div>
                  }
                  {logoCaption &&
                    <h6>{logoCaption}</h6>
                  }
                </div>
              </div>
            </Fade>
          );
        case 'Image Rollover':
          const imageRollClasses = `image-roll-container ${sliceLabel}`;
          const imageRollColor = sliceValue["background-colour"];
          const imageRollIcon = sliceValue["icon"].url;
          const imageRollBgImage = sliceValue["rollover-background-image"].url;
          const imageRolloverIcon = sliceValue["rollover-icon"].url;
          const imageRolloverText = sliceValue["rollover-text"];
          return (
            <Fade bottom spy={uid} appear={true} key={index}>
              <div className={imageRollClasses}>
                <div className="image-roll-default" style={{ backgroundColor: imageRollColor }}>
                  {imageRollIcon &&
                    <div className="image-roll-icon">
                      <img src={imageRollIcon} className="img-responsive" />
                    </div>
                  }
                </div>
                <div className="image-roll-over-container" style={{ backgroundColor: imageRollColor }}>
                  <div className="image-roll-over-image" style={{ backgroundImage: `url(${imageRollBgImage})` }} />
                  <div className="image-roll-over-assets">
                    {imageRolloverIcon &&
                      <div className="image-roll-over-icon">
                        <img src={imageRolloverIcon} className="img-responsive" />
                      </div>
                    }
                    {imageRolloverText &&
                      <div className="image-roll-over-text">
                        <p>{imageRolloverText}</p>
                      </div>
                    }</div>
                </div>
              </div>
            </Fade>
          );
        case 'One Side Tall':
          const oneSideTallTImage = sliceValue["tallImage"].url;
          const oneSideTallTopSImage = sliceValue["otherSideTopImage"].url;
          const oneSideTallSImage = sliceValue["otherSideBottomImage"].url;
          const oneSideTallText = sliceValue["otherSideTopText"];
          console.log('====> oneSideTallText:', oneSideTallText)

          switch (sliceLabel) {
            default:
            case 'left-side-tall': {
              return (
                <Fade bottom spy={uid} appear={true} key={index}>
                  <div className="one-side-tall-container">
                    <div className="one-side-tall">
                      <div className="tall half-width">
                        <img src={oneSideTallTImage} className="img-responsive" />
                      </div>
                      <div className="others half-width">
                        {!oneSideTallTopSImage && oneSideTallText &&
                          <div className="content" dangerouslySetInnerHTML={{ __html: oneSideTallText }} />
                        }
                        {oneSideTallTopSImage &&
                          <div>
                            <img src={oneSideTallTopSImage} className="img-responsive" />
                          </div>
                        }
                        <div>
                          <img src={oneSideTallSImage} className="img-responsive" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              )
            }
            case 'right-side-tall': {
              return (
                <Fade bottom spy={uid} appear={true} key={index}>
                  <div className="one-side-tall-container">
                    <div className="one-side-tall">
                      <div className="others half-width">
                        {!oneSideTallTopSImage && oneSideTallText &&
                          <div className="content" dangerouslySetInnerHTML={{ __html: oneSideTallText }} />
                        }
                        {oneSideTallTopSImage &&
                          <div>
                            <img src={oneSideTallTopSImage} className="img-responsive" />
                          </div>
                        }
                        <div>
                          <img src={oneSideTallSImage} className="img-responsive" />
                        </div>
                      </div>
                      <div className="tall half-width">
                        <img src={oneSideTallTImage} className="img-responsive" />
                      </div>
                    </div>
                  </div>
                </Fade>
              )
            }
          }
        case 'Quote':
          const quoteClasses = `quote-container ${sliceLabel}`;
          const quoteText = sliceValue["quote-text"];
          const quoteSource = sliceValue["quote-source"];
          return (
            <Fade bottom spy={uid} appear={true} key={index}>
              <div className={quoteClasses} style={{ backgroundColor: '#000', color: '#fff' }}>
                <div>
                  <p className="quote-text">{quoteText}</p>
                  <p className="quote-source">{quoteSource}</p>
                </div>
              </div>
            </Fade>);
        case 'Sub Heading':
          const subHeadingText = slice.value;
          return (
            <Fade bottom spy={uid} appear={true} key={index}>
              <div className="sub-heading-container" >
                <h2>{subHeadingText}</h2>
              </div>
            </Fade>);
        case 'images':
          const images = slice.value;
          const isCentered = images[0].centered === 'Yes' ? 'centered-image' : '';
          const imageTitle = images[0].title;
          const hasTitle = imageTitle ? 'has-title' : '';
          const bgColor = images[0]['background-colour'] && images[0]['background-colour'].value;
          const imageClasses = `image-container ${sliceLabel} ${isCentered} ${hasTitle}`;
          if (!images.length) return;
          if (images.length === 1) {
            let imageObj = images[0].src;
            return (
              <Fade bottom spy={uid} appear={true} key={index}>
                <div className={imageClasses} style={{ backgroundColor: bgColor }}>
                  {hasTitle && <h2>{imageTitle}</h2>}
                  <Image url={imageObj?.url}></Image>
                </div>
              </Fade>
            );
          }
          else {
            const imagesArray = images.map((image, index) => {
              const imageObj = image.src;
              return imageObj?.url;
            });
            return (
              <Fade bottom spy={uid} appear={true} key={index}>
                <div className={imageClasses} style={{ backgroundColor: bgColor }}>
                  {hasTitle && <h2>{imageTitle}</h2>}
                  <ImageSlider key={index} images={imagesArray} />
                </div>
              </Fade>
            );
          }
      }
    })
    : null;

  return (
    <div id="wrapper">
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
          <div id="project" className="container">
            <HeroPanel project={project} />
            {pageContentOutput}
            <PrevNextLinks paths={paths} uid={uid} />
            {uid === 'about-me' &&
              <div className="yai-logo-container">
                <SVGYaizaLogo width={350} height={115} className="yai-logo" />
              </div>
            }
          </div>
        )}
    </div>
  );
}

export async function getProjectPaths() {
  const allProjects = await getAllProjects();
  return allProjects.results?.map(({ uid }) => `/projects/${uid}`) || []
}

export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      preview,
      project: (await getProject(params?.uid)) ?? null,
      paths: (await getProjectPaths()) ?? null
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: (await getProjectPaths()) ?? null,
    fallback: true,
  };
}
