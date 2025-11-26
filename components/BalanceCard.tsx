import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";

interface Summary {
  payload: {
    data: {
      balance: number;
      income: number;
      expense: number;
      transaction: { category: string; total_amount: number }[];
    };
  };
}
const BalanceCard = ({ summary }: { summary: Summary }) => {
  const balance = summary.payload.data.balance;
  const income = summary.payload.data.income;
  const expense = summary.payload.data.expense;
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ₵{parseFloat(balance.toString()).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +₵{parseFloat(income.toString()).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expense</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -₵{Math.abs(parseFloat(expense.toString())).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
