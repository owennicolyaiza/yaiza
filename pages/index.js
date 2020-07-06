import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllProjectsForHome } from '../lib/api';
import Carousel from '../components/Carousel';

export default function Index({ preview, results }) {
  const [homepageSlide, setHomepageSlide] = useState(0)
  const handleSetHomepageSlide = index => {
    setHomepageSlide(index)
  }
  return (
    <div id="home">
      <Head>
        <title>Yaiza&nbsp;| Home</title>
        <meta name="description" content="hello Yaiza" />
        <meta name="keywords" content="some words" />
      </Head>
      
        <Carousel
          homepageContent={results}
          homepageSlide={homepageSlide}
          setHomepageSlide={handleSetHomepageSlide}
        />
    </div>
  );
}

export async function getServerSideProps({ preview = false, previewData }) {
  const { results } = await getAllProjectsForHome(previewData);
  const sortedResults = results.sort(
    (a, b) => a?.data['homepage-slide-order'] - b?.data['homepage-slide-order']
  );
  return {
    props: { preview, results: sortedResults }
  };
}
