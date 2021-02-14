import { Position } from '@interface/cockpit';
import { photoURL } from '@lib/cockpit';

export default function PositionList({ positions }) {
    return (
        <ul className="ul-reset">
            {positions.map((position: Position) => {
                return <li key={position._id}>
                    <div className="container-company_icon">
                        <img className="company_icon" src={(position.company_icon.path) ? photoURL(position.company_icon.path) : '/images/no-company-logo.svg'} />
                    </div>
                    <div>
                        <div className="company_title">{position.title}</div>
                        <div className="company_name">
                            {(position.company_url) ? <a href={position.company_url} target="_blank" rel="noopener noreferrer">
                                {position.company}
                            </a> : position.company}
                        </div>
                        <div className="company_dates">
                            {new Date(position.date_start).toLocaleString('en', { month: 'long', year: 'numeric' })} - {(new Date(position.date_end) instanceof Date && !isNaN(+new Date(position.date_end))) ? new Date(position.date_end).toLocaleString('en', {
                                month: 'long',
                                year: 'numeric',
                            }) : (position.current) && 'Present'}
                        </div>
                        {position.description && <div className="company_description" dangerouslySetInnerHTML={{ __html: position.description }} />}
                    </div>
                </li>;
            })}
            <style jsx>{`
                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                }
                ul li {
                    margin: 2.5rem 0;
                    display: flex;
                }
                .company_title {
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    height: 24px;
                }
                .company_name {
                    margin-top: 2px;
                }
                .company_dates {
                    font-size: 0.9rem;
                    margin-top: 4px;
                }
                .company_description {
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    line-height: 1.45;
                }
                @media screen and ( max-width: 800px ) {
                    .company_description {
                        margin: 1rem 0;
                    }
                }
                .container-company_icon {
                    width: 24px;
                    height: 24px;
                    margin-right: 12px;
                }
                img.company_icon {
                    height: 24px;
                    width: 24px;
                    object-fit: cover;
                    display: block;
                }
          `}</style>
            <style jsx global>{`
                .company_description ul {
                    list-style-type: disc;
                }
                @media screen and ( max-width: 800px ) {
                    .company_description > ul {
                        padding-left: 0;
                        margin-left: 0;
                    }
                    .company_description > ul > li {
                        margin: 6px 0 6px 0;
                    }
                }
            `}</style>
        </ul>
    );
}
