import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
// Dimensions 기계 스크린 width 나 height 얻을 수 있음
const { width: SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  return (
    // 모든 View는 Flex Container 다 Flex Direction 기본 값은 컬럼이다
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      {/* 스크롤 기능 가능하게함 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#81ecec",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
