import { FC, ReactNode, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";

interface MederiLayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  text: string;
}

const navItems: NavItem[] = [
  { path: "/users", text: "Usuarios" },
  { path: "/rooms", text: "Salas" },
  { path: "/reservations", text: "Reservaciones" },
];

export const MederiLayout: FC<MederiLayoutProps> = ({ children }) => {
  
  const location = useLocation();
  const { user } = useContext( AuthContext );
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <nav className="bg-[#FF853E] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src="/images/mederi.png" alt="Logo Méderi" className="h-10" />
            </Link>
          </div>

          <div className="flex space-x-4">
            {navItems.map(({ path, text }) => (
              <Link
                key={path}
                to={path}
                className={`text-lg font-semibold px-3 py-2 rounded hover:bg-[#F57931] transition-colors ${
                  location.pathname === path ? "bg-[#F57931]" : ""
                }`}
              >
                {text}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to={`/users/${ user.data.id }`}
              className={`text-lg font-semibold px-3 py-2 rounded hover:bg-[#F57931] transition-colors ${
                location.pathname.includes(`/users/${ user.data.id }`) ? "bg-[#F57931]" : ""
              }`}
            >
              Mi Cuenta
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>

      <footer className="bg-[#F05A03] text-white text-center py-4">
        © 2024 Méderi - Todos los derechos reservados.
      </footer>
    </div>
  );
};
