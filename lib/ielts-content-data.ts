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
    wordCount: 312,
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

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Admittedly, computational platforms possess</span> formidable advantages in pedagogical efficiency. Machine learning algorithms can analyze a pupil's knowledge gaps in real time, calibrating drill difficulty to match cognitive capacity far more systematically than a single teacher overseeing a crowded classroom. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Consequently, for rote learning, vocabulary memorization, and mathematical derivation</span>, AI represents an extraordinary diagnostic asset that will streamline homework supervision.</p>

<p><span class="bg-blue-100 text-blue-900 px-1 rounded font-medium">Nevertheless, true education extends far beyond</span> mere data transmission. <span class="bg-purple-100 text-purple-900 px-1 rounded font-medium">What automated software fundamentally lacks is</span> the capacity for empathetic mentorship and moral cultivation. Exceptional educators do not merely impart syllabus content; they detect subtle non-verbal cues of anxiety or disenfranchisement, adapt their interpersonal demeanor, and instill intellectual curiosity. <span class="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">Crucially, human teachers model ethical dilemmas</span>, foster classroom debate, and guide students through conflict resolution—interpersonal competencies that cannot be codified into algorithmic matrices.</p>

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
    wordCount: 194,
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
    wordCount: 326,
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
];
