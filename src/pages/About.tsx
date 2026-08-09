import { motion } from 'framer-motion';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import Timeline from '../components/Timeline';
import BackHome from '../components/BackHome';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  return (
    <section>
      <div className="container">
        <BackHome />
        <h1>About Me</h1>
        <p className="section-subtitle">
          A bit more about who I am and my personality.
        </p>

        <motion.div
          className="about-intro-grid"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div className="about-video" variants={fadeUp}>
            <LiteYouTubeEmbed id="ldvtz73QZ0I" title="Intro video" />
          </motion.div>
          <motion.div className="about-statement" variants={fadeUp}>
            <p>
              I'm a product-minded developer, with a huge interest in
              entrepreneurship, ambitious and driven. I believe communication
              and soft skills surpass technical skills.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Timeline />
    </section>
  );
}
