import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const DUMMY_EXPENSES: IExpense[] = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19")
    },
    {
        id: "e2",
        description: "Some bananas",
        amount: 44.44,
        date: new Date("2022-06-19")
    },
    {
        id: "e3",
        description: "Car",
        amount: 72,
        date: new Date("2021-02-29")
    },
    {
        id: "e4",
        description: "Food for cat",
        amount: 11.27,
        date: new Date("2024-04-15")
    },
    {
        id: "e5",
        description: "Food for dog",
        amount: 5.10,
        date: new Date("2024-04-20")
    }
]

interface IInitialState {
    expenses: IExpense[];
}

const initialState: IInitialState = {
    expenses: DUMMY_EXPENSES
}

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Omit<IExpense, "id">>) => {
            const id = new Date().toString() + Math.random().toString();
            state.expenses = [...state.expenses, {...action.payload, id}];
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        },
        updateExpense: (state, action: PayloadAction<IExpense>) => {
            state.expenses = state.expenses.map(el => {
                if (el.id === action.payload.id) {
                    return action.payload;
                } else {
                    return el;
                }
            });
        },
    }
})

export const {addExpense, updateExpense, deleteExpense} = expenseSlice.actions;

export default expenseSlice.reducer;