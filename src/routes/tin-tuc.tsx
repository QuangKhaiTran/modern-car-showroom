import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

type Post = {
  title: string;
  excerpt: string;
  category: "Đánh giá" | "Thị trường" | "Tài chính" | "Công nghệ" | "Mẹo hay";
  date: string;
  read: string;
  image: string;
  author: string;
};

const posts: Post[] = [
  {
    title: "Top 5 SUV đáng mua nhất năm 2025",
    excerpt: "Phân tích 5 mẫu SUV gây sốt thị trường — từ cỡ nhỏ đô thị tới full-size đường dài, đâu là lựa chọn tốt nhất cho gia đình bạn?",
    category: "Đánh giá",
    date: "12 Th5, 2025",
    read: "8 phút đọc",
    image: news1,
    author: "Minh Khôi",
  },
  {
    title: "Xe điện tại Việt Nam: hạ tầng đã sẵn sàng?",
    excerpt: "Mạng lưới trạm sạc đang phát triển nhanh chóng tại các đô thị lớn — đã đến lúc nghiêm túc cân nhắc chuyển sang xe điện?",
    category: "Thị trường",
    date: "28 Th4, 2025",
    read: "6 phút đọc",
    image: news2,
    author: "Thu Hà",
  },
  {
    title: "Bí quyết mua xe trả góp không áp lực",
    excerpt: "5 nguyên tắc vàng giúp khoản vay mua xe không trở thành gánh nặng tài chính lâu dài.",
    category: "Tài chính",
    date: "15 Th4, 2025",
    read: "5 phút đọc",
    image: news3,
    author: "Quang Vinh",
  },
  {
    title: "So sánh hộp số CVT, AT và DCT",
    excerpt: "Mỗi loại hộp số có ưu nhược riêng. Bài viết giúp bạn chọn đúng loại theo nhu cầu sử dụng.",
    category: "Công nghệ",
    date: "02 Th4, 2025",
    read: "7 phút đọc",
    image: news4,
    author: "Đức Anh",
  },
  {
    title: "Lịch bảo dưỡng xe theo từng cột mốc km",
    excerpt: "Hướng dẫn chi tiết các mốc bảo dưỡng quan trọng — giữ xe luôn vận hành ổn định và bền lâu.",
    category: "Mẹo hay",
    date: "20 Th3, 2025",
    read: "4 phút đọc",
    image: news5,
    author: "Hoàng Long",
  },
  {
    title: "Chuẩn bị gì cho chuyến road trip dài ngày?",
    excerpt: "Checklist đầy đủ trước mỗi chuyến đi xa — từ kỹ thuật xe đến vật dụng cá nhân không thể thiếu.",
    category: "Mẹo hay",
    date: "10 Th3, 2025",
    read: "6 phút đọc",
    image: news6,
    author: "Lan Phương",
  },
];

const categories = ["Tất cả", "Đánh giá", "Thị trường", "Tài chính", "Công nghệ", "Mẹo hay"] as const;

export const Route = createFileRoute("/tin-tuc")({
  head: () => ({
    meta: [
      { title: "Tin tức xe hơi — AutoNova" },
      { name: "description", content: "Cập nhật tin tức, đánh giá xe và xu hướng thị trường ô tô mới nhất tại Việt Nam — từ AutoNova." },
      { property: "og:title", content: "Tin tức xe hơi — AutoNova" },
      { property: "og:description", content: "Tin tức, đánh giá và xu hướng thị trường ô tô." },
      { property: "og:image", content: news1 },
      { property: "og:url", content: "/tin-tuc" },
    ],
    links: [{ rel: "canonical", href: "/tin-tuc" }],
  }),
  component: () => (
    <SiteLayout>
      <News />
    </SiteLayout>
  ),
});

function News() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Tất cả");
  const [q, setQ] = useState("");

  const [hero, ...rest] = posts;

  const filtered = useMemo(() => {
    return rest.filter((p) => {
      const matchCat = cat === "Tất cả" || p.category === cat;
      const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [cat, q, rest]);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 md:pt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-brand" />
                Cập nhật mỗi tuần
              </span>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Nhật ký <span className="text-brand">bốn bánh</span>.
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                Đánh giá chuyên sâu, xu hướng thị trường và mẹo hay cho người yêu xe — viết bởi đội ngũ chuyên gia của AutoNova.
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm bài viết..."
                className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured hero post */}
      <section className="mx-auto max-w-7xl px-4 pt-12 md:px-6">
        <a href="#" className="group grid gap-8 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface lg:aspect-auto">
            <img
              src={hero.image}
              alt={hero.title}
              width={1280}
              height={896}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold backdrop-blur">
              Bài nổi bật
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-foreground">{hero.category}</span>
              <span className="text-muted-foreground">{hero.date}</span>
              <span className="text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{hero.read}</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight transition-colors group-hover:text-brand md:text-4xl">
              {hero.title}
            </h2>
            <p className="text-muted-foreground">{hero.excerpt}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-brand-foreground">
                  {hero.author.split(" ").map((s) => s[0]).join("").slice(-2)}
                </span>
                <div className="text-sm">
                  <div className="font-medium">{hero.author}</div>
                  <div className="text-xs text-muted-foreground">Biên tập viên</div>
                </div>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* Category filter */}
      <section className="mx-auto max-w-7xl px-4 pt-14 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">{filtered.length} bài viết</span>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Không có bài viết phù hợp.
          </p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.title} className="group flex flex-col">
                <a href="#" className="overflow-hidden rounded-2xl bg-surface">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={1280}
                      height={896}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </a>
                <div className="mt-5 flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-accent px-2.5 py-1 font-medium">{p.category}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{p.read}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-brand">
                  <a href="#">{p.title}</a>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-brand text-[10px] font-semibold text-brand-foreground">
                    {p.author.split(" ").map((s) => s[0]).join("").slice(-2)}
                  </span>
                  <span>{p.author}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-14">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Nhận bản tin AutoNova</h2>
              <p className="mt-3 max-w-lg text-background/70">
                Mỗi thứ Sáu — bài đánh giá mới nhất và ưu đãi sớm nhất, gửi thẳng vào hộp thư của bạn.
              </p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Đã đăng ký!"); }}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="email@cuaban.vn"
                className="flex-1 rounded-full border border-background/20 bg-background/10 px-5 py-3 text-sm text-background placeholder:text-background/50 outline-none focus:border-background/40"
              />
              <button className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-brand">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
