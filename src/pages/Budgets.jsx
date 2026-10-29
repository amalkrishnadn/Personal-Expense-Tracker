
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import BudgetOverview from '../components/BudgetOverview'
import { formatINR } from '../data/sampleData'
import { getBudgets, saveBudget } from '../services/budgetService'

const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const Budgets = ({ transactions = [] }) => {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentMonth = getCurrentMonth()

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const data = await getBudgets()
        setBudgets(data)
      } catch (err) {
        setError('Unable to load budgets. Check that JSON Server is running.')
      } finally {
        setLoading(false)
      }
    }

    loadBudgets()
  }, [])

  const monthlyExpenses = transactions.filter(transaction =>
    transaction.type === 'expense' &&
    transaction.date?.slice(0, 7) === currentMonth
  )

  const totalSpent = monthlyExpenses.reduce(
    (sum, transaction) => sum + (Number(transaction.amount) || 0),
    0
  )

  const monthlyBudgets = budgets.filter(
    budget => budget.month === currentMonth
  )

  const totalBudgeted = monthlyBudgets.reduce(
    (sum, budget) => sum + (Number(budget.limit) || 0),
    0
  )

  const remaining = totalBudgeted - totalSpent

  const handleSaveBudget = async (category, limit) => {
    try {
      setError('')

      const savedBudget = await saveBudget(
        { category, limit, month: currentMonth },
        budgets
      )

      setBudgets(previous => {
        const index = previous.findIndex(
          budget =>
            budget.category === category &&
            budget.month === currentMonth
        )

        if (index === -1) {
          return [...previous, savedBudget]
        }

        return previous.map((budget, i) =>
          i === index ? savedBudget : budget
        )
      })
    } catch (err) {
      setError('Could not save budget. Please try again.')
      throw err
    }
  }

  const stats = [
    {
      label: 'Total budgeted',
      value: formatINR(totalBudgeted),
      color: '#173C32',
    },
    {
      label: 'Total spent',
      value: formatINR(totalSpent),
      color: '#D56A43',
    },
    {
      label: 'Remaining',
      value: formatINR(remaining),
      color: '#B89B62',
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
            03
          </span>
          <div className="h-px" style={{ background: '#DEDCCF', width: 32 }} />
        </div>

        <h1
          className="font-bold"
          style={{
            color: '#202821',
            fontFamily: '"DM Serif Display", serif',
            fontSize: '1.75rem',
          }}
        >
          Budgets
        </h1>

        <p className="text-sm mt-1" style={{ color: '#77796F' }}>
          Track your monthly spending limits
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
          >
            <div
              className="text-xs mb-2"
              style={{ color: '#77796F', letterSpacing: '0.08em' }}
            >
              {stat.label.toUpperCase()}
            </div>
            <div
              className="font-bold"
              style={{
                color: stat.color,
                fontFamily: '"DM Serif Display", serif',
                fontSize: '1.4rem',
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      {error && (
        <p className="text-sm" style={{ color: '#D56A43' }}>
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm" style={{ color: '#77796F' }}>
          Loading budgets...
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="w-full max-w-3xl"
        >
          <BudgetOverview
            transactions={transactions}
            budgets={budgets}
            onSaveBudget={handleSaveBudget}
          />
        </motion.div>
      )}
    </div>
  )
}

export default Budgets
