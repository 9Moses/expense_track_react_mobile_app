import { styles } from '@/assets/styles/home.styles'
import { COLORS } from '@/constants/colors'
import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { CustomAlert } from './CustomAlert'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  
  const handleSignOut = () => {
    setShowLogoutAlert(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutAlert(false);
    signOut();
  };

  return (
   <>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
      </TouchableOpacity>

      <CustomAlert
        visible={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={handleConfirmLogout}
        title="Logout"
        message="Are you sure you want to logout? You'll need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  )
}