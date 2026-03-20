import {
  Chatbot,
  ContactButtons,
  Footer,
  Header,
} from "@/modules/layout/components";
import { fetchChatbotData } from "@/modules/layout/utils/fetch-chatbot-data";
import { styled } from "@/vendors/styled-system/jsx";
import { ViewTransition } from "react";

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
      <ViewTransition>
        <main style={{ flex: 1 }}>{children}</main>
      </ViewTransition>
      <Footer />
      <ContactButtons />
      <Chatbot data={chatbotData} />
    </Wrapper>
  );
}
