import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Flickity from 'react-flickity-component';
import SVGRightArrow from './SVG/SVGRightArrow';
import SVGLeftArrow from './SVG/SVGLeftArrow';

export default function Carousel({
  homepageContent,
  homepageSlide,
  setHomepageSlide,
}) {
  const flkRef = useRef(undefined);
  const flickityOptions = {
    initialIndex: homepageSlide,
    cellSelector: '.carousel-cell',
    // accessibility: true,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: false,
  };

  const bgColors = [];
  const [state, setState] = useState({
    isLeftArrowVisible: false,
    isRightArrowVisible: true,
  })

  const applyBgColor = () => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor =
        bgColors[flkRef.current?.flkty?.selectedIndex] || '#000';
    }
  };

  const checkArrows = () => {
    if (!flkRef.current) return;

    setState({
      isLeftArrowVisible: flkRef.current?.flkty?.selectedIndex > 0,
      isRightArrowVisible:
        flkRef.current?.flkty?.selectedIndex <
        flkRef.current?.flkty?.slides.length - 1,
    });
  };

  const goNext = () => {
    flkRef.current?.flkty?.next();
    checkArrows();
  };

  const goPrev = () => {
    flkRef.current?.flkty?.previous();
    checkArrows();
  };

  useEffect(() => {
    checkArrows();
    applyBgColor();
    flkRef.current?.flkty?.on('settle', slider => {
      checkArrows();
    });
    flkRef.current?.flkty?.on('select', slider => {
      applyBgColor();
    });

    return () => {
      flkRef.current?.flkty?.off('settle');
      flkRef.current?.flkty?.off('select');
    };
  }, [flkRef.current]);

  const leftArrowClasses = classNames({
    'carousel-arrow carousel-arrow--left': true,
    hideme: !state.isLeftArrowVisible,
  });
  const rightArrowClasses = classNames({
    'carousel-arrow carousel-arrow--right': true,
    hideme: !state.isRightArrowVisible,
  });

  return (
    <div id="carousel">
      <Flickity className="carousel" options={flickityOptions} ref={flkRef}>
        {homepageContent.map((content, key) => {
          const {
            data
          } = content;
          const effect = data['homepage-image-effect'];
          const pageBGColor = data['homepage-background-colour'] || '#000';
          bgColors.push(pageBGColor);
          const mainImage = data['homepage-slider-image']?.url;
          const secondaryImage = data['homepage-slider-second-image']?.url;
          return (
            <Link
              as={`/projects/${content.uid}`}
              href="/projects/[uid]"
              key={content.uid}
            >
              <a className="carousel-cell" data-effect={effect} onClick={() => {
                setHomepageSlide(key);
              }}>
                <div className="carousel-cell__container">
                  <div
                    className="carousel-cell__content"
                    style={{ backgroundImage: `url(${mainImage})` }}
                  >
                    {secondaryImage && (
                      <div
                        className="carousel-cell__content carousel-cell__content__secondary"
                        style={{ backgroundImage: `url(${secondaryImage})` }}
                      />
                    )}
                  </div>

                </div>
                <div className="carousel-cell__text">
                  <h2 data-subtext={data['homepage-slide-sub-heading']}>
                    {data['homepage-slide-heading']}
                  </h2>
                </div>
              </a>
            </Link>
          );
        })}
      </Flickity>
      <div className="carousel-footer">
        <div className="socials">
          <a href="https://www.facebook.com/YaizaGraphics/">
            <svg xmlns="http://www.w3.org/2000/svg"><path d="M18.9,0H1.1A1.1,1.1,0,0,0,0,1.1V18.9A1.1,1.1,0,0,0,1.1,20h9.58V12.25H8.08v-3h2.6V7a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H15.3c-1.26,0-1.5.6-1.5,1.47V9.24h3l-.39,3H13.8V20h5.1A1.1,1.1,0,0,0,20,18.9V1.1A1.1,1.1,0,0,0,18.9,0Z"></path></svg>
          </a>
  
          <a href="https://www.instagram.com/yaizagraphics/">
            <svg xmlns="http://www.w3.org/2000/svg"><path d="M10,1.8c2.67,0,3,0,4,.06a5.59,5.59,0,0,1,1.85.34A3.06,3.06,0,0,1,17,3a3.06,3.06,0,0,1,.75,1.15A5.54,5.54,0,0,1,18.12,6c0,1,.05,1.37.05,4s0,3-.05,4a5.66,5.66,0,0,1-.35,1.86A3.14,3.14,0,0,1,17,17.05a3,3,0,0,1-1.15.74,5.52,5.52,0,0,1-1.85.35c-1.06.05-1.37.06-4,.06s-3,0-4.05-.06a5.52,5.52,0,0,1-1.85-.35,3,3,0,0,1-1.15-.74,3.14,3.14,0,0,1-.75-1.15A5.47,5.47,0,0,1,1.84,14c-.05-1.06-.06-1.37-.06-4s0-3,.06-4A5.35,5.35,0,0,1,2.18,4.1,3.06,3.06,0,0,1,2.93,3,3.06,3.06,0,0,1,4.08,2.2a5.59,5.59,0,0,1,1.85-.34C7,1.81,7.31,1.8,10,1.8M10,0C7.26,0,6.92,0,5.85.06A7.65,7.65,0,0,0,3.42.52,5,5,0,0,0,1.65,1.68,5,5,0,0,0,.5,3.45,7,7,0,0,0,0,5.88C0,6.94,0,7.28,0,10s0,3.05.06,4.12A7.08,7.08,0,0,0,.5,16.55a5,5,0,0,0,1.15,1.77,4.86,4.86,0,0,0,1.77,1.15,7.35,7.35,0,0,0,2.43.47C6.92,20,7.26,20,10,20s3,0,4.12-.06a7.35,7.35,0,0,0,2.43-.47,4.86,4.86,0,0,0,1.77-1.15,5,5,0,0,0,1.15-1.77,7.3,7.3,0,0,0,.47-2.43c0-1.07.06-1.41.06-4.12s0-3.06-.06-4.12a7.24,7.24,0,0,0-.47-2.43A5,5,0,0,0,18.3,1.68,5,5,0,0,0,16.53.52,7.65,7.65,0,0,0,14.1.06C13,0,12.69,0,10,0Z"></path><path d="M10,4.86A5.14,5.14,0,1,0,15.11,10,5.14,5.14,0,0,0,10,4.86Zm0,8.47A3.34,3.34,0,1,1,13.31,10,3.33,3.33,0,0,1,10,13.33Z"></path><circle cx="15.31" cy="4.66" r="1.2"></circle><path d="M10,1.8c2.67,0,3,0,4,.06a5.59,5.59,0,0,1,1.85.34A3.06,3.06,0,0,1,17,3a3.06,3.06,0,0,1,.75,1.15A5.54,5.54,0,0,1,18.12,6c0,1,.05,1.37.05,4s0,3-.05,4a5.66,5.66,0,0,1-.35,1.86A3.14,3.14,0,0,1,17,17.05a3,3,0,0,1-1.15.74,5.52,5.52,0,0,1-1.85.35c-1.06.05-1.37.06-4,.06s-3,0-4.05-.06a5.52,5.52,0,0,1-1.85-.35,3,3,0,0,1-1.15-.74,3.14,3.14,0,0,1-.75-1.15A5.47,5.47,0,0,1,1.84,14c-.05-1.06-.06-1.37-.06-4s0-3,.06-4A5.35,5.35,0,0,1,2.18,4.1,3.06,3.06,0,0,1,2.93,3,3.06,3.06,0,0,1,4.08,2.2a5.59,5.59,0,0,1,1.85-.34C7,1.81,7.31,1.8,10,1.8M10,0C7.26,0,6.92,0,5.85.06A7.65,7.65,0,0,0,3.42.52,5,5,0,0,0,1.65,1.68,5,5,0,0,0,.5,3.45,7,7,0,0,0,0,5.88C0,6.94,0,7.28,0,10s0,3.05.06,4.12A7.08,7.08,0,0,0,.5,16.55a5,5,0,0,0,1.15,1.77,4.86,4.86,0,0,0,1.77,1.15,7.35,7.35,0,0,0,2.43.47C6.92,20,7.26,20,10,20s3,0,4.12-.06a7.35,7.35,0,0,0,2.43-.47,4.86,4.86,0,0,0,1.77-1.15,5,5,0,0,0,1.15-1.77,7.3,7.3,0,0,0,.47-2.43c0-1.07.06-1.41.06-4.12s0-3.06-.06-4.12a7.24,7.24,0,0,0-.47-2.43A5,5,0,0,0,18.3,1.68,5,5,0,0,0,16.53.52,7.65,7.65,0,0,0,14.1.06C13,0,12.69,0,10,0Z"></path><path d="M10,4.86A5.14,5.14,0,1,0,15.11,10,5.14,5.14,0,0,0,10,4.86Zm0,8.47A3.34,3.34,0,1,1,13.31,10,3.33,3.33,0,0,1,10,13.33Z"></path><circle cx="15.31" cy="4.66" r="1.2"></circle></svg>
          </a>
  
          <a href="https://www.linkedin.com/in/yaiza-gardner-423b062a/">
            <svg xmlns="http://www.w3.org/2000/svg"><path d="M18.52,0h-17A1.45,1.45,0,0,0,0,1.4V18.52A1.46,1.46,0,0,0,1.47,20H18.52A1.46,1.46,0,0,0,20,18.52V1.4A1.46,1.46,0,0,0,18.52,0ZM5.93,17H3V7.46h3ZM4.45,6.15A1.72,1.72,0,1,1,6.17,4.43,1.72,1.72,0,0,1,4.45,6.15ZM17,17h-3V12.36c0-1.11,0-2.53-1.54-2.53s-1.78,1.2-1.78,2.45V17h-3V7.46h2.85v1.3h0a3.1,3.1,0,0,1,2.8-1.54c3,0,3.56,2,3.56,4.55Z"></path></svg>
          </a>
        </div>
        <div className="arrow-container">
          <div className="arrow">
            <div className={leftArrowClasses} onClick={goPrev}>
              <SVGLeftArrow width={67} height={30} className="left-arrow" />
            </div>
          </div>
          <div className="arrow">
            <div className={rightArrowClasses} onClick={goNext}>
              <SVGRightArrow width={67} height={30} className="right-arrow" />
            </div>
          </div>
        </div>
        <div className="all-link-container">
          <Link href="/projects">View all</Link>
        </div>
      </div>
    </div>
  )
}
