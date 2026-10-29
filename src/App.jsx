
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import MobileNavigation from './components/MobileNavigation'
import TransactionModal from './components/TransactionModal'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Budgets from './pages/Budgets'
import Settings from './pages/Settings'

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from './services/transactionService'

import {
  getBudgets,
  saveBudget,
} from './services/budgetService'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load transactions and budgets from JSON Server
  useEffect(() => {
    const loadData = async () => {
      try {
        setError('')

        const [transactionData, budgetData] = await Promise.all([
          getTransactions(),
          getBudgets(),
        ])

        setTransactions(
          Array.isArray(transactionData) ? transactionData : []
        )

        setBudgets(
          Array.isArray(budgetData) ? budgetData : []
        )
      } catch (err) {
        console.error('Failed to load application data:', err)
        setError(
          'Unable to connect to JSON Server. Check that it is running on port 3000.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Open modal for a new transaction
  const handleAddClick = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  // Open modal with existing transaction details
  const handleEditTransaction = transaction => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  // Add or update transaction in JSON Server
  const handleSubmitTransaction = async transaction => {
    try {
      if (editingTransaction) {
        const updated = await updateTransaction(
          editingTransaction.id,
          transaction
        )

        setTransactions(previous =>
          previous.map(item =>
            item.id === editingTransaction.id ? updated : item
          )
        )
      } else {
        const created = await addTransaction(transaction)
        setTransactions(previous => [...previous, created])
      }

      setIsModalOpen(false)
      setEditingTransaction(null)
    } catch (err) {
      console.error('Failed to save transaction:', err)
      throw err
    }
  }

  // Delete transaction from JSON Server
  const handleDeleteTransaction = async id => {
    try {
      await deleteTransaction(id)

      setTransactions(previous =>
        previous.filter(transaction => transaction.id !== id)
      )
    } catch (err) {
      console.error('Failed to delete transaction:', err)
      setError('Could not delete the transaction. Please try again.')
    }
  }

  // Save a budget to JSON Server
  const handleSaveBudget = async (category, limit) => {
    const currentMonth = new Date().toISOString().slice(0, 7)

    try {
      setError('')

      const savedBudget = await saveBudget(
        {
          category,
          limit,
          month: currentMonth,
        },
        budgets
      )

      setBudgets(previous => {
        const existingIndex = previous.findIndex(
          budget =>
            budget.category === category &&
            budget.month === currentMonth
        )

        if (existingIndex === -1) {
          return [...previous, savedBudget]
        }

        return previous.map((budget, index) =>
          index === existingIndex ? savedBudget : budget
        )
      })

      return savedBudget
    } catch (err) {
      console.error('Failed to save budget:', err)
      setError('Could not save the budget. Please try again.')
      throw err
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
        <p className="text-sm text-[#77796F]">
          Loading Moneta...
        </p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F1E8]">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 min-w-0 pb-20 md:pb-0">
            {error && (
              <div
                className="mx-4 mt-4 rounded-xl p-3 text-sm"
                style={{
                  color: '#D56A43',
                  background: '#FFFCF5',
                  border: '1px solid #DEDCCF',
                }}
              >
                {error}
              </div>
            )}

            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    budgets={budgets}
                    onSaveBudget={handleSaveBudget}
                    onAddTransaction={handleAddClick}
                  />
                }
              />

              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    onAddTransaction={handleAddClick}
                    onDeleteTransaction={handleDeleteTransaction}
                    onEditTransaction={handleEditTransaction}
                  />
                }
              />

              <Route
                path="/analytics"
                element={
                  <Analytics transactions={transactions} />
                }
              />

              <Route
                path="/budgets"
                element={
                  <Budgets
                    transactions={transactions}
                    budgets={budgets}
                    onSaveBudget={handleSaveBudget}
                  />
                }
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </main>
        </div>

        <MobileNavigation />

        <TransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmitTransaction}
          transaction={editingTransaction}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
