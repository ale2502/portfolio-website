const projects = [
  {
    title: 'Project One',
    desc: 'A full-stack app built during bootcamp. Brief description of what it does and the problem it solves.',
    tags: ['React', 'TypeScript', 'Node.js', 'SQLite'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Two',
    desc: 'A team project where I collaborated with other students. Showcases pair programming and agile workflow.',
    tags: ['React', 'JavaScript', 'CSS', 'Git'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Three',
    desc: 'An individual project focused on front-end interactivity and clean UI design.',
    tags: ['TypeScript', 'React', 'HTML', 'CSS'],
    live: '#',
    code: '#',
  },
]

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
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={p.live} target="_blank" rel="noreferrer">Live Demo</a>
                <a href={p.code} target="_blank" rel="noreferrer">Source Code</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
