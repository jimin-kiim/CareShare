import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    Alert,
    Platform,
    Dimensions,
    ScrollView,
} from "react-native";
import { elapsedTime } from "./functions";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const auth = getAuth();
export default function PostDetail({ route, navigation }) {
    const user = auth.currentUser;
    const firestore = getFirestore();
    const [content, setContent] = useState({});
    const id = route.params.key;

    useEffect(() => {
        loadPost();
        DeviceEventEmitter.addListener("toDetail", () => {
            loadPost();
        });
        return () => {
            console.log("unmount detail");
            DeviceEventEmitter.emit("toHome");
        };
    }, []);

    const loadPost = async () => {
        try {
            console.log(user.uid);
            const docRef = doc(firestore, "posts", id);
            const postRef = await getDoc(docRef);
            const post = postRef.data();
            setContent(post);
            console.log(post);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updatePost = () => {
        navigation.navigate("PostForm", { key: id });
    };

    const deletePost = async () => {
        if (Platform.OS === "web") {
            const ok = confirm("Are you sure you want to delete this post?");
            if (ok) {
                await deleteDoc(doc(firestore, "posts", id)).then(() => {
                    navigation.navigate("Home");
                });
            }
        } else {
            Alert.alert("Deleting the Post", "Are you sure?", [
                { text: "Cancel" },
                {
                    text: "I'm sure",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(firestore, "posts", id)).then(
                            () => {
                                navigation.navigate("Home");
                            }
                        );
                    },
                },
            ]);
        }
    };
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerLeft}
                    onPress={() => navigation.navigate("Home", { navigation })}
                >
                    <Image
                        source={require("../assets/ios-arrow-down.svg")}
                        style={styles.goBackIcon}
                    />
                    <Image
                        source={require("../assets/ios-home.svg")}
                        style={styles.homeIcon}
                    ></Image>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require("../assets/ios-share-alt.svg")}
                        style={styles.shareIcon}
                    ></Image>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={styles.writerInfo}>
                        <View style={styles.writerInfoLeft}>
                            <Image
                                style={styles.profileImg}
                                source={require("../assets/Ellipse 2.svg")}
                            ></Image>
                            <Text style={styles.writerName}>정카잇</Text>
                        </View>
                        <View style={styles.writerInfoRight}>
                            <Text style={styles.careText}>케어지수</Text>
                            <Text style={styles.careNum}>4</Text>
                        </View>
                    </View>
                    <Image
                        source={{ uri: content.image }}
                        style={styles.postImg}
                    />
                    <View style={styles.postContents}>
                        <View style={styles.temporary}>
                            <Text style={styles.postType}>{content.type}</Text>
                            {user.uid == content.writerID ? (
                                <View style={styles.forWriter}>
                                    <TouchableOpacity
                                        onPress={() => updatePost(id)}
                                    >
                                        <Text style={styles.forWriterText}>
                                            수정
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deletePost(id)}
                                    >
                                        <Text style={styles.forWriterText}>
                                            삭제
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                        <Text style={styles.postTitle}>{content.title}</Text>
                        <View style={styles.postInfo}>
                            <Text style={styles.postInfoText}>
                                {content.address}
                            </Text>
                            <Text style={styles.postInfoText}>
                                {" "}
                                · {elapsedTime(content.createdAt)}일 전
                            </Text>
                        </View>
                        <Text style={styles.postContent}>
                            {content.content}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.contact}>
                <View style={styles.contactLeft}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/ios-heart-empty.svg")}
                            style={styles.postHeart}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.postPrice}>보증금: 15,000 원</Text>
                        <Text style={styles.postPrice}>
                            대여료: {content.price} 원
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.chatBtn}>채팅 보내기</Text>
                </TouchableOpacity>
            </View>
        </>
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
    shareIcon: {
        width: 24,
        height: 22,
    },
    writerInfo: {
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    writerInfoLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImg: {
        width: 37,
        height: 37,
        marginRight: 13,
    },
    writerName: {
        fontSize: 18,
        color: theme.textDark,
    },
    writerInfoRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    careText: {
        fontSize: 15,
        color: theme.textLight,
        fontWeight: "500",
    },
    careNum: {
        fontSize: 15,
        color: theme.textDark,
        fontWeight: "700",
        backgroundColor: "#E4F963",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
        marginLeft: 10,
        marginBottom: 2,
        overflow: "hidden",
    },
    postImg: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
    },
    postContents: {
        marginHorizontal: 20,
    },
    temporary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    postType: {
        fontSize: 15,
        color: theme.textDark,
        borderRadius: 10,
        backgroundColor: "#EEEEEE",
        paddingVertical: 3,
        paddingHorizontal: 11,
        alignSelf: "flex-start",
        marginVertical: 20,
        overflow: "hidden",
    },
    forWriter: {
        flexDirection: "row",
    },
    forWriterText: {
        color: theme.textLight,
        marginLeft: 10,
    },
    postTitle: {
        fontSize: 20,
        color: theme.textDark,
        fontWeight: "700",
    },
    postInfo: {
        flexDirection: "row",
        paddingTop: 7,
        paddingBottom: 17,
    },
    postInfoText: {
        fontSize: 15,
        color: theme.textLight,
    },
    postContent: {
        fontSize: 18,
        lineHeight: 26,
        color: theme.textDark,
    },
    contact: {
        flexDirection: "row",
        marginHorizontal: 18,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    contactLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    postHeart: {
        width: 20,
        height: 18,
        marginRight: 20,
        marginLeft: 5,
    },
    postPrice: {
        fontSize: 18,
        color: theme.textDark,
        fontWeight: "700",
    },
    chatBtn: {
        backgroundColor: theme.yellow,
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 17,
        fontWeight: "700",
        fontSize: 18,
        overflow: "hidden",
    },
});
