import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar, Footer, Container, Card, CardContent, Input, Button } from "@/components/ui";
import { useLoginMutation } from "@/services/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res: any = await login(data).unwrap();
      Cookies.set("token", res.token);
      Cookies.set("role", res.role);
      dispatch(setCredentials({ token: res.token, role: res.role }));
      if (res.role === "sender") navigate("/sender");
      else if (res.role === "receiver") navigate("/receiver");
      else navigate("/admin");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-12 max-w-md">
        <Card>
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Input type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
