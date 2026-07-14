
export type SchemeType = 'CBCS' | 'Non-CBCS' | 'Main';
export type ResultType = 'Regular' | 'Revaluation';

export interface ExamLink {
    url: string;
    type: ResultType;
    scheme: SchemeType;
}

export interface ExamEvent {
    id: string;
    title: string;
    year: string;
    session: string;
    program: string;
    links: ExamLink[];
}

export const VTU_RESULTS_DATA: ExamEvent[] = [
    {
        "id": "may-june-2026",
        "title": "May / June 2026 Exam",
        "year": "2026",
        "session": "May/June",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/MJ26cbcs/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/MJ26rvcbcs/index.php"
            }
        ]
    },
    {
        "id": "dec-2025-jan-2026",
        "title": "Dec 2025 / Jan 2026 Exam",
        "year": "2026",
        "session": "Dec/Jan",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/D25J26Ecbcs/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/D25J26RVcbcs/index.php"
            }
        ]
    },
    {
        "id": "special-jan-2025",
        "title": "January 2025 Special Examination",
        "year": "2025",
        "session": "Special",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/SplJcbcs25/index.php"
            }
        ]
    },
    {
        "id": "makeup-2025",
        "title": "Makeup Exam 2025 (UG / PG)",
        "year": "2025",
        "session": "Makeup",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/MakeUpEcbcs25/index.php"
            }
        ]
    },
    {
        "id": "silver-jubilee-july-2025",
        "title": "Silver Jubilee July 2025 Examination",
        "year": "2025",
        "session": "Silver Jubilee",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/SplJulcbcs25/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/SplJulNoncbcs25/index.php"
            }
        ]
    },
    {
        "id": "june-july-2025",
        "title": "June / July 2025 Exam",
        "year": "2025",
        "session": "June/July",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJEcbcs25/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJRVcbcs25/index.php"
            }
        ]
    },
    {
        "id": "summer-2025",
        "title": "Summer Semester 2025",
        "year": "2025",
        "session": "Summer",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "Main",
                "url": "https://results.vtu.ac.in/indexSUMU25.php"
            },
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/SEcbcs25/index.php"
            }
        ]
    },
    {
        "id": "phd-nov-dec-2024",
        "title": "Ph.D. / M.S (Research) Nov / Dec 2024",
        "year": "2024",
        "session": "Dec/Jan",
        "program": "Ph.D",
        "links": [
            {
                "type": "Revaluation",
                "scheme": "Main",
                "url": "https://results.vtu.ac.in/NDPhDRV24/index.php"
            }
        ]
    },
    {
        "id": "dec-2024-jan-2025",
        "title": "Dec 2024 / Jan 2025 Exam",
        "year": "2024",
        "session": "Dec/Jan",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/DJcbcs25/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/DJnoncbcs25/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/DJRVcbcs25/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/DJRVnoncbcs25/index.php"
            }
        ]
    },
    {
        "id": "makeup-2024",
        "title": "Makeup Exam June / July 2024",
        "year": "2024",
        "session": "Makeup",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/MakeUpEcbcs24/index.php"
            }
        ]
    },
    {
        "id": "june-july-2024",
        "title": "June / July 2024 Exam",
        "year": "2024",
        "session": "June/July",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJEcbcs24/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JJEnoncbcs24/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJRVcbcs24/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JJRVnoncbcs24/index.php"
            }
        ]
    },
    {
        "id": "dec-2023-jan-2024",
        "title": "Dec 2023 / Jan 2024 Exam",
        "year": "2023",
        "session": "Dec/Jan",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/DJcbcs24/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/DJnoncbcs24/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/DJRVcbcs24/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/DJRVnoncbcs24/index.php"
            }
        ]
    },
    {
        "id": "special-jan-2024",
        "title": "BE & PG Special Exam Jan 2024",
        "year": "2024",
        "session": "Special",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JanSplEnoncbcs24/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JanSplRVEnoncbcs24/index.php"
            }
        ]
    },
    {
        "id": "may-june-july-2023",
        "title": "May / June / July 2023 Exam",
        "year": "2023",
        "session": "June/July",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJEcbcs23/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JJEnoncbcs23/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JJRVEcbcs23/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JJRVEnoncbcs23/index.php"
            }
        ]
    },
    {
        "id": "jan-feb-2023",
        "title": "Jan / Feb 2023 Exam",
        "year": "2022",
        "session": "Jan/Feb",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JFEcbcs23/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JFEnoncbcs23/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JFRVEcbcs23/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JFRVEnoncbcs23/index.php"
            }
        ]
    },
    {
        "id": "feb-march-2022",
        "title": "Feb / March 2022 Exam",
        "year": "2021",
        "session": "Feb/March",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/FMEcbcs22/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/FMEnoncbcs22/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/FMRVEcbcsFinal22/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/FMRVEnoncbcs22/index.php"
            }
        ]
    },
    {
        "id": "july-aug-2021",
        "title": "July / Aug 2021 Exam",
        "year": "2021",
        "session": "July/Aug",
        "program": "B.E/B.Tech",
        "links": [
            {
                "type": "Regular",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JAEcbcs/index.php"
            },
            {
                "type": "Regular",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JAEnoncbcs/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "CBCS",
                "url": "https://results.vtu.ac.in/JARVEcbcsFinal/index.php"
            },
            {
                "type": "Revaluation",
                "scheme": "Non-CBCS",
                "url": "https://results.vtu.ac.in/JARVEnoncbcs/index.php"
            }
        ]
    }
];
