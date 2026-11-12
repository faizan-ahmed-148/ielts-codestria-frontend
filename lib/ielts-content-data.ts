// IELTS Academic Word List (AWL) & Band 9 Collocations Dataset
// Curated for Band 7.5 to 9.0 Candidates

export interface IELTSVocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: "verb" | "noun" | "adjective" | "adverb" | "collocation";
  cefr: "B2" | "C1" | "C2";
  definition: string;
  topic: "Environment" | "Technology" | "Education" | "Society" | "Health" | "Economy";
  collocations: string[];
  sampleSentence: string;
  synonyms: string[];
  antonyms: string[];
}

export interface ModelEssay {
  id: string;
  taskType: "TASK_1_ACADEMIC" | "TASK_1_GENERAL" | "TASK_2";
  title: string;
  prompt: string;
  band: 9.0;
  wordCount: number;
  analysis: {
    taskAchievementOrResponse: string;
    coherenceAndCohesion: string;
    lexicalResource: string;
    grammaticalRangeAndAccuracy: string;
  };
  essayHtml: string;
  comparisonBand6: {
    band: 6.0;
    essayText: string;
    flaws: string[];
  };
  keyTakeaways: string[];
}

export const IELTS_VOCABULARY: IELTSVocabularyItem[] = [
  // Environment
  {
    id: "vocab-mitigate",
    word: "mitigate",
    phonetic: "/ˈmɪt.ɪ.ɡeɪt/",
    partOfSpeech: "verb",
    cefr: "C1",
    definition: "To make something less severe, harmful, or painful.",
    topic: "Environment",
    collocations: ["mitigate the impact of", "mitigate environmental risks", "proactive steps to mitigate"],
    sampleSentence: "Targeted reforestation initiatives are essential to mitigate the catastrophic impact of soil erosion and extreme heat waves.",
    synonyms: ["alleviate", "attenuate", "palliate", "lessen"],
    antonyms: ["exacerbate", "aggravate", "intensify"],
  },
  {
    id: "vocab-sustainable",
    word: "sustainable",
    phonetic: "/səˈsteɪ.nə.bəl/",
    partOfSpeech: "adjective",
    cefr: "B2",
    definition: "Able to be maintained at a certain rate or level without exhausting natural resources.",
    topic: "Environment",
    collocations: ["sustainable development", "sustainable agricultural practices", "environmentally sustainable"],
    sampleSentence: "Metropolitan planners must transition to sustainable public transit networks to reduce reliance on non-renewable fossil fuels.",
    synonyms: ["renewable", "ecologically viable", "durable"],
    antonyms: ["depletable", "unsustainable", "destructive"],
  },
  {
    id: "vocab-biodiversity",
    word: "biodiversity",
    phonetic: "/ˌbaɪ.oʊ.daɪˈvɜːr.sə.ti/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "The variety of plant and animal life in the world or in a particular habitat.",
    topic: "Environment",
    collocations: ["loss of biodiversity", "preserve biodiversity", "biodiversity conservation"],
    sampleSentence: "Unchecked coastal urbanization poses an existential threat to endemic marine biodiversity.",
    synonyms: ["ecological diversity", "biological variety"],
    antonyms: ["monoculture", "ecological homogeneity"],
  },
  {
    id: "vocab-depletion",
    word: "depletion",
    phonetic: "/dɪˈpliː.ʃən/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "Reduction in the number or quantity of something, especially natural resources.",
    topic: "Environment",
    collocations: ["resource depletion", "ozone layer depletion", "depletion of aquifers"],
    sampleSentence: "The rapid depletion of groundwater reserves requires stringent agricultural water quota regulations.",
    synonyms: ["exhaustion", "diminution", "consumption"],
    antonyms: ["replenishment", "restoration", "accumulation"],
  },

  // Technology
  {
    id: "vocab-ubiquitous",
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wə.təs/",
    partOfSpeech: "adjective",
    cefr: "C2",
    definition: "Present, appearing, or found everywhere.",
    topic: "Technology",
    collocations: ["become ubiquitous", "ubiquitous presence of smartphones", "ubiquitous computing"],
    sampleSentence: "Handheld mobile devices have become ubiquitous across all demographics, redefining social interaction.",
    synonyms: ["omnipresent", "pervasive", "universal"],
    antonyms: ["scarce", "rare", "infrequent"],
  },
  {
    id: "vocab-proliferation",
    word: "proliferation",
    phonetic: "/prəˌlɪf.əˈreɪ.ʃən/",
    partOfSpeech: "noun",
    cefr: "C2",
    definition: "Rapid increase in the appearance or growth of something.",
    topic: "Technology",
    collocations: ["proliferation of autonomous systems", "proliferation of online misinformation"],
    sampleSentence: "The proliferation of algorithmic feeds has fueled an alarming surge in polarization and echo chambers.",
    synonyms: ["mushrooming", "escalation", "expansion"],
    antonyms: ["containment", "reduction", "decline"],
  },
  {
    id: "vocab-automation",
    word: "automation",
    phonetic: "/ˌɔː.təˈmeɪ.ʃən/",
    partOfSpeech: "noun",
    cefr: "B2",
    definition: "The use of largely automatic equipment in a system of manufacturing or other processes.",
    topic: "Technology",
    collocations: ["workplace automation", "automation of routine tasks", "industrial automation"],
    sampleSentence: "While automation significantly boosts manufacturing efficiency, it displaces low-skilled manual laborers.",
    synonyms: ["mechanization", "computerization", "digitization"],
    antonyms: ["manual labor", "human craft"],
  },
  {
    id: "vocab-disruptive",
    word: "disruptive",
    phonetic: "/dɪsˈrʌp.tɪv/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Innovatively transforming an established sector or process completely.",
    topic: "Technology",
    collocations: ["disruptive innovation", "disruptive potential of AI", "disruptive technologies"],
    sampleSentence: "Generative artificial intelligence represents one of the most disruptive technological leaps of this century.",
    synonyms: ["revolutionary", "transformative", "groundbreaking"],
    antonyms: ["conventional", "traditional", "incremental"],
  },

  // Education
  {
    id: "vocab-pedagogical",
    word: "pedagogical",
    phonetic: "/ˌped.əˈɡɑː.dʒɪ.kəl/",
    partOfSpeech: "adjective",
    cefr: "C2",
    definition: "Relating to the theory and methods of teaching.",
    topic: "Education",
    collocations: ["pedagogical approach", "pedagogical acumen", "sound pedagogical principles"],
    sampleSentence: "Modern institutions must re-evaluate their pedagogical models to nurture critical thinking over rote memorization.",
    synonyms: ["didactic", "educational", "instructional"],
    antonyms: ["non-educational", "uninstructive"],
  },
  {
    id: "vocab-holistic",
    word: "holistic",
    phonetic: "/hoʊˈlɪs.tɪk/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Characterized by the treatment of the whole person or system rather than just its constituent parts.",
    topic: "Education",
    collocations: ["holistic approach to education", "holistic assessment", "holistic development"],
    sampleSentence: "A truly holistic curriculum integrates emotional intelligence and social leadership alongside pure academics.",
    synonyms: ["comprehensive", "all-encompassing", "integrated"],
    antonyms: ["fragmented", "compartmentalized", "narrow"],
  },
  {
    id: "vocab-instill",
    word: "instill",
    phonetic: "/ɪnˈstɪl/",
    partOfSpeech: "verb",
    cefr: "C1",
    definition: "Gradually but firmly establish an idea, value, or attitude in a person's mind.",
    topic: "Education",
    collocations: ["instill intellectual curiosity", "instill ethical values", "instill a sense of discipline"],
    sampleSentence: "Early childhood educators carry the responsibility to instill lifelong curiosity and resilience in young minds.",
    synonyms: ["inculcate", "impart", "infuse", "engrain"],
    antonyms: ["eradicate", "remove", "dislodge"],
  },
  {
    id: "vocab-cognitive",
    word: "cognitive",
    phonetic: "/ˈkɑːɡ.nə.tɪv/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Connected with thinking or conscious mental processes.",
    topic: "Education",
    collocations: ["cognitive development", "cognitive overload", "enhance cognitive faculties"],
    sampleSentence: "Bilingual education has been empirically demonstrated to bolster cognitive flexibility and working memory.",
    synonyms: ["intellectual", "mental", "cerebral"],
    antonyms: ["emotional", "instinctive", "physical"],
  },

  // Society & Urbanization
  {
    id: "vocab-disparity",
    word: "disparity",
    phonetic: "/dɪˈspær.ə.t̬i/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "A notable difference or inequality between people, things, or groups.",
    topic: "Society",
    collocations: ["socioeconomic disparity", "income disparity", "glaring disparity in healthcare access"],
    sampleSentence: "Governments must enact redistributive fiscal policies to remedy the widening disparity between urban and rural populations.",
    synonyms: ["inequality", "imbalance", "discrepancy"],
    antonyms: ["equality", "parity", "uniformity"],
  },
  {
    id: "vocab-marginalized",
    word: "marginalized",
    phonetic: "/ˈmɑːr.dʒɪ.nəl.aɪzd/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Treated as insignificant or placed in an powerless position within a society.",
    topic: "Society",
    collocations: ["marginalized communities", "marginalized demographics", "voices of the marginalized"],
    sampleSentence: "Urban planning projects often overlook marginalized communities, exacerbating residential segregation.",
    synonyms: ["disenfranchised", "underprivileged", "sidelined"],
    antonyms: ["privileged", "dominant", "integrated"],
  },
  {
    id: "vocab-cohesion",
    word: "cohesion",
    phonetic: "/koʊˈhiː.ʒən/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "The state of sticking together or acting as a united whole.",
    topic: "Society",
    collocations: ["social cohesion", "community cohesion", "strengthen family cohesion"],
    sampleSentence: "Accessible public parks and cultural libraries serve as vital infrastructure for fostering neighborhood social cohesion.",
    synonyms: ["unity", "solidarity", "connectedness"],
    antonyms: ["fragmentation", "discord", "division"],
  },
  {
    id: "vocab-gentrification",
    word: "gentrification",
    phonetic: "/ˌdʒen.trə.fəˈkeɪ.ʃən/",
    partOfSpeech: "noun",
    cefr: "C2",
    definition: "The process of renovating an urban district so that it conforms to middle-class taste, often displacing poorer residents.",
    topic: "Society",
    collocations: ["rapid gentrification", "consequences of gentrification", "combat gentrification"],
    sampleSentence: "While gentrification revitalizes dilapidated heritage quarters, it frequently forces out generational working-class tenants.",
    synonyms: ["urban renewal", "redevelopment"],
    antonyms: ["urban decay", "blight"],
  },

  // Health & Medicine
  {
    id: "vocab-detrimental",
    word: "detrimental",
    phonetic: "/ˌdet.rəˈmen.t̬əl/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Causing harm, damage, or injury.",
    topic: "Health",
    collocations: ["detrimental to physical health", "detrimental repercussions", "prove highly detrimental"],
    sampleSentence: "Sedentary lifestyles combined with high-fructose diets have proven exceedingly detrimental to cardiovascular longevity.",
    synonyms: ["deleterious", "pernicious", "adverse", "damaging"],
    antonyms: ["beneficial", "salubrious", "advantageous"],
  },
  {
    id: "vocab-sedentary",
    word: "sedentary",
    phonetic: "/ˈsed.ən.ter.i/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Tending to spend much time seated; somewhat inactive physically.",
    topic: "Health",
    collocations: ["sedentary lifestyle", "sedentary office occupations", "counteract sedentary habits"],
    sampleSentence: "Public health agencies must incentivize daily physical exercise to combat the rise of chronic sedentary illnesses.",
    synonyms: ["inactive", "desk-bound", "torpid"],
    antonyms: ["active", "dynamic", "athletic"],
  },
  {
    id: "vocab-longevity",
    word: "longevity",
    phonetic: "/lɑːnˈdʒev.ə.t̬i/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "Long life, or long existence or service.",
    topic: "Health",
    collocations: ["promote longevity", "human longevity", "factors influencing longevity"],
    sampleSentence: "Advances in genomic medicine have increased human longevity while creating profound challenges for state pension systems.",
    synonyms: ["life expectancy", "endurance", "vitality"],
    antonyms: ["brevity", "ephemerality", "mortality"],
  },

  // Economy & Globalization
  {
    id: "vocab-catalyst",
    word: "catalyst",
    phonetic: "/ˈkæt̬.əl.ɪst/",
    partOfSpeech: "noun",
    cefr: "C1",
    definition: "A person or thing that precipitates an event or rapid transformation.",
    topic: "Economy",
    collocations: ["act as a catalyst for", "catalyst for economic growth", "primary catalyst"],
    sampleSentence: "Targeted public subsidies for renewable startups can serve as a potent catalyst for nationwide economic diversification.",
    synonyms: ["impetus", "stimulus", "spark", "spur"],
    antonyms: ["impediment", "deterrent", "obstacle"],
  },
  {
    id: "vocab-inexorable",
    word: "inexorable",
    phonetic: "/ɪˈnek.sər.ə.bəl/",
    partOfSpeech: "adjective",
    cefr: "C2",
    definition: "Impossible to stop, prevent, or persuade.",
    topic: "Economy",
    collocations: ["inexorable trend toward", "inexorable economic march", "inexorable rise in costs"],
    sampleSentence: "The inexorable rise of electronic commerce has placed traditional brick-and-mortar retailers under unprecedented strain.",
    synonyms: ["relentless", "unstoppable", "unavoidable"],
    antonyms: ["preventable", "avertable", "flexible"],
  },
  {
    id: "vocab-fiscal",
    word: "fiscal",
    phonetic: "/ˈfɪs.kəl/",
    partOfSpeech: "adjective",
    cefr: "C1",
    definition: "Relating to government revenue, especially taxes.",
    topic: "Economy",
    collocations: ["fiscal policy", "fiscal deficit", "exercise fiscal prudence"],
    sampleSentence: "Central administrations must balance aggressive capital spending with long-term fiscal solvency.",
    synonyms: ["financial", "monetary", "budgetary"],
    antonyms: ["non-monetary"],
  },
];

