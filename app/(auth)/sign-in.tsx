import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/auth.styles'
import { COLORS } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
    const [error, setError] = useState("");

  // Handle the submission of the sign-in form
const onSignInPress = async () => {
  if (!isLoaded) return;

  try {
    const signInAttempt = await signIn.create({
      identifier: emailAddress,
      password,
    });

    if (signInAttempt.status === "complete") {
      await setActive({ session: signInAttempt.createdSessionId });
      router.replace("/");
    } else {
      console.log(JSON.stringify(signInAttempt, null, 2));
      setError("Invalid email or password");
    }
  } catch (err: any) {
    console.log("SIGN IN ERROR:", JSON.stringify(err, null, 2));

    // Extract real Clerk error message
    const clerkError = err.errors?.[0]?.message || "Invalid email or password";

    setError(clerkError); // show the exact message
  }
};

  return (
    <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === "android" ? "height" : "padding"}
         keyboardVerticalOffset={Platform.OS === "android" ? 0 : 40}
       >
         <ScrollView 
           contentContainerStyle={{ flexGrow: 1 }}
           keyboardShouldPersistTaps="handled"
         >
    <View style={styles.container}>
      <Image source={require("@/assets/images/revenue-i1.png")} style={styles.illustration} />
      {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={24} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={24} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
      style={[styles.input, error && styles.errorInput]}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#494847b9"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
      style={[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        placeholderTextColor="#494847b9"
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Do have an account?</Text>
        <Link href="/sign-up">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </View>
    </View>
   </ScrollView>
       </KeyboardAvoidingView>
  )
}