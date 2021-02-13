import Head from 'next/head';
import { collections } from '@lib/cockpit';
import { Education, Position, Skill } from '@interface/cockpit';
import Layout from '@components/Layout';
import PositionList from '@components/resume/PositionList';
import EduList from '@components/resume/EduList';
import SkillsList from '@components/resume/SkillsList';

interface ResumeProps {
  positions: Position[]
  education: Education[]
  skills: Skill[]
}

export default function Home({ positions, education, skills }: ResumeProps) {

  return (
    <Layout>
      <Head>
        <title>Cody Ogden - Resume</title>
      </Head>
      <main>
      <section>
        <h3>Positions</h3>
        <PositionList positions={positions}/>
      </section>
      <section>
        <h3>Education</h3>
        <EduList education={education} />
      </section>
      <section>
        <h3>Technical Skills</h3>
        <SkillsList skills={skills} />
      </section>
      </main>
      <style jsx>{`
          main {
            display: grid;
            grid-template-columns: 1fr min(65ch, 90%) 1fr;
            margin-bottom: 40vh;
          }
          main > * {
            grid-column: 2;
          }
        `}</style>
    </Layout>
  )
}


export async function getStaticProps() {
  const positions = await fetch(collections('position'))
    .then(res => res.json());

  const education = await fetch(collections('education'))
    .then(res => res.json());

  const skills= await fetch(collections('skills'))
    .then(res => res.json());
  
  return {
    props: {
      positions: positions.entries,
      education: education.entries,
      skills: skills.entries
    },
    revalidate: 3600
  }
}
