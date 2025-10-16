import React, { useEffect, useRef } from 'react';
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
import { Play, Mute, Seek } from '../../components/video';
import Link from 'next/link';
import HeroPanel from '../../components/HeroPanel';
import { ErrorBoundary } from 'react-error-boundary';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);


export default function Project({ project = { uid: '1234', data: {} }, preview, paths, isMobile, headerHeight }) {
  const router = useRouter();

  if (!project) return null;

  const { uid } = project;

  const videoRef = useRef();

  const { data = {} } = project;
  const { contentArea = [] } = data;
  const metaDescription = data['meta-description']?.[0]?.text;
  const metaKeywords = data['meta-keywords']?.[0]?.text;

  if ((!router.isFallback && !uid) || Object.keys(project).length === 0) {
    return <ErrorPage statusCode={404} />;
  }

  const playVideo = () => {
    console.log('====> videoRef:', videoRef)
    videoRef?.current?.play();
  }

  const pauseVideo = () => {
    videoRef?.current?.pause();
  }

  const handleScroll = (event) => {
    if (!videoRef) return;
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > headerHeight) {
      pauseVideo()
    }
    else {
      playVideo();
    }
  }


  useEffect(() => {
    document.body.classList.add('light');
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
      if (videoRef) playVideo();
    }, 4000)

    return () => {
      document.body.classList.remove('light');
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  if (typeof window !== 'undefined' && !isMobile) {
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
      if (videoRef) playVideo()
    }, 4000)

    if (isMobile) {
      setTimeout(() => {
        const VP = document.getElementById('VideoPlayer')
        if (VP) VP.setAttribute('controls', 'controls')
      }, 4000)
    }

  }

  const pageContentOutput = contentArea.length
    ? contentArea.map((slice, index) => {
      const sliceLabel = slice.slice_label || '';
      const sliceValue = slice.value
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
          <Head>
            <title>Yaiza | Projects</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
          </Head>
          <ErrorBoundary FallbackComponent={Fallback}>
            <HeroPanel project={project} isMobile={isMobile} ref={videoRef} />
            {pageContentOutput}
          </ErrorBoundary>
        </div>
      )}
    </>
  );
}


function Fallback({ error }) {

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview,
      project: (await getProjectOverview()) ?? {},
    },
  };
}

