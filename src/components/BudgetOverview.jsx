
import React, { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import {
  MdRestaurant,
  MdDirectionsBus,
  MdShoppingBag,
  MdElectricBolt,
  MdLocalMovies,
  MdFavorite,
  MdEdit, 
  MdCheck,
  MdClose,
} from 'react-icons/md'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { BUDGET_CATEGORIES, getCategoryMeta } from '../data/sampleData'

const BUDGET_ICONS = {
  food: MdRestaurant,
  transport: MdDirectionsBus,
  shopping: MdShoppingBag,
  bills: MdElectricBolt,
  entertainment: MdLocalMovies,
  health: MdFavorite,
}

const formatINR = amount =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const BudgetProgress = ({
  category,
  index,
  animate,
  spent,
  limit,
  onSave,
}) => {
  const meta = getCategoryMeta(category.id)
  const Icon = BUDGET_ICONS[category.id] || MdShoppingBag

  const [editing, setEditing] = useState(false)
  const [amount, setAmount] = useState(String(limit || ''))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const percentage = limit > 0 ? (spent / limit) * 100 : 0
  const remaining = limit - spent

  const progressColor =
    percentage >= 100 ? '#D56A43' :
    percentage >= 70 ? '#B89B62' :
    '#173C32'

  const save = async () => {
    const value = Number(amount)

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      setError('Enter a budget greater than ₹0.')
      return
    }

    try {
      setSaving(true)
      setError('')
      await onSave(category.id, value)
      setEditing(false)
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col gap-2 py-3"
      style={{
        borderBottom:
          index < BUDGET_CATEGORIES.length - 1
            ? '1px solid #F5F1E8'
            : 'none',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: meta.bg }}
          >
            <Icon size={16} style={{ color: meta.color }} />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium" style={{ color: '#202821' }}>
              {category.label}
            </div>
            <div className="text-xs" style={{ color: '#77796F' }}>
              {formatINR(spent)} spent
              {limit > 0 ? ` of ${formatINR(limit)}` : ' · No limit set'}
            </div>
          </div>
        </div>

        {editing ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={e => {
                setAmount(e.target.value)
                setError('')
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') setEditing(false)
              }}
              aria-label={`${category.label} monthly budget`}
              placeholder="Limit ₹"
              className="w-24 rounded-lg px-2 py-2 text-sm outline-none"
              style={{
                background: '#F5F1E8',
                border: '1px solid #DEDCCF',
                color: '#202821',
              }}
            />

            <button
              onClick={save}
              disabled={saving}
              aria-label="Save budget"
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ color: '#173C32' }}
            >
              <MdCheck size={18} />
            </button>

            <button
              onClick={() => {
                setEditing(false)
                setError('')
                setAmount(String(limit || ''))
              }}
              disabled={saving}
              aria-label="Cancel editing"
              className="p-2 rounded-lg"
              style={{ color: '#77796F' }}
            >
              <MdClose size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right">
              <div
                className="text-xs font-semibold"
                style={{ color: limit > 0 ? progressColor : '#B89B62' }}
              >
                {limit > 0
                  ? remaining < 0
                    ? `${formatINR(Math.abs(remaining))} over`
                    : remaining === 0
                      ? '₹0'
                      : formatINR(remaining)
                  : 'Set limit'}
              </div>
              <div className="text-xs" style={{ color: '#77796F' }}>
                {limit > 0
                  ? percentage === 100
                    ? 'fully used'
                    : remaining < 0
                      ? 'over budget'
                      : 'left'
                  : 'monthly'}
              </div>
            </div>

            <button
              onClick={() => {
                setAmount(String(limit || ''))
                setEditing(true)
                setError('')
              }}
              aria-label={`Edit ${category.label} budget`}
              className="p-2 rounded-lg hover:bg-[#F5F1E8]"
              style={{ color: '#77796F' }}
            >
              <MdEdit size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs" style={{ color: '#D56A43' }}>
          {error}
        </p>
      )}

      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: '#F5F1E8' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${limit > 0 ? Math.min(percentage, 100) : 0}%`,
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: progressColor }}
        />
      </div>

      {limit > 0 && (
        <div className="flex justify-between text-xs" style={{ color: '#77796F' }}>
          <span>{Math.round(percentage)}% used</span>
          {percentage > 100 && (
            <span style={{ color: '#D56A43' }}>Budget exceeded</span>
          )}
        </div>
      )}
    </motion.div>
  )
}

const BudgetOverview = ({
  transactions = [],
  budgets = [],
  onSaveBudget,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const currentMonth = getCurrentMonth()

  const spendingByCategory = useMemo(() => {
    const totals = {}

    transactions.forEach(transaction => {
      if (
        transaction.type !== 'expense' ||
        transaction.date?.slice(0, 7) !== currentMonth
      ) {
        return
      }

      const categoryId =
        typeof transaction.category === 'object'
          ? transaction.category?.id
          : transaction.category

      if (!categoryId) return

      totals[categoryId] =
        (totals[categoryId] || 0) +
        (Number(transaction.amount) || 0)
    })

    return totals
  }, [transactions, currentMonth])

  const monthlyBudgets = budgets.filter(
    budget => budget.month === currentMonth
  )

  const highestCategory = BUDGET_CATEGORIES
    .map(category => ({
      ...category,
      spent: spendingByCategory[category.id] || 0,
    }))
    .sort((a, b) => b.spent - a.spent)[0]

  const totalSpent = Object.values(spendingByCategory).reduce(
    (sum, amount) => sum + amount,
    0
  )

  const totalBudgeted = monthlyBudgets.reduce(
    (sum, budget) => sum + (Number(budget.limit) || 0),
    0
  )

  const remaining = totalBudgeted - totalSpent

  const insight =
    totalSpent === 0
      ? 'No expenses recorded this month yet. Add a transaction to see your spending insights.'
      : totalBudgeted === 0
        ? `You have spent ${formatINR(totalSpent)} this month. Set category budgets to start tracking your limits.`
        : remaining < 0
          ? `You are ${formatINR(Math.abs(remaining))} over your combined budget this month. Review your spending categories.`
          : `${highestCategory?.label} is your highest-spending category at ${formatINR(highestCategory?.spent || 0)} this month. You have ${formatINR(remaining)} remaining across your budgets.`

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div
        className="rounded-2xl p-5"
        style={{
          background: '#FFFCF5',
          border: '1px solid #DEDCCF',
        }}
      >
        <div className="mb-4">
          <h2
            className="font-semibold"
            style={{
              color: '#202821',
              fontFamily: '"DM Serif Display", serif',
              fontSize: '1.1rem',
            }}
          >
            Monthly budgets
          </h2>
          <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>
            Set a monthly limit for each category
          </p>
        </div>

        {BUDGET_CATEGORIES.map((category, index) => {
          const savedBudget = monthlyBudgets.find(
            budget => budget.category === category.id
          )

          return (
            <BudgetProgress
              key={category.id}
              category={category}
              index={index}
              animate={inView}
              spent={spendingByCategory[category.id] || 0}
              limit={Number(savedBudget?.limit) || 0}
              onSave={onSaveBudget}
            />
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl p-4 flex gap-3 items-start"
        style={{
          background: '#FAF5E8',
          border: '1px solid #DEDCCF',
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: '#F5F1E8' }}
        >
          <RiLightbulbFlashLine size={16} style={{ color: '#B89B62' }} />
        </div>

        <div>
          <div
            className="text-xs font-semibold mb-1"
            style={{ color: '#B89B62', letterSpacing: '0.06em' }}
          >
            SPENDING INSIGHT
          </div>
          <p className="text-sm" style={{ color: '#77796F' }}>
            {insight}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default BudgetOverview
