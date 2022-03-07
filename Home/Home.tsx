import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    DeviceEventEmitter,
} from "react-native";
import { Button } from "react-native-elements";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import NavigationBar from "../navigationBar";
import { Ionicons } from "@expo/vector-icons";
import Post from "./components/Post";
import Arrow from "../assets/ios-arrow-down.svg";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const NewPost = ({ text, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("PostForm", { text })}
        >
            <Text style={styles.newPostText}>{text}</Text>
        </TouchableOpacity>
    );
};

const Home = ({ navigation }) => {
    const firestore = getFirestore();
    const [posts, setPosts] = useState([]);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        loadPosts();
        DeviceEventEmitter.addListener("toHome", () => {
            loadPosts();
        });
        return () => {
            DeviceEventEmitter.emit("toDetail");
        };
    }, []);

    const buttonPressed = () => {
        setClicked((current) => !current);
    };

    const loadPosts = async () => {
        try {
            const postDoc = await getDocs(collection(firestore, "posts"));
            const postsFetched = [];
            postDoc.forEach((doc) => {
                const data = doc.data();
                postsFetched.push({ ...data, key: doc.id });
            });
            setPosts(postsFetched);
            // console.log(postsFetched);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerFilter}>
                    <Arrow style={styles.headerFilterIcon} />
                    <Text style={styles.headerFilterText}>전체</Text>
                </TouchableOpacity>
                <Button title="Sign Out" onPress={() => auth.signOut()} />
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
                {posts
                    ? posts.map((post) => (
                          <Post
                              key={post.key}
                              id={post.key}
                              title={post.title}
                              address={post.address}
                              type={post.type}
                              price={post.price}
                              image={post.image}
                              navigation={navigation}
                              date={post.createdAt}
                          />
                      ))
                    : null}
            </ScrollView>
            <View style={styles.newPostContainer}>
                {clicked ? (
                    <View style={styles.newPostTexts}>
                        <NewPost text="빌려드려요" navigation={navigation} />
                        <NewPost text="빌려요" navigation={navigation} />
                        <NewPost text="나눔해요" navigation={navigation} />
                        <NewPost text="판매해요" navigation={navigation} />
                    </View>
                ) : null}
                <TouchableOpacity
                    style={styles.newPostButton}
                    onPress={() => {
                        buttonPressed();
                    }}
                >
                    <Ionicons
                        name="ios-add-circle"
                        size={50}
                        color={theme.yellow}
                    />
                </TouchableOpacity>
            </View>
            <NavigationBar
                home={true}
                info={false}
                shopping={false}
                chatting={false}
                myPage={false}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        marginTop: 30,
        // zIndex: 10,
        // position: "absolute",
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
    newPostContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    newPostTexts: {
        zIndex: 1,
        backgroundColor: "gray",
        paddingHorizontal: 17,
        paddingTop: 8,
        paddingBottom: 13,
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 10,
    },
    newPostText: {
        fontWeight: "600",
        paddingTop: 6,
        fontSize: 18,
        color: theme.textDark,
    },
    newPostButton: {
        zIndex: 1,
        marginRight: 12,
        marginBottom: 10,
    },
});

export default Home;
