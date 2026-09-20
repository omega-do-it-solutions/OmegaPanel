import { useMemo } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
import "dayjs/locale/de";
import "dayjs/locale/ja";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type Locale = "en-US" | "de-DE" | "ar-SA" | "ja-JP";
type Direction = "ltr" | "rtl";

type Money = {
  amountMinor: number;
  currency: "USD" | "EUR" | "SAR" | "JPY";
};

type SegmentRow = {
  id: string;
  label: string;
  netRevenue: Money;
  changeRatio: number | null;
};

type DashboardData = {
  netRevenue: Money;
  changeRatio: number | null;
  updatedAt: string;
  reportingTimeZone: string;
  segments: SegmentRow[];
};

type Props = {
  locale: Locale;
  data: DashboardData;
};

type Catalog = {
  title: string;
  summary: string;
  exportCsv: string;
  chartBoundary: string;
  netRevenue: string;
  changed: (value: string) => string;
  unavailable: string;
  updated: (value: string, zone: string) => string;
  trendTitle: string;
  trendSummary: string;
  segments: string;
  segment: string;
  change: string;
  rows: (count: number, formatted: string) => string;
};

const copy: Record<Locale, Catalog> = {
  "en-US": {
    title: "Revenue and retention",
    summary: "Summary",
    exportCsv: "Export CSV",
    chartBoundary: "Chart implementation boundary",
    netRevenue: "Net revenue",
    changed: (value: string) => `${value} versus the previous complete period`,
    unavailable: "Unavailable",
    updated: (value: string, zone: string) => `Updated ${value} (${zone})`,
    trendTitle: "Revenue trend",
    trendSummary: "Net revenue trend for the selected period. Use the data table for exact values.",
    segments: "Segment drivers",
    segment: "Segment",
    change: "Change",
    rows: (count: number, formatted: string) =>
      new Intl.PluralRules("en-US").select(count) === "one"
        ? `${formatted} segment shown`
        : `${formatted} segments shown`,
  },
  "de-DE": {
    title: "Umsatz und Kundenbindung",
    summary: "Zusammenfassung",
    exportCsv: "CSV exportieren",
    chartBoundary: "Grenze der Diagramm-Implementierung",
    netRevenue: "Nettoumsatz",
    changed: (value: string) => `${value} gegenüber dem vorherigen vollständigen Zeitraum`,
    unavailable: "Nicht verfügbar",
    updated: (value: string, zone: string) => `Aktualisiert: ${value} (${zone})`,
    trendTitle: "Umsatztrend",
    trendSummary: "Nettoumsatztrend für den gewählten Zeitraum. Genaue Werte stehen in der Datentabelle.",
    segments: "Segmenttreiber",
    segment: "Segment",
    change: "Änderung",
    rows: (count: number, formatted: string) =>
      new Intl.PluralRules("de-DE").select(count) === "one"
        ? `${formatted} Segment angezeigt`
        : `${formatted} Segmente angezeigt`,
  },
  "ar-SA": {
    title: "الإيرادات والاحتفاظ",
    summary: "الملخص",
    exportCsv: "تصدير CSV",
    chartBoundary: "حد تنفيذ المخطط",
    netRevenue: "صافي الإيرادات",
    changed: (value: string) => `${value} مقارنةً بالفترة المكتملة السابقة`,
    unavailable: "غير متاح",
    updated: (value: string, zone: string) => `آخر تحديث ${value} (${zone})`,
    trendTitle: "اتجاه الإيرادات",
    trendSummary: "اتجاه صافي الإيرادات للفترة المحددة. استخدم جدول البيانات للقيم الدقيقة.",
    segments: "العوامل المؤثرة حسب الشريحة",
    segment: "الشريحة",
    change: "التغيير",
    rows: (count: number, formatted: string) => {
      const form = new Intl.PluralRules("ar-SA").select(count);
      if (form === "zero") return "لا توجد شرائح معروضة";
      if (form === "one") return "شريحة واحدة معروضة";
      if (form === "two") return "شريحتان معروضتان";
      return `${formatted} شرائح معروضة`;
    },
  },
  "ja-JP": {
    title: "売上と継続率",
    summary: "概要",
    exportCsv: "CSVをエクスポート",
    chartBoundary: "チャート実装の境界",
    netRevenue: "純売上高",
    changed: (value: string) => `前の完了期間比 ${value}`,
    unavailable: "利用不可",
    updated: (value: string, zone: string) => `更新: ${value}（${zone}）`,
    trendTitle: "売上トレンド",
    trendSummary: "選択期間の純売上高トレンドです。正確な値はデータ表で確認できます。",
    segments: "セグメント別の要因",
    segment: "セグメント",
    change: "変化",
    rows: (_count: number, formatted: string) => `${formatted}件のセグメントを表示`,
  },
};

