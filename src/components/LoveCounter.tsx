import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, Edit3, Clock, CheckCircle, Flame } from 'lucide-react';
import { CoupleInfo } from '../types';

interface LoveCounterProps {
  coupleInfo: CoupleInfo;
  onUpdateCoupleInfo: (info: CoupleInfo) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LoveCounter: React.FC<LoveCounterProps> = ({
  coupleInfo,
  onUpdateCoupleInfo,
}) => {
  const [timeTogether, setTimeTogether] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editP1, setEditP1] = useState(coupleInfo.partner1);
  const [editP2, setEditP2] = useState(coupleInfo.partner2);
  const [editDate, setEditDate] = useState(coupleInfo.startDate);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(coupleInfo.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [coupleInfo.startDate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCoupleInfo({
      ...coupleInfo,
      partner1: editP1.trim() || 'Anh',
      partner2: editP2.trim() || 'Em',
      startDate: editDate,
    });
    setIsEditing(false);
  };

  const totalHeartbeats = Math.floor(timeTogether.days * 24 * 60 * 75).toLocaleString('vi-VN');
  const totalHours = (timeTogether.days * 24 + timeTogether.hours).toLocaleString('vi-VN');

  // Milestone targets
  const milestones = [
    { target: 100, label: '100 Ngày Yêu Thương' },
    { target: 365, label: '1 Năm Gắn Bó (365 Ngày)' },
    { target: 500, label: '500 Ngày Ngọt Ngào' },
    { target: 1000, label: '1000 Ngày Hạnh Phúc' },
  ];

  return (
    <section id="counter" className="relative py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Decorative subtle border & glow */}
      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        {/* Header with names & edit button */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-rose-500/15 gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="font-handwriting text-3xl md:text-4xl text-rose-300 font-bold tracking-wide">
                {coupleInfo.partner1}
              </span>
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-400 animate-pulse" />
              </div>
              <span className="font-handwriting text-3xl md:text-4xl text-rose-300 font-bold tracking-wide">
                {coupleInfo.partner2}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-rose-400/80" />
              <span>Bên nhau từ ngày {new Date(coupleInfo.startDate).toLocaleDateString('vi-VN')}</span>
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-500/20 text-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh sửa ngày kỷ niệm</span>
          </button>
        </div>

        {/* Counter Units Display */}
        <div className="py-10 text-center">
          <span className="text-xs uppercase tracking-widest text-rose-300/70 font-medium">
            Thời Gian Chúng Ta Đã Đi Cùng Nhau
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 max-w-3xl mx-auto">
            {/* Days */}
            <div className="p-4 md:p-6 rounded-2xl bg-[#161220]/80 border border-rose-500/20 flex flex-col items-center justify-center shadow-inner group hover:border-rose-400/50 transition-colors">
              <span className="font-serif-romantic text-4xl md:text-6xl font-bold text-rose-100 tabular-nums tracking-tight">
                {timeTogether.days}
              </span>
              <span className="text-xs md:text-sm text-rose-300/80 font-medium mt-1">Ngày</span>
            </div>

            {/* Hours */}
            <div className="p-4 md:p-6 rounded-2xl bg-[#161220]/80 border border-rose-500/20 flex flex-col items-center justify-center shadow-inner group hover:border-rose-400/50 transition-colors">
              <span className="font-serif-romantic text-4xl md:text-6xl font-bold text-rose-100 tabular-nums tracking-tight">
                {String(timeTogether.hours).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm text-rose-300/80 font-medium mt-1">Giờ</span>
            </div>

            {/* Minutes */}
            <div className="p-4 md:p-6 rounded-2xl bg-[#161220]/80 border border-rose-500/20 flex flex-col items-center justify-center shadow-inner group hover:border-rose-400/50 transition-colors">
              <span className="font-serif-romantic text-4xl md:text-6xl font-bold text-rose-100 tabular-nums tracking-tight">
                {String(timeTogether.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm text-rose-300/80 font-medium mt-1">Phút</span>
            </div>

            {/* Seconds */}
            <div className="p-4 md:p-6 rounded-2xl bg-[#161220]/80 border border-rose-500/20 flex flex-col items-center justify-center shadow-inner group hover:border-rose-400/50 transition-colors">
              <span className="font-serif-romantic text-4xl md:text-6xl font-bold text-rose-400 tabular-nums tracking-tight animate-pulse">
                {String(timeTogether.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm text-rose-300/80 font-medium mt-1">Giây</span>
            </div>
          </div>

          {/* Sweet Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Ước tính <strong className="text-rose-200 font-mono">{totalHeartbeats}</strong> nhịp đập yêu thương</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Hơn <strong className="text-amber-200 font-mono">{totalHours}</strong> giờ bình yên khi có nhau</span>
            </div>
          </div>
        </div>

        {/* Milestones Progress Track */}
        <div className="pt-6 border-t border-rose-500/15">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Các Cột Mốc Tình Yêu
            </span>
            <span className="text-xs text-slate-400">
              Hiện tại: {timeTogether.days} ngày
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {milestones.map((m) => {
              const reached = timeTogether.days >= m.target;
              const progress = Math.min(100, Math.round((timeTogether.days / m.target) * 100));

              return (
                <div
                  key={m.target}
                  className={`p-3.5 rounded-xl border transition-all ${
                    reached
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{m.label}</span>
                    {reached ? (
                      <CheckCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">{progress}%</span>
                    )}
                  </div>
                  {/* Micro Progress Bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        reached ? 'bg-rose-500' : 'bg-rose-500/40'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Date Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md bg-[#161220] border border-rose-500/30 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-lg font-serif-romantic font-semibold text-rose-100 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-400" />
              Chỉnh Sửa Thông Tin Tình Yêu
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tên bạn (hoặc "Anh")
              </label>
              <input
                type="text"
                value={editP1}
                onChange={(e) => setEditP1(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-rose-400"
                placeholder="Ví dụ: Hoàng"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tên người thương (hoặc "Em")
              </label>
              <input
                type="text"
                value={editP2}
                onChange={(e) => setEditP2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-rose-400"
                placeholder="Ví dụ: Mai"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Ngày bắt đầu yêu / Ngày gặp nhau
              </label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer shadow-md shadow-rose-900/40"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
