// ============================================================================
// Centralized API Types for BuildingOS
// ============================================================================

// Base entity interface
export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Building Types
// ============================================================================
export interface Building extends BaseEntity {
  id: number;
  name: string;
  buildingGroup: string;
  type: "Residential" | "Commercial" | "Amenity";
  floors: number;
  totalFlats: number;
  occupiedFlats: number;
  maintenanceStatus: "Stable" | "Pending Service" | "Critical Warning";
  parkingUtilization: number;
  activeComplaints: number;
  operationalStatus: "Online" | "Degraded" | "Offline";
  waterConsumption: string;
  electricityConsumption: string;
  managers: string[];
  assignedStaff: { name: string; role: string; contact: string }[];
  activity: { id: number; log: string; time: string }[];
  towersBreakdown: { floor: number; occupied: number; total: number }[];
}

// ============================================================================
// Flat Types
// ============================================================================
export interface Flat extends BaseEntity {
  id: number;
  flatNumber: string;
  floor: string;
  buildingName: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  tenantStatus: "Self-Occupied" | "Tenant-Occupied" | "Vacant";
  tenantName?: string;
  tenantPhone?: string;
  tenantEmail?: string;
  occupancyStatus: "Occupied" | "Vacant";
  utilityBalance: number;
  parkingAssignment: string;
  activeComplaints: number;
  rentAmount?: string;
  leaseExpires?: string;
  familyMembers: { name: string; relation: string; age: number }[];
  emergencyContacts: { name: string; relation: string; phone: string }[];
  maintenanceHistory: { id: number; ticket: string; date: string; status: string }[];
}

// ============================================================================
// Resident Types
// ============================================================================
export interface Resident extends BaseEntity {
  id: number;
  name: string;
  flatNumber: string;
  buildingName: string;
  residentType: "Owner" | "Tenant";
  phone: string;
  email: string;
  moveInDate: string;
  outstandingDues: number;
  operationalStatus: "Active" | "Pending Verification" | "Inactive";
  familyMembers: { name: string; relation: string; phone: string }[];
  emergencyContacts: { name: string; relation: string; phone: string }[];
  vehicles: { make: string; model: string; plate: string; slot: string }[];
  documents: { name: string; status: "Verified" | "Pending" | "Missing" }[];
  complaints: { title: string; date: string; status: string }[];
  payments: { item: string; amount: string; date: string; status: string }[];
  gatePasses: { visitorName: string; type: string; date: string }[];
  commsLog: { title: string; date: string; status: string }[];
}

// ============================================================================
// Complaint Types
// ============================================================================
export interface Complaint extends BaseEntity {
  id: string;
  residentName: string;
  flatNumber: string;
  buildingName: string;
  category: "Plumbing" | "Electrical" | "Elevator" | "Facilities" | "Safety" | "HVAC" | "Comms";
  priority: "Critical" | "High" | "Medium" | "Low";
  assignee: string;
  status: "Open" | "In Progress" | "Resolved" | "Escalated";
  createdDate: string;
  slaDeadline: string;
  description: string;
  images: string[];
  timeline: { title: string; desc: string; date: string }[];
  technicianNotes?: string;
  comments: { sender: string; role: string; message: string; time: string }[];
  residentFeedback?: string;
  residentRating?: number;
}

// ============================================================================
// Maintenance Types
// ============================================================================
export interface MaintenanceTask extends BaseEntity {
  id: number;
  title: string;
  building: string;
  category: "Elevator" | "Plumbing" | "Electrical" | "HVAC" | "Structural" | "Landscaping";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Completed" | "On Hold";
  assignedTo: string;
  reportedDate: string;
  dueDate: string;
  estimatedCost: string;
  description: string;
}

// ============================================================================
// Billing/Invoice Types
// ============================================================================
export interface Invoice extends BaseEntity {
  id: string;
  buildingGroup: string;
  buildingName: string;
  flatNumber: string;
  residentName: string;
  ownerName: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  dueDate: string;
  utilityCharges: number;
  maintenanceCharges: number;
  otherCharges: number;
  paymentMethod: string;
}

// ============================================================================
// Payment Types
// ============================================================================
export interface Payment extends BaseEntity {
  id: string;
  invoiceId: string;
  residentName: string;
  flatNumber: string;
  buildingName: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status: "Completed" | "Pending" | "Failed";
  transactionId: string;
}

// ============================================================================
// Parking Types
// ============================================================================
export interface ParkingSlot extends BaseEntity {
  id: string;
  slotNumber: string;
  buildingName: string;
  flatNumber: string;
  residentName: string;
  vehicleType: "Sedan" | "SUV" | "Motorcycle" | "EV Hatchback" | "None";
  vehicleNumber: string;
  category: "Resident" | "Visitor" | "Reserved" | "Staff";
  occupancyStatus: "Occupied" | "Available" | "Reserved" | "Violation";
  paymentStatus: "Paid" | "Pending" | "Unpaid";
  parkingHistory: { vehicleNumber: string; checkIn: string; checkOut: string }[];
  visitorActivity: { visitorName: string; purpose: string; date: string }[];
  securityLogs: { time: string; event: string; guard: string }[];
}

