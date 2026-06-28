import { z } from "zod";

/**
 * Helper to validate data using a Zod schema.
 * Returns either the parsed data or a formatted error message string.
 */
export function validateData<T>(
  schema: z.Schema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  // Extract first error message
  const errorMsg = result.error.issues[0]?.message || "Invalid input data";
  return { success: false, error: errorMsg };
}

// 1. Signup Schema
export const signupSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["building_owner", "flat_owner", "tenant"]),
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the Terms of Service"),
});

// 2. Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// 3. Book Demo Schema
export const bookDemoSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid work email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  property: z.string().min(2, "Property/Company name must be at least 2 characters"),
  size: z.string(),
  interest: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)) && val.trim() !== "", "Preferred Date is required"),
  timeSlot: z.string(),
});

// 4. Profile Schema
export const profileSchema = z.object({
  name: z.string().min(2, "Display Name must be at least 2 characters"),
  phone: z.string().min(6, "Contact number must be at least 6 characters"),
});

// 5. Billing (Invoice) Schema
export const invoiceSchema = z.object({
  buildingGroup: z.string(),
  buildingName: z.string(),
  flatNumber: z.string().min(1, "Flat unit number is required"),
  residentName: z.string().optional(),
  ownerName: z.string().optional(),
  amount: z.coerce.number({ message: "Amount must be a valid number" }).positive("Invoice amount must be greater than zero"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)) && val.trim() !== "", "Please choose a valid due date"),
  utilityCharges: z.coerce.number({ message: "Utility charges must be a valid number" }).min(0, "Utility charges cannot be negative"),
  maintenanceCharges: z.coerce.number({ message: "Maintenance charges must be a valid number" }).min(0, "Maintenance charges cannot be negative"),
});

// 6. Add Building Schema
export const buildingSchema = z.object({
  name: z.string().min(2, "Building name must be at least 2 characters"),
  buildingGroup: z.string(),
  type: z.enum(["Residential", "Commercial", "Amenity"]),
  floors: z.coerce.number({ message: "Floors must be a valid number" }).positive("Floors must be greater than zero"),
  totalFlats: z.coerce.number({ message: "Total flats must be a valid number" }).positive("Total flats must be greater than zero"),
  occupiedFlats: z.coerce.number({ message: "Occupied flats must be a valid number" }).min(0, "Occupied flats cannot be negative"),
  maintenanceStatus: z.enum(["Stable", "Pending Service", "Critical Warning"]),
  parkingUtilization: z.coerce.number({ message: "Parking utilization must be a valid number" }).min(0).max(100, "Parking utilization must be between 0 and 100"),
  operationalStatus: z.enum(["Online", "Degraded", "Offline"]),
});

// 7. Add Flat Schema
export const flatSchema = z.object({
  flatNumber: z.string().min(1, "Flat number is required"),
  floor: z.string(),
  buildingName: z.string(),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  ownerPhone: z.string().min(6, "Owner phone number must be at least 6 characters"),
  ownerEmail: z.string().email("Invalid owner email address"),
  tenantStatus: z.enum(["Self-Occupied", "Tenant-Occupied", "Vacant"]),
  parkingAssignment: z.string(),
  utilityBalance: z.coerce.number({ message: "Utility balance must be a number" }).min(0, "Utility balance cannot be negative"),
});

// 8. Add Resident Schema
export const residentSchema = z.object({
  name: z.string().min(2, "Resident name must be at least 2 characters"),
  flatNumber: z.string().min(1, "Flat number is required"),
  buildingName: z.string(),
  residentType: z.enum(["Owner", "Tenant"]),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  outstandingDues: z.coerce.number({ message: "Outstanding dues must be a number" }).min(0, "Outstanding dues cannot be negative"),
  operationalStatus: z.enum(["Active", "Pending Verification", "Inactive"]),
});

// 9. Add Staff Schema
export const staffSchema = z.object({
  name: z.string().min(2, "Staff name must be at least 2 characters"),
  role: z.enum(["admin", "security", "maintenance", "billing", "utility"]),
  department: z.string().min(2, "Department must be at least 2 characters"),
  assignedBuilding: z.string(),
  shiftTiming: z.string(),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  accessLevel: z.enum(["Full Access", "Maintenance Log", "Billing Portal", "Gate Terminal"]),
});

// 10. Assign Parking Slot Schema
export const parkingSchema = z.object({
  slotNumber: z.string().min(1, "Slot number is required"),
  buildingName: z.string(),
  flatNumber: z.string().optional(),
  residentName: z.string().optional(),
  vehicleType: z.enum(["Sedan", "SUV", "Motorcycle", "Bicycle", "Other"]),
  vehicleNumber: z.string().optional(),
  category: z.enum(["Resident", "Visitor", "Reserved", "Staff"]),
  occupancyStatus: z.enum(["Vacant", "Occupied", "Reserved"]),
});

// 11. Pre-Approve Visitor Schema
export const visitorSchema = z.object({
  name: z.string().min(2, "Visitor name must be at least 2 characters"),
  hostName: z.string().min(2, "Host resident name must be at least 2 characters"),
  flatNumber: z.string().min(1, "Flat unit number is required"),
  buildingName: z.string(),
  purpose: z.enum(["Guest", "Delivery", "Service", "Other"]),
  vehicleNumber: z.string().optional(),
});

