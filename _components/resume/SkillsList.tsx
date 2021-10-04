import { Skill } from '@interface/cockpit';
export default function SkillsList({ skills }) {
    return (
        <ul>
            {skills.map((skill: Skill) => <li key={skill.slug}>{skill.name}</li>)}
            <style jsx>{`
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-flow: row wrap;
                }
                ul li {
                    box-sizing: border-box;
                    padding: 0.25rem 0.5rem;
                    margin: 0.25rem;
                    background-color: #EDEDED;
                }
            `}</style>
        </ul>
    );
}
