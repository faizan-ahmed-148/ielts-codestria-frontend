import type { Guide } from "./types";

/**
 * Writing, Speaking and Exam Strategy guides (served at /guides/[slug]).
 * British English. Paragraph text may contain **bold** markers only.
 */

const DATE = "2026-11-12";

const opinionEssay: Guide = {
  slug: "ielts-writing-task-2-opinion-essay",
  category: "Writing",
  title: "IELTS Writing Task 2 Opinion Essay: Structure & Sample",
  description:
    "How to plan and write an IELTS Task 2 agree/disagree essay: a clear four-paragraph structure, a full sample plan, model paragraphs and the mistakes that cap your band.",
  keywords: [
    "IELTS opinion essay",
    "IELTS agree or disagree essay",
    "IELTS Writing Task 2 structure",
    "IELTS Task 2 sample answer",
    "to what extent do you agree",
    "IELTS essay introduction",
    "IELTS Task Response",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 9,
  summary:
    "An opinion essay asks for your position and wants it visible from the first paragraph to the last. This guide gives you a reliable four-paragraph structure, a five-minute planning routine, a worked sample plan with model paragraphs, and a checklist of the errors that most often hold candidates below Band 7.",
  body: [
    { type: "h2", text: "What an opinion essay question looks like" },
    {
      type: "p",
      text: "Opinion questions are the most common Task 2 type. They give you a statement and then ask for your view using one of a handful of instructions. Recognising the instruction matters, because it tells you whether you may take a partial position or should commit fully.",
    },
    {
      type: "table",
      head: ["Instruction", "What it allows", "Safe approach"],
      rows: [
        ["To what extent do you agree or disagree?", "Full or partial agreement", "Choose a clear degree (strongly, largely, partly) and keep it consistent"],
        ["Do you agree or disagree?", "Full or partial agreement", "Same as above; a one-sided answer is perfectly acceptable"],
        ["What is your opinion?", "Any reasoned position", "State it directly in the introduction"],
        ["Is this a positive or negative development?", "Your judgement on the change", "Decide which outweighs the other and say so early"],
      ],
    },
    {
      type: "p",
      text: "Every one of these needs a **clear position throughout the response**. That phrase comes straight from the Task Response criterion: at Band 7 the public descriptors expect a position that is clear throughout, and at Band 5 the position may be unclear or the development inadequate. The easiest way to lose marks is to sit on the fence for three paragraphs and only reveal your view in the conclusion.",
    },
    { type: "h2", text: "The four-paragraph structure" },
    {
      type: "p",
      text: "You do not need a complicated template. Four paragraphs give you enough room to develop two ideas properly within roughly 260–300 words, which is comfortably above the 250-word minimum and still realistic in 40 minutes.",
    },
    {
      type: "table",
      head: ["Paragraph", "Purpose", "Approx. words"],
      rows: [
        ["Introduction", "Paraphrase the topic and state your position in one clear sentence", "40–50"],
        ["Body 1", "Main reason for your view, explained and supported with an example", "90–110"],
        ["Body 2", "Second reason, or the opposing view followed by your rebuttal", "90–110"],
        ["Conclusion", "Restate your position and summarise the two reasons", "30–40"],
      ],
    },
    {
      type: "p",
      text: "If you strongly agree, both body paragraphs can support your view. If you partly agree, use one body paragraph for the side you accept and one for the side you reject, and make the introduction say exactly that. Either way, the reader should be able to predict the whole essay from your thesis statement.",
    },
    {
      type: "tip",
      text: "Write your thesis before anything else. If you cannot express your position in one sentence, you are not ready to start writing the body.",
    },
    { type: "h2", text: "A five-minute planning routine" },
    {
      type: "ol",
      items: [
        "**Underline the key terms** in the question (who, what, and any limiting words such as 'only', 'always' or 'should').",
        "**Decide your position** and its degree. Ask yourself which side you could explain most easily with concrete examples, not which side you believe is 'correct'.",
        "**List two reasons** in note form. For each, add one 'because' line and one example.",
        "**Draft the thesis** in your head or on scrap paper.",
        "**Check the plan answers every part** of the question. Some questions contain two parts; missing one limits Task Response.",
      ],
    },
    { type: "h2", text: "Worked example: a full sample plan" },
    {
      type: "example",
      title: "Sample question",
      text: "Some people believe that university education should be free for all students, paid for by the government. To what extent do you agree or disagree?",
    },
    {
      type: "table",
      head: ["Section", "Notes"],
      rows: [
        ["Position", "Partly agree: free tuition for undergraduates in fields society needs, but not unconditionally for everyone"],
        ["Body 1 (agree)", "Removes financial barriers → talented students from low-income families can attend → wider talent pool for nursing, teaching, engineering"],
        ["Body 2 (disagree)", "Fully free for all is costly and not well targeted → taxpayers fund courses with weak completion rates → better: free places linked to shortage subjects or means-testing"],
        ["Conclusion", "Government should fund much, but not all, higher education; target support where returns to society are clearest"],
      ],
    },
    { type: "h3", text: "Sample introduction" },
    {
      type: "example",
      text: "Whether the state should cover the full cost of university study is a question many governments are currently debating. While I agree that public money should remove financial barriers for capable students, I do not believe that every degree for every student should be free, because unconditional funding is expensive and poorly targeted.",
    },
    {
      type: "p",
      text: "Notice what this does. The first sentence paraphrases the topic without copying the question. The second sentence gives a precise, partial position and previews both body paragraphs. There is no vague 'this essay will discuss' filler.",
    },
    { type: "h3", text: "Sample body paragraph" },
    {
      type: "example",
      text: "The strongest argument for state funding is that it widens access to higher education. When tuition fees are high, academically able teenagers from low-income households may decide that a degree is simply too risky, even if they would excel. Removing that cost means that recruitment into demanding professions such as nursing, teaching and engineering depends on ability rather than family wealth. A country that loses capable graduates in these fields ultimately pays more, through staff shortages and reliance on overseas recruitment, than it would have spent on their tuition.",
    },
    {
      type: "p",
      text: "This paragraph follows a simple pattern: **topic sentence → explanation → example or consequence → link back to the position**. The example is not a statistic; it is a logical, specific illustration. You never need to invent numbers or research findings, and doing so does not earn extra credit.",
    },
    { type: "h3", text: "Sample conclusion" },
    {
      type: "example",
      text: "In conclusion, I partly agree with the proposal. Governments should fund university study generously enough that no capable student is excluded for financial reasons, but that support is more effective when it is directed at the students and subjects that bring the clearest benefits to society.",
    },
    { type: "h2", text: "Language for stating and maintaining a position" },
    {
      type: "table",
      head: ["Function", "Useful phrases"],
      rows: [
        ["Strong agreement", "I firmly believe that… / I entirely agree that…"],
        ["Partial agreement", "While I accept that…, I do not believe that… / I agree up to a point…"],
        ["Introducing a reason", "The main reason for this is that… / A more compelling argument is that…"],
        ["Conceding", "Admittedly,… / It is true that…; however,…"],
        ["Rebutting", "This argument overlooks the fact that… / This is unconvincing because…"],
        ["Concluding", "In conclusion,… / Overall, I remain convinced that…"],
      ],
    },
    {
      type: "p",
      text: "Use these sparingly. Examiners assessing Coherence and Cohesion look for linking that is accurate and appropriate, and over-use of connectives (for example, starting every sentence with 'Moreover' or 'Furthermore') is described in the public descriptors as a weakness at the lower bands.",
    },
    { type: "h2", text: "How the four criteria apply to an opinion essay" },
    {
      type: "table",
      head: ["Criterion", "What it means here"],
      rows: [
        ["Task Response", "Answer the exact question, give a clear position throughout, and extend and support your main ideas"],
        ["Coherence and Cohesion", "One central idea per paragraph, logical progression, accurate referencing (this, these, such) and linking"],
        ["Lexical Resource", "Precise topic vocabulary and natural collocation; less common words used accurately rather than forced"],
        ["Grammatical Range and Accuracy", "A mix of simple and complex sentences with a good proportion of error-free sentences"],
      ],
    },
    { type: "h2", text: "Common mistakes that cap your score" },
    {
      type: "ul",
      items: [
        "**Changing position mid-essay.** If your introduction says you agree, your conclusion must not suddenly favour the other side.",
        "**Writing about the general topic instead of the question.** An essay on 'education' does not answer a question about who should pay for it.",
        "**Listing too many ideas.** Three or four undeveloped reasons are weaker than two that are explained and illustrated.",
        "**Memorised introductions.** Generic sentences that could fit any question add words but no meaning, and memorised language is not credited.",
        "**Writing under 250 words.** Under-length responses are penalised under Task Response.",
        "**Spending all 60 minutes on Task 2 or Task 1.** Task 2 carries twice the weight of Task 1, so give it about 40 minutes, but do not abandon Task 1.",
      ],
    },
    { type: "h2", text: "A final checklist before you submit" },
    {
      type: "ul",
      items: [
        "Is my position stated in the introduction and repeated in the conclusion?",
        "Does each body paragraph begin with a sentence that states its main idea?",
        "Have I explained why, not just stated what?",
        "Have I checked subject–verb agreement, articles and plurals in at least one quick read-through?",
        "Is my word count above 250?",
      ],
    },
    {
      type: "tip",
      text: "Practise with a timer. Write ten opinion essays in 40 minutes each and compare them against model answers; the routine matters far more than any single phrase.",
    },
  ],
  faqs: [
    {
      q: "Can I fully agree in an IELTS opinion essay?",
      a: "Yes. A one-sided answer is completely acceptable as long as your position is clear throughout and both body paragraphs develop reasons that support it. Partial agreement is also fine, but it must be stated precisely.",
    },
    {
      q: "Should I use 'I' in an IELTS Task 2 essay?",
      a: "When the question asks for your opinion, using 'I believe' or 'In my view' is appropriate and makes your position clear. Avoid over-using it; once in the introduction and once in the conclusion is usually enough.",
    },
    {
      q: "How many words should an IELTS opinion essay be?",
      a: "The minimum is 250 words. Around 260–300 words is a practical target: long enough to develop two ideas, short enough to leave time to check your work.",
    },
    {
      q: "Do I need statistics or real research in my examples?",
      a: "No. Examiners assess how well you support your ideas, not whether your facts are verifiable. A specific, logical example from everyday life is better than an invented statistic.",
    },
    {
      q: "Is it better to write five paragraphs?",
      a: "Not necessarily. Five paragraphs can work, but three short body paragraphs are often less developed than two full ones. Four paragraphs is a reliable choice for most candidates.",
    },
  ],
  related: [
    { href: "/model-answers", label: "Read annotated Band 9 model essays" },
    { href: "/writing-checker", label: "Check your essay with the writing checker" },
    { href: "/band-descriptors", label: "Read the Writing band descriptors" },
    { href: "/tests", label: "Take a timed full mock test" },
  ],
};

const discussionEssay: Guide = {
  slug: "ielts-writing-task-2-discussion-essay",
  category: "Writing",
  title: "IELTS Discuss Both Views Essay: Structure and Examples",
  description:
    "Learn how to answer 'discuss both views and give your opinion' in IELTS Writing Task 2, with a balanced structure, sample plan, model paragraphs and useful language.",
  keywords: [
    "IELTS discussion essay",
    "discuss both views and give your opinion",
    "IELTS Writing Task 2 discussion",
    "IELTS both sides essay",
    "IELTS Task 2 sample paragraphs",
    "IELTS essay structure",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 9,
  summary:
    "A discussion essay asks you to explain two opposing views fairly and, usually, to say which one you prefer. The challenge is balance: each view needs genuine development, and your own opinion must still be clear. This guide shows a structure that achieves both, with a worked plan and sample paragraphs.",
  body: [
    { type: "h2", text: "Recognising the question" },
    {
      type: "p",
      text: "Discussion questions present two contrasting opinions and then give an instruction. The most common wording is 'Discuss both these views and give your own opinion.' Occasionally the question asks only to discuss both views, without requesting your opinion; read carefully, because the instruction defines what a complete answer looks like.",
    },
    {
      type: "example",
      title: "Sample question",
      text: "Some people think that children should begin learning a foreign language at primary school. Others believe it is better to start at secondary school. Discuss both these views and give your own opinion.",
    },
    {
      type: "p",
      text: "There are **three tasks** inside this question: explain view A, explain view B, and state your own position. Under Task Response, the public descriptors reward addressing all parts of the task; an essay that discusses both views brilliantly but never gives the requested opinion has only partly answered the question.",
    },
    { type: "h2", text: "Discussion versus opinion: the key difference" },
    {
      type: "table",
      head: ["Feature", "Opinion essay", "Discussion essay"],
      rows: [
        ["Main focus", "Your view and reasons for it", "Both views, explained fairly"],
        ["Body paragraphs", "Can both support your side", "One for each view"],
        ["Where your opinion goes", "Introduction, body and conclusion", "Introduction (briefly) and conclusion, or a separate final body paragraph"],
        ["Tone towards the other side", "Can rebut it directly", "Present it fairly before evaluating it"],
      ],
    },
    {
      type: "p",
      text: "A frequent mistake is to treat a discussion essay as an opinion essay, spending one sentence on the view you dislike and the rest on attacking it. Each view deserves its strongest reasons, explained as its supporters would explain them.",
    },
    { type: "h2", text: "Two reliable structures" },
    { type: "h3", text: "Structure A: four paragraphs" },
    {
      type: "table",
      head: ["Paragraph", "Content"],
      rows: [
        ["Introduction", "Paraphrase both views; state which you favour"],
        ["Body 1", "View A: its main reason, explained and illustrated"],
        ["Body 2", "View B (usually the one you favour): its main reason, explained and illustrated, with a sentence evaluating it"],
        ["Conclusion", "Summarise both views and restate your opinion with a brief justification"],
      ],
    },
    { type: "h3", text: "Structure B: five paragraphs" },
    {
      type: "p",
      text: "Some candidates prefer to keep the two views purely descriptive and add a third body paragraph for their own opinion. This is clear and logical, but it is harder to develop three paragraphs well in 40 minutes. If you choose it, keep the opinion paragraph focused on why one view is more convincing, rather than introducing brand-new arguments.",
    },
    {
      type: "tip",
      text: "Put the view you agree with second. Ending the body on your preferred view creates a natural bridge to the conclusion.",
    },
    { type: "h2", text: "Worked example: planning the sample question" },
    {
      type: "table",
      head: ["Section", "Notes"],
      rows: [
        ["Position", "Favour primary school start, provided teaching is good quality"],
        ["View A (secondary)", "Pupils need firm literacy in first language first; older learners understand grammar explicitly; specialist teachers more available at secondary level"],
        ["View B (primary)", "Young children imitate sounds readily → better pronunciation; more total hours of exposure by age 16; language becomes normal, not a 'hard subject'"],
        ["Evaluation", "View A's concern is about quality of teaching, not age — solved by training primary teachers"],
      ],
    },
    { type: "h3", text: "Sample introduction" },
    {
      type: "example",
      text: "Opinions differ on the best age for children to start studying a foreign language at school. Some argue that it should wait until secondary education, while others favour an early start in primary school. In my view, the earlier option is preferable, as long as young pupils are taught by properly trained teachers.",
    },
    { type: "h3", text: "Sample body paragraph (view A)" },
    {
      type: "example",
      text: "Those who prefer a later start argue that younger children should first build secure reading and writing skills in their mother tongue. A seven-year-old who is still learning to spell in their own language may become confused by a second writing system, whereas a twelve-year-old can compare the two consciously. Supporters of this view also point out that secondary schools are more likely to employ specialist language teachers, so the quality of instruction may be higher when lessons begin.",
    },
    { type: "h3", text: "Sample body paragraph (view B, with evaluation)" },
    {
      type: "example",
      text: "On the other hand, starting at primary level offers advantages that are difficult to recover later. Young children are usually less self-conscious when imitating new sounds, so they often develop more natural pronunciation. An early start also gives pupils several extra years of regular exposure before they leave school. Although the concern about teacher quality is reasonable, it is an argument for training primary teachers properly rather than for delaying language learning altogether.",
    },
    {
      type: "p",
      text: "Look at the final sentence of the second paragraph. It **evaluates** view A using a reason, which is what turns a description into a discussion with a position. That one sentence does a lot of work for Task Response.",
    },
    { type: "h3", text: "Sample conclusion" },
    {
      type: "example",
      text: "In conclusion, while there are sensible reasons for postponing foreign language study until secondary school, I believe the benefits of beginning in primary school are greater, provided that schools invest in teachers who are confident in the language they teach.",
    },
    { type: "h2", text: "Language for presenting views fairly" },
    {
      type: "table",
      head: ["Purpose", "Useful phrases"],
      rows: [
        ["Introducing view A", "Some people argue that… / Those who favour X claim that…"],
        ["Adding a supporting reason", "Supporters of this view also point out that… / A further argument is that…"],
        ["Switching to view B", "On the other hand,… / By contrast, others believe that…"],
        ["Evaluating", "Although this concern is understandable,… / This argument is persuasive because…"],
        ["Giving your opinion", "In my view,… / I would side with those who…"],
      ],
    },
    {
      type: "p",
      text: "Reporting verbs are especially useful in discussion essays because they let you attribute ideas without repeating 'think': argue, claim, maintain, suggest, contend, point out. Using them accurately is a simple way to show range under Lexical Resource.",
    },
    { type: "h2", text: "Writing a balanced position" },
    {
      type: "p",
      text: "You do not have to choose one view completely. A **balanced position** argues that each view is right in certain circumstances, and it can be very persuasive if it is precise. The danger is vagueness: 'both views have advantages and disadvantages' is not a position, because it tells the reader nothing they did not already know.",
    },
    {
      type: "table",
      head: ["Vague (weak)", "Precise (strong)"],
      rows: [
        ["Both sides have good points.", "An early start works well where primary teachers are trained in the language; otherwise, waiting until secondary school is more sensible."],
        ["It depends on the situation.", "For practical subjects the first view is convincing, but for academic subjects I favour the second."],
        ["There are pros and cons to each view.", "I believe the benefits of the second approach outweigh the drawbacks, although the first raises a fair concern about cost."],
      ],
    },
    {
      type: "p",
      text: "A precise balanced position names the **condition** under which each view applies. That condition then guides your body paragraphs, and your conclusion simply restates it.",
    },
    { type: "h2", text: "Developing each view fully" },
    {
      type: "p",
      text: "Examiners look for main ideas that are extended and supported. A useful check is to ask three questions of every body paragraph: **What** is the view? **Why** do people hold it? **What happens in practice?** If your paragraph answers only the first question, it is underdeveloped, however good the vocabulary is.",
    },
    {
      type: "example",
      title: "Underdeveloped versus developed",
      text: "Underdeveloped: Some people think older children learn grammar better, so languages should start at secondary school.\n\nDeveloped: Some people believe older children are better at learning grammar, because they can understand abstract rules and compare them with their first language. A teenager can be told that adjectives usually follow the noun in French and apply that rule straight away, whereas a younger child would need far more examples to notice the pattern. For this reason, supporters argue that a later start makes more efficient use of limited lesson time.",
    },
    { type: "h2", text: "Mistakes to avoid" },
    {
      type: "ul",
      items: [
        "**Forgetting your opinion** when the question asks for it.",
        "**Uneven development**: two lines on one view and a long paragraph on the other.",
        "**Contradicting yourself**, for example by presenting view A so persuasively that your conclusion in favour of view B seems unsupported.",
        "**Mixing the views in one paragraph** without clear signals, which makes the essay hard to follow and weakens Coherence and Cohesion.",
        "**Repeating the question's wording** instead of paraphrasing it in your introduction.",
      ],
    },
    { type: "h2", text: "Quick practice routine" },
    {
      type: "ol",
      items: [
        "Take three discussion questions and, for each, write one strong reason for each view in under five minutes.",
        "Choose one question and write the full essay in 40 minutes.",
        "Highlight every sentence that expresses your own view. If the highlights are only in the final paragraph, strengthen your introduction.",
        "Compare your essay with a model answer and note one structural and one language improvement.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I have to agree with one of the two views?",
      a: "No. You can take a balanced position, for example arguing that each view applies in different circumstances. What matters is that your opinion is clearly stated and supported.",
    },
    {
      q: "Where should I give my opinion in a discussion essay?",
      a: "State it briefly in the introduction and restate it in the conclusion. You can also add a short evaluative sentence at the end of the body paragraph for the view you prefer.",
    },
    {
      q: "Is a five-paragraph structure better for discuss both views?",
      a: "It is not automatically better. A four-paragraph structure lets you develop each view more fully in the time available, which usually matters more.",
    },
    {
      q: "What if the question only says 'discuss both views'?",
      a: "Then the main task is a balanced discussion. You may still add a brief opinion in the conclusion, but the focus should be on explaining both sides fully.",
    },
  ],
  related: [
    { href: "/model-answers", label: "See model Task 2 essays" },
    { href: "/writing-checker", label: "Get feedback on your essay" },
    { href: "/vocabulary", label: "Build academic vocabulary" },
    { href: "/grammar", label: "Practise complex sentence grammar" },
  ],
};

const lineGraph: Guide = {
  slug: "ielts-writing-task-1-line-graph",
  category: "Writing",
  title: "IELTS Writing Task 1 Line Graph: Overview & Vocabulary",
  description:
    "Describe an IELTS Academic Task 1 line graph with confidence: write a clear overview, group trends logically, and use accurate language of change, with a full sample answer.",
  keywords: [
    "IELTS Task 1 line graph",
    "IELTS line graph vocabulary",
    "IELTS Academic Writing Task 1",
    "IELTS Task 1 overview",
    "language of change IELTS",
    "IELTS line graph sample answer",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 8,
  summary:
    "A line graph report is judged on whether you select the key features, give a clear overview and support it with accurate data. This guide explains how to find the main trends in a minute, organise your paragraphs, and use the language of change precisely, with a complete sample report.",
  body: [
    { type: "h2", text: "What the task asks you to do" },
    {
      type: "p",
      text: "In Academic Writing Task 1 you have about 20 minutes to write at least 150 words summarising visual information. The standard instruction is: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' You are not asked for opinions, causes or predictions, and including them does not help.",
    },
    {
      type: "p",
      text: "Task 1 is assessed on **Task Achievement**, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. For Task Achievement, the public descriptors make the overview central: from Band 7 upwards they expect a clear overview of main trends, differences or stages, and they penalise reports that focus on mechanical detail without one.",
    },
    { type: "h2", text: "Read the graph in 60 seconds" },
    {
      type: "ol",
      items: [
        "**Title, axes and units.** What is measured (percentages, millions, tonnes)? Over what period?",
        "**Overall direction of each line.** Up, down, stable or fluctuating from start to finish?",
        "**Highest and lowest.** Which line is on top for most of the period? Do any lines cross?",
        "**Notable points.** Peaks, troughs and the year when a change in direction occurs.",
      ],
    },
    {
      type: "p",
      text: "These four questions give you the raw material for your overview. Anything that is not one of the biggest features belongs in the body paragraphs, or nowhere at all.",
    },
    { type: "h2", text: "A worked example" },
    {
      type: "example",
      title: "Sample task (practice data)",
      text: "The graph below shows the percentage of households in one city that used three types of heating between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    },
    {
      type: "table",
      head: ["Year", "Gas (%)", "Electric (%)", "Heat pump (%)"],
      rows: [
        ["2000", "70", "25", "2"],
        ["2005", "68", "27", "3"],
        ["2010", "60", "30", "6"],
        ["2015", "48", "31", "17"],
        ["2020", "35", "30", "33"],
      ],
    },
    {
      type: "p",
      text: "Apply the 60-second read. Gas fell throughout, steeply after 2010. Electric rose slightly then levelled off. Heat pumps were negligible at first but rose sharply, almost equalling gas by 2020. Gas was the most common method throughout, though only narrowly by the end.",
    },
    { type: "h2", text: "Paragraph plan" },
    {
      type: "table",
      head: ["Paragraph", "Content for this graph"],
      rows: [
        ["Introduction", "Paraphrase: what, where, when"],
        ["Overview", "Gas declined but stayed most common; heat pumps grew dramatically; electric roughly stable"],
        ["Body 1", "Gas: 70% → 68% → sharp fall to 35%; compare with heat pumps crossing 30%"],
        ["Body 2", "Electric 25% → peak 31% in 2015 → 30%; heat pumps 2% → 33%"],
      ],
    },
    {
      type: "tip",
      text: "Group lines that behave similarly, or contrast lines that move in opposite directions. Describing each line year by year in sequence is the least effective way to organise a line graph.",
    },
    { type: "h2", text: "Sample answer" },
    {
      type: "example",
      title: "Model report (about 180 words)",
      text: "The line graph illustrates the proportion of homes in a city that relied on gas, electric and heat pump systems for heating over a twenty-year period from 2000.\n\nOverall, gas remained the most widely used form of heating throughout the period, despite a substantial decline, while the use of heat pumps rose dramatically. Electric heating changed relatively little.\n\nIn 2000, seven in ten households heated their homes with gas. This figure dipped only slightly to 68% by 2005, but then fell steadily, reaching 48% in 2015 and just over a third of homes in 2020. Heat pumps showed the opposite pattern: they were used by a mere 2% of households at the start of the period and remained under 10% until 2010, after which they increased rapidly to 33%, almost matching gas by the final year.\n\nElectric heating, by comparison, was comparatively stable. It accounted for a quarter of homes in 2000, rose gradually to a peak of 31% in 2015 and then eased marginally to 30%.",
    },
    {
      type: "p",
      text: "Note that the report never explains **why** heat pumps became popular. Speculating about causes is not part of the task and can make a report seem irrelevant or inaccurate.",
    },
    { type: "h2", text: "The language of change" },
    {
      type: "table",
      head: ["Movement", "Verbs", "Nouns", "Adverbs / adjectives"],
      rows: [
        ["Up", "rise, increase, grow, climb", "a rise, an increase, growth", "sharply / a sharp; steadily / a steady"],
        ["Down", "fall, decrease, decline, drop", "a fall, a decrease, a decline", "dramatically / a dramatic; gradually / a gradual"],
        ["No change", "remain stable, level off, stay at", "a plateau", "relatively stable, unchanged"],
        ["Up and down", "fluctuate", "fluctuations", "erratically, considerably"],
        ["Highest point", "peak at, reach a peak of", "a peak", "—"],
        ["Lowest point", "bottom out at, hit a low of", "a low, a trough", "—"],
      ],
    },
    { type: "h3", text: "Two sentence patterns to vary your grammar" },
    {
      type: "ul",
      items: [
        "**Verb + adverb:** The number of heat pump users rose sharply between 2010 and 2020.",
        "**There was + adjective + noun:** There was a sharp rise in the number of heat pump users between 2010 and 2020.",
      ],
    },
    {
      type: "p",
      text: "Alternating these patterns is a straightforward way to show grammatical range. Accuracy still matters more than variety: check prepositions carefully, because they are where most data-language errors occur.",
    },
    {
      type: "table",
      head: ["Preposition", "Use", "Example"],
      rows: [
        ["to", "the end point", "rose to 33%"],
        ["by", "the amount of change", "rose by 31 percentage points"],
        ["from… to…", "start and end", "fell from 70% to 35%"],
        ["at", "a level", "peaked at 31%"],
        ["of", "after a noun", "a rise of 31 percentage points"],
      ],
    },
    {
      type: "tip",
      text: "When comparing two percentages, say 'percentage points' for the difference. A move from 20% to 30% is a rise of ten percentage points, not ten per cent.",
    },
    { type: "h2", text: "Writing a strong overview" },
    {
      type: "p",
      text: "The overview is the most important paragraph in a Task 1 report, yet it is often the shortest. It should describe the **big picture in two sentences**, without specific figures. Ask yourself: if a reader could remember only two things about this graph, what should they be?",
    },
    {
      type: "table",
      head: ["Weak overview", "Why it is weak", "Stronger version"],
      rows: [
        ["Gas fell from 70% to 35%.", "Contains detail, not a summary; mentions only one line", "Gas use declined considerably, while heat pumps became far more common."],
        ["There were many changes in heating.", "Too vague to be useful", "Gas remained the most common type throughout, but its lead narrowed sharply."],
        ["In conclusion, people prefer heat pumps.", "Gives an opinion and is not accurate (gas was still higher)", "By 2020, heat pumps were almost as widely used as gas."],
      ],
    },
    {
      type: "p",
      text: "Good overviews usually combine **one trend** (what changed most) with **one comparison** (which category was highest or lowest overall). Practise writing only the overview for a dozen graphs; it takes five minutes each and quickly becomes automatic.",
    },
    { type: "h2", text: "Graphs with many lines" },
    {
      type: "p",
      text: "When a graph has five or six lines, you cannot describe each in detail in 150–200 words. Group them instead: lines that rose, lines that fell, and any line that behaved unusually. Mention the most extreme line in each group with figures, and refer to the others more briefly, for example 'the remaining three categories followed a similar pattern, each staying between 10% and 20%'.",
    },
    {
      type: "tip",
      text: "If two lines cross, the crossing point is almost always a key feature. State the approximate year and the approximate value at which it happens.",
    },
    { type: "h2", text: "Common mistakes" },
    {
      type: "ul",
      items: [
        "**No overview**, or an overview hidden in the final sentence. Put it straight after the introduction.",
        "**Copying the title word for word** instead of paraphrasing it.",
        "**Describing every data point.** Select the significant ones: starts, ends, peaks, crossings.",
        "**Wrong tense.** Past data needs past tenses; projections use 'is expected to' or 'is predicted to'.",
        "**Adding a conclusion with opinions.** If you include a final summary, keep it factual or simply rely on your overview.",
      ],
    },
  ],
  faqs: [
    {
      q: "Where should I put the overview in Task 1?",
      a: "Most candidates put it immediately after the introduction, which makes it easy for the examiner to find. Placing it at the end is acceptable, but the important thing is that it clearly states the main trends.",
    },
    {
      q: "Do I need a conclusion in IELTS Writing Task 1?",
      a: "Not in the essay sense. A clear overview does the job of a summary. A separate conclusion that repeats the overview adds words but little value.",
    },
    {
      q: "How many numbers should I include?",
      a: "Enough to support each trend you describe, typically the start, end and any peak or turning point. Every key feature should have at least one accurate figure.",
    },
    {
      q: "Can I write more than 150 words?",
      a: "Yes. Most strong reports are between 160 and 200 words. Writing much more often means you are including unnecessary detail and using time you need for Task 2.",
    },
    {
      q: "What if the graph shows future projections?",
      a: "Use future forms such as 'is projected to', 'is expected to' or 'will reach', and make clear which part of the graph is a forecast.",
    },
  ],
  related: [
    { href: "/model-answers", label: "Read model Task 1 reports" },
    { href: "/writing-checker", label: "Check a Task 1 report" },
    { href: "/band-descriptors", label: "Task Achievement band descriptors" },
    { href: "/tests", label: "Practise under exam timing" },
  ],
};

const barChartTable: Guide = {
  slug: "ielts-writing-task-1-bar-chart-and-table",
  category: "Writing",
  title: "IELTS Task 1 Bar Chart and Table: How to Compare Data",
  description:
    "A practical method for IELTS Academic Task 1 bar charts and tables: spot the key comparisons, group categories, use comparison language accurately and avoid listing numbers.",
  keywords: [
    "IELTS bar chart",
    "IELTS Task 1 table",
    "IELTS Task 1 bar chart sample answer",
    "IELTS comparison language",
    "IELTS Academic Writing Task 1 table",
    "IELTS Task 1 grouping data",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 8,
  summary:
    "Bar charts and tables often show categories rather than change over time, so the skill being tested is comparison. This guide shows how to find the biggest contrasts, group similar categories, write an overview that does not mention numbers, and use comparative structures accurately.",
  body: [
    { type: "h2", text: "Why bar charts and tables feel harder" },
    {
      type: "p",
      text: "Line graphs usually show one obvious story: something went up or down. Bar charts and tables often contain twelve, twenty or more figures with no single trend. The temptation is to report every number, which produces a long list with no overview. Under Task Achievement, that kind of mechanical description is exactly what keeps reports in the middle bands.",
    },
    {
      type: "p",
      text: "Your job is to act like an analyst: decide what the reader most needs to notice, and organise the data so those points stand out.",
    },
    { type: "h2", text: "First, identify the data type" },
    {
      type: "table",
      head: ["Chart shows…", "Main language", "Typical overview focus"],
      rows: [
        ["Categories at one point in time", "Comparison (higher than, twice as many as)", "Largest and smallest categories; any clear groups"],
        ["Categories across several years", "Comparison and change", "Overall direction plus the ranking of categories"],
        ["Two groups (e.g. men and women) across categories", "Contrast (whereas, while)", "Where the groups differ most and where they are similar"],
      ],
    },
    {
      type: "p",
      text: "If years appear on an axis or in a column, you will need some language of change as well as comparison. If there is no time element, avoid words like 'increased'; categories do not increase, they are simply higher or lower than one another.",
    },
    { type: "h2", text: "Worked example: a table" },
    {
      type: "example",
      title: "Sample task (practice data)",
      text: "The table below shows the average number of hours per week that students at one college spent on four activities, by year of study. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    },
    {
      type: "table",
      head: ["Activity", "Year 1", "Year 2", "Year 3"],
      rows: [
        ["Lectures and seminars", "15", "13", "9"],
        ["Independent study", "8", "12", "20"],
        ["Paid work", "6", "9", "7"],
        ["Sport and societies", "7", "5", "3"],
      ],
    },
    { type: "h3", text: "Finding the story" },
    {
      type: "ul",
      items: [
        "Independent study more than doubled and became the largest activity by Year 3.",
        "Taught hours and leisure activities both fell each year.",
        "Paid work was the only activity that rose and then fell.",
        "In Year 1, taught hours dominated; by Year 3, independent study dominated.",
      ],
    },
    {
      type: "p",
      text: "Notice that these points already form two natural groups: **activities that grew** (independent study, and paid work at first) and **activities that shrank** (classes, sport). That grouping becomes the paragraph plan.",
    },
    { type: "h2", text: "Sample answer" },
    {
      type: "example",
      title: "Model report (about 175 words)",
      text: "The table compares how many hours each week students at a college devoted to four activities in each of their three years of study.\n\nOverall, the balance of students' time shifted noticeably from organised activities towards independent study. While time spent in classes and on sport declined steadily, independent study grew to become by far the largest commitment in the final year.\n\nIn the first year, lectures and seminars took up 15 hours a week, almost twice as long as independent study at 8 hours. By the third year, this pattern had reversed: independent study had risen to 20 hours, more than double the 9 hours spent in taught sessions.\n\nThe remaining two activities accounted for less time. Paid work rose from 6 to 9 hours between the first and second years before falling back slightly to 7. Sport and societies, by contrast, decreased in every year, from 7 hours to just 3, making it the least time-consuming activity by the end of the course.",
    },
    {
      type: "p",
      text: "The overview contains **no numbers**. It states the big picture in words, and the body paragraphs then provide the evidence. This is the clearest way to signal to an examiner that you have identified the main features.",
    },
    { type: "h2", text: "Ways to group categories" },
    {
      type: "ul",
      items: [
        "**By size:** the two largest categories in one paragraph, the smaller ones in another.",
        "**By behaviour:** categories that rose versus those that fell.",
        "**By group:** all figures for men, then all figures for women, with contrasts highlighted.",
        "**By time:** the earlier year, then the later year (useful for two-year bar charts).",
      ],
    },
    {
      type: "tip",
      text: "Choose the grouping that lets you make the most comparisons inside each paragraph. If you have to repeat the same category in both paragraphs, try a different grouping.",
    },
    { type: "h2", text: "Comparison language that works" },
    {
      type: "table",
      head: ["Structure", "Example"],
      rows: [
        ["Comparative adjective + than", "Independent study took up more time than any other activity in Year 3."],
        ["Multiples", "Taught sessions lasted almost twice as long as independent study in Year 1."],
        ["Superlatives", "Sport was the least time-consuming activity by the final year."],
        ["Contrast clauses", "Taught hours fell, whereas independent study rose sharply."],
        ["Similarity", "Paid work and sport accounted for a similar amount of time in Year 1."],
        ["Fractions and proportions", "Independent study made up roughly half of all recorded hours by Year 3."],
      ],
    },
    {
      type: "p",
      text: "Be careful with **'the number of'** and **'the amount of'**: use 'number' with countable nouns (students, cars) and 'amount' with uncountable nouns (time, money, energy). With percentages, use 'the proportion of' or 'the percentage of'.",
    },
    { type: "h2", text: "Adapting the method for bar charts" },
    {
      type: "p",
      text: "Bar charts work in exactly the same way. Before writing, rank the bars mentally from highest to lowest, look for the biggest gap between groups, and check whether any category behaves differently from the rest. Where bars are close together, approximate language such as 'just under', 'roughly' and 'slightly more than' is both accurate and natural; you do not need to estimate to the decimal point.",
    },
    { type: "h2", text: "Avoiding repetition with figures" },
    {
      type: "p",
      text: "Tables and bar charts often force you to mention the same categories several times. Repeating 'the number of hours spent on independent study' in every sentence quickly becomes clumsy. Use reference words and shorter noun phrases once a category has been introduced.",
    },
    {
      type: "table",
      head: ["First mention", "Later mentions"],
      rows: [
        ["the number of hours spent on independent study", "independent study / this activity / the figure for independent study"],
        ["lectures and seminars", "taught sessions / classes / the former"],
        ["the proportion of students in paid work", "this proportion / the corresponding figure / that of paid work"],
      ],
    },
    {
      type: "p",
      text: "Phrases such as **the former**, **the latter**, **the corresponding figure** and **respectively** are particularly useful. For example: 'Taught hours and sport fell to 9 and 3 hours respectively.' Use 'respectively' only when the order of the two items exactly matches the order of the two figures.",
    },
    { type: "h2", text: "Pie charts and mixed charts" },
    {
      type: "p",
      text: "The same comparison method works for pie charts, which show parts of a whole. Use fraction and proportion language (a quarter, just under a third, the majority, a small minority) and compare segments rather than describing them one by one. If you are given two pie charts from different years, treat them like a table with two columns: describe what grew, what shrank and whether the largest segment changed.",
    },
    {
      type: "p",
      text: "Some tasks combine two different visuals, for example a bar chart and a table. Write one overview sentence for each visual, or one sentence that links them if there is a clear connection, and then give each visual its own body paragraph.",
    },
    { type: "h2", text: "Checklist" },
    {
      type: "ul",
      items: [
        "Introduction paraphrases what, who, where and when.",
        "Overview states two or three main features with no figures.",
        "Each body paragraph groups categories logically.",
        "Every key comparison is supported by an accurate figure.",
        "No opinions, explanations or invented causes.",
        "At least 150 words, written in about 20 minutes.",
      ],
    },
  ],
  faqs: [
    {
      q: "Should I mention every number in an IELTS table?",
      a: "No. Select the figures that support the main comparisons. Reporting every figure usually leads to a list without an overview, which limits your Task Achievement score.",
    },
    {
      q: "Can I round numbers in Task 1?",
      a: "Yes, as long as you signal it with words such as 'approximately', 'around' or 'just over'. Do not change figures so much that the comparison becomes inaccurate.",
    },
    {
      q: "What tense should I use for a bar chart?",
      a: "Use the past simple for past dates, the present simple if no time is given, and future or predictive forms for projections.",
    },
    {
      q: "How do I write an overview without numbers?",
      a: "Describe the biggest pattern in words: which category was largest, which changed most, and how groups compared. Save the figures for the body paragraphs.",
    },
  ],
  related: [
    { href: "/model-answers", label: "Model Task 1 reports" },
    { href: "/writing-checker", label: "Check your Task 1 report" },
    { href: "/grammar", label: "Practise comparative structures" },
    { href: "/tests", label: "Try a full Writing test" },
  ],
};

const gtLetter: Guide = {
  slug: "ielts-general-training-letter",
  category: "Writing",
  title: "IELTS General Training Letter: Formal & Informal Guide",
  description:
    "Write IELTS General Training Task 1 letters with the right tone: formal, semi-formal and informal openings and closings, a bullet-point plan and a full sample letter.",
  keywords: [
    "IELTS General Training letter",
    "IELTS GT Writing Task 1",
    "IELTS formal letter",
    "IELTS informal letter",
    "IELTS semi-formal letter",
    "IELTS letter openings and closings",
    "IELTS letter sample",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 8,
  summary:
    "General Training Writing Task 1 asks for a letter of at least 150 words in about 20 minutes. Success depends on covering all three bullet points and keeping a tone that suits the reader. This guide explains how to identify the right register, open and close correctly, and plan a letter quickly, with a full sample.",
  body: [
    { type: "h2", text: "What the task involves" },
    {
      type: "p",
      text: "In the General Training test, Writing Task 1 describes a situation and asks you to write a letter, usually with three bullet points to cover. You should spend about 20 minutes and write at least 150 words. You do not need to write any addresses; begin with 'Dear…', as the instructions say.",
    },
    {
      type: "p",
      text: "The letter is assessed on Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. For a letter, Task Achievement includes covering all bullet points fully and using a **consistent and appropriate tone**. A letter that answers every point but sounds rude, or overly casual to a company manager, will lose marks.",
    },
    { type: "h2", text: "Step 1: identify the register" },
    {
      type: "p",
      text: "The relationship between you and the reader decides the tone. Look at who you are writing to before anything else.",
    },
    {
      type: "table",
      head: ["Register", "Typical reader", "Typical purpose"],
      rows: [
        ["Formal", "Someone you do not know: a company, a council, a manager at another organisation", "Complaint, application, request for information"],
        ["Semi-formal", "Someone you know but not closely: your landlord, your manager, a teacher, a neighbour", "Request, apology, explanation, suggestion"],
        ["Informal", "A friend or relative", "Invitation, thanks, advice, news"],
      ],
    },
    { type: "h2", text: "Step 2: open and close correctly" },
    {
      type: "table",
      head: ["Register", "Opening", "Closing", "Sign with"],
      rows: [
        ["Formal (name unknown)", "Dear Sir or Madam,", "Yours faithfully,", "Full name"],
        ["Formal / semi-formal (name known)", "Dear Mr Patel, / Dear Ms Okafor,", "Yours sincerely,", "Full name"],
        ["Semi-formal (friendly)", "Dear Mr Patel, / Dear Helen,", "Kind regards, / Best regards,", "First name or full name"],
        ["Informal", "Dear Sam, / Hi Sam,", "Best wishes, / Love, / See you soon,", "First name"],
      ],
    },
    {
      type: "tip",
      text: "In British usage, 'Mr', 'Mrs' and 'Ms' are written without a full stop. Use 'Ms' when you do not know whether a woman is married or would prefer not to assume.",
    },
    { type: "h2", text: "Step 3: plan around the bullet points" },
    {
      type: "p",
      text: "A simple structure keeps the letter organised and makes it obvious that each bullet point has been covered.",
    },
    {
      type: "table",
      head: ["Paragraph", "Content"],
      rows: [
        ["Opening", "Greeting + one or two sentences giving the purpose of the letter"],
        ["Bullet 1", "Developed with details: who, what, when, where"],
        ["Bullet 2", "Developed with details and a reason"],
        ["Bullet 3", "Developed with details; often the request or action you want"],
        ["Closing", "A polite closing sentence + sign-off + name"],
      ],
    },
    { type: "h2", text: "Worked example: a semi-formal letter" },
    {
      type: "example",
      title: "Sample task",
      text: "You recently moved into a rented flat and the heating has stopped working. Write a letter to your landlord. In your letter: describe the problem; explain how it is affecting you; say what you would like the landlord to do.",
    },
    {
      type: "p",
      text: "The reader is someone you know in a business relationship, so a **semi-formal** register is appropriate: polite and clear, with some personal warmth, but no slang.",
    },
    {
      type: "example",
      title: "Model letter (about 190 words)",
      text: "Dear Mr Harris,\n\nI am writing to let you know about a problem with the heating in Flat 4, which I moved into at the beginning of the month.\n\nSince last Tuesday, the boiler has not been producing any heat. The display shows a red warning light, and although I have tried resetting it as described in the manual, nothing has changed. Hot water is still available, but none of the radiators are warming up.\n\nAs the nights have become much colder, this is causing real difficulties. I work from home three days a week, and it has become too cold to sit at my desk for long periods. I have also had to buy an electric heater, which I am concerned will increase my bills considerably.\n\nI would be very grateful if you could arrange for an engineer to inspect the boiler as soon as possible. I am available every morning this week, and I am happy to let them in at short notice if that helps.\n\nThank you for your help. I look forward to hearing from you.\n\nKind regards,\n\nAnna Kowalski",
    },
    {
      type: "p",
      text: "Each bullet point has its own paragraph and is extended with specific details (the red light, working from home, the extra heater). The tone stays polite and practical from beginning to end.",
    },
    { type: "h2", text: "Useful language by register" },
    {
      type: "table",
      head: ["Function", "Formal", "Informal"],
      rows: [
        ["Stating purpose", "I am writing to complain about…", "I just wanted to tell you about…"],
        ["Making a request", "I would be grateful if you could…", "Could you possibly…?"],
        ["Apologising", "I sincerely apologise for…", "I'm really sorry about…"],
        ["Complaining", "I was disappointed to find that…", "I was a bit annoyed when…"],
        ["Suggesting", "I would suggest that…", "Why don't we…?"],
        ["Closing line", "I look forward to your reply.", "Can't wait to hear from you!"],
      ],
    },
    {
      type: "p",
      text: "Contractions (I'm, can't, don't) are natural in informal letters and should generally be avoided in formal ones. In semi-formal letters, use them sparingly. The key is consistency: switching between 'I would be grateful' and 'Cheers, mate' in the same letter suggests weak control of tone.",
    },
    { type: "h2", text: "Developing the bullet points" },
    {
      type: "p",
      text: "A frequent reason for a lower Task Achievement score is that bullet points are mentioned but not developed. One sentence per bullet point rarely gives the reader enough information to act. Imagine the reader has only your letter: what else would they need to know?",
    },
    {
      type: "example",
      title: "Underdeveloped versus developed",
      text: "Underdeveloped: The heating is broken. Please fix it.\n\nDeveloped: Since last Tuesday, the boiler has not been producing any heat, and a red warning light is showing on the display. I have tried resetting it as the manual describes, but nothing has changed.",
    },
    {
      type: "p",
      text: "Useful details to add include **times and dates**, **places**, **what you have already tried**, **consequences** and **what exactly you want to happen next**. Two or three details per bullet point is usually enough to reach 160–190 words naturally.",
    },
    { type: "h2", text: "Informal letters: getting the tone right" },
    {
      type: "p",
      text: "Many candidates find informal letters harder than formal ones, because their study materials focus on formal language. An informal letter should sound like a friendly email to someone you know well: warm, direct and relaxed, but still well organised and grammatically accurate.",
    },
    {
      type: "example",
      title: "Informal opening and closing",
      text: "Hi Sam,\n\nThanks so much for your message — it was great to hear your news about the new job! I'm writing because I've got a favour to ask…\n\n…Anyway, let me know what you think when you get a chance. Say hello to everyone for me.\n\nBest wishes,\nMaria",
    },
    {
      type: "p",
      text: "Informal does not mean careless. Text-message abbreviations (u, gr8, btw), missing punctuation and slang that a stranger might not understand should all be avoided.",
    },
    { type: "h2", text: "Common mistakes" },
    {
      type: "ul",
      items: [
        "**Missing or under-developing a bullet point.** Each one needs at least two or three sentences.",
        "**Using 'Yours faithfully' after a named greeting.** It pairs with 'Dear Sir or Madam'.",
        "**Writing addresses or dates.** They are not required and waste time.",
        "**Starting with 'My name is…' in an informal letter.** Your friend already knows who you are.",
        "**Memorised phrases that do not fit the situation**, such as 'I hope this letter finds you in the best of health' in a complaint.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should an IELTS General Training letter be?",
      a: "At least 150 words. Most good letters are between 160 and 200 words, which is enough to cover all three bullet points with detail.",
    },
    {
      q: "Do I need to write my address in an IELTS letter?",
      a: "No. You only need to begin with an appropriate greeting such as 'Dear Sir or Madam' and finish with a suitable closing and your name.",
    },
    {
      q: "Can I use a made-up name when I sign the letter?",
      a: "Yes. You can sign with any name. What matters is that the sign-off matches the register of the letter.",
    },
    {
      q: "Is a semi-formal letter the same as a formal one?",
      a: "Not quite. Both are polite, but a semi-formal letter can be warmer and less rigid, and it often uses the reader's name with 'Kind regards' rather than 'Yours faithfully'.",
    },
    {
      q: "What if I don't know the right register?",
      a: "Ask whether you know the reader personally. A stranger or organisation means formal; someone you know through work or housing means semi-formal; a friend or relative means informal.",
    },
  ],
  related: [
    { href: "/tests", label: "Try a General Training mock test" },
    { href: "/model-answers", label: "See model letters and essays" },
    { href: "/writing-checker", label: "Check your letter" },
    { href: "/vocabulary", label: "Expand your vocabulary" },
  ],
};

const cueCard: Guide = {
  slug: "ielts-speaking-part-2-cue-card-strategy",
  category: "Speaking",
  title: "IELTS Speaking Part 2: Cue Card Strategy & Sample",
  description:
    "Use your one minute of IELTS Speaking Part 2 preparation well: a simple note-taking method, a structure that lasts two minutes, a full sample answer and recovery tactics.",
  keywords: [
    "IELTS Speaking Part 2",
    "IELTS cue card",
    "IELTS cue card strategy",
    "IELTS long turn",
    "IELTS Speaking Part 2 sample answer",
    "IELTS one minute preparation",
    "how to speak for 2 minutes IELTS",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 8,
  summary:
    "In Part 2 you get a task card, one minute to prepare and then speak for up to two minutes. Most candidates run out of ideas because they write sentences instead of prompts. This guide teaches a one-minute note method, a story-based structure that fills the time naturally, and a complete sample answer.",
  body: [
    { type: "h2", text: "How Part 2 works" },
    {
      type: "p",
      text: "Part 2, often called the long turn, is the middle section of the Speaking test. The examiner gives you a task card with a topic and usually three or four prompts, plus a pencil and paper. You have **one minute to prepare** and should then speak for **one to two minutes**. The examiner will stop you when the time is up and may ask one or two brief follow-up questions.",
    },
    {
      type: "p",
      text: "Part 2 is assessed on the same four criteria as the rest of the test: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. It is the one part where you must organise an extended answer on your own, which makes it the clearest test of coherence and sustained fluency.",
    },
    {
      type: "example",
      title: "Sample cue card",
      text: "Describe a skill you learned that took a long time to master.\nYou should say:\n– what the skill was\n– when and how you learned it\n– what difficulties you had\nand explain how you feel about this skill now.",
    },
    { type: "h2", text: "The one-minute note method" },
    {
      type: "p",
      text: "Sixty seconds is not enough time to write sentences, and reading sentences aloud sounds unnatural anyway. Instead, write **keywords only**, organised so that you can glance down and immediately know what to say next.",
    },
    {
      type: "ol",
      items: [
        "**Decide the topic in five seconds.** Choose the first reasonable idea, not the most impressive one. Hesitating over choices wastes the whole minute.",
        "**Write one line per prompt**, with two or three keywords each.",
        "**Add a 'story' detail**: one specific moment you can describe (a place, a time, a mistake).",
        "**Add one 'feeling' word** for the final 'explain' prompt, plus a reason.",
        "**Note two or three topic words** you want to use, so they come to mind while speaking.",
      ],
    },
    {
      type: "table",
      head: ["Prompt", "Example notes"],
      rows: [
        ["What the skill was", "swimming — properly, front crawl"],
        ["When and how", "age 24 · adult classes · Tues evenings · local pool · 1 year"],
        ["Difficulties", "breathing! panic · swallowed water · embarrassed (kids' lane)"],
        ["Story moment", "first full length without stopping — instructor clapped"],
        ["How I feel now", "proud · swim weekly · stress relief"],
        ["Topic words", "technique, stamina, plateau, persevere"],
      ],
    },
    {
      type: "tip",
      text: "Use the full minute. If you finish your notes early, rehearse your first sentence silently so you start confidently.",
    },
    { type: "h2", text: "A structure that fills two minutes" },
    {
      type: "table",
      head: ["Stage", "What to say", "Approx. time"],
      rows: [
        ["Opening", "Name the topic directly and give a little context", "10–15 seconds"],
        ["Prompts 1–2", "Background details: when, where, who, how", "30–40 seconds"],
        ["Prompt 3 + story", "The difficulties, with one specific moment described in detail", "40–50 seconds"],
        ["Explain prompt", "Your feelings or opinion now, with reasons", "20–30 seconds"],
      ],
    },
    {
      type: "p",
      text: "The **story moment** is what makes the difference. Generic statements ('it was difficult but I practised a lot') run out after twenty seconds. A specific scene — what you saw, what someone said, how you reacted — naturally produces past tenses, descriptive vocabulary and linking, and it fills time without repetition.",
    },
    { type: "h2", text: "Sample answer" },
    {
      type: "example",
      title: "Model long turn (about 2 minutes spoken)",
      text: "I'd like to talk about learning to swim properly, which is something I only did as an adult. I could sort of keep myself afloat as a child, but I never learned a real stroke, so when I was about twenty-four I signed up for adult lessons at my local leisure centre. They were on Tuesday evenings, and I went more or less every week for about a year.\n\nThe hardest part, by far, was the breathing. In front crawl you have to turn your head and breathe at exactly the right moment, and for months I just couldn't get the timing right. I'd swallow water, panic and stand up halfway along the pool. To make things worse, the beginners' lane was right next to a children's class, and some of those six-year-olds were much faster than me, which was quite embarrassing.\n\nWhat I remember most clearly is the evening I finally swam a full length without stopping. I touched the wall at the end, looked up, and my instructor was actually clapping. It sounds like a small thing, but after so many weeks of feeling I'd hit a plateau, it was a real turning point.\n\nThese days I swim at least once a week, usually early in the morning before work. I'm genuinely proud of it, partly because I persevered when I wanted to give up, and partly because it's become my main way of dealing with stress. Whenever I find something difficult now, I remind myself how impossible breathing in the pool felt at the beginning.",
    },
    { type: "h3", text: "Why this answer works" },
    {
      type: "ul",
      items: [
        "**Fluency and Coherence:** clear sequence (background → difficulty → turning point → now) with natural linking such as 'to make things worse' and 'these days'.",
        "**Lexical Resource:** topic vocabulary used naturally (stroke, front crawl, leisure centre, plateau, persevered) and informal expressions such as 'sort of' and 'more or less'.",
        "**Grammatical Range and Accuracy:** a natural mix of past simple, past perfect ('I'd hit a plateau'), present simple for current habits, and complex sentences with 'which', 'because' and 'whenever'.",
        "**Pronunciation:** cannot be judged on paper, but a story with emotion encourages natural stress and intonation.",
      ],
    },
    { type: "h2", text: "What to do if you run out of ideas" },
    {
      type: "ul",
      items: [
        "**Go back to the story.** Add sensory detail: what the place looked like, what people said.",
        "**Compare then and now.** 'At first… whereas now…' generates several more sentences.",
        "**Imagine an alternative.** 'If I hadn't taken those lessons, I probably…' also shows conditional grammar.",
        "**Add someone else's perspective.** 'My friends were surprised because…'",
      ],
    },
    {
      type: "p",
      text: "Keep talking until the examiner stops you. Finishing at one minute is not a disaster, but a longer, well-organised answer gives the examiner far more evidence of your ability.",
    },
    { type: "h2", text: "Preparing for common cue card themes" },
    {
      type: "p",
      text: "Part 2 topics vary widely, but most fall into a small number of themes. Preparing one flexible story for each theme means you rarely start from nothing. The aim is not to memorise answers, which examiners can detect, but to have **experiences you have already thought about in English**.",
    },
    {
      type: "table",
      head: ["Theme", "Example cue cards", "Flexible story idea"],
      rows: [
        ["People", "A person who helped you; a teacher; someone you admire", "A mentor, coach or relative who taught you something"],
        ["Places", "A place you visited; a building you like; a quiet place", "A memorable trip with a clear moment"],
        ["Objects", "A gift; something you lost; a useful item", "An item with a story attached to it"],
        ["Events", "A celebration; a time you were late; a happy day", "One day with a beginning, a problem and a resolution"],
        ["Activities and skills", "A skill you learned; a hobby; a sport", "A skill you improved over time, with a turning point"],
        ["Media and ideas", "A book, film or website; a piece of advice", "Something that changed how you think or act"],
      ],
    },
    {
      type: "p",
      text: "Many stories can be adapted across themes. The swimming story above could answer 'a skill you learned', 'a time you felt proud', 'a challenge you overcame' or 'a person who helped you' (the instructor). Practise adapting one story to three different cards in a single session.",
    },
    { type: "h2", text: "The follow-up questions" },
    {
      type: "p",
      text: "After your long turn, the examiner may ask one or two short questions, such as 'Do you still swim today?' or 'Would you recommend it to others?'. Answer these briefly and naturally in one or two sentences; they are a bridge into Part 3, which will then explore the topic in a more general way.",
    },
    { type: "h2", text: "Mistakes to avoid" },
    {
      type: "ul",
      items: [
        "**Memorised answers.** Examiners are trained to notice rehearsed speech, and a memorised script that does not match the card is not credited.",
        "**Reading from your notes.** Glance down, then look up and speak.",
        "**Answering only the prompts in a list.** Treat them as a guide, not a questionnaire.",
        "**Changing topic halfway.** Commit to your first choice.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I make up a story in IELTS Speaking Part 2?",
      a: "Yes. The test assesses your English, not the truth of your experience. An invented or adapted story is fine as long as you can describe it fluently and naturally.",
    },
    {
      q: "What happens if I speak for less than two minutes?",
      a: "The examiner may prompt you to continue. Speaking for a shorter time is not automatically penalised, but you give less evidence of fluency and range, so aim to keep going.",
    },
    {
      q: "Do I have to cover every prompt on the cue card?",
      a: "The prompts are there to help you. Covering them all is the easiest way to organise your talk, but the key is to speak on the topic fluently and coherently.",
    },
    {
      q: "Can I keep my notes?",
      a: "You can look at your notes while you speak, but they are collected at the end of the test.",
    },
    {
      q: "How should I start my Part 2 answer?",
      a: "Start directly and naturally, for example 'I'd like to talk about…' or 'The skill I'm going to describe is…'. Avoid long memorised openings.",
    },
  ],
  related: [
    { href: "/speaking-practice", label: "Practise with the cue card timer" },
    { href: "/band-descriptors", label: "Speaking band descriptors" },
    { href: "/vocabulary", label: "Topic vocabulary for speaking" },
    { href: "/flashcards", label: "Revise phrases with flashcards" },
  ],
};

const speakingBand7: Guide = {
  slug: "ielts-speaking-tips-band-7",
  category: "Speaking",
  title: "IELTS Speaking Tips for Band 7: What Examiners Want",
  description:
    "Practical IELTS Speaking tips for Band 7: what the four criteria mean, how to extend Part 1 answers, how to handle abstract Part 3 questions, and how to sound fluent and natural.",
  keywords: [
    "IELTS Speaking tips",
    "IELTS Speaking Band 7",
    "IELTS Speaking Part 1",
    "IELTS Speaking Part 3",
    "IELTS fluency and coherence",
    "IELTS pronunciation tips",
    "how to improve IELTS speaking score",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 9,
  summary:
    "Band 7 in Speaking means talking at length without noticeable effort, using some less common vocabulary and complex grammar with reasonable accuracy, and being easy to understand. This guide translates the four criteria into habits you can practise, with techniques for Parts 1 and 3 and a weekly practice routine.",
  body: [
    { type: "h2", text: "The test in brief" },
    {
      type: "table",
      head: ["Part", "Format", "Length"],
      rows: [
        ["Part 1", "Introduction and questions on familiar topics (home, work, studies, hobbies)", "4–5 minutes"],
        ["Part 2", "Long turn from a task card, with one minute to prepare", "3–4 minutes including preparation"],
        ["Part 3", "Discussion of more abstract issues linked to the Part 2 topic", "4–5 minutes"],
      ],
    },
    {
      type: "p",
      text: "The whole test takes 11–14 minutes and is a face-to-face conversation with an examiner (in some centres it may be conducted by video call with an examiner, but it is still a live conversation). It is recorded for quality purposes. Your score is based on the whole test, not on each part separately.",
    },
    { type: "h2", text: "What the four criteria mean in practice" },
    {
      type: "table",
      head: ["Criterion", "Band 7 in plain English", "Habit to build"],
      rows: [
        ["Fluency and Coherence", "You speak at length without noticeable effort; any hesitation is about finding language, not ideas; you use connectives and discourse markers with some flexibility", "Extend every answer with a reason or example; use natural markers such as 'actually', 'the thing is', 'on the other hand'"],
        ["Lexical Resource", "You discuss a range of topics flexibly, use some less common and idiomatic vocabulary, show awareness of collocation and paraphrase effectively", "Learn vocabulary in phrases, not single words; practise rephrasing when you cannot find a word"],
        ["Grammatical Range and Accuracy", "You use a range of complex structures with some flexibility and frequently produce error-free sentences", "Use conditionals, relative clauses and varied tenses naturally; fix your three most frequent errors"],
        ["Pronunciation", "You are easy to understand throughout; you use features such as stress, rhythm and intonation effectively, with only occasional lapses", "Practise sentence stress and chunking; record yourself and compare with fluent speakers"],
      ],
    },
    {
      type: "p",
      text: "Notice that **accent is not a criterion**. You do not need to sound British, American or anything else. What matters is that the listener can understand you without effort.",
    },
    { type: "h2", text: "Part 1: extend, don't lecture" },
    {
      type: "p",
      text: "Part 1 questions are simple, and one-word or one-sentence answers give the examiner very little evidence. On the other hand, a two-minute speech in Part 1 is unnatural. Aim for **two to four sentences**: a direct answer followed by a reason, an example or a contrast.",
    },
    {
      type: "example",
      title: "Question: Do you like cooking?",
      text: "Weak: Yes, I like cooking.\n\nBetter: Yes, I do, actually — though mostly at weekends. During the week I'm usually too tired to make anything elaborate, but on Sundays I like trying out new recipes, especially dishes from places I've travelled to. Last month I attempted a Thai green curry, which turned out surprisingly well.",
    },
    {
      type: "table",
      head: ["Extension technique", "Example"],
      rows: [
        ["Answer + reason", "…because it helps me switch off after work."],
        ["Answer + example", "For instance, last weekend I…"],
        ["Answer + contrast", "…although when I was younger I couldn't stand it."],
        ["Answer + frequency or time", "…mostly at weekends, and more in winter."],
      ],
    },
    { type: "h2", text: "Part 3: handling abstract questions" },
    {
      type: "p",
      text: "Part 3 moves from your personal experience to society in general. Questions ask you to compare, evaluate, predict or speculate. This is where Band 7 candidates separate themselves, because longer, more abstract answers create natural opportunities for complex grammar and less common vocabulary.",
    },
    {
      type: "ol",
      items: [
        "**Give a direct answer** in the first sentence.",
        "**Explain** with a reason or a general principle.",
        "**Support** with an example, perhaps from your country.",
        "**Add nuance**: an exception, a contrast or a 'depends on' point.",
      ],
    },
    {
      type: "example",
      title: "Question: Why do some people find it difficult to learn new skills as adults?",
      text: "I think the main reason is time rather than ability. Most adults have work and family commitments, so it's hard to practise consistently, and skills like music or languages really depend on regular practice. In my country, for example, a lot of people sign up for evening classes and then drop out after a few weeks because their schedule changes. That said, I'd also say there's a psychological element — adults tend to be more afraid of looking foolish than children, so they're less willing to make the mistakes that learning involves.",
    },
    {
      type: "tip",
      text: "If you do not know much about a topic, say so naturally and still answer: 'I haven't really thought about that before, but I'd imagine that…' This is a fluent, honest response.",
    },
    { type: "h2", text: "Useful language for Part 3" },
    {
      type: "table",
      head: ["Function", "Phrases"],
      rows: [
        ["Buying thinking time", "That's an interesting question… / Let me think about that for a second…"],
        ["Generalising", "Generally speaking,… / On the whole,… / By and large,…"],
        ["Speculating", "I'd imagine that… / It's likely that… / There's a good chance that…"],
        ["Comparing past and present", "Compared with a generation ago,… / Whereas people used to…, nowadays…"],
        ["Adding nuance", "That said,… / Having said that,… / It depends to some extent on…"],
        ["Clarifying a question", "Sorry, do you mean… or…?"],
      ],
    },
    { type: "h2", text: "Fluency: what helps and what hurts" },
    {
      type: "ul",
      items: [
        "**Pausing is fine; long silences are not.** A short pause to think is natural. Filling a pause with 'well' or 'let me see' sounds more fluent than silence.",
        "**Self-correction is acceptable** in moderation. Constantly restarting sentences, however, interrupts flow.",
        "**Do not slow down to avoid mistakes.** Speaking at a natural pace with occasional errors usually creates a better impression than slow, careful speech.",
        "**Avoid memorised chunks.** Rehearsed paragraphs sound different from spontaneous speech and are not credited as evidence of your real ability.",
      ],
    },
    { type: "h2", text: "Pronunciation: three quick wins" },
    {
      type: "ol",
      items: [
        "**Word stress.** Check the stress of words you use often, such as 'deVELopment', 'ecoNOMic', 'PHOtograph' versus 'phoTOGraphy'.",
        "**Sentence stress.** Stress the content words that carry meaning and let small words like 'to', 'of' and 'the' become weaker.",
        "**Chunking.** Pause between meaningful groups of words, not in the middle of them.",
      ],
    },
    {
      type: "p",
      text: "The most efficient way to work on these is to record yourself answering a question, listen back, and compare with a recording of a fluent speaker. Dictation practice also sharpens your ear for natural stress and linking.",
    },
    { type: "h2", text: "Grammar range without forcing it" },
    {
      type: "p",
      text: "Candidates sometimes try to squeeze complex grammar into every answer, which sounds unnatural. A better approach is to recognise which question types naturally invite which structures, and let the grammar follow the meaning.",
    },
    {
      type: "table",
      head: ["Question type", "Natural structure", "Example"],
      rows: [
        ["Past experience", "Past simple, past continuous, 'used to'", "I used to walk to school, but when we moved I started taking the bus."],
        ["Hypothetical", "Second and third conditionals", "If I had more free time, I'd probably learn the guitar."],
        ["Future and prediction", "will, be likely to, might", "I think remote working is likely to become even more common."],
        ["Comparison", "Comparatives, 'whereas', 'the more… the more…'", "The more people rely on apps, the less they remember phone numbers."],
        ["Description", "Relative clauses", "It's a small café that my grandmother used to own."],
      ],
    },
    {
      type: "p",
      text: "Accuracy matters as much as range. At Band 7, the descriptors expect frequent error-free sentences, so it is worth identifying your personal recurring errors (articles, third-person -s, past tense endings) and fixing them through regular recording and review.",
    },
    { type: "h2", text: "A weekly practice routine" },
    {
      type: "table",
      head: ["Day", "Activity (20–30 minutes)"],
      rows: [
        ["Mon", "Ten Part 1 questions, recorded; check each answer has 2–4 sentences"],
        ["Tue", "Two Part 2 cue cards with a one-minute timer"],
        ["Wed", "Learn 15 topic phrases (collocations, not single words)"],
        ["Thu", "Five Part 3 questions using the answer–explain–support–nuance pattern"],
        ["Fri", "Listen back to Monday's recording; list your three most common errors"],
        ["Sat", "Full mock speaking test with a partner or the practice tool"],
        ["Sun", "Rest, or listen to a podcast and shadow a short section"],
      ],
    },
  ],
  faqs: [
    {
      q: "Does my accent affect my IELTS Speaking score?",
      a: "Accent itself is not assessed. The Pronunciation criterion is about how easy you are to understand and how well you use features such as stress, rhythm and intonation.",
    },
    {
      q: "Can I ask the examiner to repeat a question?",
      a: "Yes. Asking for repetition or clarification occasionally is natural and is not penalised. In Part 3, you can also ask what a word in the question means.",
    },
    {
      q: "Should I use idioms to get Band 7?",
      a: "Use them only if they are natural and accurate. The criteria refer to idiomatic vocabulary used with awareness of style and collocation; forced or incorrect idioms can harm your Lexical Resource score.",
    },
    {
      q: "How long should my Part 1 answers be?",
      a: "Usually two to four sentences: a direct answer plus a reason, example or contrast. That is enough to show your ability without sounding like a speech.",
    },
    {
      q: "Is it bad to say 'I don't know' in IELTS Speaking?",
      a: "You are assessed on language, not knowledge. If you do not know, say so naturally and then offer a reasonable guess or a related idea.",
    },
  ],
  related: [
    { href: "/speaking-practice", label: "Practise Speaking Parts 1–3" },
    { href: "/band-descriptors", label: "Read the Speaking band descriptors" },
    { href: "/dictation", label: "Train your ear with dictation" },
    { href: "/vocabulary", label: "Learn topic collocations" },
    { href: "/study-plan", label: "Build a study plan" },
  ],
};

const examDay: Guide = {
  slug: "ielts-exam-day-tips-and-test-format",
  category: "Exam Strategy",
  title: "IELTS Test Format and Exam Day Tips: What to Expect",
  description:
    "A clear guide to the IELTS test format, section timings, computer versus paper differences, what to bring on the day and practical tactics for each section.",
  keywords: [
    "IELTS test format",
    "IELTS exam day tips",
    "IELTS computer vs paper",
    "IELTS test timing",
    "what to bring to IELTS test",
    "IELTS Academic vs General Training",
    "computer-delivered IELTS",
  ],
  published: DATE,
  updated: DATE,
  readMinutes: 9,
  summary:
    "Knowing exactly what will happen on test day removes a surprising amount of stress. This guide sets out the format and timing of each section, the practical differences between computer-delivered and paper-based tests, what to bring, and section-by-section tactics. Always check the latest rules with your own test centre, as procedures can vary.",
  body: [
    { type: "h2", text: "The four sections at a glance" },
    {
      type: "p",
      text: "Every IELTS candidate takes four sections: Listening, Reading, Writing and Speaking. Listening and Speaking are the same for Academic and General Training; Reading and Writing differ. Listening, Reading and Writing are taken together, one after another without breaks, while Speaking may be on the same day or on a different day.",
    },
    {
      type: "table",
      head: ["Section", "Time", "Content"],
      rows: [
        ["Listening", "About 30 minutes (+ transfer time on paper)", "4 recordings, 40 questions"],
        ["Reading", "60 minutes", "3 passages (Academic) or several shorter texts in 3 sections (General Training), 40 questions"],
        ["Writing", "60 minutes", "Task 1 (report or letter, 150+ words) and Task 2 (essay, 250+ words)"],
        ["Speaking", "11–14 minutes", "3-part face-to-face interview with an examiner"],
      ],
    },
    { type: "h2", text: "Academic versus General Training" },
    {
      type: "table",
      head: ["", "Academic", "General Training"],
      rows: [
        ["Typical purpose", "University study, some professional registration", "Work experience, training, migration"],
        ["Reading texts", "Long passages from books, journals and magazines", "Everyday notices and adverts, workplace texts, then one longer general-interest text"],
        ["Writing Task 1", "Describe a graph, table, chart, map or process", "Write a letter (formal, semi-formal or informal)"],
        ["Writing Task 2", "Essay", "Essay (generally on more everyday topics)"],
      ],
    },
    {
      type: "p",
      text: "Check which module your university, employer or immigration authority requires before you book. Taking the wrong one is an expensive mistake.",
    },
    { type: "h2", text: "Computer-delivered versus paper-based" },
    {
      type: "p",
      text: "The content, question types, difficulty and scoring are the same in both formats. The Speaking test is a live conversation with an examiner in both cases. The differences are practical.",
    },
    {
      type: "table",
      head: ["Feature", "Paper-based", "Computer-delivered"],
      rows: [
        ["Listening answers", "Write on the question paper, then 10 minutes to transfer to the answer sheet", "Type answers directly; about 2 minutes at the end to review"],
        ["Reading answers", "Write directly on the answer sheet within the 60 minutes (no extra transfer time)", "Type or click answers; on-screen highlighting and notes available"],
        ["Writing", "Handwritten; you count words yourself", "Typed; an on-screen word count is shown"],
        ["Moving between sections", "Questions in one booklet", "Navigation bar lets you jump between questions"],
        ["Results", "Usually take longer", "Usually available sooner"],
      ],
    },
    {
      type: "tip",
      text: "Choose the computer format if you type faster than you write by hand and are comfortable reading on screen. Choose paper if you like to annotate heavily and write quickly by hand. Either way, practise in the format you will sit.",
    },
    { type: "h2", text: "What to bring" },
    {
      type: "ul",
      items: [
        "**The identification document you used to register**, usually your passport or national identity card. Without it you may not be allowed to sit the test.",
        "**Your booking confirmation** or candidate details, if your centre requests them.",
        "**Pencils, an eraser and a sharpener** for the paper-based test (some centres supply these; check in advance).",
        "**Water in a clear bottle** with the label removed, if your centre permits it.",
      ],
    },
    {
      type: "p",
      text: "Phones, watches, bags and notes must be left outside the test room. Some centres also photograph candidates and take fingerprints or other biometric details for security, so arrive with time to spare.",
    },
    { type: "h2", text: "The day before and the morning of the test" },
    {
      type: "ol",
      items: [
        "**Stop learning new material.** Light revision of your mistakes list is enough.",
        "**Confirm the address, start time and arrival time.** Plan your route and allow for delays.",
        "**Prepare your ID and bag** the night before.",
        "**Sleep and eat normally.** Listening, Reading and Writing run for well over two and a half hours without a break.",
        "**Warm up in English** on the way: listen to a short podcast or talk to yourself about your plans for the day.",
      ],
    },
    { type: "h2", text: "Section-by-section tactics" },
    { type: "h3", text: "Listening" },
    {
      type: "ul",
      items: [
        "Use the reading time before each part to underline keywords and predict the type of answer (a number, a name, a noun).",
        "Watch the word limit, such as 'NO MORE THAN TWO WORDS AND/OR A NUMBER'. Exceeding it makes the answer wrong.",
        "Spelling counts. Practise common spellings of names, months, places and numbers.",
        "If you miss an answer, let it go and move on immediately; the recording is played once only.",
      ],
    },
    { type: "h3", text: "Reading" },
    {
      type: "ul",
      items: [
        "Spend roughly 20 minutes per passage, and leave a moment to check you have answered everything.",
        "Read the questions first, then scan for keywords and their synonyms.",
        "Know the difference between FALSE (the text contradicts the statement) and NOT GIVEN (the text does not say).",
        "Never leave a blank: there is no penalty for wrong answers.",
      ],
    },
    { type: "h3", text: "Writing" },
    {
      type: "ul",
      items: [
        "Spend about 20 minutes on Task 1 and 40 minutes on Task 2, because Task 2 carries twice the weight.",
        "Some candidates start with Task 2 for this reason. That is allowed; just make sure you leave enough time for Task 1.",
        "Plan for a few minutes before writing each task and keep a couple of minutes to check grammar and spelling.",
      ],
    },
    { type: "h3", text: "Speaking" },
    {
      type: "ul",
      items: [
        "Treat it as a conversation, not an exam recital.",
        "Extend your answers with reasons and examples.",
        "Ask for repetition if you did not hear a question; that is perfectly acceptable.",
      ],
    },
    { type: "h2", text: "Managing nerves and concentration" },
    {
      type: "p",
      text: "Most candidates feel nervous, and a little adrenaline can help you focus. Problems start when one difficult question affects the next ten. Plan in advance how you will respond to the moments that typically cause panic.",
    },
    {
      type: "table",
      head: ["Situation", "What to do"],
      rows: [
        ["You miss a Listening answer", "Guess, move your attention to the next question immediately, and return to it only at the end"],
        ["A Reading passage feels impossible", "Answer the easier question types first, guess the rest, and protect time for the next passage"],
        ["You run out of ideas in Writing Task 2", "Develop your existing idea further with an example rather than adding a new one"],
        ["Your mind goes blank in Speaking", "Say so naturally ('Let me think about that for a moment') and start with something simple"],
      ],
    },
    {
      type: "p",
      text: "Concentration over several hours is a skill you can train. In your final fortnight, take at least one or two complete Listening, Reading and Writing sessions back to back, at the same time of day as your real test if possible.",
    },
    { type: "h2", text: "How your score is reported" },
    {
      type: "p",
      text: "You receive a band from 0 to 9 for each section, in whole or half bands, and an overall band that is the average of the four, rounded to the nearest half band. An average ending in .25 rounds up to the next half band and one ending in .75 rounds up to the next whole band. Listening and Reading raw scores out of 40 are converted to bands; Writing and Speaking are marked against published band descriptors.",
    },
    {
      type: "tip",
      text: "Work out the overall band you need and which combinations of section scores achieve it. Knowing that a weaker Writing score can be balanced by a stronger Listening score can reduce exam-day pressure.",
    },
    { type: "h2", text: "A final word on preparation" },
    {
      type: "p",
      text: "The single most useful preparation for exam day is at least one full, timed mock test in the format you will sit, taken in one session without breaks. It reveals whether your timing works, whether you can concentrate for the full duration, and which section needs the most attention in your remaining study time.",
    },
    {
      type: "p",
      text: "This guide is independent practice advice. Rules on identification, permitted items and timing can change and may differ between centres, so always follow the instructions from your test provider.",
    },
  ],
  faqs: [
    {
      q: "How long is the IELTS test in total?",
      a: "Listening, Reading and Writing together take about two hours and forty minutes, taken without breaks. Speaking lasts 11–14 minutes and may be on the same day or a different day.",
    },
    {
      q: "Is computer-delivered IELTS easier than paper-based?",
      a: "No. The questions, difficulty and marking are the same. The difference is practical: typing versus handwriting, and on-screen versus paper reading.",
    },
    {
      q: "Can I use a pen in the paper-based test?",
      a: "Listening and Reading answers are normally written in pencil. Check your centre's instructions for Writing, as rules can vary.",
    },
    {
      q: "Is there negative marking in IELTS Listening or Reading?",
      a: "No. Wrong answers do not lose marks, so you should always attempt every question.",
    },
    {
      q: "Do I get extra time to transfer answers in Reading?",
      a: "No. In the paper-based test, only Listening has extra transfer time. Reading answers must be written on the answer sheet within the 60 minutes.",
    },
    {
      q: "Can I write in capital letters?",
      a: "In Listening and Reading, answers in capital letters are generally accepted, which can help avoid unclear handwriting. For Writing, use normal sentence case.",
    },
  ],
  related: [
    { href: "/tests", label: "Take a full timed mock test" },
    { href: "/calculator", label: "Calculate your overall band" },
    { href: "/score-converter", label: "Convert raw scores to bands" },
    { href: "/study-plan", label: "Plan your final weeks" },
    { href: "/reading-speed-test", label: "Check your reading speed" },
  ],
};

export const WRITING_SPEAKING_GUIDES: Guide[] = [
  opinionEssay,
  discussionEssay,
  lineGraph,
  barChartTable,
  gtLetter,
  cueCard,
  speakingBand7,
  examDay,
];
