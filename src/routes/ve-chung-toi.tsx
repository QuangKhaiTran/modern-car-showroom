import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/ve-chung-toi")({
  head: () => ({
    meta: [
      { title: "Về AutoNova — Đại lý xe hơi đa thương hiệu" },
      { name: "description", content: "AutoNova được thành lập từ 2010 — sứ mệnh mang đến trải nghiệm mua xe minh bạch, hiện đại và đáng tin cậy cho người Việt." },
      { property: "og:title", content: "Về AutoNova" },
      { property: "og:description", content: "Hành trình 15 năm phục vụ người yêu xe Việt." },
      { property: "og:url", content: "/ve-chung-toi" },
    ],
    links: [{ rel: "canonical", href: "/ve-chung-toi" }],
  }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
        <p className="text-sm font-medium text-brand">Câu chuyện</p>
        <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">Về AutoNova</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Thành lập năm 2010, AutoNova khởi đầu từ một showroom nhỏ tại TP.HCM với niềm tin rằng
          mua xe hơi không cần phải phức tạp. Sau 15 năm, chúng tôi đã trở thành mạng lưới đại lý đa
          thương hiệu với 28 showroom trên toàn quốc.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "2010", t: "Thành lập" },
            { n: "28", t: "Showroom" },
            { n: "120k+", t: "Khách hàng" },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-3xl font-bold text-brand">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.t}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold">Giá trị cốt lõi</h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p><strong className="text-foreground">Minh bạch:</strong> Báo giá công khai, không phụ thu, không "bia kèm lạc".</p>
          <p><strong className="text-foreground">Chính hãng:</strong> Mọi xe đều có CO/CQ và bảo hành chính hãng.</p>
          <p><strong className="text-foreground">Đồng hành:</strong> Chuyên viên hỗ trợ trọn đời xe — từ mua, bảo dưỡng đến nâng cấp.</p>
        </div>
      </div>
    </SiteLayout>
  ),
});
