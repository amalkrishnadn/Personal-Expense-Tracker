import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  MdGridView,
  MdSwapHoriz,
  MdBarChart,
  MdAccountBalanceWallet,
  MdSettings,
} from 'react-icons/md'

const NAV = [
  { to: '/',             label: 'Home',      icon: MdGridView },
  { to: '/transactions', label: 'Txns',      icon: MdSwapHoriz },
  { to: '/analytics',    label: 'Analytics', icon: MdBarChart },
  { to: '/budgets',      label: 'Budgets',   icon: MdAccountBalanceWallet },
  { to: '/settings',     label: 'Settings',  icon: MdSettings },
]

const MobileNavigation = () => {
  const location = useLocation()

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2 pb-safe"
      style={{
        background: '#FFFCF5',
        borderTop: '1px solid #DEDCCF',
        height: 64,
        boxShadow: '0 -4px 20px rgba(32,40,33,0.06)',
      }}
    >
      {NAV.map(({ to, label, icon: Icon }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl relative"
            style={{ flex: 1 }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: '#F5F1E8' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon
              size={22}
              style={{ color: isActive ? '#173C32' : '#A9B7A0', position: 'relative', zIndex: 1 }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? '#173C32' : '#A9B7A0', fontFamily: '"DM Sans", sans-serif', position: 'relative', zIndex: 1 }}
            >
              {label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default MobileNavigation
