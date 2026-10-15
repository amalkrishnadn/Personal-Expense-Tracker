import React from 'react'
import { motion } from 'motion/react'
import { MdArrowUpward, MdArrowDownward, MdTrendingUp } from 'react-icons/md'
import { formatINRFull, formatINR } from '../data/sampleData'

// Subtle SVG geometric decoration
const HeroDecoration = () => (
  <svg
    className="absolute right-0 top-0 h-full opacity-10 pointer-events-none"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="250" cy="50" r="120" stroke="#A9B7A0" strokeWidth="0.5" />
    <circle cx="250" cy="50" r="80"  stroke="#A9B7A0" strokeWidth="0.5" />
    <circle cx="250" cy="50" r="45"  stroke="#B89B62" strokeWidth="0.5" />
    <line x1="0" y1="150" x2="300" y2="150" stroke="#A9B7A0" strokeWidth="0.4" />
    <line x1="150" y1="0" x2="150" y2="300" stroke="#A9B7A0" strokeWidth="0.4" />
    <line x1="50" y1="0" x2="300" y2="250" stroke="#B89B62" strokeWidth="0.3" />
    <line x1="0" y1="50" x2="250" y2="300" stroke="#B89B62" strokeWidth="0.3" />
  </svg>
)

const BalanceHero = () => {
  const circumference = 2 * Math.PI * 58

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl"
      style={{ background: '#173C32' }}
    >
      <HeroDecoration />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Label */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px flex-1" style={{ maxWidth: 24, background: 'rgba(169,183,160,0.4)' }} />
          <span
            className="text-xs tracking-widest font-medium"
            style={{ color: 'rgba(169,183,160,0.7)', letterSpacing: '0.2em', fontFamily: '"DM Sans", sans-serif' }}
          >
            YOUR FINANCIAL OVERVIEW
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: balance */}
          <div>
            <p className="text-sm mb-2" style={{ color: 'rgba(169,183,160,0.7)', fontFamily: '"DM Sans", sans-serif' }}>
              Available balance
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-bold leading-none mb-4"
              style={{
                color: '#F5F1E8',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontFamily: '"DM Serif Display", serif',
                letterSpacing: '-0.02em',
              }}
            >
              {formatINRFull(0)}
            </motion.div>

            {/* Trend — neutral placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(169,183,160,0.12)', color: 'rgba(169,183,160,0.6)' }}
              >
                — %
              </div>
              <span className="text-xs" style={{ color: 'rgba(169,183,160,0.5)' }}>vs last month</span>
            </div>

            {/* Income & Expenses */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ background: 'rgba(169,183,160,0.08)', border: '1px solid rgba(169,183,160,0.1)' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(169,183,160,0.15)' }}>
                    <MdArrowDownward size={11} style={{ color: '#A9B7A0' }} />
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(169,183,160,0.6)', fontFamily: '"DM Sans", sans-serif' }}>Income</span>
                </div>
                <div className="font-semibold" style={{ color: '#F5F1E8', fontFamily: '"DM Sans", sans-serif', fontSize: '1.1rem' }}>
                  {formatINR(0)}
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(213,106,67,0.08)', border: '1px solid rgba(213,106,67,0.1)' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(213,106,67,0.15)' }}>
                    <MdArrowUpward size={11} style={{ color: '#D56A43' }} />
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(213,106,67,0.7)', fontFamily: '"DM Sans", sans-serif' }}>Expenses</span>
                </div>
                <div className="font-semibold" style={{ color: '#F5F1E8', fontFamily: '"DM Sans", sans-serif', fontSize: '1.1rem' }}>
                  {formatINR(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: savings ring — empty state (0%) */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 144 144" className="w-full h-full -rotate-90">
                <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(169,183,160,0.12)" strokeWidth="10" />
                <circle
                  cx="72" cy="72" r="58"
                  fill="none"
                  stroke="#B89B62"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`0 ${circumference}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: '#F5F1E8', fontFamily: '"DM Serif Display", serif' }}>
                  0%
                </span>
                <span className="text-xs mt-0.5" style={{ color: 'rgba(169,183,160,0.6)' }}>saved</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center gap-2 justify-center">
                <MdTrendingUp size={14} style={{ color: '#B89B62' }} />
                <span className="text-xs" style={{ color: 'rgba(169,183,160,0.7)', fontFamily: '"DM Sans", sans-serif' }}>
                  Savings rate
                </span>
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(169,183,160,0.45)' }}>
                No data yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default BalanceHero
