import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Sun, Star, MapPin } from 'lucide-react';
import { StoryMilestone } from '../types';
import { TypewriterText } from './TypewriterText';

interface OurStoryTimelineProps {
  milestones: StoryMilestone[];
}

export const OurStoryTimeline: React.FC<OurStoryTimelineProps> = ({ milestones }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const getIcon = (type: StoryMilestone['iconType']) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-rose-300" />;
      case 'sunset':
        return <Sun className="w-4 h-4 text-orange-400" />;
      case 'star':
        return <Star className="w-4 h-4 text-yellow-300" />;
      case 'ring':
      case 'heart':
      default:
        return <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />;
    }
  };

  return (
    <section id="story" className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-400/80 text-xs tracking-widest uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Timeline Tình Yêu</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif-romantic font-bold text-rose-100 tracking-tight">
          Chuyện Của Chúng Ta
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed font-serif italic">
          "Có những cuộc gặp gỡ chỉ là tình cờ, nhưng có những người sinh ra là để dành cho nhau."
        </p>
      </div>

      {/* Central Timeline Spine */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-rose-500/40 via-rose-500/20 to-transparent -translate-x-1/2 hidden sm:block" />

        <div className="space-y-12 md:space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = activeStoryIndex === index;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node on Timeline */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e1322] border-2 border-rose-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(244,63,94,0.4)] hidden sm:flex">
                  {getIcon(item.iconType)}
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-0 sm:pl-12 md:pl-0">
                  <div
                    className={`bg-slate-900/50 backdrop-blur-md border border-rose-500/20 hover:border-rose-400/40 rounded-2xl p-6 transition-all duration-300 shadow-lg ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}
                  >
                    {/* Unboxed Metadata Header (frontend-design zero-pill compliant) */}
                    <div className="flex items-center gap-2 text-xs text-rose-300/80 mb-2">
                      <span className="font-semibold">{item.displayDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{item.tag}</span>
                      {item.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400/70" />
                            {item.location}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-xl md:text-2xl font-serif-romantic font-semibold text-rose-100 mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Image Thumbnail if available */}
                    {item.image && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-rose-500/15 group relative aspect-video">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Content Lines (Typewriter / Ink reveal effect) */}
                    <div className="min-h-[80px]">
                      {isExpanded ? (
                        <TypewriterText
                          lines={item.content}
                          typingSpeed={25}
                          lineDelay={300}
                          lineClassName="text-slate-200 text-sm md:text-base font-serif italic"
                        />
                      ) : (
                        <div className="space-y-2">
                          {item.content.map((line, lIdx) => (
                            <p key={lIdx} className="text-slate-300 text-sm md:text-base font-serif italic leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Re-read with typewriter effect button */}
                    <div className="mt-4 pt-3 border-t border-rose-500/15 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Kỷ niệm #{index + 1}</span>
                      <button
                        onClick={() => setActiveStoryIndex(isExpanded ? null : index)}
                        className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{isExpanded ? 'Xem chữ tĩnh' : 'Viết lại bằng mực ✨'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for the other side on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