export const MODEL_ESSAYS: ModelEssay[] = [
  // Model 1: Task 2 Opinion / Agree-Disagree
  {
    id: "essay-ai-teachers",
    taskType: "TASK_2",
    title: "AI & The Role of Educators in Tomorrow's Classrooms",
    prompt:
      "Some people believe that technological developments will lead to the complete replacement of human teachers by artificial intelligence systems in the near future. To what extent do you agree or disagree?",
    band: 9.0,
    wordCount: 278,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Unmistakably clear and nuanced thesis stated upfront and sustained throughout. Directly addresses 'to what extent' by rejecting absolute replacement while acknowledging profound pedagogical augmentation.",
      coherenceAndCohesion:
        "Band 9.0: Effortless, natural progression. Paragraphs use seamless transitional topic sentences without cliché discourse markers (e.g., avoids 'First and foremost' in favor of contextual conceptual links).",
      lexicalResource:
        "Band 9.0: Sophisticated, precise academic vocabulary utilized naturally: 'pedagogical acumen', 'empathetic mentorship', 'nuanced emotional dynamics', 'asynchronous instruction'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Full flexibility of syntax: fronted adverbials, conditional inversion, cleft sentences ('What software algorithms fundamentally lack...'), and 100% error-free mechanics.",
    },
    essayHtml: `<p>The rapid proliferation of sophisticated algorithmic tutoring systems has prompted speculation that human instructors will eventually become obsolete. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">While it is undeniable that</span> artificial intelligence excels at personalized data delivery and automated grading, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">I unequivocally disagree with the premise that</span> machines could ever fully supplant human educators.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Admittedly, computational platforms possess</span> formidable advantages in pedagogical efficiency. Machine learning algorithms can analyze a pupil's knowledge gaps in real time, calibrating drill difficulty to match cognitive capacity far more systematically than a single teacher overseeing a crowded classroom. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Consequently, for rote learning, vocabulary memorization, and mathematical derivation</span>, AI represents an extraordinary diagnostic asset that will streamline homework supervision. A language-learning application, for instance, can identify that a learner repeatedly confuses two verb tenses and generate targeted exercises within seconds, a task that might take a busy teacher several weeks to notice.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Nevertheless, true education extends far beyond</span> mere data transmission. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">What automated software fundamentally lacks is</span> the capacity for empathetic mentorship and moral cultivation. Exceptional educators do not merely impart syllabus content; they detect subtle non-verbal cues of anxiety or disenfranchisement, adapt their interpersonal demeanor, and instill intellectual curiosity. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Crucially, human teachers model ethical dilemmas</span>, foster classroom debate, and guide students through conflict resolution—interpersonal competencies that cannot be codified into algorithmic matrices. A pupil who is struggling because of problems at home is far more likely to confide in a trusted adult than in a chatbot.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion, technology will undoubtedly redefine</span> the educational landscape, liberating instructors from burdensome administrative overhead. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">However, because genuine teaching is at its heart a deeply relational and humanist endeavor</span>, artificial intelligence will remain a supportive tool rather than a comprehensive replacement for human teachers.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Nowadays technology is growing very fast and some people think computer can replace teachers. I partly agree with this opinion because computer is very smart. Firstly, computers have all information on the internet. Students can search Google and learn everything at home easily without going to school. Secondly, computers do not get tired and they can teach 24 hours every day. However, teachers are also important. If students have questions they can ask teachers directly and teachers can be kind. In conclusion, I think computers will help teachers very much in the future but maybe teachers will still exist.",
      flaws: [
        "Repetitive, basic vocabulary ('very smart', 'very fast', 'search Google', 'can teach 24 hours').",
        "Overly simple and mechanical cohesive devices ('Firstly', 'Secondly', 'However', 'In conclusion').",
        "Weak argument development; fails to explore what teachers fundamentally provide beyond mere kindness.",
        "Frequent minor grammatical inaccuracies and simplistic sentence structures.",
      ],
    },
    keyTakeaways: [
      "Avoid absolutist positions unless explicitly defending one; a nuanced distinction between 'knowledge delivery' vs 'relational mentorship' demonstrates Band 9 critical depth.",
      "Vary sentence openings: avoid starting every paragraph with 'First', 'Second', or 'Furthermore'.",
      "Highlight the specific qualities of human psychology that algorithms cannot replicate.",
    ],
  },

  // Model 2: Task 1 Academic - Line Graph / Renewable Energy Trends
  {
    id: "essay-task1-renewable",
    taskType: "TASK_1_ACADEMIC",
    title: "Global Renewable Energy Generation (1990–2025)",
    prompt:
      "The line graph illustrates the consumption of renewable energy in terawatt-hours (TWh) across four world regions (East Asia, Europe, North America, and Latin America) between 1990 and 2025, including projected figures.",
    band: 9.0,
    wordCount: 164,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Outstanding summary overview highlighting the dominant upward trajectory of all regions and East Asia's dramatic overtaking of Europe as the global leader. Selects key crossover points without drowning in minor numbers.",
      coherenceAndCohesion:
        "Band 9.0: Data is structured logically into two comparative bodies (dominant high-growth regions vs moderate-growth regions).",
      lexicalResource:
        "Band 9.0: Rich academic synonyms for movement: 'witnessed an exponential surge', 'overtaking', 'moderate yet consistent ascension', 'marginal climb', 'dwarfed'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Impeccable use of participle clauses ('rising from 80 TWh...'), passive constructions, and precise temporal framing for past vs projected data.",
    },
    essayHtml: `<p>The line graph details historical and projected renewable energy consumption in terawatt-hours across four global sectors from 1990 through 2025.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Overall, clean energy utilization increased</span> across every surveyed territory over the thirty-five-year timeframe. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Most notably, East Asia experienced</span> an explosive escalation, surpassing Europe around 2012 to establish itself as the undisputed global frontrunner by the terminal year.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Regarding the two leading territories</span>, Europe initially spearheaded renewable production in 1990 at approximately 120 TWh, climbing steadily to plateau near 310 TWh by 2025. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">In stark contrast, East Asia registered</span> a modest 70 TWh at the outset; <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">however, after 2005 its consumption accelerated exponentially</span>, overtaking European output and culminating in an anticipated peak of 490 TWh.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Turning to the remaining regions</span>, North America exhibited steady, uninterrupted ascension from 90 TWh in 1990 to an estimated 230 TWh in 2025. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Meanwhile, Latin America consistently recorded</span> the lowest volumes throughout the era, rising marginally from 45 TWh to 85 TWh, ultimately remaining dwarfed by the other three jurisdictions.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "The graph gives information about how much renewable energy was used in four parts of the world between 1990 and 2025. In 1990 Europe had 120 TWh and it went up to 310 TWh. East Asia started at 70 TWh and increased very much to 490 TWh in 2025. North America was 90 TWh in 1990 and went up to 230 TWh. Latin America was the lowest region with 45 TWh and went to 85 TWh. Overall we can see that all regions went up, but East Asia went up the most and Latin America was the lowest.",
      flaws: [
        "Chronological 'laundry list' reporting without grouping data by trend similarities.",
        "Repetitive vocabulary ('went up', 'started at', 'was the lowest').",
        "Overview placed at the very end with minimal analytical contrast.",
        "Fails to note the crossover point where East Asia overtook Europe.",
      ],
    },
    keyTakeaways: [
      "Always group data into logical categories (e.g. exponential leaders vs steady risers) rather than describing each line independently.",
      "Identify crossover years ('surpassing Europe around 2012') as this demonstrates Band 9 analytical insight.",
      "Distinguish between verified historical data and projected estimates ('estimated', 'anticipated peak').",
    ],
  },

  // Model 3: Task 2 Discussion / Both Views
  {
    id: "essay-degrees-vs-skills",
    taskType: "TASK_2",
    title: "University Education vs Practical Vocational Apprenticeships",
    prompt:
      "Some people argue that traditional university education is the best path to career success, while others believe that practical vocational training and technical skills are more valuable in today's job market. Discuss both views and give your own opinion.",
    band: 9.0,
    wordCount: 250,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Balanced, rigorous treatment of both arguments before proposing a mature synthesising perspective that the modern economy requires a symbiosis of theoretical framework and practical agility.",
      coherenceAndCohesion:
        "Band 9.0: Flawless progression. Each perspective is given equal weight and intellectual credit before arriving at a clear conclusion.",
      lexicalResource:
        "Band 9.0: Specialized labor-market lexicon: 'theoretical rigor', 'employability', 'vocational apprenticeships', 'vocational agility', 'saturated academic credentials', 'symbiotic integration'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Masterful compound-complex phrasing with balanced concessive clauses ('While tertiary education confers...', 'Conversely, proponents of vocational training rightly argue...').",
    },
    essayHtml: `<p>The relative efficacy of tertiary degrees versus vocational training has become a central debate in modern employment strategy. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">While proponents of academic institutions highlight</span> the enduring value of theoretical rigor, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">advocates of vocational pathways argue that</span> practical proficiency yields more immediate job readiness. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">In my view, both pathways possess distinct merits</span>, but the contemporary economy increasingly favors an agile synthesis of both.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">On the one hand, traditional university degrees instill</span> analytical habits of mind that transcend specific workplace tools. Disciplines such as law, medicine, engineering, and economics require an extensive theoretical grounding that cannot be condensed into brief apprenticeships. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Furthermore, the university environment cultivates</span> higher-order competencies: critical evaluation of empirical research, long-term strategic synthesis, and collaborative debate. These foundational cognitive attributes frequently correlate with leadership appointments and managerial longevity over a multi-decade career.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">On the other hand, vocational apprenticeships directly address</span> the urgent skills shortages plaguing industrial and technical sectors. While university graduates often enter competitive markets burdened with debt and lacking demonstrable practical competencies, certified technicians, electricians, and software specialists possess targeted, immediately marketable skills. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">In an era characterized by credential inflation</span>—where a generic bachelor's degree no longer guarantees employment—vocational education guarantees rapid workforce integration with negligible student liabilities.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion, I maintain that neither pathway</span> possesses exclusive superiority. Traditional academia remains indispensable for research-intensive and professional professions, whereas vocational programs excel at delivering immediate industrial utility. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">The most resilient career trajectories will belong to</span> professionals who pair the conceptual foundations of higher education with continuous, pragmatic vocational upskilling.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "People have different views about going to university or learning technical skills. In this essay I will discuss both sides and give my opinion. Some people say university is best. Because when you have a university degree companies will respect you more. You can get higher salary and become a manager in big office. On the other hand, vocational training is also good because you can learn practical things like fixing cars or computers. You can start working quickly and earn money young without waiting 4 years. In my opinion, I think university is better because education gives you higher social status.",
      flaws: [
        "Uncritical and cliché arguments ('companies respect you more', 'earn money young').",
        "Mechanical essay template intro ('In this essay I will discuss both sides').",
        "Abrupt personal opinion with shallow justification ('gives you higher social status').",
        "Informal expressions and limited lexical range.",
      ],
    },
    keyTakeaways: [
      "Avoid formulaic template sentences like 'In this essay I will discuss both sides'. Instead, paraphrase the tensions and state your overarching perspective in the introduction.",
      "Devote balanced, intellectual attention to both perspectives before presenting your personal stance.",
      "Show how the two competing ideas can be synthesized in the real world for a top Band 9 response.",
    ],
  },

  // Model 4: Task 2 Opinion / Agree-Disagree
  {
    id: "essay-free-public-transport",
    taskType: "TASK_2",
    title: "Should Public Transport Be Free? (Opinion Essay)",
    prompt:
      "Some people believe that public transport in cities should be free for everyone to use. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 271,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Takes a clearly qualified position (largely agree, but not unconditionally) and sustains it, weighing environmental and social gains against the genuine problem of funding and service quality.",
      coherenceAndCohesion:
        "Band 9.0: Each body paragraph is built around a single controlling idea, and the concession paragraph leads naturally into the conditions set out in the conclusion. Referencing ('this', 'such a scheme') is precise and unobtrusive.",
      lexicalResource:
        "Band 9.0: Precise, topic-specific collocations used naturally: 'fare revenue', 'chronically underfunded', 'modal shift', 'regressive burden', 'ring-fenced funding'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Wide range of structures handled with complete control, including a conditional with 'were', a cleft sentence ('What matters most is...') and fronted participle clauses.",
    },
    essayHtml: `<p>In many congested cities, policymakers have begun to ask whether buses, trams and metro systems should be funded entirely from taxation rather than ticket sales, and several have already put the idea into practice. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Although such a scheme carries real costs</span>, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">I largely agree that urban public transport should be free</span>, provided that it is properly funded.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">The most compelling argument</span> is environmental. Private cars remain one of the largest sources of urban air pollution, and price is often the deciding factor when commuters choose how to travel. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Were fares abolished</span>, many drivers would have a strong incentive to leave their cars at home, encouraging the kind of <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">modal shift</span> that cleaner air and quieter streets depend on.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Equally important</span> is the question of fairness. Ticket prices impose a <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">regressive burden</span>, since a monthly pass consumes a far larger share of a cleaner's wage than a lawyer's salary. Free travel would widen access to jobs, education and healthcare for low-income residents, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">many of whom live on the outskirts</span> where housing is cheaper but journeys are longer.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">That said, critics are right to point out</span> that nothing is truly free. Losing <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">fare revenue</span> could leave networks <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">chronically underfunded</span>, resulting in overcrowded carriages and ageing vehicles. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">What matters most is therefore not the price of a ticket</span> but the reliability of the service; a free bus that never arrives helps no one.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion</span>, I believe the social and environmental benefits of fare-free public transport outweigh its drawbacks. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">If governments guarantee</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">ring-fenced funding</span>, for instance through congestion charges on private vehicles, free transport can make cities cleaner, fairer and easier to move around.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Nowadays many cities have a lot of traffic and pollution, so some people think public transport should be free. I agree with this idea. Firstly, if bus and train is free, more people will use it and less people will drive car. This is good for environment because cars make a lot of pollution. Secondly, poor people cannot pay for ticket every day, so free transport help them very much. However, government need a lot of money for this. They can use tax money to pay it. In conclusion, I think free public transport is a very good idea and all cities should do it.",
      flaws: [
        "Position is stated but never qualified; the funding problem is mentioned and then dismissed in one sentence.",
        "Subject-verb agreement and article errors ('bus and train is free', 'free transport help', 'drive car', 'for environment').",
        "Limited and repetitive vocabulary ('a lot of', 'very much', 'very good idea'); 'less people' instead of 'fewer people'.",
        "Mechanical linking ('Firstly', 'Secondly', 'However', 'In conclusion') with no development of examples.",
      ],
    },
    keyTakeaways: [
      "'To what extent' questions reward a qualified position: agree, but state the condition under which your view holds.",
      "A strong concession paragraph acknowledges the best counter-argument and then shows why it does not overturn your position.",
      "Use topic-specific collocations ('fare revenue', 'modal shift', 'regressive burden') rather than general words like 'money' or 'good'.",
    ],
  },

  // Model 5: Task 2 Discussion / Both Views
  {
    id: "essay-zoos-conservation",
    taskType: "TASK_2",
    title: "Are Zoos Cruel or Essential for Conservation? (Discussion Essay)",
    prompt:
      "Some people think that keeping animals in zoos is cruel and should be stopped. Others believe that zoos play an essential role in protecting endangered species and educating the public. Discuss both these views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 264,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Both views are explored in depth and given fair weight, and the writer's own position (zoos are justified only when they meet strict conservation standards) is signposted in the introduction and developed in the conclusion.",
      coherenceAndCohesion:
        "Band 9.0: Clear four-paragraph structure with topic sentences that frame each view. Contrast is managed through varied devices ('By contrast', 'Admittedly', 'For this reason') rather than a fixed template.",
      lexicalResource:
        "Band 9.0: Accurate, field-specific vocabulary: 'stereotypic behaviour', 'captive breeding programmes', 'reintroduced into the wild', 'genetic diversity', 'commercial attractions'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Confident use of relative clauses, passive voice, a 'not only... but also' inversion and a conditional to frame the final judgement, all error-free.",
    },
    essayHtml: `<p>Few institutions divide opinion as sharply as the zoo. While some regard it as a relic of an era when animals were treated as entertainment, others see it as a vital refuge for species on the brink of extinction. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In my view, zoos can be justified</span>, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">but only if conservation, rather than profit, is their central purpose</span>.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Those who oppose zoos argue</span> that no enclosure, however well designed, can replicate a natural habitat. Animals that would roam vast territories in the wild, such as elephants and big cats, are confined to a fraction of that space, and many develop <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">stereotypic behaviour</span>, such as repetitive pacing, which is widely regarded as a sign of distress. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Critics also point out that many zoos operate primarily as</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">commercial attractions</span>, selecting animals for their popularity with visitors rather than their conservation value.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">By contrast, supporters emphasise</span> the role that modern zoos play in preventing extinction. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Captive breeding programmes</span> have helped to save species such as the Arabian oryx, which was later <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">reintroduced into the wild</span>. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Not only do zoos maintain genetic diversity</span>, but they also give millions of people, particularly children, a first-hand encounter with wildlife that no documentary can match, which may inspire lifelong support for conservation.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Having weighed both arguments</span>, I believe that the answer lies in reform rather than abolition. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">If zoos were required to meet strict welfare standards</span> and to invest a significant share of their income in protecting habitats, they would deserve public support. Those that exist merely to entertain, however, should have no place in a society that takes animal welfare seriously.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Some people think zoos are cruel but other people think zoos are important. I will discuss both views in this essay. Animals in zoo live in small cages and they are not happy. They cannot run and hunt like in the nature. This is very bad for animals. On the other hand, zoos are helping animals which are endangered. For example pandas are in zoo and they have babies there. Also children can see animals and learn about them. In my opinion, zoos are good and bad but I think they are more good because they save animals from die.",
      flaws: [
        "Formulaic introduction ('I will discuss both views in this essay') that does not state a clear position.",
        "Ideas are listed rather than developed; the panda example is vague and unexplained.",
        "Grammatical errors with articles and word forms ('in zoo', 'in the nature', 'save animals from die').",
        "Imprecise, informal conclusion ('zoos are good and bad... more good') instead of a reasoned judgement.",
      ],
    },
    keyTakeaways: [
      "In 'discuss both views' essays, give each side a full paragraph with a reason, an explanation and a specific example.",
      "Signal your own opinion in the introduction and develop it in the conclusion; a conditional view ('justified only if...') shows mature reasoning.",
      "Accurate technical terms such as 'captive breeding programmes' and 'stereotypic behaviour' lift lexical resource far more than generic adjectives.",
    ],
  },

  // Model 6: Task 2 Advantages / Disadvantages
  {
    id: "essay-working-from-home",
    taskType: "TASK_2",
    title: "Working from Home: Do the Advantages Outweigh the Disadvantages?",
    prompt:
      "In many countries, an increasing number of employees now work from home rather than in an office. Do the advantages of this trend outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 273,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Answers the exact question asked ('outweigh') with a clear verdict, and supports it by weighing benefits for both employees and employers against the risks to collaboration and well-being.",
      coherenceAndCohesion:
        "Band 9.0: Advantages and disadvantages are grouped into separate paragraphs, each with a clear topic sentence; the conclusion explicitly compares their weight rather than simply repeating them.",
      lexicalResource:
        "Band 9.0: Natural workplace collocations: 'gruelling commute', 'talent pool', 'blurred boundaries', 'informal knowledge-sharing', 'hybrid arrangement'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Varied complex sentences including participle clauses, a non-defining relative clause and a concessive 'While...' structure, with flawless punctuation.",
    },
    essayHtml: `<p>Since the pandemic, remote working has shifted from a rare privilege to a routine arrangement for millions of office employees. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Although this trend has some genuine drawbacks</span>, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">I believe its benefits clearly outweigh them</span>, particularly when it is combined with some time in the office.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">The most immediate advantage</span> is the time and money saved by avoiding a <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">gruelling commute</span>. An employee who once spent two hours a day on crowded trains can devote that time to rest, exercise or family, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">which in turn tends to improve both morale and productivity</span>. Employers benefit too: <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">freed from geographical constraints</span>, they can recruit from a far wider <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">talent pool</span> and reduce the cost of expensive city-centre premises.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">On the other hand</span>, working from home is not without its problems. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">When the kitchen table doubles as a desk</span>, the <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">blurred boundaries</span> between work and private life can lead to longer hours and burnout. Moreover, junior staff may miss out on the <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">informal knowledge-sharing</span> that happens naturally in an office, such as overhearing how a senior colleague handles a difficult client.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Nevertheless</span>, these disadvantages are largely manageable. Companies can set clear expectations about working hours, and regular team days can preserve mentoring and social contact. Similarly, employers can provide equipment allowances so that staff are able to work comfortably and safely at home. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">By contrast, the hours lost to commuting cannot be recovered</span> in any other way.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion</span>, while remote work can weaken collaboration and blur personal boundaries, its advantages for well-being, recruitment and costs are more substantial. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">A hybrid arrangement that balances home and office days</span> is likely to offer the best of both worlds.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Today more and more people are working from home instead of the office. There are advantages and disadvantages of this. The main advantage is people do not need to travel to office, so they save time and money. They can also spend more time with their family. But there are some disadvantages too. People at home can feel lonely and they do not see their colleagues. Also it is difficult to concentrate because of children or noise. In conclusion, working from home has advantages and disadvantages and I think it depends on the person.",
      flaws: [
        "Does not answer the question: the conclusion fails to say whether the advantages outweigh the disadvantages.",
        "Points are listed with minimal explanation or examples, so ideas remain underdeveloped.",
        "Basic, repetitive vocabulary ('advantages and disadvantages' repeated, 'save time and money', 'feel lonely').",
        "Article omission ('travel to office') and over-reliance on simple sentences joined by 'and' or 'so'.",
      ],
    },
    keyTakeaways: [
      "For 'Do the advantages outweigh the disadvantages?' you must give a clear verdict; 'it depends' without justification limits Task Response.",
      "Explain why one side carries more weight (e.g. problems that can be managed versus benefits that cannot be gained elsewhere).",
      "Consider more than one stakeholder, such as both employees and employers, to broaden your argument.",
    ],
  },

  // Model 7: Task 2 Problem / Solution
  {
    id: "essay-childhood-obesity",
    taskType: "TASK_2",
    title: "Rising Childhood Obesity: Causes and Solutions (Problem-Solution Essay)",
    prompt:
      "In many countries, the number of children who are overweight or obese is increasing rapidly. What are the main causes of this problem, and what measures could be taken to tackle it? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 285,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Both parts of the question are fully addressed, and each proposed measure is explicitly matched to a cause identified earlier, giving the response a tight logical link between problem and solution.",
      coherenceAndCohesion:
        "Band 9.0: Causes and solutions are separated into distinct paragraphs with clear internal sequencing. Reference words ('this', 'such measures') tie the solutions back to the causes without repetition.",
      lexicalResource:
        "Band 9.0: Precise health and policy vocabulary: 'energy-dense', 'sedentary lifestyles', 'aggressively marketed', 'sugar levy', 'reformulate their products'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Accurate use of passive constructions, reduced relative clauses, a cleft sentence and a range of modal verbs to express degrees of certainty.",
    },
    essayHtml: `<p>Childhood obesity has become one of the most pressing public health concerns of the twenty-first century, with rates in some countries having doubled within a generation. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">This essay will argue that</span> the problem stems chiefly from diet and inactivity, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">both of which can be addressed through</span> a combination of regulation and education.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">The primary cause</span> is a dramatic change in what children eat. Processed snacks and sugary drinks, which are cheap, convenient and <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">aggressively marketed</span> to young audiences, have replaced home-cooked meals in many households. These <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">energy-dense</span> foods provide large amounts of calories but little nutritional value. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Compounding this</span> is a decline in physical activity. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Children who once played outdoors after school</span> now spend hours in front of screens, and concerns about traffic and safety mean that fewer of them walk or cycle to school, leading to increasingly <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">sedentary lifestyles</span>.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Tackling the dietary problem</span> requires government intervention. A <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">sugar levy</span> on soft drinks, similar to those introduced in several European countries, can encourage manufacturers to <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">reformulate their products</span>, while restrictions on advertising junk food during children's television programmes would reduce its appeal. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">What is equally important, however, is</span> making healthy food affordable, for example by subsidising fresh produce and providing nutritious free school meals.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">To address inactivity</span>, schools should guarantee at least an hour of physical exercise every day, and local authorities could create safer cycle routes and parks. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Such measures would be most effective if accompanied by</span> campaigns that teach parents how to plan balanced meals on a limited budget.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion</span>, rising childhood obesity is driven largely by unhealthy diets and inactive routines. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Only by combining</span> firm regulation of the food industry with greater opportunities for exercise can governments reverse this worrying trend.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Nowadays obesity in children is a big problem in many countries. There are many reasons for this problem. The first reason is fast food. Children like to eat burgers and pizza and drink cola every day and this make them fat. The second reason is they play computer games all the time and do not do sport. To solve this problem, government should do something. For example they can close fast food restaurants near schools. Also parents should tell their children to eat healthy food and do exercise. In conclusion, obesity is a big problem and everybody must work together to solve it.",
      flaws: [
        "Solutions are vague ('government should do something') or unrealistic ('close fast food restaurants').",
        "Causes are asserted rather than explained; there is no discussion of why children's habits have changed.",
        "Grammatical slips ('this make them fat') and informal, imprecise word choice ('make them fat', 'all the time').",
        "Repetition of 'big problem' and 'problem' with no use of synonyms or topic-specific vocabulary.",
      ],
    },
    keyTakeaways: [
      "Link each solution directly to a cause you have identified; this creates a coherent problem-solution structure.",
      "Propose specific, realistic measures (a sugar levy, advertising limits, daily PE) rather than general statements like 'the government should help'.",
      "Use precise health vocabulary such as 'sedentary lifestyles' and 'energy-dense foods' instead of informal words like 'fat' or 'junk'.",
    ],
  },

  // Model 8: Task 2 Two-Part Question
  {
    id: "essay-learning-foreign-languages",
    taskType: "TASK_2",
    title: "Learning Foreign Languages in the Age of Machine Translation (Two-Part Question)",
    prompt:
      "Today, more and more people are learning a foreign language. Why do so many people choose to learn another language? Do you think that machine translation tools will eventually make language learning unnecessary? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 265,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Each question receives its own fully developed paragraph, and the answer to the second question is unambiguous: translation technology will reduce some practical needs but cannot replace language learning.",
      coherenceAndCohesion:
        "Band 9.0: The introduction maps both questions, and the body paragraphs follow the same order. Cohesion is achieved through precise referencing and logical connectors rather than formulaic markers.",
      lexicalResource:
        "Band 9.0: Sophisticated but natural vocabulary: 'competitive edge', 'cognitive benefits', 'cultural nuance', 'rapport', 'routine transactions'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Varied structures including a fronted concessive clause, a conditional with 'even if', a cleft sentence and accurate use of future forms for prediction.",
    },
    essayHtml: `<p>Despite the rapid improvement of translation apps, enrolment in language courses continues to grow worldwide. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">This essay will consider</span> why so many people study another language <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">before arguing that</span> machine translation, however advanced, will not make this effort redundant.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">The most common motivation</span> is economic. In a globalised job market, fluency in a second language gives candidates a <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">competitive edge</span>, especially in fields such as tourism, diplomacy and international trade. Many others learn for personal reasons, whether to study abroad, to communicate with relatives, or simply to enjoy films and literature in the original. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">There is also growing evidence that</span> bilingualism brings <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">cognitive benefits</span>, such as improved concentration and memory.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Admittedly</span>, translation software is now remarkably capable. A tourist can read a menu or ask for directions with a smartphone, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">and for such</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">routine transactions</span> the need to learn a language may well decline. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">However</span>, communication involves far more than exchanging information. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">What a machine struggles to convey is</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">cultural nuance</span>: humour, irony, politeness and the unspoken expectations that shape every conversation. A business negotiator who relies on an app cannot build the same <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">rapport</span> as one who speaks directly to a partner in their own language.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Moreover</span>, learning a language is itself a means of understanding another culture. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Even if translation became flawless</span>, it would remain a barrier between two speakers rather than a bridge.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion</span>, people learn foreign languages for career prospects, personal enrichment and mental agility. While machine translation will increasingly handle simple practical tasks, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">it is unlikely ever to replace</span> the deeper human connection that genuine language learning makes possible.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Nowadays a lot of people learn foreign language like English or Chinese. There are many reasons. First, if you speak English you can find a good job with high salary. Second, people like to travel and they need to speak with people in other countries. About machine translation, I think it is very useful because you can use Google Translate on your phone and understand everything. But sometimes it make mistakes and it is not correct. So I think people still need to learn languages. In conclusion, learning language is important for job and travel.",
      flaws: [
        "The second question is answered only briefly, with a weak justification ('sometimes it make mistakes').",
        "Overgeneralisation ('understand everything') and reliance on brand names instead of general terms.",
        "Article and agreement errors ('learn foreign language', 'it make mistakes', 'for job').",
        "Ideas are not extended with explanation or examples, so both body points remain superficial.",
      ],
    },
    keyTakeaways: [
      "In two-part questions, give each question its own body paragraph and answer both with equal depth.",
      "When predicting the future, acknowledge what technology can do before explaining its limits; this concession strengthens your final answer.",
      "Avoid brand names and absolute claims ('everything', 'always'); use precise, hedged language instead.",
    ],
  },

  // Model 9: Task 2 Positive / Negative Development
  {
    id: "essay-living-alone",
    taskType: "TASK_2",
    title: "More People Living Alone: Positive or Negative Development?",
    prompt:
      "In many countries, a growing number of people are choosing to live alone. Is this a positive or negative development? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    band: 9.0,
    wordCount: 265,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Presents a clear, well-reasoned judgement (largely positive for individuals, but with social costs that must be managed) and supports it with relevant examples across personal, social and economic dimensions.",
      coherenceAndCohesion:
        "Band 9.0: Logical flow from the reasons for the trend, to its benefits, to its risks, and finally to a balanced verdict. Paragraphs are linked by clear topic sentences and natural transitions.",
      lexicalResource:
        "Band 9.0: Precise, idiomatic vocabulary: 'financial independence', 'social isolation', 'housing shortage', 'strain on resources', 'a sense of autonomy'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Flexible use of complex structures, including participle clauses, a fronted negative adverbial with inversion and accurate conditional forms.",
    },
    essayHtml: `<p>In many developed societies, single-person households have become one of the fastest-growing forms of living arrangement. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">While this trend raises legitimate concerns about loneliness</span>, <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">I regard it as a largely positive development</span>, reflecting greater personal freedom and economic security.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">To begin with</span>, the rise in solo living is, in large part, a product of prosperity. Earlier generations often remained in the family home until marriage because they could not afford otherwise. Today, rising incomes and greater <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">financial independence</span>, particularly among women, allow people to choose how they live. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Living alone gives individuals</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">a sense of autonomy</span> and the space to focus on their careers, studies or personal interests without the compromises that shared accommodation demands.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Nevertheless, the trend is not without drawbacks</span>. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Not only can living alone lead to</span> <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">social isolation</span>, especially among elderly people who have lost a partner, but it also places a <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">strain on resources</span>. One person occupying a whole flat uses more energy and space per head than a family does, which can worsen an existing <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">housing shortage</span> in crowded cities.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">However, these problems are not inevitable</span>. Many people who live alone maintain active social lives through work, friendships and community activities, and loneliness is just as possible within an unhappy household. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">If governments invest in</span> smaller, energy-efficient homes and community centres for older residents, the negative effects can be greatly reduced.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In conclusion</span>, the growing number of people living alone largely reflects increased choice and independence, which I consider positive. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Provided that its social and environmental costs are addressed</span>, this trend need not come at the expense of community life.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "In these days, many people live alone and not with their family. I think this is both positive and negative. The positive side is that people can do what they want. They can sleep and eat when they like and nobody disturb them. Also they can focus on their job. The negative side is people can feel lonely and sad, especially old people. Also it is more expensive because you pay all the rent alone. In conclusion, living alone has positive and negative sides and people should choose what is best for them.",
      flaws: [
        "No clear overall judgement: the essay answers 'both' without explaining which side is more significant.",
        "Shallow, personal-level points; wider social and economic effects (e.g. housing demand) are ignored.",
        "Grammatical errors ('In these days', 'nobody disturb them') and simple, repetitive sentence patterns.",
        "Limited vocabulary with heavy repetition of 'positive', 'negative' and 'alone'.",
      ],
    },
    keyTakeaways: [
      "For 'positive or negative development' questions, decide which side is stronger and state it clearly; a qualified verdict is fine, but avoid sitting on the fence.",
      "Consider the effects on individuals, society and the environment to show breadth of thinking.",
      "Use a counter-argument paragraph to explain why the drawbacks are manageable, reinforcing your overall view.",
    ],
  },

  // Model 10: Task 1 Academic - Process Diagram / Glass Recycling
  {
    id: "essay-task1-process-glass-recycling",
    taskType: "TASK_1_ACADEMIC",
    title: "The Glass Bottle Recycling Process (Process Diagram)",
    prompt:
      "The diagram shows how glass bottles are recycled. It consists of eight stages: (1) used bottles are deposited by the public in collection banks; (2) the glass is transported by lorry to a recycling plant; (3) the bottles are sorted by colour into clear, green and brown glass; (4) they are washed with high-pressure water to remove labels and dirt; (5) the clean glass is crushed into small fragments called cullet; (6) the cullet is mixed with raw materials (sand, soda ash and limestone) and melted in a furnace at approximately 1,500°C; (7) the molten glass is shaped in moulds to form new bottles; and (8) the new bottles are filled at a factory and distributed back to shops and supermarkets, where the cycle begins again. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    band: 9.0,
    wordCount: 185,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: All eight stages are covered accurately, and the overview identifies the key features: the process is cyclical and divides into collection, preparation and manufacturing phases.",
      coherenceAndCohesion:
        "Band 9.0: Stages are grouped into two logical body paragraphs, and sequencing is handled with varied devices ('Once', 'Following this', 'at which point', 'Finally') rather than a repetitive list of numbers.",
      lexicalResource:
        "Band 9.0: Accurate process vocabulary: 'deposited', 'segregated according to colour', 'contaminants', 'fragments known as cullet', 'molten glass'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Consistent and accurate use of the present simple passive, alongside participle clauses and relative clauses to combine stages smoothly.",
    },
    essayHtml: `<p>The diagram illustrates the stages involved in recycling glass bottles, from their collection after use to their return to shops as new products.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Overall</span>, the process consists of eight steps and is <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">cyclical in nature</span>, beginning and ending with consumers. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">It can be divided into</span> an initial phase of collection and preparation, followed by the manufacture and distribution of new bottles.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">At the first stage</span>, used bottles are <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">deposited</span> by the public in collection banks, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">from which they are transported by lorry</span> to a recycling plant. There, the glass is <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">segregated according to colour</span> into clear, green and brown categories before being washed with high-pressure water to remove labels and other contaminants. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Once clean</span>, the bottles are crushed into small fragments known as cullet.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Following this</span>, the cullet is combined with raw materials, namely sand, soda ash and limestone, and melted in a furnace at around 1,500°C. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">The resulting molten glass is then shaped</span> in moulds to produce new bottles. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Finally</span>, these are filled at a factory and distributed to shops and supermarkets, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">at which point</span> they can be bought, used and recycled once again.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "The diagram shows how glass bottles are recycled. First, people put the bottles in the bottle bank. Second, a truck take them to the factory. Third, they sort the bottles by colours. Then they wash the bottles. After that they crush them into small pieces. Next they put the pieces with sand and other things and melt it at 1500 degrees. Then they make new bottles in moulds. Finally they fill the bottles and send them to shops. This process is very important for the environment. In conclusion, there are eight stages in this process.",
      flaws: [
        "No proper overview: the final sentence only counts the stages and does not identify the cyclical nature of the process.",
        "Mechanical sequencing ('First', 'Second', 'Third', 'Then', 'Next') with no grouping into phases.",
        "Overuse of the active voice with a vague subject ('they'), where the passive is more appropriate for a process.",
        "Grammatical and lexical slips ('a truck take them', 'other things', 'melt it') and missing key terms such as 'cullet'.",
      ],
    },
    keyTakeaways: [
      "For process diagrams, the overview should state the number of stages, where the process begins and ends, and whether it is linear or cyclical.",
      "Use the present simple passive ('are sorted', 'is melted') as the default tense for describing processes.",
      "Combine stages with relative and participle clauses and vary your sequencers to avoid a numbered list feel.",
    ],
  },

  // Model 11: Task 1 Academic - Pie Charts / Household Spending
  {
    id: "essay-task1-pie-household-spending",
    taskType: "TASK_1_ACADEMIC",
    title: "Household Spending by Category, 1995 vs 2025 (Pie Charts)",
    prompt:
      "The two pie charts show the proportion of average household spending on six categories in one country in 1995 and 2025. In 1995: Food 30%, Housing 25%, Transport 15%, Clothing 12%, Utilities 10%, Leisure 8%. In 2025: Housing 35%, Food 18%, Transport 16%, Leisure 14%, Utilities 12%, Clothing 5%. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    band: 9.0,
    wordCount: 157,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: Every figure is reported accurately, and the overview captures the two key changes: housing replaced food as the largest expense, and leisure grew while clothing shrank.",
      coherenceAndCohesion:
        "Band 9.0: Data is grouped by trend (significant changes in one paragraph, smaller changes in another) rather than described category by category, making comparisons clear.",
      lexicalResource:
        "Band 9.0: Varied language for proportions and change: 'accounted for', 'the lion's share', 'a corresponding fall', 'nearly doubled', 'more than halved', 'remained relatively stable'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Accurate use of the past simple and past perfect ('had reversed'), comparative structures and participle clauses ('rising to...', 'falling from...').",
    },
    essayHtml: `<p>The pie charts compare how average household expenditure in one country was distributed across six categories in 1995 and 2025.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Overall</span>, the most striking change is that <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">housing overtook food as the largest area of spending</span>. In addition, the share allocated to leisure grew considerably, whereas clothing came to represent only a small fraction of the budget.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In 1995</span>, food <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">accounted for</span> the largest proportion of household spending, at 30%, followed by housing at 25%. By 2025, however, this pattern had reversed: housing costs rose to 35%, <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">claiming the lion's share</span> of the budget, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">while the figure for food fell sharply to 18%</span>. Leisure <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">nearly doubled</span> in importance, climbing from 8% to 14%.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">By contrast</span>, spending on clothing <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">more than halved</span>, dropping from 12% to just 5%, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">which made it the smallest category in 2025</span>. The remaining two categories <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">remained relatively stable</span>: transport edged up from 15% to 16%, and utilities increased slightly from 10% to 12%.</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "The pie charts show the spending of households in 1995 and 2025. Overall the spending of households changed a lot in 30 years and people spend more money on housing now. In 1995 food was 30%, housing was 25%, transport was 15%, clothing was 12%, utilities was 10% and leisure was 8%. In 2025 housing was 35%, food was 18%, transport was 16%, leisure was 14%, utilities was 12% and clothing was 5%. So housing increase a lot and food decrease. Leisure also increase and clothing decrease. Transport and utilities are almost same.",
      flaws: [
        "Figures are copied as two lists with no comparison between the years for each category.",
        "No clear overview identifying the main trend (housing replacing food as the largest expense).",
        "Tense and agreement errors ('housing increase', 'utilities was', 'almost same').",
        "Extremely repetitive structure ('X was Y%') with no variation in vocabulary for proportions or change.",
      ],
    },
    keyTakeaways: [
      "With two pie charts, compare each category across the two years instead of describing each chart separately.",
      "Group categories by type of change (large rises, large falls, little change) to organise your body paragraphs.",
      "Vary proportion language: 'accounted for', 'made up', 'the lion's share', 'nearly doubled', 'more than halved'.",
    ],
  },

  // Model 12: Task 1 General Training - Formal Complaint Letter
  {
    id: "essay-letter-complaint-gym",
    taskType: "TASK_1_GENERAL",
    title: "Formal Letter: Complaint to a Gym Manager",
    prompt:
      "You recently joined a gym, but you are unhappy with the facilities and services. Write a letter to the manager of the gym. In your letter: explain why you joined the gym; describe the problems you have experienced; say what you would like the manager to do. Write at least 150 words. You do NOT need to write any addresses. Begin your letter as follows: Dear Sir or Madam,",
    band: 9.0,
    wordCount: 184,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: All three bullet points are fully covered with relevant detail, and the purpose of the letter is clear from the opening sentence. The requested action is specific and realistic.",
      coherenceAndCohesion:
        "Band 9.0: Each bullet point is addressed in its own paragraph, in the order given. Cohesive devices ('Unfortunately', 'Furthermore', 'In light of these issues') are used naturally.",
      lexicalResource:
        "Band 9.0: Consistently formal and precise register: 'out of order', 'falls well short of', 'advertised', 'partial refund', 'at your earliest convenience'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: A range of complex structures, including passive forms, relative clauses and polite indirect requests ('I would be grateful if...'), all used accurately.",
    },
    essayHtml: `<p>Dear Sir or Madam,</p>

