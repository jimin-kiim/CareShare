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
    );
}
