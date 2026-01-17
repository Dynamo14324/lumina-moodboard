"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioAmbienceProps {
  mood: string | null;
  shouldDuck?: boolean; // Duck volume (e.g. for trailer)
}

export function AudioAmbience({ mood, shouldDuck = false }: AudioAmbienceProps) {
  const [muted, setMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Audio Context on user interaction (handled by standard browser policies, usually requires a click first)
    // We'll init it lazily or try to resume.
    if (!audioContextRef.current && typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const gain = audioContextRef.current.createGain();
      gain.connect(audioContextRef.current.destination);
      gainNodeRef.current = gain;
      gain.gain.value = 0.1; // Low volume default
    }
  }, []);

  const stopOscillators = () => {
     oscillatorsRef.current.forEach(o => {
         try { o.stop(); o.disconnect(); } catch {}
     });
     oscillatorsRef.current = [];
  };

  // Effect 1: Handle Sound Generation (Mood/Muted)
  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (muted || !mood) {
      stopOscillators();
      return;
    }

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // Only restart oscillators if the mood has actually changed or we just unmuted
    stopOscillators();
    
    // Create new soundscape based on mood
    const oscs: OscillatorNode[] = [];

    if (mood === "adrenaline") {
        const osc1 = ctx.createOscillator();
        osc1.type = "sawtooth";
        osc1.frequency.value = 50; 
        
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 400;

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 4;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 200;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        osc1.connect(filter);
        filter.connect(gainNodeRef.current);
        osc1.start();
        oscs.push(osc1, lfo);
    } else if (mood === "ethereal") {
        [220, 330, 440, 554].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = freq;
            const panner = ctx.createStereoPanner();
            panner.pan.value = (i % 2 === 0 ? -1 : 1) * 0.5;
            const oscGain = ctx.createGain();
            oscGain.gain.value = 0.05;
            osc.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(gainNodeRef.current!);
            osc.start();
            oscs.push(osc);
        });
    } else if (mood === "melancholy") {
        [110, 130, 164].forEach((freq) => {
             const osc = ctx.createOscillator();
             osc.type = "triangle";
             osc.frequency.value = freq;
             osc.connect(gainNodeRef.current!);
             osc.start();
             oscs.push(osc);
        });
    } else if (mood === "wholesome") {
        [261.63, 329.63, 392.00].forEach((freq) => {
             const osc = ctx.createOscillator();
             osc.type = "sine";
             osc.frequency.value = freq;
             osc.connect(gainNodeRef.current!);
             osc.start();
             oscs.push(osc);
        });
    } else if (mood === "cerebral") {
        const osc = ctx.createOscillator();
        osc.frequency.value = 60;
        const fm = ctx.createOscillator();
        fm.frequency.value = 110;
        const fmGain = ctx.createGain();
        fmGain.gain.value = 30;
        fm.connect(fmGain);
        fmGain.connect(osc.frequency);
        osc.connect(gainNodeRef.current!);
        osc.start();
        fm.start();
        oscs.push(osc, fm);
    }

    oscillatorsRef.current = oscs;

    return () => stopOscillators();
  }, [mood, muted]);

  // Effect 2: Handle Volume (Ducking/Muting)
  useEffect(() => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    
    const now = audioContextRef.current.currentTime;
    const targetVolume = (muted || !mood) ? 0 : (shouldDuck ? 0.02 : 0.1);
    
    gainNodeRef.current.gain.cancelScheduledValues(now);
    gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);
    gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, now + 1.5); // Smooth 1.5s transition
  }, [shouldDuck, muted, mood]);



  return (
    shouldDuck ? null : (
      <button 
        onClick={() => setMuted(!muted)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-indigo-500/20"
        title="Toggle Audio Ambience"
        aria-label={muted ? "Unmute Ambience" : "Mute Ambience"}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      </button>
    )
  );
}
