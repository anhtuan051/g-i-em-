import React, { useState } from 'react';
import { Heart, Sparkles, Flame, RotateCcw } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { soundEngine } from './AudioPlayer';

interface FinalLoveLetterProps {
  onTriggerFireworks: (numBursts?: number) => void;
  partner1: string;
  partner2: string;
}

export const FinalLoveLetter: React.FC<FinalLoveLetterProps> = ({
  onTriggerFireworks,
  partner1,
  partner2,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundEngine.playSealBreakSound();
    soundEngine.playPaperSound();
    setIsOpen(true);

    // Launch spectacular heart fireworks right as the letter opens!
    onTriggerFireworks(7);

    // Follow up wave
    setTimeout(() => {
      onTriggerFireworks(4);
    }, 1800);
  };

  const handleReplayFireworks = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTriggerFireworks(6);
  };

  const handleClose = () => {
    soundEngine.playPaperSound();
    setIsOpen(false);
    setIsTypingDone(false);
  };

  const letterLines = [
    '❤️ Cảm ơn em vì đã xuất hiện trong cuộc đời anh.',
    'Anh không cần một câu chuyện hoàn hảo.',
    'Anh chỉ cần câu chuyện đó có em.',
  ];

  return (
    <section id="letter" className="relative py-28 px-4 md:px-8 max-w-4xl mx-auto text-center">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="mb-12 space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-400 text-xs tracking-widest uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lời Nhắn Cuối Cùng</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif-romantic font-bold text-rose-100">
          Phong Bì Gửi Riêng Em
        </h2>
        <p className="text-sm md:text-base text-slate-400 font-serif italic max-w-lg mx-auto">
          Mỗi hành trình đều có một cái kết đẹp, nhưng câu chuyện của chúng mình sẽ luôn tiếp diễn...
        </p>
      </div>

      {/* The Envelope Area */}
      <div className="relative mx-auto max-w-lg">
        {!isOpen ? (
          /* Closed Vintage Envelope */
          <div
            onClick={handleOpenEnvelope}
            className="group cursor-pointer bg-gradient-to-b from-[#2a1c29] to-[#1c121e] border-2 border-rose-500/30 hover:border-rose-400/70 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(244,63,94,0.2)] hover:shadow-[0_20px_60px_rgba(244,63,94,0.35)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
          >
            {/* Top postal ribbon */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-500 via-amber-300 to-rose-500" />

            <div className="flex items-center justify-between text-xs text-rose-300/80 mb-6">
              <span className="font-mono">BỨC THƯ TÌNH YÊU</span>
              <span className="font-handwriting text-xl text-rose-200">Gửi: {partner2}</span>
            </div>

            {/* Envelope flap visual */}
            <div className="relative my-8 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-rose-500/25" viewBox="0 0 320 130" preserveAspectRatio="none">
                <polygon points="0,0 160,85 320,0" fill="rgba(244, 63, 94, 0.08)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="130" y2="60" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                <line x1="320" y1="130" x2="190" y2="60" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
              </svg>

              {/* Pulsing Heart Wax Seal */}
              <div className="relative z-10 w-22 h-22 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-950 shadow-[0_6px_30px_rgba(225,29,72,0.8),inset_0_2px_5px_rgba(255,255,255,0.4)] border-2 border-rose-300/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-seal-beat">
                <Heart className="w-10 h-10 fill-rose-100 text-rose-200 drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-1.5 mt-4">
              <p className="text-base font-semibold text-rose-100 group-hover:text-rose-200 transition-colors">
                Chạm vào phong bì để mở thư
              </p>
              <p className="text-xs text-rose-300/60">
                Pháo hoa trái tim sẽ nở rộ khi em mở món quà này ✨
              </p>
            </div>
          </div>
        ) : (
          /* Opened Final Letter Screen */
          <div className="bg-[#fffdf8] text-slate-800 rounded-3xl p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(244,63,94,0.4)] border-2 border-amber-300/80 transition-all duration-700 relative text-left">
            {/* Subtle vintage border */}
            <div className="border border-amber-200/90 rounded-2xl p-6 md:p-8 bg-[#fffcf5]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-200/80 mb-6">
                <div className="flex items-center gap-2 text-rose-600 font-script-romantic text-2xl md:text-3xl">
                  <Heart className="w-6 h-6 fill-rose-600" />
                  <span>Lời Nhắn Trọn Đời</span>
                </div>
                <span className="text-xs text-amber-800 font-serif italic">Mãi mãi là em</span>
              </div>

              {/* Exact user requested text appearing line-by-line as if written */}
              <div className="py-4 space-y-6">
                <TypewriterText
                  lines={letterLines}
                  typingSpeed={40}
                  lineDelay={500}
                  onComplete={() => setIsTypingDone(true)}
                  className="space-y-5"
                  lineClassName="font-serif-romantic text-lg sm:text-2xl md:text-3xl font-bold text-rose-900 leading-snug tracking-tight"
                />
              </div>

              {/* Signature */}
              <div className="mt-10 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Người viết</p>
                  <p className="font-handwriting text-2xl md:text-3xl text-rose-800 font-bold">
                    {partner1} thương yêu
                  </p>
                </div>

                {/* Interactive Firework Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleReplayFireworks}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-900/40 hover:shadow-rose-600/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
                    <span>Bắn Thêm Pháo Hoa Trái Tim</span>
                  </button>

                  <button
                    onClick={handleClose}
                    title="Gấp lại thư"
                    className="p-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-600 text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
