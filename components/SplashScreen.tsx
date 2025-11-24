import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen: React.FC = ({}) => {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        useNativeDriver: true,
      }),
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Progress bar
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();

    // Navigate to main app after delay
    const timer = setTimeout(() => {
      router.replace('/(auth)/sign-in');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        {/* Logo Container with Shadow */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoIcon}>💰</Text>
          </View>
        </View>

        {/* App Title */}
        <Text style={styles.appTitle}>Expense Tracker</Text>
        <Text style={styles.appSubtitle}>Master Your Finances</Text>
      </Animated.View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressWidth },
            ]}
          />
        </View>
        {/* <Text style={styles.loadingText}>Loading your finances...</Text> */}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Start tracking • Start saving</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  logoIcon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});

export default SplashScreen;