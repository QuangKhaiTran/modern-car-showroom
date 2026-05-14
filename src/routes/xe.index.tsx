import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CarCard } from "@/components/CarCard";
import { SiteLayout, CarSearchBar } from "@/components/SiteLayout";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/xe/")({
  head: () => ({
    meta: [
      { title: "Danh sách xe — AutoNova" },
      { name: "description", content: "Duyệt toàn bộ danh sách xe hơi mới và đã qua sử dụng tại AutoNova: SUV, Sedan, Coupe, EV và nhiều phân khúc khác." },
      { property: "og:title", content: "Danh sách xe — AutoNova" },
      { property: "og:description", content: "Toàn bộ xe hơi đang có tại AutoNova." },
      { property: "og:url", content: "/xe" },
    ],
    links: [{ rel: "canonical", href: "/xe" }],
  }),
  component: () => (
    <SiteLayout>
      <Listing />
    </SiteLayout>
  ),
});

const types = ["Tất cả", "Sedan", "SUV", "Coupe", "Hatchback", "Pickup", "Sports"] as const;

function Listing() {
  const [filter, setFilter] = useState<(typeof types)[number]>("Tất cả");

  const filtered = useMemo(
    () => (filter === "Tất cả" ? cars : cars.filter((c) => c.type === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8">
        <p className="text-sm font-medium text-brand">Showroom</p>
        <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Danh sách xe</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {cars.length} mẫu xe đang có sẵn — lọc theo phân khúc bạn quan tâm.
        </p>
      </header>

      <div className="mb-8"><CarSearchBar /></div>

      <div className="mb-8 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === t
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          Không có xe phù hợp.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CarCard key={c.slug} car={c} />)}
        </div>
      )}
    </div>
  );
}
