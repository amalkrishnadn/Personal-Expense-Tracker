import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MdArrowUpward, MdArrowDownward, MdSavings } from "react-icons/md";
import { formatINR } from "../data/sampleData";

// Decorative sparkline
const Sparkline = ({ color }) => {
  const points = [12, 8, 14, 10, 18, 14, 20, 16, 22];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const h = 32;
  const w = 80;

  const coords = points.map(
    (p, i) =>
      `${(i / (points.length - 1)) * w},${h - ((p - min) / (max - min)) * h}`,
  );

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points={coords.join(" ")}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35}
      />
    </svg>
  );
};

// Savings progress bar
const SavingsBar = ({ percentage }) => (
  <div
    className="w-full h-1 rounded-full mt-2 overflow-hidden"
    style={{ background: "#DEDCCF" }}
  >
    <div
      className="h-full rounded-full"
      style={{
        width: `${percentage}%`,
        background: "linear-gradient(90deg, #173C32, #B89B62)",
        transition: "width 0.5s ease",
      }}
    />
  </div>
);

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  color,
  bg,
  sparkColor,
  index,
  isSavings,
  percentage = 0,
  subtitle,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 8px 30px rgba(32,40,33,0.09)",
      }}
      className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow"
      style={{
        background: "#FFFCF5",
        border: "1px solid #DEDCCF",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div
            className="text-xs font-medium tracking-wide mb-1"
            style={{
              color: "#77796F",
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "0.06em",
            }}
          >
            {label.toUpperCase()}
          </div>

          <div
            className="font-bold break-words"
            style={{
              color: "#202821",
              fontFamily: '"DM Serif Display", serif',
              fontSize: "1.55rem",
              letterSpacing: "-0.01em",
            }}
          >
            {isSavings
              ? `${Math.round(Number(value) || 0)}%`
              : formatINR(Number(value) || 0)}{" "}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 18,
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: bg }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="text-xs"
          style={{
            color: "#77796F",
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          {subtitle}
        </span>
      </div>

      {isSavings && <SavingsBar percentage={percentage} />}

      <div className="flex items-end justify-between mt-auto">
        <Sparkline color={sparkColor} />

        {isSavings && (
          <span
            className="text-xs font-semibold"
            style={{
              color,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </motion.div>
  );
};

const SummaryCards = ({ transactions = [] }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const balance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0 ? Math.max(0, (balance / totalIncome) * 100) : 0;

  const cards = [
    {
      icon: MdArrowDownward,
      label: "Total Income",
      value: totalIncome,
      color: "#173C32",
      bg: "#EDF4F0",
      sparkColor: "#173C32",
      subtitle: `${transactions.filter((t) => t.type === "income").length} income transactions`,
    },
    {
      icon: MdArrowUpward,
      label: "Total Expenses",
      value: totalExpenses,
      color: "#D56A43",
      bg: "#FEF3EE",
      sparkColor: "#D56A43",
      subtitle: `${transactions.filter((t) => t.type === "expense").length} expense transactions`,
    },
    {
      icon: MdSavings,
      label: "Savings Rate",
      value: savingsRate,
      color: "#B89B62",
      bg: "#FAF5E8",
      sparkColor: "#B89B62",
      isSavings: true,
      percentage: Math.min(100, savingsRate),
      subtitle:
        totalIncome > 0
          ? "Of total income retained"
          : "Add income to calculate savings",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <SummaryCard key={card.label} {...card} index={i} />
      ))}
    </div>
  );
};

export default SummaryCards;
