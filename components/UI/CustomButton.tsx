import {Pressable, View, Text, StyleSheet, ViewStyle} from "react-native";
import React from "react";
import {GlobalStyles} from "../../constans/styles";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    mode?: "flat";
    style?: ViewStyle
}

const CustomButton: React.FC<CustomButtonProps> = ({children, onPress, mode, style}) => {
    return (
        <View style={style}>
            <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress}>
                <View style={[styles.button, mode === "flat" && styles.flat]}>
                    <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
       borderRadius: 4,
       padding: 8,
       backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: "transparent",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        borderRadius: 4,
        opacity: 0.5,
        backgroundColor: GlobalStyles.colors.primary100,
    },


});

export default CustomButton;