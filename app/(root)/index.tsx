import { styles } from "@/assets/styles/home.styles";
import BalanceCard from "@/components/BalanceCard";
import { CustomAlert } from "@/components/CustomAlert";
import NoTransactionsFound from "@/components/NoTransactionFound";
import PageLoader from "@/components/PageLoader";
import { SignOutButton } from "@/components/SignOutButton";
import TransactionItem from "@/components/TransactionItem";
import { useTransaction } from "@/hooks/useTransaction";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { transactons, summary, isLoading, loadData, deleteTransaction } =
    useTransaction(user?.id);
  console.log(user);
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async()=>{
    setRefreshing(true)
    await loadData();
    setRefreshing(false)
  }

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("transactions", transactons?.payload?.data);
  console.log("summary", summary);

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteAlert(false);
    handleDeleteTransaction(transactons?.payload?.data[0]?.id);
  };

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction(id);
    loadData();
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/expense.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/create/create-transaction")}
              >
                <Ionicons name="add-circle" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <SignOutButton />
            </View>
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transaction</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
      data={transactons?.payload?.data}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        // refreshing={isLoading}
        // onRefresh={loadData}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

      <CustomAlert
        visible={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
}
