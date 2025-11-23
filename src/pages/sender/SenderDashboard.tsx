// src/pages/sender/SenderDashboard.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetMyParcelsQuery, useCreateParcelMutation } from "@/services/parcelApiSlice";
import { IParcel } from "@/types/parcel";
import Input from "@/components/ui/input";

const SenderDashboard = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth?.user?._id || null;

  const { data, isLoading, isError } = useGetMyParcelsQuery();
  const [createParcel] = useCreateParcelMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleCreateParcel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createParcel({
        type: formData.type,
        weight: Number(formData.weight),
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
        fee: Number(formData.fee),
      }).unwrap();
      setModalOpen(false);
      setFormData({ type: "", weight: "", pickupAddress: "", deliveryAddress: "", fee: "" });
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Sender Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create New Parcel
        </button>
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

      {/* Modal for creating parcel */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Parcel</h2>
            <form onSubmit={handleCreateParcel}>
              <Input
                label="Parcel Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />
              <Input
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
              <Input
                label="Pickup Address"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                required
              />
              <Input
                label="Delivery Address"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                required
              />
              <Input
                label="Fee"
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SenderDashboard;
