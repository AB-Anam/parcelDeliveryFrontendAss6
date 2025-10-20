import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateParcelMutation } from "@/services/parcelApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Button, Container } from "@/components/ui";

const createParcelSchema = z.object({
  type: z.string().min(1, "Type is required"),
  weight: z.number().min(0.01, "Weight must be > 0"),
  receiverId: z.string().min(1, "Receiver ID is required"),
  pickupAddress: z.string().min(3, "Pickup address is required"),
  deliveryAddress: z.string().min(3, "Delivery address is required"),
  fee: z.number().min(0, "Fee must be >= 0"),
});

type CreateParcelForm = z.infer<typeof createParcelSchema>;

export default function CreateParcelPage(): JSX.Element {
  const navigate = useNavigate();
  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateParcelForm>({
    resolver: zodResolver(createParcelSchema),
    defaultValues: {
      type: "",
      weight: 0.1,
      receiverId: "",
      pickupAddress: "",
      deliveryAddress: "",
      fee: 0,
    },
  });

  const onSubmit = async (values: CreateParcelForm) => {
    try {
      // API expects receiverId as string and numeric fields present
      const payload = {
        type: values.type,
        weight: Number(values.weight),
        receiverId: values.receiverId,
        pickupAddress: values.pickupAddress,
        deliveryAddress: values.deliveryAddress,
        fee: Number(values.fee),
      };
      const res = await createParcel(payload).unwrap();
      // res is the created parcel — redirect to sender dashboard or parcel details
      reset();
      navigate("/sender"); // change to detail page if you have one
    } catch (err: any) {
      // show a simple alert; replace with toast if you have one
      alert(err?.data?.message || err?.message || "Failed to create parcel");
    }
  };

  return (
    <Container className="py-12">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create Parcel</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Input {...register("type")} placeholder="e.g. Document, Box" />
              {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <Input type="number" step="0.01" {...register("weight", { valueAsNumber: true })} />
              {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Receiver ID</label>
              <Input {...register("receiverId")} placeholder="Receiver user id" />
              {errors.receiverId && <p className="text-sm text-red-500 mt-1">{errors.receiverId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pickup Address</label>
              <Input {...register("pickupAddress")} placeholder="Pickup address" />
              {errors.pickupAddress && <p className="text-sm text-red-500 mt-1">{errors.pickupAddress.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Delivery Address</label>
              <Input {...register("deliveryAddress")} placeholder="Delivery address" />
              {errors.deliveryAddress && <p className="text-sm text-red-500 mt-1">{errors.deliveryAddress.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fee</label>
              <Input type="number" step="0.01" {...register("fee", { valueAsNumber: true })} />
              {errors.fee && <p className="text-sm text-red-500 mt-1">{errors.fee.message}</p>}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Parcel"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
