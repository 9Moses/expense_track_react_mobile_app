import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "@/constants/api";
import { styles } from "@/assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import {  useToast } from "@/hooks/useAlert";

interface CategoriiesProps {
  id: string;
  name: string;
  icon: string;
}

const CATEGORIES: CategoriiesProps[] = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateTransation = () => {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isExpense, setIsExpense] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast: showAlert, ToastComponent } = useToast();
 

  const handleCreate = async () => {
    //validation
    if (!title.trim()) {
      return showAlert("Please enter a transaction title");
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      return Alert.alert("Error", "Please enter a valid amount");
    if (!selectedCategory)
      return Alert.alert("Error", "Please select a category");

    setIsLoading(true);

    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: formattedAmount,
          category: selectedCategory,
          user_id: user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }
      showAlert("Transaction created!");

      // Navigate back after a short delay
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Error creating transaction:", error);
      Alert.alert("Error", "Error creating transaction");
    } finally {
      setIsLoading(false);
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
         
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text>Create Transaction</Text>
            <TouchableOpacity
              style={[
                styles.saveButtonContainer,
                isLoading && styles.saveButtonDisabled,
              ]}
              onPress={handleCreate}
              disabled={isLoading}
            >
              <Text style={styles.saveButton}>
                {isLoading ? "Saving..." : "Save"}
              </Text>
              {!isLoading && (
                <Ionicons name="checkmark" size={18} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  isExpense && styles.typeButtonActive,
                ]}
                onPress={() => setIsExpense(true)}
              >
                <Ionicons
                  name="arrow-down-circle"
                  size={22}
                  color={isExpense ? COLORS.white : COLORS.expense}
                  style={styles.typeIcon}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    isExpense && styles.typeButtonTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  !isExpense && styles.typeButtonActive,
                ]}
                onPress={() => setIsExpense(false)}
              >
                <Ionicons
                  name="arrow-up-circle"
                  size={22}
                  color={!isExpense ? COLORS.white : COLORS.income}
                  style={styles.typeIcon}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    !isExpense && styles.typeButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
            {/* AMOUNT CONTAINER */}
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₵</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textLight}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
            {/* INPUT CONTAINER */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="create-outline"
                size={22}
                color={COLORS.textLight}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Transaction Title"
                placeholderTextColor={COLORS.textLight}
                value={title}
                onChangeText={setTitle}
              />
            </View>
            {/* TITLE */}
            <Text style={styles.sectionTitle}>
              <Text>
                <Ionicons
                  name="pricetag-outline"
                  size={16}
                  color={COLORS.text}
                />
              </Text>
              Category
            </Text>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.name &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={
                      selectedCategory === category.name
                        ? COLORS.white
                        : COLORS.text
                    }
                    style={styles.categoryIcon}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category.name &&
                        styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

           <ToastComponent />

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateTransation;
