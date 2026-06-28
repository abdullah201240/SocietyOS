// ============================================================================
// API Client - Centralized Data Access Layer with localStorage Persistence
// Simulates API calls with mock data but persists mutations in localStorage
// ============================================================================

import type {
  Building,
  Flat,
  Resident,
  Complaint,
  MaintenanceTask,
  Invoice,
  Payment,
  ParkingSlot,
  Visitor,
  Staff,
  UserProfile,
  SystemSettings,
  ApiResponse,
  PaginatedResponse,
  ApiFilters,
  UtilityMeter,
  UtilityBill,
  GeneratorLog,
  Announcement,
  DocumentRecord,
  InventoryAsset,
  FacilityBooking
} from './types';

import {
  buildingsData as initialBuildings,
  flatsData as initialFlats,
  residentsData as initialResidents,
  complaintsData as initialComplaints,
  maintenanceData as initialMaintenance,
  invoicesData as initialInvoices,
  paymentsData as initialPayments,
  parkingData as initialParking,
  visitorsData as initialVisitors,
  staffData as initialStaff,
  userProfileData as initialUserProfile,
  systemSettingsData as initialSystemSettings,
  utilityMetersData as initialMeters,
  utilityBillsData as initialBills,
  generatorLogsData as initialGenLogs,
  announcementsData as initialAnnouncements,
  documentRecordsData as initialDocuments,
  inventoryAssetsData as initialInventory,
  facilityBookingsData as initialBookings
} from './data';

// ============================================================================
// Helper Functions & Local Storage Sync
// ============================================================================

const isClient = typeof window !== 'undefined';

function loadDb<T>(key: string, initialData: T): T {
  if (!isClient) return initialData;
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialData;
  }
}

function saveDb<T>(key: string, data: T) {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Memory database states
const buildingsData = loadDb<Building[]>('buildingos_db_buildings', initialBuildings);
const flatsData = loadDb<Flat[]>('buildingos_db_flats', initialFlats);
const residentsData = loadDb<Resident[]>('buildingos_db_residents', initialResidents);
const complaintsData = loadDb<Complaint[]>('buildingos_db_complaints', initialComplaints);
const maintenanceData = loadDb<MaintenanceTask[]>('buildingos_db_maintenance', initialMaintenance);
const invoicesData = loadDb<Invoice[]>('buildingos_db_invoices', initialInvoices);
const paymentsData = loadDb<Payment[]>('buildingos_db_payments', initialPayments);
const parkingData = loadDb<ParkingSlot[]>('buildingos_db_parking', initialParking);
const visitorsData = loadDb<Visitor[]>('buildingos_db_visitors', initialVisitors);
const staffData = loadDb<Staff[]>('buildingos_db_staff', initialStaff);
const userProfileData = loadDb<UserProfile>('buildingos_db_userprofile', initialUserProfile);
const systemSettingsData = loadDb<SystemSettings>('buildingos_db_settings', initialSystemSettings);
const utilityMetersData = loadDb<UtilityMeter[]>('buildingos_db_utility_meters', initialMeters);
const utilityBillsData = loadDb<UtilityBill[]>('buildingos_db_utility_bills', initialBills);
const generatorLogsData = loadDb<GeneratorLog[]>('buildingos_db_generator_logs', initialGenLogs);
const announcementsData = loadDb<Announcement[]>('buildingos_db_announcements', initialAnnouncements);
const documentRecordsData = loadDb<DocumentRecord[]>('buildingos_db_documents', initialDocuments);
const inventoryAssetsData = loadDb<InventoryAsset[]>('buildingos_db_inventory', initialInventory);
const facilityBookingsData = loadDb<FacilityBooking[]>('buildingos_db_bookings', initialBookings);

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Deep clone data to avoid mutations
const cloneData = <T>(data: T): T => JSON.parse(JSON.stringify(data));

// Apply filters to data array
const applyFilters = <T extends Record<string, any>>(
  data: T[],
  filters: ApiFilters = {}
): T[] => {
  let filtered = [...data];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchLower)
      )
    );
  }

  if (filters.status) {
    filtered = filtered.filter(item => item.status === filters.status);
  }

  if (filters.building) {
    filtered = filtered.filter(item =>
      item.buildingName === filters.building ||
      item.building === filters.building
    );
  }

  if (filters.category) {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  if (filters.priority) {
    filtered = filtered.filter(item => item.priority === filters.priority);
  }

  return filtered;
};

