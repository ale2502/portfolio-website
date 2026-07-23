import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const timeline = [
  {
    period: 'Early Days',
    title: 'First steps into the internet',
    desc: 'In the early 2000s, I was fascinated by dial-up internet, and I still remember dreaming about creating my own website. I even started looking for HTML tutorials back then.',
  },
  {
    period: 'Univerisity in Brazil',
    title: 'Getting into STEM',
    desc: 'Despite my early passion for the internet and building websites, I chose to study Civil Engineering in 2011. It gave me valuable problem-solving skills, but I later realised my true interest was in technology and software development.',
  },
  {
    period: 'Landing in Aotearoa',
    title: 'Moving to the other side of the world',
    desc: 'In 2018, after feeling limited by the path I had taken, I decided to restart my life in New Zealand on my own, facing the challenges of migration and working across different industries.',
  },
  {
    period: 'My first corporate job in New Zealand',
    title: 'The spark for IT was reignited',
    desc: 'In 2022, I returned to my Civil Engineering background as a draughtsman/designer for a farm building company in Christchurch. As the role evolved into tech-focused business analysis, my old passion for IT was reignited.',
  },
  {
    period: 'Today',
    title: 'Finally shifted into IT',
    desc: 'In 2026, I joined Dev Academy Aotearoa’s Software Development Bootcamp to build my technical foundation in TypeScript, React, Node.js and SQL, while strengthening my communication, feedback and collaboration skills.',
  },
];

export default function Timeline() {
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

      tl.to(headingRef.current, { y: -60, ease: 'none' }, 0)
        .to(itemsRef.current, { y: 50, ease: 'none' }, 0)
        .to(
          [headingRef.current, itemsRef.current],
          { opacity: 0, ease: 'none' },
          0.4,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="container">
        <h2 ref={headingRef}>My Journey</h2>
        <div ref={itemsRef} className="timeline">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
