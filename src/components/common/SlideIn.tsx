import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const SlideIn = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : null,
  );
  const [isPhone, setPhone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      if (width && width <= 769) setPhone(true);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      {isPhone ? (
        <motion.div
          initial={'hidden'}
          whileInView={'visible'}
          viewport={{ once: true }}
          animate={{ x: '2%' }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          {children}
        </motion.div>
      ) : (
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
      )}
    </>
  );
};

export default SlideIn;
