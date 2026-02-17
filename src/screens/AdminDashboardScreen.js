import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const getLayout = () => {
  const { width } = Dimensions.get('window');
  return {
    width,
    isWeb: width >= 900,
    isMedium: width >= 600 && width < 900,
    isMobile: width < 600,
  };
};

export default function AdminDashboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [layout, setLayout] = useState(getLayout());

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => {
      setLayout(getLayout());
    });
    return () => sub?.remove();
  }, []);

  const dashboardData = {
    todaySales: 0.00,
    todayOrders: 0,
    lowStockItems: 6,
    totalCredits: 0.00,
  };

  const tabs = [
    { id: 'Overview',  icon: '📊', label: 'Overview' },
    { id: 'Menu',      icon: '🍽️', label: 'Menu Management' },
    { id: 'Inventory', icon: '📦', label: 'Inventory' },
    { id: 'Orders',    icon: '🛒', label: 'Orders' },
    { id: 'Reports',   icon: '📈', label: 'Reports' },
    { id: 'Credits',   icon: '💳', label: 'Employee Credits' },
  ];

  const statCards = [
    { icon: '💰', value: `₱${dashboardData.todaySales.toFixed(2)}`,   label: "Today's Sales" },
    { icon: '🛒', value: `${dashboardData.todayOrders}`,               label: "Today's Orders" },
    { icon: '📦', value: `${dashboardData.lowStockItems}`,             label: 'Low Stock Items' },
    { icon: '💳', value: `₱${dashboardData.totalCredits.toFixed(2)}`, label: 'Total Credits' },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'Menu')      navigation.navigate('MenuManagement');
    if (tabId === 'Inventory') navigation.navigate('InventoryManagement');
    if (tabId === 'Orders')    navigation.navigate('OrdersManagement');
    if (tabId === 'Reports')   navigation.navigate('ReportsManagement');
    if (tabId === 'Credits')   navigation.navigate('CreditsManagement');
  };

  /* Responsive helpers */
  const pad = layout.isWeb ? 24 : layout.isMedium ? 16 : 12;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.hLeft}>
          <Text style={styles.hIcon}>⚙️</Text>
          <Text style={styles.hTitle}>Admin Dashboard</Text>
        </View>
        <View style={styles.hRight}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Administrator</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Text style={styles.profileBtnIcon}>👤</Text>
            <Text style={styles.profileBtnText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ordering')}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── TABS ── */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => handleTabPress(tab.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── GRADIENT CONTENT AREA ── */}
      <LinearGradient
        colors={['#6B82DE', '#7B6FD4', '#8A5FC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientArea}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingHorizontal: pad }]}>

          {/* STAT CARDS */}
          <View
            style={[
              styles.statsGrid,
              (layout.isWeb || layout.isMedium) && styles.statsRow,
            ]}
          >
            {statCards.map((card, i) => (
              <View
                key={i}
                style={[
                  styles.statCard,
                  layout.isWeb    && styles.statCardWeb,
                  layout.isMedium && styles.statCardMedium,
                  layout.isMobile && styles.statCardMobile,
                  // Remove right margin on last item
                  i === statCards.length - 1 && { marginRight: 0 },
                ]}
              >
                <Text style={styles.statCardIcon}>{card.icon}</Text>
                <View style={styles.statCardInfo}>
                  <Text style={styles.statCardValue}>{card.value}</Text>
                  <Text style={styles.statCardLabel}>{card.label}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* RECENT ORDERS */}
          <View style={styles.ordersCard}>
            <Text style={styles.ordersTitle}>Recent Orders</Text>
            <View style={styles.ordersDivider} />
            <View style={styles.ordersBody}>
              <Text style={styles.ordersEmpty}>No recent orders</Text>
            </View>
          </View>

        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ─ Header ─ */
  header: {
    height: 54,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  hLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hIcon: {
    fontSize: 16,
  },
  hTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  hRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminBadge: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  adminBadgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B7FDB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 5,
  },
  profileBtnIcon: {
    fontSize: 13,
  },
  profileBtnText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '600',
  },
  logoutBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  logoutBtnText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },

  /* ─ Tabs ─ */
  tabsWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#6B5FC4',
  },
  tabIcon: {
    fontSize: 15,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },

  /* ─ Gradient area ─ */
  gradientArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 40,
    gap: 14,
  },

  /* ─ Stats Grid ─ */
  statsGrid: {
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
  },

  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#2B3FA0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  /* Web: 4 equal columns with gap */
  statCardWeb: {
    flex: 1,
    marginRight: 12,
  },
  /* Medium (tablet): 2 columns */
  statCardMedium: {
    width: '48.5%',
    marginRight: 12,
    marginBottom: 12,
  },
  /* Mobile: full width */
  statCardMobile: {
    width: '100%',
  },

  statCardIcon: {
    fontSize: 36,
  },
  statCardInfo: {
    flex: 1,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5B7FDB',
    letterSpacing: -0.3,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 3,
    fontWeight: '500',
  },

  /* ─ Recent Orders ─ */
  ordersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 50,
    shadowColor: '#2B3FA0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  ordersTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5B7FDB',
    marginBottom: 14,
  },
  ordersDivider: {
    height: 1,
    backgroundColor: '#F0F1F5',
    marginBottom: 28,
  },
  ordersBody: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  ordersEmpty: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});