import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsauthenticated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      AsyncStorage.getItem("token")
        .then((res) => {
          setLoading(false);
          setIsauthenticated(res != null);
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/main");
    } else if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated]);

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
