import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateParcelMutation } from "../../services/apiSlice";
import { Card, CardContent, Input, Button } from "@/components/ui";

const schema = z.object({
  type: z.string().min(2),
  weight: z.number().positive(),
  receiverId: z.string().min(1),
  pickupAddress: z.string().min(5),
  deliveryAddress: z.string().min(5),
  fee: z.number().positive(),
});
type Form = z.infer<typeof schema>;

export default function CreateParcelPage() {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const { register, handleSubmit, formState } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await createParcel(data).unwrap();
      alert("Parcel created successfully!");
    } catch (err: any) {
      alert(err?.data?.message || "Error creating parcel");
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardContent>
        <h2 className="text-xl mb-4">Create Parcel</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder="Type" {...register("type")} />
          {formState.errors.type && <p className="text-red-500 text-sm">{String(formState.errors.type.message)}</p>}

          <Input placeholder="Weight" type="number" {...register("weight", { valueAsNumber: true })} />
          {formState.errors.weight && <p className="text-red-500 text-sm">{String(formState.errors.weight.message)}</p>}

          <Input placeholder="Receiver ID" {...register("receiverId")} />
          {formState.errors.receiverId && <p className="text-red-500 text-sm">{String(formState.errors.receiverId.message)}</p>}

          <Input placeholder="Pickup Address" {...register("pickupAddress")} />
          <Input placeholder="Delivery Address" {...register("deliveryAddress")} />
          <Input placeholder="Fee" type="number" {...register("fee", { valueAsNumber: true })} />

          <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Create Parcel"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
