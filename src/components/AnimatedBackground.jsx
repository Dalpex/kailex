import { motion } from 'framer-motion'

export default function AnimatedBackground({ variant = 'default' }) {
  const variants = {
    default: {
      gradient: 'from-indigo-500/30 via-purple-500/30 to-pink-500/30',
      gradient2: 'from-purple-500/30 via-pink-500/30 to-indigo-500/30',
      gradient3: 'from-pink-500/30 via-indigo-500/30 to-purple-500/30',
    },
    dark: {
      gradient: 'from-indigo-600/25 via-slate-600/25 to-purple-600/25',
      gradient2: 'from-purple-600/25 via-indigo-600/25 to-slate-600/25',
      gradient3: 'from-slate-600/25 via-purple-600/25 to-indigo-600/25',
    },
    gradient: {
      gradient: 'from-cyan-500/30 via-blue-500/30 to-indigo-500/30',
      gradient2: 'from-blue-500/30 via-indigo-500/30 to-cyan-500/30',
      gradient3: 'from-indigo-500/30 via-cyan-500/30 to-blue-500/30',
    },
  }

  const v = variants[variant]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-white dark:bg-slate-950 transition-colors duration-300" />

      {/* Animated gradient layers - entire background moves */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-0 bg-gradient-to-br ${v.gradient} bg-[length:200%_200%] blur-3xl opacity-40`}
      />

      <motion.div
        animate={{
          backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
          scale: [1.1, 1, 1.1],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-0 bg-gradient-to-bl ${v.gradient2} bg-[length:200%_200%] blur-3xl opacity-40`}
      />

      <motion.div
        animate={{
          backgroundPosition: ['0% 100%', '100% 0%', '0% 100%'],
          scale: [1, 1.2, 1],
          rotate: [180, 0, 180],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-0 bg-gradient-to-tr ${v.gradient3} bg-[length:200%_200%] blur-3xl opacity-40`}
      />

      {/* Flowing mesh overlay */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)] bg-[length:200%_200%]"
      />

      {/* Grid pattern with subtle movement */}
      <motion.div
        animate={{
          backgroundPosition: ['0px 0px', '64px 64px'],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* Flowing particles across entire screen */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, i % 3 === 0 ? 200 : -200, 0],
            y: [0, i % 2 === 0 ? -150 : 150, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-sm"
          style={{
            top: `${(i * 8) % 100}%`,
            left: `${(i * 12) % 100}%`,
          }}
        />
      ))}

      {/* Wave overlay moving across screen */}
      <motion.div
        animate={{
          x: ['-100%', '0%', '100%'],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(99,102,241,0.1)_50%,transparent_60%)] bg-[length:200%_100%]"
      />
    </div>
  )
}
