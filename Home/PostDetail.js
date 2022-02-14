import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export default function PostDetail({ route, navigation }) {
    const firestore = getFirestore();
    const [content, setContent] = useState({});
    const id = route.params.key;
    const isFocused = useIsFocused();

    useEffect(() => {
        loadPost();
    }, [isFocused]);

    const loadPost = async () => {
        try {
            const docRef = doc(firestore, "posts", id);
            const postRef = await getDoc(docRef);
            const post = postRef.data();
            console.log(post);
            setContent(post);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updatePost = () => {
        navigation.navigate("PostForm", { key: id });
    };

    const deletePost = async () => {
        const ok = window.confirm("Are you sure you want to delete this post?");
        if (ok) {
            await deleteDoc(doc(firestore, "posts", id)).then(() => {
                navigation.navigate("Home");
            });
        }
    };
    return (
        <View style={styles.post}>
            <Image
                source={require("../assets/test.jpeg")}
                style={styles.postImg}
            />
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{content.title}</Text>
                <View style={styles.postInfo}>
                    <Text style={styles.postInfoText}>{content.address}</Text>
                    <Text style={styles.postInfoText}> · 2일전</Text>
                </View>
                <Text style={styles.postType}>{content.type}</Text>
                <View style={styles.postLastInfo}>
                    <Text style={styles.postPrice}>{content.price} 원</Text>
                    <Image
                        source={require("../assets/ios-heart-empty.svg")}
                        style={styles.postHeart}
                    />
                </View>
                <TouchableOpacity onPress={() => updatePost(id)}>
                    <Text>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletePost(id)}>
                    <Text>삭제</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingTop: 25,
        marginTop: 30,
    },
    postContent: {
        paddingLeft: 20,
    },
    postImg: {
        width: 120,
        height: 120,
    },
    postTitle: {
        fontSize: 20,
        color: theme.textDark,
    },
    postInfo: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 17,
    },
    postInfoText: {
        fontSize: 15,
        color: theme.textLight,
    },
    postType: {
        fontSize: 15,
        color: theme.textDark,
        borderRadius: 15,
        backgroundColor: "#EEEEEE",
        paddingVertical: 3,
        paddingHorizontal: 11,
        alignSelf: "flex-start",
    },
    postLastInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    postPrice: {
        fontSize: 18,
        color: theme.textDark,
        fontWeight: "700",
        paddingTop: 6,
    },
    postHeart: {
        width: 20,
        height: 18,
    },
});
