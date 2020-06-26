import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { getProjectOverview } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
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
  console.log('====> project:', project)

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
      switch (slice.sliceType) {
        case 'Content':
          const contentClasses = `content-container ${sliceLabel}`;
          return (<Reveal effect="animated fadeInUp" className={contentClasses} key={index}><div dangerouslySetInnerHTML={{ __html: sliceValue }} /></Reveal>);
        case 'Content Dark':
          const contentDarkClasses = `content-container content-container--dark ${sliceLabel}`;
          return (<Reveal effect="animated fadeInUp" className={contentDarkClasses} key={index}><div dangerouslySetInnerHTML={{ __html: sliceValue }} /></Reveal>);
        case 'Image':
          const image = slice.value.value;
          const imageClasses = `projects-image-container ${sliceLabel}`;
          if (!image.length) return;
          if (image.length === 1) {
            let imageObj = image[0].fragments.Image.main;
            let linkUID = image[0].fragments.Link.uid;
            let heading = image[0].fragments.Heading && image[0].fragments.Heading.value;
            let subHeading = image[0].fragments.Subheading && image[0].fragments.Subheading.value;
            subHeading = subHeading && subHeading.split(',');
            return (<Reveal effect="animated fadeInUp" key={index} className={imageClasses}>
              <Link to={`/projects/${linkUID}`}>
                <div className="projects-image-container__angle"></div>
                <div className="projects-image-container__content">
                  <h2>
                    {heading}
                  </h2>
                  <div className="sub-headings">
                    {subHeading && subHeading.map((word, index) => <p key={index}>{word}</p>)}
                  </div>
                </div>
                <Image url={imageObj.url}></Image>
              </Link>
            </Reveal>);
          }
        case 'Image Group':
          const imageGroup = slice.value.value;
          const imageGroupClasses = 'projects-image-group-container';
          if (!imageGroup.length) return;
          if (imageGroup.length === 1) {
            let imageObj = imageGroup[0].fragments.Image.main;
            let tallImage = imageGroup[0].fragments['ImageType'] && imageGroup[0].fragments['ImageType'].value === 'True';
            let linkUID = imageGroup[0].fragments.Link.uid;
            let heading = imageGroup[0].fragments.Heading.value;
            let subHeading = imageGroup[0].fragments.Subheading && imageGroup[0].fragments.Subheading.value;
            subHeading = subHeading && subHeading.split(',');
            let image1Classes = classNames({
              'animated fadeInUp': true,
              'tall-image': tallImage
            })
            let imageObj2 = imageGroup[0].fragments.Image2.main;
            let tallImage2 = imageGroup[0].fragments['Image2Type'] && imageGroup[0].fragments['Image2Type'].value === 'True';
            let image2Classes = classNames({
              'animated fadeInUp': true,
              'tall-image': tallImage2
            });
            let linkUID2 = imageGroup[0].fragments.Link2.uid;
            let heading2 = imageGroup[0].fragments.Heading2.value;
            let subHeading2 = imageGroup[0].fragments.Subheading2 && imageGroup[0].fragments.Subheading2.value;
            subHeading2 = subHeading2 && subHeading2.split(',');
            return (<div key={index} className={sliceLabel}>
              <div className={imageGroupClasses}>
                <Reveal effect={image1Classes}>
                  <Link to={`/projects/${linkUID}`}>
                    <div className="projects-image-container__angle"></div>
                    <div className="projects-image-container__content">
                      <h2>
                        {heading}
                      </h2>
                      <div className="sub-headings">
                        {subHeading && subHeading.map((word, index) => <p key={index}>{word}</p>)}
                      </div>
                    </div>
                    <Image url={imageObj.url}></Image>
                  </Link>
                </Reveal>
                <Reveal effect={image2Classes}>
                  <Link to={`/projects/${linkUID2}`}>
                    <div className="projects-image-container__angle"></div>
                    <div className="projects-image-container__content">
                      <h2>
                        {heading2}
                      </h2>
                      <div className="sub-headings">
                        {subHeading2 && subHeading2.map((word, index) => <p key={index}>{word}</p>)}
                      </div>
                    </div>
                    <Image url={imageObj2.url}></Image>
                  </Link>
                </Reveal>
              </div>
            </div>);
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
          </div>
        )}
    </div>
  );
}


export async function getStaticProps({ params, preview = false }) {
  return {
    props: {
      preview,
      project: (await getProjectOverview()) ?? null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: ['/projects'],
    fallback: true,
  };
}
