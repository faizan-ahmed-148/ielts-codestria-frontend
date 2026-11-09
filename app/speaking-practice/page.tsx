"use client";

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Mic,
  MicOff,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CueCardData {
  id: string;
  topic: string;
  title: string;
  prompt: string;
  bullets: string[];
  followUp: string;
  vocabTips: { phrase: string; meaning: string }[];
  modelTranscript: string;
}

const SAMPLE_CUE_CARDS: CueCardData[] = [
  {
    id: "card-journey",
    topic: "Travel & Experience",
    title: "A Memorable Journey You Took",
    prompt: "Describe a memorable journey or trip you took that made a lasting impression on you.",
    bullets: [
      "Where you went and who accompanied you",
      "What mode of transport you used",
      "What you did and experienced during this trip",
      "And explain why this particular journey was so memorable to you",
    ],
    followUp: "Do you think people nowadays travel more frequently than generations in the past?",
    vocabTips: [
      { phrase: "off the beaten track", meaning: "away from populated tourist hotspots" },
      { phrase: "breathtaking panoramas", meaning: "astonishing scenic landscapes" },
      { phrase: "broaden one's horizons", meaning: "expand cultural perspectives and mindset" },
      { phrase: "hospitable demeanor", meaning: "warm, welcoming local conduct" },
    ],
    modelTranscript:
      "I would like to talk about an indelible journey I undertook two summers ago across the rugged Highlands of Scotland. Accompanied by two close university colleagues, we opted for an adventurous road trip rather than conventional public transit, granting us unparalleled flexibility to detour into quaint hamlets and traverse winding coastal passes.\n\nWhat truly distinguished this expedition was the sheer tranquility of the topography. We navigated through dramatic glacial valleys like Glen Coe, where the mist clung to the granite peaks, creating an almost mythical ambiance. Whenever we stopped at local inns, we were struck by the locals' hospitable demeanor, often exchanging stories by peat fires.\n\nThis journey remains indelibly etched in my memory because it offered a profound psychological respite from my demanding academic routine, fundamentally rekindling my reverence for untamed natural wonders.",
  },
  {
    id: "card-tech",
    topic: "Technology & Daily Life",
    title: "A Technological Device That Changed Your Routine",
    prompt: "Describe an electronic device or technology that substantially altered your daily routine.",
    bullets: [
      "What the device is and when you acquired it",
      "How frequently you make use of it",
      "What primary functions you utilize it for",
      "And explain how it has transformed your day-to-day productivity",
    ],
    followUp: "Will voice-activated smart assistants eventually make handheld screens obsolete?",
    vocabTips: [
      { phrase: "streamline workflows", meaning: "make operational tasks faster and smoother" },
      { phrase: "indispensable asset", meaning: "an essential, irreplaceable tool" },
      { phrase: "frictionless integration", meaning: "working seamlessly with other devices" },
      { phrase: "mitigate digital fatigue", meaning: "reduce strain from screen overuse" },
    ],
    modelTranscript:
      "A piece of technological hardware that has unequivocally transformed my daily operational routine is an e-ink digital notepad with stylus capabilities, which I invested in roughly eighteen months ago.\n\nPrior to acquiring this device, my desk was perpetually inundated with disorganized paper pads, annotated manuscripts, and scattered adhesive notes. This device serves as a centralized hub for all my literature reviews, manuscript annotations, and project scheduling. Because the display emits no harsh blue luminescence, I can review intricate documents for hours on end without experiencing optical fatigue.\n\nIt has fundamentally streamlined my intellectual workflow by enabling instantaneous text digitization and cloud synchronization. In essence, it has bridged the tactile satisfaction of handwritten ideation with the infallible organization of modern cloud storage.",
  },
  {
    id: "card-environment",
    topic: "Environment & Urban Space",
    title: "An Environmental Initiative in Your City",
    prompt: "Describe an environmental issue or sustainability project in your locality.",
    bullets: [
      "What the issue or project is",
      "Where it is situated and who initiated it",
      "What concrete actions have been taken",
      "And explain whether you believe it will deliver lasting ecological benefits",
    ],
    followUp: "Should environmental education be a mandatory examination subject in primary schools?",
    vocabTips: [
      { phrase: "urban heat island effect", meaning: "excess thermal buildup in dense metropolitan zones" },
      { phrase: "community stewardship", meaning: "active local civic responsibility" },
      { phrase: "mitigate municipal emissions", meaning: "curb local vehicular and factory fumes" },
      { phrase: "biodiverse flora and fauna", meaning: "rich variety of plant and animal species" },
    ],
    modelTranscript:
      "I would like to focus on a municipal urban rewilding initiative launched in my native city two years ago, known locally as the 'Green Corridor Project'. Driven by severe air pollution and the escalating urban heat island effect, municipal authorities converted disused industrial railway embankments into a seven-kilometer contiguous linear parkway.\n\nOver fifty-thousand indigenous shrubs and pollinator-friendly trees were planted. What I find remarkable is that civic associations actively participated in planting weekends, fostering genuine community stewardship. Dedicated pedestrian and cycling lanes now allow thousands of commuters to bypass arterial traffic.\n\nI am confident this endeavor will yield enduring environmental dividends. Not only has particulate matter dropped by an estimated 15% along the corridor, but it has re-introduced native avian species that hadn't been sighted in the city center for decades.",
  },
  {
    id: "card-mentor",
    topic: "People & Influence",
    title: "An Inspirational Teacher or Mentor",
    prompt: "Describe an educator or mentor who exerted a profound positive influence on your growth.",
    bullets: [
      "Who this person was and in what capacity you met them",
      "What their pedagogy or approach was like",
      "What particular lesson or guidance they imparted",
      "And explain why this person left such an indelible impression on your path",
    ],
    followUp: "Can online asynchronous courses ever reproduce the mentorship of a dedicated in-person teacher?",
    vocabTips: [
      { phrase: "pedagogical acumen", meaning: "exceptional skill and artistry in teaching" },
      { phrase: "instill intellectual curiosity", meaning: "foster a deep love for inquiry" },
      { phrase: "empathetic mentor", meaning: "compassionate, understanding guide" },
      { phrase: "catalyst for growth", meaning: "a person who sparks transformative change" },
    ],
    modelTranscript:
      "The individual who left an indelible imprint on my intellectual development was my high school literature instructor, Dr. Henderson. I encountered him during my penultimate year of secondary schooling, an era when I regarded analytical reading as an arduous academic chore.\n\nDr. Henderson possessed extraordinary pedagogical acumen. Rather than dictating dogmatic interpretations, he transformed our classroom into a vibrant philosophical forum, urging us to challenge core textual premises. When my first critical essay received a modest mark, instead of discouragement, he held a private tutorial dissecting my arguments sentence by sentence.\n\nHe instilled in me the conviction that intellectual rigor and empathetic perspective are intimately intertwined. His mentorship served as a true catalyst for my academic trajectory, inspiring me to pursue higher education with relentless curiosity.",
  },
];

