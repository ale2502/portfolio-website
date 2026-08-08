import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';

const skills = ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'CSS'];

export default function Home() {
  // Video
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoHeadingRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Statement
  const statementSectionRef = useRef<HTMLElement>(null);
  const statementTextRef = useRef<HTMLParagraphElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // GSAP video
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(videoHeadingRef.current, { y: -40, ease: 'none' }, 0)
        .to(videoContainerRef.current, { y: 50, ease: 'none' }, 0)
        .to(
          [videoHeadingRef.current, videoContainerRef.current],
          { opacity: 0, ease: 'none' },
          0.4,
        );
    },
    { scope: videoSectionRef },
  );

  // GSAP statement
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statementSectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(statementTextRef.current, { y: -90, ease: 'none' }, 0).to(
        statementTextRef.current,
        { opacity: 0, ease: 'none' },
        0.4,
      );
    },
    { scope: statementSectionRef },
  );
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center min-h-screen">
        <div className="container text-left flex items-start gap-8 md:gap-16">
          <motion.div
            className="container text-left"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-sm md:text-ls tracking-widest text-text-muted uppercase mb-2"
            >
              Alessandro Jablonski
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl">
              <span className="text-accent">FULL STACK</span>
              <br />
              DEVELOPER
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg md:text-xl text-text-muted"
            >
              Hey, I'm Ale, a former Civil Engineer who became a software
              developer. I'm communicative, ambitious, product-minded, and
              always eager to learn.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="hero-actions flex flex-wrap gap-4"
            >
              <Link to="/projects" className="hero-btn">
                Projects
              </Link>
              <Link to="/about" className="hero-btn">
                About Me
              </Link>
              <Link to="/contact" className="hero-btn">
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Hero */}
      <section ref={videoSectionRef} className="video-hero">
        <h2
          ref={videoHeadingRef}
          className="text-3xl md:text-4xl text-center max-w-2xl mb-8"
        >
          A lil bit about myself
        </h2>
        <div ref={videoContainerRef} className="video-container">
          <LiteYouTubeEmbed id="ldvtz73QZ0I" title="Intro video" />
        </div>
      </section>

      {/* Statement */}
      <section ref={statementSectionRef} className="statement-section pb-24">
        <div className="container">
          <p
            ref={statementTextRef}
            className="text-4xl md:text-6xl leading-tight"
          >
            I'm a product-minded developer, with a huge interest in
            entrepreneurship, ambitious and driven. I believe communication and
            soft skills surpass technical skills.
          </p>
        </div>
      </section>

      {/* Projects */}
      <Projects />

      {/* Timeline */}
      <Timeline />

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
