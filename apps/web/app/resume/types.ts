type PositionType = 'Full-Time' | 'Part-Time' | 'Self-Employed' | 'Freelance' | 'Contract' | 'Internship' | 'Apprenticeship' | 'Seasona';
type PositionLocationType = 'Remote' | 'Hybrid' | 'On-Site';
type PositionIndustry = 'Internet';

export interface Employer {
    name: string;
    url: string;
    industry: PositionIndustry;
    media: {
        logo: string | null;
        icon: string | null;
    }
}
export interface Skill {
    slug: string;
    label: string;
}

export interface Position {
    name: string;
    team: string | null;
    department: string | null;
    type: PositionType;
    locationType: PositionLocationType;
    headline: string | null;
    dates: {
        start: Date;
        end: Date | false;
    };
    key_points: Array<{
        id: number;
        text: string;
    }>;
    skills: Array<Skill>;
}

export interface Experience {
    id: number;
    employer: Employer;
    positions: Array<Position>;
}

/*

        {
            "id": 1,
            "employer": {
                "name": "Kinsta",
                "url": "https://kinsta.com",
                "industry": "Internet",
                "media": {
                    "logo": "resume-logos/kinsta.jpg",
                    "icon": null
                }
            },
            "positions": [
                {
                    "name": "JavaScript Developer",
                    "team": null,
                    "department": null,
                    "type": "Full-Time",
                    "locationType": "Remote",
                    "headline": null,
                    "dates": {
                        "start": "",
                        "end": ""
                    },
                    "key_points": [],
                    "skills": []
                }
            ]
        },
        {
            "id": 2,
            "employer": {
                "name": "Postlight",
                "url": "https://postlight.com",
                "industry": "Internet",
                "media": {
                    "logo": "resume-logos/postlight.jpg",
                    "icon": null
                }
            },
            "positions": [
                {
                    "name": "Software Engineer",
                    "team": null,
                    "department": null,
                    "type": "Full-Time",
                    "locationType": "Remote",
                    "headline": null,
                    "dates": {
                        "start": "",
                        "end": ""
                    },
                    "key_points": [],
                    "skills": []
                }
            ]
        },
        {
            "id": 3,
            "employer": {
                "name": "CNB Media",
                "url": "https://cnb.media",
                "industry": "Internet",
                "media": {
                    "logo": "resume-logos/cnb.jpg",
                    "icon": null
                }
            },
            "positions": [
                {
                    "name": "Software Engineer",
                    "team": null,
                    "department": null,
                    "type": "Full-Time",
                    "locationType": "Remote",
                    "headline": null,
                    "dates": {
                        "start": "",
                        "end": ""
                    },
                    "key_points": [],
                    "skills": []
                }
            ]
        },
        {
            "id": 4,
            "employer": {
                "name": "Brandography",
                "url": "https://brandography.com",
                "industry": "Internet",
                "media": {
                    "logo": "resume-logos/brandography.jpg",
                    "icon": null
                }
            },
            "positions": [
                {
                    "name": "Director of Software Development",
                    "team": null,
                    "department": null,
                    "type": "Full-Time",
                    "locationType": "On-Site",
                    "headline": null,
                    "dates": {
                        "start": "",
                        "end": ""
                    },
                    "key_points": [],
                    "skills": []
                },
                {
                    "name": "Software Engineer",
                    "team": null,
                    "department": null,
                    "type": "Full-Time",
                    "locationType": "On-Site",
                    "headline": null,
                    "dates": {
                        "start": "",
                        "end": ""
                    },
                    "key_points": [],
                    "skills": []
                }
            ]
        }
        */