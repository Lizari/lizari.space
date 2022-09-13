import { motion } from 'framer-motion';
import React from 'react';

const SlideIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      animate={{ x: '22%' }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
