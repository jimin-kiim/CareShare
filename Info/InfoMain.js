import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    DeviceEventEmitter,
    Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import NavigationBar from "../navigationBar";
import { theme } from "../colors";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import {
    getDocs,
    collection,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Input } from "react-native-elements";
import axios from "axios";
import cheerio from "react-native-cheerio";

const InfoMain = ({ navigation }) => {
    React.useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const getHtml = async () => {
            try {
                return await axios.get(
                    "https://knat.go.kr/knw/home/board/brd_lst.php?tb_no=8"
                );
            } catch (error) {
                console.error(error);
            }
        };

        getHtml()
            .then((html) => {
                let ulList = [];
                const $ = cheerio.load(html.data);
                const $bodyList = $("td.subject");

                $bodyList.each(function (i, elem) {
                    ulList[i] = {
                        title: $(this).find("a").text(),
                        url: $(this).find("a").attr("href"),
                        date: $(this).find("td.date").attr("src"),
                    };
                });

                const data = ulList.filter((n) => n.title);
                return data;
            })
            .then((res) => console.log(res));
    };

    return (
        <View style={styles.container}>
            <NavigationBar
                home={false}
                info={false}
                shopping={true}
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

    buttons: {
        flex: 1,
    },

    button: {
        marginTop: 10,
    },
});

export default InfoMain;
