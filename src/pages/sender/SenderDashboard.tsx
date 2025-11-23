import React from "react";
import { useGetMyParcelsQuery } from "@/services/parcelApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { IParcel } from "@/types/parcel";

const SenderDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Failed to load parcels.</p>;

  // ✅ Ensure parcels is always an array
  const parcels: IParcel[] = Array.isArray(data?.parcels) ? data.parcels : [];

  // Filter parcels created by the sender
  const myParcels = parcels.filter((p) => p.senderId === user?._id);

  // Stats
  const pending = myParcels.filter((p) => p.status === "pending").length;
  const onTheWay = myParcels.filter((p) => p.status === "in_transit").length;
  const delivered = myParcels.filter((p) => p.status === "delivered").length;
  const cancelled = myParcels.filter((p) => p.status === "cancelled").length;

  const totalFees = myParcels.reduce((sum, p) => sum + (p.fee || 0), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Sender Dashboard</h1>

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
        {myParcels.map((parcel) => (
          <div key={parcel._id} className="p-4 bg-white shadow rounded-lg">
            <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
            <p><strong>Type:</strong> {parcel.type}</p>
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Receiver:</strong> {parcel.receiverId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SenderDashboard;