// ============================================================================
// Visitor Types
// ============================================================================
export interface Visitor extends BaseEntity {
  id: string;
  name: string;
  hostName: string;
  flatNumber: string;
  buildingName: string;
  purpose: "Delivery" | "Guest" | "Maintenance" | "Emergency" | "Other";
  entryTime: string;
  exitTime: string;
  status: "Approved" | "Pending" | "Rejected" | "Checked-in";
  verificationStatus: "Verified (OTP)" | "Verified (Manual)" | "Pending" | "Failed";
  vehicleNumber: string;
  timeline: { title: string; time: string; note: string }[];
  incidentNotes?: string;
  securityApprovalLog: string[];
}

// ============================================================================
// Staff Types
// ============================================================================
export interface Staff extends BaseEntity {
  id: string;
  name: string;
  role: "admin" | "manager" | "security" | "maintenance" | "accountant" | "viewer";
  department: string;
  assignedBuilding: string;
  shiftTiming: string;
  activeTasks: number;
  performanceStatus: "Optimal" | "Degraded" | "Warning";
  accessLevel: "Root Level" | "Lobby Access" | "Financial Read" | "Maintenance Log" | "Read Only";
  status: "Active" | "Inactive" | "On Shift" | "Overloaded";
  phone: string;
  email: string;
  taskHistory: { taskName: string; status: "Completed" | "Pending"; date: string }[];
  activityLogs: { action: string; timestamp: string }[];
  permissions: string[];
}

// ============================================================================
// API Response Types
// ============================================================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiFilters {
  search?: string;
  status?: string;
  building?: string;
  category?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: string | undefined;
}

// ============================================================================
// User Profile Types
// ============================================================================
export interface UserProfile extends BaseEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "building_owner" | "flat_owner" | "tenant" | "admin" | "staff";
  avatar?: string;
  address: string;
  identityVerified: boolean;
  taxTIN?: string;
  accountTier: "Enterprise" | "Standard" | "Basic";
  // Building owner specific
  tradeLicense?: string;
  vatBIN?: string;
  managedBuildings?: string[];
  // Flat owner specific
  bankName?: string;
  bankAccount?: string;
  routingNumber?: string;
  ownedFlats?: { unit: string; rent: string; status: string }[];
  // Tenant specific
  nidVerified?: boolean;
  policeVerified?: boolean;
  leaseAgreement?: string;
  rentedFlat?: string;
  leasePeriod?: string;
  landlordName?: string;
  landlordEmail?: string;
}

// ============================================================================
// Settings Types
// ============================================================================
export interface SystemSettings extends BaseEntity {
  id: string;
  // Organization settings
  buildingGroupName: string;
  buildingAddress: string;
  timezone: string;
  // Billing settings
  lateFeeAmount: number;
  billingCycle: "Weekly" | "Monthly" | "Quarterly";
  // Notification settings
  smsAlerts: boolean;
  emailNotifications: boolean;
  // Utility settings
  electricityRate: number;
  waterRate: number;
  // Security settings
  otpVerification: boolean;
  // Integration settings
  stripeApiKey?: string;
  gateWebhookUrl?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface UtilityMeter extends BaseEntity {
  id: string;
  flatNumber: string;
  buildingName: string;
  type: "Electricity" | "Water" | "Gas";
  meterNumber: string;
  lastReading: number;
  currentReading: number;
  lastReadingDate: string;
  status: "Active" | "Suspended" | "Maintenance";
}

export interface UtilityBill extends BaseEntity {
  id: string;
  flatNumber: string;
  buildingName: string;
  type: "Electricity" | "Water" | "Gas";
  amount: number;
  usage: number; // kWh, Liters, or M3
  billingPeriod: string; // e.g. "June 2026"
  dueDate: string;
  status: "Paid" | "Unpaid" | "Overdue";
}

export interface GeneratorLog extends BaseEntity {
  id: string;
  date: string;
  fuelAdded: number; // Liters
  fuelLevel: number; // %
  runHours: number;
  status: "Operational" | "Maintenance Required" | "Refueling";
  notes?: string;
}

// ============================================================================
// Communication Types
// ============================================================================
export interface Announcement extends BaseEntity {
  id: string;
  title: string;
  content: string;
  type: "General" | "Emergency" | "Event";
  targetAudience: "All" | "Tenants" | "Owners";
  author: string;
  date: string;
}

// ============================================================================
// Document Types
// ============================================================================
export interface DocumentRecord extends BaseEntity {
  id: string;
  title: string;
  residentName: string;
  flatNumber: string;
  buildingName: string;
  documentType: "Lease" | "ID Proof" | "NID" | "Utility Bill";
  status: "Verified" | "Pending" | "Missing";
  uploadedAt: string;
  expiresAt?: string;
  downloadUrl?: string;
}

// ============================================================================
// Inventory & Asset Types
// ============================================================================
export interface InventoryAsset extends BaseEntity {
  id: string;
  name: string;
  buildingName: string;
  category: "Equipment" | "Supplies" | "Utility";
  status: "Operational" | "Maintenance Required" | "Decommissioned";
  lastServiced?: string;
  warrantyExpires?: string;
  stockCount: number;
}

// ============================================================================
// Facility Booking Types
// ============================================================================
export interface FacilityBooking extends BaseEntity {
  id: string;
  flatNumber: string;
  buildingName: string;
  residentName: string;
  facilityName: "Community Hall" | "Rooftop Pool" | "Tennis Court" | "Mini Gym";
  bookingDate: string;
  timeSlot: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}



