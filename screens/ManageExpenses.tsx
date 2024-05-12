import {View, StyleSheet} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constans/styles";
import {useAppDispatch, useAppSelector} from "../store/store";
import {deleteExpense} from "../store/slices/expense";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";

const ManageExpenses = () => {
    const route: any = useRoute();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const {expenses} = useAppSelector(state => state.expenseSlice);

    const expenseId = route.params?.expenseId;
    const currentExpense = expenseId ? expenses.find(el => el.id === expenseId) : undefined;
    const isEditing = !!expenseId;

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [isEditing]);

    const deleteExpenseHandler = () => {
        dispatch(deleteExpense(expenseId));
        navigation.goBack();
    }



    return (
        <View style={styles.container}>
            <ExpenseForm isEditing={isEditing} currentExpense={currentExpense}/>
            {
                isEditing && (
                    <View style={styles.deleteContainer}>
                        <IconButton
                            name={"trash"}
                            color={GlobalStyles.colors.error500}
                            size={36}
                            onPress={deleteExpenseHandler}
                        />
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1,
        justifyContent: "center"
    },
    deleteContainer: {
        marginTop: 16,
        borderTopWidth: 2,
        borderColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    },

});

export default ManageExpenses;