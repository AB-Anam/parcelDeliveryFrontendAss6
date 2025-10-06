import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar, Footer, Container, Card, CardContent, Input, Button } from "@/components/ui";
import { useRegisterMutation } from "@/services/apiSlice";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["sender", "receiver", "admin"]),
});

export default function Register() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data).unwrap();
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-12 max-w-md">
        <Card>
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Name" {...register("name")} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Input placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Input placeholder="Password" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <select {...register("role")} className="w-full p-3 border rounded-md">
                  <option value="">Select Role</option>
                  <option value="sender">Sender</option>
                  <option value="receiver">Receiver</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
              </div>
              <Button type="submit">Register</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
