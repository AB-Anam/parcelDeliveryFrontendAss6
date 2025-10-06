import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar, Footer, Container, Card, CardContent, Input, Button } from "@/components/ui";
import { useCreateParcelMutation } from "@/services/apiSlice";

const schema = z.object({
  type: z.string().min(1),
  weight: z.number().min(0.1),
  receiverId: z.string().min(1),
  pickupAddress: z.string().min(1),
  deliveryAddress: z.string().min(1),
  fee: z.number().min(0),
});

export default function CreateParcel() {
  const [createParcel] = useCreateParcelMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      await createParcel(data).unwrap();
      alert("Parcel created successfully!");
    } catch {
      alert("Error creating parcel");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-12 max-w-md">
        <Card>
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Type" {...register("type")} />
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}

              <Input type="number" placeholder="Weight" {...register("weight", { valueAsNumber: true })} />
              {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}

              <Input placeholder="Receiver ID" {...register("receiverId")} />
              {errors.receiverId && <p className="text-red-500">{errors.receiverId.message}</p>}

              <Input placeholder="Pickup Address" {...register("pickupAddress")} />
              {errors.pickupAddress && <p className="text-red-500">{errors.pickupAddress.message}</p>}

              <Input placeholder="Delivery Address" {...register("deliveryAddress")} />
              {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress.message}</p>}

              <Input type="number" placeholder="Fee" {...register("fee", { valueAsNumber: true })} />
              {errors.fee && <p className="text-red-500">{errors.fee.message}</p>}

              <Button type="submit">Create Parcel</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
