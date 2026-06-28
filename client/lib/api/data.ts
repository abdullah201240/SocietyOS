// ============================================================================
// Mock Data Store - Centralized API Data
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
  Staff
} from './types';

// ============================================================================
// Buildings Data
// ============================================================================
export const buildingsData: Building[] = [
  {
    id: 1,
    name: "Tower Alpha",
    buildingGroup: "Grandview Towers",
    type: "Residential",
    floors: 15,
    totalFlats: 125,
    occupiedFlats: 118,
    maintenanceStatus: "Stable",
    parkingUtilization: 82,
    activeComplaints: 3,
    operationalStatus: "Online",
    waterConsumption: "4.2k Liters",
    electricityConsumption: "820 kWh",
    managers: ["John Doe", "Sarah Jenkins"],
    assignedStaff: [
      { name: "Robert Downey", role: "HVAC Mechanic", contact: "+1 555-0105" },
      { name: "Clara Oswald", role: "Lobby Receptionist", contact: "+1 555-0177" }
    ],
    activity: [
      { id: 1, log: "Elevator A monthly cables check completed", time: "1h ago" },
      { id: 2, log: "Lobby light fixtures upgraded to LED", time: "1d ago" }
    ],
    towersBreakdown: [
      { floor: 1, occupied: 8, total: 8 },
      { floor: 2, occupied: 8, total: 8 },
      { floor: 3, occupied: 6, total: 8 },
      { floor: 4, occupied: 7, total: 8 }
    ]
  },
  {
    id: 2,
    name: "Tower Beta",
    buildingGroup: "Grandview Towers",
    type: "Residential",
    floors: 15,
    totalFlats: 125,
    occupiedFlats: 112,
    maintenanceStatus: "Pending Service",
    parkingUtilization: 78,
    activeComplaints: 5,
    operationalStatus: "Online",
    waterConsumption: "3.9k Liters",
    electricityConsumption: "790 kWh",
    managers: ["John Doe"],
    assignedStaff: [
      { name: "Bruce Banner", role: "Lead Plumber", contact: "+1 555-0112" }
    ],
    activity: [
      { id: 1, log: "Water pump B scheduled repair started", time: "2h ago" },
      { id: 2, log: "CCTV camera #4 replaced on Floor 12", time: "2d ago" }
    ],
    towersBreakdown: [
      { floor: 1, occupied: 8, total: 8 },
      { floor: 2, occupied: 7, total: 8 },
      { floor: 3, occupied: 7, total: 8 }
    ]
  },
  {
    id: 3,
    name: "Tower Gamma",
    buildingGroup: "Grandview Towers",
    type: "Residential",
    floors: 12,
    totalFlats: 93,
    occupiedFlats: 82,
    maintenanceStatus: "Critical Warning",
    parkingUtilization: 90,
    activeComplaints: 4,
    operationalStatus: "Degraded",
    waterConsumption: "5.5k Liters",
    electricityConsumption: "940 kWh",
    managers: ["Sarah Jenkins"],
    assignedStaff: [
      { name: "Steve Rogers", role: "Electrical Specialist", contact: "+1 555-0199" }
    ],
    activity: [
      { id: 1, log: "Boiler system pressure warning reported", time: "30m ago" },
      { id: 2, log: "Sprinkler head replaced on Floor 5 corridor", time: "3d ago" }
    ],
    towersBreakdown: [
      { floor: 1, occupied: 7, total: 8 },
      { floor: 2, occupied: 8, total: 8 },
      { floor: 3, occupied: 5, total: 8 }
    ]
  }
];