// ============================================================================
// Buildings API
// ============================================================================
export const buildingsApi = {
  getAll: async (): Promise<ApiResponse<Building[]>> => {
    await delay();
    return { success: true, data: cloneData(buildingsData) };
  },

  getById: async (id: number): Promise<ApiResponse<Building>> => {
    await delay();
    const building = buildingsData.find(b => b.id === id);
    if (!building) {
      return { success: false, data: null as any, error: 'Building not found' };
    }
    return { success: true, data: cloneData(building) };
  },

  create: async (data: Omit<Building, 'id'>): Promise<ApiResponse<Building>> => {
    await delay();
    const nextId = buildingsData.length > 0 ? Math.max(...buildingsData.map(b => b.id)) + 1 : 1;
    const newBuilding = {
      ...data,
      id: nextId
    };
    buildingsData.push(newBuilding);
    saveDb('buildingos_db_buildings', buildingsData);
    return { success: true, data: cloneData(newBuilding), message: 'Building created' };
  },

  update: async (id: number, data: Partial<Building>): Promise<ApiResponse<Building>> => {
    await delay();
    const index = buildingsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Building not found' };
    }
    buildingsData[index] = { ...buildingsData[index], ...data };
    saveDb('buildingos_db_buildings', buildingsData);
    return { success: true, data: cloneData(buildingsData[index]), message: 'Building updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = buildingsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Building not found' };
    }
    buildingsData.splice(index, 1);
    saveDb('buildingos_db_buildings', buildingsData);
    return { success: true, data: undefined, message: 'Building deleted' };
  }
};

// ============================================================================
// Flats API
// ============================================================================
export const flatsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Flat>>> => {
    await delay();
    let filtered = cloneData(flatsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: number): Promise<ApiResponse<Flat>> => {
    await delay();
    const flat = flatsData.find(f => f.id === id);
    if (!flat) {
      return { success: false, data: null as any, error: 'Flat not found' };
    }
    return { success: true, data: cloneData(flat) };
  },

  create: async (data: Omit<Flat, 'id'>): Promise<ApiResponse<Flat>> => {
    await delay();
    const nextId = flatsData.length > 0 ? Math.max(...flatsData.map(f => f.id)) + 1 : 1;
    const newFlat = {
      ...data,
      id: nextId
    };
    flatsData.push(newFlat);
    saveDb('buildingos_db_flats', flatsData);
    return { success: true, data: cloneData(newFlat), message: 'Flat created' };
  },

  update: async (id: number, data: Partial<Flat>): Promise<ApiResponse<Flat>> => {
    await delay();
    const index = flatsData.findIndex(f => f.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Flat not found' };
    }
    flatsData[index] = { ...flatsData[index], ...data };
    saveDb('buildingos_db_flats', flatsData);
    return { success: true, data: cloneData(flatsData[index]), message: 'Flat updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = flatsData.findIndex(f => f.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Flat not found' };
    }
    flatsData.splice(index, 1);
    saveDb('buildingos_db_flats', flatsData);
    return { success: true, data: undefined, message: 'Flat deleted' };
  }
};

