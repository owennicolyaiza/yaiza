import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllProjectsForHome, getHomepage } from '../lib/api';
import Carousel from '../components/Carousel';

export default function Index({ preview, results, homeData }) {
  const [homepageSlide, setHomepageSlide] = useState(0)
  const handleSetHomepageSlide = index => {
    setHomepageSlide(index)
  }
  const metaDescription =  homeData['meta-description']?.[0]?.text;
  const metaKeywords = homeData['meta-keywords']?.[0]?.text;

  return (
    <div id="home">
      <Head>
        <title>Yaiza | Home</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Head>

      <Carousel
        homepageContent={results}
        homepageSlide={homepageSlide}
        setHomepageSlide={handleSetHomepageSlide}
      />
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const { results } = await getAllProjectsForHome();
  const data = await getHomepage();
  const homeData = data.results[0].data;
  const sortedResults = results.sort(
    (a, b) => a?.data['homepage-slide-order'] - b?.data['homepage-slide-order']
  );
  return {
    props: { preview, results: sortedResults, homeData },
    unstable_revalidate: 1,
  };
}
