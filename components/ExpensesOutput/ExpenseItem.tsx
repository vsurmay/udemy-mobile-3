import {StyleSheet, View, Text, Pressable} from "react-native"
import React from "react";
import {GlobalStyles} from "../../constans/styles";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";

interface ExpensesItemProps {
    expense: IExpense
}

const ExpensesItem: React.FC<ExpensesItemProps> = ({expense}) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ManageExpense", {
            expenseId: expense.id
        });
    }

    return (
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress}>
            <View style={styles.item}>
                <View>
                    <Text style={styles.description}>{expense.description}</Text>
                    <Text style={styles.date}>{moment(expense.date).format("yyyy-MM-DD")}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5
    },
    item: {
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    description: {
        marginBottom: 4,
        color: GlobalStyles.colors.primary50,
        fontSize: 14,
        fontWeight: "700"
    },
    date: {
        color: GlobalStyles.colors.primary50,
        fontSize: 12,
        fontWeight: "400"
    },
    amountContainer: {
        minWidth: 60,
        padding: 6,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 4,
    },
    amount: {
        textAlign: "center",
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,

    }
});

export default ExpensesItem;