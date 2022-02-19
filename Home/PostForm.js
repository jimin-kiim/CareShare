import { useEffect, useState } from "react";
import { theme } from "../colors";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    DeviceEventEmitter,
    Alert,
    Image,
    Platform,
} from "react-native";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import * as ImagePicker from "react-native-image-picker";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
const auth = getAuth();
// console.log(ImagePicker.launchCamera, ImagePicker.launchImageLibrary, "!");
export default function PostForm({ route, navigation }) {
    const user = auth.currentUser;
    const firestore = getFirestore();
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [content, setContent] = useState({
        title: "",
        content: "",
        address: "",
        type: "",
        price: "",
        writerID: "",
        image: "",
    });

    useEffect(() => {
        if (route.params.key) {
            loadPost(route.params.key);
        } else {
            setContent({
                ...content,
                type: route.params.text,
                writerID: user.uid,
            });
            console.log(content);
        }
        return () => {
            console.log("unmount form");
        };
    }, []);

    const loadPost = async (id) => {
        try {
            const docRef = doc(firestore, "posts", id);
            const postRef = await getDoc(docRef);
            const post = postRef.data();
            console.log(post);
            setContent({
                title: post.title,
                content: post.content,
                address: post.address,
                type: post.type,
                price: post.price,
                writerID: post.writerID,
            });
            console.log(content);
        } catch (error) {
            console.log(error.message);
        }
    };

    const savePost = async () => {
        try {
            if (route.params.key) {
                const id = route.params.key;
                updateDoc(doc(firestore, "posts", id), {
                    ...content,
                }).then(() => {
                    navigation.navigate("PostDetail", { key: id });
                    DeviceEventEmitter.emit("toDetail");
                    console.log("edit complete");
                });
            } else {
                addDoc(collection(firestore, "posts"), {
                    ...content,
                }).then((docRef) => {
                    navigation.navigate("PostDetail", { key: docRef.id });
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    // const selectImage = () => {
    // const options = {
    //     maxWidth: 2000,
    //     maxHeight: 2000,
    //     storageOptions: {
    //         skipBackup: true,
    //         path: "images",
    //     },
    // };
    // console.log("?");
    // ImagePicker.launchImageLibrary({}, () => {
    //     console.log("!");
    // if (response.didCancel) {
    //     console.log("User cancelled image picker");
    // } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    // } else {
    // const source = { uri: response.uri };
    // console.log(source);
    // setImage(source);
    // }
    // });
    // };
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.uri);
        setContent({
            ...content,
            image: result.uri,
        });

        // if (!result.cancelled) {

        // }
    };
    const uploadImage = async () => {
        console.log(content);
        const uri = content.image;
        console.log(uri);
        const filename = uri.substring(uri.lastIndexOf("/") + 1);
        const uploadUri =
            Platform.OS === "ios" ? uri.replace("file://", "") : uri;
        setContent({
            ...content,
            image: uploadUri,
        });
        // Alert.alert(
        //     "Photo uploaded!",
        //     "Your photo has been uploaded to Firebase Cloud Storage!"
        // );
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
                    value={content.content}
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

            <TouchableOpacity onPress={selectImage}>
                <Text>Pick an image</Text>
            </TouchableOpacity>
            <View>
                {content.image !== null ? (
                    <Image source={{ uri: content.image }} />
                ) : null}
                {uploading ? (
                    <View>
                        <Progress.Bar progress={transferred} width={300} />
                    </View>
                ) : (
                    <TouchableOpacity onPress={uploadImage}>
                        <Text>Upload image</Text>
                    </TouchableOpacity>
                )}
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