// ============================================================================
// Residents API
// ============================================================================
export const residentsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Resident>>> => {
    await delay();
    let filtered = cloneData(residentsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: number): Promise<ApiResponse<Resident>> => {
    await delay();
    const resident = residentsData.find(r => r.id === id);
    if (!resident) {
      return { success: false, data: null as any, error: 'Resident not found' };
    }
    return { success: true, data: cloneData(resident) };
  },

  create: async (data: Omit<Resident, 'id'>): Promise<ApiResponse<Resident>> => {
    await delay();
    const nextId = residentsData.length > 0 ? Math.max(...residentsData.map(r => r.id)) + 1 : 1;
    const newResident = {
      ...data,
      id: nextId
    };
    residentsData.push(newResident);
    saveDb('buildingos_db_residents', residentsData);
    return { success: true, data: cloneData(newResident), message: 'Resident created' };
  },

  update: async (id: number, data: Partial<Resident>): Promise<ApiResponse<Resident>> => {
    await delay();
    const index = residentsData.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Resident not found' };
    }
    residentsData[index] = { ...residentsData[index], ...data };
    saveDb('buildingos_db_residents', residentsData);
    return { success: true, data: cloneData(residentsData[index]), message: 'Resident updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = residentsData.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Resident not found' };
    }
    residentsData.splice(index, 1);
    saveDb('buildingos_db_residents', residentsData);
    return { success: true, data: undefined, message: 'Resident deleted' };
  }
};

// ============================================================================
// Complaints API
// ============================================================================
export const complaintsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Complaint>>> => {
    await delay();
    let filtered = cloneData(complaintsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Complaint>> => {
    await delay();
    const complaint = complaintsData.find(c => c.id === id);
    if (!complaint) {
      return { success: false, data: null as any, error: 'Complaint not found' };
    }
    return { success: true, data: cloneData(complaint) };
  },

  create: async (data: Omit<Complaint, 'id'>): Promise<ApiResponse<Complaint>> => {
    await delay();
    const newId = `T-${1000 + complaintsData.length + 1}`;
    const newComplaint = { ...data, id: newId };
    complaintsData.unshift(newComplaint);
    saveDb('buildingos_db_complaints', complaintsData);
    return { success: true, data: cloneData(newComplaint), message: 'Complaint created' };
  },

  update: async (id: string, data: Partial<Complaint>): Promise<ApiResponse<Complaint>> => {
    await delay();
    const index = complaintsData.findIndex(c => c.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Complaint not found' };
    }
    complaintsData[index] = { ...complaintsData[index], ...data };
    saveDb('buildingos_db_complaints', complaintsData);
    return { success: true, data: cloneData(complaintsData[index]), message: 'Complaint updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = complaintsData.findIndex(c => c.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Complaint not found' };
    }
    complaintsData.splice(index, 1);
    saveDb('buildingos_db_complaints', complaintsData);
    return { success: true, data: undefined, message: 'Complaint deleted' };
  },

  addComment: async (
    complaintId: string,
    comment: { sender: string; role: string; message: string; time: string }
  ): Promise<ApiResponse<Complaint>> => {
    await delay();
    const index = complaintsData.findIndex(c => c.id === complaintId);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Complaint not found' };
    }
    complaintsData[index].comments.push(comment);
    saveDb('buildingos_db_complaints', complaintsData);
    return {
      success: true,
      data: cloneData(complaintsData[index]),
      message: 'Comment added'
    };
  }
};

// ============================================================================
// Maintenance API
// ============================================================================
export const maintenanceApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<MaintenanceTask>>> => {
    await delay();
    let filtered = cloneData(maintenanceData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: number): Promise<ApiResponse<MaintenanceTask>> => {
    await delay();
    const task = maintenanceData.find(t => t.id === id);
    if (!task) {
      return { success: false, data: null as any, error: 'Task not found' };
    }
    return { success: true, data: cloneData(task) };
  },

  create: async (data: Omit<MaintenanceTask, 'id'>): Promise<ApiResponse<MaintenanceTask>> => {
    await delay();
    const nextId = maintenanceData.length > 0 ? Math.max(...maintenanceData.map(t => t.id)) + 1 : 1;
    const newTask = {
      ...data,
      id: nextId
    };
    maintenanceData.push(newTask);
    saveDb('buildingos_db_maintenance', maintenanceData);
    return { success: true, data: cloneData(newTask), message: 'Task created' };
  },

  update: async (id: number, data: Partial<MaintenanceTask>): Promise<ApiResponse<MaintenanceTask>> => {
    await delay();
    const index = maintenanceData.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Task not found' };
    }
    maintenanceData[index] = { ...maintenanceData[index], ...data };
    saveDb('buildingos_db_maintenance', maintenanceData);
    return { success: true, data: cloneData(maintenanceData[index]), message: 'Task updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = maintenanceData.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Task not found' };
    }
    maintenanceData.splice(index, 1);
    saveDb('buildingos_db_maintenance', maintenanceData);
    return { success: true, data: undefined, message: 'Task deleted' };
  }
};

