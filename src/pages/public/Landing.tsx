import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Fast, Secure & Reliable Parcel Delivery
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Send and track your parcels across the country with ease and confidence.
          Experience seamless delivery management for senders, receivers, and admins.
        </p>

        <Link to="/track">
          <Button size="lg" className="rounded-2xl">
            Track Your Parcel
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-12 w-full max-w-4xl"
      >
        <Card className="shadow-xl border-none rounded-2xl">
          <CardContent className="p-0">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
              alt="Parcel delivery"
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
