import { INFO_COMPANY } from "@/constants";
import type { ChatRule } from "./chatbot.d";

export const SUGGESTION_TOPICS = [
  { label: "Máy nén", key: "compressor" },
  { label: "Gas", key: "gas" },
  { label: "Sửa chữa", key: "repair" },
  { label: "Bảo hành", key: "warranty" },
  { label: "Khác", key: "other" },
];

export const CHATBOT_RULES: ChatRule[] = [
  {
    keywords: ["xin chào", "hello", "hi", "chào"],
    response: `Xin chào! Tôi là trợ lý tư vấn của ${INFO_COMPANY.shortName}. Bạn cần tư vấn về sản phẩm nào?`,
  },
  {
    keywords: ["4hp", "4 hp", "máy nén 4hp", "compressor"],
    response: "Các sản phẩm phụ tùng máy nén 4HP phù hợp:",
    topic: "compressor",
  },
  {
    keywords: ["gas", "gas lạnh", "r22", "r410", "r404"],
    response:
      "Chúng tôi cung cấp đầy đủ các loại gas lạnh: R22, R410A, R404A, R507. Bạn cần gas loại nào?",
    topic: "gas",
  },
  {
    keywords: ["giá", "bao nhiêu", "chi phí", "price"],
    response:
      "Giá sản phẩm được cập nhật trực tiếp trên website. Bạn có thể xem tại trang Sản phẩm hoặc liên hệ hotline để được báo giá nhanh nhất.",
  },
  {
    keywords: ["bảo hành", "warranty", "đổi trả"],
    response:
      "Tất cả sản phẩm được bảo hành chính hãng 12 tháng. Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất.",
    topic: "warranty",
  },
  {
    keywords: ["giao hàng", "ship", "vận chuyển", "delivery"],
    response:
      "Chúng tôi giao hàng toàn quốc trong 2-5 ngày. TP.HCM giao trong ngày (đặt trước 14h).",
  },
  {
    keywords: ["sửa chữa", "repair", "dịch vụ"],
    response: `Chúng tôi cung cấp dịch vụ sửa chữa máy nén Bitzer tại xưởng. Liên hệ ${INFO_COMPANY.phone} để đặt lịch.`,
    topic: "repair",
  },
  {
    keywords: ["other", "khác", "khác nữa", "khác nữa"],
    response: `Xin chào! Tôi là trợ lý tư vấn ảo của ${INFO_COMPANY.shortName}. Bạn cần tư vấn về sản phẩm/ dịch vụ nào?`,
    topic: "other",
  },
];