// ============================================================================
// Invoices API
// ============================================================================
export const invoicesApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Invoice>>> => {
    await delay();
    let filtered = cloneData(invoicesData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Invoice>> => {
    await delay();
    const invoice = invoicesData.find(i => i.id === id);
    if (!invoice) {
      return { success: false, data: null as any, error: 'Invoice not found' };
    }
    return { success: true, data: cloneData(invoice) };
  },

  create: async (data: Omit<Invoice, 'id'>): Promise<ApiResponse<Invoice>> => {
    await delay();
    const newId = `INV-${9000 + invoicesData.length + 1}`;
    const newInvoice = { ...data, id: newId };
    invoicesData.push(newInvoice);
    saveDb('buildingos_db_invoices', invoicesData);
    return { success: true, data: cloneData(newInvoice), message: 'Invoice created' };
  },

  update: async (id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    await delay();
    const index = invoicesData.findIndex(i => i.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Invoice not found' };
    }
    invoicesData[index] = { ...invoicesData[index], ...data };
    saveDb('buildingos_db_invoices', invoicesData);
    return { success: true, data: cloneData(invoicesData[index]), message: 'Invoice updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = invoicesData.findIndex(i => i.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Invoice not found' };
    }
    invoicesData.splice(index, 1);
    saveDb('buildingos_db_invoices', invoicesData);
    return { success: true, data: undefined, message: 'Invoice deleted' };
  }
};

