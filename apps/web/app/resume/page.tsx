import Experience from './Experience';

export default function ResumePage() {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(min(65ch, 100%), 1fr) 1fr',
    }}>
        <Experience />

        <section style={{
            gridColumn: 2,
        }}>
            <h2>Projects</h2>
        </section>

        <section style={{
            gridColumn: 2,
        }}>
            <h2>Education</h2>
        </section>
    </div>
}