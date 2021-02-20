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

export default async (req, res) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 628,
      deviceScaleFactor: 2,
    }
  });
  const page = await browser.newPage();
  await page.setContent(renderToStaticMarkup(<Page title={req.query.text} />));
  res.writeHead(200, null, { 'Content-Type': 'image/png' });
  const buffer = await page.screenshot();
  // @ts-ignore
  res.end(Buffer.from(buffer, 'base64'));
  await browser.close();
};
