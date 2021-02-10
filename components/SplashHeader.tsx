import ImCodyOgden from './ImCodyOgden';

export default function SplashHeader() {
    return (
      <header>
        <div className="container">
          <ImCodyOgden />
          <p>
            I make things for the web.
          </p>
        </div>
        <style jsx>{`
          header {
            box-sizing: border-box;
            overflow: hidden;
          }
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
