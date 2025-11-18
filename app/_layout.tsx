import SafeScreen from "@/components/SafeScreen";
import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  return (
     <ClerkProvider tokenCache={tokenCache}>
    <SafeScreen>
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
      <Slot />
    </SafeScreen>
    </ClerkProvider>
  );
}
