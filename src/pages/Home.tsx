import { motion } from 'framer-motion';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const skills = ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'CSS'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <motion.section
        className="relative flex items-center min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <div className="container text-left">
          <h1 className="text-6xl md:text-8xl">
            <span className="text-accent">FULL STACK</span>
            <br />
            DEVELOPER
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-text-muted">
            Hey, I'm Alessandro, a former Civil Engineer who became a software
            developer. I'm communicative, ambitious, product-minded, and always
            eager to learn.
          </p>
        </div>
        <div className="absolute bottom-10 right-6 md:bottom-16 md:right-16 text-right">
          <p className="text-4xl md:text-5xl font-bold text-accent">3+</p>
          <p className="text-sm text-text-muted">Years of Experience in Tech</p>

          <p className="stat-gap text-4xl md:text-5xl font-bold text-accent">
            900+
          </p>
          <p className="text-sm text-text-muted">Commits on GitHub last year</p>
        </div>
      </motion.section>

      {/* Video Hero */}
      <section className="video-hero">
        <motion.div
          className="video-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <LiteYouTubeEmbed id="ldvtz73QZ0I" title="Intro video" />
        </motion.div>
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
                viewport={{ amount: 0.4 }}
                transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
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
