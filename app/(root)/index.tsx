import { styles } from '@/assets/styles/home.styles'
import PageLoader from '@/components/PageLoader'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransaction } from '@/hooks/useTransaction'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


export default function Page() {
  const { user } = useUser()
  const { transactons, summary, isLoading, loadData, deleteTransaction } = useTransaction(user?.id);
  console.log(user)
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("transactions", transactons);
  console.log("summary", summary);

  if(isLoading)
    return <PageLoader/>

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
            source={require("../../assets/images/expense.png")}
            style={styles.headerLogo}
            resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.addButton} onPress={()=> router.push("/create/create-transaction")}>
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <SignOutButton/>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}