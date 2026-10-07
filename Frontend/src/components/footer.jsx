import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="mt-16 bg-[#0f4c81] text-white">
            <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12">
                {/* Grid Konten Utama */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {/* Blok 1: Logo & Deskripsi */}
                    <div className="space-y-4">
                        <a href="/" className="inline-block">
                            <img
                                src="/images/logo-light@2x.png"
                                alt={t('nav.logoAlt')}
                                className="h-13 w-auto object-contain"
                            />
                        </a>
                        <p className="text-sm font-normal text-white/80 leading-relaxed max-w-[250px]">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Blok 2: Kontak */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-5">
                            {t('footer.contactTitle')}
                        </h3>
                        <div className="space-y-4">
                            {/* Telepon */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
                                    <svg
                                        className="w-5 h-5 text-white/70"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        {t('footer.supportNumber')}
                                    </p>
                                    <a
                                        href="tel:1500043"
                                        className="text-sm text-white/90 hover:text-white transition"
                                    >
                                        1500043
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
                                    <svg
                                        className="w-5 h-5 text-white/70"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        {t('footer.supportEmail')}
                                    </p>
                                    <a
                                        href="mailto:asabri@asabri.co.id"
                                        className="text-sm text-white/90 hover:text-white break-all transition"
                                    >
                                        asabri@asabri.co.id
                                    </a>
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="flex items-start gap-3">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
                                    <svg
                                        className="w-5 h-5 text-white/70"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        {t('footer.address')}
                                    </p>
                                    <p className="text-sm text-white/90 leading-relaxed">
                                        {t('footer.addressLine1')}
                                        <br />
                                        {t('footer.addressLine2')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blok 3: Links Navigation */}
                    <div className="md:pl-8">
                        <h3 className="text-lg font-semibold tracking-wide mb-5">
                            {t('footer.linksTitle')}
                        </h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-white hover:underline transition"
                                >
                                    {t('nav.home')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white hover:underline transition"
                                >
                                    {t('nav.about')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/berita.html"
                                    className="hover:text-white hover:underline transition"
                                >
                                    {t('nav.news')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Faq.html"
                                    className="hover:text-white hover:underline transition"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://rekrutmen.asabri.co.id"
                                    className="hover:text-white hover:underline transition"
                                >
                                    {t('nav.career')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Blok 4: Media Sosial */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-5">
                            {t('footer.socialTitle')}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <a
                                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-110 transition"
                                target="_blank"
                                rel="noreferrer"
                                href="#"
                            >
                                <img
                                    alt="facebook"
                                    className="w-5 h-5 invert"
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg"
                                />
                            </a>
                            <a
                                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-110 transition"
                                target="_blank"
                                rel="noreferrer"
                                href="#"
                            >
                                <img
                                    alt="linkedin"
                                    className="w-5 h-5 invert"
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
                                />
                            </a>
                            <a
                                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-110 transition"
                                target="_blank"
                                rel="noreferrer"
                                href="#"
                            >
                                <img
                                    alt="instagram"
                                    className="w-5 h-5 invert"
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg"
                                />
                            </a>
                            <a
                                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-110 transition"
                                target="_blank"
                                rel="noreferrer"
                                href="#"
                            >
                                <img
                                    alt="x"
                                    className="w-5 h-5 invert"
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg"
                                />
                            </a>
                            <a
                                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-110 transition"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.youtube.com/"
                            >
                                <img
                                    alt="youtube"
                                    className="w-5 h-5 invert"
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg"
                                />
                            </a>
                        </div>
                        <div className="mt-6 space-y-2">
                            <a
                                href="#"
                                className="text-white/80 text-sm hover:text-white transition"
                            >
                                @asabri_official
                            </a>{" "}
                            <br />
                            <a
                                href="#"
                                className="text-white/80 text-sm hover:text-white transition"
                            >
                                @asabri.co.id
                            </a>
                        </div>
                    </div>
                </div>

                {/* Garis Pembatas */}
                <hr className="mt-12 border-white/10" />

                {/* Hak Cipta */}
                <div className="mt-6 text-center text-xs text-white/60 tracking-wide">
                    © {new Date().getFullYear()}, {t('footer.copyright')} <a href=""> / <u>{t('footer.privacy')}</u>  </a> <a href="" > / <u>{t('footer.fraudAlert')}</u> </a>
                </div>
            </div>
        </footer>
    );
}
