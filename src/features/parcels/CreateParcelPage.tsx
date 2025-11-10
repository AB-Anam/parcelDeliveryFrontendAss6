// src/features/parcels/CreateParcelPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useCreateParcelMutation } from "@/services/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function CreateParcelPage() {
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();
  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const receivers = users.filter((u) => u.role === "receiver");

  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    receiverId: "",
    pickupAddress: "",
    deliveryAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.receiverId) {
        toast.error("Please select a receiver");
        return;
      }

      const payload = {
        type: formData.type,
        weight: Number(formData.weight),
        receiverId: formData.receiverId,
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
      };

      console.log("🚀 Sending parcel payload:", payload);

      const response = await createParcel(payload).unwrap();

      toast.success("✅ Parcel created successfully!");
      console.log("Created parcel:", response);

      setFormData({
        type: "",
        weight: "",
        receiverId: "",
        pickupAddress: "",
        deliveryAddress: "",
      });

      navigate("/sender");
    } catch (err: any) {
      console.error("❌ Error creating parcel:", err);
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">📦 Create New Parcel</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Parcel Type</Label>
              <Input name="type" value={formData.type} onChange={handleChange} required />
            </div>

            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Receiver</Label>
              <select
                name="receiverId"
                value={formData.receiverId}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Receiver</option>
                {receivers.map((receiver) => (
                  <option key={receiver._id} value={receiver._id}>
                    {receiver.name} ({receiver.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Pickup Address</Label>
              <Input
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Delivery Address</Label>
              <Input
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white">
              {isLoading ? "Creating..." : "Create Parcel"}
            </Button>
          </form>

          <Button
            onClick={() => navigate("/sender")}
            variant="outline"
            className="w-full mt-4"
          >
            ⬅ Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

