import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import Timeline from '../components/Timeline';

const skills = ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'CSS'];

export default function Home() {
  // Hero
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const statYearsRef = useRef<HTMLDivElement>(null);
  const statCommitsRef = useRef<HTMLDivElement>(null);

  // Video
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoHeadingRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Statement
  const statementSectionRef = useRef<HTMLElement>(null);
  const statementTextRef = useRef<HTMLParagraphElement>(null);

  // GSAP main hero
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=60%',
          scrub: 1,
        },
      });

      tl.to(nameRef.current, { y: -90, ease: 'none' }, 0)
        .to(headingRef.current, { y: -40, ease: 'none' }, 0)
        .to(paraRef.current, { y: 30, ease: 'none' }, 0)
        .to(statYearsRef.current, { y: -30, ease: 'none' }, 0)
        .to(statCommitsRef.current, { y: 45, ease: 'none' }, 0)
        .to(
          [
            nameRef.current,
            headingRef.current,
            paraRef.current,
            statYearsRef.current,
            statCommitsRef.current,
          ],
          { opacity: 0, ease: 'none' },
          0.4,
        );
    },
    { scope: heroRef },
  );

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
      <section
        ref={heroRef}
        className="relative flex items-center min-h-screen"
      >
        <div className="container text-left flex items-start gap-8 md:gap-16">
          <div className="container text-left">
            <p
              ref={nameRef}
              className="font-display text-sm md:text-ls tracking-widest text-text-muted uppercase mb-2"
            >
              Alessandro Jablonski
            </p>
            <h1 ref={headingRef} className="text-6xl md:text-8xl">
              <span className="text-accent">FULL STACK</span>
              <br />
              DEVELOPER
            </h1>
            <p
              ref={paraRef}
              className="mt-6 max-w-2xl text-lg md:text-xl text-text-muted"
            >
              Hey, I'm Ale, a former Civil Engineer who became a software
              developer. I'm communicative, ambitious, product-minded, and
              always eager to learn.
            </p>
          </div>
        </div>
        <div className="absolute bottom-10 right-6 md:bottom-16 md:right-16 text-right">
          <div ref={statYearsRef}>
            <p className="text-4xl md:text-5xl font-bold text-accent">3+</p>
            <p className="text-sm text-text-muted">
              Years of Experience in Tech
            </p>
          </div>
          <div ref={statCommitsRef} className="stat-gap">
            <p className="text-4xl md:text-5xl font-bold text-accent">900+</p>
            <p className="text-sm text-text-muted">
              Commits on GitHub last year
            </p>
          </div>
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
