import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/Header/Header'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body class="light">
          <Header />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
