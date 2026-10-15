import React, { useState } from 'react'
import { motion } from 'motion/react'
import { MdPalette, MdNotifications, MdSecurity, MdLanguage, MdDarkMode } from 'react-icons/md'
import { RiLeafLine } from 'react-icons/ri'

const ToggleSwitch = ({ on, onChange }) => (
  <motion.button
    onClick={() => onChange(!on)}
    className="w-11 h-6 rounded-full relative flex-shrink-0 transition-colors duration-200"
    style={{ background: on ? '#173C32' : '#DEDCCF' }}
    aria-checked={on}
    role="switch"
  >
    <motion.div
      className="w-4 h-4 rounded-full absolute top-1"
      style={{ background: '#fff' }}
      animate={{ left: on ? 26 : 4 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </motion.button>
)

const SettingRow = ({ icon: Icon, label, sub, right }) => (
  <div className="flex items-center gap-4 py-4" style={{ borderBottom: '1px solid #F5F1E8' }}>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: '#F5F1E8' }}>
      <Icon size={18} style={{ color: '#173C32' }} />
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>{label}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: '#77796F' }}>{sub}</div>}
    </div>
    {right}
  </div>
)

const Settings = () => {
  const [notifs, setNotifs]    = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [monthlyReport, setMonthlyReport] = useState(false)

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 pb-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium tracking-widest" style={{ color: '#B89B62', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.18em' }}>04</span>
          <div className="h-px" style={{ background: '#DEDCCF', width: 32 }} />
        </div>
        <h1 className="font-bold" style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.75rem', letterSpacing: '-0.01em' }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: '#77796F' }}>Customize your MONETA experience</p>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: '#173C32' }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #B89B62, #D56A43)', color: '#F5F1E8', fontFamily: '"DM Serif Display", serif' }}>
          A
        </div>
        <div>
          <div className="font-semibold" style={{ color: '#F5F1E8', fontFamily: '"DM Sans", sans-serif' }}>Amal</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(169,183,160,0.7)' }}>Personal account · October 2026</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A9B7A0' }} />
            <span className="text-xs" style={{ color: 'rgba(169,183,160,0.6)' }}>Active</span>
          </div>
        </div>
      </motion.div>

      {/* Settings sections */}
      {[
        {
          title: 'Preferences',
          rows: [
            { icon: MdDarkMode, label: 'Dark mode', sub: 'Toggle dark interface theme', right: <ToggleSwitch on={darkMode} onChange={setDarkMode} /> },
            { icon: MdLanguage, label: 'Currency', sub: 'Indian Rupee (₹ INR)', right: <span className="text-sm" style={{ color: '#77796F' }}>INR</span> },
            { icon: MdPalette, label: 'Colour theme', sub: 'Warm Ivory — current theme', right: <div className="w-5 h-5 rounded-full" style={{ background: '#F5F1E8', border: '2px solid #DEDCCF' }} /> },
          ],
        },
        {
          title: 'Notifications',
          rows: [
            { icon: MdNotifications, label: 'Push notifications', sub: 'Receive alerts for transactions', right: <ToggleSwitch on={notifs} onChange={setNotifs} /> },
            { icon: RiLeafLine, label: 'Budget alerts', sub: 'Alert when approaching budget limit', right: <ToggleSwitch on={budgetAlerts} onChange={setBudgetAlerts} /> },
            { icon: MdSecurity, label: 'Monthly report', sub: 'Receive a monthly summary', right: <ToggleSwitch on={monthlyReport} onChange={setMonthlyReport} /> },
          ],
        },
      ].map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + si * 0.07 }}
          className="rounded-2xl p-5"
          style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
        >
          <div className="text-xs font-semibold mb-2" style={{ color: '#77796F', letterSpacing: '0.1em', fontFamily: '"DM Sans", sans-serif' }}>
            {section.title.toUpperCase()}
          </div>
          {section.rows.map((row, ri) => (
            <SettingRow key={ri} {...row} />
          ))}
        </motion.div>
      ))}

      {/* About */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl p-5"
        style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}
      >
        <div className="text-xs font-semibold mb-3" style={{ color: '#77796F', letterSpacing: '0.1em', fontFamily: '"DM Sans", sans-serif' }}>
          ABOUT MONETA
        </div>
        <div className="text-sm" style={{ color: '#202821', fontFamily: '"DM Sans", sans-serif' }}>
          MONETA is a premium personal finance tracker built to help you understand and control your spending.
        </div>
        <div className="text-xs mt-2" style={{ color: '#77796F' }}>Version 1.0.0 · Frontend preview</div>
      </motion.div>
    </div>
  )
}

export default Settings
