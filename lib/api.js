import Prismic from 'prismic-javascript';

const REPOSITORY = process.env.CMS_PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
export const API_TOKEN = process.env.CMS_PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.CMS_PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query = []) {
  try {
    return PrismicClient.query(query);
  } catch (error) {
    throw new Error('Failed to fetch API', error);
  }
}

export async function getAllProjects() {
  return fetchAPI([Prismic.Predicates.at('document.type', 'casestudy')]);
}

export async function getAllProjectsForHome() {
  return fetchAPI([
    Prismic.Predicates.at('document.type', 'casestudy'),
    Prismic.Predicates.at('document.tags', ['Homepage']),
  ]);
}

export async function getProject(uid) {
  return PrismicClient.getByUID('casestudy', uid);
}
export async function getProjectOverview() {
  return PrismicClient.getByUID('project-overview', 'projects');
}
