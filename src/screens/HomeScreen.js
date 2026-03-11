import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isTablet = width >= 700;
  const isPhone = width < 480;

  const titleSize = isWide ? 34 : isTablet ? 28 : isPhone ? 20 : 22;
  const subtitleSize = isWide ? 13 : isPhone ? 11 : 12;
  const cardMinHeight = isWide ? 180 : isTablet ? 160 : 130;

  const cardStyleBase = {
    minHeight: cardMinHeight,
    paddingHorizontal: isWide ? 28 : isPhone ? 14 : 20,
    marginHorizontal: isWide ? 10 : isPhone ? 6 : 8,
    flexBasis: isWide ? '48%' : isTablet ? '48%' : '100%',
    alignSelf: isPhone ? 'stretch' : 'center'
  };

  return (
    <LinearGradient
      colors={['#6c7bff', '#7a4bb1']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { fontSize: titleSize }]}>CESLA MULTI-PURPOSE COOPERATIVE</Text>
        <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>System Portal</Text>

        <View style={[styles.cardsRow, !isWide && styles.cardsColumn, { justifyContent: isWide ? 'space-between' : 'center' }]}>
          <View style={[styles.card, cardStyleBase]}>
            <Text style={styles.cardTitle}>Membership Portal</Text>
            <Text style={styles.cardDesc}>
              Savings, Share Capital, Loans — register or sign in
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation?.navigate?.('MembershipPortal')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go to Membership</Text>
            </TouchableOpacity>
            <Text style={styles.footerNote}>
              Login → Member Dashboard (savings, share capital, loans)
            </Text>
          </View>

          <View style={[styles.card, cardStyleBase]}>
            <Text style={styles.cardTitle}>CANTEEN MANAGEMENT SYSTEM</Text>
            <Text style={styles.cardDesc}>Employee food ordering system</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation?.navigate?.('Ordering')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go to Ordering</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: "#f5f5ff",
    marginTop: 6,
    marginBottom: 24,
    fontSize: 13,
  },
  cardsRow: {
    width: "100%",
    maxWidth: 1100,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "center",
    paddingHorizontal: 6,
  },
  cardsColumn: {
    flexDirection: "column",
    width: "100%",
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    flex: 1,
    width: '100%',
    maxWidth: 520,
    minHeight: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 18,
    marginHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardTitle: {
    color: "#3e55b8",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  cardDesc: {
    color: "#666",
    textAlign: "center",
    marginBottom: 18,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#5f77e6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#3b4bb3",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footerNote: {
    color: "#9b9b9b",
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
///mao ni bgo
