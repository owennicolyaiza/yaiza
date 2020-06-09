import React from 'react';
import Reveal from 'react-reveal';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Header from '../../components/header';
import { getAllProjects, getProject } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import { RichText } from 'prismic-reactjs';
import ImageSlider from '../../components/ImageSlider';
import SVGRightChevron from '../../components/SVG/SVGRightChevron';
import SVGLeftChevron from '../../components/SVG/SVGLeftChevron';
import SVGYaizaLogo from '../../components/SVG/SVGYaizaLogo'

// // External modules
// import ExecutionEnvironment from 'exenv';
// import { default as Video, Play, Mute, Seek } from 'react-html5video';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

const PrevNextLinks = ({ projects, thisID }) => {
  const thisIndex = projects && projects.findIndex(project => project?.uid === thisID);
  const nextProjectURL = projects && thisIndex !== projects.length - 1 && `/projects/${projects[(thisIndex + 1)].uid}`;
  const prevProjectURL = projects && thisIndex > 0 && `/projects/${projects[(thisIndex - 1)].uid}`;


  return (

    <div className="prev-next-links-container animated fadeIn delayed-animation">
      {nextProjectURL && thisID === 'about-me' &&
        <div className="prev">
          <a className="prev-link" href={nextProjectURL}>My Latest Projects</a>
        </div>
      }
      {thisID === 'about-me' &&
        <div className="next image">
          <img src="/assets/me-laughing-web.jpg" className="img-responsive" />
        </div>
      }
      {prevProjectURL && thisID !== 'about-me' &&
        <div className="prev">
          <a className="prev-link" href={prevProjectURL}>Previous Project</a>
        </div>}
      {nextProjectURL && thisID !== 'about-me' &&
        <div className="next">
          <a className="next-link" href={nextProjectURL}>Next Project</a>
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


export default function Project({ project, morePosts, preview }) {
  const router = useRouter();

  if (!project) return null;

  if ((!router.isFallback && !project?.uid) || Object.keys(project).length === 0) {
    return <ErrorPage statusCode={404} />;
  }

  const { data: { contentArea = [] } = {} } = project
  let slicesArray = [];
  // if (!project?.getSliceZone('casestudy.contentArea')) return null
  // const description = project?.'casestudy.meta-description'] && project?.'casestudy.meta-description'].asText()
  // const keywords = project?.'casestudy.meta-keywords'] && project?.'casestudy.meta-keywords'].asText()
  // // map through each slice and output into array
  // for (let slice of project?.getSliceZone('casestudy.contentArea').slices) {
  //   slicesArray.push(slice);
  // };

  // const heroPanel = () => {
  //   const videoFile = project?."casestudy.hero-video-file"] && project?."casestudy.hero-video-file"].value;
  //   const heroImage = project?."casestudy.hero-image"] && project?."casestudy.hero-image"].url;
  //   let heroClasses = classNames({
  //     'hero': true,
  //     'has-image': heroImage !== undefined,
  //     'video-container': videoFile !== undefined,
  //     'active': videoFile !== undefined && this.props.isYoutubeVideoPlaying
  //   });
  //   return (videoFile)
  //     ?
  //     (<div
  //       key={videoFile}
  //       className={heroClasses}>
  //       {this.props.mobile &&
  //         <Video
  //           poster={heroImage}
  //           id="VideoPlayer"
  //           onCanPlayThrough={() => {
  //             // Do stuff 
  //           }}>
  //           <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
  //           <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
  //         </Video>
  //       }
  //       {!this.props.mobile &&
  //         <Video
  //           ref={(player) => { this.videoPlayer = player }}
  //           id="VideoPlayer"
  //           autoplay
  //           loop
  //           poster={heroImage}
  //           onCanPlayThrough={() => {
  //           }}>
  //           <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
  //           <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
  //         </Video>
  //       }

  //     </div>)
  //     :
  //     (<div
  //       key={heroClasses}
  //       className={heroClasses}
  //       style={{ 'backgroundImage': `url(${heroImage})` }} />);
  // };


  const pageContentOutput = contentArea.length
    ? contentArea.map((slice, index) => {
      const sliceLabel = slice.slice_label || '';
      const sliceValue = slice.value[0] || {}
      switch (slice.slice_type) {
        case 'content':
          const contentClasses = `content-container ${sliceLabel}`;
          return (<Reveal effect="animated fadeInUp" className={contentClasses} key={index}><RichText render={slice.value} /></Reveal>);
        case 'Content Dark':
          const contentDarkClasses = `content-container content-container--dark ${sliceLabel}`;
          return (<Reveal effect="animated fadeInUp" className={contentDarkClasses} key={index}><RichText render={slice.value} /></Reveal>);
        case 'Logo':
          const logoBGColor = sliceValue["background-colour"];
          const logoCaption = sliceValue["caption"];
          const hasCaption = logoCaption ? 'has-caption' : '';
          const logoClasses = `logo-container ${sliceLabel} ${hasCaption}`;
          const logoIcon = sliceValue["icon"];
          return (
            <Reveal effect="animated fadeInUp" className={logoClasses} key={index} style={{ backgroundColor: logoBGColor }}>
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
            </Reveal>
          );
        case 'Image Rollover':
          const imageRollClasses = `image-roll-container ${sliceLabel}`;
          const imageRollColor = sliceValue["background-colour"];
          const imageRollIcon = sliceValue["icon"].url;
          const imageRollBgImage = sliceValue["rollover-background-image"].url;
          const imageRolloverIcon = sliceValue["rollover-icon"].url;
          const imageRolloverText = sliceValue["rollover-text"];
          return (
            <Reveal effect="animated fadeInUp" className={imageRollClasses} key={index}>
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
            </Reveal>
          );
        case 'One Side Tall':
          const oneSideTallTImage = sliceValue["tallImage"].url;
          const oneSideTallTopSImage = sliceValue["otherSideTopImage"].url;
          const oneSideTallSImage = sliceValue["otherSideBottomImage"].url;
          const oneSideTallText = sliceValue["otherSideTopText"];

          switch (sliceLabel) {
            default:
            case 'left-side-tall': {
              return (
                <Reveal effect="animated fadeInUp" className="one-side-tall-container" key={index}>
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
                </Reveal>
              )
            }
            case 'right-side-tall': {
              return (
                <Reveal effect="animated fadeInUp" className="one-side-tall-container" key={index}>
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
                </Reveal>
              )
            }
          }
        case 'Quote':
          const quoteClasses = `quote-container ${sliceLabel}`;
          const quoteText = sliceValue["quote-text"];
          const quoteSource = sliceValue["quote-source"];
          return (
            <Reveal effect="animated fadeInUp" className={quoteClasses} key={index} style={{ backgroundColor: '#000', color: '#fff' }}>
              <div>
                <p className="quote-text">{quoteText}</p>
                <p className="quote-source">{quoteSource}</p>
              </div>
            </Reveal>);
        case 'Sub Heading':
          const subHeadingText = slice.value;
          return (
            <Reveal effect="animated fadeInUp" className="sub-heading-container" key={index}>
              <h2>{subHeadingText}</h2>
            </Reveal>);
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
            return (<Reveal effect="animated fadeInUp" key={index} className={imageClasses} style={{ backgroundColor: bgColor }}>
              {hasTitle && <h2>{imageTitle}</h2>}
              <Image url={imageObj?.url}></Image>
            </Reveal>);
          }
          else {
            const imagesArray = images.map((image, index) => {
              const imageObj = image.src;
              return imageObj?.url;
            });
            return (<Reveal effect="animated fadeInUp" className={imageClasses} key={index} style={{ backgroundColor: bgColor }}>
              {hasTitle && <h2>{imageTitle}</h2>}
              <ImageSlider key={index} images={imagesArray} />
            </Reveal>);
          }
      }
    })
    : null;

  return (
    <Container>
      <Header />
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
          <div id="project" className="container">
            {/* {heroPanel()} */}
            {pageContentOutput}
            {/* <PrevNextLinks projects={this.props.projects} thisID={this.props.params.id} /> */}
            {project?.uid === 'about-me' &&
              <div className="yai-logo-container">
                <SVGYaizaLogo width={350} height={115} className="yai-logo" />
              </div>
            }
          </div>
        )}
    </Container>
  );
}

export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      preview,
      project: (await getProject(params?.uid)) ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allProjects = await getAllProjects();
  return {
    paths: allProjects.results?.map(({ uid }) => `/projects/${uid}`) || [],
    fallback: true,
  };
}