import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  delay: number;
}

export function LinkCard({ href, title, icon, delay }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass hover-glass w-full p-4 rounded-xl flex items-center justify-between group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-lg font-medium text-zinc-300">{title}</span>
      </div>
      <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
    </motion.a>
  );
}