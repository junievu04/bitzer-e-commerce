import { Chatbot } from "@/modules/layout/chatbot";
import { ContactButtons } from "@/modules/layout/contact-buttons";
import { Footer } from "@/modules/layout/footer";
import { Header } from "@/modules/layout/header";
import { styled } from "@/vendors/styled-system/jsx";

const Wrapper = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100dvh",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ContactButtons />
      <Chatbot />
    </Wrapper>
  );
}
