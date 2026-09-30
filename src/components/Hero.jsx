import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Clock, Globe2, Sparkles } from "lucide-react";

export default function Hero() {
  const { location } = useUser();
  const timeZone = location?.timezone || "UTC";
  const now = new Date();

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      {/* Floating blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-pulse-glow"></div>

      {/* Animated ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full animate-spin-slow"></div>

      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Time Governs Everything
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30 blur-xl"></div>
            <div className="relative font-mono text-6xl md:text-9xl font-bold bg-card/80 backdrop-blur rounded-3xl px-12 py-6 border border-border shadow-2xl">
              {now.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2"
        >
          <Globe2 className="h-6 w-6" /> World clocks, astronomy, and more – all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm bg-card/60 backdrop-blur rounded-full px-4 py-2 border border-border">
            <Clock className="h-4 w-4 text-primary" /> {now.toLocaleDateString('en-US', { timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-2 text-sm bg-card/60 backdrop-blur rounded-full px-4 py-2 border border-border">
            <Sparkles className="h-4 w-4 text-accent" /> Day of Year: {Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
