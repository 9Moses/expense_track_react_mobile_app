import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { formatDate } from '@/libs/ultis';

interface Transaction {

     id: string;
     amount: string;
     category: string;
     title: string;
     created_at: string;
 
}

// Map categories to their respective icons
const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};


const TransactionItem = ({ transaction, onDelete }: { transaction: Transaction, onDelete: (id: string)=> void }) =>{
    console.log("transactionclo", transaction)
    const isIncome = parseFloat(transaction?.amount) > 0;
  //const iconName = CATEGORY_ICONS[transaction?.payload?.data?.category] || "pricetag-outline";
  const iconName =
  CATEGORY_ICONS[transaction?.category as keyof typeof CATEGORY_ICONS] ||
  "pricetag-outline";
  return (
    <View  style={styles.transactionCard} key={transaction?.id}>
     <TouchableOpacity style={styles.transactionContent}>
         <View style={styles.categoryIconContainer}>
          <Ionicons  name={iconName as any} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{transaction?.title}</Text>
          <Text style={styles.transactionCategory}>{transaction?.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
          >
            {isIncome ? "+" : "-"}₵{Math.abs(parseFloat(transaction?.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(transaction?.created_at)}</Text>
        </View>
     </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(transaction.id)}>
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  )
}

export default TransactionItem