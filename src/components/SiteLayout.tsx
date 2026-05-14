import { Link, Outlet } from "@tanstack/react-router";
import { Car, Menu, Phone, Search, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/xe", label: "Danh sách xe" },
  { to: "/thuong-hieu", label: "Thương hiệu" },
  { to: "/tra-gop", label: "Trả góp" },
  { to: "/tin-tuc", label: "Tin tức" },
  { to: "/ve-chung-toi", label: "Về chúng tôi" },
  { to: "/lien-he", label: "Liên hệ" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-brand-foreground shadow-brand">
            <Car className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">AutoNova</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:1900088899"
            className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            1900 0888 99
          </a>
          <button
            className="lg:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label="Mở menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
              <Car className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">AutoNova</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Đại lý xe hơi đa thương hiệu — minh bạch giá, bảo hành chính hãng và tư vấn cá nhân hoá.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Khám phá</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/xe" className="hover:text-foreground">Danh sách xe</Link></li>
            <li><Link to="/thuong-hieu" className="hover:text-foreground">Thương hiệu</Link></li>
            <li><Link to="/tra-gop" className="hover:text-foreground">Trả góp</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-foreground">Tin tức</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Hỗ trợ</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/ve-chung-toi" className="hover:text-foreground">Về chúng tôi</Link></li>
            <li><Link to="/lien-he" className="hover:text-foreground">Liên hệ</Link></li>
            <li><a href="#" className="hover:text-foreground">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-foreground">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Liên hệ</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>123 Nguyễn Văn Linh, Q.7, TP.HCM</li>
            <li>Hotline: 1900 0888 99</li>
            <li>hello@autonova.vn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} AutoNova. Mọi quyền được bảo lưu.</p>
          <p>Thiết kế tinh gọn, hiệu năng cao, chuẩn SEO.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function CarSearchBar() {
  return (
    <form className="flex w-full items-center gap-2 rounded-full border border-border bg-card p-2 shadow-soft">
      <Search className="ml-3 h-4 w-4 text-muted-foreground" />
      <input
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder="Tìm theo hãng, dòng xe, năm sản xuất..."
      />
      <button className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">
        Tìm xe
      </button>
    </form>
  );
}
