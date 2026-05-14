import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

const posts = [
  { title: "Top 5 SUV đáng mua nhất năm 2025", date: "12/05/2025", excerpt: "Phân tích 5 mẫu SUV gây sốt thị trường, từ cỡ nhỏ đến full-size." },
  { title: "Xe điện tại Việt Nam: hạ tầng đã sẵn sàng?", date: "28/04/2025", excerpt: "Mạng lưới trạm sạc đang phát triển nhanh — đã đến lúc chuyển sang EV?" },
  { title: "Bí quyết mua xe trả góp không áp lực", date: "15/04/2025", excerpt: "5 nguyên tắc vàng để khoản vay không trở thành gánh nặng." },
  { title: "So sánh hộp số CVT, AT và DCT", date: "02/04/2025", excerpt: "Loại hộp số nào phù hợp nhất với nhu cầu sử dụng của bạn?" },
];

export const Route = createFileRoute("/tin-tuc")({
  head: () => ({
    meta: [
      { title: "Tin tức xe hơi — AutoNova" },
      { name: "description", content: "Cập nhật tin tức, đánh giá và xu hướng thị trường xe hơi mới nhất tại Việt Nam." },
      { property: "og:title", content: "Tin tức xe hơi — AutoNova" },
      { property: "og:description", content: "Tin tức, đánh giá xe và xu hướng thị trường." },
      { property: "og:url", content: "/tin-tuc" },
    ],
    links: [{ rel: "canonical", href: "/tin-tuc" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <p className="text-sm font-medium text-brand">Blog</p>
        <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Tin tức & Đánh giá</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Góc nhìn chuyên sâu về thị trường, công nghệ và xu hướng mua xe.
        </p>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {posts.map((p) => (
            <article key={p.title} className="group p-6 md:p-8">
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <h2 className="mt-2 font-display text-2xl font-bold transition-colors group-hover:text-brand">
                {p.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-medium">Đọc tiếp →</span>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  ),
});
