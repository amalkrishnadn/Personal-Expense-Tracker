import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  MdRestaurant, MdDirectionsBus, MdShoppingBag,
  MdElectricBolt, MdLocalMovies, MdFavorite,
} from 'react-icons/md'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { BUDGET_CATEGORIES, getCategoryMeta } from '../data/sampleData'

const BUDGET_ICONS = {
  food:          MdRestaurant,
  transport:     MdDirectionsBus,
  shopping:      MdShoppingBag,
  bills:         MdElectricBolt,
  entertainment: MdLocalMovies,
  health:        MdFavorite,
}

const BudgetProgress = ({ category, index, animate }) => {
  const meta = getCategoryMeta(category.id)
  const Icon = BUDGET_ICONS[category.id] || MdShoppingBag

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="flex flex-col gap-2 py-3"
      style={{ borderBottom: index < BUDGET_CATEGORIES.length - 1 ? '1px solid #F5F1E8' : 'none' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
            <Icon size={16} style={{ color: meta.color }} />
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
              {category.label}
            </div>
            <div className="text-xs" style={{ color: '#DEDCCF' }}>No data yet</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs font-semibold" style={{ color: '#DEDCCF' }}>—</div>
          <div className="text-xs" style={{ color: '#DEDCCF' }}>left</div>
        </div>
      </div>

      {/* Progress bar — empty */}
      <div className="w-full h-1.5 rounded-full" style={{ background: '#F5F1E8' }}>
        <div className="h-full rounded-full" style={{ width: '0%', background: '#173C32' }} />
      </div>
    </motion.div>
  )
}

const BudgetOverview = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* Budget list */}
      <div className="rounded-2xl p-5" style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}>
        <div className="mb-4">
          <h2 className="font-semibold" style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.1rem' }}>
            Monthly budgets
          </h2>
          <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>Awaiting data</p>
        </div>
        {BUDGET_CATEGORIES.map((cat, i) => (
          <BudgetProgress key={cat.id} category={cat} index={i} animate={inView} />
        ))}
      </div>

      {/* Spending insight — empty state */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl p-4 flex gap-3 items-start"
        style={{ background: '#FAF5E8', border: '1px solid #DEDCCF' }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#F5F1E8' }}>
          <RiLightbulbFlashLine size={16} style={{ color: '#B89B62' }} />
        </div>
        <div>
          <div className="text-xs font-semibold mb-1" style={{ color: '#B89B62', letterSpacing: '0.06em', fontFamily: '"DM Sans", sans-serif' }}>
            SPENDING INSIGHT
          </div>
          <div className="text-sm" style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif' }}>
            Insights will appear once you add transactions.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BudgetOverview
