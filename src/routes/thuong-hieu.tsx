import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { brands } from "@/data/cars";

export const Route = createFileRoute("/thuong-hieu")({
  head: () => ({
    meta: [
      { title: "Thương hiệu xe — AutoNova" },
      { name: "description", content: "Khám phá các thương hiệu xe hơi chính hãng đang phân phối tại AutoNova." },
      { property: "og:title", content: "Thương hiệu xe — AutoNova" },
      { property: "og:description", content: "Đối tác chính hãng của AutoNova." },
      { property: "og:url", content: "/thuong-hieu" },
    ],
    links: [{ rel: "canonical", href: "/thuong-hieu" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <p className="text-sm font-medium text-brand">Đối tác</p>
        <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Thương hiệu</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          AutoNova là đại lý uỷ quyền của các thương hiệu hàng đầu — bảo hành & phụ tùng chính hãng.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <Link
              key={b.slug}
              to="/xe"
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:border-brand hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold">{b.name}</h2>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs">{b.country}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{b.models} mẫu xe đang phân phối</p>
              <span className="mt-6 inline-block text-sm font-medium text-foreground group-hover:text-brand">
                Xem các mẫu xe →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  ),
});
