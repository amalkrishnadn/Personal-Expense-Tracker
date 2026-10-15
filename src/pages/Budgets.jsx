import React from 'react'
import { motion } from 'motion/react'
import BudgetOverview from '../components/BudgetOverview'

const Budgets = () => (
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
          03
        </span>
        <div className="h-px" style={{ background: '#DEDCCF', width: 32 }} />
      </div>
      <h1
        className="font-bold"
        style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.75rem', letterSpacing: '-0.01em' }}
      >
        Budgets
      </h1>
      <p className="text-sm mt-1" style={{ color: '#77796F' }}>
        Track your monthly spending limits
      </p>
    </motion.div>

    {/* Quick stats — neutral placeholders */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
    >
      {[
        { label: 'Total budgeted', value: '—', color: '#173C32' },
        { label: 'Total spent',    value: '—', color: '#D56A43' },
        { label: 'Remaining',      value: '—', color: '#B89B62' },
      ].map(s => (
        <div key={s.label} className="rounded-2xl p-5" style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}>
          <div
            className="text-xs mb-2"
            style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.08em' }}
          >
            {s.label.toUpperCase()}
          </div>
          <div
            className="font-bold"
            style={{ color: s.color, fontFamily: '"DM Serif Display", serif', fontSize: '1.4rem' }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </motion.div>

    {/* Budget overview */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="max-w-2xl"
    >
      <BudgetOverview />
    </motion.div>
  </div>
)

export default Budgets
