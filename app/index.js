import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      AsyncStorage.getItem("token")
        .then((res) => {
          setLoading(false);
          if (res !== null) {
            router.replace("/main");
          } else {
            console.log("else");
            router.replace("/login");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={"blue"} size={"large"} />
    </View>
  );
}
