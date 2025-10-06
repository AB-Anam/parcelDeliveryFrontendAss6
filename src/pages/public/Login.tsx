import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../services/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Input, Button, Container } from "@/components/ui";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      const res = await login(data).unwrap();
      // res expected { token, role, user }
      dispatch(setCredentials({ token: res.token, role: res.role }));
      if (res.role === "admin") navigate("/admin");
      else if (res.role === "sender") navigate("/sender");
      else navigate("/receiver");
    } catch (err: any) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="py-12">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h2 className="text-xl mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input placeholder="Email" {...register("email")} />
            {formState.errors.email && <p className="text-sm text-red-500">{String(formState.errors.email.message)}</p>}
            <Input placeholder="Password" type="password" {...register("password")} />
            {formState.errors.password && <p className="text-sm text-red-500">{String(formState.errors.password.message)}</p>}
            <Button type="submit" disabled={isLoading}>{isLoading ? "Logging..." : "Login"}</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
