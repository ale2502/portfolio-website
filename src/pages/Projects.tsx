import { motion } from 'framer-motion';

const projects = [
  {
    title: 'GrindNotes',
    desc: 'A work-in-progress mobile app for gym enthusiasts, where the users can track their progress.',
    tags: ['React', 'TypeScript', 'Node.js', 'SQLite'],
    image: '/projects/grindnotes.png',
    live: 'https://workout-log-app-mobile-v2.onrender.com',
    code: 'https://github.com/ale2502/workout-log-app-mobile-v2',
  },
  {
    title: 'Project Two',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tags: ['SQL', 'Express', 'CSS'],
    image: '/projects/project-two.png',
    live: '#',
    code: '#',
  },
  {
    title: 'Project Three',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tags: ['React', 'Git'],
    image: '/projects/project-three.png',
    live: '#',
    code: '#',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section>
      <div className="container">
        <h1>Projects</h1>
        <p className="section-subtitle">
          Here are some of the projects I've been building.
        </p>
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              className="project-card"
              variants={fadeUp}
            >
              <img
                src={p.image}
                alt={`${p.title} preview`}
                className="project-card-image"
              />
              <div className="project-card-body">
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
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-live-btn"
                  >
                    <svg>
                      <use href="/icons.svg#globe-icon" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="project-icon-link"
                    aria-label="Source code"
                  >
                    <svg>
                      <use href="/icons.svg#github-icon" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
