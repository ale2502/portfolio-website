import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const projects = [
  {
    title: 'GrindNotes',
    desc: 'A work-in-progress mobile app for gym enthusiasts, where the users can track their progress.',
    tech: ['React', 'TypeScript', 'Node.js', 'SQLite'],
    live: 'https://workout-log-app-mobile-v2.onrender.com',
    code: 'https://github.com/ale2502/workout-log-app-mobile-v2',
  },
  {
    title: 'Project Two',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tech: ['SQL', 'Express', 'CSS'],
    live: '#',
  },
  {
    title: 'Project Three',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tech: ['React', 'Git'],
    live: '#',
    code: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(headingRef.current, { y: -60, ease: 'none' }, 0).to(
        itemsRef.current,
        { y: 50, ease: 'none' },
        0,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="projects-section">
      <div className="container">
        <h2 ref={headingRef}>Projects</h2>
        <div ref={itemsRef} className="grid md:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <article key={project.title} className="home-project-card">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="home-project-tags">
                {project.tech.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="home-project-links">
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
                <a href={project.code} target="_blank" rel="noreferrer">
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
