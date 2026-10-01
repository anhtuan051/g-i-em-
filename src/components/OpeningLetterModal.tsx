import React, { useState } from 'react';
import { Heart, Sparkles, Send } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { soundEngine } from './AudioPlayer';

interface OpeningLetterModalProps {
  isOpen: boolean;
  onEnterStory: () => void;
  partner1: string;
  partner2: string;
}

export const OpeningLetterModal: React.FC<OpeningLetterModalProps> = ({
  isOpen,
  onEnterStory,
  partner1,
  partner2,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetterContent, setShowLetterContent] = useState(false);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    soundEngine.playSealBreakSound();
    soundEngine.playPaperSound();
    setIsOpened(true);

    setTimeout(() => {
      setShowLetterContent(true);
      // Also gentle suggestion for audio if user clicked
      soundEngine.startRomanticMelody();
    }, 800);
  };

  const handleFinish = () => {
    soundEngine.playPaperSound();
    onEnterStory();
  };

  const introLines = [
    `Gửi ${partner2} - người dịu dàng nhất thế giới của ${partner1},`,
    'Có những yêu thương không thể gói ghém hết chỉ bằng vài câu nói.',
    'Từng ngày trôi qua bên em, anh đều muốn lưu giữ lại như một món quà vô giá.',
    'Đây là cuốn nhật ký tình yêu mà anh viết riêng cho chúng mình...',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070810]/95 backdrop-blur-xl transition-all duration-700">
      {/* Background ambient starlight glow */}
      <div className="absolute inset-0 bg-radial from-rose-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Floating sparkles */}
      <div className="absolute top-12 left-1/4 text-rose-300/40 animate-pulse pointer-events-none">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-16 right-1/4 text-rose-300/40 animate-pulse delay-500 pointer-events-none">
        <Heart className="w-5 h-5 fill-rose-500/20" />
      </div>

      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Envelope Container */}
        {!isOpened ? (
          <div
            onClick={handleOpenEnvelope}
            className="group cursor-pointer w-full max-w-md bg-[#241a22] border border-rose-500/30 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(244,63,94,0.15)] hover:border-rose-400/60 transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center relative overflow-hidden"
          >
            {/* Vintage Postal Border Pattern */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600 opacity-70" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all" />

            {/* Stamp Detail */}
            <div className="w-full flex justify-between items-start mb-6">
              <div className="text-left space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-rose-300/60 font-medium">Thư Tình Đặc Biệt</span>
                <p className="font-handwriting text-2xl text-rose-200">Gửi: {partner2} của anh ❤️</p>
                <p className="text-xs text-slate-400">Từ: {partner1} với trọn vẹn yêu thương</p>
              </div>
              <div className="w-14 h-16 border-2 border-dashed border-rose-400/40 rounded flex flex-col items-center justify-center bg-rose-950/40 text-rose-300 p-1">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-400 animate-pulse" />
                <span className="text-[9px] font-mono mt-1 text-rose-300/80">LOVE·2026</span>
              </div>
            </div>

            {/* Simulated Envelope Flap Lines */}
            <div className="w-full h-32 my-4 relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-rose-500/20" viewBox="0 0 300 120" preserveAspectRatio="none">
                <path d="M 0 0 L 150 75 L 300 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 0 120 L 120 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M 300 120 L 180 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              </svg>

              {/* Wax Seal Button */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-950 shadow-[0_4px_25px_rgba(225,29,72,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center border-2 border-rose-400/40 group-hover:scale-110 transition-transform duration-300 animate-seal-beat cursor-pointer">
                  <Heart className="w-9 h-9 fill-rose-100 text-rose-200 drop-shadow-md" />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center space-y-1.5">
              <p className="text-sm font-medium text-rose-200 group-hover:text-rose-100 transition-colors">
                Chạm vào con dấu trái tim để mở thư
              </p>
              <p className="text-xs text-rose-300/60">
                Hãy mở rộng trái tim để đón nhận câu chuyện của chúng mình ✨
              </p>
            </div>
          </div>
        ) : (
          /* Opened Letter View */
          <div
            className={`w-full max-w-lg bg-[#fffdfa] text-slate-800 rounded-2xl p-7 md:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(244,63,94,0.3)] border-2 border-amber-200/80 transition-all duration-700 transform ${
              showLetterContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Decorative Letter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-200/70 mb-5">
              <div className="flex items-center gap-2 text-rose-600 font-script-romantic text-2xl">
                <Heart className="w-5 h-5 fill-rose-500" />
                <span>Our Love Story</span>
              </div>
              <span className="text-xs text-amber-800/70 font-serif italic">Bức thư mở đầu</span>
            </div>

            {/* Letter Content with Typewriter Text */}
            <div className="min-h-[190px] text-slate-800 font-serif-romantic text-base md:text-lg leading-relaxed">
              <TypewriterText
                lines={introLines}
                typingSpeed={30}
                lineDelay={350}
                lineClassName="text-slate-800 font-medium"
              />
            </div>

            {/* Action to enter the full site */}
            <div className="mt-8 pt-5 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-handwriting text-xl text-rose-700">
                Mãi yêu em · {partner1}
              </div>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-900/40 hover:shadow-rose-700/60 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Bắt đầu câu chuyện</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
