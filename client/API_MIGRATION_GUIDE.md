# API Migration Guide for All Dashboard Pages

## ✅ Already Completed

### 1. Complaints Page (`/dashboard/complaints/page.tsx`)
- ✅ Removed local `ComplaintTicket` interface
- ✅ Imported `useComplaints` hook and `complaintsApi` from `@/lib/api`
- ✅ Replaced mock data with: `const { complaints, loading, error, refetch } = useComplaints()`
- ✅ Updated all handlers (create, update, addComment) to use API
- ✅ All CRUD operations now call the centralized API

---

## 📋 Pattern for Updating Remaining Pages

Each page needs these 4 steps:

### Step 1: Remove Local Type Definitions
**DELETE** the local interface at the top of the file.

**Example (Buildings Page):**
```typescript
// DELETE THIS:
interface BuildingRecord {
  id: number;
  name: string;
  // ... all fields
}
```

### Step 2: Import API Hook and Client
**ADD** these imports after the lucide-react imports:

```typescript
import { useBuildings, buildingsApi } from "@/lib/api";
import type { Building as BuildingType } from "@/lib/api";
```

**Available imports for each page:**
- **Buildings**: `useBuildings`, `buildingsApi`, `Building`
- **Residents**: `useResidents`, `residentsApi`, `Resident`
- **Flats**: `useFlats`, `flatsApi`, `Flat`
- **Maintenance**: `useMaintenance`, `maintenanceApi`, `MaintenanceTask`
- **Billing/Invoices**: `useInvoices`, `invoicesApi`, `Invoice`
- **Payments**: `usePayments`, `paymentsApi`, `Payment`
- **Parking**: `useParking`, `parkingApi`, `ParkingSlot`
- **Visitors**: `useVisitors`, `visitorsApi`, `Visitor`
- **Staff**: `useStaff`, `staffApi`, `Staff`

### Step 3: Replace Mock Data with API Hook
**REPLACE** the mock data array with API hook:

**BEFORE:**
```typescript
const [buildings, setBuildings] = React.useState<BuildingRecord[]>([
  { id: 1, name: "Tower Alpha", ... },
  { id: 2, name: "Tower Beta", ... },
  // ... lots of mock data
]);
```

**AFTER:**
```typescript
// Fetch from API
const { buildings: buildingsFromApi, loading, error, refetch } = useBuildings();
const [buildings, setBuildings] = React.useState<BuildingType[]>([]);

// Sync API data with local state
React.useEffect(() => {
  if (buildingsFromApi) {
    setBuildings(buildingsFromApi);
  }
}, [buildingsFromApi]);
```

### Step 4: Update CRUD Handlers to Use API

**BEFORE (Create):**
```typescript
const handleAddBuilding = (e: React.FormEvent) => {
  e.preventDefault();
  const created: BuildingRecord = {
    id: buildings.length + 1,
    ...newBuilding
  };
  setBuildings((prev) => [created, ...prev]);
  toast.success("Building added!");
};
```

**AFTER (Create):**
```typescript
const handleAddBuilding = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await buildingsApi.create(newBuilding);
  if (response.success) {
    setBuildings((prev) => [response.data, ...prev]);
    toast.success("Building added!");
    refetch(); // Refresh from API
  } else {
    toast.error(response.error || "Failed to add building");
  }
};
```

**BEFORE (Update):**
```typescript
const handleUpdateStatus = (id: number) => {
  setBuildings((prev) =>
    prev.map((b) => {
      if (b.id === id) {
        return { ...b, status: "Updated" };
      }
      return b;
    })
  );
};
```

**AFTER (Update):**
```typescript
const handleUpdateStatus = async (id: number) => {
  const response = await buildingsApi.update(id, { status: "Updated" });
  if (response.success) {
    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return { ...b, status: "Updated" };
        }
        return b;
      })
    );
    refetch();
  } else {
    toast.error(response.error || "Failed to update");
  }
};
```

---

## 🎯 Quick Reference: What to Update in Each Page

### Buildings Page (`/dashboard/buildings/page.tsx`)
```typescript
// Import
import { useBuildings, buildingsApi } from "@/lib/api";
import type { Building as BuildingType } from "@/lib/api";

// Replace state
const { buildings: buildingsFromApi, loading, error, refetch } = useBuildings();
const [buildings, setBuildings] = React.useState<BuildingType[]>([]);

// Update type references: BuildingRecord → BuildingType
```

### Residents Page (`/dashboard/residents/page.tsx`)
```typescript
// Import
import { useResidents, residentsApi } from "@/lib/api";
import type { Resident as ResidentType } from "@/lib/api";

// Replace state
const { residents: residentsFromApi, loading, error, refetch } = useResidents();
const [residents, setResidents] = React.useState<ResidentType[]>([]);

// Update type references: ResidentRecord → ResidentType
```

