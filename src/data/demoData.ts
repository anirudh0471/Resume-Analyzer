import { ResumeAnalysisResult } from '../types';

export const DEMO_RESUME_TEXT = `Alex Johnson
Email: alex.johnson.demo@email.com | Phone: (555) 019-2834 | Location: Austin, TX
LinkedIn: linkedin.com/in/alex-johnson-demo | GitHub: github.com/alexjohnson-demo

PROFESSIONAL SUMMARY
Analytical and detail-oriented aspiring Data Analyst with strong foundation in SQL, Python (Pandas, NumPy), Tableau, and statistical analysis. Experienced in querying relational databases, building automated dashboards, and conducting exploratory data analysis to surface business trends. Demonstrated track record through university data internships and end-to-end predictive modeling projects.

EDUCATION
Bachelor of Science in Information Systems & Business Analytics
University of Texas at Austin — Graduated May 2024
Relevant Coursework: Database Management, Applied Statistics, Data Warehousing, Python for Analytics, Business Intelligence

EXPERIENCE
Junior Data Analyst Intern | Apex Retail Solutions | Austin, TX
June 2023 – August 2023
- Built 4 automated Tableau performance dashboards tracking daily sales, inventory levels, and return rates for regional retail managers.
- Wrote complex SQL queries involving multi-table joins, subqueries, and window functions on Snowflake database to extract raw customer transaction records.
- Identified inventory discrepancy pattern across 12 regional distribution stores, assisting senior supply chain analysts in reconciliation.
- Cleaned and prepared weekly point-of-sale datasets using Python and Pandas, reducing manual spreadsheet reporting time by approximately 6 hours per week.

Student Research Assistant | Center for Analytics Research
January 2023 – May 2023
- Gathered and organized survey responses from 1,200+ university participants using R and Excel for academic consumer behavior study.
- Performed descriptive statistical testing (t-tests, ANOVA) and created data visualizations for faculty publication drafts.

PROJECTS
E-Commerce Customer Churn Analysis & Prediction (Python, Scikit-Learn, Pandas, Seaborn)
- Conducted exploratory data analysis on 7,000+ telco customer accounts to determine key indicators of subscription churn.
- Implemented Random Forest and Logistic Regression classification models with cross-validation, achieving an F1-score of 0.81.
- Documented actionable business recommendations highlighting that month-to-month contracts had a 38% higher attrition rate.

Interactive City Housing Market Dashboard (Tableau, SQL, PostgreSQL)
- Designed an interactive 3-page Tableau dashboard visualizing historical median home sales, price per square foot, and neighborhood appreciation trends.
- Ingested public MLS real estate datasets into a local PostgreSQL database, creating normalized tables and indexing key date fields.

TECHNICAL SKILLS
- Programming & Querying: SQL (PostgreSQL, MySQL, Snowflake), Python (Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn), R (basic)
- Business Intelligence & Data Viz: Tableau, Power BI, Excel (VLOOKUP, Pivot Tables, XLOOKUP, INDEX-MATCH)
- Databases & Tools: PostgreSQL, Git, GitHub, Jupyter Notebooks, Google Sheets
- Concepts: Exploratory Data Analysis (EDA), Statistical Modeling, Dashboard Design, Data Cleaning & Validation

CERTIFICATIONS
- Google Data Analytics Professional Certificate (Coursera, 2023)
- Tableau Desktop Specialist (2024)`;

export const DEMO_JOB_DESCRIPTION = `Job Title: Junior Data Analyst
Company: Horizon Tech Solutions
Location: Austin, TX (Hybrid)

About the Role:
We are seeking a curious and motivated Junior Data Analyst to join our Product & Operations Analytics team. You will partner with cross-functional stakeholders to translate complex business questions into quantitative insights, maintain executive KPI dashboards, and write optimized SQL queries.

Responsibilities:
- Write and optimize SQL queries to pull, clean, and aggregate metrics from our cloud data warehouse (Snowflake / BigQuery).
- Build and maintain interactive dashboards in Tableau and Power BI for product managers and executive leadership.
- Conduct exploratory data analysis using Python or R to identify trends in user retention, funnel drop-offs, and product engagement.
- Partner with product teams to design A/B tests and calculate statistical significance.
- Communicate data findings clearly to both technical and non-technical stakeholders through written briefs and slide decks.

Requirements:
- Bachelor's degree in Analytics, Computer Science, Information Systems, Statistics, or related field.
- 0-2 years of relevant experience or internship in data analytics or business intelligence.
- Strong proficiency in SQL (joins, window functions, CTEs, aggregations).
- Hands-on experience with visualization tools (Tableau, Power BI, Looker).
- Working knowledge of Python (Pandas, NumPy) or R for statistical analysis.
- Basic understanding of A/B testing frameworks and hypothesis testing.
- Strong verbal and written communication skills with high attention to detail.

Preferred Qualifications:
- Experience with dbt or Airflow data pipelines.
- Familiarity with cloud environments (GCP, AWS).
- Prior experience working in an Agile/Scrum product environment.`;

