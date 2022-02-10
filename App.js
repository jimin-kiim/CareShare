import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home/Home";

export default function App() {
    return (
        <View>
            <Home />
            <StatusBar style="auto" />
        </View>
    );
}
