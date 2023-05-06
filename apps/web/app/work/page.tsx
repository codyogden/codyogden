import type { Metadata } from 'next';
import Experience from './Experience';

export const metadata: Metadata = {
    title: 'Work - Cody Ogden',
    description: `The things I do.`,
};

export default function ResumePage() {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(min(65ch, 100%), 1fr) 1fr',
    }}>
        <div style={{
            textAlign: 'center',
            margin: '2em 0',
            gridColumn: 2,
        }}>
            <h1 style={{
                margin: 0,
            }}>Work</h1>
            <p style={{
                margin: 0,
            }}>The things I do.</p>
        </div>
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