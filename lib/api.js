import Prismic from 'prismic-javascript';

const REPOSITORY = process.env.CMS_PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
export const API_TOKEN = process.env.CMS_PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.CMS_PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query = []) {
  try {
    const res = await PrismicClient.query(query);
    return res;
  } catch (error) {
    throw new Error('Failed to fetch API', error);
  }
}

export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(`
  {
    allCasestudys {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
  `);

  return data?.allCasestudys?.edges;
}

export async function getAllPostsForHome() {
  return fetchAPI([
    Prismic.Predicates.at('document.type', 'casestudy'),
    Prismic.Predicates.at('document.tags', ['Homepage']),
  ]);
}

export async function getProject(slug) {
  return fetchAPI('document.slug', slug);
}
