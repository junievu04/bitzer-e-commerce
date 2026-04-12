import { INFO_COMPANY } from "@/constants";
import type { ChatRule } from "./chatbot.d";

export const SUGGESTION_TOPICS = [
  { label: "Máy nén & cụm", key: "compressor" },
  { label: "Dầu & bình ngưng", key: "gas" },
  { label: "Sửa chữa", key: "repair" },
  { label: "Bảo trì", key: "warranty" },
  { label: "Khác", key: "other" },
];

export const CHATBOT_RULES: ChatRule[] = [
  {
    keywords: ["xin chào", "hello", "hi", "chào"],
    response: `Xin chào! Tôi là trợ lý tư vấn của ${INFO_COMPANY.shortName}. Bạn quan tâm máy nén Bitzer, cụm máy nén, dầu/bình ngưng hay dịch vụ kỹ thuật?`,
  },
  {
    keywords: [
      "compressor",
      "máy nén",
      "may nen",
      "bitzer",
      "piston",
      "trục vít",
      "truc vit",
      "semi",
      "ecolite",
      "ecostar",
      "4ees",
      "s6f",
      "cụm máy nén",
      "cum may nen",
      "co2",
    ],
    response:
      "Danh mục hiện có: cụm máy nén Bitzer (piston nửa kín / 2 cấp / dạng hở…), máy nén trục vít, cụm máy nén dàn ngưng (Ecolite, Ecostar, giải nhiệt nước/gió…). Bạn muốn xem dòng nào?",
    topic: "compressor",
  },
  {
    keywords: [
      "gas",
      "gas lạnh",
      "r22",
      "r410",
      "r404",
      "r507",
      "môi chất",
      "dầu máy nén",
      "dau may nen",
      "bse170",
      "bse32",
      "b320",
      "bình ngưng",
      "binh ngung",
      "tách dầu",
      "tach dau",
    ],
    response:
      "Chúng tôi có dầu máy nén Bitzer (BSE170, BSE32, B320SH…), bình ngưng – bình tách dầu và vật tư ngành lạnh; gas/môi chất theo từng hệ thống — liên hệ để được tư vấn đúng chủng loại.",
    topic: "gas",
  },
  {
    keywords: ["giá", "bao nhiêu", "chi phí", "price"],
    response:
      "Giá niêm yết trên website theo từng sản phẩm. Để báo giá theo số lượng hoặc cấu hình cụm, vui lòng gọi hotline hoặc gửi yêu cầu tại trang Liên hệ.",
  },
  {
    keywords: ["bảo hành", "warranty", "đổi trả", "bảo trì định kỳ"],
    response:
      "Chính sách bảo hành và bảo trì thực hiện theo từng mặt hàng và thỏa thuận hợp đồng. Bạn có thể xem dịch vụ bảo trì tại mục Dịch vụ hoặc liên hệ trực tiếp để được hướng dẫn.",
    topic: "warranty",
  },
  {
    keywords: ["giao hàng", "ship", "vận chuyển", "delivery"],
    response:
      "Phạm vi và thời gian giao hàng/lắp đặt phụ thuộc khoảng cách và loại hàng. Vui lòng liên hệ để thống nhất lịch giao phù hợp.",
  },
  {
    keywords: ["sửa chữa", "repair", "sự cố", "hỏng máy"],
    response: `Đại Tín nhận sửa chữa máy nén Bitzer theo quy trình rõ ràng. Đặt lịch hoặc mô tả sự cố qua hotline ${INFO_COMPANY.phone} hoặc trang Liên hệ.`,
    topic: "repair",
  },
  {
    keywords: ["other", "khác", "khác nữa"],
    response: `Tôi có thể giới thiệu nhanh máy nén/cụm Bitzer, dầu & bình ngưng, hoặc dịch vụ sửa chữa – bảo trì. Bạn muốn đi sâu mảng nào?`,
    topic: "other",
  },
];