// 12. Create Ticket (Complaint) Schema
export const complaintSchema = z.object({
  category: z.enum(["Plumbing", "Electrical", "Elevator", "Facilities", "Safety", "HVAC", "Comms"]),
  description: z.string().min(5, "Problem description must be at least 5 characters"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  buildingName: z.string(),
  flatNumber: z.string(),
  residentName: z.string(),
  assignee: z.string().optional(),
});

// 13. Add Comment Schema
export const commentSchema = z.object({
  message: z.string().min(1, "Comment message cannot be empty"),
});

// 14. Quick Actions - Raise Ticket
export const quickComplaintSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  flat: z.string().min(1, "Unit/Area is required"),
  desc: z.string().min(5, "Description must be at least 5 characters"),
});

// 15. Quick Actions - Add Resident
export const quickResidentSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  flat: z.string().min(1, "Flat Unit is required"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
});

// 16. Quick Actions - Bill Dues
export const quickInvoiceSchema = z.object({
  flat: z.string().min(1, "Flat Unit is required"),
  amount: z.coerce.number({ message: "Amount must be a valid number" }).positive("Billing amount must be greater than zero"),
  desc: z.string().min(3, "Details must be at least 3 characters"),
});

// 17. Quick Actions - Send Notice
export const quickNoticeSchema = z.object({
  title: z.string().min(2, "Announcement headline must be at least 2 characters"),
  desc: z.string().min(5, "Announcement message must be at least 5 characters"),
});

// 18. Contact Section Schema
export const contactSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid business email address"),
  subject: z.string(),
  message: z.string().min(5, "Message details must be at least 5 characters"),
});

// 19. System Settings Schema
export const systemSettingsSchema = z.object({
  buildingGroupName: z.string().min(2, "Organization name must be at least 2 characters"),
  buildingAddress: z.string().min(5, "Building address must be at least 5 characters"),
  timezone: z.string().min(1, "Timezone is required"),
  lateFeeAmount: z.coerce
    .number({ message: "Late fee must be a valid number" })
    .min(0, "Late fee cannot be negative"),
  billingCycle: z.enum(["Weekly", "Monthly", "Quarterly"]),
  smsAlerts: z.boolean(),
  emailNotifications: z.boolean(),
  electricityRate: z.coerce
    .number({ message: "Electricity rate must be a valid number" })
    .min(0, "Electricity rate cannot be negative"),
  waterRate: z.coerce
    .number({ message: "Water rate must be a valid number" })
    .min(0, "Water rate cannot be negative"),
  otpVerification: z.boolean(),
  stripeApiKey: z.string().optional(),
  gateWebhookUrl: z.string().url("Gate webhook URL must be a valid URL").optional().or(z.literal("")),
});

// 20. Utility Meter Schema
export const utilityMeterSchema = z.object({
  buildingName: z.string().min(1, "Building name is required"),
  flatNumber: z.string().min(1, "Flat unit number is required"),
  type: z.enum(["Electricity", "Water", "Gas"]),
  meterNumber: z.string().min(3, "Meter serial number must be at least 3 characters"),
  lastReading: z.coerce
    .number({ message: "Initial reading must be a valid number" })
    .min(0, "Initial reading cannot be negative"),
});

// 21. Meter Reading Schema
export const meterReadingSchema = z.object({
  currentReading: z.coerce
    .number({ message: "Current reading must be a valid number" })
    .min(0, "Current reading cannot be negative"),
});

// 22. Generator Log Schema
export const generatorLogSchema = z.object({
  fuelAdded: z.coerce
    .number({ message: "Fuel added must be a valid number" })
    .min(0, "Fuel level cannot be negative"),
  fuelLevel: z.coerce
    .number({ message: "Fuel percentage must be a number" })
    .min(0, "Fuel percentage cannot be negative")
    .max(100, "Fuel percentage cannot exceed 100%"),
  runHours: z.coerce
    .number({ message: "Uptime hours must be a valid number" })
    .min(0, "Uptime hours cannot be negative"),
  status: z.enum(["Operational", "Maintenance Required", "Refueling"]),
  notes: z.string().optional(),
});

// 23. Announcement Schema
export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Content message must be at least 5 characters"),
  type: z.enum(["General", "Emergency", "Event"]),
  targetAudience: z.enum(["All", "Tenants", "Owners"]),
});

// 24. Document Record Schema
export const documentRecordSchema = z.object({
  title: z.string().min(3, "Document title must be at least 3 characters"),
  residentName: z.string().min(2, "Resident name must be at least 2 characters"),
  flatNumber: z.string().min(1, "Flat unit number is required"),
  documentType: z.enum(["Lease", "ID Proof", "NID", "Utility Bill"]),
  expiresAt: z.string().optional(),
});

// 25. Inventory Asset Schema
export const inventoryAssetSchema = z.object({
  name: z.string().min(3, "Asset name must be at least 3 characters"),
  category: z.enum(["Equipment", "Supplies", "Utility"]),
  status: z.enum(["Operational", "Maintenance Required", "Decommissioned"]),
  stockCount: z.coerce
    .number({ message: "Stock count must be a valid number" })
    .min(0, "Stock count cannot be negative"),
  lastServiced: z.string().optional(),
  warrantyExpires: z.string().optional(),
});

// 26. Facility Booking Schema
export const facilityBookingSchema = z.object({
  flatNumber: z.string().min(1, "Flat unit number is required"),
  residentName: z.string().min(2, "Resident name must be at least 2 characters"),
  facilityName: z.enum(["Community Hall", "Rooftop Pool", "Tennis Court", "Mini Gym"]),
  bookingDate: z.string().refine((val) => !isNaN(Date.parse(val)) && val.trim() !== "", "Booking date is required"),
  timeSlot: z.string().min(1, "Time slot selection is required"),
});



