import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MdSearch,
  MdArrowForward,
  MdInbox,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { CATEGORIES, formatINR } from "../data/sampleData";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const FILTER_TYPES = [
  { id: "all", label: "All" },
  { id: "income", label: "Income" },
  { id: "expense", label: "Expenses" },
];

const EmptyState = ({ hasFilter }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 text-center"
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
      style={{ background: "#F5F1E8" }}
    >
      <MdInbox size={28} style={{ color: "#B89B62" }} />
    </div>

    <div
      className="font-semibold text-base mb-1"
      style={{ color: "#202821", fontFamily: '"DM Sans", sans-serif' }}
    >
      {hasFilter ? "No results found" : "No transactions yet"}
    </div>

    <div className="text-xs" style={{ color: "#77796F" }}>
      {hasFilter
        ? "Try adjusting your filters"
        : "Add your first transaction to get started"}
    </div>
  </motion.div>
);

const RecentTransactions = ({
  transactions = [],
  onViewAll,
  onDeleteTransaction,
  onEditTransaction,

  limit = 8,
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const expenseCategories = CATEGORIES.filter(
    (c) => c.id !== "salary" && c.id !== "freelance",
  );

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = [
      transaction.title,
      transaction.description,
      transaction.category,
      transaction.type,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      );

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" ||
      String(transaction.category).toLowerCase() ===
        categoryFilter.toLowerCase();

    return matchesSearch && matchesType && matchesCategory;
  });

  const displayedTransactions = filteredTransactions.slice(0, limit);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyCount = transactions.filter((transaction) => {
    if (!transaction.date) return false;

    const date = new Date(transaction.date);

    return (
      !Number.isNaN(date.getTime()) &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  const hasFilter =
    search.trim() !== "" || typeFilter !== "all" || categoryFilter !== "all";

  const getCategoryLabel = (category) => {
    const found = CATEGORIES.find(
      (c) => c.id === String(category).toLowerCase(),
    );

    return found?.label || category || "Uncategorized";
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#FFFCF5",
        border: "1px solid #DEDCCF",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-5 pb-4"
        style={{ borderBottom: "1px solid #F5F1E8" }}
      >
        <div>
          <h2
            className="font-semibold"
            style={{
              color: "#202821",
              fontFamily: '"DM Serif Display", serif',
              fontSize: "1.1rem",
            }}
          >
            Recent activity
          </h2>

          <p className="text-xs mt-0.5" style={{ color: "#77796F" }}>
            {monthlyCount} transactions this month
          </p>
        </div>

        {onViewAll && (
          <motion.button
            whileHover={{ x: 3 }}
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: "#173C32" }}
          >
            View all <MdArrowForward size={14} />
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <div
        className="px-5 py-3 flex flex-wrap gap-3"
        style={{ borderBottom: "1px solid #F5F1E8" }}
      >
        <div className="relative flex-1" style={{ minWidth: 160 }}>
          <MdSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#77796F" }}
          />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl outline-none"
            style={{
              background: "#F5F1E8",
              border: "1px solid #DEDCCF",
              color: "#202821",
              fontFamily: '"DM Sans", sans-serif',
            }}
          />
        </div>

        <div
          className="flex rounded-xl overflow-hidden"
          style={{
            border: "1px solid #DEDCCF",
            background: "#F5F1E8",
          }}
        >
          {FILTER_TYPES.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTypeFilter(filter.id)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background:
                  typeFilter === filter.id ? "#173C32" : "transparent",
                color: typeFilter === filter.id ? "#F5F1E8" : "#77796F",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-xl outline-none"
          style={{
            background: "#F5F1E8",
            border: "1px solid #DEDCCF",
            color: "#202821",
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          <option value="all">All categories</option>
          {expenseCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction list */}
      <div className="px-2 py-2">
        <AnimatePresence mode="popLayout">
          {displayedTransactions.length === 0 ? (
            <EmptyState key="empty" hasFilter={hasFilter} />
          ) : (
            <motion.div layout className="divide-y divide-[#F5F1E8]">
              {displayedTransactions.map((transaction, index) => {
                const isIncome = transaction.type === "income";

                return (
                  <motion.div
                    layout
                    key={transaction.id ?? `${transaction.title}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-3 py-4 rounded-xl"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isIncome ? "#E5EDE3" : "#F8E8DF",
                      }}
                    >
                      {isIncome ? (
                        <MdArrowDownward
                          size={19}
                          style={{ color: "#477653" }}
                        />
                      ) : (
                        <MdArrowUpward size={19} style={{ color: "#D56A43" }} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: "#202821" }}
                      >
                        {transaction.title ||
                          transaction.description ||
                          getCategoryLabel(transaction.category)}
                      </p>

                      <p className="text-xs mt-1" style={{ color: "#77796F" }}>
                        {getCategoryLabel(transaction.category)}
                        {transaction.date &&
                          ` · ${new Date(transaction.date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p
                        className="text-sm font-semibold whitespace-nowrap"
                        style={{ color: isIncome ? "#477653" : "#D56A43" }}
                      >
                        {isIncome ? "+" : "-"}
                        {formatINR(Number(transaction.amount) || 0)}
                      </p>
                      
                      {onDeleteTransaction && (
                        <button
                          type="button"
                          title="Delete transaction"
                          aria-label={`Delete ${transaction.title || "transaction"}`}
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete "${transaction.title || "this transaction"}"?`,
                              )
                            ) {
                              onDeleteTransaction(transaction.id);
                            }
                          }}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50"
                          style={{ color: "#D56A43" }}
                        >
                          <MdDeleteOutline size={18} />
                        </button>
                      )}
                      {onEditTransaction && (
                        <button
                          type="button"
                          title="Edit transaction"
                          aria-label={`Edit ${transaction.title || "transaction"}`}
                          onClick={() => onEditTransaction(transaction)}
                          className="p-2 rounded-lg transition-colors hover:bg-green-50"
                          style={{ color: "#173C32" }}
                        >
                          <MdEdit size={18} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentTransactions;
