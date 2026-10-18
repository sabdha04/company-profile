import React, { useEffect } from 'react';
import Footer from '../components/footer';
const events = [
    { year: "1963", text: "Era Awal (Bergabung dengan Taspen)" },
    { year: "1971", text: "Pemisahan dan Pendirian Perum ASABRI" },
    { year: "1991-1992", text: "Pengalihan Status Menjadi Persero" },
    { year: "2015 & 2020", text: "Perluasan Manfaat Peserta" },
    { year: "2025-2026", text: "Pemulihan dan Penguatan Struktur" },
    { year: "Bersambung", text: "Tunggu kabar terbarunya.", upcoming: true },
];

// ---- Pengaturan layout desktop (satuan px) ----
const STEP = 240; // jarak antar titik
const PAD = 80; // ruang kosong di kiri/kanan
const R = 36; // radius lengkungan
const Y_START = 320; // tinggi garis di awal & akhir
const Y_HIGH = 200; // titik di atas (kartu muncul di atasnya)
const Y_LOW = 440; // titik di bawah (kartu muncul di bawahnya)
const HEIGHT = 640;
const GAP = 28; // jarak kartu ke titik
const COLOR = "#00a3b4";

function buildLayout(n) {
    const width = PAD * 2 + n * STEP;
    // level garis: awal, tiap item (bawah, atas, bawah, ...), akhir
    const levels = [Y_START, ...Array.from({ length: n }, (_, i) => (i % 2 === 0 ? Y_LOW : Y_HIGH)), Y_START];

    let d = `M 0 ${levels[0]}`;
    for (let k = 0; k <= n; k++) {
        const tx = PAD + k * STEP;
        const a = levels[k];
        const b = levels[k + 1];
        const dir = b > a ? 1 : -1;
        d += ` H ${tx - R} Q ${tx} ${a} ${tx} ${a + dir * R} V ${b - dir * R} Q ${tx} ${b} ${tx + R} ${b}`;
    }
    d += ` H ${width}`;

    const nodes = Array.from({ length: n }, (_, i) => ({
        x: PAD + i * STEP + STEP / 2,
        y: levels[i + 1],
        below: i % 2 === 0,
    }));

    return { width, d, nodes };
}

function YearBadge({ year, upcoming }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            <span
                className={`h-2 w-2 rounded-full ${upcoming ? "bg-cyan-300" : "bg-[#2fc9d1]"}`}
                aria-hidden="true"
            />
            {year}
        </span>
    );
}

function Card({ event, className = "", style }) {
    return (
        <div
            style={style}
            className={`rounded-xl bg-cyan-50 p-4 shadow-lg shadow-slate-200/80 ${className}`}
        >
            <YearBadge year={event.year} upcoming={event.upcoming} />
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.text}</p>
        </div>
    );
}

export default function HistoryTimeline() {
    const { width, d, nodes } = buildLayout(events.length);

    useEffect(() => {
            document.title = "History | PT Asabri (Persero)";
        }, []);


    return (
    <div>
        <section aria-labelledby="timeline-title" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h2 id="timeline-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Perjalanan Kami
                </h2>

                {/* Desktop: garis berliku */}
                <div className="mt-10 hidden overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:block [&::-webkit-scrollbar]:hidden">
                    <div className="relative mx-auto" style={{ minWidth: width, height: HEIGHT }}>
                        <svg
                            className="absolute inset-0 h-full w-full"
                            viewBox={`0 0 ${width} ${HEIGHT}`}
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path
                                d={d}
                                fill="none"
                                stroke={COLOR}
                                strokeWidth="12"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>

                        <ol>
                            {nodes.map((node, i) => {
                                const left = `${(node.x / width) * 100}%`;
                                const event = events[i];
                                return (
                                    <li key={event.year}>
                                        <span
                                            className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 ${event.upcoming ? "border-[#00a3b4] bg-white" : "border-[#00a3b4] bg-[#00a3b4]"
                                                }`}
                                            style={{ left, top: node.y }}
                                            aria-hidden="true"
                                        />
                                        <Card
                                            event={event}
                                            className={`absolute w-56 ${event.upcoming ? "opacity-80" : ""}`}
                                            style={{
                                                left,
                                                top: node.y,
                                                transform: node.below
                                                    ? `translate(-50%, ${GAP}px)`
                                                    : `translate(-50%, calc(-100% - ${GAP}px))`,
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>

                {/* Mobile: garis vertikal */}
                <ol className="relative mt-8 space-y-6 border-l-4 border-[#00a3b4] pl-6 md:hidden">
                    {events.map((event) => (
                        <li key={event.year} className="relative">
                            <span
                                className={`absolute -left-[38px] top-4 h-5 w-5 rounded-full border-4 border-[#00a3b4] ${event.upcoming ? "bg-white" : "bg-[#00a3b4]"
                                    }`}
                                aria-hidden="true"
                            />
                            <Card event={event} className={event.upcoming ? "opacity-80" : ""} />
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        <section>
            <Footer />
        </section>
        </div>
    );
}
