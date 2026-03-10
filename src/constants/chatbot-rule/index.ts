export type ChatRule = {
  keywords: string[];
  response: string;
  products?: string[]; // product codes to suggest
};

export const CHATBOT_RULES: ChatRule[] = [
  {
    keywords: ["xin chào", "hello", "hi", "chào"],
    response:
      "Xin chào! Tôi là trợ lý tư vấn của BITZERshop. Bạn cần tư vấn về sản phẩm nào?",
  },
  {
    keywords: ["4hp", "4 hp", "máy nén 4hp", "compressor"],
    response: "Các sản phẩm phụ tùng máy nén 4HP phù hợp:",
    products: ["2DTS-2Y-40S", "2DES-3Y-40S"],
  },
  {
    keywords: ["gas", "gas lạnh", "r22", "r410", "r404"],
    response:
      "Chúng tôi cung cấp đầy đủ các loại gas lạnh: R22, R410A, R404A, R507. Bạn cần gas loại nào?",
    products: ["GAS-R22", "GAS-R410A"],
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
  },
  {
    keywords: ["giao hàng", "ship", "vận chuyển", "delivery"],
    response:
      "Chúng tôi giao hàng toàn quốc trong 2-5 ngày. TP.HCM giao trong ngày (đặt trước 14h).",
  },
  {
    keywords: ["sửa chữa", "repair", "dịch vụ"],
    response:
      "Chúng tôi cung cấp dịch vụ sửa chữa máy nén Bitzer tại xưởng. Liên hệ 0909 123 456 để đặt lịch.",
  },
];

export function getChatbotResponse(message: string): ChatRule {
  const lower = message.toLowerCase().trim();
  for (const rule of CHATBOT_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule;
    }
  }
  return {
    keywords: [],
    response:
      "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng liên hệ hotline 0909 123 456 hoặc chat trực tiếp qua Zalo/Messenger.",
  };
}
