import ResponsiveNavbar from "./components/ResponsiveNavbar";
import { Product, User } from "./models";

interface LayoutProps {
  user: User | null;
  cart: Product[];
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps & { children: React.ReactNode }> = ({
  children,
  user,
  cart,
  handleLogout,
}) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <ResponsiveNavbar user={user} cart={cart} handleLogout={handleLogout} />
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
  </div>
);

export default Layout;