// ============================================================================
// Flats Data
// ============================================================================
export const flatsData: Flat[] = [
  {
    id: 1,
    flatNumber: "1402",
    floor: "14",
    buildingName: "Tower Alpha",
    ownerName: "Arthur Pendragon",
    ownerPhone: "+1 555-0101",
    ownerEmail: "arthur.p@buildingos.com",
    tenantStatus: "Tenant-Occupied",
    tenantName: "Harold Brooks",
    tenantPhone: "+1 555-0102",
    tenantEmail: "h.brooks@gmail.com",
    occupancyStatus: "Occupied",
    utilityBalance: -185.00,
    parkingAssignment: "Slot L1-42",
    activeComplaints: 1,
    rentAmount: "1200",
    leaseExpires: "2027-05-31",
    familyMembers: [
      { name: "Linda Brooks", relation: "Spouse", age: 38 },
      { name: "Tim Brooks", relation: "Son", age: 12 }
    ],
    emergencyContacts: [
      { name: "Arthur Brooks", relation: "Brother", phone: "+1 555-0190" }
    ],
    maintenanceHistory: [
      { id: 1, ticket: "T-1024", date: "2026-06-25", status: "In Progress" }
    ]
  },
  {
    id: 2,
    flatNumber: "805",
    floor: "8",
    buildingName: "Tower Alpha",
    ownerName: "Arthur Pendragon",
    ownerPhone: "+1 555-0101",
    ownerEmail: "arthur.p@buildingos.com",
    tenantStatus: "Tenant-Occupied",
    tenantName: "Sarah Connor",
    tenantPhone: "+1 555-0212",
    tenantEmail: "s.connor@cyberdyne.net",
    occupancyStatus: "Occupied",
    utilityBalance: -45.00,
    parkingAssignment: "Slot L2-19",
    activeComplaints: 1,
    rentAmount: "1000",
    leaseExpires: "2026-12-31",
    familyMembers: [
      { name: "John Connor", relation: "Son", age: 16 }
    ],
    emergencyContacts: [
      { name: "Dr. Silberman", relation: "Physician", phone: "+1 555-0900" }
    ],
    maintenanceHistory: [
      { id: 2, ticket: "T-1025", date: "2026-06-28", status: "In Progress" }
    ]
  },
  {
    id: 3,
    flatNumber: "302",
    floor: "3",
    buildingName: "Tower Alpha",
    ownerName: "Arthur Pendragon",
    ownerPhone: "+1 555-0101",
    ownerEmail: "arthur.p@buildingos.com",
    tenantStatus: "Vacant",
    occupancyStatus: "Vacant",
    utilityBalance: 0,
    parkingAssignment: "None",
    activeComplaints: 0,
    familyMembers: [],
    emergencyContacts: [],
    maintenanceHistory: []
  }
];

// ============================================================================
// Residents Data
// ============================================================================
export const residentsData: Resident[] = [
  {
    id: 1,
    name: "Harold Brooks",
    flatNumber: "1402",
    buildingName: "Tower Alpha",
    residentType: "Owner",
    phone: "+1 555-0102",
    email: "h.brooks@gmail.com",
    moveInDate: "2020-11-15",
    outstandingDues: -185.00,
    operationalStatus: "Active",
    familyMembers: [
      { name: "Linda Brooks", relation: "Spouse", phone: "+1 555-0182" },
      { name: "Tim Brooks", relation: "Son", phone: "N/A" }
    ],
    emergencyContacts: [
      { name: "Arthur Brooks", relation: "Brother", phone: "+1 555-0190" }
    ],
    vehicles: [
      { make: "Toyota", model: "RAV4 (Silver)", plate: "CA-9Y12", slot: "Slot L1-42" }
    ],
    documents: [
      { name: "Government ID", status: "Verified" },
      { name: "Ownership Certificate", status: "Verified" }
    ],
    complaints: [
      { title: "Intercom line dead", date: "2026-06-25", status: "Assigned" }
    ],
    payments: [
      { item: "June Maintenance dues", amount: "$185.00", date: "2026-06-26", status: "Pending" },
      { item: "May Maintenance dues", amount: "$185.00", date: "2026-05-26", status: "Paid" }
    ],
    gatePasses: [
      { visitorName: "Amazon Delivery", type: "Delivery", date: "Today, 11:20 AM" },
      { visitorName: "John Doe Senior", type: "Guest", date: "Yesterday, 3:00 PM" }
    ],
    commsLog: [
      { title: "Invoice notification raised", date: "2026-06-26", status: "Sent" }
    ]
  },
  {
    id: 2,
    name: "Sarah Connor",
    flatNumber: "805",
    buildingName: "Tower Alpha",
    residentType: "Tenant",
    phone: "+1 555-0212",
    email: "s.connor@cyberdyne.net",
    moveInDate: "2025-05-01",
    outstandingDues: -45.00,
    operationalStatus: "Active",
    familyMembers: [
      { name: "John Connor", relation: "Son", phone: "+1 555-0925" }
    ],
    emergencyContacts: [
      { name: "Dr. Silberman", relation: "Physician", phone: "+1 555-0900" }
    ],
    vehicles: [
      { make: "Harley Davidson", model: "Fat Boy (Black)", plate: "LA-4Z20", slot: "Slot L2-19" }
    ],
    documents: [
      { name: "Government ID", status: "Verified" },
      { name: "Lease Agreement", status: "Verified" }
    ],
    complaints: [
      { title: "Low water pressure", date: "2026-06-28", status: "In Progress" }
    ],
    payments: [
      { item: "June Maintenance dues", amount: "$145.00", date: "2026-06-27", status: "Paid" }
    ],
    gatePasses: [
      { visitorName: "John Connor", type: "Guest", date: "2026-06-25" }
    ],
    commsLog: []
  },
  {
    id: 3,
    name: "David Vance",
    flatNumber: "1204",
    buildingName: "Tower Alpha",
    residentType: "Owner",
    phone: "+1 555-0303",
    email: "d.vance@buildingos.com",
    moveInDate: "2019-08-20",
    outstandingDues: 0,
    operationalStatus: "Active",
    familyMembers: [
      { name: "Regina Vance", relation: "Spouse", phone: "+1 555-0304" }
    ],
    emergencyContacts: [],
    vehicles: [
      { make: "Audi", model: "A4 (White)", plate: "CA-8X11", slot: "Slot L1-30" }
    ],
    documents: [
      { name: "Government ID", status: "Verified" },
      { name: "Ownership Certificate", status: "Verified" }
    ],
    complaints: [
      { title: "Lobby double door stuck", date: "2026-06-28", status: "Escalated" }
    ],
    payments: [
      { item: "June Maintenance dues", amount: "$185.00", date: "2026-06-25", status: "Paid" }
    ],
    gatePasses: [],
    commsLog: []
  }
];

