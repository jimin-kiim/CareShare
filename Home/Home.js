import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    AsyncStorage,
    Platform,
    Image,
} from "react-native";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerFilter}>
                    <Image
                        source={require("../assets/ios-arrow-down.svg")}
                        style={styles.headerFilterIcon}
                    />
                    <TouchableOpacity>
                        <Text style={styles.headerFilterText}>전체</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons
                            name="ios-menu"
                            size={24}
                            color={theme.iconGray}
                            style={{ paddingRight: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name="ios-search"
                            size={24}
                            color={theme.iconGray}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>{}</ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
    },
    headerFilter: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerFilterText: {
        fontWeight: "700",
        fontSize: 18,
        paddingLeft: 10,
        color: theme.textDark,
    },
    headerIcons: {
        flexDirection: "row",
    },
    headerFilterIcon: {
        width: 13,
        height: 8,
        marginBottom: 3,
    },
});
