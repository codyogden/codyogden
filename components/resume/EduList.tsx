import { Education } from '@interface/cockpit';
import { photoURL } from '@lib/cockpit';

export default function EduList({ education }) {
    return (
        <ul className="ul-reset">
            {education.map((item: Education) => {
                return <li key={item._id} className="education__item">
                    <div>
                        <img className="school_icon" src={photoURL(item.icon.path)} />
                    </div>
                    <div>
                        <div className="school_name">{item.school}</div>
                        <div className="school_major">{item.type}, {item.major}</div>
                        <div className="school_dates">{new Date(item.date_graduation).toLocaleString('en', {
                            year: 'numeric'
                        })}</div>
                    </div>
                </li>
            })}
            <style jsx>{`
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }
                ul li {
                    display: flex;
                    margin: 2.5rem 0;
                }
                .school_name {
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    height: 24px;
                }
                .school_major {
                    margin-top: 2px;
                }
                .school_dates {
                    font-size: 0.9rem;
                    margin-top: 4px;
                }
                .school_icon {
                    display: block;
                    height: 24px;
                    width: 24px;
                    margin-right: 12px;
                }
            `}</style>
        </ul>
    );
}
