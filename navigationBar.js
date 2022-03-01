import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./colors";
import HomeIcon from "./assets/ios-home.svg";
import Info from "./assets/ios-information-circle-outline.svg";
import Cart from "./assets/ios-cart.svg";
import Chat from "./assets/ios-chatbubbles.svg";
import Profile from "./assets/md-person.svg";
import React from "react";
export default function NavigationBar({}) {
    return (
        <View style={styles.naviationBar}>
            <TouchableOpacity
                style={styles.navigationItem}
                onPress={() => navigation.navigate("Home", { navigation })}
            >
                <HomeIcon
                    style={{
                        marginTop: 14,
                        marginBottom: 10,
                    }}
                />
                <Text style={styles.navigationText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Info style={styles.navigationIcon} />
                <Text style={styles.navigationText}>정보</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Cart style={styles.navigationIcon} />
                <Text style={styles.navigationText}>쇼핑</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Chat style={styles.navigationIcon} />
                <Text style={styles.navigationText}>채팅</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Profile
                    style={{
                        marginTop: 15,
                        marginBottom: 8,
                    }}
                />
                <Text style={styles.navigationText}>마이페이지</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    naviationBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopColor: "#F5F5F5",
        borderTopWidth: 1,
    },
    navigationItem: {
        alignItems: "center",
        width: 57,
    },
    navigationIcon: {
        marginTop: 10,
        marginBottom: 7,
    },
    navigationText: {
        color: theme.iconGray,
    },
});
