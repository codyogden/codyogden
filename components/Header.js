import { Component } from 'react';
import Head from 'next/head';
import ImCodyOgden from './ImCodyOgden';

const textStyle = {
  fontFamily: '\'Indie Flower\', \'Helvetica\', sans-serif',
  fontSize: '2em',
  marginTop: '15px',
};

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const headerStyles = {
      width: '450px',
    };
    const containerStyles = {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      transform: 'rotate(-3deg)',
      padding: '150px 0',
      height: '100vh',
      boxSizing: 'border-box',
      justifyContent: 'center',
      overflow: 'hidden',
      width: '100%',
    };
    return (
      <header>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href={'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'} rel="stylesheet" />
        </Head>
        <div style={containerStyles}>
          <ImCodyOgden />
          <p>
            I make things for the web.
          </p>
        </div>
        <style jsx>{`
          overflow: hidden;
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
}
