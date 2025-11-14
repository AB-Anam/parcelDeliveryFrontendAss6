import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateParcelMutation } from "@/services/apiSlice";
import Input  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function CreateParcelPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    pickupAddress: "",
    deliveryAddress: "",
  });

  const [createParcel] = useCreateParcelMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createParcel({
        ...formData,
        weight: Number(formData.weight),
      }).unwrap();
      toast.success("✅ Parcel created successfully!");
      navigate("/sender/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>
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
        <Input
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
        />
        <Input
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Create Parcel
        </Button>
      </form>
    </div>
  );
}
