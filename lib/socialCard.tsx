import puppeteer from 'puppeteer';
import { renderToStaticMarkup } from 'react-dom/server';

const Page = ({ title }) => {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
          }
          h1 {
            font-size: 5.5rem;
            line-height: 0.9;
            margin: 0;
            max-width: 80%;
          }
        `}
        </style>
      </head>
      <body>
        <h1>{title}</h1>
      </body>
    </html>
  );
}

export async function screenshot(post) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 628,
      deviceScaleFactor: 2
    },
  });
  const page = await browser.newPage();
  await page.setContent(renderToStaticMarkup(<Page title={post.title} />));
  await page.screenshot({ path: `public/images/social/${post.id}.png` });
  await browser.close();
}

export async function snap(posts: Array<any>) {
  for(let i=0; i<posts.length; i++) {
    await screenshot(posts[i]);
  }
}
