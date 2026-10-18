import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useLanguage } from '../i18n/LanguageContext';
import {
    ClipboardList,
    FileText,
    MessageSquareWarning,
    Megaphone,
    ShieldCheck,
} from "lucide-react";

// 1. Impor Komponen Navbar dan Footer


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
            title={name}
            className="group relative flex h-full min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f4c81]/40 hover:shadow-[0_12px_30px_rgba(15,76,129,0.12)]"
        >
            {/* Garis aksen di bagian atas */}
            <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#0f4c81] transition-transform duration-300 group-hover:scale-x-100" />

            {/* Area Logo */}
            <div className="mb-4 flex h-20 w-full items-center justify-center rounded-xl bg-slate-50 p-3 transition-colors duration-300 group-hover:bg-blue-50">
                <img
                    src={src}
                    alt={name}
                    className="max-h-14 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                    }}
                />

                {/* Fallback jika gambar gagal dimuat */}
                <span
                    className="hidden h-12 w-12 items-center justify-center rounded-xl bg-[#0f4c81] text-xs font-bold text-white"
                    aria-hidden="true"
                >
                    {initials}
                </span>
            </div>

            {/* Nama Institusi */}
            <h3 className="text-sm font-semibold leading-snug text-slate-700 transition-colors duration-300 group-hover:text-[#0f4c81]">
                {name}
            </h3>

            {/* Aksen bawah */}
            <div className="mt-3 h-1 w-8 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-14 group-hover:bg-[#cca600]" />
        </div>
    );
}


