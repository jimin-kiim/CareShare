import { useEffect, useState } from "react";
import Firebase from "../config/firebase";
import { theme } from "../colors";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
export default function PostForm({ navigation }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState({
        id: Date.now(),
        title: "",
        content: "",
        address: "",
        type: "",
        price: "",
    });
    const firebase = getFirestore();

    const savePost = async () => {
        try {
            addDoc(collection(firebase, "posts"), {
                ...content,
            });
            console.log("Create Complete!");
            navigation.navigate("PostDetail", { id: id });
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <View style={styles.formContainer}>
            <View style={styles.itemContainer}>
                <Text>제목 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() => setContent({ ...content, title: title })}
                    onChangeText={(payload) => setTitle(payload)}
                    value={title}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>내용 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() => setContent({ ...content, content: desc })}
                    onChangeText={(payload) => setDesc(payload)}
                    value={desc}
                    multiline={true}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>주소 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() => setContent({ ...content, address: address })}
                    onChangeText={(payload) => setAddress(payload)}
                    value={address}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>타입 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() => setContent({ ...content, type: type })}
                    onChangeText={(payload) => setType(payload)}
                    value={type}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>가격 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() => setContent({ ...content, price: price })}
                    onChangeText={(payload) => setPrice(payload)}
                    value={price}
                ></TextInput>
            </View>
            <Button
                title="저장"
                style={styles.button}
                onPress={() => savePost()}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 30,
    },
    itemContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textInput: {
        borderColor: theme.textDark,
        borderRadius: 15,
        borderWidth: 1,
    },
    button: {
        marginHorizontal: 30,
        borderRadius: 15,
    },
});
