import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Impor Komponen Navbar dan Footer
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const images = [
    '/images/gambar2.png',
    '/images/gambar3.png',
    '/images/bg-3.jpg'
];

export default function Home() {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false); // State untuk kontrol tombol

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
            title: "Perlindungan Sosial",
            description:
                "Memberikan jaminan finansial dan perlindungan dari masa aktif hingga masa purnabakti.",
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
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2.5 2.5 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 00-2-2h-1c-.6 0-1-.4-1-1V6.5A2.5 2.5 0 0012 4h-1.5A2.5 2.5 0 008 6.5"
                    />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Pengelola Manfaat",
            description:
                "Menyalurkan berbagai program perlindungan seperti Tabungan Hari Tua (THT), Jaminan Kecelakaan Kerja (JKK), Jaminan Kematian (JKM), dan Program Pensiun.",
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
            title: "Mitra Kesejahteraan",
            description:
                " Meningkatkan kesejahteraan peserta dan keluarga melalui layanan digital terintegrasi dan nilai-nilai kemanusiaan.",
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

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col justify-between">
            <div>
                <Navbar />

                {/* Header / Hero Section */}
                <header className="relative bg-[#0f4c81] h-auto min-h-[100vh] flex items-center px-6 md:px-12 text-white py-16 overflow-hidden">
                    <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0">
                        <img
                            id="carousel-img"
                            src={images[currentImgIndex]}
                            alt="Ilustrasi Slideshow"
                            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-30'
                                }`}
                        />
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0f4c81] via-transparent to-transparent"></div>
                        <div className="block md:hidden absolute inset-0 bg-[#0f4c81]/70"></div>
                    </div>

                    {/* Hero Text */}
                    <div className="max-w-7xl mx-auto z-10 w-full mt-16">
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            className="grid grid-cols-1 md:grid-cols-2 items-center gap-12"
                        >
                            <div className="text-center md:text-left md:pl-20">
                                <span className="bg-white/20 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
                                    Official Website
                                </span>
                                <h1 className="text-4xl md:text-4xl font-bold mt-4 leading-tight italic">
                                    SAHABAT PERJUANGAN ANDA<br className="hidden md:block" />{' '}
                                    <span className="text-[#cca600]">SEPANJANG MASA</span>
                                </h1>
                                <p className="mt-4 text-sm md:text-base text-blue-100 max-w-xl">
                                    Pengumuman dan informasi resmi terkait ASABRI. Dapatkan update
                                    terbaru tentang kegiatan, program, dan berita seputar kami di sini.
                                </p>
                            </div>
                            <div className="hidden md:block"></div>
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
                        Melayani Sepenuh Hati
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
                                    PERAN ASABRI
                                </span>

                                <h2 className="text-3xl font-extrabold leading-[1.15] text-[#0f4c81] sm:text-4xl md:text-5xl">
                                    Penggerak Ekonomi Untuk Indonesia
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <p className="text-sm leading-7 text-gray-600 md:text-base">
                                    Sebuah komitmen strategis ASABRI sebagai BUMN dalam memberikan perlindungan finansial dan mengelola asuransi sosial bagi prajurit TNI, anggota POLRI, serta ASN Kemhan/Polri guna mendukung stabilitas nasional.
                                    </p>

                                    <p className="text-xs leading-6 text-gray-500 md:text-sm">
                                        Tidak hanya mengelola risiko finansial, ASABRI juga mengemban misi sosial. Melalui pengelolaan dana pensiun yang berkelanjutan serta program perlindungan komprehensif, ASABRI memberikan kepastian masa depan dan ketenangan bagi para penjaga kedaulatan bangsa beserta keluarganya.
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

                {/* Section Berita */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2
                                    data-aos="fade-up"
                                    className="text-3xl md:text-4xl font-extrabold text-[#0f4c81] tracking-wide"
                                >
                                    Berita
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
                                Lihat semua berita &rarr;
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
                                alt="Berita 1"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Judul Berita 1
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ringkasan berita 1. Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
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
                                alt="Berita 2"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Judul Berita 2
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ringkasan berita 2. Sed do eiusmod tempor incididunt ut labore
                                    et dolore magna aliqua.
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
                                alt="Berita 3"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Judul Berita 3
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ringkasan berita 3. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat.
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
                aria-label="Kembali ke atas"
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