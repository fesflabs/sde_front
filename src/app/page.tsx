import { LinkAggregator } from '@/features/components/link-aggregator';
import { FooterVisual } from '@/features/components/footer-visual';
import Image from 'next/image';
import React from 'react';
import { Globe, Instagram, Youtube } from 'lucide-react';

import logo_fesfsus from '../../public/assets/images/logo_fesf.png';

export default function InitialPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-[#F8FAFC] font-sans">
      <main className="z-10 flex h-full w-full max-w-[440px] flex-col items-center justify-center px-6 pb-8">
        <div className="max-h-min md:w-full">
          <header className="mt-9 mb-8 flex w-full flex-col items-center space-y-4 text-center">
            <div className="relative h-20 w-70 md:h-20 md:w-48 md:w-64">
              <Image
                src={logo_fesfsus}
                alt="Logo FESF-SUS"
                fill
                priority
                className="object-contain"
              />
            </div>
            <hr className="border-border w-full border-1" />
            <h1 className="text-muted-foreground text-2xl font-normal text-gray-500">
              Projeto Diálogos Essenciais
            </h1>
          </header>

          <LinkAggregator />

          <footer className="mt-4 flex w-full flex-col items-center space-y-6">
            <div className="flex items-center justify-center gap-6">
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="grad-insta" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#97D3B9" />
                    <stop offset="100%" stopColor="#8A91BF" />
                  </linearGradient>

                  <linearGradient id="grad-site" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#97D3B9" />
                    <stop offset="100%" stopColor="#8A91BF" />
                  </linearGradient>

                  {/* Gradiente YouTube (Red to Dark Red) */}
                  <linearGradient id="grad-yt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#97D3B9" />
                    <stop offset="100%" stopColor="#8A91BF" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110">
                <a
                  href="https://www.instagram.com/susfesf/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={28} strokeWidth={2} style={{ stroke: 'url(#grad-insta)' }} />
                </a>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110">
                <a href="https://fesfsus.ba.gov.br/" target="_blank" rel="noopener noreferrer">
                  <Globe size={28} strokeWidth={2} style={{ stroke: 'url(#grad-site)' }} />
                </a>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110">
                <a
                  href="https://www.youtube.com/@TVFESFSUS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube size={28} strokeWidth={2} style={{ stroke: 'url(#grad-yt)' }} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
      <FooterVisual />
    </div>
  );
}
