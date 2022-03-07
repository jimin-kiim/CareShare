import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function ChatRoom({ name, owner, joiner }) {
    return (
        <View>
            <View style={styles.chatRoom}>
                <Text>{name}</Text>
                <Text>{owner}</Text>
                <Text>{joiner}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    chatRoom: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingTop: 25,
        backgroundColor: "tomato",
    },
});
