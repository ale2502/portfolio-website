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

  return (
    <section className="relative flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-8 md:gap-10 px-6">
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
    </section>
  );
}
