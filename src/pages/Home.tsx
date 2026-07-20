import { motion } from 'framer-motion';

const skills = ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'CSS'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <motion.section
        className="flex items-center min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container text-left">
          <h1 className="text-6xl md:text-8xl">
            <span className="text-accent">FULL STACK</span>
            <br />
            DEVELOPER
          </h1>
          <p className="mt-6 max-w-md text-lg md:text-xl text-text-muted">
            Hey, I'm Alessandro — a former Civil Engineer turned developer. I
            build clean, functional web apps and I'm always shipping something
            new.
          </p>
        </div>
      </motion.section>

      {/* Video Hero */}
      <section className="video-hero">
        <div className="video-container">
          <iframe
            src="https://www.youtube-nocookie.com/embed/ldvtz73QZ0I?rel=0"
            title="Intro video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Goals */}
      <section className="goals-section">
        <div className="container">
          <h2>My Goal</h2>
          <p className="goals-text">
            I'm Alessandro, a fresh graduate from{' '}
            <strong>Dev Academy Aotearoa</strong> in New Zealand. My goal is to
            become a professional software developer — building applications
            that make a difference, collaborating with great teams, and
            continuously growing my skills.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2>Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                className="rounded-lg border border-border bg-surface p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
