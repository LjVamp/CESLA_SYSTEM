import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

export default function MenuManagementScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Pork Sinigang', category: 'Meals', price: 90.00, stock: 0, available: true, emoji: '🍲' },
    { id: 2, name: 'Beef Tapa', category: 'Meals', price: 95.00, stock: 0, available: true, emoji: '🥩' },
    { id: 3, name: 'Iced Coffee', category: 'Drinks', price: 45.00, stock: 0, available: true, emoji: '☕' },
    { id: 4, name: 'Fresh Juice', category: 'Drinks', price: 40.00, stock: 0, available: true, emoji: '🧃' },
    { id: 5, name: 'Lumpia', category: 'Snacks', price: 35.00, stock: 0, available: true, emoji: '🥟' },
    { id: 6, name: 'Lugaw with egg', category: 'Meals', price: 55.00, stock: 30, available: true, emoji: '🍚' },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    emoji: '🍽️',
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      emoji: item.emoji,
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setMenuItems(menuItems.map(item =>
      item.id === editingItem.id
        ? { ...item, ...formData, price: parseFloat(formData.price) }
        : item
    ));
    Alert.alert('Success', 'Menu item updated');
    setModalVisible(false);
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Confirm Delete',
      `Delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(menuItems.filter(i => i.id !== item.id));
            Alert.alert('Success', 'Item deleted');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.dashboardTitle}>⚙️ Admin Dashboard</Text>
        <View style={styles.headerRight}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Administrator</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
            <Text style={styles.profileText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('AdminDashboard')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabLabel}>Overview</Text>
        </TouchableOpacity>
        <View style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabIcon}>🍽️</Text>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Menu Management</Text>
        </View>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('InventoryManagement')}>
          <Text style={styles.tabIcon}>📦</Text>
          <Text style={styles.tabLabel}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('OrdersManagement')}>
          <Text style={styles.tabIcon}>🛒</Text>
          <Text style={styles.tabLabel}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ReportsManagement')}>
          <Text style={styles.tabIcon}>📈</Text>
          <Text style={styles.tabLabel}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('CreditsManagement')}>
          <Text style={styles.tabIcon}>💳</Text>
          <Text style={styles.tabLabel}>Employee Credits</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Content */}
      <View style={styles.contentWrapper}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Menu Management</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Menu Item</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: '10%' }]}>IMAGE</Text>
              <Text style={[styles.headerCell, { width: '20%' }]}>NAME</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>CATEGORY</Text>
              <Text style={[styles.headerCell, { width: '12%' }]}>PRICE</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>STOCK</Text>
              <Text style={[styles.headerCell, { width: '13%' }]}>STATUS</Text>
              <Text style={[styles.headerCell, { width: '20%' }]}>ACTIONS</Text>
            </View>

            {/* Table Rows */}
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.tableRow,
                  hoveredRow === item.id && styles.tableRowHovered
                ]}
                onPressIn={() => setHoveredRow(item.id)}
                onPressOut={() => setHoveredRow(null)}
                activeOpacity={1}
              >
                <View style={[styles.cell, { width: '10%' }]}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                </View>
                <Text style={[styles.cell, styles.cellText, { width: '20%' }]}>{item.name}</Text>
                <Text style={[styles.cell, styles.cellText, { width: '15%' }]}>{item.category}</Text>
                <Text style={[styles.cell, styles.cellText, { width: '12%' }]}>₱{item.price.toFixed(2)}</Text>
                <Text style={[styles.cell, styles.cellText, { width: '10%' }]}>{item.stock}</Text>
                <View style={[styles.cell, { width: '13%' }]}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Available</Text>
                  </View>
                </View>
                <View style={[styles.cell, { width: '20%', flexDirection: 'row', gap: 8 }]}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Menu Item</Text>

            <Text style={styles.inputLabel}>Emoji</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.emoji}
              onChangeText={(text) => setFormData({ ...formData, emoji: text })}
            />

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Text style={styles.inputLabel}>Category</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
            />

            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="decimal-pad"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveButton} onPress={handleSave}>
                <Text style={styles.modalSaveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B7FDB',
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardTitle: {
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
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  adminBadgeText: {
    color: '#5B7FDB',
    fontSize: 12,
    fontWeight: '600',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B7FDB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  profileIcon: {
    fontSize: 16,
  },
  profileText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsScroll: {
    backgroundColor: '#6B7FDB',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  tab: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#8B7FDB',
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#FFFFFF',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#6B7FDB',
    padding: 20,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B7FDB',
  },
  addButton: {
    backgroundColor: '#5B7FDB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5B7FDB',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerCell: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tableRowHovered: {
    backgroundColor: '#F9FAFB',
    transform: [{ scale: 1.005 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#1F2937',
  },
  itemEmoji: {
    fontSize: 32,
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 16,
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#5B7FDB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
