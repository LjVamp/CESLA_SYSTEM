import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function OrderingScreen({ navigation }) {
  const handleEmployeeLogin = () => {
    // Navigate to Employee Login screen
    navigation.navigate('EmployeeLogin');
  };

  const handleEmployeeRegister = () => {
    // Navigate to Employee Registration screen
    navigation.navigate('EmployeeRegister');
  };

  const handleVisitorOrder = () => {
    // Navigate to Visitor Ordering screen (no login required)
    navigation.navigate('VisitorOrder');
  };

  const handleAdminLogin = () => {
    // Navigate to Admin Login screen
    navigation.navigate('AdminLogin');
  };

  return (
    <LinearGradient
      colors={['#5B7FDB', '#7B5FBF', '#8B4FA8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CLIMBS Canteen Ordering System</Text>
        
        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Module Cards Container */}
      <View style={styles.centerWrapper}>
        <View style={styles.cardsContainer}>
          
          {/* Employee Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>👨‍💼</Text>
            </View>
            <Text style={styles.cardTitle}>Employee</Text>
            <Text style={styles.cardDescription}>
              Order food with your employee account
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleEmployeeLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Employee Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleEmployeeRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Register New Employee</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Visitor Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>👤</Text>
            </View>
            <Text style={styles.cardTitle}>Visitor</Text>
            <Text style={styles.cardDescription}>
              Order as a walk-in customer
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleVisitorOrder}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Order as Visitor</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Admin Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>⚙️</Text>
            </View>
            <Text style={styles.cardTitle}>Admin</Text>
            <Text style={styles.cardDescription}>
              Manage canteen operations
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleAdminLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Admin Login</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: width > 768 ? 36 : 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsContainer: {
    flexDirection: width > 1024 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    maxWidth: 1400,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minWidth: width > 1024 ? 350 : width - 80,
    maxWidth: width > 1024 ? 400 : width - 80,
    alignItems: 'center',
    minHeight: 380,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 50,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5B7FDB',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#5B7FDB',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#7B5FBF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
