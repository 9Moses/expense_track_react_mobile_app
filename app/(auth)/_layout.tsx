import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import SplashScreen from "../../components/SplashScreen";
import { useEffect, useState } from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Wait for BOTH: Clerk auth + splash timer
  if (isLoading || !isLoaded) {
    return <SplashScreen />;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/(auth)/sign-in" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
