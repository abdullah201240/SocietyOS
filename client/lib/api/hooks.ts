// ============================================================================
// React Hooks for API Data Fetching
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import type { ApiFilters } from './types';

// ============================================================================
// Generic useApi Hook
// ============================================================================
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  fetchFn: () => Promise<{ success: boolean; data: T; error?: string }>,
  autoFetch = true
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetchFn();
      if (response.success) {
        setState({ data: response.data, loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: response.error || 'Unknown error' });
      }
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [autoFetch, execute]);

  return { ...state, refetch: execute };
}

// ============================================================================
// useBuildings Hook
// ============================================================================
import { buildingsApi } from './client';
import type { Building } from './types';

export function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBuildings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await buildingsApi.getAll();
      if (response.success) {
        setBuildings(response.data);
      } else {
        setError(response.error || 'Failed to fetch buildings');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  return { buildings, loading, error, refetch: fetchBuildings };
}

// ============================================================================
// useComplaints Hook
// ============================================================================
import { complaintsApi } from './client';
import type { Complaint } from './types';

export function useComplaints(filters?: ApiFilters) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await complaintsApi.getAll(filters);
      if (response.success) {
        setComplaints(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch complaints');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return { complaints, loading, error, refetch: fetchComplaints };
}

// ============================================================================
// useResidents Hook
// ============================================================================
import { residentsApi } from './client';
import type { Resident } from './types';

export function useResidents(filters?: ApiFilters) {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await residentsApi.getAll(filters);
      if (response.success) {
        setResidents(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch residents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  return { residents, loading, error, refetch: fetchResidents };
}

// ============================================================================
// useFlats Hook
// ============================================================================
import { flatsApi } from './client';
import type { Flat } from './types';

export function useFlats(filters?: ApiFilters) {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await flatsApi.getAll(filters);
      if (response.success) {
        setFlats(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch flats');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFlats();
  }, [fetchFlats]);

  return { flats, loading, error, refetch: fetchFlats };
}

// ============================================================================
// useMaintenance Hook
// ============================================================================
import { maintenanceApi } from './client';
import type { MaintenanceTask } from './types';

export function useMaintenance(filters?: ApiFilters) {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await maintenanceApi.getAll(filters);
      if (response.success) {
        setTasks(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch maintenance tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMaintenance();
  }, [fetchMaintenance]);

  return { tasks, loading, error, refetch: fetchMaintenance };
}

// ============================================================================
// useInvoices Hook
// ============================================================================
import { invoicesApi } from './client';
import type { Invoice } from './types';

export function useInvoices(filters?: ApiFilters) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoicesApi.getAll(filters);
      if (response.success) {
        setInvoices(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch invoices');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return { invoices, loading, error, refetch: fetchInvoices };
}

// ============================================================================
// usePayments Hook
// ============================================================================
import { paymentsApi } from './client';
import type { Payment } from './types';

export function usePayments(filters?: ApiFilters) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentsApi.getAll(filters);
      if (response.success) {
        setPayments(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch payments');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
}

// ============================================================================
// useParking Hook
// ============================================================================
import { parkingApi } from './client';
import type { ParkingSlot } from './types';

export function useParking(filters?: ApiFilters) {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParking = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await parkingApi.getAll(filters);
      if (response.success) {
        setSlots(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch parking slots');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchParking();
  }, [fetchParking]);

  return { slots, loading, error, refetch: fetchParking };
}

// ============================================================================
// useVisitors Hook
// ============================================================================
import { visitorsApi } from './client';
import type { Visitor } from './types';

export function useVisitors(filters?: ApiFilters) {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await visitorsApi.getAll(filters);
      if (response.success) {
        setVisitors(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch visitors');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  return { visitors, loading, error, refetch: fetchVisitors };
}

// ============================================================================
// useStaff Hook
// ============================================================================
import { staffApi } from './client';
import type { Staff } from './types';

export function useStaff(filters?: ApiFilters) {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await staffApi.getAll(filters);
      if (response.success) {
        setStaff(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch staff');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return { staff, loading, error, refetch: fetchStaff };
}

// ============================================================================
// User Profile Hook
// ============================================================================
import { userProfileApi } from './client';
import type { UserProfile } from './types';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userProfileApi.get();
      if (response.success) {
        setProfile(response.data);
      } else {
        setError(response.error || 'Failed to fetch profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}

// ============================================================================
// System Settings Hook
// ============================================================================
import { systemSettingsApi } from './client';
import type { SystemSettings } from './types';

export function useSystemSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await systemSettingsApi.get();
      if (response.success) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to fetch settings');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}

// ============================================================================
// Utility Hooks
// ============================================================================
import { utilitiesApi } from './client';
import type { UtilityMeter, UtilityBill, GeneratorLog } from './types';

export function useUtilityMeters(filters?: ApiFilters) {
  const [meters, setMeters] = useState<UtilityMeter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await utilitiesApi.getAllMeters(filters);
      if (response.success) {
        setMeters(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch meters');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMeters();
  }, [fetchMeters]);

  return { meters, loading, error, refetch: fetchMeters };
}

export function useUtilityBills(filters?: ApiFilters) {
  const [bills, setBills] = useState<UtilityBill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await utilitiesApi.getAllBills(filters);
      if (response.success) {
        setBills(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch bills');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return { bills, loading, error, refetch: fetchBills };
}

export function useGeneratorLogs() {
  const [logs, setLogs] = useState<GeneratorLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await utilitiesApi.getAllGeneratorLogs();
      if (response.success) {
        setLogs(response.data);
      } else {
        setError(response.error || 'Failed to fetch generator logs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, refetch: fetchLogs };
}

// ============================================================================
// Communication Hooks
// ============================================================================
import { communicationsApi } from './client';
import type { Announcement } from './types';

export function useAnnouncements(filters?: ApiFilters) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await communicationsApi.getAll(filters);
      if (response.success) {
        setAnnouncements(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch announcements');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { announcements, loading, error, refetch: fetchAnnouncements };
}

// ============================================================================
// Document Hooks
// ============================================================================
import { documentsApi } from './client';
import type { DocumentRecord } from './types';

export function useDocumentRecords(filters?: ApiFilters) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentsApi.getAll(filters);
      if (response.success) {
        setDocuments(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch documents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { documents, loading, error, refetch: fetchDocuments };
}

// ============================================================================
// Inventory & Asset Hooks
// ============================================================================
import { inventoryApi } from './client';
import type { InventoryAsset } from './types';

export function useInventoryAssets(filters?: ApiFilters) {
  const [assets, setAssets] = useState<InventoryAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await inventoryApi.getAll(filters);
      if (response.success) {
        setAssets(response.data.data);
      } else {
        setError(response.error || 'Failed to fetch assets');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, loading, error, refetch: fetchAssets };
}


