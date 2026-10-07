import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Impor Komponen Navbar dan Footer
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useLanguage } from '../i18n/LanguageContext';

const images = [
    '/images/gambar2.png',
    '/images/gambar3.png',
    '/images/bg-3.jpg'
];

const videos = [
    { id: 1, titleKey: 'home.videos.v1', src: '/videos/video1.mp4', heightClass: 'h-[80vh]', top: 'top-20' },
    { id: 2, titleKey: 'home.videos.v2', src: '/videos/video2.mp4', heightClass: 'inset-0' },
    { id: 3, titleKey: 'home.videos.v3', src: '/videos/video3.mp4', heightClass: 'inset-0' },
    // { id: 4, title: 'AJP 2026', src: '/videos/video4.mp4' },
    // { id: 5, title: 'Bijak Berenergi', src: '/videos/video5.mp4' },
];

const logos = [
    { name: 'Bank Syariah Indonesia', src: '/images/bsi1.png' },
    { name: 'Bank BTN', src: '/images/btn1.png' },
    { name: 'Bank BNI', src: '/images/bni1.png' },
    { name: 'Bank BJB', src: '/images/bjb.png' },
    { name: 'Bank Mantap', src: '/images/mantap.png' },
    { name: 'Bank BRI', src: '/images/bri.png' },
    { name: 'Pos Indonesia', src: '/images/pos.png' },
    { name: 'Bank Jatim', src: '/images/jatim.png' },
    { name: 'Bank Jateng', src: '/images/jateng.png' },
    { name: 'Bws', src: '/images/bws.png' },
    { name: 'KB', src: '/images/kb.png' },
    { name: 'Bumi', src: '/images/bumi.png' },
];

function LogoCard({ name, initials, src }) {
    return (
        <div
            // className="group flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 transition-colors duration-300 hover:border-slate-300"
            className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white px-4"
            title={name}
        >
            {/* Swap this img for the real logo asset. Falls back to initials
          if the file isn't present yet, so the layout stays intact. */}
            <img
                src={src}
                alt={name}
                // className="max-h-12 w-auto object-contain grayscale opacity-70 transition duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                className="max-h-12 w-auto object-contain"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                }}
            />
            <span
                className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500"
                aria-hidden="true"
            >
                {initials}
            </span>
        </div>
    );
}

