import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatINR, CATEGORIES } from "../data/sampleData";

const COLORS = [
  "#173C32",
  "#D56A43",
  "#B89B62",
  "#7B9A83",
  "#8A817C",
  "#C69C72",
  "#547C8B",
  "#A5A58D",
];

const EmptyChartState = ({ height = 200 }) => (
  <div
    className="w-full flex flex-col items-center justify-center rounded-xl"
    style={{ height, background: "#F5F1E8" }}
  >
    <div className="text-xs" style={{ color: "#77796F" }}>
      No data yet
    </div>
  </div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-xl p-3 shadow-lg"
      style={{
        background: "#FFFCF5",
        border: "1px solid #DEDCCF",
      }}
    >
      <p className="text-xs mb-2 font-semibold" style={{ color: "#202821" }}>
        {label || payload[0].name}
      </p>

      {payload.map((item, index) => (
        <p
          key={`${item.dataKey}-${index}`}
          className="text-xs mb-1"
          style={{ color: item.color || item.payload?.fill || "#173C32" }}
        >
          {item.name}: {formatINR(Number(item.value) || 0)}
        </p>
      ))}
    </div>
  );
};

const getMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const getTransactionDate = (transaction) => {
  if (!transaction.date) return null;

  const date = new Date(transaction.date);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getCategoryLabel = (category) => {
  const found = CATEGORIES.find(
    (item) => item.id === String(category || "").toLowerCase(),
  );

  return found?.label || category || "Uncategorized";
};

// Income vs Expenses
const IncomeExpenseChart = ({ transactions }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

    return {
      key: getMonthKey(date),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
      income: 0,
      expenses: 0,
    };
  });

  const monthMap = new Map(months.map((month) => [month.key, month]));

  transactions.forEach((transaction) => {
    const date = getTransactionDate(transaction);
    if (!date) return;

    const month = monthMap.get(getMonthKey(date));
    if (!month) return;

    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "income") {
      month.income += amount;
    } else if (transaction.type === "expense") {
      month.expenses += amount;
    }
  });

  const hasData = months.some((month) => month.income || month.expenses);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl p-5"
      style={{ background: "#FFFCF5", border: "1px solid #DEDCCF" }}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: "#202821" }}>
            Income vs Expenses
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#77796F" }}>
            Last 6 months
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: "#173C32" }}
            />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: "#D56A43" }}
            />
            Expenses
          </span>
        </div>
      </div>

      {!hasData ? (
        <EmptyChartState height={220} />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={months} barGap={5}>
            <CartesianGrid
              stroke="#EAE5D9"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#77796F", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#77796F", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
              }
              width={48}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#173C32"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#D56A43"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Spending trend
const SpendingTrend = ({ transactions }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

    return {
      key: getMonthKey(date),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
      expenses: 0,
    };
  });

  const monthMap = new Map(months.map((month) => [month.key, month]));

  transactions.forEach((transaction) => {
    if (transaction.type !== "expense") return;

    const date = getTransactionDate(transaction);
    if (!date) return;

    const month = monthMap.get(getMonthKey(date));
    if (month) month.expenses += Number(transaction.amount) || 0;
  });

  const hasData = months.some((month) => month.expenses > 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="rounded-2xl p-5"
      style={{ background: "#FFFCF5", border: "1px solid #DEDCCF" }}
    >
      <div className="mb-5">
        <h3 className="font-semibold text-sm" style={{ color: "#202821" }}>
          Spending Trend
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#77796F" }}>
          Monthly expenses
        </p>
      </div>

      {!hasData ? (
        <EmptyChartState height={160} />
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={months}>
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D56A43" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D56A43" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#EAE5D9"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#77796F", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#77796F", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
              }
              width={45}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#D56A43"
              strokeWidth={2}
              fill="url(#spendingGradient)"
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

// Expense categories
const CategoryDonut = ({ transactions }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const categoryMap = new Map();

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      const category = getCategoryLabel(transaction.category);
      const amount = Number(transaction.amount) || 0;

      categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
    });

  const data = Array.from(categoryMap, ([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalSpent = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      className="rounded-2xl p-5"
      style={{ background: "#FFFCF5", border: "1px solid #DEDCCF" }}
    >
      <div className="mb-5">
        <h3 className="font-semibold text-sm" style={{ color: "#202821" }}>
          Expense Categories
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#77796F" }}>
          Breakdown by category
        </p>
      </div>

      {data.length === 0 ? (
        <EmptyChartState height={180} />
      ) : (
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div
            className="relative flex-shrink-0 w-full sm:w-1/2"
            style={{ height: 180 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold" style={{ color: "#202821" }}>
                {formatINR(totalSpent)}
              </span>
              <span className="text-xs" style={{ color: "#77796F" }}>
                total spent
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3 w-full min-w-0">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: COLORS[index % COLORS.length] }}
                />
                <span className="flex-1 truncate" style={{ color: "#77796F" }}>
                  {item.name}
                </span>
                <span
                  className="font-semibold whitespace-nowrap"
                  style={{ color: "#202821" }}
                >
                  {Math.round((item.value / totalSpent) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SpendingChart = ({ transactions = [] }) => (
  <div className="flex flex-col gap-4">
    <IncomeExpenseChart transactions={transactions} />

    <div className="grid sm:grid-cols-2 gap-4">
      <CategoryDonut transactions={transactions} />
      <SpendingTrend transactions={transactions} />
    </div>
  </div>
);

export default SpendingChart;