// ============================================================================
// Complaints Data
// ============================================================================
export const complaintsData: Complaint[] = [
  {
    id: "T-1024",
    residentName: "Harold Brooks",
    flatNumber: "1402",
    buildingName: "Tower Alpha",
    category: "Comms",
    priority: "Medium",
    assignee: "Steve Rogers",
    status: "Open",
    createdDate: "2026-06-25",
    slaDeadline: "2026-06-26 12:00 PM",
    description: "Intercom line dead since morning. No dial tone, cannot dial lobby or security gate.",
    images: ["Lobby Intercom Panel (Front View)"],
    timeline: [
      { title: "Ticket Created", desc: "Resident raised a ticket online.", date: "2026-06-25, 08:30 AM" },
      { title: "Dispatched Operator", desc: "Assigned technician Steve Rogers for diagnostic inspection.", date: "2026-06-25, 09:15 AM" }
    ],
    comments: [
      { sender: "Harold Brooks", role: "Resident", message: "Need this resolved quickly, delivery drivers cannot reach me.", time: "2026-06-25, 10:00 AM" }
    ]
  },
  {
    id: "T-1025",
    residentName: "Sarah Connor",
    flatNumber: "805",
    buildingName: "Tower Alpha",
    category: "Plumbing",
    priority: "High",
    assignee: "Bruce Banner",
    status: "In Progress",
    createdDate: "2026-06-28",
    slaDeadline: "2026-06-28 06:00 PM",
    description: "Low water pressure in the master bathroom shower. Cold tap pressure is normal, only hot water line seems throttled.",
    images: [],
    timeline: [
      { title: "Ticket Created", desc: "Resident raised a ticket via mobile app.", date: "2026-06-28, 08:00 AM" },
      { title: "Status Updated", desc: "Technician Bruce Banner marked task In Progress.", date: "2026-06-28, 09:30 AM" }
    ],
    technicianNotes: "Checking block main vertical riser. Suspect airlock in heat loop line.",
    comments: [
      { sender: "Bruce Banner", role: "Technician", message: "Working on pressure diagnostics in basement L1 now.", time: "2026-06-28, 09:40 AM" }
    ]
  },
  {
    id: "T-1026",
    residentName: "David Vance",
    flatNumber: "1204",
    buildingName: "Tower Alpha",
    category: "Elevator",
    priority: "Critical",
    assignee: "Robert Downey",
    status: "Escalated",
    createdDate: "2026-06-28",
    slaDeadline: "2026-06-28 11:30 AM",
    description: "Lobby double door stuck closed. Interlocking mechanism failed. High priority safety risk.",
    images: ["Safety Interlock Panel Stuck"],
    timeline: [
      { title: "Ticket Created", desc: "Emergency alarm raised by gate safety sensors.", date: "2026-06-28, 07:15 AM" },
      { title: "Escalated", desc: "Automatic escalation triggered due to critical fire safety locks.", date: "2026-06-28, 08:15 AM" }
    ],
    technicianNotes: "Requires override panel keys from central security office.",
    comments: [
      { sender: "System", role: "Dispatcher", message: "Alert: SLA deadline exceeded. Escalating to Building Manager.", time: "2026-06-28, 11:30 AM" }
    ]
  },
  {
    id: "T-1020",
    residentName: "Mark Wahlberg",
    flatNumber: "604",
    buildingName: "Tower Beta",
    category: "Facilities",
    priority: "Low",
    assignee: "Natasha Romanoff",
    status: "Resolved",
    createdDate: "2026-06-24",
    slaDeadline: "2026-06-25 05:00 PM",
    description: "Balcony door slide alignment off track. Sliding handle keeps friction scrubbing the metal guide rail.",
    images: [],
    timeline: [
      { title: "Ticket Created", desc: "Resident raised a ticket.", date: "2026-06-24, 10:00 AM" },
      { title: "Completed", desc: "Realigned balancer guide wheels. Sliding is operational.", date: "2026-06-24, 02:30 PM" }
    ],
    technicianNotes: "Guide track cleared of sand debris. Balance screw tightened.",
    comments: [],
    residentFeedback: "Very fast fix. Doors are sliding perfectly fine now. Thank you!",
    residentRating: 5
  }
];