<p>I am writing to express my dissatisfaction with the facilities at your gym, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">which I joined six weeks ago</span> on a twelve-month contract.</p>

<p>I chose your gym primarily because it was <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">advertised</span> as having modern equipment and a wide range of evening classes. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">As I work long hours</span>, the convenient location and late opening times were also important factors in my decision.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Unfortunately</span>, the reality <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">falls well short of</span> these promises. Three of the eight treadmills have been <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">out of order</span> since I joined, and the showers in the changing rooms are frequently cold. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Furthermore</span>, the yoga and spinning classes I was particularly interested in <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">have been cancelled without notice</span> on at least four occasions.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">In light of these issues</span>, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">I would be grateful if you could arrange</span> for the faulty equipment to be repaired promptly and ensure that classes run as scheduled. I would also like to request a <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">partial refund</span> of my membership fee for the period during which these services were unavailable.</p>

<p>I look forward to hearing from you at your earliest convenience.</p>

<p>Yours faithfully,<br />Daniel Hughes</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Dear Sir or Madam, I am writing this letter because I am not happy with your gym. I joined your gym last month because it is near my house and it has many machines. But there are many problems. Some machines are broken and nobody fix them. Also the shower water is cold and the classes are cancelled a lot. The staff is also not helpful when I ask them. This is very bad service. I want you to fix the machines and give me my money back. I hope you will do something quickly. Yours sincerely, Daniel",
      flaws: [
        "Inappropriate sign-off: 'Yours sincerely' with a first name only, when the letter begins 'Dear Sir or Madam'.",
        "Register is too informal and blunt for a complaint ('This is very bad service', 'give me my money back').",
        "Problems are described vaguely, without specific details such as how many machines or how often classes are cancelled.",
        "Grammatical errors ('nobody fix them') and no paragraphing to separate the three bullet points.",
      ],
    },
    keyTakeaways: [
      "A letter beginning 'Dear Sir or Madam' must end with 'Yours faithfully' followed by your full name.",
      "Give each bullet point its own paragraph and add precise details (numbers, dates, frequency) to make the complaint credible.",
      "Make requests politely but firmly using indirect forms such as 'I would be grateful if you could...'.",
    ],
  },

  // Model 13: Task 1 General Training - Informal Thank-You Letter
  {
    id: "essay-letter-thanking-friend",
    taskType: "TASK_1_GENERAL",
    title: "Informal Letter: Thanking a Friend for Their Hospitality",
    prompt:
      "You recently stayed for a few days at a friend's home in another city. Write a letter to your friend. In your letter: thank your friend for letting you stay; describe what you enjoyed most about your visit; invite your friend to come and stay with you. Write at least 150 words. You do NOT need to write any addresses. Begin your letter as follows: Dear ...,",
    band: 9.0,
    wordCount: 182,
    analysis: {
      taskAchievementOrResponse:
        "Band 9.0: All three bullet points are covered with vivid, personal detail, and the warm, appreciative tone is consistent throughout. The invitation includes practical details, making it genuine and specific.",
      coherenceAndCohesion:
        "Band 9.0: The letter flows naturally from thanks to memories to invitation. Informal linking ('Anyway', 'Speaking of which', 'That reminds me') suits the register without becoming repetitive.",
      lexicalResource:
        "Band 9.0: Natural, idiomatic informal language: 'made me feel right at home', 'went out of your way', 'the highlight of the trip', 'can't stop thinking about', 'return the favour'.",
      grammaticalRangeAndAccuracy:
        "Band 9.0: Accurate mix of tenses, conditionals ('If you're free...'), relative clauses and contractions appropriate to an informal letter.",
    },
    essayHtml: `<p>Dear Sophie,</p>

<p>I just wanted to say a huge thank you for letting me stay with you last week. You and Tom <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">made me feel right at home</span>, and I know you <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">went out of your way</span> to make my visit special, <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">even though you were both so busy at work</span>.</p>

<p>I loved every minute, but <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">the highlight of the trip</span> was definitely our day by the river. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">Cycling along the towpath and stopping for lunch at that little café</span> was exactly the break I needed. I also <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">can't stop thinking about</span> the curry you made on Saturday night, so you'll have to send me the recipe!</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Speaking of which</span>, I'd love to <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">return the favour</span>. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">If you're free over the bank holiday weekend in May</span>, why don't you both come and stay with me? My spare room has finally been decorated, and there's a food festival in the old town that I think you'd really enjoy. <span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Just let me know</span> which dates work for you and I'll start planning.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Thanks again</span> for such a wonderful few days.</p>

<p>Lots of love,<br />Emma</p>`,
    comparisonBand6: {
      band: 6.0,
      essayText:
        "Dear Sophie, Thank you very much for letting me stay in your house. It was very nice and I enjoyed it very much. Your family was very kind with me. Your house is very beautiful and your city is very interesting. I liked when we went to the river and we ate in the restaurant. The food was very delicious. I want to invite you to my house. You can come any time you want. We can go to many places together. I hope you will come. Write me soon. Best wishes, Emma",
      flaws: [
        "Overuse of 'very' and generic adjectives ('very nice', 'very beautiful', 'very delicious').",
        "The visit is described vaguely, with no specific personal memories to bring the letter to life.",
        "The invitation lacks detail (no suggested dates or plans), so the third bullet point is only partly developed.",
        "Grammatical slips ('I liked when we went', 'Write me soon') and no paragraphing.",
      ],
    },
    keyTakeaways: [
      "Informal letters still need full development of each bullet point; specific memories and plans make the letter convincing.",
      "Use natural idiomatic phrases ('made me feel right at home', 'return the favour') instead of repeating 'very' with basic adjectives.",
      "Match the opening and closing to the relationship: a first-name greeting pairs with an informal sign-off such as 'Lots of love' or 'Best wishes'.",
    ],
  },
];

/** URL slug for a model essay's page (/model-answers/[slug]), e.g. "essay-ai-teachers" → "ai-teachers". */
export function essaySlug(essay: Pick<ModelEssay, "id">): string {
  return essay.id.replace(/^essay-/, "");
}

/** Canonical path for a model essay's page. */
export function essayPath(essay: Pick<ModelEssay, "id">): string {
  return `/model-answers/${essaySlug(essay)}`;
}

/** Looks up a model essay by its page slug. */
export function findEssayBySlug(slug: string): ModelEssay | undefined {
  return MODEL_ESSAYS.find((essay) => essaySlug(essay) === slug);
}

/** Human-readable label for each writing task type. */
export const ESSAY_TASK_LABELS: Record<ModelEssay["taskType"], string> = {
  TASK_2: "Writing Task 2 essay",
  TASK_1_ACADEMIC: "Academic Writing Task 1 report",
  TASK_1_GENERAL: "General Training Task 1 letter",
};
