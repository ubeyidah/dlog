import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import Wrapper from "@/components/shared/wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Wrapper as="main" className="flex flex-col flex-1 py-16 min-h-screen">
        {children}
      </Wrapper>
      <Footer />
    </>
  );
}
