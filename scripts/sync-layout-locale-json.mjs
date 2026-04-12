/**
 * One-off: strip obsolete layout keys from languages/*.json and merge
 * translations for strings used in seed-layouts-dai-tin.ts (home + about).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const viPath = path.join(root, "languages", "vi.json");
const enPath = path.join(root, "languages", "en.json");

/** Dates / phones are shown as-is via `t(key)` fallback when missing — do not store as locale keys */
function isDateLikeLocaleKey(k) {
  const t = k.trim();
  return (
    /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(t) ||
    /^\d{4}-\d{2}-\d{2}$/.test(t)
  );
}

function isPhoneLikeLocaleKey(k) {
  const t = k.trim();
  if (/^\(\+\d{1,3}\)\s*[\d\s]+$/.test(t)) return true;
  if (/^\+[\d\s().-]{8,}$/.test(t) && (t.match(/\d/g)?.length ?? 0) >= 8)
    return true;
  return false;
}

function shouldOmitLocaleKey(k) {
  return isDateLikeLocaleKey(k) || isPhoneLikeLocaleKey(k);
}

/** Keys only used by old layout / marketing copy — safe to drop if unused elsewhere */
const OBSOLETE_KEYS = new Set([
  "02/01/2025",
  "08/01/2025",
  "15/01/2025",
  "0962 884 529 (Ms. Vân)",
  "CP Group",
  "DAI TIN GROUP",
  "GO!",
  "Kido",
  "Kinh Đô",
  "Lotte",
  "M&M",
  "Thai Som Group",
  "Vinamilk",
  "KHÁCH HÀNG TIÊU BIỂU ",
  "Các sản phẩm phụ tùng máy nén 4HP phù hợp:",
  "Công ty TNHH ĐẠI TÍN Vietnam là trung tâm dịch vụ được ủy quyền duy nhất tại Việt Nam cho việc sửa chữa, bảo trì toàn diện máy nén BITZER. Hệ thống ĐẠI TÍN GROUP cung cấp cho khách hàng dịch vụ sửa chữa máy nén với các giá trị cốt lõi sau",
  "Công ty ĐẠI TÍN là đại lý nhượng quyền duy nhất của tập đoàn Bitzer Đức chuyên cung cấp dịch vụ sửa chữa, bảo dưỡng, phụ tùng và dầu nhớt cho hệ thống lạnh tại Việt Nam.",
  "Cụm Rack Bitzer",
  "Dai Tin Co., Ltd. cung cấp dịch vụ giao hàng tận nơi trên toàn quốc, đặc biệt dành cho các thiết bị máy nén lạnh và phụ tùng kỹ thuật yêu cầu vận chuyển cẩn thận. Chúng tôi đảm bảo hàng hóa được đóng gói chắc chắn, chống va đập và bảo vệ tối đa trong suốt quá trình vận chuyển.",
  "Dịch vụ Máy Nén Bitzer",
  "Dịch vụ thu mua máy nén cũ giá cao, hỗ trợ tận nơi, thanh toán nhanh chóng và minh bạch.",
  "Dự án đã hoàn thành",
  "Environmental care: Bảo vệ môi trường",
  "Expertise: Kỹ thuật chuyên môn đào tạo bởi BITZER",
  "Genuine spare parts: Phụ tùng chính hãng",
  "Giao hàng nhanh chóng trên toàn quốc",
  "Hơn 500 sản phẩm phụ tùng, linh kiện điện lạnh. Giao hàng nhanh toàn quốc. Tư vấn kỹ thuật 24/7.",
  "Hỗ trợ giao hàng theo yêu cầu (hẹn giờ, giao nhanh)",
  "Hình ảnh nhà máy / showroom",
  "Kiểm tra hàng trước khi nhận",
  "Kỹ sư chuyên nghiệp",
  "Mạng lưới ĐẠI TÍN chủ yếu để đây ứng đến tất cả người tiêu dùng khách hàng. Không tin vào hơn 50 trong tiêu chỉ của mạng lưới đó là khách hàng hiện diện ở đây. Dịch vụ của chuyên gia ĐẠI TÍN cung cấp tất cả đa dạng, để kỹ sư đến kỹ thuật. Để đáp ứng những thông tiếp theo từ tay của khách hàng.",
  "NHÀ CUNG CẤP DỊCH VỤ TOÀN CẦU",
  "Nhóm và ĐẠI TÍN thực hiện các việc liên tổ chức với các phát triển thị trường của máy nén BITZER, cùng như của những nhà sản xuất khác.",
  "Năm kinh nghiệm",
  "Năm kinh nghiệm tại Việt Nam",
  "Professionalism: Dịch vụ chuyên nghiệp",
  "Sản phẩm Bitzer chính hãng – Lựa chọn của khách hàng thông minh",
  "Thành tựu tiêu biểu DPV",
  "Thương hiệu BITZER được biên rộng từ chất lượng và chuyên môn, được ứng dụng rộng rãi các dịch vụ. Các mạng lưới điểm và của mạng lưới nhau mạnh.",
  "Thu mua máy nén",
  "Thu mua đa dạng các dòng máy nén lạnh cũ",
  "VỀ CHÚNG TÔI - ĐẠI TÍN",
  "VỀ GIÁ TRỊ ĐẠI TÍN",
  "Về vấn đề, Chúng tôi sở hữu cùng mỗi ưu hội của mạng lưới ĐẠI TÍN Competence Centre ở Pháp. Trung tâm này lý do giải và cơ cấu các khách hàng như nhân viên đội nhóm.",
  "Với gần 20 năm kinh nghiệm, chúng tôi không ngừng phát triển và chuẩn hóa chất lượng dịch vụ để đáp ứng ngày càng cao yêu cầu của quý khách hàng và khẳng định uy tín và thương hiệu trên thị trường Việt Nam.",
  "Đóng gói an toàn, chống va đập",
  "ĐẠI TÍN là trung tâm dịch vụ ủy quyền chính thức duy nhất tại Việt Nam được BITZER trao quyền thực hiện bảo trì toàn diện các dòng máy nén. Với hơn 15 năm kinh nghiệm trong ngành, chúng tôi đã thực hiện hàng trăm hợp đồng bảo trì định kỳ cho các doanh nghiệp lớn trong lĩnh vực lạnh công nghiệp, thực phẩm và điều hòa không khí trên toàn quốc.",
  "ĐẠI TÍN sở hữu xưởng sửa chữa máy nén hiện đại được trang bị đầy đủ thiết bị chuyên dụng theo tiêu chuẩn BITZER, bao gồm hệ thống kiểm tra chân không, nạp gas, cân bằng động rotor và đo lường điện tử chính xác cao. Chúng tôi có khả năng tiếp nhận và xử lý đồng thời nhiều máy nén từ các dòng piston, trục vít đến scroll với năng lực công suất đa dạng.",
  "Đại Tín cung cấp dịch vụ thu mua máy nén lạnh cũ từ các thương hiệu uy tín như BITZER, Copeland, Danfoss... với mức giá cạnh tranh trên thị trường. Chúng tôi nhận thu mua đa dạng các loại máy nén như piston, trục vít, xoắn ốc, phục vụ nhu cầu thanh lý thiết bị của doanh nghiệp và cá nhân.",
  "Định giá nhanh chóng, minh bạch theo tình trạng thực tế",
  "Hỗ trợ tháo dỡ và vận chuyển tận nơi",
  "Quy trình thu mua được thực hiện nhanh chóng và chuyên nghiệp: từ khảo sát tình trạng thiết bị, định giá minh bạch đến tháo dỡ và vận chuyển tận nơi. Đội ngũ kỹ thuật sẽ kiểm tra chi tiết tình trạng vận hành, công suất và tuổi thọ của máy để đưa ra mức giá hợp lý nhất cho khách hàng.",
  "Chứng nhận đại lý Bitzer",
  "ISO 9001:2015",
  "Chính hãng 100%",
  "Chính hãng",
  "Cam kết sử dụng các giải pháp thân thiện môi trường, hướng tới phát triển bền vững.",
  "Chúng tôi cung cấp các dịch vụ chuyên nghiệp cho máy nén Bitzer, từ bảo trì định kỳ đến lắp đặt hệ thống hoàn chỉnh. Đội ngũ kỹ thuật viên giàu kinh nghiệm cam kết mang đến giải pháp tối ưu cho quý khách hàng.",
  "Chúng tôi cung cấp dịch vụ sửa chữa máy nén Bitzer tại xưởng. Liên hệ 0962 884 529 để đặt lịch.",
  "Chúng tôi cung cấp đầy đủ các loại gas lạnh: R22, R410A, R404A, R507. Bạn cần gas loại nào?",
  "Chúng tôi giao hàng toàn quốc trong 2-5 ngày. TP.HCM giao trong ngày (đặt trước 14h).",
  "Chúng tôi hợp tác với các đơn vị vận chuyển uy tín và có đội ngũ giao nhận riêng tại TP. Hồ Chí Minh, giúp tối ưu thời gian giao hàng. Khách hàng có thể theo dõi tiến trình giao hàng và nhận thông báo khi hàng sắp đến nơi.",
  "Các dịch vụ kiểm tra máy nén mà không cần sự tốn kém, điểm qua cẩn thận trước và sau khi sản xuất, mang lại giá trị cao nhất cho khách hàng.",
  "Các dịch vụ sửa chữa máy nén mà không có sự tốn kém hay thay thế phụ kiện hàng năm. Tiết kiệm chi phí bằng cách thuê thợ sửa chữa tại chỗ, đội ngũ có kinh nghiệm lâu năm.",
  "Dịch vụ giao hàng tận nơi nhanh chóng, an toàn, đảm bảo thiết bị đến tay khách hàng đúng thời gian và tình trạng hoàn hảo.",
  "Dịch vụ tận tâm",
  "Giá sản phẩm được cập nhật trực tiếp trên website. Bạn có thể xem tại trang Sản phẩm hoặc liên hệ hotline để được báo giá nhanh nhất.",
  "Luôn đặt lợi ích khách hàng lên hàng đầu, hỗ trợ kỹ thuật 24/7 trên toàn quốc.",
  "Quy trình bảo trì của chúng tôi tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật do nhà máy BITZER ban hành, bao gồm kiểm tra áp suất, nhiệt độ vận hành, độ rung, tình trạng dầu bôi trơn và các thông số điện. Mỗi lần bảo trì đều được lập biên bản chi tiết và lưu trữ hồ sơ thiết bị, giúp khách hàng theo dõi lịch sử vận hành và dự đoán sớm các nguy cơ hỏng hóc trước khi xảy ra sự cố.",
  "Tìm kiếm đại lý cung cấp toàn bộ các loại phụ tùng gốc, đảm bảo mang lại dịch vụ và thiết bị an toàn nhất cho khách hàng trên toàn quốc.",
  "Toàn bộ phụ tùng và nhớt chỉ sử dụng hàng chính hãng Bitzer, cam kết chất lượng tuyệt đối.",
  "Tất cả sản phẩm được bảo hành chính hãng 12 tháng. Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất.",
  "Xin chào! Tôi là trợ lý tư vấn của ĐẠI TÍN. Bạn cần tư vấn về sản phẩm nào?",
  "Xin chào! Tôi là trợ lý tư vấn ảo của ĐẠI TÍN. Bạn cần tư vấn về sản phẩm/ dịch vụ nào?",
  "Đội ngũ kỹ sư được đào tạo chuyên môn bởi tập đoàn Bitzer Đức, nắm vững công nghệ tiên tiến.",
  "Đội ngũ kỹ sư, kỹ thuật viên của chúng tôi có tay nghề cao, trách nhiệm cao, tận tâm trong công việc, được đào tạo và chuyên giao công nghệ từ tập đoàn Bitzer bởi các chuyên gia kinh nghiệm.",
  "Bình Ngưng – Bình Tách Dầu – Bình Chứa",
  "Cụm Máy Nén Bitzer",
  "Máy Nén Bitzer Đức",
  "Máy Nén Hở Bitzer",
  "Máy Nén Trục Vít Bitzer",
  "Máy Nén Xoắn Ốc Bitzer",
  "Phụ Kiện Thay Thế Máy Nén Bitzer",
  "Phụ tùng máy nén",
  "Sửa chữa máy nén",
  "Kiểm tra máy nén",
  "Phụ tùng chính hãng",
  "Thanh toán nhanh gọn, linh hoạt",
]);

