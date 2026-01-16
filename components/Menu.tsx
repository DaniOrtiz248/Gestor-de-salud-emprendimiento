// components/Menu.tsx
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter, Link } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";


export default function Menu() {
  const router = useRouter();
  const [highlighted, setHighlighted] = useState("none");

  return (
    <View style={styles.container}>

      <View style={styles.circleGray}></View>

      <TouchableOpacity onPress={() => {
        setHighlighted("medications");
        router.navigate("/medications/daily");
      }}>
        <MaterialCommunityIcons name="pill" size={25} color={highlighted === "medications" ? "#B4E1D6" : "#1d1d1dff"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setHighlighted("appointments");
        router.navigate("/appointments/browse");
      }}>
        <MaterialIcons name="calendar-month" size={25} color={highlighted === "appointments" ? "#B4E1D6" : "#1d1d1dff"} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.centerButton}
        onPress={() => {
          setHighlighted("none");
          router.navigate("/dashboardFamily");
        }}
      >
        <MaterialIcons name="home" size={35} color="#1d1d1dff"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setHighlighted("medical-history");
        router.navigate("/medical-history");
      }}>
        <MaterialCommunityIcons name="clipboard-text" size={25} color={highlighted === "medical-history" ? "#B4E1D6" : "#1d1d1dff"} />
      </TouchableOpacity>

      {/* Removed appointments/medications/news from bottom menu to keep view clean; use header menu */}

      <TouchableOpacity onPress={() => {
        setHighlighted("profile");
        router.navigate("/profile");
      }}>
        <MaterialIcons name="person" size={25} color={highlighted === "profile" ? "#B4E1D6" : "#1d1d1dff"} />
      </TouchableOpacity>

    </View>
  );
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5C6B73",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 15,
    width: "95%",
  },
  centerButton: {
    backgroundColor: "#B4E1D6",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    marginTop: -30,
  },
  circleGray: {
    position: 'absolute',
    backgroundColor: '#5C6B73',
    borderRadius: 50,
    width: screenWidth * 0.25,
    height: screenHeight * 0.11,
    bottom: 5,
  },
});
