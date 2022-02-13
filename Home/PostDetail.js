import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "../colors";
import { StackScreenProps } from "@react-navigation/stack";

import React, { useEffect, useState } from "react";

export default function PostDetail({
    id,
    title,
    content,
    address,
    type,
    price,
}) {
    return (
        <View style={styles.post} key={id}>
            <Image
                source={require("../assets/test.jpeg")}
                style={styles.postImg}
            />
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{title}</Text>
                <View style={styles.postInfo}>
                    <Text style={styles.postInfoText}>{address}</Text>
                    <Text style={styles.postInfoText}> · 2일전</Text>
                </View>
                <Text style={styles.postType}>{type}</Text>
                <View style={styles.postLastInfo}>
                    <Text style={styles.postPrice}>{price}원</Text>
                    <Image
                        source={require("../assets/ios-heart-empty.svg")}
                        style={styles.postHeart}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingTop: 25,
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
