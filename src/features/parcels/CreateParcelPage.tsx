// src/pages/CreateParcelPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  Input  from "@/components/ui/input";
import Textarea  from "@/components/ui/textarea";
import {
  useCreateParcelMutation,
  useDeliverParcelMutation,
} from "@/services/apiSlice";

export default function CreateParcelPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    pickupAddress: "",
    deliveryAddress: "",
  });

  const [receiverId, setReceiverId] = useState("");

  const [createParcel, { isLoading: creating }] = useCreateParcelMutation();
  const [deliverParcel, { isLoading: delivering }] = useDeliverParcelMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create parcel first (without receiver)
      const payload = {
        type: formData.type,
        weight: Number(formData.weight),
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
      };

      const createdParcel = await createParcel(payload).unwrap();
      toast.success("✅ Parcel created successfully!");

      // If receiverId is provided, assign receiver (deliver parcel)
      if (receiverId) {
        await deliverParcel({ parcelId: createdParcel._id!, receiverId }).unwrap();
        toast.success("🚚 Parcel assigned to receiver successfully!");
      }

      // Reset form
      setFormData({
        type: "",
        weight: "",
        pickupAddress: "",
        deliveryAddress: "",
      });
      setReceiverId("");

      // Navigate back to dashboard
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
          <h1 className="text-2xl font-bold">➕ Create Parcel</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="type"
              placeholder="Parcel Type"
              value={formData.type}
              onChange={handleChange}
              required
            />
            <Input
              name="weight"
              type="number"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <Textarea
              name="pickupAddress"
              placeholder="Pickup Address"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
            />
            <Textarea
              name="deliveryAddress"
              placeholder="Delivery Address"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
            />
            <Input
              name="receiverId"
              placeholder="Receiver ID (optional, assign later if empty)"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={creating || delivering}>
              {creating ? "Creating..." : delivering ? "Assigning..." : "Create Parcel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
