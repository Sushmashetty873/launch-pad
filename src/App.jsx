import { useState } from "react";
import "./App.css";

const internships = [
  {
    title: "Java Developer Intern",
    company: "Sample Tech Company",
    skills: ["Java", "SQL", "Spring Boot"],
    location: "Bengaluru",
    type: "Hybrid",
    about: "Join our backend team and help build REST APIs for a business web application.",
    responsibilities: [
      "Write and test Java code under a mentor's guidance",
      "Build simple REST APIs with Spring Boot",
      "Write SQL queries for application data",
    ],
    requirements: [
      "Basic knowledge of Java and OOP",
      "Understanding of SQL and databases",
      "Willingness to learn and take feedback",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Sample Digital Studio",
    skills: ["HTML", "CSS", "React"],
    location: "Remote",
    type: "Remote",
    about: "Help design and build responsive user interfaces for client websites.",
    responsibilities: [
      "Convert designs into React components",
      "Make pages responsive on mobile and desktop",
      "Fix UI bugs and improve page performance",
    ],
    requirements: [
      "Good knowledge of HTML and CSS",
      "Basic React and JavaScript",
      "A portfolio or sample project",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "Sample Analytics Team",
    skills: ["Python", "SQL", "Excel"],
    location: "Chennai",
    type: "On-site",
    about: "Work with the analytics team to clean data and prepare reports.",
    responsibilities: [
      "Clean and organise datasets",
      "Write SQL queries to pull data",
      "Prepare simple charts and summaries in Excel",
    ],
    requirements: [
      "Basic Python and SQL",
      "Comfortable with Excel",
      "Curiosity about data and numbers",
    ],
  },
  {
    title: "Power BI Intern",
    company: "Sample BI Team",
    skills: ["Power BI", "DAX", "SQL"],
    location: "Bengaluru",
    type: "Hybrid",
    about: "Support the reporting team in building interactive business dashboards.",
    responsibilities: [
      "Clean data using Power Query",
      "Create DAX measures such as YoY growth and profit margin",
      "Build and update dashboards with slicers",
    ],
    requirements: [
      "Basic Power BI and DAX knowledge",
      "Understanding of SQL",
      "A sample dashboard project",
    ],
  },
  {
    title: "Full Stack Intern",
    company: "Sample Product Startup",
    skills: ["React", "Spring Boot", "MySQL"],
    location: "Remote",
    type: "Remote",
    about: "Work across front end and back end on features for a startup product.",
    responsibilities: [
      "Build React screens and connect them to APIs",
      "Create Spring Boot endpoints",
      "Design simple MySQL tables",
    ],
    requirements: [
      "Basics of React and Java",
      "Understanding of REST APIs",
      "A full stack project to show",
    ],
  },
  {
    title: "Software Tester Intern",
    company: "Sample QA Labs",
    skills: ["Testing", "SQL", "Java"],
    location: "Hyderabad",
    type: "On-site",
    about: "Help the QA team test web applications and report bugs clearly.",
    responsibilities: [
      "Write and run manual test cases",
      "Report bugs with clear steps",
      "Check data in the database using SQL",
    ],
    requirements: [
      "Basic knowledge of testing concepts",
      "Basic SQL",
      "Attention to detail",
    ],
  },
];

const types = ["All", "Remote", "Hybrid", "On-site"];

function getMatch(jobSkills, mySkills) {
  if (mySkills.length === 0) return null;
  const matched = jobSkills.filter((s) => mySkills.includes(s.toLowerCase()));
  return Math.round((matched.length / jobSkills.length) * 100);
}

function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [skillsInput, setSkillsInput] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    resume: null,
  });

  function closeModal() {
    setSelectedJob(null);
    setApplying(false);
    setSubmitted(false);
    setFileError("");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be under 2 MB.");
      return;
    }
    setFileError("");
    setForm({ ...form, resume: file });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.resume) {
      setFileError("Please upload your resume (PDF).");
      return;
    }
    setSubmitted(true);
  }

  const mySkills = skillsInput
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const filtered = internships
    .filter((job) => {
      const text = `${job.title} ${job.company} ${job.skills.join(" ")} ${job.location}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesType = type === "All" || job.type === type;
      return matchesSearch && matchesType;
    })
    .map((job) => ({ ...job, match: getMatch(job.skills, mySkills) }))
    .sort((a, b) => (mySkills.length > 0 ? b.match - a.match : 0));

  return (
    <div className="app">
      <nav className="navbar">
        <a className="logo" href="#">launch<span>pad.</span></a>
        <a href="#internships">Explore internships</a>
        <button className="join-button">Join the community ↗</button>
      </nav>

      <section className="hero">
        <p className="eyebrow">YOUR FIRST CAREER STARTS HERE</p>
        <h1>
          Your potential.
          <br />
          <span>Your first opportunity.</span>
        </h1>
        <p className="hero-description">
          Find beginner-friendly internships, show off your projects and take
          your first step into the tech world.
        </p>
        <a className="primary-button" href="#internships">Find my internship →</a>
        <p className="hero-note">Made for fresh graduates and first-time job seekers.</p>
      </section>

      <section className="internships" id="internships">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h2>Start where you are.</h2>
        <p className="section-description">Explore sample opportunities built for beginners.</p>

        <input
          className="search-input"
          type="text"
          placeholder="Search by role, skill or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="search-input"
          type="text"
          placeholder="Your skills, separated by commas (e.g. java, sql, react)"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
        />

        <div className="filter-row">
          {types.map((t) => (
            <button
              key={t}
              className={t === type ? "filter-button active" : "filter-button"}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="result-count">{filtered.length} sample listing(s) found</p>

        <div className="job-grid">
          {filtered.map((job) => (
            <article className="job-card" key={job.title}>
              <div className="card-top">
                <span className="job-tag">Beginner friendly</span>
                {job.match !== null && (
                  <span className="match-badge">{job.match}% match</span>
                )}
              </div>
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>

              <div className="skill-list">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className={mySkills.includes(s.toLowerCase()) ? "skill-chip matched" : "skill-chip"}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="job-details">
                <span>📍 {job.location}</span>
                <span>{job.type}</span>
              </div>
              <button
                className="apply-button"
                onClick={() => setSelectedJob(job)}
              >
                View opportunity →
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="no-results">No listings match. Try another search or filter.</p>
        )}
      </section>

      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            {submitted ? (
              <div className="success-box">
                <h2>Application received ✓</h2>
                <p>
                  Thank you, {form.name}. Your application for{" "}
                  <strong>{selectedJob.title}</strong> was recorded in this demo.
                </p>
                <p>Resume: {form.resume.name}</p>
                <button className="apply-button" onClick={closeModal}>Close</button>
              </div>
            ) : applying ? (
              <form onSubmit={handleSubmit}>
                <h2>Apply: {selectedJob.title}</h2>
                <p className="company">{selectedJob.company}</p>

                <label>Full name</label>
                <input name="name" value={form.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />

                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} required />

                <label>College / University</label>
                <input name="college" value={form.college} onChange={handleChange} required />

                <label>Your skills</label>
                <input name="skills" value={form.skills} onChange={handleChange} placeholder="Java, SQL, React" />

                <label>Resume (PDF, max 2 MB)</label>
                <input type="file" accept="application/pdf" onChange={handleFile} />
                {form.resume && <p className="file-ok">Selected: {form.resume.name}</p>}
                {fileError && <p className="file-error">{fileError}</p>}

                <button type="submit" className="submit-button">Submit application</button>
                <button type="button" className="back-button" onClick={() => setApplying(false)}>
                  ← Back to job details
                </button>
              </form>
            ) : (
              <>
                <h2>{selectedJob.title}</h2>
                <p className="company">
                  {selectedJob.company} · {selectedJob.location} · {selectedJob.type}
                </p>

                <h4>About the role</h4>
                <p>{selectedJob.about}</p>

                <h4>Responsibilities</h4>
                <ul>
                  {selectedJob.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>

                <h4>Requirements</h4>
                <ul>
                  {selectedJob.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>

                <h4>Skills</h4>
                <div className="skill-list">
                  {selectedJob.skills.map((s) => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </div>

                <button className="apply-button" onClick={() => setApplying(true)}>
                  Apply now →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <footer>
        <h2>Your career is a journey. Start today.</h2>
        <p>LaunchPad · Built for the next generation of talent.</p>
      </footer>
    </div>
  );
}

export default App;