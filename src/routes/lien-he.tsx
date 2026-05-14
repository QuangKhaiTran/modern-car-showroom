import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên hệ — AutoNova" },
      { name: "description", content: "Liên hệ AutoNova để được tư vấn mua xe, đặt lịch lái thử hoặc hỗ trợ sau bán hàng." },
      { property: "og:title", content: "Liên hệ AutoNova" },
      { property: "og:description", content: "Hotline 1900 0888 99 — phục vụ 24/7." },
      { property: "og:url", content: "/lien-he" },
    ],
    links: [{ rel: "canonical", href: "/lien-he" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <p className="text-sm font-medium text-brand">Liên hệ</p>
        <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Hãy nói chuyện cùng nhau</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Để lại thông tin — chuyên viên AutoNova sẽ liên hệ trong vòng 30 phút.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Hotline", value: "1900 0888 99" },
              { icon: Mail, label: "Email", value: "hello@autonova.vn" },
              { icon: MapPin, label: "Trụ sở", value: "123 Nguyễn Văn Linh, Q.7, TP.HCM" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent">
                  <c.icon className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-display text-base font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn! Chúng tôi sẽ liên hệ lại sớm."); }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Họ và tên" required />
              <Input label="Số điện thoại" type="tel" required />
            </div>
            <Input label="Email" type="email" />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Mẫu xe quan tâm</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>Tôi cần tư vấn</option>
                <option>SUV</option><option>Sedan</option><option>Coupe / Sports</option>
                <option>Xe điện</option><option>Bán tải</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Lời nhắn</label>
              <textarea rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button className="w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background hover:opacity-90">
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </SiteLayout>
  ),
});

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        {...rest}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