export const DEMO_ANALYSIS_RESULT: ResumeAnalysisResult = {
  candidate: {
    name: "Alex Johnson",
    email: "alex.johnson.demo@email.com",
    phone: "(555) 019-2834",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/alex-johnson-demo",
    github: "github.com/alexjohnson-demo",
    summary: "Analytical and detail-oriented aspiring Data Analyst with strong foundation in SQL, Python (Pandas, NumPy), Tableau, and statistical analysis.",
    education: [
      "Bachelor of Science in Information Systems & Business Analytics, University of Texas at Austin (May 2024)"
    ],
    certifications: [
      "Google Data Analytics Professional Certificate (2023)",
      "Tableau Desktop Specialist (2024)"
    ]
  },
  targetRole: "Junior Data Analyst",
  companyName: "Horizon Tech Solutions",
  overallScore: 81,
  scoreBreakdown: {
    keywordAlignment: {
      score: 20,
      max: 25,
      explanation: "Solid alignment on core terms (SQL, Tableau, Pandas, Snowflake, dashboards). Missing explicit mentions of A/B testing, BigQuery, and Looker."
    },
    skillsMatch: {
      score: 21,
      max: 25,
      explanation: "Matches major technical requirements including SQL window functions, Tableau dashboards, Python data cleaning, and statistical testing."
    },
    experienceRelevance: {
      score: 13,
      max: 15,
      explanation: "Retail analytics internship and academic research assistantship demonstrate direct applicability to junior-level reporting and data extraction tasks."
    },
    projectRelevance: {
      score: 9,
      max: 10,
      explanation: "E-Commerce Churn and Housing Market dashboards showcase end-to-end modeling, SQL ingestion, and interactive visualization capabilities."
    },
    structure: {
      score: 9,
      max: 10,
      explanation: "Clean reverse-chronological layout with distinct headers, concise bullet points, and prominent contact details. Good scannability."
    },
    achievements: {
      score: 5,
      max: 10,
      explanation: "Includes time-savings metrics ('reduced manual reporting by 6 hours/week') and dataset scale ('7,000+ accounts'), but lacks broader business outcomes (revenue impact, decision changes)."
    },
    educationCertification: {
      score: 4,
      max: 5,
      explanation: "Degree in Information Systems & Business Analytics directly aligns; dual certifications (Google Data Analytics, Tableau Desktop Specialist) strengthen credibility."
    }
  },
  skills: {
    found: [
      "SQL", "Snowflake", "PostgreSQL", "MySQL", "Python", "Pandas", "NumPy",
      "Scikit-Learn", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Excel",
      "R", "Git", "GitHub", "Jupyter", "Data Cleaning", "Exploratory Data Analysis", "ANOVA", "t-tests"
    ],
    matched: [
      "SQL", "Snowflake", "Python", "Pandas", "NumPy", "Tableau", "Power BI", "Excel", "R", "Exploratory Data Analysis", "Statistics"
    ],
    missing: [
      "A/B Testing", "BigQuery", "Looker", "dbt", "Airflow", "GCP / AWS", "Agile / Scrum"
    ],
    valuable: [
      "dbt (data build tool)", "Cloud Data Warehouses (BigQuery/GCP)", "Hypothesis Testing / A/B Test Design", "Data Storytelling"
    ],
    jobDescriptionSkillsNotFound: [
      "A/B Testing", "BigQuery", "Looker", "dbt", "Airflow", "GCP", "Agile"
    ],
    categories: {
      "Programming": ["Python", "SQL", "R"],
      "Data/Analytics": ["Pandas", "NumPy", "Exploratory Data Analysis", "Data Cleaning", "Statistics (t-tests, ANOVA)"],
      "Machine Learning": ["Scikit-Learn", "Random Forest", "Logistic Regression"],
      "AI": [],
      "Frameworks/Libraries": ["Pandas", "NumPy", "Seaborn", "Matplotlib"],
      "Databases": ["Snowflake", "PostgreSQL", "MySQL"],
      "Cloud/DevOps": ["Git", "GitHub"],
      "Tools": ["Tableau", "Power BI", "Excel", "Jupyter Notebooks", "Google Sheets"],
      "Soft Skills": ["Cross-functional communication", "Research assistance", "Detail orientation"]
    }
  },
  keywords: {
    matched: [
      "SQL", "Tableau", "Python", "Pandas", "Snowflake", "Dashboards", "Exploratory Data Analysis",
      "KPIs", "PostgreSQL", "Statistical Analysis", "Data Warehouse"
    ],
    missing: [
      "A/B testing", "Hypothesis testing", "BigQuery", "User retention", "Funnel drop-offs", "Product engagement", "dbt", "Agile"
    ],
    importantTerms: [
      "Stakeholder communication", "A/B testing", "Metric optimization", "Data briefs", "Retention analysis"
    ],
    naturalPhrases: [
      "partnered with cross-functional stakeholders",
      "evaluated product metrics to uncover drop-off patterns",
      "leveraged statistical hypothesis testing for experiment evaluation"
    ]
  },
  sections: [
    {
      name: "Professional Summary",
      status: "Good",
      strengths: ["Succinct 3-sentence summary clearly framing candidate as an entry-level Data Analyst with key stack keywords."],
      issues: ["Could mention targeted business domains (e.g. product/growth analytics) to match job posting."],
      suggestions: ["Add a phrase linking SQL/Tableau skills to solving product or operational questions."]
    },
    {
      name: "Education",
      status: "Good",
      strengths: ["Exact degree match (Information Systems & Business Analytics) with recent graduation date and relevant coursework."],
      issues: ["GPA omitted (acceptable if below 3.5, but worth adding if honors or magna cum laude)."],
      suggestions: ["Keep as is; placement under Summary is appropriate for a recent graduate."]
    },
    {
      name: "Experience",
      status: "Good",
      strengths: ["Strong action verbs ('Built', 'Wrote', 'Identified', 'Cleaned') with explicit tooling (Snowflake, Tableau, Pandas)."],
      issues: ["Only one bullet contains a quantifiable outcome (saving 6 hours per week)."],
      suggestions: ["Where possible, add the decision impact of the 4 retail dashboards (e.g. adopted by 15 regional managers for weekly reviews)."]
    },
    {
      name: "Internships",
      status: "Good",
      strengths: ["Internship provided real-world exposure to production database queries and automated reporting."],
      issues: ["Short 3-month duration; emphasize end-to-end ownership where applicable."],
      suggestions: ["Highlight any cross-functional collaboration with store operators or lead analysts."]
    },
    {
      name: "Projects",
      status: "Good",
      strengths: ["Both projects include modern data stack and concrete dataset sizes (7,000+ accounts, MLS real estate)."],
      issues: ["Could better tie the churn model to business retention strategies."],
      suggestions: ["Mention how model findings could directly inform targeted retention discount campaigns."]
    },
    {
      name: "Skills",
      status: "Good",
      strengths: ["Cleanly segmented into programming, visualization, and tools."],
      issues: ["Missing experimentation and product analytics skills highlighted in job description (A/B testing)."],
      suggestions: ["Add coursework or project experience in hypothesis testing / A/B testing under Concepts."]
    },
    {
      name: "Certifications",
      status: "Good",
      strengths: ["Recognized industry credentials (Google Data Analytics, Tableau Desktop Specialist)."],
      issues: ["None."],
      suggestions: ["Ensure verification links or credential IDs are hyperlinked on LinkedIn."]
    },
    {
      name: "Achievements",
      status: "Needs Work",
      strengths: ["Identified inventory discrepancy pattern across 12 stores."],
      issues: ["Lacks a dedicated achievements or honors section; impact metrics are modest."],
      suggestions: ["Integrate quantifiable metrics directly into experience bullets."]
    },
    {
      name: "Contact Information",
      status: "Good",
      strengths: ["Full details provided: Email, phone, location, customized LinkedIn URL, and GitHub handle."],
      issues: ["None."],
      suggestions: ["Ensure GitHub repositories for listed projects are public and have well-formatted READMEs."]
    }
  ],
  projects: [
    {
      name: "E-Commerce Customer Churn Analysis & Prediction",
      technologies: ["Python", "Scikit-Learn", "Pandas", "Seaborn"],
      demonstrates: "Exploratory data analysis, feature engineering, and binary classification workflow.",
      strength: "Strong",
      missingMeasurableResults: "Does not explain the simulated or projected retention savings if the model were acted upon.",
      suggestedBullets: [
        "Analyzed 7,000+ customer records in Python, identifying month-to-month contracts and high customer support contacts as primary drivers of customer attrition.",
        "Engineered behavioral features and trained Logistic Regression and Random Forest models, achieving an F1-score of 0.81 on holdout validation data.",
        "Synthesized findings into an executive presentation outlining actionable targeted retention campaigns for high-risk cohorts [insert hypothetical savings or cohort size]."
      ]
    },
    {
      name: "Interactive City Housing Market Dashboard",
      technologies: ["Tableau", "SQL", "PostgreSQL"],
      demonstrates: "Relational database modeling, database indexing, and user-facing interactive dashboard creation.",
      strength: "Moderate",
      missingMeasurableResults: "No mention of query latency optimization or user engagement metrics.",
      suggestedBullets: [
        "Architected a normalized PostgreSQL database to store 25,000+ MLS property sales records, indexing date and zip code attributes for sub-second query performance.",
        "Constructed a dynamic 3-view Tableau dashboard enabling real-time filtering of median price trends, days on market, and neighborhood valuation shifts."
      ]
    }
  ],
  experience: [
    {
      role: "Junior Data Analyst Intern",
      company: "Apex Retail Solutions",
      period: "June 2023 – August 2023",
      relevance: "High",
      actionVerbs: ["Built", "Wrote", "Identified", "Cleaned"],
      technicalSkills: ["Tableau", "SQL", "Snowflake", "Python", "Pandas"],
      achievements: [
        "Built 4 automated Tableau dashboards used by regional management",
        "Discovered inventory discrepancy pattern across 12 stores",
        "Automated weekly manual reporting saving 6 hours weekly"
      ],
      quantifiableResults: "4 dashboards, 12 stores, 6 hours/week saved.",
      suggestedBullets: [
        "Developed and maintained 4 interactive Tableau executive dashboards monitoring revenue, SKU sell-through, and returns across 12 regional retail locations.",
        "Queried Snowflake data warehouse utilizing SQL window functions and CTEs to extract customer transaction logs, cutting manual reporting time by 6 hours weekly.",
        "Conducted cross-store inventory reconciliation, isolating root-cause data discrepancies to assist senior supply chain leaders in correcting stock forecasts."
      ]
    },
    {
      role: "Student Research Assistant",
      company: "Center for Analytics Research",
      period: "January 2023 – May 2023",
      relevance: "Medium",
      actionVerbs: ["Gathered", "Organized", "Performed", "Created"],
      technicalSkills: ["R", "Excel", "ANOVA", "t-tests"],
      achievements: ["Processed survey data for 1,200+ participants"],
      quantifiableResults: "1,200+ university participants.",
      suggestedBullets: [
        "Cleaned, normalized, and validated survey responses from 1,200+ respondents using R and Excel for consumer behavior research.",
        "Executed two-sample t-tests and one-way ANOVA to evaluate statistical significance, formatting visual charts for faculty publication submissions."
      ]
    }
  ],
  qualityChecks: [
    { id: "summary", title: "Professional Summary", status: "passed", detail: "Concise summary statement present with target role positioning." },
    { id: "contact", title: "Contact Information", status: "passed", detail: "All standard contact fields (Email, Phone, Location) present." },
    { id: "linkedin", title: "LinkedIn Profile", status: "passed", detail: "LinkedIn profile URL is included." },
    { id: "github", title: "GitHub / Portfolio", status: "passed", detail: "GitHub portfolio handle is present and relevant for data role." },
    { id: "paragraphs", title: "Paragraph Length", status: "passed", detail: "Clean bullet-point formatting with no dense multi-sentence blocks." },
    { id: "verbs", title: "Action Verbs", status: "passed", detail: "Strong verbs utilized (Built, Wrote, Analyzed, Developed)." },
    { id: "repeated", title: "Repetitive Wording", status: "passed", detail: "Varied phrasing throughout experience and project sections." },
    { id: "clarity", title: "Project Clarity", status: "passed", detail: "Projects clearly state objective, tools, and technical outcomes." },
    { id: "metrics", title: "Measurable Results", status: "warning", detail: "Some quantifiable figures present, but could add broader outcome metrics." },
    { id: "formatting", title: "Consistent Formatting", status: "passed", detail: "Uniform date formats and bullet styling." },
    { id: "sections", title: "Appropriate Section Scope", status: "passed", detail: "Standard standard headers without extraneous hobby sections." },
    { id: "relevance", title: "Information Relevance", status: "passed", detail: "All entries support the target Data Analyst career path." },
    { id: "spelling", title: "Spelling & Grammar", status: "passed", detail: "No grammatical or spelling inconsistencies detected." },
    { id: "freshness", title: "Timeline Freshness", status: "passed", detail: "Recent 2023-2024 dates reflect up-to-date candidate profile." }
  ],
  strengths: [
    "Strong technical alignment with SQL, Snowflake, Python (Pandas), and Tableau.",
    "Credible dual credentials: BS in Information Systems plus Google Data Analytics & Tableau Specialist certifications.",
    "Demonstrated practical automation experience (cutting 6 hours/week of manual spreadsheet tasks).",
    "Clean, readable reverse-chronological structure with zero formatting clutter."
  ],
  weaknesses: [
    "No explicit mention of A/B testing or experimentation frameworks required by the job posting.",
    "Cloud warehouse knowledge highlights Snowflake, while the listing also mentions BigQuery/GCP.",
    "Several bullets describe tasks rather than business decisions driven by the data."
  ],
  improvements: [
    {
      priority: 1,
      problem: "Missing mention of A/B testing and experimentation",
      whyItMatters: "The job description explicitly lists designing A/B tests and calculating statistical significance as a core responsibility.",
      recommendedAction: "Incorporate coursework or academic project examples where you formulated hypotheses, calculated p-values, or determined sample sizes."
    },
    {
      priority: 2,
      problem: "Limited quantification of business outcomes",
      whyItMatters: "Hiring managers look for how your analyses influenced stakeholder decisions, not just that dashboards were built.",
      recommendedAction: "Add context to the 4 Tableau dashboards (e.g., 'adopted by 15 store managers to identify out-of-stock items within 24 hours')."
    },
    {
      priority: 3,
      problem: "No reference to modern data transformation tools (dbt, cloud)",
      whyItMatters: "dbt and BigQuery/GCP are preferred qualifications that set candidates apart for junior analytics roles.",
      recommendedAction: "If you have used dbt or Google Cloud in coursework or personal projects, explicitly list them in Technical Skills."
    },
    {
      priority: 4,
      problem: "Summary does not highlight stakeholder collaboration",
      whyItMatters: "The role emphasizes communicating findings to both technical and non-technical partners.",
      recommendedAction: "Update the summary to emphasize cross-functional communication and translating business questions into quantitative insights."
    },
    {
      priority: 5,
      problem: "Project repositories lack explicit documentation notes",
      whyItMatters: "Recruiters reviewing GitHub links check for clear READMEs explaining business problem, architecture, and reproducibility.",
      recommendedAction: "Ensure both GitHub projects have structured README files with screenshots and methodology summaries."
    }
  ],
  jobMatch: {
    percentage: 82,
    matched: [
      { item: "SQL querying (joins, window functions)", reason: "Directly demonstrated in internship with Snowflake and coursework." },
      { item: "Dashboard creation (Tableau / Power BI)", reason: "Built 4 production dashboards at Apex Retail Solutions; certified Tableau Specialist." },
      { item: "Python (Pandas, NumPy) for data cleaning", reason: "Demonstrated through weekly retail pipeline automation and churn project." },
      { item: "Relevant Bachelor's Degree", reason: "Holds BS in Information Systems & Business Analytics from UT Austin." },
      { item: "Exploratory Data Analysis & Statistics", reason: "Completed academic research using ANOVA/t-tests and predictive classification." }
    ],
    partiallyMatched: [
      { item: "Cloud Data Warehouse", reason: "Has Snowflake experience, but lacks explicit Google BigQuery exposure requested in job description." },
      { item: "Cross-functional communication", reason: "Mentions collaborating with senior analysts; could more explicitly highlight non-technical briefings." }
    ],
    missing: [
      { item: "A/B Testing & Experimentation Frameworks", reason: "Job requires designing tests and calculating significance; resume does not mention A/B testing." },
      { item: "dbt or Airflow (Preferred)", reason: "Neither tool is mentioned in resume." },
      { item: "Looker (Preferred)", reason: "Mentions Tableau and Power BI, but not Looker." }
    ]
  },
  interviewQuestions: [
    {
      category: "Resume-Based",
      question: "You mentioned reducing manual reporting by 6 hours a week using Python and Pandas at Apex Retail Solutions. Can you walk me through how the previous process worked and how you designed your automated script?",
      whyAsked: "Evaluates your initiative, problem-solving skills, and ability to turn repetitive manual tasks into reliable scripts.",
      whatToCover: "Explain the initial manual bottleneck (CSV downloads, copy-paste formulas), the data cleaning steps you codified in Pandas, how you validated the output for accuracy, and how the team adopted it."
    },
    {
      category: "Resume-Based",
      question: "In your internship, you identified an inventory discrepancy pattern across 12 regional distribution stores. What data anomaly caught your attention, and how did you investigate it?",
      whyAsked: "Tests your analytical curiosity, data debugging abilities, and how you communicate unexpected findings.",
      whatToCover: "Describe the specific metrics compared (e.g. system inventory vs. point-of-sale scans), the SQL queries used to isolate the 12 locations, and how you briefed the senior supply chain analysts."
    },
    {
      category: "Technical",
      question: "Can you explain the difference between a WHERE clause and a HAVING clause in SQL, and give an example of when you would use a window function like ROW_NUMBER() over a simple GROUP BY?",
      whyAsked: "Verifies fundamental SQL fluency required for writing production-grade queries without syntax confusion.",
      whatToCover: "Explain that WHERE filters rows before aggregation while HAVING filters aggregated groups. For window functions, explain how ROW_NUMBER() preserves individual rows for ranking/deduplication unlike GROUP BY."
    },
    {
      category: "Technical",
      question: "The job requires evaluating product metrics and user drop-offs. How would you determine whether a 3% drop in checkout conversion between this week and last week is statistically significant or normal variance?",
      whyAsked: "Assesses understanding of statistical significance and experimentation principles relevant to product analytics.",
      whatToCover: "Mention calculating sample size, reviewing baseline historical conversion variability, choosing an appropriate hypothesis test (e.g. two-proportion z-test), and establishing confidence intervals rather than relying on gut feel."
    },
    {
      category: "Project",
      question: "In your Customer Churn prediction project, why did you select an F1-score of 0.81 as your primary evaluation metric instead of standard overall accuracy?",
      whyAsked: "Checks whether you understand class imbalance in real-world business datasets.",
      whatToCover: "Discuss that churn datasets are typically imbalanced (majority stay, minority churn). Explain that high accuracy can be achieved trivially by predicting no churn, whereas F1-score balances precision and recall."
    },
    {
      category: "Project",
      question: "For your Interactive Housing Market Dashboard, how did you structure the PostgreSQL tables, and what indexing decisions did you make to maintain quick filtering in Tableau?",
      whyAsked: "Assesses data engineering and schema modeling fundamentals.",
      whatToCover: "Explain the entity relationships (properties, sales transactions, locations), foreign keys, and indexing on frequently filtered columns like transaction date and zip code."
    },
    {
      category: "Behavioral",
      question: "Describe a time when you presented data findings to a stakeholder who disagreed with your numbers or was unfamiliar with the technical methodology.",
      whyAsked: "Evaluates diplomacy, stakeholder management, and ability to communicate without condescension.",
      whatToCover: "Use the STAR method: Situation, Task, Action (walking through the data sources patiently, acknowledging their business intuition, validating edge cases), and Result (aligning on shared truth)."
    },
    {
      category: "Behavioral",
      question: "How do you prioritize your time when multiple product managers request ad-hoc SQL queries with urgent deadlines at the same time?",
      whyAsked: "Tests workload management, prioritization, and ability to align analytics work with high-impact business objectives.",
      whatToCover: "Explain scoping the business urgency of each request, consulting team leads for priority alignment, providing clear delivery estimates, and identifying opportunities to build reusable self-service dashboards."
    }
  ],
  analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  isDemo: true,
  resumeFileName: "Alex_Johnson_Resume_Demo.pdf"
};
