import { useState } from "react";
import { useCreateParcelMutation } from "@/services/apiSlice";
import { useNavigate } from "react-router-dom";

export default function CreateParcelPage() {
  const [formData, setFormData] = useState({ type: "", weight: "" , pickupAddress: "", deliveryAddress: "" });
  const [createParcel] = useCreateParcelMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createParcel({
        type: formData.type,
        weight: Number(formData.weight),
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
      }).unwrap();
      alert("Parcel created successfully!");
      navigate("/sender");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Parcel Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          placeholder="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Parcel
        </button>
      </form>
    </div>
  );
}
