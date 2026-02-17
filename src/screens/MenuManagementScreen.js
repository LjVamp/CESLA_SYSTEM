import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const getLayout = () => {
  const { width } = Dimensions.get("window");
  return { width, isWeb: width >= 900, isMobile: width < 600 };
};

const CATEGORIES = ["Meals", "Drinks", "Snacks", "Desserts", "Others"];

export default function MenuManagementScreen({ navigation }) {
  const [layout, setLayout] = useState(getLayout());
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Pork Sinigang",
      category: "Meals",
      price: 90.0,
      stock: 0,
      enabled: true,
      image: null,
      emoji: "🍲",
    },
    {
      id: 2,
      name: "Beef Tapa",
      category: "Meals",
      price: 95.0,
      stock: 0,
      enabled: true,
      image: null,
      emoji: "🥩",
    },
    {
      id: 3,
      name: "Iced Coffee",
      category: "Drinks",
      price: 45.0,
      stock: 0,
      enabled: true,
      image: null,
      emoji: "☕",
    },
    {
      id: 4,
      name: "Fresh Juice",
      category: "Drinks",
      price: 40.0,
      stock: 0,
      enabled: true,
      image: null,
      emoji: "🧃",
    },
    {
      id: 5,
      name: "Lumpia",
      category: "Snacks",
      price: 35.0,
      stock: 0,
      enabled: true,
      image: null,
      emoji: "🥟",
    },
    {
      id: 6,
      name: "Lugaw with egg",
      category: "Meals",
      price: 55.0,
      stock: 30,
      enabled: true,
      image: null,
      emoji: "🍚",
    },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = Add mode
  const [form, setForm] = useState({
    name: "",
    category: "Meals",
    price: "",
    stock: "",
    image: null,
    emoji: "🍽️",
    enabled: true,
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", () =>
      setLayout(getLayout()),
    );
    return () => sub?.remove();
  }, []);

  /* ── helpers ── */
  const getStatus = (item) => {
    if (!item.enabled)
      return { label: "Disabled", bg: "#E5E7EB", color: "#6B7280" };
    if (item.stock === 0)
      return { label: "Not Available", bg: "#FEE2E2", color: "#DC2626" };
    return { label: "Available", bg: "#D1FAE5", color: "#059669" };
  };

  const openAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      category: "Meals",
      price: "",
      stock: "",
      image: null,
      emoji: "🍽️",
      enabled: true,
    });
    setModalVisible(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      stock: item.stock.toString(),
      image: item.image,
      emoji: item.emoji,
      enabled: item.enabled,
    });
    setModalVisible(true);
  };

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission required", "Allow photo library access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setForm((f) => ({ ...f, image: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      Alert.alert("Error", "Name is required.");
      return;
    }
    if (!form.category.trim()) {
      Alert.alert("Error", "Category is required.");
      return;
    }
    if (!form.price || isNaN(parseFloat(form.price))) {
      Alert.alert("Error", "Enter a valid price.");
      return;
    }
    if (form.stock === "" || isNaN(parseInt(form.stock))) {
      Alert.alert("Error", "Enter a valid stock.");
      return;
    }

    const stockNum = parseInt(form.stock);
    const saved = {
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(form.price),
      stock: stockNum,
      enabled: form.enabled,
      image: form.image,
      emoji: form.emoji,
    };

    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...saved } : i)),
      );
      Alert.alert("Success", "Menu item updated!");
    } else {
      const newId = Math.max(0, ...menuItems.map((i) => i.id)) + 1;
      setMenuItems((prev) => [...prev, { id: newId, ...saved }]);
      Alert.alert("Success", "Menu item added!");
    }
    setModalVisible(false);
  };

  const handleDelete = (item) => {
    Alert.alert("Confirm Delete", `Delete "${item.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMenuItems((prev) => prev.filter((i) => i.id !== item.id));
        },
      },
    ]);
  };

  const toggleEnabled = (item) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, enabled: !i.enabled } : i)),
    );
  };

  /* ── sub-components ── */
  const TabBar = () => (
    <View style={styles.tabsWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {[
          {
            id: "Overview",
            icon: "📊",
            label: "Overview",
            screen: "AdminDashboard",
          },
          { id: "Menu", icon: "🍽️", label: "Menu Management", screen: null },
          {
            id: "Inventory",
            icon: "📦",
            label: "Inventory",
            screen: "InventoryManagement",
          },
          {
            id: "Orders",
            icon: "🛒",
            label: "Orders",
            screen: "OrdersManagement",
          },
          {
            id: "Reports",
            icon: "📈",
            label: "Reports",
            screen: "ReportsManagement",
          },
          {
            id: "Credits",
            icon: "💳",
            label: "Employee Credits",
            screen: "CreditsManagement",
          },
        ].map((tab) => {
          const active = tab.id === "Menu";
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => tab.screen && navigation.navigate(tab.screen)}
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
  );

  return (
    <View style={styles.root}>
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
            onPress={() => navigation.navigate("Ordering")}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── TABS ── */}
      <TabBar />

      {/* ── GRADIENT BODY ── */}
      <View style={styles.gradientBody}>
        <ScrollView
          contentContainerStyle={[
            styles.body,
            { paddingHorizontal: layout.isWeb ? 24 : 12 },
          ]}
        >
          {/* Page title row */}
          <View style={styles.pageTitleRow}>
            <Text style={styles.pageTitle}>Menu Management</Text>
            <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
              <Text style={styles.addBtnText}>+ Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          {/* TABLE */}
          <View style={styles.tableCard}>
            {/* Table Header */}
            <View style={styles.tableHead}>
              <Text style={[styles.th, { flex: 1.2 }]}>IMAGE</Text>
              <Text style={[styles.th, { flex: 2 }]}>NAME</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>CATEGORY</Text>
              <Text style={[styles.th, { flex: 1.3 }]}>PRICE</Text>
              <Text style={[styles.th, { flex: 1.2 }]}>STOCK</Text>
              <Text style={[styles.th, { flex: 1.8 }]}>STATUS</Text>
              <Text style={[styles.th, { flex: 2.5 }]}>ACTIONS</Text>
            </View>

            {menuItems.length === 0 && (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>
                  No menu items yet. Tap "+ Add Menu Item" to start.
                </Text>
              </View>
            )}

            {menuItems.map((item) => {
              const status = getStatus(item);
              const hovered = hoveredRow === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.tableRow, hovered && styles.tableRowHover]}
                  onPressIn={() => setHoveredRow(item.id)}
                  onPressOut={() => setHoveredRow(null)}
                  activeOpacity={1}
                >
                  {/* Image */}
                  <View style={[styles.td, { flex: 1.2 }]}>
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                      />
                    ) : (
                      <Text style={styles.itemEmoji}>{item.emoji}</Text>
                    )}
                  </View>
                  {/* Name */}
                  <Text style={[styles.td, styles.tdText, { flex: 2 }]}>
                    {item.name}
                  </Text>
                  {/* Category */}
                  <Text style={[styles.td, styles.tdText, { flex: 1.5 }]}>
                    {item.category}
                  </Text>
                  {/* Price */}
                  <Text style={[styles.td, styles.tdText, { flex: 1.3 }]}>
                    ₱{item.price.toFixed(2)}
                  </Text>
                  {/* Stock */}
                  <Text style={[styles.td, styles.tdText, { flex: 1.2 }]}>
                    {item.stock}
                  </Text>
                  {/* Status */}
                  <View style={[styles.td, { flex: 1.8 }]}>
                    <TouchableOpacity
                      style={[
                        styles.statusBadge,
                        { backgroundColor: status.bg },
                      ]}
                      onPress={() => toggleEnabled(item)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[styles.statusText, { color: status.color }]}
                      >
                        {status.label}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Actions */}
                  <View
                    style={[
                      styles.td,
                      { flex: 2.5, flexDirection: "row", gap: 6 },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => openEdit(item)}
                    >
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(item)}
                    >
                      <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* ═══════════ ADD / EDIT MODAL ═══════════ */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editingItem ? "Edit Menu Item" : "Add Menu Item"}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Image picker */}
              <Text style={styles.fieldLabel}>Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {form.image ? (
                  <Image
                    source={{ uri: form.image }}
                    style={styles.imagePickerPreview}
                  />
                ) : (
                  <View style={styles.imagePickerPlaceholder}>
                    <Text style={styles.imagePickerEmoji}>📷</Text>
                    <Text style={styles.imagePickerHint}>
                      Tap to choose photo
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              {form.image && (
                <TouchableOpacity
                  onPress={() => setForm((f) => ({ ...f, image: null }))}
                >
                  <Text style={styles.removeImageText}>✕ Remove image</Text>
                </TouchableOpacity>
              )}

              {/* Fallback Emoji (shown only when no image) */}
              {!form.image && (
                <>
                  <Text style={styles.fieldLabel}>Emoji (fallback icon)</Text>
                  <TextInput
                    style={styles.input}
                    value={form.emoji}
                    onChangeText={(v) => setForm((f) => ({ ...f, emoji: v }))}
                    placeholder="e.g. 🍲"
                  />
                </>
              )}

              {/* Name */}
              <Text style={styles.fieldLabel}>Item Name *</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="e.g. Pork Sinigang"
              />

              {/* Category chips */}
              <Text style={styles.fieldLabel}>Category *</Text>
              <View style={styles.categoryRow}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.catChip,
                      form.category === cat && styles.catChipActive,
                    ]}
                    onPress={() => setForm((f) => ({ ...f, category: cat }))}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        form.category === cat && styles.catChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price */}
              <Text style={styles.fieldLabel}>Price (₱) *</Text>
              <TextInput
                style={styles.input}
                value={form.price}
                onChangeText={(v) => setForm((f) => ({ ...f, price: v }))}
                placeholder="e.g. 90.00"
                keyboardType="decimal-pad"
              />

              {/* Stock */}
              <Text style={styles.fieldLabel}>Stock *</Text>
              <TextInput
                style={styles.input}
                value={form.stock.toString()}
                onChangeText={(v) => setForm((f) => ({ ...f, stock: v }))}
                placeholder="e.g. 30"
                keyboardType="number-pad"
              />
              {form.stock !== "" && (
                <Text
                  style={[
                    styles.stockHint,
                    parseInt(form.stock) === 0
                      ? styles.stockHintRed
                      : styles.stockHintGreen,
                  ]}
                >
                  {parseInt(form.stock) === 0
                    ? "⚠ Stock is 0 — will show as Not Available"
                    : `✓ ${form.stock} in stock — will show as Available`}
                </Text>
              )}

              {/* Enable / Disable toggle */}
              <Text style={styles.fieldLabel}>Status</Text>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleBtn,
                    form.enabled && styles.toggleBtnActive,
                  ]}
                  onPress={() => setForm((f) => ({ ...f, enabled: true }))}
                >
                  <Text
                    style={[
                      styles.toggleBtnText,
                      form.enabled && styles.toggleBtnTextActive,
                    ]}
                  >
                    ✓ Enabled
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleBtn,
                    !form.enabled && styles.toggleBtnDisabled,
                  ]}
                  onPress={() => setForm((f) => ({ ...f, enabled: false }))}
                >
                  <Text
                    style={[
                      styles.toggleBtnText,
                      !form.enabled && styles.toggleBtnTextDisabled,
                    ]}
                  >
                    ✕ Disabled
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>
                  {editingItem ? "Save Changes" : "Add Item"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ═══════════════ STYLES ═══════════════ */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },

  /* Header */
  header: {
    height: 54,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  hLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  hIcon: { fontSize: 16 },
  hTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  hRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  adminBadge: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  adminBadgeText: { fontSize: 12, color: "#374151", fontWeight: "500" },
  profileBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B7FDB",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 5,
  },
  profileBtnIcon: { fontSize: 13 },
  profileBtnText: { fontSize: 13, color: "#FFF", fontWeight: "600" },
  logoutBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  logoutBtnText: { fontSize: 13, color: "#374151", fontWeight: "500" },

  /* Tabs */
  tabsWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 6,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  tabActive: { backgroundColor: "#6B5FC4" },
  tabIcon: { fontSize: 15 },
  tabLabel: { fontSize: 13, fontWeight: "600", color: "#374151" },
  tabLabelActive: { color: "#FFFFFF" },

  /* Gradient body */
  gradientBody: { flex: 1, backgroundColor: "#7B6FD4" },
  body: { paddingTop: 18, paddingBottom: 40, gap: 14 },

  /* Page title row */
  pageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#2B3FA0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#5B7FDB" },
  addBtn: {
    backgroundColor: "#5B7FDB",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  addBtnText: { color: "#FFF", fontWeight: "600", fontSize: 14 },

  /* Table */
  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#2B3FA0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#5B7FDB",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  th: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  tableRowHover: {
    backgroundColor: "#F5F7FF",
    shadowColor: "#5B7FDB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 1.005 }],
  },
  td: { justifyContent: "center", alignItems: "center" },
  tdText: { fontSize: 14, color: "#1F2937", textAlign: "center" },
  itemImage: { width: 42, height: 42, borderRadius: 8 },
  itemEmoji: { fontSize: 32 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: "600" },
  editBtn: {
    backgroundColor: "#FCD34D",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  editBtnText: { color: "#FFF", fontWeight: "600", fontSize: 13 },
  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  deleteBtnText: { color: "#FFF", fontWeight: "600", fontSize: 13 },
  emptyRow: { padding: 30, alignItems: "center" },
  emptyText: { color: "#9CA3AF", fontSize: 14 },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 24,
    width: "100%",
    maxWidth: 460,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 18,
  },

  /* Image picker */
  imagePicker: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  imagePickerPreview: { width: "100%", height: "100%", resizeMode: "cover" },
  imagePickerPlaceholder: { alignItems: "center", gap: 6 },
  imagePickerEmoji: { fontSize: 32 },
  imagePickerHint: { fontSize: 13, color: "#9CA3AF" },
  removeImageText: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },

  /* Form fields */
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },
  stockHint: { fontSize: 12, marginTop: 5, fontWeight: "500" },
  stockHintGreen: { color: "#059669" },
  stockHintRed: { color: "#DC2626" },

  /* Category chips */
  categoryRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  catChipActive: { backgroundColor: "#5B7FDB", borderColor: "#5B7FDB" },
  catChipText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  catChipTextActive: { color: "#FFF" },

  /* Enable/Disable toggle */
  toggleRow: { flexDirection: "row", gap: 10, marginBottom: 6 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleBtnActive: { backgroundColor: "#D1FAE5", borderColor: "#059669" },
  toggleBtnDisabled: { backgroundColor: "#FEE2E2", borderColor: "#EF4444" },
  toggleBtnText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  toggleBtnTextActive: { color: "#059669" },
  toggleBtnTextDisabled: { color: "#DC2626" },

  /* Modal footer */
  modalFooter: { flexDirection: "row", gap: 10, marginTop: 20 },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  cancelBtnText: { fontSize: 15, fontWeight: "600", color: "#6B7280" },
  saveBtn: {
    flex: 1,
    backgroundColor: "#5B7FDB",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },
  saveBtnText: { fontSize: 15, fontWeight: "600", color: "#FFF" },
});
