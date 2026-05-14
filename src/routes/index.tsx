import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { CarCard } from "@/components/CarCard";
import { CarSearchBar, SiteLayout } from "@/components/SiteLayout";
import { brands, cars } from "@/data/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoNova — Mua xe hơi hiện đại, giá minh bạch" },
      { name: "description", content: "Khám phá hàng trăm mẫu xe Sedan, SUV, Coupe, EV từ các hãng uy tín. Báo giá rõ ràng, lái thử tận nơi, trả góp đến 80%." },
      { property: "og:title", content: "AutoNova — Mua xe hơi hiện đại, giá minh bạch" },
      { property: "og:description", content: "Khám phá hàng trăm mẫu xe từ các hãng uy tín tại Việt Nam." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: () => (
    <SiteLayout>
      <Index />
    </SiteLayout>
  ),
});

function Index() {
  const featured = cars.slice(0, 3);
  const recent = cars.slice(3);
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 md:grid-cols-2 md:px-6 md:pb-24 md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Bộ sưu tập 2024 — 2025 đã có mặt
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Tìm chiếc xe <span className="text-brand">hoàn hảo</span> cho hành trình mới.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
              Hơn 1.200 mẫu xe từ 30+ thương hiệu. Báo giá minh bạch, lái thử tận nơi, hỗ trợ trả góp đến 80% giá trị xe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/xe"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
              >
                Xem tất cả xe <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tra-gop"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Tính trả góp
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs text-muted-foreground">Mẫu xe</dt>
                <dd className="font-display text-2xl font-bold">1.200+</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Showroom</dt>
                <dd className="font-display text-2xl font-bold">28</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Khách hàng</dt>
                <dd className="font-display text-2xl font-bold">120k</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
            <img
              src={heroCar}
              alt="Sedan hybrid cao cấp AutoNova"
              width={1920}
              height={1080}
              className="w-full rounded-3xl shadow-elevated"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-12 md:px-6">
          <CarSearchBar />
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
          {[
            { icon: ShieldCheck, title: "Bảo hành chính hãng", desc: "3 năm hoặc 100.000 km tiêu chuẩn." },
            { icon: BadgeCheck, title: "Giá niêm yết minh bạch", desc: "Không phụ thu, không bia kèm lạc." },
            { icon: Headphones, title: "Tư vấn 24/7", desc: "Chuyên viên đồng hành mọi giai đoạn." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent">
                <f.icon className="h-5 w-5 text-brand" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-brand">Nổi bật</p>
            <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">Xe được chọn nhiều nhất</h2>
          </div>
          <Link to="/xe" className="hidden items-center gap-1 text-sm font-medium hover:text-brand md:inline-flex">
            Tất cả xe <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CarCard key={c.slug} car={c} />)}
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-brand">Thương hiệu</p>
              <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">Đối tác chính hãng</h2>
            </div>
            <Link to="/thuong-hieu" className="hidden text-sm font-medium hover:text-brand md:inline-block">Xem tất cả →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b.slug}
                to="/thuong-hieu"
                className="rounded-xl border border-border bg-card px-4 py-6 text-center transition-colors hover:border-brand"
              >
                <div className="font-display text-lg font-bold">{b.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{b.models} mẫu xe</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">Mới về showroom</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((c) => <CarCard key={c.slug} car={c} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Sẵn sàng cầm lái?</h2>
              <p className="mt-3 max-w-xl text-background/70">
                Đặt lịch lái thử miễn phí — chuyên viên AutoNova sẽ mang xe đến tận nơi bạn.
              </p>
            </div>
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-brand-foreground shadow-brand md:self-auto"
            >
              Đặt lịch ngay <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
