import { motion } from "motion/react";

export function LoadingScreen() {
  const symbols = ["☀", "☽", "✡", "☸", "✝", "☪", "🕉", "⊕"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="flex gap-3 justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {symbols.map((symbol, i) => (
            <motion.span
              key={symbol}
              className="text-2xl"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                delay: i * 0.12,
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>

        <motion.h2
          className="font-display text-xl text-foreground/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading Calendars of the World
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Gathering traditions from across time and culture...
        </motion.p>
      </div>
    </div>
  );
}
