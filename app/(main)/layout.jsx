import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
    </>
  );
}
