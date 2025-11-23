// src/pages/sender/SenderDashboard.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { IParcel } from "@/types/parcel";
import { useGetMyParcelsQuery, useCreateParcelMutation } from "@/services/parcelApiSlice";

// ShadCN components
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog"; // default export
import Input from "@/components/ui/input";   // default export
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const SenderDashboard = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?._id || null;

  const { data, isLoading, isError, refetch } = useGetMyParcelsQuery();
  const [createParcel] = useCreateParcelMutation();

  // Modal state
  const [open, setOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    type: "",
    weight: "",
    pickupAddress: "",
    deliveryAddress: "",
    fee: "",
  });

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Failed to load parcels.</p>;

  const parcels: IParcel[] = Array.isArray(data) ? data : [];
  const myParcels = parcels.filter((p) => p.senderId === userId);

  // Stats
  const pending = myParcels.filter((p) => p.status === "pending").length;
  const onTheWay = myParcels.filter((p) => p.status === "in-transit").length;
  const delivered = myParcels.filter((p) => p.status === "delivered").length;
  const cancelled = myParcels.filter((p) => p.status === "cancelled").length;
  const totalFees = myParcels.reduce((sum, p) => sum + (p.fee || 0), 0);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createParcel({
        type: form.type,
        weight: Number(form.weight),
        pickupAddress: form.pickupAddress,
        deliveryAddress: form.deliveryAddress,
        fee: Number(form.fee),
      }).unwrap();

      toast({
        title: "Parcel Created",
        description: "Your parcel was created successfully!",
      });

      // Close modal and reset form
      setOpen(false);
      setForm({ type: "", weight: "", pickupAddress: "", deliveryAddress: "", fee: "" });

      // Refetch parcels instantly
      refetch();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to create parcel",
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header + Create Parcel Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Sender Dashboard</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>+ Create New Parcel</Button>
          </Dialog.Trigger>
          <Dialog.Content className="space-y-4">
            <h2 className="text-lg font-semibold">Create Parcel</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label>Type</Label>
                <Input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Pickup Address</Label>
                <Input
                  value={form.pickupAddress}
                  onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Delivery Address</Label>
                <Input
                  value={form.deliveryAddress}
                  onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Fee ($)</Label>
                <Input
                  type="number"
                  value={form.fee}
                  onChange={(e) => setForm({ ...form, fee: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Parcel
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-xl font-bold">{pending}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-gray-600">On The Way</p>
          <p className="text-xl font-bold">{onTheWay}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-xl font-bold">{delivered}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg">
          <p className="text-sm text-gray-600">Cancelled</p>
          <p className="text-xl font-bold">{cancelled}</p>
        </div>
      </div>

      {/* Total Fees */}
      <div className="p-4 bg-purple-100 rounded-lg mb-6">
        <p className="text-sm">Total Fees Paid</p>
        <p className="text-xl font-bold">${totalFees}</p>
      </div>

      {/* Parcel List */}
      <h2 className="text-lg font-semibold mb-2">Your Parcels</h2>
      <div className="space-y-3">
        {myParcels.length === 0 && <p>No parcels created yet.</p>}
        {myParcels.map((parcel) => (
          <div key={parcel._id} className="p-4 bg-white shadow rounded-lg">
            <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
            <p><strong>Type:</strong> {parcel.type}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Receiver ID:</strong> {parcel.receiverId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SenderDashboard;
