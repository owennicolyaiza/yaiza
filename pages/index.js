import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from '../components/container';
import { getAllProjectsForHome } from '../lib/api';
import Carousel from '../components/Carousel';

export default function Index({ preview, results }) {
  return (
    <>
     
        <Head>
          <title>Yaiza&nbsp;| Home</title>
          <meta name="description" content="hello Yaiza" />
          <meta name="keywords" content="some words" />
        </Head>
        <Container>
          <Carousel
            homepageContent={results}
            // homepageSlide={props.homepageSlide}
            // setHomepageSlide={props.setHomepageSlide}
          />
          {results.map(result => (
            <p key={result.uid}>
              <Link href="/projects/[uid]" as={`/projects/${result.uid}`}>
                <a>{result.uid}</a>
              </Link>
            </p>
          ))}
        </Container>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const { results } = await getAllProjectsForHome(previewData);
  const sortedResults = results.sort(
    (a, b) => a?.data['homepage-slide-order'] - b?.data['homepage-slide-order']
  );
  return {
    props: { preview, results: sortedResults },
    unstable_revalidate: 1,
  };
}
