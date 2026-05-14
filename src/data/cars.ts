import suv from "@/assets/car-suv.jpg";
import sedan from "@/assets/car-sedan.jpg";
import coupe from "@/assets/car-coupe.jpg";
import hatchback from "@/assets/car-hatchback.jpg";
import truck from "@/assets/car-truck.jpg";
import sports from "@/assets/car-sports.jpg";

export type Car = {
  slug: string;
  name: string;
  brand: string;
  type: "Sedan" | "SUV" | "Coupe" | "Hatchback" | "Pickup" | "Sports";
  price: number; // VND
  year: number;
  fuel: "Xăng" | "Dầu" | "Điện" | "Hybrid";
  transmission: "Số tự động" | "Số sàn";
  seats: number;
  km: number;
  image: string;
  badge?: string;
  description: string;
};

export const cars: Car[] = [
  {
    slug: "lumen-x-suv-2024",
    name: "Lumen X SUV",
    brand: "Lumen",
    type: "SUV",
    price: 1280000000,
    year: 2024,
    fuel: "Hybrid",
    transmission: "Số tự động",
    seats: 7,
    km: 0,
    image: suv,
    badge: "Mới",
    description:
      "SUV 7 chỗ thế hệ mới với hệ truyền động hybrid tiết kiệm, không gian rộng rãi và công nghệ an toàn cấp doanh nghiệp.",
  },
  {
    slug: "obsidian-gt-sedan-2024",
    name: "Obsidian GT",
    brand: "Obsidian",
    type: "Sedan",
    price: 1650000000,
    year: 2024,
    fuel: "Xăng",
    transmission: "Số tự động",
    seats: 5,
    km: 1200,
    image: sedan,
    badge: "Bán chạy",
    description:
      "Sedan thể thao cao cấp với động cơ tăng áp 2.0L, nội thất da Nappa và hệ thống lái hỗ trợ cấp 2.",
  },
  {
    slug: "argent-coupe-electric-2025",
    name: "Argent Coupe EV",
    brand: "Argent",
    type: "Coupe",
    price: 2890000000,
    year: 2025,
    fuel: "Điện",
    transmission: "Số tự động",
    seats: 4,
    km: 0,
    image: coupe,
    badge: "Pre-order",
    description:
      "Coupe điện 2 cửa 4 chỗ — quãng đường 520km/lần sạc, tăng tốc 0–100 km/h trong 3.2 giây.",
  },
  {
    slug: "azure-mini-2024",
    name: "Azure Mini",
    brand: "Azure",
    type: "Hatchback",
    price: 465000000,
    year: 2024,
    fuel: "Xăng",
    transmission: "Số tự động",
    seats: 5,
    km: 0,
    image: hatchback,
    description:
      "Hatchback đô thị nhỏ gọn, tiết kiệm nhiên liệu, lý tưởng cho người mới và gia đình trẻ.",
  },
  {
    slug: "ranger-prime-pickup-2024",
    name: "Ranger Prime",
    brand: "Ranger",
    type: "Pickup",
    price: 980000000,
    year: 2024,
    fuel: "Dầu",
    transmission: "Số tự động",
    seats: 5,
    km: 8500,
    image: truck,
    description:
      "Bán tải off-road mạnh mẽ với động cơ diesel 2.0 Bi-Turbo, hệ dẫn động 4 bánh thông minh.",
  },
  {
    slug: "vela-roadster-2025",
    name: "Vela Roadster",
    brand: "Vela",
    type: "Sports",
    price: 3450000000,
    year: 2025,
    fuel: "Xăng",
    transmission: "Số tự động",
    seats: 2,
    km: 0,
    image: sports,
    badge: "Giới hạn",
    description:
      "Roadster mui trần phiên bản giới hạn — di sản thiết kế cổ điển hòa quyện với động cơ V6 hiện đại.",
  },
];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export const brands = [
  { slug: "lumen", name: "Lumen", country: "Đức", models: 12 },
  { slug: "obsidian", name: "Obsidian", country: "Anh", models: 8 },
  { slug: "argent", name: "Argent", country: "Mỹ", models: 6 },
  { slug: "azure", name: "Azure", country: "Nhật Bản", models: 14 },
  { slug: "ranger", name: "Ranger", country: "Mỹ", models: 5 },
  { slug: "vela", name: "Vela", country: "Ý", models: 4 },
];
