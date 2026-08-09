import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen gap-8 md:gap-30 px-6">
      <div className="flex items-center gap-8 md:gap-10">
        <motion.div
          className="text-left"
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
            className="mt-6 max-w-lg text-lg md:text-xl text-text-muted"
          >
            Hey, I'm Ale, a former Civil Engineer who became a software
            developer. I'm communicative, ambitious, product-minded, and always
            eager to learn.
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
          </motion.div>
        </motion.div>
        <div className="hero-photo-wrap">
          <motion.img
            src="/me.png"
            alt="Alessandro Jablonski"
            className="hero-photo hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6, ease: 'easeOut' },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              },
            }}
          />
        </div>
      </div>

      {/* Contact icons */}
      <motion.div
        className="contact-icon-row contact-icon-row--center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.a
          href="mailto:ale_jablonski@hotmail.com"
          className="contact-icon-link"
          aria-label="Email"
          variants={fadeUp}
        >
          <svg>
            <use href="/icons.svg#mail-icon" />
          </svg>
        </motion.a>
        <motion.a
          href="https://wa.me/64272540442"
          target="_blank"
          rel="noreferrer"
          className="contact-icon-link contact-icon-link--whatsapp"
          aria-label="WhatsApp"
          variants={fadeUp}
        >
          <svg>
            <use href="/icons.svg#whatsapp-icon" />
          </svg>
        </motion.a>
        <motion.a
          href="https://github.com/ale2502"
          target="_blank"
          rel="noreferrer"
          className="contact-icon-link"
          aria-label="GitHub"
          variants={fadeUp}
        >
          <svg>
            <use href="/icons.svg#github-icon" />
          </svg>
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/alessandro-jablonski/"
          target="_blank"
          rel="noreferrer"
          className="contact-icon-link contact-icon-link--linkedin"
          aria-label="LinkedIn"
          variants={fadeUp}
        >
          <svg>
            <use href="/icons.svg#linkedin-icon" />
          </svg>
        </motion.a>
        <motion.a
          href="https://www.youtube.com/@stacknfreedom"
          target="_blank"
          rel="noreferrer"
          className="contact-icon-link contact-icon-link--youtube"
          aria-label="YouTube"
          variants={fadeUp}
        >
          <svg>
            <use href="/icons.svg#youtube-icon" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
