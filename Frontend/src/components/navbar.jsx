import React, { useState, useEffect } from 'react';

export default function Navbar() {
    // State interaksi
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopProfilOpen, setIsDesktopProfilOpen] = useState(false);
    const [isMobileTentangOpen, setIsMobileTentangOpen] = useState(false);
    const [isMobileProfilOpen, setIsMobileProfilOpen] = useState(false);

    // Efek Perubahan Background Navbar saat di-scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 w-full z-50 py-3 px-6 md:px-12 transition-all duration-300 ease-in-out ${isScrolled
                    ? 'bg-white/70 backdrop-blur-md text-[#0f4c81] shadow-md'
                    : 'bg-transparent text-white'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* LOGO */}
                <a href="/" className="md:ml-12 pt-2">
                    <img
                        id="logoImg"
                        src={isScrolled ? '/images/asabri-warna.png' : '/images/logo-light@2x.png'}
                        alt="Logo Perusahaan"
                        className="h-12 w-auto object-contain"
                    />
                </a>

                {/* NAVBAR DESKTOP */}
                <ul className="hidden md:flex items-center space-x-10 font-medium absolute left-1/2 -translate-x-1/2">
                    {/* Beranda */}
                    <li>
                        <a href="./home.jsx" className="hover:text-blue-500 transition">
                            Beranda
                        </a>
                    </li>

                    {/* Tentang Kami */}
                    <li className="relative group">
                        <a href="#" className="hover:text-blue-500 transition">
                            Tentang Kami
                        </a>

                        {/* Dropdown Utama Desktop */}
                        <div className="absolute left-0 top-full mt-4 w-60 bg-white text-gray-800 rounded-lg shadow-lg overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            {/* Profil Perusahaan Toggle */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsDesktopProfilOpen(!isDesktopProfilOpen)}
                                    className="w-full flex mt-3 items-center justify-between px-3 py-3 text-sm text-gray-500 border-l-4 border-transparent hover:border-[#0057b8] hover:text-gray-800 transition"
                                >
                                    <span>Profil Perusahaan</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${isDesktopProfilOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Submenu Profil Perusahaan */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isDesktopProfilOpen ? 'max-h-60' : 'max-h-0'
                                        }`}
                                >
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        Sekilas Perusahaan
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        Sejarah
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        Visi & Misi
                                    </a>
                                    <a
                                        href="#"
                                        className="block pl-8 pr-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:border-l-4 hover:border-[#0057b8] transition"
                                    >
                                        Makna Logo
                                    </a>
                                </div>
                            </div>

                            {/* Menu Lainnya */}
                            <a
                                href="#"
                                className="block px-3 py-3 text-sm text-gray-500 border-l-4 border-transparent hover:border-[#0057b8] hover:text-gray-800 transition"
                            >
                                Struktur Organisasi
                            </a>
                        
                        </div>
                    </li>

                    {/* Berita */}
                    <li>
                        <a href="/berita.html" className="hover:text-blue-500 transition">
                            Berita
                        </a>
                    </li>

                    {/* FAQ */}
                    <li>
                        <a href="/Faq.html" className="hover:text-blue-500 transition">
                            FAQ
                        </a>
                    </li>

                    {/* Karir */}
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Karir
                        </a>
                    </li>
                </ul>
            

        
                {/* HAMBURGER BUTTON MOBILE */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 focus:outline-none"
                    aria-label="Toggle Navigation"
                >
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    ></span>
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    ></span>
                    <span
                        className={`block w-7 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    ></span>
                </button>
            </div>

            {/* MOBILE MENU PANEL */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
                        ? 'max-h-[1000px] opacity-100 translate-y-0 visible'
                        : 'max-h-0 opacity-0 -translate-y-3 invisible'
                    }`}
            >
                <div className="px-6 py-5">
                    {/* Beranda */}
                    <a
                        href="/index.html"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        Beranda
                    </a>

                    {/* Tentang Kami Mobile */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsMobileTentangOpen(!isMobileTentangOpen)}
                            className="w-full flex items-center justify-between py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                        >
                            <span>Tentang Kami</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isMobileTentangOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Tentang Kami Mobile */}
                        <div
                            className={`pl-4 bg-gray-50 overflow-hidden transition-all duration-400 ease-in-out ${isMobileTentangOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {/* Profil Perusahaan Mobile */}
                            <button
                                type="button"
                                onClick={() => setIsMobileProfilOpen(!isMobileProfilOpen)}
                                className="w-full flex items-center justify-between py-3 pr-3 text-sm text-gray-600"
                            >
                                <span>Profil Perusahaan</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isMobileProfilOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Submenu Profil Mobile */}
                            <div
                                className={`pl-4 overflow-hidden transition-all duration-400 ease-in-out ${isMobileProfilOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    Sekilas Perusahaan
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    Sejarah
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    Visi & Misi
                                </a>
                                <a
                                    href="#"
                                    className="block py-2 text-sm text-gray-500 hover:text-[#0057b8]"
                                >
                                    Makna Logo
                                </a>
                            </div>

                            {/* Menu Lainnya Mobile */}
                            <a href="#" className="block py-3 text-sm text-gray-600">
                                Struktur Organisasi
                            </a>
                            <a href="#" className="block py-3 text-sm text-gray-600">
                                Dewan Direksi
                            </a>
                            <a href="#" className="block py-3 text-sm text-gray-600">
                                Dewan Komisaris
                            </a>
                        </div>
                    </div>

                    {/* Berita */}
                    <a
                        href="/berita.html"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        Berita
                    </a>

                    {/* FAQ */}
                    <a
                        href="/Faq.html"
                        className="block py-3 text-sm border-b border-gray-100 hover:text-[#0057b8]"
                    >
                        FAQ
                    </a>

                    {/* Karir */}
                    <a href="#" className="block py-3 text-sm hover:text-[#0057b8]">
                        Karir
                    </a>
                    
                </div>
                
            </div>

            
        </nav>
    );
}