"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UtilityDialogsProps {
  readingOpen: boolean;
  setReadingOpen: (open: boolean) => void;
  addMeterOpen: boolean;
  setAddMeterOpen: (open: boolean) => void;
  logOpen: boolean;
  setLogOpen: (open: boolean) => void;
  selectedMeter: any;
  newReading: string;
  setNewReading: (val: string) => void;
  handleRecordReading: (e: React.FormEvent) => void;
  meterForm: any;
  setMeterForm: (val: any) => void;
  handleAddMeter: (e: React.FormEvent) => void;
  generatorForm: any;
  setGeneratorForm: (val: any) => void;
  handleAddGenLog: (e: React.FormEvent) => void;
}

export function UtilityDialogs({
  readingOpen,
  setReadingOpen,
  addMeterOpen,
  setAddMeterOpen,
  logOpen,
  setLogOpen,
  selectedMeter,
  newReading,
  setNewReading,
  handleRecordReading,
  meterForm,
  setMeterForm,
  handleAddMeter,
  generatorForm,
  setGeneratorForm,
  handleAddGenLog,
}: UtilityDialogsProps) {
  return (
    <>
      {/* RECORD READING DIALOG */}
      <Dialog open={readingOpen} onOpenChange={setReadingOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          {selectedMeter && (
            <form onSubmit={handleRecordReading}>
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Record Meter Reading</DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  Update utility consumption for Flat **{selectedMeter.flatNumber}** ({selectedMeter.type}).
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label className="text-right text-xs font-semibold text-zinc-400">Serial</Label>
                  <span className="col-span-3 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 p-1 px-2 rounded-sm w-fit">{selectedMeter.meterNumber}</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-3">
                  <Label className="text-right text-xs font-semibold text-zinc-400">Previous</Label>
                  <span className="col-span-3 text-xs font-bold text-zinc-700 dark:text-zinc-350">{selectedMeter.currentReading.toLocaleString()} units</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="current-reading" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">New Reading</Label>
                  <Input
                    id="current-reading"
                    type="number"
                    required
                    value={newReading}
                    onChange={(e) => setNewReading(e.target.value)}
                    placeholder="e.g. 12900"
                    className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button size="xs" variant="outline" type="button" onClick={() => setReadingOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                  Cancel
                </Button>
                <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-650 hover:bg-indigo-700 text-white rounded-sm">
                  Save Reading
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* REGISTER NEW METER DIALOG */}
      <Dialog open={addMeterOpen} onOpenChange={setAddMeterOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleAddMeter}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Register Utility Sub-Meter</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Configure submeter assignment and type for local consumption auditing.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="m-flat" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Flat Unit</Label>
                <Input
                  id="m-flat"
                  required
                  value={meterForm.flatNumber}
                  onChange={(e) => setMeterForm({ ...meterForm, flatNumber: e.target.value })}
                  placeholder="e.g. 302"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="m-type" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Type</Label>
                <select
                  id="m-type"
                  value={meterForm.type}
                  onChange={(e) => setMeterForm({ ...meterForm, type: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="Electricity">Electricity Grid</option>
                  <option value="Water">Water Mains</option>
                  <option value="Gas">Gas Supply</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="m-serial" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Serial No.</Label>
                <Input
                  id="m-serial"
                  required
                  value={meterForm.meterNumber}
                  onChange={(e) => setMeterForm({ ...meterForm, meterNumber: e.target.value })}
                  placeholder="e.g. E-EL-104X"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="m-reading" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Initial Units</Label>
                <Input
                  id="m-reading"
                  type="number"
                  required
                  value={meterForm.lastReading}
                  onChange={(e) => setMeterForm({ ...meterForm, lastReading: e.target.value })}
                  placeholder="e.g. 0"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setAddMeterOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-650 hover:bg-indigo-700 text-white rounded-sm">
                Register
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* GENERATOR LOG DIALOG */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-zinc-950 p-6 rounded-md">
          <form onSubmit={handleAddGenLog}>
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-zinc-900 dark:text-white">Log Generator Activity</DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">Record fueling log, health check, or utility downtime run hours.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3.5 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="g-fuel" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Fuel Added</Label>
                <Input
                  id="g-fuel"
                  type="number"
                  required
                  value={generatorForm.fuelAdded}
                  onChange={(e) => setGeneratorForm({ ...generatorForm, fuelAdded: e.target.value })}
                  placeholder="Diesel added in Liters"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="g-level" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tank Level</Label>
                <Input
                  id="g-level"
                  type="number"
                  required
                  value={generatorForm.fuelLevel}
                  onChange={(e) => setGeneratorForm({ ...generatorForm, fuelLevel: e.target.value })}
                  placeholder="New fuel level % (0-100)"
                  max={105}
                  min={0}
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="g-hours" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Run Uptime</Label>
                <Input
                  id="g-hours"
                  type="number"
                  required
                  value={generatorForm.runHours}
                  onChange={(e) => setGeneratorForm({ ...generatorForm, runHours: e.target.value })}
                  placeholder="Duration hours logged"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="g-status" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</Label>
                <select
                  id="g-status"
                  value={generatorForm.status}
                  onChange={(e) => setGeneratorForm({ ...generatorForm, status: e.target.value as any })}
                  className="col-span-3 h-8.5 text-xs rounded-sm border border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-zinc-900 outline-none"
                >
                  <option value="Operational">Operational</option>
                  <option value="Refueling">Refueling / Restocking</option>
                  <option value="Maintenance Required">Maintenance Required</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="g-notes" className="text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">Notes</Label>
                <Input
                  id="g-notes"
                  value={generatorForm.notes}
                  onChange={(e) => setGeneratorForm({ ...generatorForm, notes: e.target.value })}
                  placeholder="Log details / repair remarks"
                  className="col-span-3 h-8.5 text-xs rounded-sm border-zinc-200"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button size="xs" variant="outline" type="button" onClick={() => setLogOpen(false)} className="h-8.5 text-xs font-semibold rounded-sm">
                Cancel
              </Button>
              <Button size="xs" type="submit" className="h-8.5 text-xs font-semibold bg-indigo-650 hover:bg-indigo-700 text-white rounded-sm">
                Log Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
