import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TextInputProps,
    ViewProps, ViewStyle
} from "react-native";
import React from "react";
import {GlobalStyles} from "../../constans/styles";

interface CustomInputProps {
    label: string;
    textInputConfig: TextInputProps;
    style?: ViewStyle;
    invalid: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({invalid, label, textInputConfig, style}) => {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.labelInvalid]}>{label}</Text>
            <TextInput
                style={[styles.input, textInputConfig.multiline && styles.inputMultiline, invalid && styles.inputInvalid]} {...textInputConfig}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    labelInvalid: {
        color: GlobalStyles.colors.error500,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 80,
        verticalAlign: "top"
    },
    inputInvalid: {
        borderColor: GlobalStyles.colors.error500,
        backgroundColor: GlobalStyles.colors.error50
    }
});

export default CustomInput;