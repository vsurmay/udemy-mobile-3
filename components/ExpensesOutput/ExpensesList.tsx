import {StyleSheet, View, Text, ScrollView} from "react-native"
import React from "react";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
    expenses: IExpense[]
}

const ExpensesList: React.FC<ExpensesListProps> = ({expenses}) => {

    const renderExpenseItem = (item: IExpense) => {
        return (
            <ExpenseItem key={item.id} expense={item}/>
        )
    }

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                {expenses.map(el => renderExpenseItem(el))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10,
        gap: 10
    }
});

export default ExpensesList;