import axios from "axios";

const API_URL = "http://localhost:3000/budgets";

export const getBudgets = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const saveBudget = async ({ category, limit, month }, budgets) => {
    const existingBudget = budgets.find(
    (budget) => budget.category === category && budget.month === month,
    );

    if (existingBudget) {
    const response = await axios.patch(`${API_URL}/${existingBudget.id}`, {
        limit,
    });
    return response.data;
    }

    const response = await axios.post(API_URL, {
    category,
    limit,
    month,
    });

    return response.data;
};
