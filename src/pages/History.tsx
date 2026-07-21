import { motion } from 'framer-motion';

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

export default function History() {
  return (
    <>
      {/* Story */}
      <motion.section
        className="story-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>My Story</h2>
          <div className="story-content">
            <p>
              I've always been curious about how technology works. That
              curiosity led me to explore coding, and before long I was hooked.
              The ability to create something from nothing — a website, an app,
              a tool that someone might actually use — felt like a superpower.
            </p>
            <p>
              After some self-study, I decided to go all in and enrolled at Dev
              Academy. It was intense, challenging, and one of the best
              decisions I've ever made. I learned not just how to code, but how
              to collaborate, communicate, and solve problems as part of a team.
            </p>
            <p>
              Now I'm ready to take the next step and start my career in
              software development.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2>My Journey</h2>
          <div className="timeline">
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
    </>
  );
}
