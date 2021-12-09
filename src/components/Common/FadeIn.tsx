import {motion} from "framer-motion";
import React from "react";

type Props = {
    children: React.ReactNode;
}

const FadeIn = ({children}: Props) => {
    return(
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
            }}>
            {children}
        </motion.div>
    )
};

export default FadeIn;