// ============================================================================
// Payments API
// ============================================================================
export const paymentsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Payment>>> => {
    await delay();
    let filtered = cloneData(paymentsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Payment>> => {
    await delay();
    const payment = paymentsData.find(p => p.id === id);
    if (!payment) {
      return { success: false, data: null as any, error: 'Payment not found' };
    }
    return { success: true, data: cloneData(payment) };
  },

  create: async (data: Omit<Payment, 'id'>): Promise<ApiResponse<Payment>> => {
    await delay();
    const newId = `PAY-${5000 + paymentsData.length + 1}`;
    const newPayment = { ...data, id: newId };
    paymentsData.push(newPayment);
    saveDb('buildingos_db_payments', paymentsData);
    return { success: true, data: cloneData(newPayment), message: 'Payment created' };
  }
};

// ============================================================================
// Parking API
// ============================================================================
export const parkingApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<ParkingSlot>>> => {
    await delay();
    let filtered = cloneData(parkingData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<ParkingSlot>> => {
    await delay();
    const slot = parkingData.find(s => s.id === id);
    if (!slot) {
      return { success: false, data: null as any, error: 'Slot not found' };
    }
    return { success: true, data: cloneData(slot) };
  },

  update: async (id: string, data: Partial<ParkingSlot>): Promise<ApiResponse<ParkingSlot>> => {
    await delay();
    const index = parkingData.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Slot not found' };
    }
    parkingData[index] = { ...parkingData[index], ...data };
    saveDb('buildingos_db_parking', parkingData);
    return { success: true, data: cloneData(parkingData[index]), message: 'Slot updated' };
  }
};

// ============================================================================
// Visitors API
// ============================================================================
export const visitorsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Visitor>>> => {
    await delay();
    let filtered = cloneData(visitorsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Visitor>> => {
    await delay();
    const visitor = visitorsData.find(v => v.id === id);
    if (!visitor) {
      return { success: false, data: null as any, error: 'Visitor not found' };
    }
    return { success: true, data: cloneData(visitor) };
  },

  create: async (data: Omit<Visitor, 'id'>): Promise<ApiResponse<Visitor>> => {
    await delay();
    const newId = `VIS-${1000 + visitorsData.length + 1}`;
    const newVisitor = { ...data, id: newId };
    visitorsData.unshift(newVisitor);
    saveDb('buildingos_db_visitors', visitorsData);
    return { success: true, data: cloneData(newVisitor), message: 'Visitor created' };
  },

  update: async (id: string, data: Partial<Visitor>): Promise<ApiResponse<Visitor>> => {
    await delay();
    const index = visitorsData.findIndex(v => v.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Visitor not found' };
    }
    visitorsData[index] = { ...visitorsData[index], ...data };
    saveDb('buildingos_db_visitors', visitorsData);
    return { success: true, data: cloneData(visitorsData[index]), message: 'Visitor updated' };
  }
};

// ============================================================================
// Staff API
// ============================================================================
export const staffApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Staff>>> => {
    await delay();
    let filtered = cloneData(staffData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Staff>> => {
    await delay();
    const staff = staffData.find(s => s.id === id);
    if (!staff) {
      return { success: false, data: null as any, error: 'Staff not found' };
    }
    return { success: true, data: cloneData(staff) };
  },

  create: async (data: Omit<Staff, 'id'>): Promise<ApiResponse<Staff>> => {
    await delay();
    const newId = `STF-${100 + staffData.length + 1}`;
    const newStaff = { ...data, id: newId };
    staffData.push(newStaff);
    saveDb('buildingos_db_staff', staffData);
    return { success: true, data: cloneData(newStaff), message: 'Staff created' };
  },

  update: async (id: string, data: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    await delay();
    const index = staffData.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Staff not found' };
    }
    staffData[index] = { ...staffData[index], ...data };
    saveDb('buildingos_db_staff', staffData);
    return { success: true, data: cloneData(staffData[index]), message: 'Staff updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = staffData.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Staff not found' };
    }
    staffData.splice(index, 1);
    saveDb('buildingos_db_staff', staffData);
    return { success: true, data: undefined, message: 'Staff deleted' };
  }
};

// ============================================================================
// User Profile API
// ============================================================================
export const userProfileApi = {
  get: async (): Promise<ApiResponse<UserProfile>> => {
    await delay();
    return { success: true, data: cloneData(userProfileData) };
  },

  update: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    await delay();
    Object.assign(userProfileData, data, { updatedAt: new Date().toISOString() });
    saveDb('buildingos_db_userprofile', userProfileData);
    return { success: true, data: cloneData(userProfileData), message: 'Profile updated' };
  }
};

