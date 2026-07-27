import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const projects = [
  {
    title: 'Project One',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tech: ['React', 'TypeScript', 'Node.js'],
    link: '#',
  },
  {
    title: 'Project Two',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tech: ['SQL', 'Express', 'CSS'],
    link: '#',
  },
  {
    title: 'Project Three',
    desc: 'Placeholder description — what it does, the problem it solves, and your role building it.',
    tech: ['React', 'Git'],
    link: '#',
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
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
            >
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tech.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
