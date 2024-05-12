import {StyleSheet, View, Text} from "react-native"
import React from "react";
import {GlobalStyles} from "../../constans/styles";

interface ExpensesSummaryProps {
    periodName: string;
    expenses: IExpense[];
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({periodName, expenses}) => {
    const expensesSum = expenses.reduce((a, b) => a + b.amount, 0);

    return (
        <View style={styles.row}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.price}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,
    }
});

export default ExpensesSummary;