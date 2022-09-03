import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./colors";
import HomeIcon from "./assets/ios-home.svg";
import Info from "./assets/ios-information-circle-outline.svg";
import Cart from "./assets/ios-cart.svg";
import Chat from "./assets/ios-chatbubbles.svg";
import Profile from "./assets/md-person.svg";
import React from "react";
export default function NavigationBar({
    home,
    info,
    shopping,
    chatting,
    myPage,
    navigation,
}) {
    return (
        <View style={styles.naviationBar}>
            <TouchableOpacity
                style={styles.navigationItem}
                onPress={() => navigation.navigate("Home", { navigation })}
            >
                <HomeIcon
                    width={20}
                    height={23}
                    fill={home ? theme.textDark : theme.iconGray}
                    style={{
                        marginTop: 14,
                        marginBottom: 9,
                    }}
                />
                <Text
                    style={
                        home
                            ? { color: theme.textDark }
                            : { color: theme.iconGray }
                    }
                >
                    홈
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Info
                    fill={info ? theme.textDark : theme.iconGray}
                    style={styles.navigationIcon}
                />
                <Text
                    style={
                        info
                            ? { color: theme.textDark }
                            : { color: theme.iconGray }
                    }
                >
                    정보
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Cart
                    fill={shopping ? theme.textDark : theme.iconGray}
                    style={styles.navigationIcon}
                />
                <Text
                    style={
                        shopping
                            ? { color: theme.textDark }
                            : { color: theme.iconGray }
                    }
                    onPress={() =>
                        navigation.navigate("Shopping", { navigation })
                    }
                >
                    쇼핑
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Chat
                    fill={chatting ? theme.textDark : theme.iconGray}
                    style={styles.navigationIcon}
                />
                <Text
                    style={
                        chatting
                            ? { color: theme.textDark }
                            : { color: theme.iconGray }
                    }
                >
                    채팅
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationItem}>
                <Profile
                    fill={myPage ? theme.textDark : theme.iconGray}
                    style={{
                        marginTop: 15,
                        marginBottom: 8,
                    }}
                />
                <Text
                    style={
                        myPage
                            ? { color: theme.textDark }
                            : { color: theme.iconGray }
                    }
                    onPress={() =>
                        navigation.navigate("MyPage", { navigation })
                    }
                >
                    마이페이지
                </Text>
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
        marginBottom: 20,
    },
    navigationItem: {
        alignItems: "center",
        width: 57,
    },
    navigationIcon: {
        marginTop: 10,
        marginBottom: 7,
    },
});
