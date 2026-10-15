import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { MdArrowUpward, MdArrowDownward, MdSavings } from 'react-icons/md'
import { formatINR } from '../data/sampleData'

// Tiny sparkline (decorative, static shape)
const Sparkline = ({ color }) => {
  const points = [12, 8, 14, 10, 18, 14, 20, 16, 22]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const h = 32, w = 80
  const coords = points.map(
    (p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / (max - min)) * h}`,
  )
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <polyline
        points={coords.join(' ')}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35}
      />
    </svg>
  )
}

// Mini progress bar for savings card
const SavingsBar = () => (
  <div className="w-full h-1 rounded-full mt-2" style={{ background: '#DEDCCF' }}>
    <div className="h-full rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #173C32, #B89B62)' }} />
  </div>
)

const SummaryCard = ({ icon: Icon, label, color, bg, sparkColor, index, isSavings }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(32,40,33,0.09)' }}
      className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow"
      style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <div
            className="text-xs font-medium tracking-wide mb-1"
            style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.06em' }}
          >
            {label.toUpperCase()}
          </div>
          <div
            className="font-bold"
            style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.55rem', letterSpacing: '-0.01em' }}
          >
            {formatINR(0)}
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: bg }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
      </div>

      {/* Placeholder sub */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs" style={{ color: '#DEDCCF', fontFamily: '"DM Sans", sans-serif' }}>No data yet</span>
      </div>

      {/* Savings bar */}
      {isSavings && <SavingsBar />}

      {/* Sparkline */}
      <div className="flex items-end justify-between mt-auto">
        <Sparkline color={sparkColor} />
        {isSavings && (
          <span className="text-xs font-semibold" style={{ color, fontFamily: '"DM Sans", sans-serif' }}>
            0%
          </span>
        )}
      </div>
    </motion.div>
  )
}

const SummaryCards = () => {
  const cards = [
    {
      icon: MdArrowDownward,
      label: 'Total Income',
      color: '#173C32',
      bg: '#EDF4F0',
      sparkColor: '#173C32',
    },
    {
      icon: MdArrowUpward,
      label: 'Total Expenses',
      color: '#D56A43',
      bg: '#FEF3EE',
      sparkColor: '#D56A43',
    },
    {
      icon: MdSavings,
      label: 'Savings Rate',
      color: '#B89B62',
      bg: '#FAF5E8',
      sparkColor: '#B89B62',
      isSavings: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <SummaryCard key={card.label} {...card} index={i} />
      ))}
    </div>
  )
}

export default SummaryCards
