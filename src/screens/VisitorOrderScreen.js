import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VisitorOrderScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#5B7FDB', '#7B5FBF', '#8B4FA8']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.iconEmoji}>👤</Text>
            <Text style={styles.title}>Visitor Ordering</Text>
            <Text style={styles.subtitle}>Order as a walk-in customer</Text>
          </View>

          {/* Welcome Card */}
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Welcome, Visitor!</Text>
            <Text style={styles.welcomeText}>
              No account needed. Browse our menu and place your order directly.
            </Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                // TODO: Navigate to menu/ordering screen
                console.log('Start ordering as visitor');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Browse Menu</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🎯 Quick & Easy</Text>
              <Text style={styles.infoText}>
                • No registration required{'\n'}
                • Browse full menu{'\n'}
                • Pay on pickup{'\n'}
                • Fast service
              </Text>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconEmoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    width: '100%',
    maxWidth: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5B7FDB',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  startButton: {
    backgroundColor: '#5B7FDB',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#5B7FDB',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});