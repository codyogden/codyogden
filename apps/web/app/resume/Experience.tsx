import { experience } from './resume.json';

const Experience = () => <article style={{
    gridColumn: 2
}}>
    <h2>Experience</h2>
    {experience.map(({ employer, positions }) => {
        if(positions.length === 1) {
            const start_date = new Date(positions[0].dates.start);
            const end_date = (positions[0].dates.end) ? new Date(positions[0]?.dates?.end) : false;
            return <section style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
            }}>
            <div>
                <img style={{ display: 'block' }} height={48} width={48} src={`http://localhost:8000/${employer.media.logo}`} />
            </div>
            <div>
                <div style={{ fontSize: 16, lineHeight: '24px', fontWeight: 'bold' }}>{positions[0].name}{(positions[0].team) ? `, ${positions[0].team}` : ''}</div>
                    <div style={{ fontSize: 14, lineHeight: '20px', }}>{employer.name} · {positions[0].type} · <span style={{ fontSize: 14, lineHeight: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>{positions[0].locationType}</span></div>
                <div style={{ fontSize: 14, lineHeight: '20px', color: 'rgba(0, 0, 0, 0.6)'}}>
                    {start_date.toLocaleString('default', { month: 'long' })} {start_date.toLocaleString('default', { year: 'numeric' })}
                    {` - `}
                    {(end_date) ? <>{end_date.toLocaleString('default', { month: 'long' })} {end_date.toLocaleString('default', { year: 'numeric' })}</> : <>Present</>}
                    {/* {` · `} */}
                    {/* TODO: Relative date. (1 yr 1mo) */}
                </div>
                    <div style={{ fontSize: 14, margin: '8px 0', display: 'flex', alignItems: 'center', }}>
                        <div style={{ color: 'rgba(0, 0, 0, 0.9)', fontWeight: 'bold', marginRight: 4, }}>
                            Skills:
                        </div>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            margin: 0,
                            padding: 0,
                        }}>
                            {positions[0].skills.map(({ label, slug }, index) => <li key={slug}>{`${label}${(positions[0].skills.length - 1 === index) ? '' : ` · `}`}</li>)}
                        </ul>
                    </div>
            </div>
        </section>
        };
        return <section style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
        }}>
            <div>
                <img style={{ display: 'block' }} height={48} width={48} src={`http://localhost:8000/${employer.media.logo}`} />
            </div>
            <div>
                <div style={{ fontSize: 16, lineHeight: '24px', fontWeight: 'bold' }}>{employer.name}</div>
                <div style={{ fontSize: 14, lineHeight: '20px', }}>Full-time</div>
                <div style={{ fontSize: 14, lineHeight: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>Remote</div>
            </div>
            <div style={{
                gridColumn: '1 / 3',
            }}>
                {positions.map(({
                    name,
                }) => {
                    return <div>
                        {name}
                    </div>;
                })}
            </div>
        </section>
    })}
    {/* <ul style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    }}>
        {experience.map(({
            id,
            employer: {
                name,
                media,
            },
            positions,
        }) => <li key={id}>
            <div>
                <div>
                    <img src={`http://localhost:8000/${media.logo}`} />
                </div>
                <div>
                    <div>{name}</div>
                </div>
            </div>
            {positions.map(({
                name,
                team,
                dates,
                department,
                key_points,
                skills,
            }) => {
                const start_date = new Date(dates.start);
                const end_date = (dates.end) ? new Date(dates.end) : false;
                return <div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>{name}</span>{team && `, ${team}`}{department && `, ${department}`}
                    </div>
                    <div>
                        {start_date.toLocaleString('default', { month: 'long' })} {start_date.toLocaleString('default', { year: 'numeric' })}
                        {` - `}
                        {(end_date) ? <>{end_date.toLocaleString('default', { month: 'long' })} {end_date.toLocaleString('default', { year: 'numeric' })}</> : <>Present</>}
                    </div>
                    <div style={{ gridColumn: '1 / 3' }}>
                        <p>Description</p>
                        <ul>
                            {key_points.map(({ id, text }) => <li key={id}>{text}</li>)}
                        </ul>
                        <div>
                            <div>
                                Skills
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                margin: 0,
                                padding: 0,
                            }}>
                                {skills.map(({ label, slug }, index) => <li key={slug} style={{
                                    padding: 4,
                                    margin: '0 4',
                                }}>{label}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            })}
            </li>)}
    </ul> */}
</article>;

export default Experience;
