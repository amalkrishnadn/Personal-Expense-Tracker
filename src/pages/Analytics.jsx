import React from 'react'
import { motion } from 'motion/react'
import SpendingChart from '../components/SpendingChart'

const StatBox = ({ label, value, sub, color }) => (
  <div className="rounded-2xl p-5" style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}>
    <div
      className="text-xs tracking-wide mb-2"
      style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.08em' }}
    >
      {label.toUpperCase()}
    </div>
    <div
      className="font-bold mb-1"
      style={{ color: color || '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.5rem' }}
    >
      {value}
    </div>
    {sub && <div className="text-xs" style={{ color: '#77796F' }}>{sub}</div>}
  </div>
)

const Analytics = () => (
  <div className="flex flex-col gap-5 p-4 sm:p-6 pb-8">
    {/* Title */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-xs font-medium tracking-widest"
          style={{ color: '#B89B62', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.18em' }}
        >
          02
        </span>
        <div className="h-px" style={{ background: '#DEDCCF', width: 32 }} />
      </div>
      <h1
        className="font-bold"
        style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.75rem', letterSpacing: '-0.01em' }}
      >
        Analytics
      </h1>
      <p className="text-sm mt-1" style={{ color: '#77796F' }}>
        Visual breakdown of your income and spending
      </p>
    </motion.div>

    {/* Stats row — neutral placeholders */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
    >
      <StatBox label="Monthly income"    value="—" color="#173C32" />
      <StatBox label="Monthly expenses"  value="—" color="#D56A43" />
      <StatBox label="Avg monthly spend" value="—" sub="No data yet" />
      <StatBox label="Best savings month" value="—" sub="No data yet" color="#B89B62" />
    </motion.div>

    {/* Charts */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <SpendingChart />
    </motion.div>
  </div>
)

export default Analytics
