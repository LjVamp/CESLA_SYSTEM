import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#5B7FDB', '#7B5FBF', '#8B4FA8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header - Fixed at top */}
      <View style={styles.header}>
        <Text style={styles.title}>CLIMBS Life and General Insurance Cooperative</Text>
        <Text style={styles.subtitle}>System Portal</Text>
      </View>

      {/* Portal Cards - Centered */}
      <View style={styles.centerWrapper}>
        <View style={styles.cardsContainer}>
          {/* Membership Portal Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Membership Portal</Text>
            <Text style={styles.cardDescription}>
              Register or login as member/admin
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Membership')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go to Membership</Text>
            </TouchableOpacity>
          </View>

          {/* Ordering System Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ordering System</Text>
            <Text style={styles.cardDescription}>
              Employee food ordering system
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Ordering')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go to Ordering</Text>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: width > 768 ? 36 : 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 40,
  },
  subtitle: {
    fontSize: width > 768 ? 18 : 16,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    maxWidth: 1200,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minWidth: width > 768 ? 400 : width - 80,
    maxWidth: width > 768 ? 500 : width - 80,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5B7FDB',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#5B7FDB',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