// ============================================================================
// Maintenance Tasks Data
// ============================================================================
export const maintenanceData: MaintenanceTask[] = [
  {
    id: 1,
    title: "Elevator B - Annual Safety Inspection",
    building: "Tower A",
    category: "Elevator",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "Otis Maintenance Team",
    reportedDate: "2026-06-25",
    dueDate: "2026-06-30",
    estimatedCost: "$2,500",
    description: "Mandatory annual safety brake testing and certification for Elevator B.",
  },
  {
    id: 2,
    title: "Water Pump Replacement - Block C",
    building: "Block C",
    category: "Plumbing",
    priority: "High",
    status: "Open",
    assignedTo: "Plumbing Services Inc.",
    reportedDate: "2026-06-26",
    dueDate: "2026-07-05",
    estimatedCost: "$1,800",
    description: "Main water pump showing signs of failure, requires immediate replacement.",
  },
  {
    id: 3,
    title: "HVAC System Filter Replacement",
    building: "Common Area",
    category: "HVAC",
    priority: "Medium",
    status: "Open",
    assignedTo: "ClimateControl Ltd.",
    reportedDate: "2026-06-27",
    dueDate: "2026-07-10",
    estimatedCost: "$450",
    description: "Quarterly filter replacement for central HVAC system.",
  },
  {
    id: 4,
    title: "Parking Lot Pothole Repair",
    building: "Parking Level 1",
    category: "Structural",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "RoadFix Contractors",
    reportedDate: "2026-06-20",
    dueDate: "2026-07-01",
    estimatedCost: "$800",
    description: "Repair multiple potholes in parking level 1 near entrance.",
  },
  {
    id: 5,
    title: "Electrical Panel Upgrade - Tower D",
    building: "Tower D",
    category: "Electrical",
    priority: "High",
    status: "On Hold",
    assignedTo: "PowerTech Electricians",
    reportedDate: "2026-06-15",
    dueDate: "2026-07-15",
    estimatedCost: "$3,200",
    description: "Upgrade electrical panel to support increased load from new EV charging stations.",
  },
  {
    id: 6,
    title: "Garden Irrigation System Maintenance",
    building: "Grounds",
    category: "Landscaping",
    priority: "Low",
    status: "Completed",
    assignedTo: "GreenThumb Landscaping",
    reportedDate: "2026-06-18",
    dueDate: "2026-06-28",
    estimatedCost: "$320",
    description: "Seasonal maintenance of irrigation system and sprinkler heads.",
  },
];

