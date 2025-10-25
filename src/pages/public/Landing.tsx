import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Updated HERO_IMAGE_URL with a valid image from Pixabay
const HERO_IMAGE_URL = "https://cdn.pixabay.com/photo/2020/04/06/10/54/parcel-5018980_960_720.jpg";

export default function Landing() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-sky-500" />,
      title: "Lightning Fast Delivery",
      description:
        "Our optimized logistics network ensures your parcels arrive at their destination in record time.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-sky-500" />,
      title: "Secure & Insured",
      description:
        "Rest easy knowing your parcels are protected with end-to-end tracking and comprehensive insurance.",
    },
    {
      icon: <Clock className="h-8 w-8 text-sky-500" />,
      title: "Real-Time Tracking",
      description:
        "Monitor your delivery every step of the way with our live tracking system, available 24/7.",
    },
  ];

  const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className="flex flex-col items-center w-full bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6"
            >
              Reliable, Fast, and{" "}
              <span className="text-sky-500">Simple</span> Parcel Delivery
            </motion.h1>
            <motion.p
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Effortlessly send and monitor your parcels across the nation. We provide a seamless delivery experience for everyone.
            </motion.p>
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Link to="/track">
                {/* The "Cool" Button with Shimmer Effect */}
                <Button
                  size="lg"
                  className="group relative overflow-hidden w-full sm:w-auto text-lg font-semibold text-white bg-sky-500 rounded-xl shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-sky-500/50"
                >
                  <span className="relative flex items-center">
                    Track Your Parcel
                    <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 h-[200%] w-[200%] -translate-x-[75%] translate-y-[75%] rotate-45 bg-white/20 opacity-0 transition-all duration-700 group-hover:translate-x-[-25%] group-hover:translate-y-[-25%] group-hover:opacity-100" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center"
          >
            <img
              src={HERO_IMAGE_URL}
              alt="Parcel delivery illustration"
              className="w-full max-w-md lg:max-w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-white py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Why Choose Our Service?
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              We've engineered a delivery experience that is second to none, focusing on what matters most to you.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={FADE_UP_ANIMATION_VARIANTS}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Card className="h-full bg-white border border-slate-200 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-sky-300">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-4 bg-sky-50 rounded-full mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
