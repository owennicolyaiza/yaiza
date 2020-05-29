import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllProjectsForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ preview, results }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro text="Hello" />
          {results.map(result => (
            <p>
              {result.uid} {result.data['homepage-slide-order']}
            </p>
          ))}
        </Container>
      </Layout>
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
