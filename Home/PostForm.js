import { useEffect, useState } from "react";
import Firebase from "../config/firebase";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
    TextInput,
} from "react-native";
export default function PostForm({ navigation }) {
    const [text, setText] = useState("");
    const [content, setContent] = useState({
        id: Date.now(),
        title: "",
        content: "",
        address: "",
        type: "",
        price: "",
    });

    const addDoc = Firebase.firestore().collection("users").doc("posts");

    const savePost = async () => {
        try {
            await addDoc.add({
                ...content,
            });
            console.log("Create Complete!");
        } catch (error) {
            console.log(error.message);
        }
    };
    const onChangeText = (payload) => setText(payload);
    return (
        <View>
            <TextInput
                onSubmitEditing={() => setContent({ ...content, title: text })}
                onChangeText={onChangeText}
                value={text}
            ></TextInput>
            <TextInput
                onSubmitEditing={() =>
                    setContent({ ...content, content: text })
                }
                onChangeText={onChangeText}
                value={text}
                multiline={true}
            ></TextInput>
            <TextInput
                onSubmitEditing={() =>
                    setContent({ ...content, address: text })
                }
                onChangeText={onChangeText}
                value={text}
            ></TextInput>
            <TextInput
                onSubmitEditing={() => setContent({ ...content, type: text })}
                onChangeText={onChangeText}
                value={text}
            ></TextInput>
            <TextInput
                onSubmitEditing={() => setContent({ ...content, price: text })}
                onChangeText={onChangeText}
                value={text}
            ></TextInput>
            <Button onPress={() => savePost}></Button>
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
