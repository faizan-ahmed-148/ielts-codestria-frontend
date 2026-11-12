// Original academic-style passages for the reading speed test. Plain data so
// both the server page and the interactive client can import it.

export interface SpeedQuestion {
  question: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
}

export interface SpeedPassage {
  id: string;
  title: string;
  topic: string;
  paragraphs: string[];
  questions: SpeedQuestion[];
}

export const SPEED_PASSAGES: SpeedPassage[] = [
  {
    id: "urban-heat",
    title: "Cooling the City",
    topic: "Environment",
    paragraphs: [
      "On a still summer afternoon, the centre of a large city can be several degrees warmer than the farmland that surrounds it. This phenomenon, known as the urban heat island effect, was first described in the early nineteenth century by an amateur meteorologist who noticed that thermometers in London consistently read higher than those in nearby villages. Two centuries later, the effect has become a pressing concern for planners, because rising global temperatures and growing urban populations mean that more people than ever are exposed to dangerous heat.",
      "The causes are well understood. Asphalt roads, concrete pavements and dark rooftops absorb sunlight during the day and release it slowly at night, so that cities often fail to cool down after sunset. Tall buildings trap warm air and block the breezes that might otherwise carry it away. Air-conditioning units, vehicles and factories add further heat directly. Meanwhile, the trees and open soil that would normally cool the air through evaporation have largely been replaced by impermeable surfaces.",
      "The consequences extend beyond discomfort. Hospital admissions rise sharply during heatwaves, particularly among elderly residents and people with heart or lung conditions. Demand for electricity peaks as households switch on fans and air conditioners, which in turn increases emissions from power stations. Some studies have also linked higher night-time temperatures to poorer sleep and lower productivity at work.",
      "Fortunately, a number of relatively simple measures can reduce the effect. One of the most effective is to increase tree cover. A mature tree can shade a pavement for most of the day, and the water it releases through its leaves lowers the surrounding air temperature. Cities such as Melbourne have set targets to double their canopy cover within a few decades. Another approach is the so-called cool roof, which uses reflective paint or pale materials to bounce sunlight back into the atmosphere rather than absorbing it. Green roofs, planted with grasses and small shrubs, offer similar benefits while also absorbing rainwater.",
      "These solutions are not without difficulties. Trees take years to mature and require space that may already be occupied by pipes and cables beneath the street. Reflective surfaces can create glare for pedestrians and drivers. Perhaps most importantly, the benefits of cooling measures have often been concentrated in wealthier neighbourhoods, while poorer districts, which tend to have fewer parks, remain the hottest. Researchers increasingly argue that tackling urban heat is therefore a question of fairness as well as engineering.",
    ],
    questions: [
      {
        question: "Who first described the urban heat island effect?",
        options: ["A city planner in Melbourne", "An amateur weather observer", "A team of hospital doctors", "A nineteenth-century architect"],
        answer: 1,
      },
      {
        question: "Why do many cities fail to cool down at night?",
        options: [
          "Air conditioners are switched off after sunset",
          "Breezes are stronger during the day",
          "Hard surfaces release stored heat slowly",
          "Trees release warm air in the evening",
        ],
        answer: 2,
      },
      {
        question: "What is an advantage of green roofs mentioned in the passage?",
        options: ["They absorb rainwater", "They reduce glare for drivers", "They mature faster than trees", "They are cheaper than reflective paint"],
        answer: 0,
      },
      {
        question: "What is the writer's main point in the final paragraph?",
        options: [
          "Reflective roofs are too dangerous to use",
          "Cooling measures have not always been distributed fairly",
          "Trees are the only effective solution",
          "Engineers have solved most of the problem",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "bilingual-mind",
    title: "The Bilingual Mind",
    topic: "Psychology",
    paragraphs: [
      "For much of the twentieth century, parents and teachers were warned that bringing up a child with two languages could cause confusion and delay. Early studies appeared to show that bilingual children scored lower on intelligence tests than their monolingual peers. Later researchers, however, pointed out serious flaws in this work. Many of the bilingual children tested were recent immigrants from poorer families, and they were often assessed in a language they had only just begun to learn. Once these factors were controlled, the supposed disadvantage largely disappeared.",
      "Attention then turned to the possibility that speaking two languages might bring cognitive benefits. Because both languages remain active in the brain even when only one is being used, bilingual speakers must constantly suppress the language that is not needed. Some psychologists proposed that this daily practice strengthens executive function, the set of mental skills that allows us to focus attention, ignore distractions and switch between tasks. Experiments in the early 2000s seemed to support this idea, with bilingual children and adults performing faster on tasks that required them to ignore misleading information.",
      "Perhaps the most widely reported claim concerned ageing. Several hospital-based studies found that bilingual patients developed the symptoms of dementia four to five years later, on average, than monolingual patients. This led to the suggestion that a lifetime of managing two languages builds a kind of cognitive reserve, allowing the brain to cope with damage for longer before memory and reasoning are affected.",
      "In recent years, though, the picture has become more complicated. Large studies with carefully matched groups have frequently failed to find any bilingual advantage in executive function. Critics argue that earlier positive results may have been influenced by small sample sizes and by a tendency for journals to publish exciting findings rather than negative ones. Others respond that bilingualism is not a single experience: a person who switches between languages many times a day may train their brain differently from someone who uses one language at home and another at work.",
      "What is not in doubt is that the old fears were misplaced. Children raised with two languages reach their developmental milestones at a normal rate, and any small gap in vocabulary in each separate language tends to close by school age. Whether or not bilingualism makes people sharper thinkers, it clearly provides access to additional cultures, friendships and job opportunities, and those benefits alone may be reason enough to encourage it.",
    ],
    questions: [
      {
        question: "Why were early studies of bilingual children unreliable?",
        options: [
          "They tested children in a language they barely knew",
          "They included too many monolingual children",
          "They focused only on adults",
          "They were never published",
        ],
        answer: 0,
      },
      {
        question: "According to the passage, executive function includes the ability to",
        options: ["learn new vocabulary quickly", "remember childhood events", "ignore distractions and switch tasks", "speak without an accent"],
        answer: 2,
      },
      {
        question: "What explanation do critics give for earlier positive results?",
        options: [
          "Bilingual participants were older",
          "Small samples and a bias towards publishing exciting findings",
          "The tests were too difficult for monolingual speakers",
          "Researchers used hospital patients only",
        ],
        answer: 1,
      },
      {
        question: "Which statement best reflects the writer's conclusion?",
        options: [
          "Bilingualism certainly prevents dementia",
          "Bilingual children should delay school",
          "The cognitive benefits are proven beyond doubt",
          "Bilingualism is worthwhile even if cognitive benefits are uncertain",
        ],
        answer: 3,
      },
    ],
  },
  {
    id: "container-shipping",
    title: "The Box That Changed the World",
    topic: "Economy and history",
    paragraphs: [
      "Until the middle of the twentieth century, loading a cargo ship was slow, expensive and dangerous work. Goods arrived at the port in sacks, barrels and wooden crates of every size, and teams of dockworkers carried them on board one item at a time. A single ship could spend a week or more in port, and theft and damage were common. By some estimates, the cost of handling cargo at each end of a voyage was greater than the cost of carrying it across the ocean.",
      "The solution that transformed this system was remarkably simple: a standard steel box that could be lifted directly from a lorry onto a ship and from the ship onto a train without ever being opened. The idea of shipping goods in containers was not new, but it was an American trucking businessman, Malcolm McLean, who in 1956 first demonstrated its commercial potential when he sent fifty-eight containers from New Jersey to Texas on a converted oil tanker. The cost of loading fell dramatically almost overnight.",
      "Widespread adoption, however, took more than a decade. Ports needed enormous cranes and large areas of flat land on which to stack containers, and many older harbours, built in the narrow streets of city centres, could not provide them. Shipping companies used containers of different dimensions, so a box from one firm might not fit the equipment of another. It was only after international agreements on standard sizes were reached in the late 1960s that the system could operate globally. Dockworkers' unions also resisted the change, correctly predicting that it would eliminate a large proportion of their jobs.",
      "Once these obstacles had been overcome, the effects were profound. Because transport became cheap and predictable, manufacturers could locate factories wherever labour and materials were least expensive, confident that components and finished products could be moved reliably across the world. Economists have argued that containerisation did more to expand international trade in the late twentieth century than any trade agreement. The busiest ports moved away from historic city centres to new deep-water sites, and former docklands in cities such as London and New York were redeveloped as offices and housing.",
      "Today, around ninety percent of manufactured goods travel by sea, most of them in containers, and the largest vessels can carry more than twenty thousand boxes. Yet the system's efficiency also creates vulnerability. When a single giant ship blocked the Suez Canal for six days in 2021, hundreds of other vessels were delayed, revealing how dependent the global economy has become on a small number of routes and ports.",
    ],
    questions: [
      {
        question: "What was a major problem with cargo handling before containers?",
        options: ["Ships were too small to cross oceans", "Handling costs could exceed the cost of the voyage", "Ports refused to accept wooden crates", "Lorries could not reach the ports"],
        answer: 1,
      },
      {
        question: "What did Malcolm McLean do in 1956?",
        options: ["Invented the steel container", "Built a new port in Texas", "Showed that container shipping could be profitable", "Negotiated international size standards"],
        answer: 2,
      },
      {
        question: "Which was NOT mentioned as an obstacle to adopting containers?",
        options: ["Lack of space in older ports", "Different container sizes", "Opposition from dockworkers", "A shortage of steel"],
        answer: 3,
      },
      {
        question: "What does the 2021 Suez Canal incident illustrate?",
        options: [
          "Containers are no longer efficient",
          "Global trade relies heavily on a few key routes",
          "Large ships are rarely delayed",
          "Ports in city centres are more reliable",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "sleep-memory",
    title: "Why We Sleep on It",
    topic: "Science",
    paragraphs: [
      "The advice to 'sleep on' a difficult decision is found in many languages, but only in recent decades have scientists begun to understand why it might be sound. It was once assumed that sleep was simply a period of rest, during which the brain switched off to recover its energy. Recordings of electrical activity in the sleeping brain have shown that this is far from the case. During certain stages of sleep, the brain is almost as active as it is during the day, and much of that activity appears to involve processing information gathered while we were awake.",
      "Sleep is not a uniform state. Over the course of a night, a sleeper passes through several cycles, each lasting roughly ninety minutes. Each cycle includes periods of deep, slow-wave sleep and periods of rapid eye movement, or REM, sleep, during which most vivid dreams occur. Deep sleep dominates the early part of the night, while REM sleep becomes longer towards morning. Researchers believe that the two stages contribute to memory in different ways.",
      "During deep sleep, the hippocampus, a region that temporarily stores new experiences, appears to replay the events of the day. Experiments with rats that had learned to run through a maze found that the same patterns of brain cell activity observed during learning were repeated during subsequent sleep, but at a much faster speed. This replay is thought to help transfer memories to the cortex, where they can be stored for the long term. In human studies, volunteers who learned lists of word pairs and then slept remembered considerably more the next morning than those who spent the same period awake.",
      "REM sleep, by contrast, seems to be associated with combining information in new ways. In one well-known experiment, participants were given a mathematical task that contained a hidden shortcut. Those who slept between two attempts at the task were more than twice as likely to discover the shortcut as those who stayed awake. Some scientists suggest that, by loosening the normal connections between ideas, REM sleep allows the brain to detect patterns that are not obvious during waking thought.",
      "These findings have practical implications, particularly for students. Staying up all night to revise may increase the amount of material studied, but it is likely to reduce how much of it is retained. Short daytime naps that include deep sleep have also been shown to improve learning. Nevertheless, sleep is not a substitute for study; it strengthens what has been learned but cannot create knowledge that was never acquired in the first place.",
    ],
    questions: [
      {
        question: "What did recordings of the sleeping brain reveal?",
        options: ["The brain switches off completely", "The brain can be highly active during sleep", "Dreams occur only in deep sleep", "Sleep cycles last about three hours"],
        answer: 1,
      },
      {
        question: "When does REM sleep become longer?",
        options: ["At the start of the night", "During daytime naps", "Towards the morning", "After a stressful day"],
        answer: 2,
      },
      {
        question: "What did the experiments with rats show?",
        options: [
          "Rats sleep less after learning",
          "Brain activity from learning was replayed faster during sleep",
          "Rats cannot learn mazes without sleep",
          "The cortex is inactive during sleep",
        ],
        answer: 1,
      },
      {
        question: "What is the writer's view on staying up all night to revise?",
        options: [
          "It is the most effective way to learn",
          "It improves creative problem-solving",
          "It may reduce how much is remembered",
          "It is acceptable if followed by a nap",
        ],
        answer: 2,
      },
    ],
  },
];

/** Word count of a passage (whitespace-separated tokens). */
export function passageWordCount(p: SpeedPassage) {
  return p.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

/** IELTS Reading demand used for interpretation (guidance only, not official). */
export const IELTS_READING_WORDS = 2700;
export const IELTS_READING_MINUTES = 60;

export const SPEED_BANDS = [
  { min: 0, max: 150, label: "Slow", note: "Below the pace needed to read all three passages in full. Focus on skimming for gist and scanning for keywords rather than reading every word." },
  { min: 150, max: 220, label: "Developing", note: "You can finish the test if you read selectively, but there is little time left for checking answers. Practise timed skimming." },
  { min: 220, max: 300, label: "Exam-ready", note: "A comfortable IELTS pace. You can read the passages and still leave time to locate and verify answers." },
  { min: 300, max: Infinity, label: "Fast", note: "Very fast. Make sure comprehension keeps up: in IELTS, accuracy matters more than speed." },
];
