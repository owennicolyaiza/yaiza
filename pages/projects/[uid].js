import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import MoreStories from '../../components/more-stories';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import SectionSeparator from '../../components/section-separator';
import Layout from '../../components/layout';
import { getAllProjects, getProject } from '../../lib/api';
import PostTitle from '../../components/post-title';
import { CMS_NAME } from '../../lib/constants';

export default function Post({ project, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !project?.uid) {
    console.log('====> router:', router);
    console.log('====> project:', project);
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <h1>{project.uid}</h1>
            </article>
            {/* <Head>
                <title>
                  {post.title[0].text} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.coverimage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverimage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts && morePosts.length > 0 && (
              <MoreStories posts={morePosts} />
            )} */}
          </>
        )}
      </Container>
    </Layout>
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
