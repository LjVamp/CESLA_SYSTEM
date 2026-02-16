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

export default function InventoryManagementScreen({ navigation }) {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Rice (kg)', quantity: 25, unit: 'kg', minQuantity: 20, status: 'ok' },
    { id: 2, name: 'Chicken (kg)', quantity: 8, unit: 'kg', minQuantity: 10, status: 'low' },
    { id: 3, name: 'Vegetables', quantity: 15, unit: 'kg', minQuantity: 15, status: 'ok' },
    { id: 4, name: 'Cooking Oil (L)', quantity: 3, unit: 'L', minQuantity: 5, status: 'low' },
    { id: 5, name: 'Soy Sauce (L)', quantity: 2, unit: 'L', minQuantity: 3, status: 'low' },
    { id: 6, name: 'Sugar (kg)', quantity: 1, unit: 'kg', minQuantity: 5, status: 'critical' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [restockItem, setRestockItem] = useState(null);
  const [restockAmount, setRestockAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleRestock = (item) => {
    setRestockItem(item);
    setRestockAmount('');
    setModalVisible(true);
  };

  const confirmRestock = () => {
    if (!restockAmount || parseFloat(restockAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    const amount = parseFloat(restockAmount);
    setInventory(inventory.map(item => {
      if (item.id === restockItem.id) {
        const newQuantity = item.quantity + amount;
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity < item.minQuantity ? 
            (newQuantity < item.minQuantity * 0.5 ? 'critical' : 'low') : 'ok'
        };
      }
      return item;
    }));

    Alert.alert('Success', `Restocked ${restockAmount} ${restockItem.unit} of ${restockItem.name}`);
    setModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok': return '#10B981';
      case 'low': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ok': return 'In Stock';
      case 'low': return 'Low Stock';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = inventory.filter(i => i.status === 'low' || i.status === 'critical').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventory Management</Text>
        <View style={styles.alertBadge}>
          <Text style={styles.alertText}>⚠️ {lowStockCount}</Text>
        </View>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{inventory.length}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={[styles.statBox, styles.warningBox]}>
          <Text style={styles.statNumber}>{lowStockCount}</Text>
          <Text style={styles.statLabel}>Need Restock</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search inventory..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Status */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['All', 'Critical', 'Low', 'Ok'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterChip, filterStatus === status && styles.filterChipActive]}
            onPress={() => setFilterStatus(status)}
          >
            <Text style={[styles.filterText, filterStatus === status && styles.filterTextActive]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Inventory List */}
      <ScrollView style={styles.content}>
        {filteredInventory.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        ) : (
          filteredInventory.map(item => (
            <View key={item.id} style={styles.inventoryCard}>
              <View style={styles.cardLeft}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.quantityRow}>
                  <Text style={styles.quantity}>
                    {item.quantity} {item.unit}
                  </Text>
                  <Text style={styles.minQuantity}>
                    Min: {item.minQuantity} {item.unit}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) + '20' }
                  ]}
                >
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.restockButton}
                onPress={() => handleRestock(item)}
              >
                <Text style={styles.restockButtonText}>+ Restock</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Restock Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Restock Item</Text>
            
            {restockItem && (
              <>
                <Text style={styles.modalItemName}>{restockItem.name}</Text>
                <Text style={styles.modalCurrentStock}>
                  Current Stock: {restockItem.quantity} {restockItem.unit}
                </Text>

                <Text style={styles.inputLabel}>Quantity to Add</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder={`Enter amount in ${restockItem.unit}`}
                  value={restockAmount}
                  onChangeText={setRestockAmount}
                  keyboardType="decimal-pad"
                />

                {restockAmount && (
                  <Text style={styles.newStockPreview}>
                    New Stock: {(restockItem.quantity + parseFloat(restockAmount || 0)).toFixed(2)} {restockItem.unit}
                  </Text>
                )}
              </>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmRestock}>
                <Text style={styles.modalConfirmText}>Confirm Restock</Text>
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
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
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
  alertBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  alertText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  warningBox: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5B7FDB',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchSection: {
    padding: 15,
    paddingTop: 0,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterScroll: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#5B7FDB',
    borderColor: '#5B7FDB',
  },
  filterText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  inventoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B7FDB',
  },
  minQuantity: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  restockButton: {
    backgroundColor: '#5B7FDB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  restockButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
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
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5B7FDB',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalCurrentStock: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  newStockPreview: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
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
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#5B7FDB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});