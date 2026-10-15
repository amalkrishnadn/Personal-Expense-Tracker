import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  MdDashboard,
  MdAddCard,
  MdBarChart,
  MdSettings,
  MdAccountBalanceWallet,
  MdMenu,
  MdClose,
} from 'react-icons/md'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <MdDashboard size={20} /> },
  { to: '/add-expense', label: 'Add Expense', icon: <MdAddCard size={20} /> },
  { to: '/reports', label: 'Reports', icon: <MdBarChart size={20} /> },
  { to: '/settings', label: 'Settings', icon: <MdSettings size={20} /> },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
              <MdAccountBalanceWallet size={22} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Expense<span className="text-violet-400">Tracker</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-300 shadow-inner shadow-violet-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-white/10 pt-3">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
