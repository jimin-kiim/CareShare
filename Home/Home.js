import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    AsyncStorage,
    Platform,
    Image,
} from "react-native";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";
import Firebase from "../config/firebase";
export default function Home() {
    const postsRef = Firebase.firestore().collection("users").doc("posts");
    const [posts, setPosts] = useState({});

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await postsRef.get();
            // setPosts(data.map((post) => ({ ...post.data(), id: post.id })));
            // console.log(posts);

            const postsFetched = [];
            data.docs.forEach((doc) => {
                const data = post.data();
                postsFetched.push(data);
            });
            setPosts(postsFetched);
        } catch (error) {
            console.log(error.message);
        }
    };

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
            <ScrollView>
                <View style={styles.post}>
                    <Image />
                    <View style={styles.postContent}>
                        <Text style={styles.postTitle}>
                            환자 걷기 보조 재활기구
                        </Text>
                        <View>
                            <Text style={styles.postInfo}>노원구 공릉2동</Text>
                            <Text style={styles.postInfo}>· 2일전</Text>
                        </View>
                        <Text style={styles.postType}>빌려드려요</Text>
                        <View>
                            <Text style={styles.postPrice}>20,000원</Text>
                            <Image />
                        </View>
                    </View>
                </View>
                {/* {posts
                    ? posts.map((post, index) => {
                          <View style={styles.post} key={index}>
                              <Image />
                              <View style={styles.postContent}>
                                  <Text style={styles.postTitle}>
                                      {post.title}
                                  </Text>
                                  <View>
                                      <Text style={styles.postInfo}>
                                          {post.address}
                                      </Text>
                                      <Text style={styles.postInfo}>
                                          {post.date}
                                      </Text>
                                  </View>
                                  <Text style={styles.postType}>
                                      {post.type}
                                  </Text>
                                  <View>
                                      <Text style={styles.postPrice}>
                                          {post.price}
                                      </Text>
                                      <Image />
                                  </View>
                              </View>
                          </View>;
                      })
                    : null} */}
            </ScrollView>
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

    postTitle: {
        fontSize: 18,
        color: theme.textDark,
    },
    postInfo: {
        fontSize: 15,
        color: theme.iconGray,
    },
    postType: {
        fontSize: 15,
        color: theme.textDark,
        borderRadius: 10,
        backgroundColor: "#EEEEEE",
        padding: 5,
    },
    postPrice: {
        fontSize: 18,
        color: theme.textDark,
        fontWeight: "700",
    },
});
