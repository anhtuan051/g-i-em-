import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { CoupleInfo } from '../types';

interface StoryHeroProps {
  coupleInfo: CoupleInfo;
}

export const StoryHero: React.FC<StoryHeroProps> = ({ coupleInfo }) => {
  return (
    <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-5xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
      {/* Delicate floating badge */}
      <div className="flex items-center gap-2 text-rose-300/80 text-xs md:text-sm font-medium tracking-wide mb-6">
        <Sparkles className="w-4 h-4 text-rose-400" />
        <span>Hành trình tình yêu của {coupleInfo.partner1} &amp; {coupleInfo.partner2}</span>
        <Sparkles className="w-4 h-4 text-rose-400" />
      </div>

      {/* Main headline with romantic font */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold text-rose-50 leading-[1.15] tracking-tight max-w-3xl mb-6">
        Chuyện Tình Của Chúng Mình
      </h1>

      <p className="text-lg md:text-2xl text-rose-200/85 font-handwriting max-w-2xl leading-relaxed mb-10">
        "Có một người để nhớ, để thương và để cùng đi qua những năm tháng thanh xuân là điều tuyệt vời nhất trần đời."
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#counter"
          className="px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-full text-sm font-medium shadow-lg shadow-rose-950/60 hover:shadow-rose-700/50 transition-all flex items-center gap-2 group cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
          <span>Đếm Ngày Bên Nhau</span>
        </a>

        <a
          href="#letter"
          className="px-6 py-3 bg-slate-900/60 hover:bg-slate-800/80 text-rose-200 border border-rose-500/20 hover:border-rose-400/50 rounded-full text-sm font-medium backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Xem Thư Tình Cuối Cùng</span>
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#counter"
        aria-label="Scroll down to counter"
        className="mt-16 text-rose-400/60 hover:text-rose-300 transition-colors animate-bounce flex flex-col items-center gap-1 cursor-pointer"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Cuộn xuống</span>
        <ChevronDown className="w-4 h-4" />
      </a>
    </section>
  );
};
