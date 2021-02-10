import Head from 'next/head';
import formatDistance from 'date-fns/formatDistance';
import { collections } from '@lib/cockpit';

export default function Home({ positions, education, skills }) {
  return (
    <>
      <Head>
        <title>Cody Ogden - Resume</title>
      </Head>
      <section>
        <h3>Positions</h3>
        <ul className="ul-reset">
          {positions.map(position => {
            return <li key={position._id}>
              <div>
                {(position.company_icon.path) && <img className="company_icon" src={`${process.env.NEXT_PUBLIC_COCKPIT_URL}${position.company_icon.path}`} />}
              </div>
              {(position.company_url) ? <a href={position.company_url} target="_blank" rel="noopener noreferrer">
                {position.company}
              </a>: position.company}
              {new Date(position.date_start).toLocaleString('en', { month: 'long', year: 'numeric' })} - {(new Date(position.date_end) instanceof Date && !isNaN(+new Date(position.date_end))) && new Date(position.date_end).toLocaleString('en', {
                month: 'long',
                year: 'numeric',
              })}
              {position.description && <div dangerouslySetInnerHTML={{ __html: position.description}} />}
            </li>;
          })}
        </ul>
      </section>
      <section>
        <h3>Education</h3>
        <ul className="ul-reset">
          {education.map((item) => {
            return <li key={item._id} className="education__item">
              <div>{item.school}</div>
              <div>{item.type}, {item.major}</div>
              <div>{new Date(item.date_graduation).toLocaleString('en', {
                year: 'numeric'
              })}</div>
            </li>
          })}
        </ul>
      </section>
      <section>
        <h3>Skills</h3>
        <ul>
          {skills.map((skill) => <li key={skill.slug}>{skill.name} {skill.date_started && formatDistance(new Date(), new Date(skill.date_started))}</li>)}
        </ul>
      </section>
      <style jsx>{`
          img.company_icon {
            height: 60px;
            width: 60px;
          }
          .ul-reset {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          .education__item {
            display: grid;
            grid-template-columns: 1fr 2fr 100px;
            gap: 20px;
          }  
          .education__item > div:nth-child(3) {
            text-align: right;
          }
          @media screen and ( max-width: 900px ) {
            .education__item {
              grid-template-columns: 1fr 100px;
              grid-template-rows: 1fr 1fr;
              gap: 0;
            }
            .education__item > div:nth-child(3) {
              background-color: pink;
              grid-row: 1 / 3;
            }
            .education__item > div:nth-child(2) {
              grid-row: 2 / 3;
            }
          }
        `}</style>
    </>
  )
}


export async function getStaticProps() {
  const positions = await fetch(collections('position'))
    .then(res => res.json());

  const education = await fetch(collections('education'))
    .then(res => res.json());

  const skills = await fetch(collections('skills'))
    .then(res => res.json());
  
  return {
    props: {
      positions: positions.entries,
      education: education.entries,
      skills: skills.entries
    }
  }
}