export default function SpeakingPracticePage() {
  const [selectedCard, setSelectedCard] = useState<CueCardData>(SAMPLE_CUE_CARDS[0]);
  const [stage, setStage] = useState<"IDLE" | "PREP" | "SPEAK" | "REVIEW">("IDLE");
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(60);
  const [speakSecondsElapsed, setSpeakSecondsElapsed] = useState(0);
  const [notes, setNotes] = useState("");
  const [showModel, setShowModel] = useState(false);

  // Audio Recording
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Preparation Timer (60s countdown)
  useEffect(() => {
    let timer: any;
    if (stage === "PREP") {
      timer = setInterval(() => {
        setPrepSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            startSpeakingPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage]);

  // Speaking Timer (count up to 120s)
  useEffect(() => {
    let timer: any;
    if (stage === "SPEAK") {
      timer = setInterval(() => {
        setSpeakSecondsElapsed((prev) => {
          if (prev >= 120) {
            stopSpeakingPhase();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage]);

  async function startPreparation() {
    setPrepSecondsLeft(60);
    setSpeakSecondsElapsed(0);
    setNotes("");
    setAudioUrl(null);
    setShowModel(false);
    setStage("PREP");
  }

  async function startSpeakingPhase() {
    setStage("SPEAK");
    setSpeakSecondsElapsed(0);

    // Initialize media recording
    try {
      if (typeof window !== "undefined" && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setRecording(true);
      }
    } catch (err) {
      console.warn("Microphone access unavailable or denied:", err);
    }
  }

  function stopSpeakingPhase() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    setStage("REVIEW");
  }

  function resetSession() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setStage("IDLE");
    setPrepSecondsLeft(60);
    setSpeakSecondsElapsed(0);
    setRecording(false);
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <Mic className="h-3.5 w-3.5 text-amber-600" />
            <span>IELTS Speaking Examiner Simulator</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
            <Sparkles className="h-3 w-3 text-indigo-500" /> by Codestria AI
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Speaking Part 2 Cue Card &amp; Voice Studio
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-3xl">
          Master the crucial 1-minute candidate note-taking window and deliver continuous 2-minute speech with live audio recording, authentic Cambridge topics, and official 4-criterion calibration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Cue Card Selection & Candidate Task */}
        <div className="space-y-6 lg:col-span-7">
          {/* Cue Card Selection Pills */}
          <div className="card p-4">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Select Cambridge Topic
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SAMPLE_CUE_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setSelectedCard(card);
                    resetSession();
                  }}
                  className={`rounded-xl border p-2.5 text-left text-xs transition ${
                    selectedCard.id === card.id
                      ? "border-amber-500 bg-amber-50/70 text-amber-900 font-bold shadow-xs"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="truncate font-semibold">{card.topic}</div>
                  <div className="truncate text-[11px] text-slate-400 font-normal">{card.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Authentic Cambridge Candidate Task Card */}
          <div className="card overflow-hidden border-amber-200 bg-gradient-to-b from-amber-50/30 to-white shadow-sm">
            <div className="border-b border-amber-100 bg-amber-500/10 px-6 py-3.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Candidate Task Card · Part 2 Long Turn
              </span>
              <span className="rounded-full bg-amber-200/60 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
                1 min prep · 2 min speak
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">{selectedCard.prompt}</h2>
              <p className="mt-2 text-xs font-medium text-slate-500">You should say:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {selectedCard.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/40 p-3.5 text-xs text-amber-900">
                <span className="font-bold">Follow-up Discussion Probe:</span> {selectedCard.followUp}
              </div>
            </div>
          </div>

          {/* Interactive Scratchpad for 1-minute prep */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-amber-600" /> Candidate Pencil Scratchpad (1-Min Notes)
              </label>
              <span className="text-[11px] text-slate-400">Jot keywords & collocations, not full sentences</span>
            </div>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot key phrases here during preparation...&#10;e.g. - Glen Coe Highlands, 2 yrs ago, remote cabins&#10;- Hospitable demeanor, profound respite&#10;- Reconnect with nature"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column: Timers, Live Recording, & Band 9 Model Speech */}
        <div className="space-y-6 lg:col-span-5">
          {/* Exam Simulator Console Card */}
          <div className="card p-6 shadow-sm border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              Test Room Simulation Console
            </h3>

            {/* State: IDLE */}
            {stage === "IDLE" && (
              <div className="mt-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  <Mic className="h-8 w-8" />
                </div>
                <h4 className="mt-4 text-base font-bold text-slate-900">Ready to simulate?</h4>
                <p className="mt-1 text-xs text-slate-500">
                  You will have exactly 60 seconds to review the card and take notes, followed immediately by 2 minutes to speak.
                </p>
                <button
                  onClick={startPreparation}
                  className="mt-6 w-full btn-primary bg-amber-600 hover:bg-amber-700 shadow-amber-600/20 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Begin 1-Minute Preparation
                </button>
              </div>
            )}

            {/* State: PREPARATION (60s countdown) */}
            {stage === "PREP" && (
              <div className="mt-6 text-center animate-fade-up">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  Preparation Phase
                </span>
                <div className="mt-4 text-5xl font-extrabold tracking-tight text-amber-600 tabular-nums">
                  {prepSecondsLeft}s
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Jot down key points in your scratchpad. Speaking phase will launch automatically when timer reaches 0.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={startSpeakingPhase}
                    className="flex-1 btn-primary bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Skip to Speaking Now
                  </button>
                  <button
                    onClick={resetSession}
                    className="btn-secondary py-2.5 text-xs text-slate-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* State: SPEAKING (Live 2-minute recording) */}
            {stage === "SPEAK" && (
              <div className="mt-6 text-center animate-fade-up">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping" />
                  Live Recording &amp; Timing
                </div>

                <div className="mt-4 text-5xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                  {formatTime(speakSecondsElapsed)}
                </div>
                <div className="mt-1 text-xs text-slate-400">Target: 1:45 to 2:00 mins</div>

                {/* Visual Progress Bar with Thresholds */}
                <div className="mt-4 relative h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      speakSecondsElapsed < 90
                        ? "bg-amber-500"
                        : speakSecondsElapsed <= 120
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${Math.min((speakSecondsElapsed / 120) * 100, 100)}%` }}
                  />
                  {/* 1:30 marker */}
                  <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-400" title="1:30 min threshold" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>0:00</span>
                  <span className="font-semibold text-slate-600">1:30 (Min Ideal)</span>
                  <span>2:00 (Examiner Cutoff)</span>
                </div>

                <div className="mt-6">
                  <button
                    onClick={stopSpeakingPhase}
                    className="w-full btn-primary bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <Square className="h-4 w-4 fill-white" />
                    Stop &amp; Review Audio
                  </button>
                </div>
              </div>
            )}

            {/* State: REVIEW (Audio Player & Results) */}
            {stage === "REVIEW" && (
              <div className="mt-6 space-y-4 animate-fade-up">
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                  <div className="mt-2 text-sm font-bold text-emerald-900">
                    Response Recorded ({formatTime(speakSecondsElapsed)})
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    {speakSecondsElapsed >= 90
                      ? "Excellent length! You comfortably sustained speech past the 1:30 threshold."
                      : "Pacing tip: Aim to sustain speech for at least 1:30 to maximize your Fluency & Coherence band."}
                  </p>
                </div>

                {audioUrl && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Listen to Your Recording:
                    </label>
                    <audio controls src={audioUrl} className="w-full h-9" />
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={startPreparation}
                    className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retry Cue Card
                  </button>
                  <button
                    onClick={() => setShowModel(!showModel)}
                    className="flex-1 btn-primary bg-amber-600 hover:bg-amber-700 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {showModel ? "Hide Band 9 Model" : "View Band 9 Model"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* High-Yield Band 8/9 Lexical Collocations for this card */}
          <div className="card p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
              Band 8+ High-Scoring Idiomatic Lexicon
            </h4>
            <div className="mt-3 space-y-2">
              {selectedCard.vocabTips.map((tip, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-xs">
                  <div className="font-bold text-amber-900">"{tip.phrase}"</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tip.meaning}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Band 9 Model Response Drawer */}
          {showModel && (
            <div className="card p-5 border-amber-200 bg-amber-50/30 animate-fade-up">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Band 9.0 Examiner Model Transcript
                </span>
                <span className="text-[11px] font-semibold text-amber-700">Native Fluency</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                {selectedCard.modelTranscript}
              </p>
            </div>
          )}

          {/* Examiner 4-Criteria Assessment Checklist */}
          <div className="card p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Official Speaking Assessment Check
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Fluency &amp; Coherence:</strong> Spoke without prolonged mid-sentence hesitations or search pauses.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Lexical Resource:</strong> Used less common collocations and idioms naturally in context.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Grammatical Range:</strong> Combined complex subordinate clauses and conditional structures.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pronunciation:</strong> Clear rhythm, syllable stress, and natural sentence intonation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