// ============================================================================
// System Settings API
// ============================================================================
export const systemSettingsApi = {
  get: async (): Promise<ApiResponse<SystemSettings>> => {
    await delay();
    return { success: true, data: cloneData(systemSettingsData) };
  },

  update: async (data: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> => {
    await delay();
    Object.assign(systemSettingsData, data, { updatedAt: new Date().toISOString() });
    saveDb('buildingos_db_settings', systemSettingsData);
    return { success: true, data: cloneData(systemSettingsData), message: 'Settings updated' };
  }
};

// ============================================================================
// Utilities API
// ============================================================================
export const utilitiesApi = {
  getAllMeters: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<UtilityMeter>>> => {
    await delay();
    let filtered = cloneData(utilityMetersData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getAllBills: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<UtilityBill>>> => {
    await delay();
    let filtered = cloneData(utilityBillsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  getAllGeneratorLogs: async (): Promise<ApiResponse<GeneratorLog[]>> => {
    await delay();
    return { success: true, data: cloneData(generatorLogsData) };
  },

  createMeter: async (data: Omit<UtilityMeter, 'id'>): Promise<ApiResponse<UtilityMeter>> => {
    await delay();
    const newId = `MTR-${100 + utilityMetersData.length + 1}`;
    const newMeter = {
      ...data,
      id: newId
    };
    utilityMetersData.push(newMeter);
    saveDb('buildingos_db_utility_meters', utilityMetersData);
    return { success: true, data: cloneData(newMeter), message: 'Meter registered successfully' };
  },

  recordReading: async (id: string, currentReading: number): Promise<ApiResponse<UtilityMeter>> => {
    await delay();
    const index = utilityMetersData.findIndex(m => m.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Meter not found' };
    }
    const meter = utilityMetersData[index];
    
    // Copy current reading to last reading, set new current reading
    meter.lastReading = meter.currentReading;
    meter.currentReading = currentReading;
    meter.lastReadingDate = new Date().toISOString();
    meter.updatedAt = new Date().toISOString();

    saveDb('buildingos_db_utility_meters', utilityMetersData);
    return { success: true, data: cloneData(meter), message: 'Reading recorded successfully' };
  },

  generateBills: async (billingPeriod: string): Promise<ApiResponse<UtilityBill[]>> => {
    await delay();
    const rateElectricity = systemSettingsData.electricityRate || 0.20;
    const rateWater = systemSettingsData.waterRate || 0.029;
    const rateGas = 1.00; // Flat rate per unit of gas

    const generatedBills: UtilityBill[] = [];

    utilityMetersData.forEach(meter => {
      // Avoid duplicate bills for same period
      const exists = utilityBillsData.some(b => b.flatNumber === meter.flatNumber && b.type === meter.type && b.billingPeriod === billingPeriod);
      if (exists) return;

      const usage = Math.max(0, meter.currentReading - meter.lastReading);
      if (usage === 0) return;

      let rate = 1.0;
      if (meter.type === "Electricity") rate = rateElectricity;
      else if (meter.type === "Water") rate = rateWater;
      else if (meter.type === "Gas") rate = rateGas;

      const amount = Number((usage * rate).toFixed(2));
      const newBill: UtilityBill = {
        id: `UB-${800 + utilityBillsData.length + generatedBills.length + 1}`,
        flatNumber: meter.flatNumber,
        buildingName: meter.buildingName,
        type: meter.type,
        amount,
        usage,
        billingPeriod,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days due date
        status: "Unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      generatedBills.push(newBill);
    });

    if (generatedBills.length > 0) {
      utilityBillsData.push(...generatedBills);
      saveDb('buildingos_db_utility_bills', utilityBillsData);
    }

    return { success: true, data: cloneData(generatedBills), message: `${generatedBills.length} utility bills generated` };
  },

  updateBillStatus: async (id: string, status: "Paid" | "Unpaid" | "Overdue"): Promise<ApiResponse<UtilityBill>> => {
    await delay();
    const index = utilityBillsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Bill not found' };
    }
    utilityBillsData[index].status = status;
    utilityBillsData[index].updatedAt = new Date().toISOString();
    saveDb('buildingos_db_utility_bills', utilityBillsData);
    return { success: true, data: cloneData(utilityBillsData[index]), message: 'Bill status updated' };
  },

  createGeneratorLog: async (data: Omit<GeneratorLog, 'id'>): Promise<ApiResponse<GeneratorLog>> => {
    await delay();
    const newId = `GEN-${500 + generatorLogsData.length + 1}`;
    const newLog = {
      ...data,
      id: newId
    };
    generatorLogsData.unshift(newLog);
    saveDb('buildingos_db_generator_logs', generatorLogsData);
    return { success: true, data: cloneData(newLog), message: 'Generator event logged' };
  }
};

// ============================================================================
// Communications API
// ============================================================================
export const communicationsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<Announcement>>> => {
    await delay();
    let filtered = cloneData(announcementsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  create: async (data: Omit<Announcement, 'id'>): Promise<ApiResponse<Announcement>> => {
    await delay();
    const newId = `ANN-${300 + announcementsData.length + 1}`;
    const newAnn = { ...data, id: newId };
    announcementsData.unshift(newAnn);
    saveDb('buildingos_db_announcements', announcementsData);
    return { success: true, data: cloneData(newAnn), message: 'Announcement broadcasted successfully' };
  }
};

// ============================================================================
// Documents API
// ============================================================================
export const documentsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<DocumentRecord>>> => {
    await delay();
    let filtered = cloneData(documentRecordsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  create: async (data: Omit<DocumentRecord, 'id'>): Promise<ApiResponse<DocumentRecord>> => {
    await delay();
    const newId = `DOC-${200 + documentRecordsData.length + 1}`;
    const newDoc = { ...data, id: newId };
    documentRecordsData.unshift(newDoc);
    saveDb('buildingos_db_documents', documentRecordsData);
    return { success: true, data: cloneData(newDoc), message: 'Document uploaded successfully' };
  },

  verify: async (id: string, status: "Verified" | "Pending" | "Missing"): Promise<ApiResponse<DocumentRecord>> => {
    await delay();
    const index = documentRecordsData.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Document not found' };
    }
    documentRecordsData[index].status = status;
    documentRecordsData[index].updatedAt = new Date().toISOString();
    saveDb('buildingos_db_documents', documentRecordsData);
    return { success: true, data: cloneData(documentRecordsData[index]), message: `Document marked as ${status}` };
  }
};

// ============================================================================
// Inventory & Asset API
// ============================================================================
export const inventoryApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<InventoryAsset>>> => {
    await delay();
    let filtered = cloneData(inventoryAssetsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  create: async (data: Omit<InventoryAsset, 'id'>): Promise<ApiResponse<InventoryAsset>> => {
    await delay();
    const newId = `AST-${700 + inventoryAssetsData.length + 1}`;
    const newAsset = { ...data, id: newId };
    inventoryAssetsData.unshift(newAsset);
    saveDb('buildingos_db_inventory', inventoryAssetsData);
    return { success: true, data: cloneData(newAsset), message: 'Asset registered successfully' };
  },

  updateStatus: async (id: string, status: "Operational" | "Maintenance Required" | "Decommissioned"): Promise<ApiResponse<InventoryAsset>> => {
    await delay();
    const index = inventoryAssetsData.findIndex(a => a.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Asset not found' };
    }
    inventoryAssetsData[index].status = status;
    inventoryAssetsData[index].updatedAt = new Date().toISOString();
    saveDb('buildingos_db_inventory', inventoryAssetsData);
    return { success: true, data: cloneData(inventoryAssetsData[index]), message: 'Asset status updated' };
  }
};

// ============================================================================
// Facility Bookings API
// ============================================================================
export const bookingsApi = {
  getAll: async (filters?: ApiFilters): Promise<ApiResponse<PaginatedResponse<FacilityBooking>>> => {
    await delay();
    let filtered = cloneData(facilityBookingsData);
    if (filters) {
      filtered = applyFilters(filtered, filters);
    }
    return {
      success: true,
      data: {
        data: filtered.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()),
        total: filtered.length,
        page: 1,
        limit: 100,
        totalPages: 1
      }
    };
  },

  create: async (data: Omit<FacilityBooking, 'id'>): Promise<ApiResponse<FacilityBooking>> => {
    await delay();
    const newId = `BKG-${900 + facilityBookingsData.length + 1}`;
    const newBooking = { ...data, id: newId };
    facilityBookingsData.unshift(newBooking);
    saveDb('buildingos_db_bookings', facilityBookingsData);
    return { success: true, data: cloneData(newBooking), message: 'Facility booking reserved' };
  },

  updateStatus: async (id: string, status: "Confirmed" | "Pending" | "Cancelled"): Promise<ApiResponse<FacilityBooking>> => {
    await delay();
    const index = facilityBookingsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Booking not found' };
    }
    facilityBookingsData[index].status = status;
    facilityBookingsData[index].updatedAt = new Date().toISOString();
    saveDb('buildingos_db_bookings', facilityBookingsData);
    return { success: true, data: cloneData(facilityBookingsData[index]), message: `Booking marked as ${status}` };
  }
};