// ============================================================================
// Invoices Data
// ============================================================================
export const invoicesData: Invoice[] = [
  {
    id: "INV-9021",
    buildingGroup: "Grandview Towers",
    buildingName: "Tower Alpha",
    flatNumber: "1402",
    residentName: "Marcus Aurelius",
    ownerName: "Arthur Pendragon",
    amount: 1600,
    status: "Paid",
    dueDate: "2026-07-05",
    utilityCharges: 80,
    maintenanceCharges: 120,
    otherCharges: 1400,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "INV-9022",
    buildingGroup: "Grandview Towers",
    buildingName: "Tower Alpha",
    flatNumber: "805",
    residentName: "Sarah Connor",
    ownerName: "Arthur Pendragon",
    amount: 1375,
    status: "Paid",
    dueDate: "2026-07-05",
    utilityCharges: 75,
    maintenanceCharges: 100,
    otherCharges: 1200,
    paymentMethod: "Credit Card"
  },
  {
    id: "INV-9023",
    buildingGroup: "Grandview Towers",
    buildingName: "Tower Alpha",
    flatNumber: "302",
    residentName: "Elena Rostova",
    ownerName: "Arthur Pendragon",
    amount: 1200,
    status: "Overdue",
    dueDate: "2026-06-20",
    utilityCharges: 100,
    maintenanceCharges: 100,
    otherCharges: 1000,
    paymentMethod: "None"
  },
  {
    id: "INV-9024",
    buildingGroup: "Meadow View Complex",
    buildingName: "Oak Block",
    flatNumber: "501",
    residentName: "Arthur Dent",
    ownerName: "Uther Lightbringer",
    amount: 1100,
    status: "Unpaid",
    dueDate: "2026-07-05",
    utilityCharges: 60,
    maintenanceCharges: 90,
    otherCharges: 950,
    paymentMethod: "None"
  }
];

// ============================================================================
// Payments Data
// ============================================================================
export const paymentsData: Payment[] = [
  {
    id: "PAY-5001",
    invoiceId: "INV-9021",
    residentName: "Marcus Aurelius",
    flatNumber: "1402",
    buildingName: "Tower Alpha",
    amount: 1600,
    paymentMethod: "Bank Transfer",
    paymentDate: "2026-06-26",
    status: "Completed",
    transactionId: "TXN-8821"
  },
  {
    id: "PAY-5002",
    invoiceId: "INV-9022",
    residentName: "Sarah Connor",
    flatNumber: "805",
    buildingName: "Tower Alpha",
    amount: 1375,
    paymentMethod: "Credit Card",
    paymentDate: "2026-06-27",
    status: "Completed",
    transactionId: "TXN-8822"
  }
];

// ============================================================================
// Parking Slots Data
// ============================================================================
export const parkingData: ParkingSlot[] = [
  {
    id: "Slot L1-42",
    slotNumber: "L1-42",
    buildingName: "Tower Alpha",
    flatNumber: "1402",
    residentName: "Harold Brooks",
    vehicleType: "SUV",
    vehicleNumber: "CA-9Y12",
    category: "Resident",
    occupancyStatus: "Occupied",
    paymentStatus: "Paid",
    parkingHistory: [
      { vehicleNumber: "CA-9Y12", checkIn: "2026-06-27, 06:10 PM", checkOut: "Active" }
    ],
    visitorActivity: [],
    securityLogs: [
      { time: "2026-06-27, 06:10 PM", event: "Automated RFID Gate entry logged", guard: "System" }
    ]
  },
  {
    id: "Slot L2-19",
    slotNumber: "L2-19",
    buildingName: "Tower Alpha",
    flatNumber: "805",
    residentName: "Sarah Connor",
    vehicleType: "Motorcycle",
    vehicleNumber: "LA-4Z20",
    category: "Resident",
    occupancyStatus: "Occupied",
    paymentStatus: "Paid",
    parkingHistory: [
      { vehicleNumber: "LA-4Z20", checkIn: "2026-06-28, 08:30 AM", checkOut: "Active" }
    ],
    visitorActivity: [
      { visitorName: "John Connor", purpose: "Family", date: "2026-06-25" }
    ],
    securityLogs: []
  },
  {
    id: "Slot L1-02",
    slotNumber: "L1-02",
    buildingName: "Tower Beta",
    flatNumber: "604",
    residentName: "Mark Wahlberg",
    vehicleType: "Sedan",
    vehicleNumber: "CA-7W10",
    category: "Resident",
    occupancyStatus: "Available",
    paymentStatus: "Pending",
    parkingHistory: [],
    visitorActivity: [],
    securityLogs: []
  }
];

