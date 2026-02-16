import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Overview');

  // Sample data - replace with API calls
  const dashboardData = {
    todaySales: 0.00,
    todayOrders: 0,
    lowStockItems: 6,
    totalCredits: 0.00,
  };

  const tabs = [
    { id: 'Overview', icon: '📊', label: 'Overview' },
    { id: 'Menu', icon: '🍽️', label: 'Menu Management' },
    { id: 'Inventory', icon: '📦', label: 'Inventory' },
    { id: 'Orders', icon: '🛒', label: 'Orders' },
    { id: 'Reports', icon: '📈', label: 'Reports' },
    { id: 'Credits', icon: '💳', label: 'Employee Credits' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Administrator</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
            <Text style={styles.profileText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Ordering')}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'Overview' && (
          <View style={styles.overviewContainer}>
            {/* Stats Cards */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>💰</Text>
                <Text style={styles.statValue}>₱{dashboardData.todaySales.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Today's Sales</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🛒</Text>
                <Text style={styles.statValue}>{dashboardData.todayOrders}</Text>
                <Text style={styles.statLabel}>Today's Orders</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📦</Text>
                <Text style={styles.statValue}>{dashboardData.lowStockItems}</Text>
                <Text style={styles.statLabel}>Low Stock Items</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statIcon}>💳</Text>
                <Text style={styles.statValue}>₱{dashboardData.totalCredits.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Total Credits</Text>
              </View>
            </View>

            {/* Recent Orders Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Orders</Text>
              <View style={styles.ordersCard}>
                <Text style={styles.emptyMessage}>No recent orders</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Menu' && (
          <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>🍽️ Menu Management</Text>
            <Text style={styles.moduleDescription}>
              Manage food items, categories, and pricing
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('MenuManagement')}
            >
              <Text style={styles.actionButtonText}>Open Menu Management</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Inventory' && (
          <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>📦 Inventory</Text>
            <Text style={styles.moduleDescription}>
              Track stock levels and manage supplies
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('InventoryManagement')}
            >
              <Text style={styles.actionButtonText}>Open Inventory</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Orders' && (
          <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>🛒 Orders</Text>
            <Text style={styles.moduleDescription}>
              View and manage all orders
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View All Orders</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Reports' && (
          <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>📈 Reports</Text>
            <Text style={styles.moduleDescription}>
              Generate sales and performance reports
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Credits' && (
          <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>💳 Employee Credits</Text>
            <Text style={styles.moduleDescription}>
              Manage employee credit accounts
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Credits</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#5B7FDB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adminBadge: {
    backgroundColor: '#5B7FDB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  adminBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  profileIcon: {
    fontSize: 16,
  },
  profileText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: '#F9FAFB',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#5B7FDB',
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B7FDB',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B7FDB',
    marginBottom: 15,
  },
  ordersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  moduleContainer: {
    padding: 20,
  },
  moduleTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  moduleDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 25,
    lineHeight: 24,
  },
  actionButton: {
    backgroundColor: '#5B7FDB',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});