import {View, Text, StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useAppSelector} from "../store/store";
import moment from "moment";

const RecentExpenses = () => {

    const {expenses} = useAppSelector(state => state.expenseSlice);

    const filteredExpenses = expenses.filter(el => moment().subtract(7, "days").isBefore(moment(el.date)));

    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={filteredExpenses} periodName={"Last 7 day"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default RecentExpenses;