### Flats Page (`/dashboard/flats/page.tsx`)
```typescript
// Import
import { useFlats, flatsApi } from "@/lib/api";
import type { Flat as FlatType } from "@/lib/api";

// Replace state
const { flats: flatsFromApi, loading, error, refetch } = useFlats();
const [flats, setFlats] = React.useState<FlatType[]>([]);

// Update type references: FlatRecord → FlatType
```

### Maintenance Page (`/dashboard/maintenance/page.tsx`)
```typescript
// Import
import { useMaintenance, maintenanceApi } from "@/lib/api";
import type { MaintenanceTask as MaintenanceTaskType } from "@/lib/api";

// Replace state
const { tasks: tasksFromApi, loading, error, refetch } = useMaintenance();
const [maintenanceTasks, setMaintenanceTasks] = React.useState<MaintenanceTaskType[]>([]);

// Update type references: MaintenanceTask → MaintenanceTaskType
```

### Billing Page (`/dashboard/billing/page.tsx`)
```typescript
// Import
import { useInvoices, invoicesApi } from "@/lib/api";
import type { Invoice as InvoiceType } from "@/lib/api";

// Replace state
const { invoices: invoicesFromApi, loading, error, refetch } = useInvoices();
const [invoices, setInvoices] = React.useState<InvoiceType[]>([]);

// Update type references: InvoiceRecord → InvoiceType
```

### Parking Page (`/dashboard/parking/page.tsx`)
```typescript
// Import
import { useParking, parkingApi } from "@/lib/api";
import type { ParkingSlot as ParkingSlotType } from "@/lib/api";

// Replace state
const { slots: slotsFromApi, loading, error, refetch } = useParking();
const [slots, setSlots] = React.useState<ParkingSlotType[]>([]);

// Update type references: ParkingSlot → ParkingSlotType
```

### Visitors Page (`/dashboard/visitors/page.tsx`)
```typescript
// Import
import { useVisitors, visitorsApi } from "@/lib/api";
import type { Visitor as VisitorType } from "@/lib/api";

// Replace state
const { visitors: visitorsFromApi, loading, error, refetch } = useVisitors();
const [visitors, setVisitors] = React.useState<VisitorType[]>([]);

// Update type references: VisitorRecord → VisitorType
```

### Staff Page (`/dashboard/staff/page.tsx`)
```typescript
// Import
import { useStaff, staffApi } from "@/lib/api";
import type { Staff as StaffType } from "@/lib/api";

// Replace state
const { staff: staffFromApi, loading, error, refetch } = useStaff();
const [staff, setStaff] = React.useState<StaffType[]>([]);

// Update type references: StaffRecord → StaffType
```

### Payments Page (`/dashboard/payments/page.tsx`)
```typescript
// Import
import { usePayments, paymentsApi } from "@/lib/api";
import type { Payment as PaymentType } from "@/lib/api";

// Replace state
const { payments: paymentsFromApi, loading, error, refetch } = usePayments();
const [payments, setPayments] = React.useState<PaymentType[]>([]);

// Update type references: PaymentRecord → PaymentType (if exists)
```

---

## 🔧 API Methods Available

Each API client has these methods:

```typescript
// Get all (with optional filters)
const response = await api.getAll({ status: "Open", building: "Tower Alpha" });
// Returns: { success: true, data: { data: [], total: 10, page: 1, limit: 100 } }

// Get by ID
const response = await api.getById(id);

// Create
const response = await api.create(newData);

// Update
const response = await api.update(id, { field: "value" });

// Delete (if applicable)
const response = await api.delete(id);

// Special methods (example: complaints)
await complaintsApi.addComment(complaintId, commentData);
```

---

## ✅ Checklist for Each Page

- [ ] Remove local interface/type definition
- [ ] Add import for useHook and api client
- [ ] Add import for type (with alias to avoid conflicts)
- [ ] Replace mock data array with useHook
- [ ] Add useEffect to sync API data with local state
- [ ] Update all state type references (Record → Type)
- [ ] Convert create handlers to async + use API
- [ ] Convert update handlers to async + use API
- [ ] Convert delete handlers to async + use API (if exists)
- [ ] Add refetch() calls after mutations
- [ ] Test the page works correctly

---

## 💡 Tips

1. **Loading States**: You can use the `loading` variable to show spinners
2. **Error Handling**: Use the `error` variable to show error messages
3. **Refetch**: Call `refetch()` after any mutation to get fresh data
4. **Type Aliases**: Always use `as TypeName` to avoid import conflicts
5. **Async Handlers**: All handlers that call API should be `async`

---

## 🚀 Example: Complete Page Transformation

See `/dashboard/complaints/page.tsx` for a fully working example of the transformation.

The key changes are:
1. Lines 1-58: Imports (removed local types, added API imports)
2. Lines 60-77: State setup (removed mock data, added useHook)
3. Lines 103-143: Create handler (async + API call)
4. Lines 145-169: Update handlers (async + API calls)
5. Lines 171-195: Comment handler (async + API call)

All other pages follow the exact same pattern!
