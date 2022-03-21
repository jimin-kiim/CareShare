import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";

export default function ChatRoom({ name, owner, joiner }) {
    return (
        <View>
            {/* <View style={styles.chatRoom}>
                <Text>{name}</Text>
                <Text>{owner}</Text>
                <Text>{joiner}</Text>
            </View> */}
            <ScrollView>
                <TouchableOpacity style={styles.chatRoom}>
                    <View style={styles.chatImage}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: "https://reactnative.dev/img/tiny_logo.png",
                            }}
                        />
                    </View>
                    <View style={styles.chatContainer}>
                        <Text>채팅방 : {name}</Text>
                        <Text>
                            참여자 : {owner} & {joiner}{" "}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    chatRoom: {
        flexDirection: "row",
        height: 80,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 1,
        padding: 10,
    },
    chatContainer: {
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 20,
        borderColor: "#000",
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    chatImage: {
        flexDirection: "column",
        justifyContent: "center",
    },
});
