import Head from 'next/head';
import ImCodyOgden from './ImCodyOgden';

export default function Header() {
    return (
      <header>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href={'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'} rel="stylesheet" />
        </Head>
        <div className="container">
          <ImCodyOgden />
          <p>
            I make things for the web.
          </p>
        </div>
        <style jsx>{`
          overflow: hidden;
          .container {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            transform: rotate(-3deg);
            padding: 150px 0;
            height: 100vh;
            box-sizing: border-box;
            justify-content: center;
            overflow: hidden;
            width: 100%;
          }
          p {
              font-family: 'Indie Flower', sans-serif;
              font-size: 2rem;
              margin-top: 15px;
              animation: MakeThingsFadeIn 800ms linear forwards;
              animation-delay: 2100ms;
              opacity: 0;
          }

          @media screen and ( max-width: 800px ) {
            p { font-size: 1.75em; }
          }

          @keyframes MakeThingsFadeIn {
              0% {
                  opacity: 0;
              }
              100% {
                  opacity: 1;
              }
          }
        `}</style>
      </header>
    );
}