// ============================================================================
// Visitors Data
// ============================================================================
export const visitorsData: Visitor[] = [
  {
    id: "VIS-1001",
    name: "Amazon Delivery (Mark)",
    hostName: "Harold Brooks",
    flatNumber: "1402",
    buildingName: "Tower Alpha",
    purpose: "Delivery",
    entryTime: "2026-06-28, 11:50 AM",
    exitTime: "2026-06-28, 12:05 PM",
    status: "Checked-in",
    verificationStatus: "Verified (OTP)",
    vehicleNumber: "N/A",
    timeline: [
      { title: "Pre-registration", time: "11:40 AM", note: "Resident approved via app" },
      { title: "Gate Entry", time: "11:50 AM", note: "Security verified OTP" }
    ],
    securityApprovalLog: [
      "2026-06-28, 11:40 AM - Resident approval received",
      "2026-06-28, 11:50 AM - Security verified and approved entry"
    ]
  },
  {
    id: "VIS-1002",
    name: "John Connor",
    hostName: "Sarah Connor",
    flatNumber: "805",
    buildingName: "Tower Alpha",
    purpose: "Guest",
    entryTime: "2026-06-28, 02:30 PM",
    exitTime: "",
    status: "Approved",
    verificationStatus: "Verified (Manual)",
    vehicleNumber: "N/A",
    timeline: [
      { title: "Visitor Request", time: "02:15 PM", note: "Resident submitted request" }
    ],
    securityApprovalLog: [
      "2026-06-28, 02:15 PM - Visitor pre-registered by resident"
    ]
  }
];

// ============================================================================
// Staff Data
// ============================================================================
export const staffData: Staff[] = [
  {
    id: "STF-101",
    name: "John Doe",
    role: "manager",
    department: "Operations",
    assignedBuilding: "Tower Alpha",
    shiftTiming: "09:00 AM - 06:00 PM",
    activeTasks: 8,
    performanceStatus: "Optimal",
    accessLevel: "Root Level",
    status: "Active",
    phone: "+1 555-0100",
    email: "john.doe@buildingos.com",
    taskHistory: [
      { taskName: "Review monthly maintenance logs", status: "Completed", date: "2026-06-27" },
      { taskName: "Approve vendor contracts", status: "Pending", date: "2026-06-28" }
    ],
    activityLogs: [
      { action: "Logged into dashboard", timestamp: "2026-06-28, 09:00 AM" }
    ],
    permissions: ["manage_buildings", "manage_staff", "view_financials", "approve_complaints"]
  },
  {
    id: "STF-102",
    name: "Steve Rogers",
    role: "maintenance",
    department: "Electrical",
    assignedBuilding: "Tower Alpha",
    shiftTiming: "08:00 AM - 04:00 PM",
    activeTasks: 3,
    performanceStatus: "Optimal",
    accessLevel: "Maintenance Log",
    status: "On Shift",
    phone: "+1 555-0105",
    email: "steve.r@buildingos.com",
    taskHistory: [
      { taskName: "Fix intercom line - Flat 1402", status: "Pending", date: "2026-06-28" }
    ],
    activityLogs: [
      { action: "Started diagnostics on Flat 1402 intercom", timestamp: "2026-06-28, 09:15 AM" }
    ],
    permissions: ["view_complaints", "update_maintenance"]
  },
  {
    id: "STF-103",
    name: "Natasha Romanoff",
    role: "security",
    department: "Security",
    assignedBuilding: "Tower Beta",
    shiftTiming: "10:00 PM - 06:00 AM",
    activeTasks: 2,
    performanceStatus: "Optimal",
    accessLevel: "Lobby Access",
    status: "Active",
    phone: "+1 555-0110",
    email: "natasha.r@buildingos.com",
    taskHistory: [],
    activityLogs: [],
    permissions: ["manage_visitors", "view_logs"]
  }
];
