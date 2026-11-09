"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  Mic,
  Play,
  RotateCcw,
  Sparkles,
  Square,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHeader, ProgressBar } from "@/components/ui";

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

const ASSESSMENT_CRITERIA = [
  {
    title: "Fluency & Coherence",
    copy: "Spoke without prolonged mid-sentence hesitations or search pauses.",
  },
  {
    title: "Lexical Resource",
    copy: "Used less common collocations and idioms naturally in context.",
  },
  {
    title: "Grammatical Range",
    copy: "Combined complex subordinate clauses and conditional structures.",
  },
  {
    title: "Pronunciation",
    copy: "Clear rhythm, syllable stress, and natural sentence intonation.",
  },
];

const STAGE_META = {
  IDLE: { label: "Ready", badge: "badge-neutral" },
  PREP: { label: "Preparation", badge: "badge-warning" },
  SPEAK: { label: "Recording", badge: "badge-error" },
  REVIEW: { label: "Review", badge: "badge-success" },
} as const;

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

  const stageMeta = STAGE_META[stage];
  const speakPct = Math.min((speakSecondsElapsed / 120) * 100, 100);

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Speaking studio"
        title="Part 2 cue card & voice studio"
        description="Practise the one-minute preparation window and a continuous two-minute long turn, with live audio recording, authentic Cambridge topics and examiner-style feedback."
        actions={
          <span className="badge-brand">
            <Sparkles className="h-3.5 w-3.5" />
            Examiner-calibrated
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-8">
        {/* ── Left: cue card, scratchpad & language ─────────────────── */}
        <div className="min-w-0 space-y-6">
          {/* Topic selector */}
          <section className="card p-5 sm:p-6">
            <label className="eyebrow block">Cambridge topic</label>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {SAMPLE_CUE_CARDS.map((card) => {
                const active = selectedCard.id === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSelectedCard(card);
                      resetSession();
                    }}
                    className={`cursor-pointer rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-brand-300 bg-brand-50 text-brand-900 shadow-xs"
                        : "border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50"
                    }`}
                  >
                    <div className="truncate text-[13px] font-semibold">{card.topic}</div>
                    <div
                      className={`mt-0.5 truncate text-[11px] ${
                        active ? "text-brand-600" : "text-surface-400"
                      }`}
                    >
                      {card.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Candidate task card */}
          <section className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-100 bg-amber-50/60 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Mic className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-800">
                  Candidate task card · Part 2 long turn
                </span>
              </div>
              <span className="badge-warning">1 min prep · 2 min speak</span>
            </div>

            <div className="p-5 sm:p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">
                {selectedCard.topic}
              </span>
              <h2 className="mt-2 font-display text-xl font-extrabold leading-snug tracking-tight text-surface-900 sm:text-[1.4rem]">
                {selectedCard.prompt}
              </h2>

              <p className="mt-5 text-[13px] font-semibold text-surface-500">You should say:</p>
              <ul className="mt-2.5 space-y-2.5">
                {selectedCard.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-surface-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="surface-panel mt-6 p-4">
                <div className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-surface-600">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <p>
                    <span className="font-semibold text-surface-900">Follow-up probe:</span>{" "}
                    {selectedCard.followUp}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Preparation scratchpad */}
          <section className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="speaking-notes"
                className="flex items-center gap-2 text-[13px] font-bold text-surface-900"
              >
                <BookOpen className="h-4 w-4 text-brand-500" />
                Preparation scratchpad
              </label>
              <span className="text-xs text-surface-400">Keywords &amp; collocations, not full sentences</span>
            </div>
            <textarea
              id="speaking-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={"Jot key phrases here during preparation…\ne.g. - Glen Coe Highlands, 2 yrs ago, remote cabins\n- Hospitable demeanor, profound respite\n- Reconnect with nature"}
              className="input mt-3 min-h-28 resize-y bg-surface-50/60 text-[15px] leading-relaxed focus:bg-white"
            />
          </section>

          {/* High-scoring lexis */}
          <section className="card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-surface-500">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Band 8+ lexical toolkit
            </h2>
            <ul className="mt-4 space-y-2.5">
              {selectedCard.vocabTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-surface-200/80 bg-surface-50/70 p-3.5"
                >
                  <div className="text-[13.5px] font-semibold text-surface-900">
                    &ldquo;{tip.phrase}&rdquo;
                  </div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-surface-500">{tip.meaning}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Right: recorder console, model answer & checklist ─────── */}
        <div className="min-w-0 space-y-6">
          {/* Test room console */}
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="font-display text-[15px] font-bold leading-tight text-surface-900">
                    Test room
                  </h2>
                  <p className="text-[11px] text-surface-400">Part 2 · long turn</p>
                </div>
              </div>
              <span className={stageMeta.badge}>{stageMeta.label}</span>
            </div>

            {/* State: IDLE */}
            {stage === "IDLE" && (
              <div className="mt-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-600">
                  <Mic className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-surface-900">Ready when you are</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-surface-500">
                  You get 60 seconds to read the card and make notes, then two minutes to speak. Recording starts
                  automatically.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="badge-neutral">60s prep</span>
                  <span className="badge-neutral">2 min turn</span>
                  <span className="badge-neutral">Live audio</span>
                </div>
                <button onClick={startPreparation} className="btn-primary mt-6 w-full py-3">
                  <Play className="h-4 w-4" />
                  Begin preparation
                </button>
              </div>
            )}

            {/* State: PREPARATION */}
            {stage === "PREP" && (
              <div className="mt-6 text-center animate-fade-up">
                <span className="badge-warning">Preparation phase</span>
                <div className="mt-4 font-display text-5xl font-extrabold tabular-nums tracking-tight text-brand-700 sm:text-6xl">
                  {formatTime(prepSecondsLeft)}
                </div>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-surface-500">
                  Jot key points in the scratchpad. Speaking starts automatically when the timer reaches zero.
                </p>
                <ProgressBar value={((60 - prepSecondsLeft) / 60) * 100} className="mt-5 h-2.5" />
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button onClick={startSpeakingPhase} className="btn-primary py-2.5 text-[13px]">
                    <Play className="h-4 w-4" />
                    Start now
                  </button>
                  <button onClick={resetSession} className="btn-secondary py-2.5 text-[13px]">
                    <RotateCcw className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* State: SPEAK */}
            {stage === "SPEAK" && (
              <div className="mt-6 text-center animate-fade-up">
                <span className={recording ? "badge-error" : "badge-warning"}>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      recording ? "animate-pulse-dot bg-rose-500" : "bg-amber-500"
                    }`}
                  />
                  {recording ? "Live recording" : "Timing · mic unavailable"}
                </span>

                <div className="mt-4 font-display text-5xl font-extrabold tabular-nums tracking-tight text-surface-900 sm:text-6xl">
                  {formatTime(speakSecondsElapsed)}
                </div>
                <p className="mt-1 text-[13px] text-surface-500">Target range: 1:45 – 2:00</p>

                <div className="relative mt-5">
                  <ProgressBar
                    value={speakPct}
                    className="h-2.5"
                    color={speakSecondsElapsed < 90 ? "bg-amber-400" : "bg-emerald-500"}
                  />
                  <span
                    className="absolute -bottom-1 -top-1 left-[75%] w-px bg-surface-400/70"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-surface-400">
                  <span>0:00</span>
                  <span className="font-semibold text-surface-600">1:30 ideal</span>
                  <span>2:00 cutoff</span>
                </div>

                <button onClick={stopSpeakingPhase} className="btn-destructive mt-6 w-full py-3">
                  <Square className="h-4 w-4 fill-current" />
                  Stop &amp; review
                </button>
              </div>
            )}

            {/* State: REVIEW */}
            {stage === "REVIEW" && (
              <div className="mt-6 space-y-4 animate-fade-up">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-center">
                  <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600" />
                  <div className="mt-2 font-display text-[15px] font-bold text-emerald-900">
                    Response recorded · {formatTime(speakSecondsElapsed)}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-emerald-800">
                    {speakSecondsElapsed >= 90
                      ? "Strong length — you sustained speech past the 1:30 threshold."
                      : "Aim to keep speaking for at least 1:30 to lift your Fluency & Coherence."}
                  </p>
                </div>

                {audioUrl && (
                  <div className="surface-panel p-3.5">
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-surface-500">
                      Your recording
                    </label>
                    <audio controls src={audioUrl} className="h-10 w-full" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <button onClick={startPreparation} className="btn-secondary py-2.5 text-[13px]">
                    <RotateCcw className="h-4 w-4" />
                    Retry
                  </button>
                  <button
                    onClick={() => setShowModel(!showModel)}
                    className="btn-primary py-2.5 text-[13px]"
                  >
                    <Sparkles className="h-4 w-4" />
                    {showModel ? "Hide model" : "Band 9 model"}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Band 9 model transcript */}
          {showModel && (
            <section className="card overflow-hidden animate-fade-up">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-100 bg-brand-50/60 px-5 py-3.5">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Band 9 model transcript
                </span>
                <span className="badge-brand">Native fluency</span>
              </div>
              <p className="whitespace-pre-line p-5 text-[15px] leading-relaxed text-surface-700">
                {selectedCard.modelTranscript}
              </p>
            </section>
          )}

          {/* Examiner checklist */}
          <section className="card p-5 sm:p-6">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-surface-500">
              Official assessment check
            </h2>
            <ul className="mt-4 space-y-3.5">
              {ASSESSMENT_CRITERIA.map(({ title, copy }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-[13px] leading-relaxed text-surface-600">
                    <span className="font-semibold text-surface-900">{title}:</span> {copy}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
