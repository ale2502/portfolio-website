const projects = [
  {
    title: 'GrindNotes',
    desc: 'A work-in-progress mobile app for gym enthusiasts, where the users can track their progress.',
    tags: ['React', 'TypeScript', 'Node.js', 'SQLite'],
    live: 'https://workout-log-app-mobile-v2.onrender.com',
    code: 'https://github.com/ale2502/workout-log-app-mobile-v2',
  },
  {
    title: 'Project Two',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tags: ['SQL', 'Express', 'CSS'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Three',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tags: ['React', 'Git'],
    live: '#',
    code: '#',
  },
];

export default function Projects() {
  return (
    <section>
      <div className="container">
        <h1>Projects</h1>
        <p className="section-subtitle">
          Here are some of the projects I built during and after bootcamp.
        </p>
        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p.title} className="project-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a href={p.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
                <a href={p.code} target="_blank" rel="noreferrer">
                  Source Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
