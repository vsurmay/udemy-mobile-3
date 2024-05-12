import {View, Text, StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useAppSelector} from "../store/store";

const AllExpenses = () => {

    const {expenses} = useAppSelector(state => state.expenseSlice);

    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={expenses} periodName={"Total"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AllExpenses;