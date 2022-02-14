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
    getDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

export default function PostForm({ route, navigation }) {
    const firestore = getFirestore();
    const [content, setContent] = useState({
        title: "",
        content: "",
        address: "",
        type: "",
        price: "",
    });

    const firebase = getFirestore();
    if (route.params) {
        const id = route.params.key;
        useEffect(() => {
            loadPost();
        }, []);
        const loadPost = async () => {
            try {
                const docRef = doc(firestore, "posts", id);
                const postRef = await getDoc(docRef);
                const post = postRef.data();
                setContent({
                    title: post.title,
                    content: post.content,
                    address: post.address,
                    type: post.type,
                    price: post.price,
                });
            } catch (error) {
                console.log(error.message);
            }
        };
    }

    const savePost = async () => {
        try {
            if (route.params) {
                const id = route.params.key;
                updateDoc(doc(firestore, "posts", id), {
                    ...content,
                }).then(() => {
                    navigation.navigate("PostDetail", { key: id });
                });
            } else {
                addDoc(collection(firebase, "posts"), {
                    ...content,
                }).then((docRef) => {
                    navigation.navigate("PostDetail", { key: docRef.id });
                });
            }
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
                    onBlur={() =>
                        setContent({ ...content, title: content.title })
                    }
                    onChangeText={(payload) =>
                        setContent({ ...content, title: payload })
                    }
                    value={content.title}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>내용 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() =>
                        setContent({ ...content, content: content.content })
                    }
                    onChangeText={(payload) =>
                        setContent({ ...content, content: payload })
                    }
                    value={content.desc}
                    multiline={true}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>주소 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() =>
                        setContent({ ...content, address: content.address })
                    }
                    onChangeText={(payload) =>
                        setContent({ ...content, address: payload })
                    }
                    value={content.address}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>타입 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() =>
                        setContent({ ...content, type: content.type })
                    }
                    onChangeText={(payload) =>
                        setContent({ ...content, type: payload })
                    }
                    value={content.type}
                ></TextInput>
            </View>
            <View style={styles.itemContainer}>
                <Text>가격 : </Text>
                <TextInput
                    style={styles.textInput}
                    onBlur={() =>
                        setContent({ ...content, price: content.price })
                    }
                    onChangeText={(payload) =>
                        setContent({ ...content, price: payload })
                    }
                    value={content.price}
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
