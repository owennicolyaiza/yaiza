import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body class="light">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
