// src/features/parcels/CreateParcelPage.tsx
import React, { useState } from "react";
import { useCreateParcelMutation } from "@/services/apiSlice";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { toast } from "sonner"; // ✅ shadcn/ui toast
import { cn } from "@/lib/utils";

// ✅ Local helper components (replace missing imports)
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
);

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className="block text-sm font-medium text-gray-700 mb-1" {...props} />
);

export default function CreateParcelPage() {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    pickupAddress: "",
    deliveryAddress: "",
  });

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        type: formData.type,
        weight: Number(formData.weight),
        pickupAddress: formData.pickupAddress,
        deliveryAddress: formData.deliveryAddress,
      };

      const response = await createParcel(payload).unwrap();

      toast.success("✅ Parcel created successfully!");
      console.log("Created parcel:", response);

      // Reset form
      setFormData({
        type: "",
        weight: "",
        pickupAddress: "",
        deliveryAddress: "",
      });
    } catch (err: any) {
      console.error("❌ Error creating parcel:", err);
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <Container>
      <Card className="mt-10 shadow-md border border-gray-200">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Create a New Parcel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <Label htmlFor="type">Parcel Type</Label>
              <Input
                id="type"
                name="type"
                placeholder="e.g. Documents, Electronics"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                placeholder="e.g. 2.5"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Pickup Address */}
            <div>
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <Input
                id="pickupAddress"
                name="pickupAddress"
                placeholder="Enter pickup address"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Input
                id="deliveryAddress"
                name="deliveryAddress"
                placeholder="Enter delivery address"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
              >
                {isLoading ? "Creating..." : "Create Parcel"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
