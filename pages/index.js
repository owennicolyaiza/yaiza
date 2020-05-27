import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPostsForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ preview, data }) {
  const {
    homepage: { strapline },
  } = data;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro text={strapline[0].text} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const data = await getAllPostsForHome(previewData);
  return {
    props: { preview, data },
    unstable_revalidate: 1,
  };
}
