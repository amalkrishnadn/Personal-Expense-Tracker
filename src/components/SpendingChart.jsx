import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area,
} from 'recharts'

// ─── Empty-state placeholder card ────────────────────────────────────────────
const EmptyChartState = ({ height = 200 }) => (
  <div
    className="w-full flex flex-col items-center justify-center rounded-xl"
    style={{ height, background: '#F5F1E8' }}
  >
    <div className="text-xs" style={{ color: '#DEDCCF', fontFamily: '"DM Sans", sans-serif' }}>
      No data yet
    </div>
  </div>
)

// ─── Income vs Expenses Bar Chart ────────────────────────────────────────────
const IncomeExpenseChart = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
            Income vs Expenses
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>Last 6 months</p>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ fontFamily: '"DM Sans", sans-serif' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#173C32' }} />Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#D56A43' }} />Expenses
          </span>
        </div>
      </div>
      <EmptyChartState height={200} />
    </motion.div>
  )
}

// ─── Spending Trend Area Chart ────────────────────────────────────────────────
const SpendingTrend = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
            Spending Trend
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>Monthly expenses</p>
        </div>
      </div>
      <EmptyChartState height={140} />
    </motion.div>
  )
}

// ─── Category Donut — empty state ────────────────────────────────────────────
const CategoryDonut = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cx = 80, cy = 80, r = 62
  const circumference = 2 * Math.PI * r

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
    >
      <div className="mb-5">
        <h3 className="font-semibold text-sm" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
          Expense Categories
        </h3>
        <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>Breakdown by category</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* Donut ring — empty track */}
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#DEDCCF" strokeWidth="18" />
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill="#DEDCCF" fontFamily='"DM Serif Display", serif'>
              ₹0
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#DEDCCF" fontFamily='"DM Sans", sans-serif'>
              total spent
            </text>
          </svg>
        </div>
        {/* Legend placeholder */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          <div className="text-xs" style={{ color: '#DEDCCF', fontFamily: '"DM Sans", sans-serif' }}>
            No transactions recorded yet
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Combined SpendingChart export ───────────────────────────────────────────
const SpendingChart = () => (
  <div className="flex flex-col gap-4">
    <IncomeExpenseChart />
    <div className="grid sm:grid-cols-2 gap-4">
      <CategoryDonut />
      <SpendingTrend />
    </div>
  </div>
)

export default SpendingChart
