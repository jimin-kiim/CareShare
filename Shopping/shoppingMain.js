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

const shoppingMain = ({ navigation }) => {
    React.useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const getHtml = async () => {
            try {
                return await axios.get(
                    "https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=%EC%A7%80%ED%8C%A1%EC%9D%B4&pagingIndex=2&pagingSize=40&productSet=total&query=%EC%A7%80%ED%8C%A1%EC%9D%B4&sort=rel&timestamp=&viewType=list"
                );
            } catch (error) {
                console.error(error);
            }
        };

        getHtml()
            .then((html) => {
                let ulList = [];
                const $ = cheerio.load(html.data);
                const $bodyList = $("li.basicList_item__0T9JD");

                $bodyList.each(function (i, elem) {
                    ulList[i] = {
                        title: $(this)
                            .find("div.basicList_title__VfX3c a")
                            .text(),
                        url: $(this)
                            .find("div.basicList_title__VfX3c a")
                            .attr("href"),
                        image_url: $(this)
                            .find(
                                "div.thumbnail_thumb_wrap__RbcYO _wrapper a img"
                            )
                            .attr("src"),
                        price: $(this).find("span.price_num__S2p_v").text(),
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

export default shoppingMain;
