import React, { useState, useRef, useEffect } from 'react';
import { BackgroundStarsAndHearts } from './components/BackgroundStarsAndHearts';
import { HeartFireworksCanvas, HeartFireworksHandle } from './components/HeartFireworksCanvas';
import { OpeningLetterModal } from './components/OpeningLetterModal';
import { Navbar } from './components/Navbar';
import { StoryHero } from './components/StoryHero';
import { LoveCounter } from './components/LoveCounter';
import { OurStoryTimeline } from './components/OurStoryTimeline';
import { PolaroidGallery } from './components/PolaroidGallery';
import { FinalLoveLetter } from './components/FinalLoveLetter';
import { Footer } from './components/Footer';
import { DEFAULT_COUPLE, STORY_MILESTONES, POLAROID_PHOTOS } from './data/storyData';
import { CoupleInfo } from './types';

export default function App() {
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>(() => {
    try {
      const saved = localStorage.getItem('love_story_couple');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_COUPLE;
  });

  const [isOpeningLetterOpen, setIsOpeningLetterOpen] = useState(true);
  const fireworksRef = useRef<HeartFireworksHandle | null>(null);

  const handleUpdateCoupleInfo = (newInfo: CoupleInfo) => {
    setCoupleInfo(newInfo);
    try {
      localStorage.setItem('love_story_couple', JSON.stringify(newInfo));
    } catch {
      // ignore
    }
  };

  const handleTriggerFireworks = (numBursts = 6) => {
    fireworksRef.current?.launch(numBursts);
  };

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* 1. Dynamic Background with Twinkling Stars & Floating Gentle Hearts */}
      <BackgroundStarsAndHearts />

      {/* 2. Heart Fireworks Engine Canvas */}
      <HeartFireworksCanvas ref={fireworksRef} />

      {/* 3. Opening Letter Experience ("Mở website giống như mở một bức thư tình") */}
      <OpeningLetterModal
        isOpen={isOpeningLetterOpen}
        onEnterStory={() => setIsOpeningLetterOpen(false)}
        partner1={coupleInfo.partner1}
        partner2={coupleInfo.partner2}
      />

      {/* 4. Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        brandName="Chuyện Tình Chúng Mình"
        onReopenLetter={() => setIsOpeningLetterOpen(true)}
      />

      {/* 5. Main Story Content */}
      <main className="relative z-10 flex-1 space-y-12">
        <StoryHero coupleInfo={coupleInfo} />

        {/* Section 1: Live Love Counter */}
        <LoveCounter
          coupleInfo={coupleInfo}
          onUpdateCoupleInfo={handleUpdateCoupleInfo}
        />

        {/* Section 2: "Chuyện của chúng ta" Timeline */}
        <OurStoryTimeline milestones={STORY_MILESTONES} />

        {/* Section 3: Polaroid Gallery with Zoom */}
        <PolaroidGallery photos={POLAROID_PHOTOS} />

        {/* Section 4: Final Envelope & Love Letter with Heart Fireworks */}
        <FinalLoveLetter
          onTriggerFireworks={handleTriggerFireworks}
          partner1={coupleInfo.partner1}
          partner2={coupleInfo.partner2}
        />
      </main>

      {/* 6. Footer */}
      <Footer coupleInfo={coupleInfo} />
    </div>
  );
}