function LogoGroup({ label, items }) {
    return (
        <div>
            {/* Judul kelompok */}
            <div className="mb-6 flex items-center gap-3">

                <div>
                    <h3 className="text-lg font-bold text-slate-800 md:text-xl">
                        {label}
                    </h3>
                </div>
            </div>

            {/* Grid Card */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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

    useEffect(() => {
        document.title = "Home | PT Asabri (Persero)";
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


    const items = [
        {
            key: 'serviceForm',
            href: '/formulir-pelayanan',
            icon: ClipboardList,
        },
        {
            key: 'taxForm',
            href: '/formulir-pajak',
            icon: FileText,
        },
        {
            key: 'complaint',
            href: '/keluhan-layanan',
            icon: MessageSquareWarning,
        },
        {
            key: 'whistleblowing',
            href: '/whistleblowing',
            icon: Megaphone,
        },
        {
            key: 'onlineClaim',
            href: '/klaim-online',
            icon: ShieldCheck,
        },
    ];


    const AsabriIllustration = () => {
        return (
            <div className="relative mx-auto flex w-full max-w-[430px] items-center justify-center">
                <svg
                    viewBox="0 0 400 520"
                    className="h-auto w-full max-w-[390px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Ilustrasi geometris ASABRI"
                    role="img"
                >
                    {/* Elemen geometris bagian atas */}
                    <path d="M175 28 L210 48 L175 68 Z" fill="#CCA600" />
                    <path d="M95 76 L130 56 L165 76 L130 96 Z" fill="#0057B8" />
                    <path d="M165 76 L235 36 L235 76 L165 116 Z" fill="#0F4C81" />
                    <path d="M235 76 L270 56 L270 96 L235 116 Z" fill="#CCA600" />

                    {/* Elemen vertikal */}
                    <path d="M55 105 L85 122 L85 190 L55 173 Z" fill="#0057B8" />
                    <path d="M130 116 L165 96 L165 136 L130 156 Z" fill="#CCA600" />
                    <path d="M270 96 L305 116 L305 185 L270 165 Z" fill="#0F4C81" />
                    <path d="M165 136 L200 156 L165 176 Z" fill="#0057B8" />
                    <path d="M200 156 L235 136 L235 176 L200 196 Z" fill="#CCA600" />

                    {/* Elemen geometris bagian tengah */}
                    <path d="M85 190 L120 210 L85 230 L50 210 Z" fill="#0F4C81" />
                    <path d="M120 210 L165 184 L165 224 L120 250 Z" fill="#0057B8" />
                    <path d="M165 176 L200 196 L165 216 Z" fill="#CCA600" />
                    <path d="M235 176 L270 196 L235 216 Z" fill="#0057B8" />
                    <path d="M270 196 L305 176 L305 216 L270 236 Z" fill="#CCA600" />
                    <path d="M200 236 L235 216 L270 236 L235 256 Z" fill="#0F4C81" />

                    {/* Elemen geometris bagian bawah */}
                    <path d="M50 250 L85 230 L85 270 L50 290 Z" fill="#CCA600" />
                    <path d="M120 250 L155 270 L120 290 Z" fill="#0057B8" />
                    <path d="M155 270 L190 250 L190 290 L155 310 Z" fill="#0F4C81" />
                    <path d="M235 256 L270 276 L235 296 Z" fill="#0057B8" />
                    <path d="M270 276 L305 256 L305 296 L270 316 Z" fill="#CCA600" />

                    {/* Pola garis dekoratif */}
                    <g stroke="#CCA600" strokeWidth="2.5">
                        <path d="M96 144 L135 121" />
                        <path d="M101 151 L140 128" />
                        <path d="M106 158 L145 135" />
                        <path d="M111 165 L150 142" />
                        <path d="M116 172 L155 149" />
                    </g>

                    <g stroke="#0057B8" strokeWidth="2.5">
                        <path d="M285 340 L320 319" />
                        <path d="M285 350 L320 329" />
                        <path d="M285 360 L320 339" />
                        <path d="M285 370 L320 349" />
                        <path d="M285 380 L320 359" />
                        <path d="M285 390 L320 369" />
                    </g>

                    {/* Pola tambahan */}
                    <path d="M50 325 L85 305 L120 325 L85 345 Z" fill="#0057B8" />
                    <path d="M120 325 L155 345 L120 365 Z" fill="#CCA600" />
                    <path d="M155 345 L190 325 L190 365 L155 385 Z" fill="#0057B8" />
                    <path d="M190 365 L225 385 L190 405 Z" fill="#0F4C81" />
                    <path d="M225 385 L260 365 L260 405 L225 425 Z" fill="#CCA600" />
                    <path d="M260 405 L295 425 L260 445 Z" fill="#0057B8" />

                    <path d="M50 390 L85 370 L85 410 L50 430 Z" fill="#0F4C81" />
                    <path d="M85 410 L120 430 L85 450 Z" fill="#CCA600" />
                    <path d="M120 430 L155 410 L155 450 L120 470 Z" fill="#0057B8" />
                    <path d="M155 450 L190 470 L155 490 Z" fill="#CCA600" />
                    <path d="M225 445 L260 465 L225 485 Z" fill="#0F4C81" />

                    {/* Identitas vertikal */}
                    <text
                        x="220"
                        y="120"
                        transform="rotate(-90 220 120)"
                        fill="#cca600"
                        fontSize="12"
                        fontWeight="800"
                        letterSpacing="2"
                    >
                        ASABRI
                    </text>
                </svg>

                {/* Aksen lingkaran */}
                <div className="absolute -right-1 top-[28%] h-3 w-3 rounded-full bg-[#CCA600]" />
                <div className="absolute -left-2 bottom-[23%] h-4 w-4 rounded-full bg-[#0057B8]" />
            </div>

        );
    };

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



                <section className="w-full overflow-hidden bg-white px-6 py-16 md:px-12 md:py-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

                        {/* Kolom kiri: Ilustrasi */}
                        <div className="flex items-center justify-center">
                            <AsabriIllustration />
                        </div>

                        {/* Kolom kanan: Konten */}
                        <div className="flex flex-col items-start">
                            <span data-aos="fade-up"
                                data-aos-delay="500" className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0057B8] md:text-sm">
                                {t('home.bar1.title')}
                            </span>

                            <h2 data-aos="fade-up"
                                data-aos-delay="600" className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-gray-950 md:text-3xl lg:text-[32px]">
                                {t('home.bar1.desc')}
                            </h2>

                            <p data-aos="fade-up"
                                data-aos-delay="700" className="mt-5 text-justify text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                                {t('home.bar1.paragraph')}
                            </p>

                            <a
                                href="/tentang-kami"
                                data-aos="fade-up"
                                data-aos-delay="800"
                                className="group mt-8 inline-flex items-center gap-4 rounded-full border border-slate-400 px-7 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-[#0057B8] hover:bg-[#0057B8] hover:text-white">
                                <span>{t('home.bar1.p1')}</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                    </div>
                </section>





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
                                    <p className="text-justify text-sm leading-7 text-gray-600 md:text-base">
                                        {t('home.role.p1')}
                                    </p>

                                    <p className="text-justify text-xs leading-6 text-gray-500 md:text-sm">
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



                <section
                    aria-label={t('home.quickServices.title')}
                    className="bg-slate-200 py-8"
                >
                    {/* Judul Section */}
                    <div className="mx-auto mb-6 max-w-7xl px-6 md:px-12">
                        <h2 className="text-xl font-bold text-[#1b2a5c] sm:text-2xl">
                            {t('home.quickServices.title')}
                        </h2>

                        <p className="mt-1 text-sm text-slate-600">
                            {t('home.quickServices.subtitle')}
                        </p>
                    </div>

                    {/* Daftar Layanan */}
                    <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3 xl:grid-cols-5">
                        {items.map(({ key, href, icon: Icon }) => (
                            <li key={key}>
                                <a
                                    href={href}
                                    className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-[#1b2a5c] transition duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lg hover:shadow-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 transition group-hover:bg-amber-500 group-hover:text-[#1b2a5c]">
                                        <Icon
                                            className="h-5 w-5"
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className="text-sm font-semibold leading-snug">
                                            {t(`home.quickServices.items.${key}.title`)}
                                        </h3>

                                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                                            {t(`home.quickServices.items.${key}.desc`)}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>


                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50  py-16 sm:px-8  md:py-20">
                    <div className="mx-auto max-w-7xl px-6 md:px-12">

                        <div className="mb-12 flex items-start gap-4">
                            <span className="mt-1 h-12 w-1.5 shrink-0 rounded-full bg-[#0f4c81]" />

                            <div>

                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    {t('home.stakeholder.title')}
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                    {t('home.stakeholder.subtitle')}
                                </p>
                            </div>
                        </div>

                        {/* Daftar Stakeholder */}
                        <div className="space-y-12">
                            <LogoGroup
                                label={t('home.stakeholder.groupGovernment')}
                                items={governmentStakeholders}
                            />

                            <div className="h-px bg-gradient-to-r from-[#0f4c81]/30 via-slate-200 to-transparent" />

                            <LogoGroup
                                label={t('home.stakeholder.groupDefense')}
                                items={defenseStakeholders}
                            />
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