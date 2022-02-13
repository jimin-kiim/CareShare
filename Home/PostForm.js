import { useEffect, useState } from "react";
import Movie from "../components/Movie";
export default function PostForm() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);
    return (
        <View style={styles.post} key={id}>
            <Image
                source={require("../../assets/test.jpeg")}
                style={styles.postImg}
            />
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{title}</Text>
                <View style={styles.postInfo}>
                    <Text style={styles.postInfoText}>{address}</Text>
                    <Text style={styles.postInfoText}> · 2일전</Text>
                </View>
                <Text style={styles.postType}>{type}</Text>
                <View style={styles.postLastInfo}>
                    <Text style={styles.postPrice}>{price}원</Text>
                    <Image
                        source={require("../../assets/ios-heart-empty.svg")}
                        style={styles.postHeart}
                    />
                </View>
            </View>
        </View>
    );
}
