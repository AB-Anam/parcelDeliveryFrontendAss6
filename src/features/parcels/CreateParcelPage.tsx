import React, { useState } from "react";
import { Card, CardContent, Input, Button, Container } from "@/components/ui";
import { useCreateParcelMutation } from "@/services/apiSlice";

export default function CreateParcelPage() {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [receiverId, setReceiverId] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParcel({
        type,
        weight: Number(weight),
        receiverId,
        pickupAddress,
        deliveryAddress,
      }).unwrap();
      alert("Parcel created successfully!");
    } catch (err) {
      alert("Failed to create parcel");
    }
  };

  return (
    <Container className="py-12 max-w-lg mx-auto">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Parcel Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <Input
              placeholder="Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />
            <Input
              placeholder="Pickup Address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
            <Input
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Parcel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
