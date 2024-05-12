import React from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface IconButtonProps {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
    size: number;
    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({name, color, size, onPress}) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.buttonContainer, pressed && styles.pressed]}>
            <Ionicons name={name} color={color} size={size}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        margin: 8
    },
    pressed: {
        opacity: 0.5
    }
})

export default IconButton;