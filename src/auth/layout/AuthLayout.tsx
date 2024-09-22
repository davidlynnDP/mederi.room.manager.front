import { FC, ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}
  
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-[#F05A03] flex items-center justify-center">
      { children }
    </div>
  );
}