// ============================================================================
// API Client - Centralized Data Access Layer
// Simulates API calls with mock data (replace with real API endpoints later)
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
  ApiFilters
} from './types';

import {
  buildingsData,
  flatsData,
  residentsData,
  complaintsData,
  maintenanceData,
  invoicesData,
  paymentsData,
  parkingData,
  visitorsData,
  staffData,
  userProfileData,
  systemSettingsData
} from './data';

// ============================================================================
// Helper Functions
// ============================================================================

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
    const newBuilding = {
      ...data,
      id: Math.max(...buildingsData.map(b => b.id)) + 1
    };
    buildingsData.push(newBuilding);
    return { success: true, data: cloneData(newBuilding), message: 'Building created' };
  },

  update: async (id: number, data: Partial<Building>): Promise<ApiResponse<Building>> => {
    await delay();
    const index = buildingsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Building not found' };
    }
    buildingsData[index] = { ...buildingsData[index], ...data };
    return { success: true, data: cloneData(buildingsData[index]), message: 'Building updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = buildingsData.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Building not found' };
    }
    buildingsData.splice(index, 1);
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
    const newFlat = {
      ...data,
      id: Math.max(...flatsData.map(f => f.id)) + 1
    };
    flatsData.push(newFlat);
    return { success: true, data: cloneData(newFlat), message: 'Flat created' };
  },

  update: async (id: number, data: Partial<Flat>): Promise<ApiResponse<Flat>> => {
    await delay();
    const index = flatsData.findIndex(f => f.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Flat not found' };
    }
    flatsData[index] = { ...flatsData[index], ...data };
    return { success: true, data: cloneData(flatsData[index]), message: 'Flat updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = flatsData.findIndex(f => f.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Flat not found' };
    }
    flatsData.splice(index, 1);
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
    const newResident = {
      ...data,
      id: Math.max(...residentsData.map(r => r.id)) + 1
    };
    residentsData.push(newResident);
    return { success: true, data: cloneData(newResident), message: 'Resident created' };
  },

  update: async (id: number, data: Partial<Resident>): Promise<ApiResponse<Resident>> => {
    await delay();
    const index = residentsData.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Resident not found' };
    }
    residentsData[index] = { ...residentsData[index], ...data };
    return { success: true, data: cloneData(residentsData[index]), message: 'Resident updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = residentsData.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Resident not found' };
    }
    residentsData.splice(index, 1);
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
    return { success: true, data: cloneData(newComplaint), message: 'Complaint created' };
  },

  update: async (id: string, data: Partial<Complaint>): Promise<ApiResponse<Complaint>> => {
    await delay();
    const index = complaintsData.findIndex(c => c.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Complaint not found' };
    }
    complaintsData[index] = { ...complaintsData[index], ...data };
    return { success: true, data: cloneData(complaintsData[index]), message: 'Complaint updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = complaintsData.findIndex(c => c.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Complaint not found' };
    }
    complaintsData.splice(index, 1);
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
    const newTask = {
      ...data,
      id: Math.max(...maintenanceData.map(t => t.id)) + 1
    };
    maintenanceData.push(newTask);
    return { success: true, data: cloneData(newTask), message: 'Task created' };
  },

  update: async (id: number, data: Partial<MaintenanceTask>): Promise<ApiResponse<MaintenanceTask>> => {
    await delay();
    const index = maintenanceData.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Task not found' };
    }
    maintenanceData[index] = { ...maintenanceData[index], ...data };
    return { success: true, data: cloneData(maintenanceData[index]), message: 'Task updated' };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay();
    const index = maintenanceData.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Task not found' };
    }
    maintenanceData.splice(index, 1);
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
    return { success: true, data: cloneData(newInvoice), message: 'Invoice created' };
  },

  update: async (id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    await delay();
    const index = invoicesData.findIndex(i => i.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Invoice not found' };
    }
    invoicesData[index] = { ...invoicesData[index], ...data };
    return { success: true, data: cloneData(invoicesData[index]), message: 'Invoice updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = invoicesData.findIndex(i => i.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Invoice not found' };
    }
    invoicesData.splice(index, 1);
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
    return { success: true, data: cloneData(newVisitor), message: 'Visitor created' };
  },

  update: async (id: string, data: Partial<Visitor>): Promise<ApiResponse<Visitor>> => {
    await delay();
    const index = visitorsData.findIndex(v => v.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Visitor not found' };
    }
    visitorsData[index] = { ...visitorsData[index], ...data };
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
    return { success: true, data: cloneData(newStaff), message: 'Staff created' };
  },

  update: async (id: string, data: Partial<Staff>): Promise<ApiResponse<Staff>> => {
    await delay();
    const index = staffData.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, data: null as any, error: 'Staff not found' };
    }
    staffData[index] = { ...staffData[index], ...data };
    return { success: true, data: cloneData(staffData[index]), message: 'Staff updated' };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    const index = staffData.findIndex(s => s.id === id);
    if (index === -1) {
      return { success: false, data: undefined, error: 'Staff not found' };
    }
    staffData.splice(index, 1);
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
    return { success: true, data: cloneData(systemSettingsData), message: 'Settings updated' };
  }
};
