// MONETA — Reference data and utilities (no sample records)
// All amounts in Indian Rupees (₹)

export const CATEGORIES = [
  { id: 'food',          label: 'Food & Dining',    color: '#D56A43', bg: '#FEF3EE' },
  { id: 'transport',     label: 'Transport',         color: '#B89B62', bg: '#FAF5E8' },
  { id: 'shopping',      label: 'Shopping',          color: '#173C32', bg: '#EDF4F0' },
  { id: 'bills',         label: 'Bills & Utilities', color: '#77796F', bg: '#F5F3EE' },
  { id: 'entertainment', label: 'Entertainment',     color: '#A9B7A0', bg: '#F0F4EE' },
  { id: 'health',        label: 'Health',            color: '#5A8A7A', bg: '#EBF4F1' },
  { id: 'salary',        label: 'Salary',            color: '#173C32', bg: '#EDF4F0' },
  { id: 'freelance',     label: 'Freelance',         color: '#B89B62', bg: '#FAF5E8' },
  { id: 'other',         label: 'Other',             color: '#DEDCCF', bg: '#F9F8F4' },
]

export const PAYMENT_METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Net Banking']

// Budget categories (labels and limits only — no tracked spend)
export const BUDGET_CATEGORIES = [
  { id: 'food',          label: 'Food & Dining',    icon: 'food' },
  { id: 'transport',     label: 'Transport',         icon: 'transport' },
  { id: 'shopping',      label: 'Shopping',          icon: 'shopping' },
  { id: 'entertainment', label: 'Entertainment',     icon: 'entertainment' },
  { id: 'health',        label: 'Health',            icon: 'health' },
  { id: 'bills',         label: 'Bills & Utilities', icon: 'bills' },
]

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatINRFull(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getCategoryMeta(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1]
}
