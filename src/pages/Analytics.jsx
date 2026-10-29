
import React, { useMemo } from 'react'
import { motion } from 'motion/react'

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

const Analytics = ({ transactions = [] }) => {
  const stats = useMemo(() => {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}`

    const monthlyData = {}

    transactions.forEach((transaction) => {
      if (!transaction.date) return

      const month = String(transaction.date).slice(0, 7)
      const amount = Number(transaction.amount) || 0

      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 }
      }

      if (transaction.type === 'income') {
        monthlyData[month].income += amount
      } else {
        monthlyData[month].expenses += amount
      }
    })

    const current = monthlyData[currentMonth] || {
      income: 0,
      expenses: 0,
    }

    const months = Object.values(monthlyData)

    const averageSpending = months.length
      ? months.reduce((sum, month) => sum + month.expenses, 0) /
        months.length
      : 0

    const bestMonth = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        savings: data.income - data.expenses,
      }))
      .sort((a, b) => b.savings - a.savings)[0]

    return {
      income: current.income,
      expenses: current.expenses,
      averageSpending,
      bestMonth,
      balance: current.income - current.expenses,
      transactionCount: transactions.length,
    }
  }, [transactions])

  const statBoxes = [
    {
      label: 'Monthly income',
      value: formatINR(stats.income),
      color: '#173C32',
      sub: 'Current month',
    },
    {
      label: 'Monthly expenses',
      value: formatINR(stats.expenses),
      color: '#D56A43',
      sub: 'Current month',
    },
    {
      label: 'Avg monthly spend',
      value: formatINR(stats.averageSpending),
      color: '#202821',
      sub: 'Across recorded months',
    },
    {
      label: 'Best savings month',
      value: stats.bestMonth
        ? new Date(`${stats.bestMonth.month}-02`).toLocaleDateString(
            'en-IN',
            { month: 'short', year: 'numeric' }
          )
        : 'No data',
      color: '#B89B62',
      sub: stats.bestMonth
        ? `${formatINR(stats.bestMonth.savings)} net savings`
        : 'Add transactions to begin',
    },
  ]

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-medium tracking-widest"
            style={{ color: '#B89B62', letterSpacing: '0.18em' }}
          >
            02
          </span>
          <div
            className="h-px"
            style={{ background: '#DEDCCF', width: 32 }}
          />
        </div>

        <h1
          className="font-bold"
          style={{
            color: '#202821',
            fontFamily: '"DM Serif Display", serif',
            fontSize: '1.75rem',
          }}
        >
          Analytics
        </h1>

        <p className="text-sm mt-1" style={{ color: '#77796F' }}>
          Understand your financial habits and monthly performance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statBoxes.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl p-5"
            style={{
              background: '#FFFCF5',
              border: '1px solid #DEDCCF',
            }}
          >
            <p
              className="text-xs tracking-wide mb-3"
              style={{ color: '#77796F', letterSpacing: '0.08em' }}
            >
              {stat.label.toUpperCase()}
            </p>

            <p
              className="font-bold mb-2 break-words"
              style={{
                color: stat.color,
                fontFamily: '"DM Serif Display", serif',
                fontSize: '1.5rem',
              }}
            >
              {stat.value}
            </p>

            <p className="text-xs" style={{ color: '#77796F' }}>
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-2xl p-5 sm:p-6"
        style={{
          background: '#FFFCF5',
          border: '1px solid #DEDCCF',
        }}
      >
        <p
          className="text-xs tracking-widest mb-3"
          style={{ color: '#B89B62', letterSpacing: '0.12em' }}
        >
          FINANCIAL OVERVIEW
        </p>

        <h2
          className="text-xl font-bold mb-2"
          style={{
            color: '#202821',
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          {stats.balance >= 0
            ? 'You are spending within your income.'
            : 'Your expenses exceed your income.'}
        </h2>

        <p className="text-sm" style={{ color: '#77796F' }}>
          {stats.balance >= 0
            ? `You have ${formatINR(stats.balance)} remaining from this month's recorded income.`
            : `You have spent ${formatINR(Math.abs(stats.balance))} more than your recorded income this month.`}
        </p>

        <div className="mt-5 pt-4 border-t grid grid-cols-2 gap-4"
          style={{ borderColor: '#DEDCCF' }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: '#77796F' }}>
              TOTAL TRANSACTIONS
            </p>
            <p className="text-lg font-bold" style={{ color: '#202821' }}>
              {stats.transactionCount}
            </p>
          </div>

          <div>
            <p className="text-xs mb-1" style={{ color: '#77796F' }}>
              SAVINGS RATE
            </p>
            <p className="text-lg font-bold" style={{ color: '#173C32' }}>
              {stats.income > 0
                ? `${Math.round((stats.balance / stats.income) * 100)}%`
                : 'N/A'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
