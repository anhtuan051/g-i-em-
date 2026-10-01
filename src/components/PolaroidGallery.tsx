import React, { useState } from 'react';
import { Sparkles, X, Heart, MapPin, Calendar, ZoomIn } from 'lucide-react';
import { PolaroidPhoto } from '../types';

interface PolaroidGalleryProps {
  photos: PolaroidPhoto[];
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);
  const [lovedIds, setLovedIds] = useState<Record<string, number>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLovedIds(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="gallery" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-400/80 text-xs tracking-widest uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Góc Kỷ Niệm Tình Yêu</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif-romantic font-bold text-rose-100 tracking-tight">
          Khoảnh Khắc Polaroid
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed font-serif italic">
          "Một bức ảnh lưu giữ một khoảnh khắc, nhưng tình yêu lưu giữ cả cuộc đời."
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-4">
        {photos.map((photo) => {
          const likes = lovedIds[photo.id] || 0;

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative cursor-pointer transform ${photo.rotation} hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 ease-out`}
            >
              {/* Polaroid Frame */}
              <div className="bg-[#fcfbf9] text-slate-800 p-3 pb-6 rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.2)] border border-neutral-300/40 relative">
                {/* Washi Tape Strip at top */}
                <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rotate-1 z-10" />

                {/* Photo Container */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden rounded-[2px] mb-3">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                  />

                  {/* Zoom hint badge on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium">
                      <ZoomIn className="w-3.5 h-3.5 text-rose-300" />
                      <span>Xem cận cảnh</span>
                    </span>
                  </div>
                </div>

                {/* Handwritten Caption Chin */}
                <div className="px-1 text-center space-y-1">
                  <p className="font-handwriting text-xl md:text-2xl text-slate-800 leading-tight">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{photo.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{photo.location}</span>
                  </div>
                </div>

                {/* Heart Button */}
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  title="Thả tim kỷ niệm này"
                  className="absolute bottom-2 right-2 text-rose-500 hover:text-rose-600 transition-transform active:scale-125 flex items-center gap-1 text-[11px] p-1 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${likes > 0 ? 'fill-rose-500' : ''}`} />
                  {likes > 0 && <span className="font-bold text-rose-600">{likes}</span>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zoom / Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#fffdfa] text-slate-800 rounded-2xl p-5 md:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-neutral-300 transform transition-all duration-300 scale-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-rose-600 hover:bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image Zoom Frame */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-inner bg-neutral-950 mb-5">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Note & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                <h3 className="font-handwriting text-3xl text-rose-700 font-bold">
                  {selectedPhoto.caption}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-serif">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    {selectedPhoto.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {selectedPhoto.location}
                  </span>
                </div>
              </div>

              <p className="font-serif-romantic text-base md:text-lg text-slate-700 italic leading-relaxed pt-1">
                "{selectedPhoto.note}"
              </p>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-600 animate-pulse" />
                  <span>Gửi thêm yêu thương ({lovedIds[selectedPhoto.id] || 0})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
