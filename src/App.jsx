import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import MobileNavigation from './components/MobileNavigation'
import TransactionModal from './components/TransactionModal'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Budgets from './pages/Budgets'
import Settings from './pages/Settings'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen]       = useState(false)
  const [selectedMonth, setSelectedMonth]   = useState(9) // October (0-indexed)

  return (
    <Router>
      <div className="flex min-h-screen" style={{ background: '#F5F1E8', fontFamily: '"DM Sans", sans-serif' }}>
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />

        {/* Main content column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader
            onAddTransaction={() => setIsModalOpen(true)}
            onMobileMenuOpen={() => setMobileMenuOpen(true)}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          {/* Scrollable page area */}
          <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '4.5rem' }} id="main-content">
            <Routes>
              <Route path="/"             element={<Dashboard onAddTransaction={() => setIsModalOpen(true)} />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics"    element={<Analytics />} />
              <Route path="/budgets"      element={<Budgets />} />
              <Route path="/settings"     element={<Settings />} />
            </Routes>
          </main>
        </div>

        {/* Mobile bottom nav */}
        <MobileNavigation />

        {/* Global add-transaction modal (visual only) */}
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Router>
  )
}

export default App
