import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ContactDock() {
  return (
    <motion.div
      className="contact-dock"
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
  );
}
