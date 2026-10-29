import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MdClose, MdArrowUpward, MdArrowDownward } from 'react-icons/md'
import { CATEGORIES, PAYMENT_METHODS } from '../data/sampleData'

const EXPENSE_CATEGORIES = CATEGORIES.filter(c => c.id !== 'salary' && c.id !== 'freelance' && c.id !== 'other')
const INCOME_CATEGORIES  = CATEGORIES.filter(c => c.id === 'salary' || c.id === 'freelance' || c.id === 'other')

const defaultForm = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'food',
  date: new Date().toISOString().split('T')[0],
  paymentMethod: 'UPI',
  description: '',
}

const TransactionModal = ({ isOpen, onClose, onSubmit, transaction }) => {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
  if (isOpen) {
    setForm(
      transaction
        ? { ...defaultForm, ...transaction, amount: String(transaction.amount) }
        : { ...defaultForm }
    );

    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen, transaction]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const currentCategories = form.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  const update = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'type') {
        next.category = value === 'expense' ? 'food' : 'salary'
      }
      return next
    })
  }

  const handleSubmit = async () => {
  if (!form.title.trim() || !form.amount || Number(form.amount) <= 0) {
    alert("Please enter a title and a valid amount");
    return;
  }

  try {
    await onSubmit({
      ...form,
      title: form.title.trim(),
      amount: Number(form.amount),
    });
  } catch (error) {
    console.error("Failed to save transaction:", error);
  }
};

  const inputStyle = {
    background: '#F5F1E8',
    border: '1px solid #DEDCCF',
    color: '#202821',
    fontFamily: '"DM Sans", sans-serif',
    borderRadius: 10,
    padding: '10px 12px',
    fontSize: 13,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(23,60,50,0.45)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Modal wrapper — scrollable on short viewports */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              role="dialog"
              aria-modal="true"
              aria-label="Add transaction"
              className="relative w-full max-w-md my-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#FFFCF5', border: '1px solid #DEDCCF' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #F5F1E8' }}>
                  <div>
                    <h2 className="font-semibold" style={{ color: '#202821', fontFamily: '"DM Serif Display", serif', fontSize: '1.15rem' }}>
                      New transaction
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: '#77796F' }}>
                      Fill in the transaction details
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    onClick={onClose}
                    className="p-2 rounded-xl"
                    style={{ background: '#F5F1E8', color: '#77796F' }}
                    aria-label="Close"
                  >
                    <MdClose size={18} />
                  </motion.button>
                </div>

                {/* Form body (visual only — no submit handler) */}
                <div className="px-6 py-5 flex flex-col gap-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>

                  {/* Type selector */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                      TRANSACTION TYPE
                    </label>
                    <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #DEDCCF', background: '#F5F1E8' }}>
                      {['expense', 'income'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update('type', t)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all"
                          style={{
                            background: form.type === t ? (t === 'expense' ? '#D56A43' : '#173C32') : 'transparent',
                            color: form.type === t ? '#F5F1E8' : '#77796F',
                            fontFamily: '"DM Sans", sans-serif',
                          }}
                        >
                          {t === 'expense' ? <MdArrowUpward size={15} /> : <MdArrowDownward size={15} />}
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                      TITLE
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => update('title', e.target.value)}
                      placeholder="e.g. Grocery shopping"
                      style={inputStyle}
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                      AMOUNT (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.amount}
                      onChange={e => update('amount', e.target.value)}
                      placeholder="0"
                      style={inputStyle}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                      CATEGORY
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentCategories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => update('category', cat.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{
                            background: form.category === cat.id ? cat.color : cat.bg,
                            color: form.category === cat.id ? '#F5F1E8' : cat.color,
                            border: `1px solid ${form.category === cat.id ? cat.color : '#DEDCCF'}`,
                            fontFamily: '"DM Sans", sans-serif',
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Payment method */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                        DATE
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={e => update('date', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                        PAYMENT
                      </label>
                      <select
                        value={form.paymentMethod}
                        onChange={e => update('paymentMethod', e.target.value)}
                        style={{ ...inputStyle, appearance: 'none' }}
                      >
                        {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#77796F', letterSpacing: '0.06em' }}>
                      NOTE (optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={e => update('description', e.target.value)}
                      placeholder="Add a note…"
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid #F5F1E8' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: '#F5F1E8',
                      border: '1px solid #DEDCCF',
                      color: '#77796F',
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: '#173C32',
                      color: '#F5F1E8',
                      fontFamily: '"DM Sans", sans-serif',
                      boxShadow: '0 2px 8px rgba(23,60,50,0.25)',
                    }}
                  >
                    Add transaction
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TransactionModal
