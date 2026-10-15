import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MdMenu, MdAdd, MdNotificationsNone, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const DashboardHeader = ({ onAddTransaction, onMobileMenuOpen, selectedMonth, onMonthChange }) => {
  const [notifOpen, setNotifOpen] = useState(false)
  const year = new Date().getFullYear()

  const prevMonth = () => onMonthChange((selectedMonth + 11) % 12)
  const nextMonth = () => onMonthChange((selectedMonth + 1) % 12)

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b flex-wrap gap-3"
      style={{ background: '#FFFCF5', borderColor: '#DEDCCF' }}
    >
      {/* Left: hamburger (mobile) + greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-xl hover:bg-opacity-80 transition-colors"
          style={{ background: '#F5F1E8', color: '#173C32' }}
          aria-label="Open menu"
        >
          <MdMenu size={20} />
        </button>
        <div>
          <h1 className="font-semibold" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif', fontSize: '1rem' }}>
            {getGreeting()}, <span style={{ color: '#173C32' }}>Amal.</span>
          </h1>
          <p className="text-xs" style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif' }}>
            Here's your financial overview
          </p>
        </div>
      </div>

      {/* Right: month selector + notification + add */}
      <div className="flex items-center gap-3">
        {/* Month selector */}
        <div className="flex items-center gap-1 rounded-xl px-3 py-2" style={{ background: '#F5F1E8', border: '1px solid #DEDCCF' }}>
          <button onClick={prevMonth} className="hover:opacity-60 transition-opacity" style={{ color: '#77796F' }} aria-label="Previous month">
            <MdKeyboardArrowLeft size={18} />
          </button>
          <span
            className="text-sm font-medium px-2"
            style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif', minWidth: 90, textAlign: 'center' }}
          >
            {MONTHS[selectedMonth]} {year}
          </span>
          <button onClick={nextMonth} className="hover:opacity-60 transition-opacity" style={{ color: '#77796F' }} aria-label="Next month">
            <MdKeyboardArrowRight size={18} />
          </button>
        </div>

        {/* Notification bell */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 rounded-xl transition-colors"
            style={{ background: '#F5F1E8', border: '1px solid #DEDCCF', color: '#202821' }}
            aria-label="Notifications"
          >
            <MdNotificationsNone size={20} />
          </motion.button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-72 rounded-2xl shadow-xl z-50 p-4"
                style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
              >
                <div className="text-sm font-semibold mb-3" style={{ color: '#202821' }}>Notifications</div>
                <div className="text-xs" style={{ color: '#77796F', fontFamily: '"DM Sans", sans-serif' }}>
                  No notifications yet.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Transaction */}
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddTransaction}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: '#173C32',
            color: '#F5F1E8',
            fontFamily: '"DM Sans", sans-serif',
            boxShadow: '0 2px 8px rgba(23,60,50,0.25)',
          }}
        >
          <MdAdd size={18} />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>
    </header>
  )
}

export default DashboardHeader
