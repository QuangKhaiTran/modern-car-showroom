import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Fuel, Gauge, Settings2, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { cars, formatVND } from "@/data/cars";

export const Route = createFileRoute("/xe/$slug")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.slug === params.slug);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    const car = loaderData?.car;
    if (!car) return {};
    return {
      meta: [
        { title: `${car.name} ${car.year} — ${formatVND(car.price)} | AutoNova` },
        { name: "description", content: car.description },
        { property: "og:title", content: `${car.name} ${car.year}` },
        { property: "og:description", content: car.description },
        { property: "og:image", content: car.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/xe/${car.slug}` },
      ],
      links: [{ rel: "canonical", href: `/xe/${car.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Car",
            name: car.name,
            brand: car.brand,
            vehicleModelDate: String(car.year),
            offers: { "@type": "Offer", price: car.price, priceCurrency: "VND" },
          }),
        },
      ],
    };
  },
  component: () => (
    <SiteLayout>
      <Detail />
    </SiteLayout>
  ),
});

function Detail() {
  const { car } = Route.useLoaderData();
  const specs = [
    { icon: Calendar, label: "Năm SX", value: car.year },
    { icon: Fuel, label: "Nhiên liệu", value: car.fuel },
    { icon: Settings2, label: "Hộp số", value: car.transmission },
    { icon: Users, label: "Số chỗ", value: car.seats },
    { icon: Gauge, label: "Đã đi", value: `${car.km.toLocaleString("vi-VN")} km` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <Link to="/xe" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <img
              src={car.image}
              alt={`${car.name} ${car.year}`}
              width={1280}
              height={896}
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-sm text-muted-foreground">{car.brand} · {car.type}</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{car.name}</h1>
          <p className="mt-4 text-muted-foreground">{car.description}</p>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="text-xs text-muted-foreground">Giá niêm yết</div>
            <div className="mt-1 font-display text-3xl font-bold text-brand">{formatVND(car.price)}</div>
            <div className="mt-1 text-xs text-muted-foreground">Đã bao gồm VAT — chưa bao gồm phí lăn bánh</div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/lien-he" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90">
                Đặt lịch lái thử
              </Link>
              <Link to="/tra-gop" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent">
                Tính trả góp
              </Link>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                <s.icon className="h-4 w-4 text-brand" />
                <dt className="mt-2 text-xs text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-base font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
