import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MdSearch, MdArrowForward, MdInbox } from 'react-icons/md'
import { CATEGORIES } from '../data/sampleData'

const FILTER_TYPES = [
  { id: 'all',     label: 'All' },
  { id: 'income',  label: 'Income' },
  { id: 'expense', label: 'Expenses' },
]

const EmptyState = ({ hasFilter }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 text-center"
  >
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#F5F1E8' }}>
      <MdInbox size={28} style={{ color: '#B89B62' }} />
    </div>
    <div className="font-semibold text-base mb-1" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
      {hasFilter ? 'No results found' : 'No transactions yet'}
    </div>
    <div className="text-xs" style={{ color: '#77796F' }}>
      {hasFilter ? 'Try adjusting your filters' : 'Add your first transaction to get started'}
    </div>
  </motion.div>
)

const RecentTransactions = ({ onViewAll, limit = 8 }) => {
  const [search, setSearch]               = useState('')
  const [typeFilter, setTypeFilter]       = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const expenseCategories = CATEGORIES.filter(c => c.id !== 'salary' && c.id !== 'freelance')
  const hasFilter = !!search || typeFilter !== 'all' || categoryFilter !== 'all'

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #F5F1E8' }}>
        <div>
          <h2 className="font-semibold" style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.1rem' }}>
            Recent activity
          </h2>
          <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>0 transactions this month</p>
        </div>
        {onViewAll && (
          <motion.button
            whileHover={{ x: 3 }}
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: '#173C32' }}
          >
            View all <MdArrowForward size={14} />
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <div className="px-5 py-3 flex flex-wrap gap-3" style={{ borderBottom: '1px solid #F5F1E8' }}>
        {/* Search */}
        <div className="relative flex-1" style={{ minWidth: 160 }}>
          <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#77796F' }} />
          <input
            type="text"
            placeholder="Search transactions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl outline-none transition-all"
            style={{
              background: '#F5F1E8',
              border: '1px solid #DEDCCF',
              color: '#202821',
              fontFamily: '"DM Sans", sans-serif',
            }}
          />
        </div>

        {/* Type filter */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #DEDCCF', background: '#F5F1E8' }}>
          {FILTER_TYPES.map(f => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: typeFilter === f.id ? '#173C32' : 'transparent',
                color: typeFilter === f.id ? '#F5F1E8' : '#77796F',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-xl outline-none"
          style={{
            background: '#F5F1E8',
            border: '1px solid #DEDCCF',
            color: '#202821',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          <option value="all">All categories</option>
          {expenseCategories.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* List — always empty state */}
      <div className="px-2 py-2">
        <AnimatePresence mode="popLayout">
          <EmptyState key="empty" hasFilter={hasFilter} />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RecentTransactions
