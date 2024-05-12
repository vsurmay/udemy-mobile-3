import {StyleSheet, View, Text, Alert} from "react-native";
import CustomInput from "../UI/CustomInput";
import React, {useEffect, useState} from "react";
import CustomButton from "../UI/CustomButton";
import expense, {addExpense, updateExpense} from "../../store/slices/expense";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch} from "../../store/store";
import moment from "moment";

interface ExpenseFormProps {
    isEditing: boolean;
    currentExpense: IExpense | undefined;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({isEditing, currentExpense}) => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const initialValues = isEditing && currentExpense ? {
        amount: {value: currentExpense.amount.toString(), valid: true},
        date: {value: moment(currentExpense.date).format("YYYY-MM-DD"), valid: true},
        description: {value: currentExpense.description, valid: true}
    } : {
        amount: {value: "", valid: true},
        date: {value: moment(new Date()).format("YYYY-MM-DD"), valid: true},
        description: {value: "", valid: true}
    };

    const [inputValues, setInputValues] = useState(initialValues);

    const inputChangedHandler = (inputIdentifier: "amount" | "date" | "description", value: string) => {
        setInputValues({...inputValues, [inputIdentifier]: {value: value, valid: true}});
    }

    useEffect(() => {
        console.log(inputValues);
    }, [inputValues]);

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = () => {
        const amountIsValid = !isNaN(Number(inputValues.amount.value)) && Number(inputValues.amount.value) > 0;
        const dateIsValid = moment(inputValues.date.value).isValid();
        const descriptionIsValid = inputValues.description.value.trim().length > 0;

        console.log(amountIsValid, dateIsValid, descriptionIsValid);

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {

            setInputValues({
                amount: {value: inputValues.amount.value, valid: amountIsValid},
                date: {value: inputValues.date.value, valid: dateIsValid},
                description: {value: inputValues.description.value, valid: descriptionIsValid}
            });

            Alert.alert("Invalid input", "Please check your input values");
            return;
        }

        if (isEditing && currentExpense) {
            const model: IExpense = {
                id: currentExpense.id,
                amount: Number(inputValues.amount.value),
                date: new Date(inputValues.date.value),
                description: inputValues.description.value.trim(),
            }
            dispatch(updateExpense(model));
        } else {
            const model: Omit<IExpense, "id"> = {
                amount: Number(inputValues.amount.value),
                date: new Date(inputValues.date.value),
                description: inputValues.description.value.trim(),
            }
            dispatch(addExpense(model));
        }
        navigation.goBack();
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.row}>
                <CustomInput style={styles.rowInput} invalid={!inputValues.amount.valid} label={"Amount"}
                             textInputConfig={{
                                 keyboardType: "decimal-pad",
                                 value: inputValues.amount.value,
                                 onChangeText: (value) => inputChangedHandler("amount", value),
                             }}/>

                <CustomInput style={styles.rowInput} invalid={!inputValues.date.valid} label={"Data"} textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    value: inputValues.date.value,
                    onChangeText: (value) => inputChangedHandler("date", value),
                }}/>
            </View>

            <CustomInput label={"Description"} invalid={!inputValues.description.valid} textInputConfig={{
                multiline: true,
                maxLength: 255,
                value: inputValues.description.value,
                onChangeText: (value) => inputChangedHandler("description", value),
            }}/>

            <View style={styles.buttonsContainer}>
                <CustomButton style={styles.buttonStyle} mode={"flat"} onPress={cancelHandler}>Cancel</CustomButton>
                <CustomButton style={styles.buttonStyle}
                              onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</CustomButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20
    },
    buttonStyle: {
        minWidth: 120,
    },
});

export default ExpenseForm;