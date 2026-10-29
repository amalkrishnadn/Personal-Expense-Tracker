
import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import BalanceHero from '../components/BalanceHero'
import SummaryCards from '../components/SummaryCards'
import SpendingChart from '../components/SpendingChart'
import RecentTransactions from '../components/RecentTransactions'
import BudgetOverview from '../components/BudgetOverview'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
}

const Dashboard = ({ onAddTransaction,
  transactions = [],
  budgets = [],
  onSaveBudget,}) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 pb-8">
      {/* Hero */}
      <motion.div
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <BalanceHero transactions={transactions} />
      </motion.div>

      {/* Summary cards */}
      <motion.div
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <SummaryCards transactions={transactions} />
      </motion.div>

      {/* Charts + budget */}
      <div className="grid xl:grid-cols-[1fr_320px] gap-5">
        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <SpendingChart transactions={transactions} />
        </motion.div>

        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <BudgetOverview
  transactions={transactions}
  budgets={budgets}
  onSaveBudget={onSaveBudget}
/>
        </motion.div>
      </div>

      {/* Recent transactions */}
      <motion.div
        custom={4}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <RecentTransactions
          transactions={transactions}
          onViewAll={() => navigate('/transactions')}
          limit={6}
        />
      </motion.div>
    </div>
  )
}

export default Dashboard
