import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountSidebar } from "@/components/layout/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">
                My Account
              </h2>
              <AccountSidebar />
            </div>
          </aside>
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
