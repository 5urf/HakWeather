import { StatusBar } from "expo-status-bar"; // 상태바 third-party 패키지
import { StyleSheet, Text, View } from "react-native"; // 때문에 항상 임포트 해야함

export default function App() {
  return (
    // div 쓸수 없음 View 써야함
    <View style={styles.container}>
      {/* 모든 택스트는 항상 text 컴포넌트 안에 있어야 함 */}
      <Text style={styles.text}>Hello! I made a RN App!</Text>
      <StatusBar style="dark" />
    </View>
  );
}
// StyleSheet.create 는 obj를 생성하는 데 사용
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "black",
  },
});