function LogoGroup({ label, items }) {
    return (
        <div>
            <p className="mb-4 text-sm font-medium text-slate-500">{label}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {items.map((item) => (
                    <LogoCard key={item.name} {...item} />
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const { t } = useLanguage();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const videoRef = useRef(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false); // State untuk kontrol tombol
    const duplicatedLogos = [...logos, ...logos];
    // Effect untuk mendeteksi posisi scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fungsi untuk pindah ke video berikutnya secara otomatis saat video selesai
    const handleVideoEnded = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    // Auto-play ulang video saat indeks video berubah
    useEffect(() => {
        setVideoProgress(0);

        if (videoRef.current) {
            videoRef.current.load();

            videoRef.current
                .play()
                .catch((err) => console.log('Autoplay error:', err));
        }
    }, [currentVideoIndex]);

    // Fungsi untuk meluncur halus ke posisi paling atas
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // 3. Effect terpisah untuk Inisialisasi AOS
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false,
            easing: 'ease-in-out',
            offset: 100,
            mirror: false,
        });

        const timer = setTimeout(() => {
            AOS.refreshHard();
        }, 300);

        const handleResize = () => {
            AOS.refreshHard();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    // 4. Effect terpisah untuk Carousel Gambar
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Gambar memudar
            setTimeout(() => {
                setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true); // Gambar muncul kembali
            }, 300);
        }, 4000); // Ganti setiap 4 detik

        return () => clearInterval(interval);
    }, []);



    const features = [
        {
            id: 1,
            title: t('home.features.protection.title'),
            description: t('home.features.protection.desc'),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M12 3.5l7 3.5v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-3.5z"
                    />
                </svg>
            ),
        },
        {
            id: 2,
            title: t('home.features.benefit.title'),
            description: t('home.features.benefit.desc'),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            title: t('home.features.partner.title'),
            description: t('home.features.partner.desc'),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>
            ),
        },
    ];

    const cardPosition = {
        1: "lg:ml-12",
        2: "lg:ml-0",
        3: "lg:ml-20",
    };

    const governmentStakeholders = [
        { name: t('home.stakeholder.names.danantara'), initials: "DI", src: "/images/danantara1.png" },
        { name: t('home.stakeholder.names.bumn'), initials: "BUMN", src: "/images/bumn.png" },
        { name: t('home.stakeholder.names.kemenkeu'), initials: "KP", src: "/images/kemenkeu.png" },
        { name: t('home.stakeholder.names.kemhan'), initials: "KEMHAN", src: "/images/kemhan.png" },
        { name: t('home.stakeholder.names.ojk'), initials: "OJK", src: "/images/ojk.png" },
    ];

    const defenseStakeholders = [
        { name: t('home.stakeholder.names.army'), initials: "AD", src: "/images/tni-ad.png" },
        { name: t('home.stakeholder.names.navy'), initials: "AL", src: "/images/tni-al.png" },
        { name: t('home.stakeholder.names.airforce'), initials: "AU", src: "/images/tni-au.png" },
        { name: t('home.stakeholder.names.tni'), initials: "TNI", src: "/images/tni.png" },
        { name: t('home.stakeholder.names.polri'), initials: "POLRI", src: "/images/polri.png" },
    ];



    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col justify-between">
            <div>
                <Navbar />

                <header className="relative bg-black h-auto min-h-[100vh] flex items-center px-6 md:px-12 text-white py-16 overflow-hidden">

                    {/* Background Video Container */}
                    <div
                        // className="absolute inset-0 z-0"
                        // className="absolute top-20 left-0 right-0  h-[80vh] z-0">
                        className={`absolute left-0 right-0 z-0 ${videos[currentVideoIndex].heightClass === 'inset-0'
                            ? 'inset-0'
                            : videos[currentVideoIndex].heightClass
                            }`}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            onTimeUpdate={(e) => {
                                const video = e.currentTarget;

                                if (video.duration) {
                                    const progress = (video.currentTime / video.duration) * 100;
                                    setVideoProgress(progress);
                                }
                            }}
                            onEnded={handleVideoEnded}
                            className="w-full h-full object-cover object-center transition-opacity duration-700"
                        >
                            <source
                                src={videos[currentVideoIndex].src}
                                type="video/mp4"
                            />
                            {t('home.videoUnsupported')}
                        </video>

                    </div>

                    {/* INDIKATOR BOTTOM TAB / PROGRESS BAR */}
                    <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:px-16">

                        {/* ================= MOBILE ================= */}
                        <div className="flex md:hidden items-end gap-2 w-full">

                            {videos.map((item, index) => {
                                const isActive = index === currentVideoIndex;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentVideoIndex(index)}
                                        className={`flex flex-col text-left focus:outline-none transition-all duration-300 ${isActive ? 'flex-[4]' : 'flex-1'
                                            }`}
                                    >

                                        {/* Judul hanya video aktif */}
                                        <div className="h-5 mb-2 flex items-center">
                                            {isActive && (
                                                <>
                                                    <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5" />

                                                    <span className="text-xs font-medium text-white truncate">
                                                        {t(item.titleKey)}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Progress */}
                                        <div className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-600 transition-[width] duration-100"
                                                style={{
                                                    width: isActive
                                                        ? `${videoProgress}%`
                                                        : '0%',
                                                }}
                                            />
                                        </div>

                                    </button>
                                );
                            })}

                        </div>


                        {/* ================= DESKTOP ================= */}
                        <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

                            {videos.map((item, index) => {
                                const isActive = index === currentVideoIndex;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentVideoIndex(index)}
                                        className="flex flex-col text-left group focus:outline-none"
                                    >

                                        {/* Titik + Judul Video */}
                                        <div className="flex items-center space-x-2 mb-2">

                                            {/* Lingkaran hanya untuk video aktif */}
                                            {isActive && (
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-600 scale-125 transition-all duration-300 flex-shrink-0" />
                                            )}

                                            {/* Judul */}
                                            <span
                                                className={`text-xs md:text-sm font-medium truncate transition-colors duration-300 ${isActive
                                                    ? 'text-white font-semibold'
                                                    : 'text-gray-300 group-hover:text-white'
                                                    }`}
                                            >
                                                {t(item.titleKey)}
                                            </span>

                                        </div>

                                        {/* Progress Bar SEMUA VIDEO */}
                                        <div className="w-full h-[2px] bg-white/30 rounded-full overflow-hidden">

                                            <div
                                                className={`h-full transition-[width] duration-100 ${isActive
                                                    ? 'bg-red-600'
                                                    : 'bg-transparent'
                                                    }`}
                                                style={{
                                                    width: isActive
                                                        ? `${videoProgress}%`
                                                        : '0%',
                                                }}
                                            />

                                        </div>

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                </header>

                <div className="relative w-full bg-[#b81d1d] text-white rounded-b-3xl py-8 px-8 shadow-lg flex flex-col items-center justify-center space-y-6">
                    {/* Container Logo */}
                    <div className="flex items-center space-x-6">
                        {/* Logo Danantara */}
                        <div data-aos="fade-right" className="flex items-center space-x-2">
                            <img src="/images/danantara.png" alt="Danantara Indonesia" className="h-8 object-contain" />
                        </div>

                        {/* Garis Pembatas Vertikal */}
                        <div data-aos="zoom-in" className="h-8 w-[1px] bg-white/60"></div>

                        {/* Logo Asabri */}
                        <div data-aos="fade-left" className="flex items-center space-x-2">
                            <img src="/images/logo-light@2x.png" alt="Asabri" className="h-8 object-contain" />
                        </div>
                    </div>

                    {/* Teks / Slogan */}
                    <h1 data-aos="zoom-in" className="text-4xl md:text-4xl font-bold tracking-wide text-center">
                        {t('home.slogan')}
                    </h1>
                </div>

                <section className="relative overflow-hidden bg-gray-50/50 py-20 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 md:px-12">
                        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">

                            {/* =========================
                        LEFT CONTENT
                    ========================== */}
                            <div
                                data-aos="fade-right"
                                className="max-w-xl"
                            >
                                <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                    {t('home.role.label')}
                                </span>

                                <h2 className="text-3xl font-extrabold leading-[1.15] text-[#0f4c81] sm:text-4xl md:text-5xl">
                                    {t('home.role.title')}
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <p className="text-sm leading-7 text-gray-600 md:text-base">
                                        {t('home.role.p1')}
                                    </p>

                                    <p className="text-xs leading-6 text-gray-500 md:text-sm">
                                        {t('home.role.p2')}
                                    </p>
                                </div>
                            </div>

                            {/* =========================
                        RIGHT CARDS
                    ========================== */}
                            <div className="relative py-6 lg:min-h-[500px]">

                                {/* background decorative */}
                                <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-50/50 blur-3xl" />

                                <div className="relative space-y-10">

                                    {features.map((item, index) => (
                                        <div
                                            key={item.id}
                                            data-aos="fade-left"
                                            data-aos-delay={index * 150}
                                            className={`
                                        relative
                                        w-full
                                        max-w-[480px]
                                        ${cardPosition[item.id]}
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        bg-white/90
                                        p-6
                                        shadow-[0_8px_30px_rgba(15,76,129,0.06)]
                                        backdrop-blur-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_15px_40px_rgba(15,76,129,0.10)]
                                    `}
                                        >

                                            {/* Icon */}
                                            <div
                                                className="
                                            absolute
                                            -left-3
                                            -top-3
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-blue-100
                                            bg-blue-50
                                            text-[#0f4c81]
                                            shadow-sm
                                        "
                                            >
                                                {item.icon}
                                            </div>

                                            {/* Content */}
                                            <div className="pl-2">
                                                <h3 className="mb-2 text-base font-bold leading-snug text-gray-800 md:text-lg">
                                                    {item.title}
                                                </h3>

                                                <p className="text-xs leading-6 text-gray-500 md:text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="bg-[] px-6 py-20 sm:px-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 flex items-start gap-4">
                            <span className="mt-2 h-8 w-1 flex-shrink-0 rounded-full bg-[#0f4c81]" />
                            <div>
                                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                    {t('home.stakeholder.title')}
                                </h2>
                                <p className="mt-2 max-w-md text-base text-slate-500">
                                    {t('home.stakeholder.subtitle')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <LogoGroup label={t('home.stakeholder.groupGovernment')} items={governmentStakeholders} />
                            <div className="h-px bg-slate-200" />
                            <LogoGroup label={t('home.stakeholder.groupDefense')} items={defenseStakeholders} />
                        </div>
                    </div>
                </section>


                <section className="bg-[] py-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                            {t('home.payment.title')}
                        </h3>
                    </div>

                    {/* Container dengan efek Gradient Fade di Sisi Kiri & Kanan */}
                    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

                        {/* Track Bergerak */}
                        <div className="flex w-max items-center space-x-12 animate-marquee hover:[animation-play-state:paused]">
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center min-w-[160px] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        className="h-10 md:h-12 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </section>



                {/* Section Berita */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2
                                    data-aos="fade-up"
                                    className="text-3xl md:text-4xl font-extrabold text-[#0f4c81] tracking-wide"
                                >
                                    {t('home.news.title')}
                                </h2>
                                <div
                                    data-aos="fade-up"
                                    className="w-28 h-1.5 bg-[#00a8ff] mt-3 rounded-full"
                                ></div>
                            </div>

                            <a
                                data-aos="fade-up"
                                data-aos-delay="200"
                                href="/berita.html"
                                className="text-[#00a8ff] font-medium hover:text-blue-600 transition"
                            >
                                {t('home.news.seeAll')} &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Card Berita Grid */}
                    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="500"
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <img
                                src="/images/gambar1.jpg"
                                alt={t('home.news.items.n1.title')}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {t('home.news.items.n1.title')}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {t('home.news.items.n1.summary')}
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <img
                                src="/images/gambar2-1.png"
                                alt={t('home.news.items.n2.title')}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {t('home.news.items.n2.title')}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {t('home.news.items.n2.summary')}
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="700"
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <img
                                src="/images/gambar3.png"
                                alt={t('home.news.items.n3.title')}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {t('home.news.items.n3.title')}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {t('home.news.items.n3.summary')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                </section>
            </div>
            {/* TOMBOL BACK TO TOP */}
            <button
                onClick={scrollToTop}
                aria-label={t('home.backToTop')}
                className={`fixed bottom-6 right-6 z-50 p-3 bg-[#009bda] text-white rounded-full shadow-lg hover:bg-[#cca600] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center ${showScrollTop
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </button>

            <Footer />
        </div>
    );
}