export interface Service {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  image: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
}

export const SERVICES: Service[] = [
  {
    id: "bao-tri-may-nen-bitzer",
    slug: "bao-tri-may-nen-bitzer",
    name: "Bảo trì máy nén Bitzer",
    shortName: "BẢO TRÌ MÁY NÉN",
    image: "/file.svg",
    description:
      "Dịch vụ bảo trì máy nén Bitzer chuyên nghiệp, đảm bảo hiệu suất tối ưu và tuổi thọ thiết bị.",
    detailedDescription:
      "Dịch vụ bảo trì máy nén Bitzer của chúng tôi tập trung vào việc đánh giá kỹ lưỡng thay vì thay thế linh kiện ngẫu nhiên. Chúng tôi thực hiện kiểm tra và vệ sinh toàn diện các bộ phận chính, áp dụng cho mọi loại máy nén BITZER từ máy nén compact đến máy nén trục vít NH3 cỡ lớn.\n\nMáy nén là trung tâm của hệ thống làm lạnh và cung cấp hiệu suất cao nhất trong suốt thời gian hoạt động. Green Point cung cấp sự chăm sóc đặc biệt và chuyên môn để đảm bảo máy nén đạt tuổi thọ và độ bền tối đa.",
    features: [
      "Thay mới, tái chế tạo và sửa chữa đều lưu ý đến các khía cạnh kinh tế, lợi nhuận và bền vững",
      "Đầy đủ dịch vụ: kiểm tra và thay mới vô điều kiện tất cả bộ phận bị mòn và thiết bị để đảm bảo an toàn",
      "Nâng cấp và cải tiến các máy nén",
      "Chế tạo lại là dùng lại! Tiết kiệm nguyên liệu quý giá và giảm chi phí",
    ],
  },
  {
    id: "lap-dat-may-nen-bitzer",
    slug: "lap-dat-may-nen-bitzer",
    name: "Lắp đặt máy nén Bitzer",
    shortName: "LẮP ĐẶT MÁY NÉN",
    image: "/file.svg",
    description:
      "Dịch vụ lắp đặt máy nén Bitzer chuyên nghiệp, đảm bảo vận hành ổn định và hiệu quả.",
    detailedDescription:
      "Dịch vụ lắp đặt máy nén Bitzer của chúng tôi cung cấp giải pháp toàn diện từ khảo sát, thiết kế đến lắp đặt và vận hành. Đội ngũ kỹ thuật viên giàu kinh nghiệm đảm bảo quy trình lắp đặt đúng tiêu chuẩn nhà sản xuất.\n\nChúng tôi cam kết mang đến hệ thống làm lạnh hoạt động ổn định, tiết kiệm năng lượng và dễ dàng bảo trì trong tương lai.",
    features: [
      "Khảo sát và tư vấn miễn phí tại công trình",
      "Thiết kế hệ thống tối ưu theo nhu cầu khách hàng",
      "Lắp đặt theo đúng tiêu chuẩn BITZER",
      "Bàn giao và hướng dẫn vận hành chi tiết",
      "Bảo hành và hỗ trợ kỹ thuật sau lắp đặt",
    ],
  },
];
