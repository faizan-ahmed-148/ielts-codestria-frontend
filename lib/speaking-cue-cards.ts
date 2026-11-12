/** Speaking Part 2 cue cards shared by the interactive studio and its server-rendered guide. */

export interface CueCardData {
  id: string;
  topic: string;
  title: string;
  prompt: string;
  bullets: string[];
  followUp: string;
  vocabTips: { phrase: string; meaning: string }[];
  modelTranscript: string;
}

export const SAMPLE_CUE_CARDS: CueCardData[] = [
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