/** New / updated layout + UI strings (vi value = key for Vietnamese source) */
const LAYOUT_VI = {
  "Địa chỉ nhận hàng": "Địa chỉ nhận hàng",
  "Năm thành lập": "Năm thành lập",
  "Nhóm hàng & dịch vụ": "Nhóm hàng & dịch vụ",
  "Năm đồng hành thị trường": "Năm đồng hành thị trường",
  "BẢO TRÌ & SỬA CHỮA MÁY NÉN": "BẢO TRÌ & SỬA CHỮA MÁY NÉN",
  "Hỗ trợ bảo dưỡng định kỳ và xử lý sự cố máy nén Bitzer theo quy trình rõ ràng, báo cáo ngắn gọn sau mỗi lần kiểm tra.":
    "Hỗ trợ bảo dưỡng định kỳ và xử lý sự cố máy nén Bitzer theo quy trình rõ ràng, báo cáo ngắn gọn sau mỗi lần kiểm tra.",
  "PHỤ TÙNG & DẦU CHÍNH HÃNG": "PHỤ TÙNG & DẦU CHÍNH HÃNG",
  "Cung ứng dầu máy nén (BSE170, BSE32, B320SH…), phụ tùng và vật tư phù hợp tài liệu kỹ thuật từng dòng máy.":
    "Cung ứng dầu máy nén (BSE170, BSE32, B320SH…), phụ tùng và vật tư phù hợp tài liệu kỹ thuật từng dòng máy.",
  "TƯ VẤN HỆ THỐNG": "TƯ VẤN HỆ THỐNG",
  "Trao đổi phương án lắp đặt – vận hành phù hợp quy mô kho lạnh và công trình cơ điện của bạn.":
    "Trao đổi phương án lắp đặt – vận hành phù hợp quy mô kho lạnh và công trình cơ điện của bạn.",
  "ĐIỆN LẠNH CÔNG NGHIỆP": "ĐIỆN LẠNH CÔNG NGHIỆP",
  "ĐẠI TÍN – GIỚI THIỆU NGẮN": "ĐẠI TÍN – GIỚI THIỆU NGẮN",
  "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín thành lập năm 2024, hoạt động trong lĩnh vực điện lạnh công nghiệp và kỹ thuật cơ điện cho công trình: cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà xưởng và công trình dân dụng – công nghiệp.":
    "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín thành lập năm 2024, hoạt động trong lĩnh vực điện lạnh công nghiệp và kỹ thuật cơ điện cho công trình: cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà xưởng và công trình dân dụng – công nghiệp.",
  "Kim chỉ nam: «Uy tín – Chất lượng – Hiệu quả lâu dài». Chúng tôi tư vấn giải pháp phù hợp quy mô từng hệ thống, ưu tiên nguồn hàng và thông tin minh bạch.":
    "Kim chỉ nam: «Uy tín – Chất lượng – Hiệu quả lâu dài». Chúng tôi tư vấn giải pháp phù hợp quy mô từng hệ thống, ưu tiên nguồn hàng và thông tin minh bạch.",
  "Mảng kinh doanh gồm: dầu máy nén (tương thích máy nén Bitzer như BSE170, BSE32, B320SH…), máy nén và phụ tùng chính hãng, gas lạnh và vật tư ngành lạnh, thiết bị – vật tư cơ điện thi công, cùng dịch vụ tư vấn kỹ thuật theo nhu cầu.":
    "Mảng kinh doanh gồm: dầu máy nén (tương thích máy nén Bitzer như BSE170, BSE32, B320SH…), máy nén và phụ tùng chính hãng, gas lạnh và vật tư ngành lạnh, thiết bị – vật tư cơ điện thi công, cùng dịch vụ tư vấn kỹ thuật theo nhu cầu.",
  "ĐỒNG HÀNH CÙNG BITZER": "ĐỒNG HÀNH CÙNG BITZER",
  "THIẾT BỊ & VẬT TƯ": "THIẾT BỊ & VẬT TƯ",
  "Cung cấp máy nén, phụ tùng và dầu tương thích các dòng Bitzer thông dụng trên thị trường.":
    "Cung cấp máy nén, phụ tùng và dầu tương thích các dòng Bitzer thông dụng trên thị trường.",
  "Gas lạnh, vật tư ngành lạnh và thiết bị cơ điện phục vụ thi công – vận hành.":
    "Gas lạnh, vật tư ngành lạnh và thiết bị cơ điện phục vụ thi công – vận hành.",
  "Tư vấn lựa chọn vật tư theo hồ sơ công trình; không cam kết quy mô nhân sự hay số liệu ảo.":
    "Tư vấn lựa chọn vật tư theo hồ sơ công trình; không cam kết quy mô nhân sự hay số liệu ảo.",
  "LIÊN HỆ NGAY": "LIÊN HỆ NGAY",
  "TIN TỨC": "TIN TỨC",
  "ĐẠI TÍN MỞ RỘNG DANH MỤC VẬT TƯ BITZER": "ĐẠI TÍN MỞ RỘNG DANH MỤC VẬT TƯ BITZER",
  "BẢO QUẢN DẦU MÁY NÉN VÀ CHU KỲ THAY THẾ": "BẢO QUẢN DẦU MÁY NÉN VÀ CHU KỲ THAY THẾ",
  "GAS LẠNH VÀ AN TOÀN VẬN HÀNH KHO ĐÔNG": "GAS LẠNH VÀ AN TOÀN VẬN HÀNH KHO ĐÔNG",
  "Kỹ thuật": "Kỹ thuật",
  "CÔNG NGHỆ ĐIỆN LẠNH & CƠ ĐIỆN CÔNG TRÌNH": "CÔNG NGHỆ ĐIỆN LẠNH & CƠ ĐIỆN CÔNG TRÌNH",
  "VỀ CHÚNG TÔI": "VỀ CHÚNG TÔI",
  "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín được thành lập năm 2024, tập trung điện lạnh công nghiệp và hạng mục cơ điện cho dự án.":
    "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín được thành lập năm 2024, tập trung điện lạnh công nghiệp và hạng mục cơ điện cho dự án.",
  "Chúng tôi cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.":
    "Chúng tôi cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.",
  "Với nền tảng non trẻ, Đại Tín chọn lộ trình phát triển bền vững: làm đúng phạm vi cam kết, tích lũy kinh nghiệm thực tế qua từng công trình thay vì quảng bá con số ảo.":
    "Với nền tảng non trẻ, Đại Tín chọn lộ trình phát triển bền vững: làm đúng phạm vi cam kết, tích lũy kinh nghiệm thực tế qua từng công trình thay vì quảng bá con số ảo.",
  "Lĩnh vực hoạt động": "Lĩnh vực hoạt động",
  "Hoạt động": "Hoạt động",
  "Đại Tín phục vụ các nhu cầu cốt lõi trong chuỗi cung ứng lạnh và cơ điện — phù hợp doanh nghiệp vừa và nhỏ, công trình đang triển khai giai đoạn đầu.":
    "Đại Tín phục vụ các nhu cầu cốt lõi trong chuỗi cung ứng lạnh và cơ điện — phù hợp doanh nghiệp vừa và nhỏ, công trình đang triển khai giai đoạn đầu.",
  "Dầu máy nén (tương thích Bitzer: BSE170, BSE32, B320SH…)":
    "Dầu máy nén (tương thích Bitzer: BSE170, BSE32, B320SH…)",
  "Máy nén lạnh & phụ tùng chính hãng": "Máy nén lạnh & phụ tùng chính hãng",
  "Gas lạnh và vật tư ngành lạnh": "Gas lạnh và vật tư ngành lạnh",
  "Thiết bị – vật tư cơ điện cho thi công": "Thiết bị – vật tư cơ điện cho thi công",
  "Tư vấn kỹ thuật theo từng hệ thống": "Tư vấn kỹ thuật theo từng hệ thống",
  "GIÁ TRỊ CỐT LÕI": "GIÁ TRỊ CỐT LÕI",
  "Cam kết": "Cam kết",
  "CHÍNH HÃNG & NGUỒN GỐC RÕ": "CHÍNH HÃNG & NGUỒN GỐC RÕ",
  "Ưu tiên phụ tùng, dầu và vật tư có chứng từ, đúng chủng loại cho từng model máy.":
    "Ưu tiên phụ tùng, dầu và vật tư có chứng từ, đúng chủng loại cho từng model máy.",
  "KỸ THUẬT THỰC TIỄN": "KỸ THUẬT THỰC TIỄN",
  "Quy trình kiểm tra – báo cáo gọn, phù hợp vận hành thực tế tại kho và nhà máy.":
    "Quy trình kiểm tra – báo cáo gọn, phù hợp vận hành thực tế tại kho và nhà máy.",
  "AN TOÀN & HIỆU QUẢ": "AN TOÀN & HIỆU QUẢ",
  "Tư vấn vận hành an toàn gas lạnh và điện; hướng tới hiệu quả lâu dài thay vì hình thức.":
    "Tư vấn vận hành an toàn gas lạnh và điện; hướng tới hiệu quả lâu dài thay vì hình thức.",
  "ĐỒNG HÀNH TRUNG THỰC": "ĐỒNG HÀNH TRUNG THỰC",
  "Thông báo phạm vi công việc và chi phí dự kiến; không hứa hẹn quy mô nhân sự hay số dự án không kiểm chứng.":
    "Thông báo phạm vi công việc và chi phí dự kiến; không hứa hẹn quy mô nhân sự hay số dự án không kiểm chứng.",
  "PHÁP LÝ & HỒ SƠ": "PHÁP LÝ & HỒ SƠ",
  "Pháp lý": "Pháp lý",
  "GIẤY PHÉP KINH DOANH": "GIẤY PHÉP KINH DOANH",
  "HỢP ĐỒNG – CHỨNG TỪ NGUỒN GỐC HÀNG": "HỢP ĐỒNG – CHỨNG TỪ NGUỒN GỐC HÀNG",
  "TUÂN THỦ QUY ĐỊNH AN TOÀN LẠNH": "TUÂN THỦ QUY ĐỊNH AN TOÀN LẠNH",
  "MỘT SỐ DÒNG MÁY NÉN": "MỘT SỐ DÒNG MÁY NÉN",
  "MÁY NÉN SCROLL": "MÁY NÉN SCROLL",
  "MÁY NÉN PISTON": "MÁY NÉN PISTON",
  "MÁY NÉN TRỤC VÍT": "MÁY NÉN TRỤC VÍT",
  "MÁY NÉN SEMI-HERMETIC": "MÁY NÉN SEMI-HERMETIC",
  "PHÂN KHÚC PHỤC VỤ": "PHÂN KHÚC PHỤC VỤ",
  "Đối tác": "Đối tác",
  "KHO LẠNH THỰC PHẨM": "KHO LẠNH THỰC PHẨM",
  "NHÀ MÁY CHẾ BIẾN": "NHÀ MÁY CHẾ BIẾN",
  "CÔNG TRÌNH CƠ ĐIỆN": "CÔNG TRÌNH CƠ ĐIỆN",
};

