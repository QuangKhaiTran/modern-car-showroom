import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, Settings2, Users } from "lucide-react";
import { type Car, formatVND } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/xe/$slug"
      params={{ slug: car.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={car.image}
          alt={`${car.name} ${car.year} - ${car.type}`}
          loading="lazy"
          width={1280}
          height={896}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {car.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-brand-foreground shadow-brand">
            {car.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{car.brand}</span> · <span>{car.type}</span> · <span>{car.year}</span>
        </div>
        <h3 className="font-display text-lg font-semibold">{car.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{car.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" />{car.fuel}</span>
          <span className="inline-flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" />{car.transmission}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{car.seats} chỗ</span>
          <span className="inline-flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" />{car.km.toLocaleString("vi-VN")} km</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="text-xs text-muted-foreground">Giá niêm yết</div>
            <div className="font-display text-lg font-bold text-brand">{formatVND(car.price)}</div>
          </div>
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
            Chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
