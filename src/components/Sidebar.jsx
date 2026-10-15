import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  MdGridView,
  MdSwapHoriz,
  MdBarChart,
  MdAccountBalanceWallet,
  MdSettings,
  MdClose,
} from 'react-icons/md'
import { RiLeafLine } from 'react-icons/ri'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'

const NAV_LINKS = [
  { to: '/',              label: 'Dashboard',     icon: MdGridView },
  { to: '/transactions',  label: 'Transactions',  icon: MdSwapHoriz },
  { to: '/analytics',     label: 'Analytics',     icon: MdBarChart },
  { to: '/budgets',       label: 'Budgets',        icon: MdAccountBalanceWallet },
  { to: '/settings',      label: 'Settings',       icon: MdSettings },
]

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const location = useLocation()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Wordmark */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(169,183,160,0.18)' }}>
            <HiOutlineCurrencyRupee size={22} style={{ color: '#B89B62' }} />
          </div>
          <div>
            <div className="font-serif text-xl font-bold tracking-widest"
              style={{ color: '#F5F1E8', letterSpacing: '0.15em', fontFamily: '"DM Serif Display", serif' }}>
              MONETA
            </div>
            <div className="text-xs tracking-widest mt-0.5" style={{ color: 'rgba(169,183,160,0.7)', letterSpacing: '0.2em' }}>
              FINANCE
            </div>
          </div>
        </div>
        {/* Thin separator */}
        <div className="mt-6 h-px w-full" style={{ background: 'rgba(169,183,160,0.15)' }} />
      </div>

      {/* Section label */}
      <div className="px-6 mb-2">
        <span className="text-xs tracking-widest font-medium" style={{ color: 'rgba(169,183,160,0.5)', letterSpacing: '0.18em' }}>
          MENU
        </span>
      </div>

      {/* Nav links */}
      <nav className="px-3 flex-1">
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={onMobileClose}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                  style={({ isActive: active }) => ({
                    background: active ? 'rgba(245,241,232,0.12)' : 'transparent',
                    color: active ? '#F5F1E8' : 'rgba(169,183,160,0.7)',
                  })}
                >
                  {({ isActive: active }) => (
                    <>
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgba(245,241,232,0.1)', border: '1px solid rgba(245,241,232,0.12)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {/* Active left bar */}
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-bar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                          style={{ background: '#B89B62' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon
                        size={19}
                        style={{ color: active ? '#F5F1E8' : 'rgba(169,183,160,0.7)', transition: 'color 0.2s' }}
                        className={active ? '' : 'group-hover:text-[#A9B7A0]'}
                      />
                      <span className="text-sm font-medium" style={{ fontFamily: '"DM Sans", sans-serif', transition: 'color 0.2s', color: active ? '#F5F1E8' : undefined }}>
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Decorative element */}
      <div className="mx-6 my-4">
        <div className="rounded-xl p-4" style={{ background: 'rgba(169,183,160,0.08)', border: '1px solid rgba(169,183,160,0.12)' }}>
          <div className="flex items-center gap-2 mb-1">
            <RiLeafLine size={14} style={{ color: '#B89B62' }} />
            <span className="text-xs font-medium" style={{ color: '#B89B62', fontFamily: '"DM Sans", sans-serif' }}>
              Monthly goal
            </span>
          </div>
          <div className="text-xs mb-2" style={{ color: 'rgba(169,183,160,0.65)' }}>
            Save ₹30,000 this month
          </div>
          <div className="w-full h-1 rounded-full" style={{ background: 'rgba(169,183,160,0.15)' }}>
            <div className="h-full rounded-full" style={{ width: '63%', background: '#B89B62' }} />
          </div>
          <div className="text-xs mt-1.5 text-right" style={{ color: 'rgba(169,183,160,0.5)' }}>63% reached</div>
        </div>
      </div>

      {/* Profile */}
      <div className="mx-6 mb-6">
        <div className="h-px mb-4" style={{ background: 'rgba(169,183,160,0.15)' }} />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #B89B62, #D56A43)', color: '#F5F1E8' }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: '#F5F1E8', fontFamily: '"DM Sans", sans-serif' }}>
              Amal
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A9B7A0' }} />
              <span className="text-xs" style={{ color: 'rgba(169,183,160,0.6)' }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0"
        style={{ width: 245, background: '#173C32', borderRight: '1px solid rgba(169,183,160,0.12)' }}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(23,60,50,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={onMobileClose}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-full z-50"
              style={{ width: 260, background: '#173C32', borderRight: '1px solid rgba(169,183,160,0.12)' }}
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg"
                style={{ color: 'rgba(169,183,160,0.7)', background: 'rgba(169,183,160,0.1)' }}
                aria-label="Close sidebar"
              >
                <MdClose size={18} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
