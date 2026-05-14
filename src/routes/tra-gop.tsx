import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatVND } from "@/data/cars";

export const Route = createFileRoute("/tra-gop")({
  head: () => ({
    meta: [
      { title: "Tính trả góp xe hơi — AutoNova" },
      { name: "description", content: "Công cụ tính trả góp ô tô nhanh chóng: nhập giá xe, trả trước và kỳ hạn để xem khoản trả hàng tháng." },
      { property: "og:title", content: "Tính trả góp xe hơi — AutoNova" },
      { property: "og:description", content: "Mua xe trả góp đến 80% giá trị xe, lãi suất từ 7,5%/năm." },
      { property: "og:url", content: "/tra-gop" },
    ],
    links: [{ rel: "canonical", href: "/tra-gop" }],
  }),
  component: () => (
    <SiteLayout>
      <Loan />
    </SiteLayout>
  ),
});

function Loan() {
  const [price, setPrice] = useState(1200000000);
  const [downPct, setDownPct] = useState(30);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(8.5);

  const result = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const months = years * 12;
    const r = rate / 100 / 12;
    const monthly = (principal * r) / (1 - Math.pow(1 + r, -months));
    return { principal, monthly: isFinite(monthly) ? monthly : 0, months };
  }, [price, downPct, years, rate]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <p className="text-sm font-medium text-brand">Tài chính</p>
      <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Trả góp linh hoạt</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Vay đến 80% giá trị xe, kỳ hạn lên đến 8 năm, lãi suất ưu đãi từ 7,5%/năm.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
          <Field label="Giá xe" value={formatVND(price)}>
            <input
              type="range" min={300000000} max={5000000000} step={10000000}
              value={price} onChange={(e) => setPrice(+e.target.value)}
              className="w-full accent-foreground"
            />
          </Field>
          <Field label="Trả trước" value={`${downPct}% — ${formatVND((price * downPct) / 100)}`}>
            <input type="range" min={20} max={80} value={downPct}
              onChange={(e) => setDownPct(+e.target.value)} className="w-full accent-foreground" />
          </Field>
          <Field label="Kỳ hạn" value={`${years} năm`}>
            <input type="range" min={1} max={8} value={years}
              onChange={(e) => setYears(+e.target.value)} className="w-full accent-foreground" />
          </Field>
          <Field label="Lãi suất" value={`${rate.toFixed(1)}%/năm`}>
            <input type="range" min={6} max={14} step={0.1} value={rate}
              onChange={(e) => setRate(+e.target.value)} className="w-full accent-foreground" />
          </Field>
        </div>

        <div className="rounded-2xl bg-foreground p-8 text-background">
          <div className="text-sm text-background/70">Trả hàng tháng</div>
          <div className="mt-2 font-display text-4xl font-bold">{formatVND(Math.round(result.monthly))}</div>
          <div className="mt-8 space-y-3 border-t border-background/15 pt-6 text-sm">
            <Row k="Số tiền vay" v={formatVND(result.principal)} />
            <Row k="Tổng kỳ hạn" v={`${result.months} tháng`} />
            <Row k="Tổng phải trả" v={formatVND(Math.round(result.monthly * result.months))} />
          </div>
          <p className="mt-6 text-xs text-background/60">
            *Số liệu chỉ mang tính tham khảo. Vui lòng liên hệ chuyên viên để nhận báo giá chính xác.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="font-display text-sm font-semibold">{value}</span>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-background/70">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
