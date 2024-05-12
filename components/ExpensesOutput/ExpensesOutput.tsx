import React from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constans/styles";

interface ExpensesOutputProps {
    expenses: IExpense[];
    periodName: string;
}

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({expenses, periodName}) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={periodName} expenses={expenses}/>
            { expenses.length ? (
                <ExpensesList expenses={expenses}/>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No data to display</Text>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 24,
        color: "white"
    }
})

export default ExpensesOutput;