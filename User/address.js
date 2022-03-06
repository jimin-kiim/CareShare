import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export function City() {
    return (
        <View>
            <Picker.Item label="서울특별시" value="Seoul" />
            <Picker.Item label="인천광역시" value="Incheon" />
            <Picker.Item label="대전광역시" value="Daejeon" />
            <Picker.Item label="광주광역시" value="Gwangju" />
            <Picker.Item label="대구광역시" value="Daegu" />
            <Picker.Item label="울산광역시" value="Ulsan" />
            <Picker.Item label="부산광역시" value="Busan" />
            <Picker.Item label="경기도" value="Gyeonggi" />
            <Picker.Item label="강원도" value="Gangwon" />
            <Picker.Item label="충청북도" value="Chungbuk" />
            <Picker.Item label="충청남도" value="Chungnam" />
            <Picker.Item label="전라북도" value="Jeonbuk" />
            <Picker.Item label="전라남도" value="Jeonnam" />
            <Picker.Item label="경상북도" value="Gyeongbuk" />
            <Picker.Item label="경상남도" value="Gyeongnam" />
            <Picker.Item label="제주도" value="Jeju" />
        </View>
    );
}

export function Town({ city }) {
    if (city === "Seoul") {
        return (
            <View>
                <Picker.Item label="강남구" value="Gangnam" />
                <Picker.Item label="강동구" value="Gangdong" />
                <Picker.Item label="강북구" value="Gangbuk" />
                <Picker.Item label="강서구" value="S-Gangseo" />
                <Picker.Item label="관악구" value="Gwanak" />
                <Picker.Item label="광진구" value="Gwangjin" />
                <Picker.Item label="구로구" value="Guro" />
                <Picker.Item label="금천구" value="Geumcheon" />
                <Picker.Item label="노원구" value="Nowon" />
                <Picker.Item label="도봉구" value="Dobong" />
                <Picker.Item label="동대문구" value="Dongdaemun" />
                <Picker.Item label="동작구" value="Dongjak" />
                <Picker.Item label="마포구" value="Mapo" />
                <Picker.Item label="서대문구" value="Seodaemun" />
                <Picker.Item label="서초구" value="Seocho" />
                <Picker.Item label="성동구" value="Seongdong" />
                <Picker.Item label="성북구" value="Seongbuk" />
                <Picker.Item label="송파구" value="Songpa" />
                <Picker.Item label="양천구" value="Yangcheon" />
                <Picker.Item label="영등포구" value="Yeongdeungpo" />
                <Picker.Item label="용산구" value="Yongsan" />
                <Picker.Item label="은평구" value="Eunpyeong" />
                <Picker.Item label="종로구" value="Jongno" />
                <Picker.Item label="중구" value="S-Jung-gu" />
                <Picker.Item label="중랑구" value="Jungnang" />
            </View>
        );
    } else if (city === "Incheon") {
        return (
            <View>
                <Picker.Item label="계양구" value="Gyeyang" />
                <Picker.Item label="남구" value="I-Namgu" />
                <Picker.Item label="남동구" value="Namdong-gu" />
                <Picker.Item label="동구" value="I-Dong-gu" />
                <Picker.Item label="부평구" value="Bupyeong" />
                <Picker.Item label="서구" value="I-Seo-gu" />
                <Picker.Item label="연수구" value="Yeonsu" />
                <Picker.Item label="중구" value="I-Jung-gu" />
                <Picker.Item label="강화군" value="Ganghwa" />
                <Picker.Item label="옹진군" value="Ongjin" />
            </View>
        );
    } else if (city === "Daejeon") {
        return (
            <View>
                <Picker.Item label="대덕구" value="Daedeok" />
                <Picker.Item label="동구" value="Dj-Dong-gu" />
                <Picker.Item label="서구" value="Dj-Seo-gu" />
                <Picker.Item label="유성구" value="Yuseong" />
                <Picker.Item label="중구" value="Dj-Jung-gu" />
            </View>
        );
    } else if (city === "Gwangju") {
        return (
            <View>
                <Picker.Item label="광산구" value="Gwangsan" />
                <Picker.Item label="남구" value="G-Namgu" />
                <Picker.Item label="동구" value="G-Dong-gu" />
                <Picker.Item label="북구" value="G-Buk-gu" />
                <Picker.Item label="서구" value="G-Seo-gu" />
            </View>
        );
    } else if (city === "Daegu") {
        return (
            <View>
                <Picker.Item label="남구" value="D-Namgu" />
                <Picker.Item label="달서구" value="Dalseo" />
                <Picker.Item label="동구" value="Dg-Dong-gu" />
                <Picker.Item label="북구" value="D-Buk-gu" />
                <Picker.Item label="서구" value="Dg-Seo-gu" />
                <Picker.Item label="수성구" value="Suseong" />
                <Picker.Item label="중구" value="Dg-Jung-gu" />
                <Picker.Item label="달성군" value="Dalseong" />
            </View>
        );
    } else if (city === "Ulsan") {
        return (
            <View>
                <Picker.Item label="남구" value="D-Namgu" />
                <Picker.Item label="동구" value="D-Namgu" />
                <Picker.Item label="북구" value="D-Namgu" />
                <Picker.Item label="중구" value="D-Namgu" />
                <Picker.Item label="울주군" value="D-Namgu" />
            </View>
        );
    } else if (city === "Busan") {
        return (
            <View>
                <Picker.Item label="강서구" value="B-Gangseo" />
                <Picker.Item label="금정구" value="Geumjeong" />
                <Picker.Item label="남구" value="B-Namgu" />
                <Picker.Item label="동구" value="B-Dong-gu" />
                <Picker.Item label="동래구" value="Dongnae" />
                <Picker.Item label="부산진구" value="Busanjin" />
                <Picker.Item label="북구" value="B-Buk-gu" />
                <Picker.Item label="사하구" value="Saha" />
                <Picker.Item label="서구" value="B-Seo-gu" />
                <Picker.Item label="수영구" value="Suyeong" />
                <Picker.Item label="연제구" value="Yeonje" />
                <Picker.Item label="영도구" value="Yeongdo" />
                <Picker.Item label="중구" value="B-Jung-gu" />
                <Picker.Item label="해운대구" value="Haeundae" />
                <Picker.Item label="기장군" value="Gijang" />
            </View>
        );
    } else if (city === "Gyeonggi") {
        return (
            <View>
                <Picker.Item label="고양시" value="Goyang" />
                <Picker.Item label="과천시" value="Gwacheon" />
                <Picker.Item label="광명시" value="Gwangmyeong" />
                <Picker.Item label="광주시" value="G-Gwangju" />
                <Picker.Item label="구리시" value="Guri" />
                <Picker.Item label="군포시" value="Gunpo" />
                <Picker.Item label="김포시" value="Gimpo" />
                <Picker.Item label="남양주시" value="Namyangju" />
                <Picker.Item label="동두천시" value="Dongducheon" />
                <Picker.Item label="부천시" value="Bucheon" />
                <Picker.Item label="성남시" value="Seongnam" />
                <Picker.Item label="수원시" value="Suwon" />
                <Picker.Item label="시흥시" value="Siheung" />
                <Picker.Item label="안산시" value="Ansan" />
                <Picker.Item label="안성시" value="Anseong" />
                <Picker.Item label="안양시" value="Anyang" />
                <Picker.Item label="양주시" value="Yangju" />
                <Picker.Item label="오산시" value="Osan" />
                <Picker.Item label="용인시" value="Yongin" />
                <Picker.Item label="의왕시" value="Uiwang" />
                <Picker.Item label="의정부시" value="Uijeongbu" />
                <Picker.Item label="이천시" value="Icheon" />
                <Picker.Item label="파주시" value="Paju" />
                <Picker.Item label="평택시" value="Pyeongtaek" />
                <Picker.Item label="포천시" value="Pocheon" />
                <Picker.Item label="하남시" value="Hanam" />
                <Picker.Item label="화성시" value="Hwaseong" />
                <Picker.Item label="가평군" value="Gapyeong" />
                <Picker.Item label="양평군" value="Yangpyeong" />
                <Picker.Item label="여주군" value="Yeoju" />
                <Picker.Item label="연천군" value="Yeoncheon" />
            </View>
        );
    } else if (city === "Gangwon") {
        return (
            <View>
                <Picker.Item label="강릉시" value="Gangneung" />
                <Picker.Item label="동해시" value="Donghae" />
                <Picker.Item label="삼척시" value="Samcheok" />
                <Picker.Item label="속초시" value="Sokcho" />
                <Picker.Item label="원주시" value="Wonju" />
                <Picker.Item label="춘천시" value="Chuncheon" />
                <Picker.Item label="태백시" value="Taebaek" />
                <Picker.Item label="고성군" value="Goseong" />
                <Picker.Item label="양구군" value="Yanggu" />
                <Picker.Item label="양양군" value="Yangyang" />
                <Picker.Item label="영월군" value="Yeongwol" />
                <Picker.Item label="인제군" value="Inje" />
                <Picker.Item label="정선군" value="Jeongseon" />
                <Picker.Item label="철원군" value="Cheorwon" />
                <Picker.Item label="평창군" value="Pyeongchang" />
                <Picker.Item label="홍천군" value="Hongcheon" />
                <Picker.Item label="화천군" value="Hwacheon" />
                <Picker.Item label="횡성군" value="Hoengseong" />
            </View>
        );
    } else if (city === "Chungbuk") {
        return (
            <View>
                <Picker.Item label="제천시" value="Jecheon" />
                <Picker.Item label="청주시" value="Cheongju" />
                <Picker.Item label="충주시" value="Chungju" />
                <Picker.Item label="괴산군" value="Goesan" />
                <Picker.Item label="단양군" value="Danyang" />
                <Picker.Item label="보은군" value="Boeun" />
                <Picker.Item label="영동군" value="Yeongdong" />
                <Picker.Item label="옥천군" value="Okcheon" />
                <Picker.Item label="음성군" value="Eumseong" />
                <Picker.Item label="증평군" value="Jeungpyeong" />
                <Picker.Item label="진천군" value="Jincheon" />
                <Picker.Item label="청원군" value="Cheongwon" />
            </View>
        );
    } else if (city === "Chungnam") {
        return (
            <View>
                <Picker.Item label="계룡시" value="Gyeryong" />
                <Picker.Item label="공주시" value="Gongju" />
                <Picker.Item label="논산시" value="Nonsan" />
                <Picker.Item label="보령시" value="Boryeong" />
                <Picker.Item label="서산시" value="Seosan" />
                <Picker.Item label="아산시" value="Asan" />
                <Picker.Item label="천안시" value="Cheonan" />
                <Picker.Item label="금산군" value="Geumsan" />
                <Picker.Item label="당진군" value="Dangjin" />
                <Picker.Item label="부여군" value="Buyeo" />
                <Picker.Item label="서천군" value="Seocheon" />
                <Picker.Item label="연기군" value="Yeongi" />
                <Picker.Item label="예산군" value="Yesan" />
                <Picker.Item label="청양군" value="Cheongyang" />
                <Picker.Item label="태안군" value="Taean" />
                <Picker.Item label="홍성군" value="Hongseong" />
            </View>
        );
    } else if (city === "Jeonbuk") {
        return (
            <View>
                <Picker.Item label="군산시" value="Gunsan" />
                <Picker.Item label="김제시" value="Gimje" />
                <Picker.Item label="남원시" value="Namwon" />
                <Picker.Item label="익산시" value="Iksan" />
                <Picker.Item label="전주시" value="Jeonju" />
                <Picker.Item label="정읍시" value="Jeongeup" />
                <Picker.Item label="고창군" value="Gochang" />
                <Picker.Item label="무주군" value="Muju" />
                <Picker.Item label="부안군" value="Buan" />
                <Picker.Item label="순창군" value="Sunchang" />
                <Picker.Item label="임실군" value="Imsil" />
                <Picker.Item label="장수군" value="Jangsu" />
                <Picker.Item label="진안군" value="Jinan" />
            </View>
        );
    } else if (city === "Jeonnam") {
        return (
            <View>
                <Picker.Item label="광양시" value="Gwangyang" />
                <Picker.Item label="나주시" value="Naju" />
                <Picker.Item label="목포시" value="Mokpo" />
                <Picker.Item label="순천시" value="Suncheon" />
                <Picker.Item label="여수시" value="Yeosu" />
                <Picker.Item label="강진군" value="Gangjin" />
                <Picker.Item label="고흥군" value="Goheung" />
                <Picker.Item label="곡성군" value="Gokseong" />
                <Picker.Item label="구례군" value="Gurye" />
                <Picker.Item label="담양군" value="Damyang" />
                <Picker.Item label="무안군" value="Muan" />
                <Picker.Item label="보성군" value="Boseong" />
                <Picker.Item label="신안군" value="Shinan" />
                <Picker.Item label="영광군" value="Yeonggwang" />
                <Picker.Item label="영암군" value="Yeongam" />
                <Picker.Item label="완도군" value="Wando" />
                <Picker.Item label="장성군" value="Jangseong" />
                <Picker.Item label="장흥군" value="Jangheung" />
                <Picker.Item label="진도군" value="Jindo" />
                <Picker.Item label="함평군" value="Hampyeong" />
                <Picker.Item label="해남군" value="Haenam" />
                <Picker.Item label="화순군" value="Hwasun" />
            </View>
        );
    } else if (city === "Gyeongbuk") {
        return (
            <View>
                <Picker.Item label="경산시" value="Gyeongsan" />
                <Picker.Item label="경주시" value="Gyeongju" />
                <Picker.Item label="구미시" value="Gumi" />
                <Picker.Item label="김천시" value="Gimcheon" />
                <Picker.Item label="문경시" value="Mungyeong" />
                <Picker.Item label="상주시" value="Sangju" />
                <Picker.Item label="안동시" value="Andong" />
                <Picker.Item label="영주시" value="Yeongju" />
                <Picker.Item label="영천시" value="Yeongcheon" />
                <Picker.Item label="포항시" value="Pohang" />
                <Picker.Item label="고령군" value="Goryeong" />
                <Picker.Item label="군위군" value="Gunwi" />
                <Picker.Item label="봉화군" value="Bonghwa" />
                <Picker.Item label="영덕군" value="Yeongdeok" />
                <Picker.Item label="영양군" value="Yeongyang" />
                <Picker.Item label="예천군" value="Yecheon" />
                <Picker.Item label="울릉군" value="Ulleung" />
                <Picker.Item label="울진군" value="Uljin" />
                <Picker.Item label="의성군" value="Uiseong" />
                <Picker.Item label="청도군" value="Cheongdo" />
                <Picker.Item label="청송군" value="Cheongsong" />
                <Picker.Item label="칠곡군" value="Chilgok" />
            </View>
        );
    } else if (city === "Gyeongnam") {
        return (
            <View>
                <Picker.Item label="거제시" value="Geoje" />
                <Picker.Item label="김해시" value="Gimhae" />
                <Picker.Item label="마산시" value="Masan" />
                <Picker.Item label="밀양시" value="Miryang" />
                <Picker.Item label="사천시" value="Sacheon" />
                <Picker.Item label="양산시" value="Yangsan" />
                <Picker.Item label="진주시" value="Jinju" />
                <Picker.Item label="진해시" value="Jinhae" />
                <Picker.Item label="창원시" value="Changwon" />
                <Picker.Item label="통영시" value="Tongyeong" />
                <Picker.Item label="거창군" value="Geochang" />
                <Picker.Item label="고성군" value="Goseong" />
                <Picker.Item label="남해군" value="Namhae" />
                <Picker.Item label="산청군" value="Sancheong" />
                <Picker.Item label="의령군" value="Uiryeong" />
                <Picker.Item label="창녕군" value="Changnyeong" />
                <Picker.Item label="하동군" value="Hadong" />
                <Picker.Item label="함안군" value="Haman" />
                <Picker.Item label="함양군" value="Hamyang" />
                <Picker.Item label="합천군" value="Hapcheon" />
            </View>
        );
    } else if (city === "Jeju") {
        return (
            <View>
                <Picker.Item label="서귀포시" value="Seogwipo" />
                <Picker.Item label="제주시" value="Jeju-si" />
                <Picker.Item label="남제주군" value="NamJeju" />
                <Picker.Item label="북제주군" value="BukJeju" />
            </View>
        );
    }
}
