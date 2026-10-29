import React from "react";
import { motion } from "motion/react";
import RecentTransactions from "../components/RecentTransactions";

const Transactions = ({
  transactions = [],
  onDeleteTransaction,
  onEditTransaction,
}) => (
  <div className="flex flex-col gap-5 p-4 sm:p-6 pb-8">
    {/* Page title */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-xs font-medium tracking-widest"
          style={{
            color: "#B89B62",
            fontFamily: '"DM Sans", sans-serif',
            letterSpacing: "0.18em",
          }}
        >
          01
        </span>

        <div
          className="h-px flex-1"
          style={{ background: "#DEDCCF", maxWidth: 32 }}
        />
      </div>

      <h1
        className="font-bold"
        style={{
          color: "#202821",
          fontFamily: '"DM Serif Display", serif',
          fontSize: "1.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        All Transactions
      </h1>

      <p
        className="text-sm mt-1"
        style={{
          color: "#77796F",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        Your complete transaction history with search and filters
      </p>
    </motion.div>

    {/* Transaction list */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <RecentTransactions
        transactions={transactions}
        limit={Infinity}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
      />
    </motion.div>
  </div>
);

export default Transactions;
