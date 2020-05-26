require('dotenv').config()

module.exports = {
  env: {
    CMS_PRISMIC_API_TOKEN:
      process.env.CMS_PRISMIC_API_TOKEN,
    CMS_PRISMIC_REPOSITORY_NAME:
      process.env.CMS_PRISMIC_REPOSITORY_NAME,
    CMS_PRISMIC_REPOSITORY_LOCALE:
      process.env.CMS_PRISMIC_REPOSITORY_LOCALE || 'en-us',
  },
}
