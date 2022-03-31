import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
// Dimensions 기계 스크린 width 나 height 얻을 수 있음
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d790e8a12d0ae64eac3e7fc2a6e73e0c";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    // 사용자 위치 동의
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);
    //사용자의 현재 위치를 1회성으로 전달하도록 요청하고 그 obj 안에 경도 위도 비구조화 할당
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // Location.reverseGeocodeAsync(location, options) 위치를 우편주소로 지오코딩
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    // 모든 View는 Flex Container 다 Flex Direction 기본 값은 컬럼이다
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* 스크롤 기능 가능하게함 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="#ecf0f1"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f39c12",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "#ecf0f1",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    fontSize: 90,
    color: "#ecf0f1",
  },
  description: {
    marginTop: -20,
    fontSize: 30,
    color: "#ecf0f1",
  },
  tinyText: {
    fontSize: 15,
    color: "#ecf0f1",
  },
});