function resolvedDirection(locale: Locale): Direction {
  return locale.startsWith("ar") ? "rtl" : "ltr";
}

const currencyMinorDigits: Record<Money["currency"], number> = {
  USD: 2,
  EUR: 2,
  SAR: 2,
  JPY: 0,
};

const dayjsLocale: Record<Locale, string> = {
  "en-US": "en",
  "de-DE": "de",
  "ar-SA": "ar",
  "ja-JP": "ja",
};

function majorAmount(money: Money): number {
  return money.amountMinor / 10 ** currencyMinorDigits[money.currency];
}

export function AnalyticsDashboard({ locale, data }: Props) {
  const messages = copy[locale];
  const formatters = useMemo(
    () => ({
      money: (money: Money) =>
        new Intl.NumberFormat(locale, {
          style: "currency",
          currency: money.currency,
          currencyDisplay: "narrowSymbol",
        }).format(majorAmount(money)),
      percent: (ratio: number) =>
        new Intl.NumberFormat(locale, {
          style: "percent",
          signDisplay: "always",
          maximumFractionDigits: 1,
        }).format(ratio),
      integer: (value: number) => new Intl.NumberFormat(locale).format(value),
      dateTime: (instant: string) =>
        dayjs
          .utc(instant)
          .tz(data.reportingTimeZone)
          .locale(dayjsLocale[locale])
          .format("lll"),
    }),
    [data.reportingTimeZone, locale],
  );

  const change =
    data.changeRatio === null
      ? messages.unavailable
      : messages.changed(formatters.percent(data.changeRatio));

  return (
    <main
      dir={resolvedDirection(locale)}
      className="mx-auto max-w-screen-2xl space-y-8 p-4 text-slate-950 sm:p-6 lg:p-8"
    >
      <header className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {messages.updated(
              formatters.dateTime(data.updatedAt),
              data.reportingTimeZone,
            )}
          </p>
        </div>
        <button className="rounded-md border border-slate-300 px-4 py-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          {messages.exportCsv}
        </button>
      </header>

      <section aria-labelledby="summary-title">
        <h2 id="summary-title" className="sr-only">
          {messages.summary}
        </h2>
        <article className="rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">
            {messages.netRevenue}
          </h3>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            <bdi>{formatters.money(data.netRevenue)}</bdi>
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <bdi>{change}</bdi>
          </p>
        </article>
      </section>

      <figure aria-labelledby="trend-title" className="rounded-xl border border-slate-200 p-5">
        <figcaption>
          <h2 id="trend-title" className="text-lg font-semibold">
            {messages.trendTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {messages.trendSummary}
          </p>
        </figcaption>
        <div
          role="img"
          aria-label={messages.trendSummary}
          className="mt-4 grid min-h-56 place-items-center rounded-lg bg-slate-50 text-sm text-slate-600"
        >
          {messages.chartBoundary}
        </div>
      </figure>

      <section aria-labelledby="segments-title">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="segments-title" className="text-lg font-semibold">
            {messages.segments}
          </h2>
          <p aria-live="polite" className="text-sm text-slate-600">
            {messages.rows(data.segments.length, formatters.integer(data.segments.length))}
          </p>
        </div>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full border-collapse text-start text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">
                  {messages.segment}
                </th>
                <th scope="col" className="px-4 py-3 text-end font-semibold">
                  {messages.netRevenue}
                </th>
                <th scope="col" className="px-4 py-3 text-end font-semibold">
                  {messages.change}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.segments.map((row) => (
                <tr key={row.id} className="border-t border-slate-200">
                  <th scope="row" className="px-4 py-3 text-start font-medium">
                    <bdi>{row.label}</bdi>
                  </th>
                  <td className="px-4 py-3 text-end tabular-nums">
                    <bdi>{formatters.money(row.netRevenue)}</bdi>
                  </td>
                  <td className="px-4 py-3 text-end tabular-nums">
                    <bdi>
                      {row.changeRatio === null
                        ? messages.unavailable
                        : formatters.percent(row.changeRatio)}
                    </bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
