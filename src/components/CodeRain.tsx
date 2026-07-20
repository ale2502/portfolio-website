import { motion } from 'framer-motion';
import { useMemo } from 'react';

const SYMBOLS = ['{', '}', '<', '/', '>', ';', '(', ')', '=>'];
// const SYMBOLS = ['.map', 'function', 'const', 'if', '.find'];
const PARTICLE_COUNT = 30;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export default function CodeRain() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        symbol: pickRandomSymbol(),
        left: randomBetween(0, 100),
        duration: randomBetween(8, 20),
        delay: randomBetween(0, 10),
        size: randomBetween(0.75, 1.5),
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono text-text-muted/30"
          style={{ left: `${p.left}%`, fontSize: `${p.size}rem` }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}
