import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-RER51CHJTT"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){window.dataLayer.push (arguments)}
            gtag('js', new Date ());
            gtag ('config', 'G-RER51CHJTT');
             `,
          }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
