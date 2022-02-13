import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Firebase from "../config/firebase";
import Post from "./components/Post";

const Home = ({ navigation }) => {
  const postsRef = Firebase.firestore().collection("users").doc("posts");
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    loadPosts();
  }, []);
  const buttonPressed = () => {
    setClicked((current) => !current);
    console.log("clicked", clicked);
  };
  const loadPosts = async () => {
    try {
      const data = await postsRef.get();
      const postsFetched = [];
      data.docs.forEach((doc) => {
        const data = doc.data();
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
            <Ionicons name="ios-search" size={24} color={theme.iconGray} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Post
          id="1"
          title="환자 걷기 보조 재활기구"
          address="노원구 공릉2동"
          type="나눔해요"
          price="10,000"
          navigation={navigation}
        ></Post>
        <Post
          id="1"
          title="환자 걷기 보조 재활기구"
          address="노원구 공릉2동"
          type="나눔해요"
          price="10,000"
          navigation={navigation}
        ></Post>
        <Post
          id="1"
          title="환자 걷기 보조 재활기구"
          address="노원구 공릉2동"
          type="빌려요"
          price="30,000"
          navigation={navigation}
        ></Post>
        <Post
          id="1"
          title="환자 걷기 보조 재활기구"
          address="노원구 공릉2동"
          type="판매해요"
          price="20,000"
          navigation={navigation}
        ></Post>
        <Post
          id="1"
          title="환자 걷기 보조 재활기구"
          address="노원구 공릉2동"
          type="판매해요"
          price="20,000"
          navigation={navigation}
        ></Post>

        {posts
          ? posts.map((post) => {
              <Post
                id={post.id}
                title={post.title}
                address={post.address}
                type={post.type}
                price={post.price}
                navigation={navigation}
              ></Post>;
            })
          : null}
      </ScrollView>

      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {clicked ? (
          <View style={styles.newPostTexts}>
            <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
              <Text style={styles.newPostText}>빌려드려요</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.newPostText}>빌려요</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.newPostText}>나눔해요</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.newPostText}>판매해요</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => {
            buttonPressed();
          }}
        >
          <Ionicons name="ios-add-circle" size={50} color={theme.yellow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderBottomColor: "#F5F5F5",
    borderBottomWidth: 1,
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

  newPostTexts: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "gray",
    paddingHorizontal: 17,
    paddingTop: 8,
    paddingBottom: 13,
    borderRadius: 10,
    marginBottom: 120,
    marginRight: 15,
  },
  newPostText: {
    fontWeight: "600",
    paddingTop: 6,
    fontSize: 18,
    color: theme.textDark,
  },
  newPostButton: {
    position: "absolute",
    zIndex: 1,
    marginRight: 12,
    marginBottom: 60,
  },
});

export default Home;
