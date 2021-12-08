import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function Layout({children, ...props}: Props) {
    return  <div {...props}>{children}</div>
}