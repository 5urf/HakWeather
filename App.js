import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    // 모든 View는 Flex Container 다 Flex Direction 기본 값은 컬럼이다
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 1, backgroundColor: "black" }}></View>
      <View style={{ flex: 1, backgroundColor: "red" }}></View>
    </View>
  );
}
