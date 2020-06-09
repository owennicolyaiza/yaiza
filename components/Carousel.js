import React, { useEffect, useRef } from 'react';
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
  const state = {
    isLeftArrowVisible: false,
    isRightArrowVisible: true,
  };

  const applyBgColor = () => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor =
        bgColors[flkRef.current?.flkty?.selectedIndex] || '#000';
    }
  };

  const checkArrows = () => {
    if (!flkRef.current) return;
    // setState({
    //   isLeftArrowVisible: flkRef.current?.flkty?.selectedIndex > 0,
    //   isRightArrowVisible:
    //     flkRef.current?.flkty?.selectedIndex <
    //     flkRef.current?.flkty?.slides.length - 1,
    // });
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
  }, []);

  // if (typeof window !== 'undefined') return null;

  // const leftArrowClasses = classNames({
  //   'carousel-arrow carousel-arrow--left': true,
  //   hideme: !state.isLeftArrowVisible,
  // });
  // const rightArrowClasses = classNames({
  //   'carousel-arrow carousel-arrow--right': true,
  //   hideme: !state.isRightArrowVisible,
  // });

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
              onClick={() => {
                setHomepageSlide(key);
              }}
              key={content.uid}
              data-effect={effect}
            >
              <a className="carousel-cell">
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

                  <div className="carousel-cell__text">
                    <h2 data-subtext={data['.homepage-slide-sub-heading']}>
                      {data['homepage-slide-heading']}
                    </h2>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </Flickity>
    </div>
  );
}