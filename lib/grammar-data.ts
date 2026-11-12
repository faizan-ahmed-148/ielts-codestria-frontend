// Original grammar exercises targeting common IELTS Writing and Speaking errors.
// Plain data so the server page can render the rule summaries for indexing.

export type GrammarQuestion =
  | { kind: "mcq"; prompt: string; options: string[]; answer: number; explanation: string }
  | { kind: "fill"; prompt: string; accept: string[]; explanation: string };

export interface GrammarTopic {
  id: string;
  title: string;
  /** One-paragraph rule summary rendered server-side. */
  rule: string;
  example: { wrong: string; right: string };
  questions: GrammarQuestion[];
}

const mcq = (prompt: string, options: string[], answer: number, explanation: string): GrammarQuestion => ({
  kind: "mcq",
  prompt,
  options,
  answer,
  explanation,
});
const fill = (prompt: string, accept: string[], explanation: string): GrammarQuestion => ({
  kind: "fill",
  prompt,
  accept,
  explanation,
});

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "articles",
    title: "Articles (a, an, the, zero)",
    rule: "Use a/an for a singular countable noun mentioned for the first time or as one of many. Use the for something specific, already mentioned, unique, or defined by a phrase after it (the number of students). Use no article for general plural and uncountable nouns (Pollution harms health). Superlatives and ordinal numbers take the.",
    example: { wrong: "The pollution is a serious problem in the big cities.", right: "Pollution is a serious problem in big cities." },
    questions: [
      mcq("___ number of tourists rose sharply after 2010.", ["A", "The", "An", "(no article)"], 1, "'The number of' refers to one specific figure, so it takes 'the'. Compare 'a number of tourists' (= several tourists)."),
      mcq("___ unemployment is a major concern for young people.", ["The", "An", "A", "(no article)"], 3, "Unemployment is an uncountable noun used in a general sense, so no article is needed."),
      mcq("The chart shows ___ percentage of households with internet access.", ["a", "the", "an", "(no article)"], 1, "It is a specific percentage defined by the phrase that follows ('of households...'), so use 'the'."),
      mcq("It was ___ most popular destination in 2019.", ["a", "an", "the", "(no article)"], 2, "Superlatives always take 'the'."),
      mcq("Many people believe that ___ university education should be free.", ["the", "a", "an", "(no article)"], 3, "Here 'university education' is general and uncountable, so no article."),
      fill("She has ___ honours degree in economics. (a / an / the)", ["an"], "'Honours' begins with a vowel sound (the h is silent), so use 'an'."),
      fill("Japan had the highest figure, followed by ___ United States. (a / an / the)", ["the"], "Country names containing 'States', 'Kingdom' or 'Republic' take 'the'."),
      mcq("Governments should invest in ___ public transport.", ["a", "the", "an", "(no article)"], 3, "'Public transport' in general is uncountable and takes no article."),
      mcq("There was ___ slight fall in sales in March.", ["a", "the", "an", "(no article)"], 0, "A singular countable noun ('fall') mentioned for the first time takes 'a'."),
      fill("Water consumption in ___ industrial sector doubled. (a / an / the)", ["the"], "A specific sector (one of those shown in the chart) takes 'the'."),
    ],
  },
  {
    id: "agreement",
    title: "Subject–verb agreement",
    rule: "The verb agrees with the head noun of the subject, not with the nearest noun. 'The number of' takes a singular verb; 'a number of' takes a plural verb. Uncountable nouns (information, research, evidence) and words like 'each' and 'every' take singular verbs. Percentages agree with the noun after 'of'.",
    example: { wrong: "The number of cars have increased.", right: "The number of cars has increased." },
    questions: [
      mcq("The proportion of elderly people ___ expected to rise.", ["are", "is", "were", "have been"], 1, "The head noun is 'proportion' (singular), so use 'is'."),
      mcq("A number of students ___ complained about the fees.", ["has", "have", "is", "was"], 1, "'A number of' means 'several', so the verb is plural."),
      mcq("Each of the countries ___ a different policy.", ["have", "has", "are having", "were"], 1, "'Each' is singular."),
      mcq("The information in these reports ___ out of date.", ["are", "were", "is", "have been"], 2, "'Information' is uncountable and takes a singular verb."),
      mcq("Sixty percent of the population ___ in cities.", ["live", "lives", "are living", "have lived"], 1, "'Population' is treated as singular, so the percentage takes 'lives'."),
      mcq("Twenty percent of the respondents ___ unhappy.", ["was", "is", "were", "has been"], 2, "'Respondents' is plural, so the percentage takes a plural verb."),
      fill("Neither the teacher nor the students ___ aware of the change. (was / were)", ["were"], "With 'neither... nor', the verb agrees with the nearer subject ('students')."),
      mcq("The cost of living in big cities ___ risen steadily.", ["have", "has", "are", "were"], 1, "The head noun is 'cost', not 'cities'."),
      fill("Everyone ___ the right to education. (have / has)", ["has"], "Indefinite pronouns such as 'everyone' take singular verbs."),
      mcq("The police ___ investigating the incident.", ["is", "are", "was", "has"], 1, "'Police' is always plural in English."),
    ],
  },
  {
    id: "tenses",
    title: "Tenses for Task 1 (past, future, present perfect)",
    rule: "Describe data from a finished past period in the past simple (rose, fell). Use future forms for projections (is expected/predicted to reach, will rise). Use the present perfect for change from the past up to now when no finished time is given (has increased since 2000). Use the present simple for what a chart shows (The graph shows) and for processes and maps.",
    example: { wrong: "In 2010, sales have increased to 500 units.", right: "In 2010, sales increased to 500 units." },
    questions: [
      mcq("Between 1990 and 2000, car ownership ___ significantly.", ["has risen", "rises", "rose", "is rising"], 2, "A finished past period takes the past simple."),
      mcq("By 2040, the population ___ 10 million.", ["reached", "is predicted to reach", "has reached", "reaches"], 1, "Projections use future forms such as 'is predicted to reach'."),
      mcq("The line graph ___ the number of visitors to three museums.", ["showed", "is showing", "shows", "has shown"], 2, "Use the present simple to say what a chart shows."),
      mcq("Since 2015, the price of housing ___ steadily.", ["increased", "has increased", "increases", "was increasing"], 1, "'Since' + a point in time up to now takes the present perfect."),
      fill("In 2005, exports ___ (peak) at 40 million tonnes.", ["peaked"], "Finished past time ('in 2005') takes the past simple."),
      mcq("By 2020, the figure ___ to 60%, where it remained.", ["has climbed", "had climbed", "climbs", "will climb"], 1, "'By' + a past time, describing completion before that point, uses the past perfect."),
      mcq("In the process, the clay ___ into bricks.", ["shaped", "is shaped", "was shaping", "has shaped"], 1, "Processes use the present simple passive."),
      fill("It is estimated that the number ___ (double) by 2050. (use will)", ["will double", "will have doubled"], "Future projection: 'will double' (or 'will have doubled' for completion before 2050)."),
      mcq("Over the next decade, demand ___ to fall.", ["was forecast", "is forecast", "forecast", "has forecast"], 1, "A forecast about the future from now: present simple passive 'is forecast'."),
      mcq("Unemployment ___ at 5% throughout the 1990s.", ["has remained", "remains", "remained", "is remaining"], 2, "The 1990s are finished, so use the past simple."),
    ],
  },
  {
    id: "countable",
    title: "Countable and uncountable nouns",
    rule: "Uncountable nouns (advice, information, research, equipment, furniture, evidence, knowledge, traffic, accommodation) have no plural and cannot take a/an. Use much/little/an amount of with uncountables and many/few/a number of with countables. To count them, use a unit: a piece of advice, an item of equipment.",
    example: { wrong: "Students need more informations and advices.", right: "Students need more information and advice." },
    questions: [
      mcq("There is not ___ evidence to support this claim.", ["many", "much", "a few", "several"], 1, "'Evidence' is uncountable, so use 'much'."),
      mcq("She gave me some useful ___.", ["advices", "advice", "an advice", "advise"], 1, "'Advice' is uncountable; 'advise' is the verb."),
      mcq("The ___ of plastic waste has grown.", ["number", "amount", "many", "few"], 1, "'Waste' here is uncountable, so use 'amount'."),
      mcq("Fewer ___ are choosing to study languages.", ["student", "students", "studentship", "a student"], 1, "'Fewer' is used with plural countable nouns."),
      fill("A great deal of ___ has been done on this topic. (research / researches)", ["research"], "'Research' is uncountable in academic English."),
      mcq("The school bought new ___ for the laboratory.", ["equipments", "equipment", "an equipment", "equipment pieces"], 1, "'Equipment' is uncountable."),
      mcq("There is less ___ in rural areas.", ["traffics", "cars", "traffic", "vehicle"], 2, "'Less' goes with uncountables such as 'traffic'. ('Fewer cars' would be correct.)"),
      fill("Finding ___ in the city centre is expensive. (accommodation / accommodations)", ["accommodation"], "In British English 'accommodation' is uncountable."),
      mcq("Only a ___ people attended the meeting.", ["little", "few", "much", "less"], 1, "'People' is plural countable, so use 'a few'."),
      mcq("Technology has changed our ___ of the world.", ["knowledges", "knowledge", "a knowledge", "knowings"], 1, "'Knowledge' is uncountable."),
    ],
  },
  {
    id: "data-prepositions",
    title: "Prepositions for data (by, to, from, at, of)",
    rule: "Rose to = the final figure; rose by = the size of the change; from X to Y = start and end points; peaked/stood at = a level; a rise of 10% = noun + of for the size. Use 'in' for years and months and 'between... and' or 'from... to' for periods.",
    example: { wrong: "Sales increased with 20% at 2015.", right: "Sales increased by 20% in 2015." },
    questions: [
      mcq("Profits rose ___ 5 million ___ 8 million dollars.", ["by / to", "from / to", "at / by", "of / at"], 1, "'From X to Y' gives the starting and ending figures."),
      mcq("The figure increased ___ 15%, reaching 40%.", ["to", "by", "at", "on"], 1, "'By' shows the size of the change."),
      mcq("Unemployment peaked ___ 12% in 1993.", ["on", "to", "at", "by"], 2, "'Peaked at' and 'stood at' describe a level."),
      mcq("There was a dramatic increase ___ 30% in the number of cyclists.", ["by", "of", "at", "with"], 1, "After the noun 'increase', the size takes 'of'."),
      fill("Sales fell ___ 200 units, their lowest level. (by / to)", ["to"], "'Fell to' gives the final figure (the lowest level)."),
      mcq("There was a sharp rise ___ the price of oil.", ["of", "in", "at", "to"], 1, "'A rise in' + the thing that changed; 'a rise of' + the amount."),
      mcq("The number remained stable ___ 2000 and 2005.", ["from", "between", "during", "in"], 1, "'Between X and Y' for a period."),
      fill("Coffee consumption doubled ___ 2010. (in / on / at)", ["in"], "Use 'in' with years."),
      mcq("Car sales accounted ___ 40% of the total.", ["of", "to", "for", "by"], 2, "The verb is 'account for'."),
      mcq("The proportion of women rose ___ 25% ___ 1990 to 32% in 2000.", ["to / from", "from / in", "by / at", "at / on"], 1, "'From 25% in 1990 to 32% in 2000': start figure with time, end figure with time."),
    ],
  },
  {
    id: "relative-clauses",
    title: "Relative clauses",
    rule: "Use who for people, which for things, whose for possession, where for places and when for times. 'That' can replace who/which only in defining clauses. Non-defining clauses add extra information, are separated by commas and never use 'that'. 'Which' can refer to a whole previous clause.",
    example: { wrong: "London, that is the capital, has the highest rents.", right: "London, which is the capital, has the highest rents." },
    questions: [
      mcq("Students ___ work part-time often have less time to study.", ["which", "who", "whose", "where"], 1, "Use 'who' for people."),
      mcq("Paris, ___ attracts millions of tourists, is expensive.", ["that", "which", "who", "where"], 1, "Non-defining clause (with commas) about a thing: 'which', never 'that'."),
      mcq("The town ___ I grew up has changed a lot.", ["which", "where", "when", "who"], 1, "For a place + full clause, use 'where'."),
      mcq("Parents ___ children use social media should monitor them.", ["who", "whose", "which", "that"], 1, "Possession: 'whose'."),
      mcq("Prices rose sharply, ___ led to protests.", ["that", "what", "which", "who"], 2, "'Which' can refer to the whole previous clause."),
      fill("1990 was the year ___ the internet became public. (when / where)", ["when"], "Use 'when' after a time noun."),
      mcq("The policy ___ was introduced in 2015 has been successful.", ["what", "who", "that", "where"], 2, "In a defining clause about a thing, 'that' (or 'which') is correct."),
      mcq("Choose the correct sentence.", [
        "My brother who lives in Canada is a doctor (I have one brother).",
        "My brother, who lives in Canada, is a doctor (I have one brother).",
        "My brother, that lives in Canada, is a doctor.",
        "My brother which lives in Canada is a doctor.",
      ], 1, "With only one brother, the clause is extra information, so use commas and 'who'."),
      fill("The scientist ___ research was published won an award. (whose / who's)", ["whose"], "'Whose' shows possession; 'who's' means 'who is'."),
      mcq("This is the reason ___ many people move abroad.", ["which", "why", "where", "what"], 1, "After 'the reason', use 'why'."),
    ],
  },
  {
    id: "conditionals",
    title: "Conditionals",
    rule: "Zero: if + present, present (general truths). First: if + present, will + verb (real future possibilities). Second: if + past, would + verb (hypothetical or unlikely). Third: if + past perfect, would have + past participle (past regrets). Never put will or would in the if-clause. 'Unless' means 'if not'.",
    example: { wrong: "If governments will invest more, crime would fall.", right: "If governments invested more, crime would fall." },
    questions: [
      mcq("If the government ___ taxes, people will spend less.", ["will raise", "raises", "raised", "would raise"], 1, "First conditional: if + present simple."),
      mcq("If I ___ the prime minister, I would ban plastic bags.", ["am", "will be", "were", "had been"], 2, "Second conditional (hypothetical): if + past; 'were' is preferred for all persons."),
      mcq("If you heat ice, it ___.", ["melts", "would melt", "melted", "will have melted"], 0, "Zero conditional for scientific facts."),
      mcq("If they had planned better, the project ___.", ["would succeed", "will succeed", "would have succeeded", "succeeded"], 2, "Third conditional: would have + past participle."),
      fill("___ action is taken, the problem will get worse. (Unless / If)", ["unless"], "'Unless' = 'if not': if action is not taken, the problem will get worse."),
      mcq("If more people ___ public transport, there would be less congestion.", ["use", "used", "will use", "would use"], 1, "Second conditional: if + past simple."),
      mcq("Choose the correct sentence.", [
        "If cities would build more parks, people would be healthier.",
        "If cities built more parks, people would be healthier.",
        "If cities build more parks, people would be healthier.",
        "If cities built more parks, people will be healthier.",
      ], 1, "Second conditional: past simple in the if-clause, 'would' in the main clause."),
      fill("If I had known about the scholarship, I ___ applied. (would have / would)", ["would have"], "Third conditional: 'would have' + past participle."),
      mcq("Provided that students ___ hard, they will pass.", ["will work", "work", "would work", "worked"], 1, "'Provided that' works like 'if' in a first conditional."),
      mcq("Were the law ___, crime might fall.", ["changing", "changed", "to change", "change"], 1, "Inverted second conditional: 'Were the law changed' = 'If the law were changed'."),
    ],
  },
  {
    id: "linking",
    title: "Linking words and punctuation",
    rule: "Conjunctions (but, and, so, because, although, while) join clauses within a sentence. Sentence adverbs (However, Therefore, Moreover, In addition) start a new sentence or follow a semicolon, and are followed by a comma. 'Despite' and 'in spite of' take a noun or -ing form, not a clause. Avoid joining two full sentences with only a comma (comma splice).",
    example: { wrong: "Cars are convenient, however they cause pollution.", right: "Cars are convenient; however, they cause pollution." },
    questions: [
      mcq("___ the high cost, many families choose private schools.", ["Although", "Despite", "However", "Even"], 1, "'Despite' + noun phrase."),
      mcq("___ it is expensive, many families choose private schools.", ["Despite", "In spite of", "Although", "However"], 2, "'Although' + full clause."),
      mcq("Choose the correctly punctuated sentence.", [
        "Prices rose, however demand stayed high.",
        "Prices rose; however, demand stayed high.",
        "Prices rose however, demand stayed high.",
        "Prices rose, however, demand stayed high.",
      ], 1, "'However' between two clauses needs a semicolon (or full stop) before and a comma after."),
      mcq("Technology saves time. ___, it can isolate people.", ["Because", "Although", "On the other hand", "Despite"], 2, "A contrasting sentence adverb at the start of a new sentence."),
      fill("In spite of ___ (work) long hours, he earned little.", ["working"], "'In spite of' + -ing form."),
      mcq("Online learning is flexible. ___, it is often cheaper.", ["Moreover", "Whereas", "Unless", "Because"], 0, "'Moreover' adds a supporting point."),
      mcq("Choose the sentence with NO comma splice.", [
        "Many people work from home, this saves commuting time.",
        "Many people work from home, which saves commuting time.",
        "Many people work from home, it saves commuting time.",
        "Many people work from home, so, it saves commuting time.",
      ], 1, "A relative clause with 'which' can follow a comma; two independent clauses cannot be joined by a comma alone."),
      mcq("Sales in Asia grew, ___ sales in Europe declined.", ["whereas", "however", "despite", "moreover"], 0, "'Whereas' is a conjunction that joins two contrasting clauses."),
      fill("The roads were icy. ___, several schools closed. (Therefore / Because)", ["therefore"], "'Therefore' introduces a result in a new sentence."),
      mcq("___ the fact that it rained, the event went ahead.", ["Although", "Despite", "Even though", "However"], 1, "'Despite the fact that' + clause is correct; 'Although the fact that' is not."),
    ],
  },
  {
    id: "passive",
    title: "Passive voice",
    rule: "Form the passive with be + past participle (is made, was built, has been reduced, will be introduced). Use it when the action matters more than who did it, in process diagrams, and for formal reporting (It is believed that...). Add 'by' only when the agent is important.",
    example: { wrong: "The leaves are pick and then they dried.", right: "The leaves are picked and then dried." },
    questions: [
      mcq("First, the beans ___ by hand.", ["pick", "are picked", "picked", "are picking"], 1, "Process: present simple passive."),
      mcq("The bridge ___ in 1890.", ["built", "was built", "has built", "is built"], 1, "Past event: past simple passive."),
      mcq("New regulations ___ next year.", ["will introduce", "will be introduced", "are introducing", "introduced"], 1, "Future passive: will be + past participle."),
      fill("It ___ (believe) that exercise improves memory. (present passive)", ["is believed"], "Impersonal passive for reporting: 'It is believed that...'."),
      mcq("The old factory ___ into flats since the map was drawn.", ["converted", "has been converted", "is converting", "was convert"], 1, "Change up to now: present perfect passive."),
      mcq("Choose the sentence where the passive is most appropriate.", [
        "Someone grinds the wheat into flour.",
        "The wheat is ground into flour.",
        "The wheat grinds into flour by someone.",
        "They are grinding the wheat flour.",
      ], 1, "In a process description, the agent is unimportant, so use the passive."),
      fill("The results ___ (publish) last month.", ["were published"], "Past simple passive, plural subject."),
      mcq("The water ___ before it is bottled.", ["filters", "is filtered", "filtered", "is filtering"], 1, "Process step: present simple passive."),
      mcq("A new park is ___ near the station.", ["being built", "been built", "build", "building built"], 0, "Present continuous passive: is being + past participle."),
      mcq("The trees ___ to make room for a car park.", ["have cut down", "have been cut down", "has been cut down", "are cut downing"], 1, "Plural subject, present perfect passive: have been + past participle."),
    ],
  },
  {
    id: "comparatives",
    title: "Comparatives and superlatives",
    rule: "One-syllable adjectives add -er/-est (cheaper, the cheapest); most longer adjectives use more/the most (more expensive). Irregular: good–better–best, bad–worse–worst, far–further–furthest. Use 'than' after comparatives, never 'then'. For similarity use as... as; to qualify a difference use slightly, considerably, significantly, far, or twice as... as.",
    example: { wrong: "Rents in London are more higher then in Leeds.", right: "Rents in London are considerably higher than in Leeds." },
    questions: [
      mcq("Travelling by train is ___ than flying.", ["more slow", "slower", "slowest", "most slow"], 1, "One-syllable adjective: add -er."),
      mcq("This was the ___ year on record.", ["hotter", "most hot", "hottest", "more hotter"], 2, "Superlative of 'hot' doubles the consonant: hottest."),
      mcq("The results were ___ than expected.", ["more bad", "worse", "worst", "badder"], 1, "Irregular: bad–worse–worst."),
      fill("Electric cars are ___ than petrol cars. (expensive, comparative)", ["more expensive"], "Long adjectives use 'more'."),
      mcq("Women spent ___ time on housework as men.", ["twice as much", "twice more", "two times more than", "double as"], 0, "Multiples use 'twice as much/many... as'."),
      mcq("Spending on food was ___ higher than spending on transport.", ["much more", "significantly", "very", "most"], 1, "Modify comparatives with 'significantly', 'much', 'far' — not 'very'."),
      mcq("Canada had the ___ figure of the four countries.", ["lower", "lowest", "most low", "less"], 1, "Comparing more than two: superlative."),
      fill("The figure for 2010 was almost the same ___ that for 2000. (as / than)", ["as"], "'The same as' — never 'the same than'."),
      mcq("The ___ you practise, the more fluent you become.", ["most", "more", "much", "many"], 1, "Double comparative: 'the more..., the more...'."),
      mcq("Choose the correct sentence.", [
        "Japan's population is older then Brazil's.",
        "Japan's population is older than Brazil's.",
        "Japan's population is more old than Brazil's.",
        "Japan's population is oldest than Brazil's.",
      ], 1, "Use 'than' (not 'then') after a comparative."),
    ],
  },
];
