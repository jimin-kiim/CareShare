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
    Image,
    ScrollView,
    Platform
} from "react-native";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const auth = getAuth();
export default function PostForm({ route, navigation }) {
    const date = new Date().getTime();
    const user = auth.currentUser;
    const firestore = getFirestore();
    const [isFilledIn, setIsFilledIn] = useState({
        title: true,
        content: true,
        deposit: true,
        pref_loan: true,
        price: true,
        image: true
    });
    const [content, setContent] = useState({
        title: "",
        content: "",
        address: "",
        type: "",
        deposit: "0",
        pref_loan: "0",
        price: "0",
        writerID: "",
        image: "",
        createdAt: ""
    });
    const [confirmed, setConfirmed] = useState(true);

    useEffect(() => {
        if (route.params.key) {
            loadPost(route.params.key);
        } else {
            setContent({
                ...content,
                type: route.params.text,
                writerID: user.uid,
                createdAt: date
            });
        }
        return () => {
            console.log("unmount form");
        };
    }, []);

    // useEffect(() => {
    //     if (Object.keys(isFilledIn).every((v) => v)) {
    //         savePost();
    //     } else {
    //         setConfirmed(false);
    //     }
    // }, [isFilledIn]);

    const loadPost = async (id) => {
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
                deposit: post.deposit,
                pref_loan: post.pref_loan,
                writerID: post.writerID,
                image: post.image,
                createdAt: post.createdAt
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        const uploadUri =
            Platform.OS === "ios"
                ? "data:image/jpeg;base64," + result.base64
                : result.uri;
        setContent({
            ...content,
            image: uploadUri
        });
    };

    const checkBlanks = () => {
        result = {};
        if (content.title == "") {
            result.title = false;
        }
        if (content.content == "") {
            result.content = false;
        }
        if (content.deposit == "0") {
            result.deposit = false;
        }
        if (content.pref_loan == "0") {
            result.pref_loan = false;
        }
        if (content.price == "0") {
            result.price = false;
        }
        if (content.image == "") {
            result.image = false;
        }
        savePost();
        return result;
    };

    const test = () => {
        result = checkBlanks();
        setIsFilledIn({ ...isFilledIn, ...result });
    };

    const savePost = async () => {
        try {
            if (route.params.key) {
                const id = route.params.key;
                updateDoc(doc(firestore, "posts", id), {
                    ...content,
                    price: parseInt(content.price),
                    deposit: parseInt(content.deposit),
                    pref_loan: parseInt(content.pref_loan)
                }).then(() => {
                    navigation.navigate("PostDetail", { key: id });
                    DeviceEventEmitter.emit("toDetail");
                });
            } else {
                addDoc(collection(firestore, "posts"), {
                    ...content,
                    price: parseInt(content.price),
                    deposit: parseInt(content.deposit),
                    pref_loan: parseInt(content.pref_loan)
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
                <Text style={styles.pageTitle}>
                    {route.params.key ? "글 수정하기" : "새 글 쓰기"}
                </Text>
            </View>
            <ScrollView>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>제목</Text>
                    <TextInput
                        style={styles.textInput}
                        onBlur={() =>
                            setContent({ ...content, title: content.title })
                        }
                        onChangeText={(payload) => {
                            setContent({ ...content, title: payload });
                        }}
                        value={content.title}
                    ></TextInput>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>내용</Text>
                    <TextInput
                        style={styles.textFieldInput}
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
                    <Text style={styles.itemTitle}>주소</Text>
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
                    <Text style={styles.itemTitle}>타입</Text>
                </View>
                <Picker
                    selectedValue={content.type}
                    onValueChange={(payload) =>
                        setContent({ ...content, type: payload })
                    }
                >
                    <Picker.Item label="빌려드려요" value="빌려드려요" />
                    <Picker.Item label="빌려요" value="빌려요" />
                    <Picker.Item label="나눔해요" value="나눔해요" />
                    <Picker.Item label="판매해요" value="판매해요" />
                </Picker>

                {content.type == "빌려요" || content.type == "빌려드려요" ? (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>희망 대여금</Text>
                        <TextInput
                            style={styles.textInput}
                            onBlur={() =>
                                setContent({
                                    ...content,
                                    pref_loan: content.pref_loan
                                })
                            }
                            onChangeText={(payload) =>
                                setContent({ ...content, pref_loan: payload })
                            }
                            value={`${content.pref_loan}`}
                        ></TextInput>
                        <Text>원</Text>
                    </View>
                ) : null}

                {content.type == "판매해요" ? (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>가격</Text>
                        <TextInput
                            style={styles.textInput}
                            onBlur={() =>
                                setContent({ ...content, price: content.price })
                            }
                            onChangeText={(payload) =>
                                setContent({ ...content, price: payload })
                            }
                            value={`${content.price}`}
                        ></TextInput>
                        <Text>원</Text>
                    </View>
                ) : null}
                {content.type == "빌려드려요" || content.type == "판매해요" ? (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>보증금</Text>
                        <TextInput
                            style={styles.textInput}
                            onBlur={() =>
                                setContent({
                                    ...content,
                                    deposit: content.deposit
                                })
                            }
                            onChangeText={(payload) =>
                                setContent({ ...content, deposit: payload })
                            }
                            value={`${content.deposit}`}
                        ></TextInput>
                        <Text>원</Text>
                    </View>
                ) : null}

                <View style={styles.photoSelector}>
                    <TouchableOpacity onPress={selectImage}>
                        <Text style={styles.photoSelectorTitle}>
                            {route.params.key
                                ? "사진 변경하기"
                                : "사진 업로드하기"}
                        </Text>
                    </TouchableOpacity>
                    <View>
                        {content.image ? (
                            <Image
                                source={{ uri: content.image }}
                                style={{
                                    width: 120,
                                    height: 120
                                }}
                            />
                        ) : null}
                    </View>
                </View>
                <Button
                    title="저장"
                    style={styles.button}
                    onPress={checkBlanks}
                    // onPress={test}
                ></Button>
                {confirmed ? null : <Text>입력 내용을 다시 확인해주세요</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 25,
        color: theme.textDark,
        fontWeight: "700"
    },
    formContainer: {
        marginTop: 30
    },
    itemContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
        // justifyContent: "center"
        alignItems: "center"
    },
    itemTitle: {
        fontWeight: "600"
    },
    textInput: {
        borderColor: theme.textDark,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 25,
        flex: 1,
        paddingLeft: 10
    },
    textFieldInput: {
        borderColor: theme.textDark,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 100,
        flex: 1,
        paddingLeft: 10
    },
    photoSelectorTitle: {
        // paddingTop: 20,
        fontWeight: "500",
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 18,
        borderColor: theme.yellow
    },
    photoSelector: {
        // flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
        // justifyContent: "center"
        alignItems: "center"
    },
    button: {
        marginTop: 10,
        marginHorizontal: 30,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: theme.iconDarkGray
    }
});
