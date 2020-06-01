import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Header from '../../components/header';
import { getAllProjects, getProject } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

export default function Post({ project, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !project?.uid) {
    console.log('====> router:', router);
    console.log('====> project:', project);
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Header />
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
          <>
            <article>
              <h1>{project.uid}</h1>
            </article>
          </>
        )}
    </Container>
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
