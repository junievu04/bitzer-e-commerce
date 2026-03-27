import {
  Chatbot,
  ContactButtons,
  Footer,
  Header,
} from "@/modules/layout/components";
import { fetchChatbotData } from "@/modules/layout/utils/fetch-chatbot-data";
import { styled } from "@/vendors/styled-system/jsx";

const Wrapper = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100dvh",
  },
});

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatbotData = await fetchChatbotData();

  return (
    <Wrapper>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ContactButtons />
      <Chatbot data={chatbotData} />
    </Wrapper>
  );
}
