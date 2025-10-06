import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Input, Button, Container } from "@/components/ui";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["sender", "receiver", "admin"]),
});
type Form = z.infer<typeof schema>;

export default function Register() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await registerUser(data).unwrap();
      alert("Registered! Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="py-12">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h2 className="text-xl mb-4">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input placeholder="Name" {...register("name")} />
            {formState.errors.name && <p className="text-sm text-red-500">{String(formState.errors.name.message)}</p>}
            <Input placeholder="Email" {...register("email")} />
            {formState.errors.email && <p className="text-sm text-red-500">{String(formState.errors.email.message)}</p>}
            <Input placeholder="Password" type="password" {...register("password")} />
            {formState.errors.password && <p className="text-sm text-red-500">{String(formState.errors.password.message)}</p>}
            <select {...register("role")} className="w-full p-2 border rounded">
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
              <option value="admin">Admin</option>
            </select>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