const LAYOUT_EN = {
  "Địa chỉ nhận hàng": "Delivery address",
  "Năm thành lập": "Year established",
  "Nhóm hàng & dịch vụ": "Product & service groups",
  "Năm đồng hành thị trường": "Years in the market",
  "BẢO TRÌ & SỬA CHỮA MÁY NÉN": "MAINTENANCE & COMPRESSOR REPAIR",
  "Hỗ trợ bảo dưỡng định kỳ và xử lý sự cố máy nén Bitzer theo quy trình rõ ràng, báo cáo ngắn gọn sau mỗi lần kiểm tra.":
    "Scheduled maintenance and Bitzer compressor troubleshooting with clear procedures and concise reports after each visit.",
  "PHỤ TÙNG & DẦU CHÍNH HÃNG": "GENUINE PARTS & OIL",
  "Cung ứng dầu máy nén (BSE170, BSE32, B320SH…), phụ tùng và vật tư phù hợp tài liệu kỹ thuật từng dòng máy.":
    "Compressor oils (BSE170, BSE32, B320SH…), spare parts and supplies aligned with each compressor line’s technical documentation.",
  "TƯ VẤN HỆ THỐNG": "SYSTEM CONSULTING",
  "Trao đổi phương án lắp đặt – vận hành phù hợp quy mô kho lạnh và công trình cơ điện của bạn.":
    "Discuss installation and operation options suited to your cold storage scale and MEP project needs.",
  "ĐIỆN LẠNH CÔNG NGHIỆP": "INDUSTRIAL REFRIGERATION",
  "ĐẠI TÍN – GIỚI THIỆU NGẮN": "DAI TIN – SHORT INTRO",
  "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín thành lập năm 2024, hoạt động trong lĩnh vực điện lạnh công nghiệp và kỹ thuật cơ điện cho công trình: cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà xưởng và công trình dân dụng – công nghiệp.":
    "Dai Tin Refrigeration Technology Trading & Service Co., Ltd., founded in 2024, focuses on industrial refrigeration and electromechanical work for projects: equipment, materials, spare parts and technical services for refrigeration systems, cold stores, factories and civil–industrial buildings.",
  "Kim chỉ nam: «Uy tín – Chất lượng – Hiệu quả lâu dài». Chúng tôi tư vấn giải pháp phù hợp quy mô từng hệ thống, ưu tiên nguồn hàng và thông tin minh bạch.":
    "Our motto: «Reputation – Quality – Long-term efficiency». We advise solutions sized to each system, prioritising transparent sourcing and information.",
  "Mảng kinh doanh gồm: dầu máy nén (tương thích máy nén Bitzer như BSE170, BSE32, B320SH…), máy nén và phụ tùng chính hãng, gas lạnh và vật tư ngành lạnh, thiết bị – vật tư cơ điện thi công, cùng dịch vụ tư vấn kỹ thuật theo nhu cầu.":
    "We supply compressor oils (compatible with Bitzer units such as BSE170, BSE32, B320SH…), genuine compressors and parts, refrigerants and cold-chain supplies, MEP installation materials, and technical consulting as required.",
  "ĐỒNG HÀNH CÙNG BITZER": "PARTNERING WITH BITZER",
  "THIẾT BỊ & VẬT TƯ": "EQUIPMENT & SUPPLIES",
  "Cung cấp máy nén, phụ tùng và dầu tương thích các dòng Bitzer thông dụng trên thị trường.":
    "Compressors, spare parts and oils compatible with common Bitzer lines on the market.",
  "Gas lạnh, vật tư ngành lạnh và thiết bị cơ điện phục vụ thi công – vận hành.":
    "Refrigerants, cold-trade supplies and MEP equipment for construction and operation.",
  "Tư vấn lựa chọn vật tư theo hồ sơ công trình; không cam kết quy mô nhân sự hay số liệu ảo.":
    "Material selection advice based on project documentation; we do not claim inflated headcount or unverified figures.",
  "LIÊN HỆ NGAY": "CONTACT NOW",
  "TIN TỨC": "NEWS",
  "ĐẠI TÍN MỞ RỘNG DANH MỤC VẬT TƯ BITZER": "DAI TIN EXPANDS BITZER SUPPLY RANGE",
  "BẢO QUẢN DẦU MÁY NÉN VÀ CHU KỲ THAY THẾ": "COMPRESSOR OIL CARE AND REPLACEMENT INTERVALS",
  "GAS LẠNH VÀ AN TOÀN VẬN HÀNH KHO ĐÔNG": "REFRIGERANTS AND SAFE OPERATION OF FREEZER STORES",
  "Kỹ thuật": "Technical",
  "ĐẠI TÍN": "DAI TIN",
  "CÔNG NGHỆ ĐIỆN LẠNH & CƠ ĐIỆN CÔNG TRÌNH":
    "REFRIGERATION TECHNOLOGY & PROJECT MEP",
  "VỀ CHÚNG TÔI": "ABOUT US",
  "Công ty TNHH TM & DV Công Nghệ Điện Lạnh Đại Tín được thành lập năm 2024, tập trung điện lạnh công nghiệp và hạng mục cơ điện cho dự án.":
    "Founded in 2024, we focus on industrial refrigeration and electromechanical scopes for projects.",
  "Chúng tôi cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.":
    "We supply equipment, materials, spare parts and technical services for refrigeration, cold stores, plants and buildings—prioritising transparency and capital efficiency for customers.",
  "Với nền tảng non trẻ, Đại Tín chọn lộ trình phát triển bền vững: làm đúng phạm vi cam kết, tích lũy kinh nghiệm thực tế qua từng công trình thay vì quảng bá con số ảo.":
    "As a young company, Dai Tin pursues sustainable growth: honouring the agreed scope and building real project experience rather than inflated marketing numbers.",
  "Lĩnh vực hoạt động": "Fields of activity",
  "Hoạt động": "Activities",
  "Đại Tín phục vụ các nhu cầu cốt lõi trong chuỗi cung ứng lạnh và cơ điện — phù hợp doanh nghiệp vừa và nhỏ, công trình đang triển khai giai đoạn đầu.":
    "Dai Tin serves core needs in the refrigeration and MEP supply chain—suited to SMEs and early-stage projects.",
  "Dầu máy nén (tương thích Bitzer: BSE170, BSE32, B320SH…)":
    "Compressor oils (Bitzer-compatible: BSE170, BSE32, B320SH…)",
  "Máy nén lạnh & phụ tùng chính hãng": "Refrigeration compressors & genuine parts",
  "Gas lạnh và vật tư ngành lạnh": "Refrigerants and cold-trade supplies",
  "Thiết bị – vật tư cơ điện cho thi công": "MEP equipment and materials for site work",
  "Tư vấn kỹ thuật theo từng hệ thống": "Technical consulting per system",
  "GIÁ TRỊ CỐT LÕI": "CORE VALUES",
  "Cam kết": "Commitment",
  "CHÍNH HÃNG & NGUỒN GỐC RÕ": "GENUINE & TRACEABLE SOURCING",
  "Ưu tiên phụ tùng, dầu và vật tư có chứng từ, đúng chủng loại cho từng model máy.":
    "Priority on documented parts, oils and materials matched to each compressor model.",
  "KỸ THUẬT THỰC TIỄN": "PRACTICAL ENGINEERING",
  "Quy trình kiểm tra – báo cáo gọn, phù hợp vận hành thực tế tại kho và nhà máy.":
    "Lean inspection and reporting aligned with real warehouse and plant operations.",
  "AN TOÀN & HIỆU QUẢ": "SAFETY & EFFICIENCY",
  "Tư vấn vận hành an toàn gas lạnh và điện; hướng tới hiệu quả lâu dài thay vì hình thức.":
    "Guidance on safe refrigerant and electrical operation; long-term substance over form.",
  "ĐỒNG HÀNH TRUNG THỰC": "HONEST PARTNERSHIP",
  "Thông báo phạm vi công việc và chi phí dự kiến; không hứa hẹn quy mô nhân sự hay số dự án không kiểm chứng.":
    "Clear scope and cost estimates; no unverified claims about team size or project counts.",
  "PHÁP LÝ & HỒ SƠ": "LEGAL & DOCUMENTATION",
  "Pháp lý": "Legal",
  "GIẤY PHÉP KINH DOANH": "BUSINESS REGISTRATION",
  "HỢP ĐỒNG – CHỨNG TỪ NGUỒN GỐC HÀNG": "CONTRACTS – PROOF OF ORIGIN",
  "TUÂN THỦ QUY ĐỊNH AN TOÀN LẠNH": "COMPLIANCE WITH REFRIGERATION SAFETY RULES",
  "MỘT SỐ DÒNG MÁY NÉN": "SELECT COMPRESSOR LINES",
  "MÁY NÉN SCROLL": "SCROLL COMPRESSOR",
  "MÁY NÉN PISTON": "PISTON COMPRESSOR",
  "MÁY NÉN TRỤC VÍT": "SCREW COMPRESSOR",
  "MÁY NÉN SEMI-HERMETIC": "SEMI-HERMETIC COMPRESSOR",
  "PHÂN KHÚC PHỤC VỤ": "SEGMENTS WE SERVE",
  "Đối tác": "Partners",
  "KHO LẠNH THỰC PHẨM": "FOOD COLD STORAGE",
  "NHÀ MÁY CHẾ BIẾN": "PROCESSING PLANTS",
  "CÔNG TRÌNH CƠ ĐIỆN": "MEP PROJECTS",
};

function mergeLocale(path, layoutMap, obsolete) {
  const raw = JSON.parse(fs.readFileSync(path, "utf8"));
  for (const k of obsolete) delete raw[k];
  for (const k of Object.keys(raw)) {
    if (shouldOmitLocaleKey(k)) delete raw[k];
  }
  for (const [k, v] of Object.entries(layoutMap)) {
    if (shouldOmitLocaleKey(k)) continue;
    raw[k] = v;
  }
  const sorted = Object.fromEntries(Object.entries(raw).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(path, JSON.stringify(sorted, null, 2) + "\n", "utf8");
}

mergeLocale(viPath, LAYOUT_VI, OBSOLETE_KEYS);
mergeLocale(enPath, LAYOUT_EN, OBSOLETE_KEYS);
console.log("Updated", viPath, enPath);
