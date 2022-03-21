import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import Arrow from "../assets/ios-arrow-down.svg";
import Home from "../assets/ios-home.svg";
import Share from "../assets/ios-share-alt.svg";
import { getAuth } from "firebase/auth";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import { theme } from "../colors";
import {
    getFirestore,
    doc,
    getDoc,
    deleteDoc,
    getDocs,
    collection,
} from "firebase/firestore";
import ChatRoom from "./ChatRoom";

const auth = getAuth();

export default function Chat({ route, navigation }) {
    const date = new Date().getTime();
    const user = auth.currentUser;
    const [chatRooms, setChatRooms] = useState([]);
    const id = 1;
    const firestore = getFirestore();

    useEffect(() => {
        loadChat();
    }, []);

    const loadChat = async () => {
        try {
            console.log(user.uid);
            const chats = await getDocs(collection(firestore, "chats"));
            const chattingRooms = [];

            chats.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                chattingRooms.push({ ...data, key: doc.id });
            });
            setChatRooms(chattingRooms);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerLeft}
                    onPress={() => navigation.navigate("Home", { navigation })}
                >
                    <Arrow style={styles.goBackIcon} />
                    <Home style={styles.homeIcon}></Home>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Share style={styles.shareIcon}></Share>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {chatRooms
                    ? chatRooms.map((chatRoom) => (
                          <ChatRoom
                              name={chatRoom.name}
                              owner={chatRoom.Owner}
                              joiner={chatRoom.Joiner}
                              key={chatRoom.key}
                              id={chatRoom.id}
                          ></ChatRoom>
                      ))
                    : null}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        marginTop: 30,
        marginHorizontal: 23,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    goBackIcon: {
        width: 20,
        height: 13,
        transform: [{ rotate: "90deg" }],
        marginRight: 14,
        tintColor: theme.iconGray,
    },
    homeIcon: {
        width: 22,
        height: 24,
    },
});
