import type { Guide } from "./types";

export const READING_LISTENING_GUIDES: Guide[] = [
  // ---------------------------------------------------------------------------
  // 1. True / False / Not Given
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-reading-true-false-not-given",
    category: "Reading",
    title: "IELTS True False Not Given: Strategy & Examples",
    description:
      "Master IELTS True/False/Not Given and Yes/No/Not Given questions with a step-by-step method, worked examples and the traps that cost most candidates marks.",
    keywords: [
      "ielts true false not given",
      "true false not given tips",
      "yes no not given ielts",
      "ielts reading not given",
      "ielts reading question types",
      "true false not given examples",
      "ielts reading strategy",
      "difference between false and not given",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 9,
    summary:
      "True/False/Not Given is the question type candidates most often say they dread, mainly because the line between False and Not Given feels blurry. This guide gives you a repeatable four-step method, explains how Yes/No/Not Given differs, and walks through worked examples so you can see the reasoning behind each answer.",
    body: [
      { type: "h2", text: "What the question actually asks" },
      {
        type: "p",
        text: "In a True/False/Not Given task you read a list of statements and decide how each one relates to the information in the passage. You are not being asked whether the statement is true in the real world. You are being asked whether **the passage** confirms it, contradicts it, or says nothing that settles it. That single idea solves most of the confusion around this question type.",
      },
      {
        type: "table",
        head: ["Answer", "What it means", "Quick test"],
        rows: [
          ["TRUE", "The passage states the same information, usually in different words.", "Could you underline a sentence that says the same thing?"],
          ["FALSE", "The passage states the opposite, or something that cannot be true at the same time.", "Could you underline a sentence that makes the statement impossible?"],
          ["NOT GIVEN", "The passage does not provide enough information to confirm or contradict the statement.", "Are you searching for something that simply is not there?"],
        ],
      },
      {
        type: "p",
        text: "Notice that both TRUE and FALSE need **evidence you can point to**. NOT GIVEN is the answer when that evidence does not exist. If you find yourself building an argument from general knowledge or common sense, you are almost certainly looking at a NOT GIVEN.",
      },
      { type: "h2", text: "True/False/Not Given vs Yes/No/Not Given" },
      {
        type: "p",
        text: "The two formats use the same logic but test different things. **True/False/Not Given** checks factual information: dates, numbers, events, descriptions of how something works. **Yes/No/Not Given** checks the writer's views or claims: what the author believes, recommends, criticises or argues. You will usually see Yes/No/Not Given with passages that have an argumentative tone, such as a discussion of a scientific controversy or an opinion piece about urban planning.",
      },
      {
        type: "table",
        head: ["Feature", "True/False/Not Given", "Yes/No/Not Given"],
        rows: [
          ["Tests", "Facts in the passage", "Opinions or claims of the writer"],
          ["Instruction wording", "Does the statement agree with the information given?", "Does the statement agree with the views/claims of the writer?"],
          ["Typical signal words in the passage", "Dates, figures, processes, descriptions", "Evaluative language: surprisingly, unfortunately, it is clear that, arguably"],
          ["Common trap", "Treating missing details as False", "Confusing someone else's opinion quoted in the text with the writer's own view"],
        ],
      },
      {
        type: "tip",
        text: "Write the right words. If the instructions say TRUE/FALSE/NOT GIVEN, writing YES or NO is marked wrong, and the reverse is also true. Most instructions allow you to write the full word or the letters T/F/NG (or Y/N/NG); check the instruction box and follow it exactly.",
      },
      { type: "h2", text: "A four-step method that works" },
      {
        type: "ol",
        items: [
          "**Read the statement and underline the key idea and any qualifiers.** Qualifiers are words like all, some, only, always, never, most, first, increased. They are where the answer usually hides.",
          "**Locate the relevant part of the passage.** Questions follow the order of the text, so the answer to question 3 will normally sit between the answers to questions 2 and 4. Scan for names, numbers or distinctive nouns that are unlikely to be paraphrased.",
          "**Read that section carefully, word by word.** Skimming is for finding the place; it is not for deciding the answer. Read one sentence before and one after the target sentence as well.",
          "**Compare meaning, not words.** Ask: does the passage say the same thing, the opposite thing, or nothing about this specific claim? Then commit and move on.",
        ],
      },
      { type: "h2", text: "Worked example 1: a factual passage" },
      {
        type: "example",
        title: "Sample passage",
        text: "The town of Elmbridge opened its first public library in 1874, funded largely by donations from local mill owners. For its first decade, the library lent books only to residents who could provide a written reference from an employer. This rule was abolished in 1886, after which membership tripled within five years. Today the original building houses a museum, while the library itself operates from a modern site near the railway station.",
      },
      {
        type: "p",
        text: "**Statement A: The library was paid for entirely by the town council.** The passage says the library was 'funded largely by donations from local mill owners'. If most of the money came from mill owners, it cannot have been paid for entirely by the council. This is a direct contradiction, so the answer is **FALSE**.",
      },
      {
        type: "p",
        text: "**Statement B: Early borrowers needed a recommendation from their employer.** 'A written reference from an employer' is a paraphrase of 'a recommendation from their employer', and 'for its first decade' matches 'early borrowers'. The answer is **TRUE**.",
      },
      {
        type: "p",
        text: "**Statement C: The reference rule was removed because of complaints from residents.** The passage tells us the rule was abolished in 1886, but it gives no reason at all. It is tempting to assume complaints, but nothing in the text supports or rules this out. The answer is **NOT GIVEN**.",
      },
      {
        type: "p",
        text: "**Statement D: Membership grew after 1886.** Membership 'tripled within five years' after the rule was abolished in 1886. Tripling is growth, so the answer is **TRUE**. Note that you do not need the exact figure to appear in the statement; the meaning matches.",
      },
      {
        type: "p",
        text: "**Statement E: The museum is located near the railway station.** Read carefully: the **library** operates near the station, and the museum is in the original building. The statement swaps the two. Because the text tells us the museum is in a different place, this is **FALSE**. Swapped subjects like this are a classic trap.",
      },
      { type: "h2", text: "Worked example 2: the writer's views" },
      {
        type: "example",
        title: "Sample passage",
        text: "Many commentators claim that remote working will empty city centres permanently. This view, in my opinion, underestimates how much people value face-to-face contact. Admittedly, office occupancy has fallen in several cities, but cafés and cultural venues have often recovered faster than expected. Planners would be wise to convert some office space into housing rather than assume that demand will never return.",
      },
      {
        type: "p",
        text: "**Statement 1: Remote working will cause city centres to empty permanently.** This is the view of 'many commentators', and the writer disagrees with it ('underestimates how much people value face-to-face contact'). The question asks about the **writer's** view, so the answer is **NO**.",
      },
      {
        type: "p",
        text: "**Statement 2: Some office buildings should be turned into homes.** The writer says planners 'would be wise to convert some office space into housing'. That is a recommendation the writer makes, so the answer is **YES**.",
      },
      {
        type: "p",
        text: "**Statement 3: Cafés have become more profitable than offices.** The writer mentions that cafés 'recovered faster than expected', but says nothing about profitability compared with offices. The answer is **NOT GIVEN**.",
      },
      { type: "h2", text: "How to tell FALSE from NOT GIVEN" },
      {
        type: "p",
        text: "This is the distinction that costs the most marks. A useful question to ask yourself is: **'If the statement were true, would the passage have to be wrong?'** If yes, the answer is FALSE. If the passage and the statement could both be true at the same time, the answer is NOT GIVEN.",
      },
      {
        type: "ul",
        items: [
          "Passage: The bridge was completed in 1921. Statement: The bridge was completed after 1930. Both cannot be true, so **FALSE**.",
          "Passage: The bridge was completed in 1921. Statement: The bridge was the longest in the country when it opened. Both could be true; the passage simply does not say, so **NOT GIVEN**.",
          "Passage: Some species migrate in winter. Statement: All species migrate in winter. The passage limits the claim to some, which contradicts all, so **FALSE**.",
          "Passage: Researchers studied the effects of the drug on adults. Statement: The drug was not effective in children. Children were never studied, so **NOT GIVEN**.",
        ],
      },
      { type: "h2", text: "Common traps and how to avoid them" },
      {
        type: "table",
        head: ["Trap", "What happens", "How to avoid it"],
        rows: [
          ["Word matching", "The statement repeats words from the passage but changes the meaning.", "Compare full ideas, not individual words. Identical wording is often a warning sign."],
          ["Qualifier shift", "Passage says often; statement says always.", "Underline qualifiers in every statement before you read the passage."],
          ["Background knowledge", "You know the statement is true in real life, so you answer TRUE.", "Only the passage counts. If it is not in the text, it is NOT GIVEN."],
          ["Partial match", "Half of the statement matches the passage; the other half is unsupported.", "Every part of the statement must be confirmed for TRUE."],
          ["Comparison invented", "Statement compares two things that the passage describes separately.", "Check that the passage actually makes the comparison."],
          ["Time and sequence", "Statement says something happened first or before; passage gives a different order or no order.", "Mark dates and sequence words in the passage."],
        ],
      },
      { type: "h2", text: "Managing your time on this question type" },
      {
        type: "p",
        text: "NOT GIVEN answers take the longest because you are searching for something that is not there. Set a limit: if you have located the right section, read it closely and still cannot find the information after about a minute and a half, choose NOT GIVEN, put a small mark next to the question, and continue. Because the answers follow passage order, the next question will help confirm whether you were in the right place. If the answer to question 6 is clearly in paragraph C and question 8 is in paragraph D, the information for question 7 should be somewhere between them; if nothing is there, NOT GIVEN is very likely correct.",
      },
      {
        type: "tip",
        text: "Never leave a box empty. There is no penalty for wrong answers in IELTS, so a sensible guess always has a chance of earning a mark.",
      },
      { type: "h2", text: "How to practise effectively" },
      {
        type: "ul",
        items: [
          "After each practice set, write one sentence of justification for every answer, including the ones you got right. If you cannot point to the evidence, you got lucky.",
          "Keep an error log with three columns: question, your answer, the reason you were wrong (qualifier missed, background knowledge, wrong location, and so on). Patterns appear quickly.",
          "Practise paraphrase recognition: take a paragraph from any quality news article and rewrite each sentence with synonyms. This trains you to recognise the same idea in different words.",
          "Do some sets untimed to build accuracy, then move to timed practice once your reasoning is reliable.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between False and Not Given in IELTS Reading?",
        a: "FALSE means the passage says something that contradicts the statement, so both cannot be true. NOT GIVEN means the passage does not contain enough information to confirm or contradict it. Ask yourself whether the passage would have to be wrong for the statement to be true; if so, the answer is FALSE.",
      },
      {
        q: "Can I write T, F and NG instead of the full words?",
        a: "Usually yes, but always follow the instructions on the question paper. The key is to use the correct set of answers: never write YES or NO for a True/False/Not Given task, or TRUE or FALSE for a Yes/No/Not Given task.",
      },
      {
        q: "Are True/False/Not Given answers in passage order?",
        a: "Yes. The answers to this question type follow the order of information in the passage, which helps you locate each answer and narrow down where a NOT GIVEN answer would sit.",
      },
      {
        q: "When do I see Yes/No/Not Given instead?",
        a: "Yes/No/Not Given is used when the questions test the writer's opinions or claims rather than facts. It tends to appear with passages that present an argument or evaluate an idea.",
      },
      {
        q: "Should I use my own knowledge to answer?",
        a: "No. Your answers must be based only on what the passage says. A statement can be true in the real world and still be NOT GIVEN if the passage does not mention it.",
      },
    ],
    related: [
      { href: "/tests", label: "Practise with full IELTS mock tests" },
      { href: "/reading-speed-test", label: "Check your reading speed" },
      { href: "/vocabulary", label: "Build paraphrase vocabulary" },
      { href: "/calculator", label: "Convert your raw score to a band" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Matching headings
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-reading-matching-headings",
    category: "Reading",
    title: "IELTS Matching Headings: Method, Traps & Practice",
    description:
      "Learn a reliable method for IELTS Reading matching headings questions, with a worked example, the most common distractor traps and tips to save valuable time.",
    keywords: [
      "ielts matching headings",
      "matching headings strategy",
      "ielts reading headings tips",
      "list of headings ielts",
      "ielts reading main idea",
      "ielts reading question types",
      "matching headings practice",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 8,
    summary:
      "Matching headings tests whether you can identify the main idea of a paragraph, not just its details. This guide explains a practical method, shows a full worked example with distractors, and covers the timing decisions that stop this question type from eating your whole passage.",
    body: [
      { type: "h2", text: "What matching headings tests" },
      {
        type: "p",
        text: "You are given a list of headings, usually labelled with Roman numerals (i, ii, iii and so on), and a set of paragraphs or sections labelled with letters. Your job is to choose the heading that best summarises the **main idea** of each paragraph. There are almost always more headings than paragraphs, so some headings are not used. Sometimes one paragraph is done for you as an example; cross that heading off immediately.",
      },
      {
        type: "p",
        text: "Unlike most IELTS Reading tasks, matching headings questions **do not** test small details and the answers are not in a list order you can rely on. Each heading describes the whole paragraph. That is why this task rewards a different reading style from True/False/Not Given or sentence completion.",
      },
      { type: "h2", text: "Main idea vs supporting detail" },
      {
        type: "p",
        text: "A typical academic paragraph has a central point and several sentences that support it with examples, data, causes or consequences. The right heading captures the central point. The wrong headings often describe a single example or detail mentioned in passing. Training yourself to separate these two levels is the core skill.",
      },
      {
        type: "table",
        head: ["Paragraph element", "What it does", "Useful for headings?"],
        rows: [
          ["Topic sentence (often first or second sentence)", "States what the paragraph is about", "Very useful, but check it is not just an introduction to a contrast"],
          ["Examples and statistics", "Support the topic sentence", "Rarely; distractor headings often match a single example"],
          ["Contrast words: however, yet, but, nevertheless", "Can shift the focus of the paragraph", "Very important; the main idea often follows them"],
          ["Concluding sentence", "Sums up or links to the next paragraph", "Useful for confirming your choice"],
        ],
      },
      { type: "h2", text: "A step-by-step method" },
      {
        type: "ol",
        items: [
          "**Read the headings first, quickly.** Underline the key noun and the key idea in each (for example: reasons for failure, an unexpected benefit, early attempts). Notice headings that look similar; these pairs are where mistakes happen.",
          "**Read one paragraph at a time.** Read the first two sentences and the last sentence carefully, then skim the middle to check the direction does not change.",
          "**Summarise the paragraph in your own words**, in five words or fewer, before looking at the headings again. This stops the headings from steering your reading.",
          "**Match your summary to a heading.** If two headings seem possible, write both lightly next to the paragraph and move on. Later paragraphs will often use up one of them.",
          "**Do the easiest paragraphs first.** Short paragraphs with a clear topic sentence are quick wins and reduce the options left for harder ones.",
          "**Review leftovers.** At the end, compare the remaining headings with the paragraphs you were unsure about.",
        ],
      },
      {
        type: "tip",
        text: "If a passage contains both a matching headings task and other question types, many candidates do the headings task first because it gives them an overview of the whole text, which then helps them locate details for the other questions.",
      },
      { type: "h2", text: "Worked example" },
      {
        type: "example",
        title: "Paragraph B",
        text: "Urban beekeeping has become fashionable in many European cities, with hives appearing on office roofs and hotel terraces. Some ecologists, however, warn that the trend may be doing more harm than good. Honeybees compete with wild bee species for the same pollen and nectar, and in areas with limited green space, a sudden increase in hives can leave too little food for native pollinators. One study of a large city found that wild bee numbers declined in districts where hive density was highest.",
      },
      {
        type: "example",
        title: "Paragraph C",
        text: "Supporters of rooftop hives point out that the problem lies less with the bees than with the shortage of flowers. Planting wildflower strips along roads, allowing park lawns to grow longer and choosing flowering trees for new streets can all increase the food available. Several councils now require developers to include planted roofs in new buildings, which benefits both kinds of bee.",
      },
      {
        type: "example",
        title: "List of headings (extract)",
        text: "i. The rising popularity of urban beekeeping. ii. A possible threat to native insects. iii. Ways to increase food supplies for pollinators. iv. The financial benefits of rooftop hives. v. Government bans on city hives. vi. How honey is produced in cities.",
      },
      {
        type: "p",
        text: "**Paragraph B.** The first sentence talks about popularity, so heading i looks attractive. But the word **however** in sentence two changes the direction: the rest of the paragraph is about honeybees competing with wild bees and wild bee numbers declining. The first sentence is background; the main idea is the risk to native pollinators. My five-word summary: 'hives may harm wild bees'. The answer is **ii**. Heading i is a distractor built from the opening sentence.",
      },
      {
        type: "p",
        text: "**Paragraph C.** The paragraph opens by shifting the problem to 'the shortage of flowers', then lists solutions: wildflower strips, longer lawns, flowering trees, planted roofs. My summary: 'more flowers solve the problem'. The answer is **iii**. Heading v is a trap: councils are mentioned, but they **require planted roofs**; nothing is said about banning hives. Heading iv mentions rooftop hives, but finances are never discussed.",
      },
      { type: "h2", text: "The most common traps" },
      {
        type: "ul",
        items: [
          "**The first-sentence trap.** The opening sentence introduces a topic that the paragraph then challenges or narrows. Always check for contrast words.",
          "**The detail trap.** A heading matches one example or one number in the paragraph. Ask: does this heading describe the whole paragraph or just one sentence of it?",
          "**The keyword trap.** A heading repeats a distinctive word from the paragraph, such as rooftop or council, but describes a different idea. Matching words is not matching meaning.",
          "**The near-twin trap.** Two headings differ by one word, for example causes of a decline and effects of a decline. Underline the word that makes them different.",
          "**The overlap trap.** A heading would suit two paragraphs. Decide which paragraph it suits best, and remember each heading can normally be used only once.",
        ],
      },
      { type: "h2", text: "Timing and decision-making" },
      {
        type: "p",
        text: "Matching headings can become a time sink because candidates read every paragraph in full and then reread to compare. A practical limit is around **one to one and a half minutes per paragraph** on the first pass. If you cannot decide, pencil in your two best options and move on. When you come back, the set of unused headings will be smaller, and the decision is usually easier.",
      },
      {
        type: "table",
        head: ["Stage", "Approximate time for a 6-paragraph task", "Goal"],
        rows: [
          ["Read and annotate headings", "1–2 minutes", "Know what each heading is really about"],
          ["First pass, paragraph by paragraph", "6–8 minutes", "Secure the clear matches"],
          ["Second pass on uncertain paragraphs", "2–3 minutes", "Decide between shortlisted headings"],
        ],
      },
      {
        type: "p",
        text: "These are guide figures rather than rules. If the passage also has other question types, you will need to keep the headings task within that overall budget, which is why securing the easy paragraphs first matters so much.",
      },
      { type: "h2", text: "Practice routine that builds the skill" },
      {
        type: "ol",
        items: [
          "Take any well-written article and, without looking at headings, write your own heading for each paragraph in five words or fewer.",
          "Compare your headings with the article's subheadings, if it has them, and notice where you focused on detail instead of the main point.",
          "When you practise with test material, record why each wrong heading was wrong. Over time you will recognise the distractor patterns instantly.",
          "Learn common heading vocabulary: drawbacks, obstacles, consequences, origins, misconceptions, a comparison of, a proposed solution, an unexpected finding. Headings often use these abstract nouns while the paragraph uses concrete examples.",
        ],
      },
      {
        type: "tip",
        text: "Pay attention to abstract nouns in headings. A heading like 'An unexpected finding' will not repeat any words from the paragraph; you need to notice phrases such as 'contrary to expectations' or 'surprisingly' in the text.",
      },
    ],
    faqs: [
      {
        q: "Can I use the same heading twice in IELTS matching headings?",
        a: "Normally no. Each heading is used once, and there are more headings than paragraphs, so some will be left over. Always read the instructions in case a task states otherwise.",
      },
      {
        q: "Should I read the headings or the paragraph first?",
        a: "Read the headings quickly first so you know what you are looking for, then read each paragraph and summarise it in your own words before matching. This prevents the headings from biasing your reading.",
      },
      {
        q: "Is the topic sentence always the first sentence?",
        a: "No. The first sentence is often the topic sentence, but writers frequently start with background and then shift with words like however or yet. Always check the whole paragraph before deciding.",
      },
      {
        q: "Are matching headings answers in order?",
        a: "The paragraphs are in order, but the headings are not listed in the same order as the paragraphs. You cannot use sequence to locate answers the way you can with True/False/Not Given.",
      },
      {
        q: "What if the example heading is given?",
        a: "Cross it off the list straight away so you do not accidentally use it again, and read the example paragraph to get a feel for how abstract the headings are.",
      },
    ],
    related: [
      { href: "/tests", label: "Try a full Reading practice test" },
      { href: "/reading-speed-test", label: "Measure your reading speed" },
      { href: "/vocabulary", label: "Learn academic vocabulary" },
      { href: "/study-plan", label: "Build a personal study plan" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Skimming, scanning and time management
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-reading-tips-skimming-scanning-time-management",
    category: "Reading",
    title: "IELTS Reading Tips: Skimming, Scanning & Timing",
    description:
      "Practical IELTS Reading tips: how to skim and scan properly, a 20-minute-per-passage plan, and what to do when time runs short, since there is no transfer time.",
    keywords: [
      "ielts reading tips",
      "skimming and scanning ielts",
      "ielts reading time management",
      "how to finish ielts reading on time",
      "ielts reading 60 minutes",
      "ielts reading strategy",
      "ielts reading answer sheet",
      "ielts academic reading tips",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 9,
    summary:
      "Most candidates who lose marks in IELTS Reading do so because they run out of time, not because the passages are beyond them. This guide explains what skimming and scanning really involve, gives a minute-by-minute plan for each passage, and covers how to handle the answer sheet when there is no extra transfer time.",
    body: [
      { type: "h2", text: "The format in one paragraph" },
      {
        type: "p",
        text: "IELTS Reading has **three passages and 40 questions in 60 minutes**. In the Academic test, the passages come from books, journals, magazines and newspapers and usually become more demanding as you go. In General Training, the early sections use shorter everyday and workplace texts, with one longer general-interest text at the end. In both versions, there is **no extra time to transfer answers**: on paper you write your answers on the answer sheet within the 60 minutes, and on computer you type them directly. That makes time management the single most important skill in the module.",
      },
      { type: "h2", text: "Skimming: reading for the gist" },
      {
        type: "p",
        text: "Skimming means moving through the text quickly to understand its overall structure: what each paragraph is about and where the writer is going. You are not trying to understand every sentence. A good skim of a 900-word passage should take roughly two to three minutes.",
      },
      {
        type: "ul",
        items: [
          "Read the title, any subtitle and any introductory italic text in full.",
          "Read the first sentence of each paragraph and glance at the last sentence.",
          "Let your eyes pass over the middle of each paragraph, noticing names, dates, numbers and capitalised words.",
          "Write a two- or three-word note in the margin for each paragraph, such as history, problem, new research, criticism. These notes become your map.",
        ],
      },
      {
        type: "tip",
        text: "Skimming is not reading faster. It is choosing what not to read. If you catch yourself rereading a sentence during a skim, you have switched to careful reading too early.",
      },
      { type: "h2", text: "Scanning: finding a specific target" },
      {
        type: "p",
        text: "Scanning means searching for a specific piece of information without reading the surrounding text. It works best when you are looking for something visually distinctive. The trick is to decide **what to scan for** before you start.",
      },
      {
        type: "table",
        head: ["Good scan targets", "Why they work", "Weak scan targets"],
        rows: [
          ["Proper nouns (people, places, organisations)", "Capital letters stand out and are rarely paraphrased", "Common verbs like increase or show"],
          ["Numbers, dates, percentages", "Digits are easy to spot", "Abstract ideas like importance"],
          ["Technical terms and unusual words", "Hard to paraphrase, so they usually appear unchanged", "Words likely to be replaced by synonyms"],
          ["Words in italics or quotation marks", "Visually distinctive", "Short function words"],
        ],
      },
      {
        type: "p",
        text: "If a question contains no obvious scan target, use your skimming notes to go to the most likely paragraph, then read that paragraph carefully. This combination of skimming to locate and close reading to answer is how strong candidates work.",
      },
      { type: "h2", text: "Worked example: locating an answer" },
      {
        type: "example",
        title: "Question",
        text: "In which year did the researchers first publish results suggesting that sleep affects memory in fruit flies? (Write ONE NUMBER.)",
      },
      {
        type: "p",
        text: "**Step 1: choose scan targets.** 'Fruit flies' is a specific term likely to appear unchanged, and the answer is a year, so I will scan for four-digit numbers near that term. 'Sleep' and 'memory' are too common to be useful targets on their own.",
      },
      {
        type: "p",
        text: "**Step 2: use the paragraph map.** My skim notes say paragraph D is about animal studies. I go there first and scan for 'fruit flies' and dates.",
      },
      {
        type: "example",
        title: "Paragraph D (extract)",
        text: "Work on animals has supported these ideas. A team studying fruit flies began experiments in 1998, though it was not until 2003 that they published evidence linking sleep loss to poorer memory in the insects. Later studies in mice, published in 2009, reached similar conclusions.",
      },
      {
        type: "p",
        text: "**Step 3: read closely.** There are three dates. 1998 is when experiments began, 2009 is about mice, and 2003 is when the fruit-fly results were published. The answer is **2003**. Scanning got me to the right sentence in seconds; careful reading chose between the three numbers.",
      },
      { type: "h2", text: "A 20-minute-per-passage plan" },
      {
        type: "p",
        text: "Dividing 60 minutes equally gives 20 minutes per passage, but because the later passages are usually harder, many candidates aim to finish the first passage a little faster. Use the plan below as a starting point and adjust it after a few timed practice tests.",
      },
      {
        type: "table",
        head: ["Minutes (within each passage)", "Action", "Notes"],
        rows: [
          ["0–1", "Look at all question types for the passage", "Notice which are in passage order and which are not"],
          ["1–4", "Skim the passage and make paragraph notes", "Two or three words per paragraph"],
          ["4–16", "Answer the questions", "Start with tasks that give you an overview, such as headings, or the one you find quickest"],
          ["16–18", "Return to flagged questions", "Make a decision and fill every box"],
          ["18–20", "Write or check answers on the answer sheet", "On paper this is essential; on computer use it to review"],
        ],
      },
      {
        type: "table",
        head: ["Overall clock", "Target position"],
        rows: [
          ["0:00–0:18", "Passage 1 completed and answers recorded"],
          ["0:18–0:38", "Passage 2 completed and answers recorded"],
          ["0:38–0:58", "Passage 3 completed and answers recorded"],
          ["0:58–1:00", "Final check that no answer box is blank"],
        ],
      },
      {
        type: "tip",
        text: "Write the target finishing times at the top of your question paper before you start reading. A glance at the clock then tells you instantly whether you are ahead or behind.",
      },
      { type: "h2", text: "Paper vs computer: handling your answers" },
      {
        type: "p",
        text: "On the paper-based test, some candidates write answers on the question paper and plan to copy them across at the end. This is risky because the 60 minutes includes transfer. A safer habit is to transfer answers **at the end of each passage**, so you are never left with 40 answers to copy in the final minutes. On the computer-delivered test, you type answers directly into the boxes or select options, and you can move between passages freely, so the main risk is leaving questions unanswered as you jump around.",
      },
      {
        type: "ul",
        items: [
          "Spelling counts. A correctly located answer that is misspelled will be marked wrong.",
          "Check word limits such as NO MORE THAN TWO WORDS. Exceeding the limit makes the answer wrong.",
          "Copy words exactly as they appear in the passage for completion tasks, including singular or plural form.",
          "On paper, write clearly. Capital letters are generally accepted and can make your handwriting easier to read.",
        ],
      },
      { type: "h2", text: "When you are running out of time" },
      {
        type: "ol",
        items: [
          "**Do not abandon a passage entirely.** Some question types are much faster than others. Sentence completion and short-answer questions with clear scan targets can often be answered in under a minute each.",
          "**Prioritise in-order question types.** For tasks that follow passage order, you can work through the text once and pick up answers as you go.",
          "**Guess strategically.** There is no negative marking, so fill every blank. For True/False/Not Given, a guess has a reasonable chance; for multiple choice, eliminate what you can first.",
          "**Stay with the clock.** If one question has taken three minutes, it is almost always better to guess and move on than to keep searching.",
        ],
      },
      { type: "h2", text: "Building speed over several weeks" },
      {
        type: "p",
        text: "Reading speed improves with regular exposure to academic-style English. Aim to read a few longer articles each week from science, history and social science topics, and practise writing paragraph notes as you go. Alongside that, do timed passages and record how long each stage takes. Many candidates discover that their slowest stage is not reading but **deciding**: they hesitate between two answers for too long. Setting a personal time limit per question addresses this directly.",
      },
      {
        type: "p",
        text: "Finally, review every practice test properly. For each wrong answer, label the cause: located the wrong paragraph, misunderstood a paraphrase, ran out of time, or spelling and word limit. The fix for each is different, and knowing which one is costing you the most marks tells you exactly what to practise next.",
      },
    ],
    faqs: [
      {
        q: "Do you get extra time to transfer answers in IELTS Reading?",
        a: "No. Unlike Listening on paper, Reading has no extra transfer time. You must write your answers on the answer sheet within the 60 minutes, so it is safest to transfer them at the end of each passage.",
      },
      {
        q: "Should I read the questions or the passage first?",
        a: "A common, effective approach is to glance at the question types first, skim the passage to build a paragraph map, and then work through the questions. This gives you an overview without spending too long on careful reading of the whole text.",
      },
      {
        q: "How long should I spend on each passage?",
        a: "Around 20 minutes per passage is a sensible starting point. Many candidates aim to finish the first passage in about 17 or 18 minutes, leaving more time for the later, usually harder, passages.",
      },
      {
        q: "Is skimming the same as speed reading?",
        a: "No. Skimming means selectively reading the parts of a text that carry its structure, such as titles and first sentences, to understand the gist. It is a targeted technique rather than reading every word faster.",
      },
      {
        q: "Does spelling matter in IELTS Reading?",
        a: "Yes. Answers must be spelled correctly to receive the mark, and they must respect any word limit given in the instructions.",
      },
    ],
    related: [
      { href: "/reading-speed-test", label: "Take the reading speed test" },
      { href: "/tests", label: "Practise under timed conditions" },
      { href: "/calculator", label: "Work out your Reading band" },
      { href: "/study-plan", label: "Get a structured study plan" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Sentence and summary completion
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-reading-sentence-and-summary-completion",
    category: "Reading",
    title: "IELTS Sentence & Summary Completion: Full Guide",
    description:
      "How to answer IELTS Reading sentence and summary completion: predict the word type, respect word limits, avoid grammar traps and handle word-bank options.",
    keywords: [
      "ielts summary completion",
      "ielts sentence completion",
      "ielts reading completion questions",
      "no more than two words ielts",
      "summary completion word bank",
      "ielts reading gap fill",
      "ielts reading word limit",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 9,
    summary:
      "Completion questions look simple, but marks are often lost on word limits, spelling and grammar rather than comprehension. This guide covers sentence completion, summary completion with and without a word bank, and shows worked examples that walk through every decision.",
    body: [
      { type: "h2", text: "The main completion formats" },
      {
        type: "table",
        head: ["Format", "What you do", "Answers in passage order?"],
        rows: [
          ["Sentence completion", "Complete sentences with words taken from the passage", "Usually yes"],
          ["Summary completion (from the passage)", "Fill gaps in a summary of part of the passage using words from the text", "Usually yes, within the section summarised"],
          ["Summary completion (word bank)", "Choose words from a list (A, B, C...) to fill the gaps", "Usually yes, but the list contains extra options"],
          ["Note, table and flow-chart completion", "Similar skills applied to a structured layout", "Often, but not always"],
        ],
      },
      {
        type: "p",
        text: "All of these share the same core skill: understanding a paraphrased version of the text, then finding the exact words that complete it. The instructions tell you where answers come from and how many words you may use. Read them every time.",
      },
      { type: "h2", text: "Understanding word limits" },
      {
        type: "p",
        text: "Instructions such as **NO MORE THAN TWO WORDS AND/OR A NUMBER** or **ONE WORD ONLY** are strict. If you exceed the limit, the answer is marked wrong even if it contains the correct information.",
      },
      {
        type: "table",
        head: ["Instruction", "Acceptable answers", "Not acceptable"],
        rows: [
          ["ONE WORD ONLY", "erosion", "soil erosion"],
          ["NO MORE THAN TWO WORDS", "soil erosion, wind", "severe soil erosion"],
          ["ONE WORD AND/OR A NUMBER", "1850, 3 metres, metres", "three tall metres"],
          ["NO MORE THAN THREE WORDS AND/OR A NUMBER", "local fishing communities, 40 tonnes", "the local fishing communities"],
        ],
      },
      {
        type: "ul",
        items: [
          "Hyphenated words such as long-term are generally counted as one word.",
          "A number written in figures counts as a number, not a word.",
          "Articles such as the and a count as words, so leave them out if they push you over the limit.",
          "Use words from the passage. Do not change their form unless the instructions or a word bank allow it.",
        ],
      },
      { type: "h2", text: "A five-step method" },
      {
        type: "ol",
        items: [
          "**Read the instructions and note the word limit.** Circle it on the question paper.",
          "**Predict the type of word for each gap.** Is it a noun, verb, adjective or number? Singular or plural? A person, a place, a material, a process?",
          "**Identify scan targets in the sentence or summary.** Look for names, dates and technical terms around the gap.",
          "**Locate and read closely.** Find the matching section and read it carefully, looking for a paraphrase of the words around the gap.",
          "**Check grammar and meaning.** Read the completed sentence back to yourself. It must be grammatically correct and say the same as the passage.",
        ],
      },
      { type: "h2", text: "Worked example: sentence completion" },
      {
        type: "example",
        title: "Sample passage",
        text: "Early lighthouse keepers faced long periods of isolation, and supplies were often delivered only once a month by boat. In the nineteenth century, most lights were fuelled by whale oil, which produced a bright flame but was expensive. By the 1870s, many authorities had switched to kerosene, a cheaper fuel that also burned more cleanly. Automation in the twentieth century gradually removed the need for resident keepers.",
      },
      {
        type: "example",
        title: "Questions (NO MORE THAN TWO WORDS from the passage)",
        text: "1. Keepers received supplies about once a month, delivered by ______. 2. Whale oil gave a strong light but had the disadvantage of being ______. 3. Kerosene replaced whale oil partly because it was a ______ fuel.",
      },
      {
        type: "p",
        text: "**Question 1.** After 'by' we need a noun, a means of transport. The passage says 'delivered only once a month by boat'. Answer: **boat**.",
      },
      {
        type: "p",
        text: "**Question 2.** After 'being' we need an adjective describing a disadvantage. 'Produced a bright flame' matches 'gave a strong light', and the disadvantage is 'expensive'. Answer: **expensive**.",
      },
      {
        type: "p",
        text: "**Question 3.** The gap sits between 'a' and 'fuel', so we need an adjective. The passage says 'kerosene, a cheaper fuel that also burned more cleanly'. 'Cheaper' fits grammatically: 'a cheaper fuel'. 'Cleaner' would also be grammatically possible, but that word does not appear in the passage; the text says 'burned more cleanly', and the question asks for words from the passage. Answer: **cheaper**.",
      },
      {
        type: "tip",
        text: "If the grammar of your answer does not fit the sentence, it is almost certainly wrong, even if the meaning seems right. Grammar is one of your best checking tools in completion tasks.",
      },
      { type: "h2", text: "Worked example: summary with a word bank" },
      {
        type: "example",
        title: "Sample passage",
        text: "Coral reefs cover a tiny fraction of the ocean floor, yet they support a remarkable variety of marine life. Rising sea temperatures cause corals to expel the algae that live inside them, a process known as bleaching. If temperatures return to normal quickly, corals can recover, but prolonged heat often leads to their death. Scientists are now testing heat-tolerant corals grown in nurseries as one way to restore damaged reefs.",
      },
      {
        type: "example",
        title: "Summary and options",
        text: "Although reefs occupy a (1) ______ area, they are home to many species. When water becomes too warm, corals lose their algae. Corals may survive if conditions improve (2) ______, but long periods of heat are frequently (3) ______. Researchers are experimenting with corals that can (4) ______ higher temperatures. Options: A fatal B rapidly C small D withstand E enormous F gradually G harmless H avoid",
      },
      {
        type: "p",
        text: "**Gap 1** needs an adjective before 'area'. 'A tiny fraction of the ocean floor' means the area is small, so the answer is **C**. E (enormous) is the opposite and is a deliberate distractor.",
      },
      {
        type: "p",
        text: "**Gap 2** needs an adverb describing how conditions improve. The passage says 'return to normal quickly', so **B** (rapidly) is correct. F (gradually) is a distractor with the opposite meaning.",
      },
      {
        type: "p",
        text: "**Gap 3** follows 'are frequently', so we need an adjective. 'Prolonged heat often leads to their death' means long heat is often deadly: **A** (fatal). G (harmless) is the opposite.",
      },
      {
        type: "p",
        text: "**Gap 4** follows 'can', so we need a base verb. 'Heat-tolerant' means able to cope with heat, so **D** (withstand) fits. H (avoid) is grammatically possible but wrong in meaning, because the corals cannot avoid the temperature; they tolerate it.",
      },
      {
        type: "p",
        text: "Notice the pattern: word banks often contain **pairs of opposites** and words that fit the grammar but not the meaning. Grammar narrows the options; meaning decides the answer.",
      },
      { type: "h2", text: "Flow-chart and table completion" },
      {
        type: "p",
        text: "Flow-chart, table and note completion use the same skills, but the layout gives you extra clues. In a flow chart, each box usually represents one stage of a process, so the answers follow the order of the process described in the passage. In a table, the row and column headings tell you exactly what category of word you need: a date, a material, a location, a purpose. Read the headings before you read the passage and use them as scan targets.",
      },
      {
        type: "example",
        title: "Mini example: flow chart",
        text: "Passage: Harvested tea leaves are first spread out to wither, which reduces their moisture. They are then rolled to break the cell walls, after which they are left to oxidise before finally being dried. Flow chart (ONE WORD ONLY): leaves are withered, then rolled, then left to (1) ______, then dried.",
      },
      {
        type: "p",
        text: "The gap follows 'left to', so a base verb is needed, and the stage between rolling and drying is oxidation. The passage uses the verb form 'oxidise', so the answer is **oxidise**. Writing 'oxidation' would not fit the grammar of the flow chart.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "table",
        head: ["Mistake", "Example", "Fix"],
        rows: [
          ["Exceeding the word limit", "Writing the rising sea level when the limit is two words", "Remove articles and unnecessary adjectives"],
          ["Changing the word form", "Writing economical when the passage says economy", "Copy the exact word unless a word bank is provided"],
          ["Singular/plural errors", "Writing farmer when the gap needs farmers", "Check for clues such as a, many, several, or a plural verb"],
          ["Spelling mistakes", "Writing enviroment", "Copy letter by letter from the passage"],
          ["Answering from memory", "Using a synonym you think is better", "Use the passage's words; the answer is always there"],
        ],
      },
      { type: "h2", text: "Practice tips" },
      {
        type: "ul",
        items: [
          "Before looking at the passage, write your prediction (noun, adjective, number, plural) next to each gap. Check how often you were right afterwards.",
          "Work on recognising synonyms and paraphrases: expensive and costly, prolonged and long periods, tiny fraction and small area.",
          "When reviewing, read the completed sentences aloud. Errors in grammar or word limits become obvious.",
          "Build a list of words you often misspell from passages, especially academic nouns ending in -ment, -tion and -ence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do hyphenated words count as one word in IELTS?",
        a: "Hyphenated words such as well-known are generally treated as one word. If you are unsure, try to give an answer that clearly fits within the limit.",
      },
      {
        q: "Can I change the form of a word from the passage?",
        a: "When the instructions ask for words from the passage, copy them exactly. When you choose from a word bank, the options already have the right form, so just pick the letter or word as instructed.",
      },
      {
        q: "What happens if I write more words than allowed?",
        a: "The answer is marked wrong, even if it contains the correct word. Always check the word limit before you write.",
      },
      {
        q: "Are summary completion answers in order?",
        a: "They usually follow the order of the section being summarised, though the summary may cover only part of the passage. Use the first gap to find where the summary starts.",
      },
      {
        q: "Should I write the letter or the word for word-bank questions?",
        a: "Follow the instructions. Most word-bank tasks ask you to write the correct letter, such as A or C. Writing the word instead may be marked wrong.",
      },
    ],
    related: [
      { href: "/tests", label: "Practise completion questions in mock tests" },
      { href: "/vocabulary", label: "Expand your paraphrase vocabulary" },
      { href: "/grammar", label: "Review grammar for gap-fill accuracy" },
      { href: "/flashcards", label: "Drill tricky spellings with flashcards" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Listening tips
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-listening-tips",
    category: "Listening",
    title: "IELTS Listening Tips: Parts 1–4, Spelling & Transfer",
    description:
      "IELTS Listening tips: what to expect in Parts 1–4, how to predict answers, get numbers and spelling right, and transfer answers on paper or on computer.",
    keywords: [
      "ielts listening tips",
      "ielts listening sections",
      "ielts listening prediction",
      "ielts listening spelling",
      "ielts listening transfer time",
      "computer delivered ielts listening",
      "ielts listening numbers and dates",
      "how to improve ielts listening",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 9,
    summary:
      "IELTS Listening rewards preparation as much as listening ability: knowing what each part sounds like, predicting answers before the audio starts, and writing them accurately. This guide covers the four parts, a reliable prediction routine, the spelling and number rules that cost easy marks, and the difference between paper and computer transfer.",
    body: [
      { type: "h2", text: "The format at a glance" },
      {
        type: "p",
        text: "The Listening test has **four parts and 40 questions**, with ten questions in each part. The recordings last roughly **30 minutes** and you hear each one **only once**. Academic and General Training candidates take the same Listening test. What happens at the end depends on how you sit the exam: on the **paper-based** test you get **10 minutes** to transfer your answers to the answer sheet, while on the **computer-delivered** test you type answers as you listen and get **2 minutes** at the end to review them.",
      },
      {
        type: "table",
        head: ["Part", "Speakers", "Context", "Typical tasks"],
        rows: [
          ["Part 1", "Conversation between two people", "Everyday social situation, such as booking a course or reporting a lost item", "Form, note or table completion"],
          ["Part 2", "One speaker (monologue)", "Everyday social situation, such as a tour guide or a talk about local facilities", "Multiple choice, map or plan labelling, matching"],
          ["Part 3", "Conversation between up to four people", "Education or training, such as students discussing an assignment with a tutor", "Multiple choice, matching, sentence completion"],
          ["Part 4", "One speaker (monologue)", "Academic subject, such as a university lecture", "Note, summary or sentence completion"],
        ],
      },
      {
        type: "p",
        text: "The parts generally become more demanding as the test goes on. Part 1 uses slower, practical language with lots of names, numbers and dates. Part 4 is a continuous lecture with academic vocabulary and no second speaker to slow things down.",
      },
      { type: "h2", text: "Prediction: the most underrated skill" },
      {
        type: "p",
        text: "Before each part, you are given time to read the questions. Use every second of it. Strong listeners do not just read the questions; they **predict** what kind of answer will fill each gap. When the audio arrives, they already know what they are listening for.",
      },
      {
        type: "example",
        title: "Prediction in action (Part 1 form)",
        text: "Name of course: Introduction to (1) ______. Day of class: (2) ______. Cost per term: £(3) ______. Bring: a pair of (4) ______.",
      },
      {
        type: "ul",
        items: [
          "Gap 1: a subject, probably a noun, such as photography or pottery.",
          "Gap 2: a day of the week. Expect a possible change of mind: the speaker may mention Tuesday and then say it has moved to Thursday.",
          "Gap 3: a number. The £ sign is already printed, so write only the number.",
          "Gap 4: a plural noun after 'a pair of', such as gloves or scissors.",
        ],
      },
      {
        type: "p",
        text: "Now imagine the audio: 'The classes used to run on Tuesdays, but from this term they're on Thursday evenings instead. It's ninety-five pounds a term... oh, sorry, that's last year's price, it's a hundred and five now. And you'll need to bring some gloves, because the clay gets everywhere.' Because you predicted a day and a number, you were ready for the corrections. The answers are **Thursday**, **105** and **gloves**.",
      },
      {
        type: "tip",
        text: "Speakers often correct themselves. Listen for phrases like 'actually', 'sorry, I mean', 'no, wait', 'that's changed' and 'it used to be'. The answer is usually what comes after the correction.",
      },
      { type: "h2", text: "Follow the audio, not just the question" },
      {
        type: "p",
        text: "Answers come in order, so you should always know which question you are on. Keep your eyes one question ahead: as you listen for question 4, glance at question 5. If you miss an answer, let it go immediately. Stopping to think about a missed question is the most common way to lose the next two or three.",
      },
      { type: "h2", text: "Numbers, dates and spelling" },
      {
        type: "p",
        text: "Part 1 in particular tests names, addresses, phone numbers, dates and prices. These are easy marks if you prepare and painful losses if you do not. **Spelling must be correct** for the answer to be marked right.",
      },
      {
        type: "table",
        head: ["Item", "What to watch for", "Tips"],
        rows: [
          ["Spelled names", "Letters that sound alike: A/E/I, G/J, B/P/V, M/N", "Practise the English alphabet aloud; note double letters, for example 'double S'"],
          ["Teens vs tens", "Fifteen and fifty, thirteen and thirty", "Stress usually falls on -TEEN in fifteen and on the first syllable in FIFty"],
          ["Phone numbers", "'Double five', 'oh' for zero", "Write the digits as you hear them, grouping as the speaker does"],
          ["Dates", "Speakers may say 'the third of May' or 'May the third'", "Either 3 May or May 3 is normally acceptable; be consistent and clear"],
          ["Prices", "Pounds and pence, changes of price", "Do not repeat a currency symbol printed on the paper"],
          ["Postcodes", "Mix of letters and numbers", "Write in capitals to avoid ambiguity"],
        ],
      },
      {
        type: "p",
        text: "Common topic words also cause spelling errors: accommodation, necessary, environment, library, Wednesday, February, government, questionnaire. A short daily spelling drill using dictation is one of the highest-return activities for Listening preparation.",
      },
      { type: "h2", text: "Word limits" },
      {
        type: "p",
        text: "Completion tasks have word limits, for example **ONE WORD AND/OR A NUMBER** or **NO MORE THAN TWO WORDS**. If you write more, the answer is wrong. Leave out articles and any word that is already printed next to the gap. If the question shows 'per cent' after the gap, write only the number.",
      },
      { type: "h2", text: "Transferring answers: paper vs computer" },
      {
        type: "table",
        head: ["", "Paper-based", "Computer-delivered"],
        rows: [
          ["During the recording", "Write answers on the question paper", "Type or click answers directly on screen"],
          ["Time at the end", "10 minutes to transfer to the answer sheet", "2 minutes to review your answers"],
          ["Main risk", "Copying errors, misaligned numbers, spelling slips during transfer", "Typing errors and running out of review time"],
          ["Good habit", "Transfer carefully, check numbering every five answers", "Type each answer fully as you go; use the 2 minutes only to check"],
        ],
      },
      {
        type: "ul",
        items: [
          "On paper, you can write answers in capital letters, which often makes handwriting clearer.",
          "On paper, use the 10 minutes to check spelling, plurals and word limits, and to fill every blank with a guess.",
          "On computer, do not leave answers half-typed intending to fix them later; 2 minutes passes quickly.",
          "In both formats, there is no penalty for wrong answers, so never leave a gap empty.",
        ],
      },
      { type: "h2", text: "Part-by-part tips" },
      {
        type: "h3",
        text: "Part 1",
      },
      {
        type: "p",
        text: "Focus on accuracy. The language is everyday, but the spellings, numbers and corrections are designed to test attention. Aim to get almost every question in this part right.",
      },
      { type: "h3", text: "Part 2" },
      {
        type: "p",
        text: "One speaker gives information, often about a place or event. Map labelling and multiple choice are common. Study the map orientation during reading time and identify the starting point.",
      },
      { type: "h3", text: "Part 3" },
      {
        type: "p",
        text: "Several speakers discuss academic work, and they often agree, disagree or change their minds. Track who says what, and wait for the final decision before choosing an answer.",
      },
      { type: "h3", text: "Part 4" },
      {
        type: "p",
        text: "A single lecture on an academic topic. Use the headings in the notes to follow the structure. Listen for signposting such as 'moving on to', 'the second factor' and 'to sum up'. The answers are often nouns or adjectives that are key terms in the talk.",
      },
      { type: "h2", text: "Staying focused for 30 minutes" },
      {
        type: "p",
        text: "Concentration is a skill in its own right. Many candidates start strongly and lose focus during Part 3 or Part 4, when the recordings are longer and the vocabulary is more demanding. Two habits help. First, between parts, use the reading time actively: underline key words and make predictions, rather than looking back at earlier answers. Second, practise with complete tests, not only single parts, so that listening for half an hour becomes normal before the real exam.",
      },
      {
        type: "ul",
        items: [
          "Do not change an answer in the transfer or review time unless you have a clear reason; first instincts based on what you heard are often right.",
          "If an answer seems too easy or too obvious, check whether the speaker later corrected it.",
          "Keep the question paper neat enough that you can read your own notes during transfer.",
        ],
      },
      { type: "h2", text: "A weekly practice routine" },
      {
        type: "ol",
        items: [
          "Two timed practice sections a week, followed by a full review with the transcript.",
          "Ten minutes of dictation most days, focusing on numbers, names and academic vocabulary.",
          "Regular listening to podcasts, talks and lectures on varied topics, with a short spoken or written summary afterwards.",
          "An error log noting the cause of each mistake: missed correction, spelling, word limit, distractor, or lost place.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many times is the IELTS Listening recording played?",
        a: "Each recording is played once only, which is why reading the questions in advance and predicting answers is so important.",
      },
      {
        q: "Do I get extra time to transfer answers in IELTS Listening?",
        a: "On the paper-based test you get 10 minutes at the end to transfer answers to the answer sheet. On the computer-delivered test you type answers as you go and get 2 minutes at the end to review them.",
      },
      {
        q: "Does spelling count in IELTS Listening?",
        a: "Yes. An answer with incorrect spelling is marked wrong, so practise spelling common topic words, names and numbers.",
      },
      {
        q: "Can I write my answers in capital letters?",
        a: "On the paper-based test, writing in capitals is generally accepted and can make your answers easier to read. On computer, simply type the answer.",
      },
      {
        q: "Is the Listening test the same for Academic and General Training?",
        a: "Yes. Both Academic and General Training candidates take the same Listening test.",
      },
    ],
    related: [
      { href: "/dictation", label: "Practise spelling and numbers with dictation" },
      { href: "/tests", label: "Take a full Listening mock test" },
      { href: "/calculator", label: "Convert your Listening score to a band" },
      { href: "/vocabulary", label: "Learn common topic vocabulary" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Map and plan labelling
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-listening-map-and-plan-labelling",
    category: "Listening",
    title: "IELTS Listening Maps: Plan Labelling Strategy",
    description:
      "How to answer IELTS Listening map and plan labelling questions, with a table of direction language, a worked example and tips to keep your place on the map.",
    keywords: [
      "ielts listening map",
      "ielts map labelling",
      "ielts plan labelling",
      "ielts listening directions vocabulary",
      "ielts listening part 2 map",
      "map questions ielts tips",
      "ielts listening diagram labelling",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 8,
    summary:
      "Map and plan labelling questions confuse many candidates because they combine listening with spatial reasoning under time pressure. This guide shows you how to prepare the map in the reading time, explains the direction language you need, and walks through a full example.",
    body: [
      { type: "h2", text: "What the task looks like" },
      {
        type: "p",
        text: "You see a map or plan, such as a park, museum floor, campus, farm or town centre, with some locations already named and others marked with question numbers. A speaker describes the place, and you choose the correct letter from a list (for example A–H) or, less often, write a word on the plan. Map tasks appear most often in **Part 2**, where a single speaker such as a guide or manager gives a description, but they can appear elsewhere.",
      },
      {
        type: "p",
        text: "As with other Listening tasks, the answers come in order of the question numbers, and you hear the recording once. The challenge is that the speaker moves around the map, so you must track the route mentally as you listen.",
      },
      { type: "h2", text: "Use the reading time to prepare the map" },
      {
        type: "ol",
        items: [
          "**Find the starting point.** Look for a label such as 'You are here', an entrance, a reception or a car park. Speakers almost always begin from there.",
          "**Check orientation.** Is there a compass showing north? Is the entrance at the bottom of the plan? Turn your mental view so that you are standing where the speaker starts.",
          "**Note labelled landmarks.** Named features such as a lake, café or main road are the reference points the speaker will use.",
          "**Look at the question order.** Questions follow the order of the talk, so the numbered locations hint at the route. If question 11 is near the entrance and question 15 is at the far end, the speaker is likely to move from one to the other.",
          "**Predict language.** If a numbered spot is in a corner, expect 'in the corner'. If it is between two buildings, expect 'between' or 'in the middle of'.",
        ],
      },
      { type: "h2", text: "Direction and location language" },
      {
        type: "table",
        head: ["Phrase", "Meaning", "Example"],
        rows: [
          ["opposite / across from", "Facing something, on the other side of a road or space", "The shop is opposite the fountain."],
          ["next to / beside / alongside", "Immediately at the side of", "The toilets are next to the café."],
          ["adjacent to", "Next to, sharing a boundary", "The garden is adjacent to the car park."],
          ["between", "With one thing on each side", "The office is between the lift and the stairs."],
          ["in front of / behind", "Facing or at the back of, relative to the viewer or building", "There is a bench in front of the library."],
          ["at the far end of", "At the end furthest from the speaker or start", "The gym is at the far end of the corridor."],
          ["just past / just beyond", "A short distance after a landmark", "Just past the bridge, you will see the hut."],
          ["before you reach / just before", "A short distance ahead of a landmark", "Turn left just before you reach the gate."],
          ["on the corner of", "At the meeting point of two roads or walls", "The bank is on the corner of King Street."],
          ["bear left / bear right", "Turn slightly, not a sharp turn", "Bear right where the path splits."],
          ["clockwise / anticlockwise", "In the direction of a clock's hands, or the reverse", "Walk anticlockwise around the lake."],
          ["to the north-east of", "Compass direction from a reference point", "The picnic area is to the north-east of the pond."],
          ["at the top / bottom of the map", "Position on the page, not the real world", "The entrance is at the bottom of the plan."],
        ],
      },
      {
        type: "tip",
        text: "Left and right depend on the direction the speaker is facing. If the speaker is walking towards the bottom of the page, their left is your right as you look at the map. Trace the route with your pencil or finger so you do not lose track.",
      },
      { type: "h2", text: "Worked example" },
      {
        type: "example",
        title: "The plan (described in words)",
        text: "A community garden. The main gate is at the bottom centre of the plan. A path leads straight up from the gate to a circular pond in the middle. Around the pond are letters: A is to the left of the path, just inside the gate; B is to the right of the path, just inside the gate; C is on the left side of the pond; D is on the right side of the pond; E is above the pond, at the top left of the plan; F is at the top right. Questions: 11 Tool shed, 12 Herb beds, 13 Greenhouse, 14 Children's area.",
      },
      {
        type: "example",
        title: "Audio script",
        text: "Welcome to the garden. As you come in through the main gate, the first thing on your right is the tool shed, so that's where you'll collect gloves and spades. Carry on up the path towards the pond. Now, the herb beds aren't on this side; walk round to the left of the pond and you'll find them there, where they get the afternoon sun. People often expect the greenhouse to be near the gate, but it's actually right at the back, in the top corner on the left as you face away from the entrance. And finally, the children's area is in the opposite back corner, so that's on the right-hand side, well away from the pond for safety.",
      },
      {
        type: "p",
        text: "**Question 11, tool shed.** Coming in through the main gate, which is at the bottom, the speaker faces up the page, so their right matches the map's right. 'The first thing on your right' is **B**.",
      },
      {
        type: "p",
        text: "**Question 12, herb beds.** 'Walk round to the left of the pond' puts us on the left side of the pond: **C**. Note the distractor: 'aren't on this side' tells you not to choose D or the spots near the path.",
      },
      {
        type: "p",
        text: "**Question 13, greenhouse.** The speaker raises an expectation ('near the gate') and then corrects it ('actually right at the back'). 'Top corner on the left as you face away from the entrance' is **E**. Option A, near the gate on the left, is the trap.",
      },
      {
        type: "p",
        text: "**Question 14, children's area.** 'The opposite back corner... on the right-hand side' is **F**.",
      },
      { type: "h2", text: "Common problems and fixes" },
      {
        type: "table",
        head: ["Problem", "Why it happens", "Fix"],
        rows: [
          ["Losing your place", "The speaker moves quickly between areas", "Trace the route with your pencil as you listen"],
          ["Left/right confusion", "The speaker faces a different direction from you", "Decide the speaker's facing direction at the start and re-check after every turn"],
          ["Choosing the first place mentioned", "Speakers mention a location, then correct it", "Wait for words like actually, but, in fact"],
          ["Missing two answers at once", "Stopping to think about a difficult question", "Guess quickly and move on; return during transfer or review time"],
          ["Not knowing the vocabulary", "Unfamiliar words for features", "Learn common map nouns: path, junction, footbridge, roundabout, hedge, reception, courtyard, viewing platform"],
        ],
      },
      { type: "h2", text: "How to practise" },
      {
        type: "ul",
        items: [
          "Describe real routes aloud: how to get from your front door to the nearest shop, using the phrases in the table.",
          "Use any building floor plan or park map, cover the labels and ask a friend to describe where things are while you label them.",
          "After each practice task, read the transcript and underline the exact phrase that gave each answer. You will notice the same phrases repeating.",
          "Practise compass directions until 'north-west' or 'south-east' needs no thought.",
        ],
      },
      {
        type: "p",
        text: "Map questions often feel hard at first and become much easier with familiarity, because the language used is quite limited. Ten to fifteen practice maps, reviewed carefully, will make a noticeable difference for most candidates.",
      },
    ],
    faqs: [
      {
        q: "Which part of IELTS Listening has map questions?",
        a: "Map and plan labelling most commonly appears in Part 2, where one speaker describes a place, but it can appear in other parts as well.",
      },
      {
        q: "Are map labelling answers in order?",
        a: "Yes. The answers follow the order of the question numbers, which usually reflects the route the speaker takes.",
      },
      {
        q: "How do I avoid left and right confusion?",
        a: "Identify where the speaker starts and which way they are facing. If they face down the page, their left is your right. Tracing the route with your pencil helps.",
      },
      {
        q: "Do I write a letter or a word in map questions?",
        a: "Most map tasks ask you to choose a letter from a list of options marked on the plan. Some ask you to write a word. Follow the instructions for each task.",
      },
    ],
    related: [
      { href: "/tests", label: "Practise Listening Part 2 in a mock test" },
      { href: "/dictation", label: "Improve accuracy with dictation" },
      { href: "/vocabulary", label: "Learn direction and place vocabulary" },
      { href: "/flashcards", label: "Review map phrases with flashcards" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Multiple choice and distractors
  // ---------------------------------------------------------------------------
  {
    slug: "ielts-listening-multiple-choice-and-distractors",
    category: "Listening",
    title: "IELTS Listening Multiple Choice & Distractors",
    description:
      "How to handle IELTS Listening multiple choice: spot distractors, read options fast, tackle choose-two questions and follow speakers who change their minds.",
    keywords: [
      "ielts listening multiple choice",
      "ielts listening distractors",
      "ielts listening part 3 tips",
      "choose two letters ielts listening",
      "ielts listening traps",
      "ielts listening paraphrasing",
      "how to answer ielts listening mcq",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 8,
    summary:
      "Multiple choice is where IELTS Listening most often tricks well-prepared candidates, because every option is usually mentioned in some way. This guide explains the main types of distractor, shows how to read options quickly, and works through examples so you can see how the correct answer is signalled.",
    body: [
      { type: "h2", text: "Why multiple choice feels so hard" },
      {
        type: "p",
        text: "In Listening multiple choice you read a question with three options (A, B, C), or a longer list from which you choose two or more. The difficulty is not that the right answer is hidden; it is that **the wrong answers are mentioned too**. The recording is written so that you hear words connected to each option, and only careful listening to the meaning tells you which one is correct. These words and ideas that lead you to the wrong option are called **distractors**.",
      },
      { type: "h2", text: "The main types of distractor" },
      {
        type: "table",
        head: ["Distractor type", "What you hear", "What to do"],
        rows: [
          ["Word match", "An option's exact words are said, but in a different context", "Be suspicious of options that repeat the recording's words; the correct option is usually paraphrased"],
          ["Correction", "A speaker states something, then corrects it", "Wait for the final version; listen for actually, sorry, no, in fact"],
          ["Rejected suggestion", "One speaker suggests something; the other disagrees", "Note who agrees with what, and whether the idea is accepted"],
          ["Past vs present", "What used to be true vs what is true now", "Check whether the question asks about now, the past or the future"],
          ["Partial truth", "An option is true but does not answer the specific question", "Re-read the question stem: reason, problem, main purpose, most important?"],
          ["Considered but dismissed", "Several possibilities are discussed before a decision", "Listen for the decision: so we'll go with, let's do, I think that settles it"],
        ],
      },
      { type: "h2", text: "Reading the options efficiently" },
      {
        type: "p",
        text: "You do not have time to read every option slowly before each part. Instead, focus on the **question stem** and the **key difference between the options**.",
      },
      {
        type: "ol",
        items: [
          "Underline the key words in the question stem, especially words that define what is being asked: why, main, first, biggest problem, disagree.",
          "For each option, underline the one or two words that make it different from the others.",
          "Think of a quick paraphrase for each key word. If an option says cost, expect expensive, budget, price, can't afford.",
          "If the options are long, simplify them into a short label in your head: A = time, B = money, C = staff.",
        ],
      },
      {
        type: "tip",
        text: "The question stem is often paraphrased in the recording just before the answer. If the stem says 'What is the main reason for the delay?', listen for 'the real problem holding things up' or 'what's mostly caused it'. That is your signal to concentrate.",
      },
      { type: "h2", text: "Worked example 1: Part 3 discussion" },
      {
        type: "example",
        title: "Question",
        text: "Why do the students decide to change their research topic? A. Their tutor recommended a different subject. B. They could not find enough participants. C. The original topic had been studied too often.",
      },
      {
        type: "example",
        title: "Audio script",
        text: "Maya: I know Dr Lewis suggested we look at commuting habits instead, but honestly I wasn't keen on that. Tom: No, me neither. The problem with our original plan, sleep and exam performance, is that it's been done to death. Every second project last year was on it. Maya: True, although we probably would have got enough volunteers. Tom: Oh, definitely, people love talking about sleep. But we need something more original. Maya: Agreed, so let's drop it.",
      },
      {
        type: "p",
        text: "**Option A** is a word-match and rejected-suggestion distractor: the tutor did suggest something, but Maya 'wasn't keen' and Tom agrees, so the tutor's recommendation is not the reason. **Option B** is contradicted: they 'would have got enough volunteers'. **Option C** is paraphrased by 'it's been done to death' and 'every second project last year was on it', and the decision follows: 'let's drop it'. The answer is **C**.",
      },
      { type: "h2", text: "Worked example 2: Part 2 talk" },
      {
        type: "example",
        title: "Question",
        text: "What does the speaker say about the museum's new opening hours? A. They apply only at weekends. B. They will start next month. C. They were introduced after visitor feedback.",
      },
      {
        type: "example",
        title: "Audio script",
        text: "You may have heard that we're opening later on weekends from next month. That was the original plan, but we've brought it forward, and the longer hours actually start this week, on every day of the week. We made the change because so many visitors told us in our survey that they couldn't come before work.",
      },
      {
        type: "p",
        text: "**Option A** is a correction distractor: weekends were mentioned, but the hours apply 'on every day of the week'. **Option B** is also corrected: 'next month' was the original plan, but the change was brought forward. **Option C** matches: 'visitors told us in our survey' is a paraphrase of visitor feedback. The answer is **C**.",
      },
      { type: "h2", text: "Choose-two and choose-three questions" },
      {
        type: "p",
        text: "Some multiple-choice questions ask you to **choose TWO letters from A–E** (or similar). These usually count as two separate marks, and the two correct options can generally be written in either order. The same distractor types apply, but because there are more options, you need to keep a mental tally.",
      },
      {
        type: "ul",
        items: [
          "Cross out options as they are clearly rejected; tick them as they are clearly confirmed.",
          "Expect the options to be discussed in a different order from the list, so keep your eyes on all five.",
          "If you are sure of one answer and unsure of the other, still write two letters. A guess has a chance of scoring.",
          "On the paper answer sheet, follow the instructions for where to write each letter. On computer, select the required number of options.",
        ],
      },
      { type: "h2", text: "Following speakers who change their minds" },
      {
        type: "p",
        text: "Part 3 discussions are full of hesitation, agreement and disagreement. The language of agreement and disagreement is a reliable guide to the final answer.",
      },
      {
        type: "table",
        head: ["Agreement", "Disagreement or doubt", "Decision"],
        rows: [
          ["Exactly. / That's a good point.", "I'm not so sure about that.", "So that's what we'll do."],
          ["I couldn't agree more.", "That might be a problem, though.", "Right, let's go with that."],
          ["Yes, that makes sense.", "I see what you mean, but...", "OK, that settles it."],
          ["Good idea.", "I wasn't keen on that.", "Let's drop that, then."],
        ],
      },
      { type: "h2", text: "Practical strategies on the day" },
      {
        type: "ol",
        items: [
          "Use the reading time to underline key words in stems and options, not to read every word.",
          "Listen for the stem paraphrase that signals the answer is about to come.",
          "Do not choose an option the moment you hear its words. Wait until the speaker finishes the point.",
          "If two answers seem possible, choose the one that answers the exact question asked.",
          "If you lose a question, guess, then focus completely on the next one.",
        ],
      },
      { type: "h2", text: "Worked example 3: a choose-two question" },
      {
        type: "example",
        title: "Question and audio script",
        text: "Which TWO benefits of the new bike-share scheme does the speaker mention? A. lower fares B. less traffic C. better health D. more jobs E. cleaner air. Audio: People assumed the scheme would make travel cheaper, but in fact fares haven't changed. What we have seen is fewer cars on the main roads at peak times, and a local clinic has reported that regular users say they feel fitter. We'd hoped it would create employment too, but so far the operator has hired only two staff. Air quality? It's too early to tell.",
      },
      {
        type: "p",
        text: "Work through each option. A is rejected ('fares haven't changed'). B is confirmed by 'fewer cars on the main roads at peak times'. C is confirmed by 'feel fitter'. D is a hope that has not been realised. E is left undecided ('too early to tell'). The answers are **B** and **C**, in either order. Notice that every option was mentioned; only two were actually confirmed as benefits.",
      },
      { type: "h2", text: "How to practise" },
      {
        type: "ul",
        items: [
          "After each practice task, open the transcript and label why each wrong option was wrong using the distractor types above.",
          "Practise paraphrasing options before you listen: write two alternative ways of saying each option.",
          "Listen to discussions and interviews in English and note when speakers agree, disagree and decide.",
          "Track your errors over time. If correction distractors catch you repeatedly, train yourself to wait for the end of each point before choosing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are IELTS Listening multiple choice answers in order?",
        a: "Yes. The questions follow the order of the recording. Within a choose-two question, however, the options may be discussed in any order.",
      },
      {
        q: "Does the order of letters matter in choose-two questions?",
        a: "Generally, the two correct letters can be given in either order. Always follow the specific instructions and answer sheet layout.",
      },
      {
        q: "Why do I hear all three options in the recording?",
        a: "Because the recording deliberately mentions ideas related to the wrong options as distractors. You need to listen for meaning, corrections and decisions rather than matching words.",
      },
      {
        q: "Should I read all the options before the recording starts?",
        a: "Yes, but read efficiently. Underline the key words in the question and the words that make each option different, so you know what to listen for.",
      },
    ],
    related: [
      { href: "/tests", label: "Practise multiple choice in a mock test" },
      { href: "/dictation", label: "Train your ear with dictation" },
      { href: "/vocabulary", label: "Build paraphrase vocabulary" },
      { href: "/calculator", label: "Check your Listening band" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Band 6 to 7
  // ---------------------------------------------------------------------------
  {
    slug: "how-to-improve-ielts-band-6-to-7",
    category: "Exam Strategy",
    title: "How to Improve from IELTS Band 6 to 7",
    description:
      "A practical plan to move from IELTS band 6 to band 7: approximate raw-score targets for Listening and Reading, plus focused Writing and Speaking priorities.",
    keywords: [
      "ielts band 6 to 7",
      "how to get band 7 ielts",
      "improve ielts score",
      "ielts band 7 listening score",
      "ielts band 7 reading score",
      "ielts band 7 writing",
      "ielts study plan",
      "ielts raw score band 7",
    ],
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 9,
    summary:
      "Moving from band 6 to band 7 is one of the most common IELTS goals and one of the most achievable with focused work. This guide sets approximate raw-score targets for Listening and Reading, identifies what typically separates 6 from 7 in Writing and Speaking, and gives a week-by-week plan.",
    body: [
      { type: "h2", text: "What the jump from 6 to 7 really involves" },
      {
        type: "p",
        text: "Band 6 generally reflects an effective command of English with some inaccuracies and misunderstandings. Band 7 reflects operational command with only occasional inaccuracies. In practice, the difference is less about learning lots of new language and more about **accuracy, control and consistency**: fewer careless errors in Listening and Reading, and more precise, flexible language in Writing and Speaking.",
      },
      {
        type: "p",
        text: "The good news is that Listening and Reading are scored by counting correct answers, so you can set precise targets. Writing and Speaking are assessed against published band descriptors, so you can study exactly what examiners look for at band 7.",
      },
      { type: "h2", text: "Raw-score targets for Listening and Reading" },
      {
        type: "p",
        text: "Each module has 40 questions. Raw scores are converted to bands, and the exact conversion can vary slightly from one test version to another, so the figures below are **approximate guides**, not fixed cut-offs.",
      },
      {
        type: "table",
        head: ["Module", "Approx. raw score for band 6.0", "Approx. raw score for band 7.0", "Extra correct answers needed"],
        rows: [
          ["Listening", "about 23/40", "about 30/40", "about 7"],
          ["Academic Reading", "about 23/40", "about 30/40", "about 7"],
        ],
      },
      {
        type: "p",
        text: "Seen this way, the gap is roughly **seven more correct answers per module**. That is a manageable target: it is around two or three extra marks per Listening part or per Reading passage. General Training Reading uses a different conversion, so if you are taking that version, check your practice scores with a raw-score converter rather than using the Academic figures.",
      },
      {
        type: "tip",
        text: "Work out where your marks are lost before you study. If you are scoring 24 in Listening and losing four marks to spelling and word limits alone, fixing that one habit takes you most of the way to your target.",
      },
      { type: "h2", text: "Listening: from 23 to 30" },
      {
        type: "ul",
        items: [
          "**Secure Part 1.** Aim to drop almost no marks here. Most errors in Part 1 are spelling, numbers and missed corrections, all of which can be trained.",
          "**Fix accuracy errors.** Track how many answers you heard correctly but wrote wrongly: plurals, spelling, exceeding the word limit. These are the cheapest marks to recover.",
          "**Learn distractor patterns.** In Parts 2 and 3, review every wrong multiple-choice answer and label the trap: correction, rejected suggestion, word match.",
          "**Build lecture stamina for Part 4.** Listen to short talks on academic topics regularly and practise note-taking with headings.",
        ],
      },
      { type: "h2", text: "Reading: from 23 to 30" },
      {
        type: "ul",
        items: [
          "**Finish the paper.** Many band 6 candidates leave the final passage partly unanswered. Use a timed plan and transfer answers at the end of each passage, because there is no extra transfer time.",
          "**Master True/False/Not Given.** Learn to tell FALSE from NOT GIVEN by asking whether the passage would have to be wrong for the statement to be true.",
          "**Improve paraphrase recognition.** Band 7 readers spot synonyms and restructured sentences quickly. Regular reading of academic-style articles builds this.",
          "**Read the located sentence closely.** Skim to find the section; read carefully to answer. Many errors come from answering after only skimming.",
        ],
      },
      { type: "h2", text: "Writing: what typically separates 6 from 7" },
      {
        type: "p",
        text: "Writing is assessed on four criteria: Task Achievement (Task 1) or Task Response (Task 2), Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Reading the public band descriptors for bands 6 and 7 side by side is one of the most useful things you can do.",
      },
      {
        type: "table",
        head: ["Criterion", "Common band 6 pattern", "What band 7 looks like"],
        rows: [
          ["Task Response", "Position is present but ideas are general or underdeveloped", "Clear position throughout; main ideas extended and supported"],
          ["Coherence and Cohesion", "Linking words are used mechanically or repetitively", "Logical progression; a range of cohesive devices used appropriately"],
          ["Lexical Resource", "Adequate vocabulary with some errors in word choice", "Some less common vocabulary, used with awareness of style and collocation"],
          ["Grammatical Range and Accuracy", "Mix of simple and complex forms, with noticeable errors", "Variety of complex structures; frequent error-free sentences"],
        ],
      },
      {
        type: "example",
        title: "From band 6 style to band 7 style",
        text: "Band 6 style: Technology is very important nowadays. It has many advantages, for example people can work from home. Band 7 style: The spread of reliable home broadband has made remote working a realistic option for many office employees, which in turn reduces commuting time and allows companies to recruit beyond their local area.",
      },
      {
        type: "p",
        text: "The second version is not longer for the sake of it. It names a specific cause, explains a consequence, and develops the idea with a further benefit. That move from general statements to **developed, specific ideas** is often what lifts Task Response.",
      },
      { type: "h2", text: "Speaking: what typically separates 6 from 7" },
      {
        type: "ul",
        items: [
          "**Fluency without long hesitation.** Band 7 speakers can talk at length without noticeable effort, though they may occasionally pause to search for language.",
          "**Flexible vocabulary.** Use some less common vocabulary and idiomatic language naturally, and paraphrase when you do not know a word.",
          "**Grammatical range with control.** Mix complex sentences, conditionals and relative clauses, with errors that do not cause confusion.",
          "**Developed answers.** In Part 3 especially, give a view, a reason and an example or consequence rather than a one-line reply.",
        ],
      },
      { type: "h2", text: "An eight-week plan" },
      {
        type: "table",
        head: ["Weeks", "Focus", "Key activities"],
        rows: [
          ["1", "Diagnose", "Take a full mock test, convert scores to bands, list every error by cause"],
          ["2–3", "Fix accuracy", "Daily dictation for spelling and numbers; True/False/Not Given and completion drills; one Writing Task 2 per week compared against band descriptors"],
          ["4–5", "Build skills", "Timed Reading passages using a 20-minute plan; Listening Parts 3 and 4 with distractor analysis; Speaking Part 3 answers recorded and reviewed"],
          ["6–7", "Exam practice", "Two timed mock tests; Writing under timed conditions (Task 1 in 20 minutes, Task 2 in 40); targeted review of weakest question types"],
          ["8", "Consolidate", "One final full mock; light review of error log; rest before the test"],
        ],
      },
      {
        type: "p",
        text: "Adjust the plan to your weakest module. If your profile is Listening 7, Reading 6.5, Writing 6, Speaking 6.5, most of your time should go to Writing, with maintenance practice for the rest.",
      },
      { type: "h2", text: "Understanding your overall band" },
      {
        type: "p",
        text: "Your overall band is the average of the four module bands, rounded to the nearest half or whole band. This matters for planning: a strong module can partly balance a weaker one in the overall score. However, many universities and visa routes set **minimum scores for each module** as well as an overall requirement, for example 7.0 overall with no module below 6.5. Check the exact requirement for your goal before deciding where to focus, because a single module below the minimum can matter more than the overall figure.",
      },
      {
        type: "example",
        title: "Mini example: where to invest your time",
        text: "Current profile: Listening 7.0, Reading 6.5, Writing 6.0, Speaking 6.5. Requirement: 7.0 overall, no module below 6.5. Writing is below the minimum, so it is the first priority. Raising Writing to 6.5 and Reading to 7.0 would give an average of 6.75, which rounds up to 7.0 overall.",
      },
      { type: "h2", text: "Habits that make the difference" },
      {
        type: "ol",
        items: [
          "**Keep an error log** for every practice session and review it weekly. Repeated error types are your study priorities.",
          "**Study model answers actively.** Do not just read them; note the structure, the linking and the topic vocabulary, then write your own version.",
          "**Practise under real timing.** Untimed practice builds accuracy, but band 7 requires that accuracy at exam speed.",
          "**Read and listen every day,** even for twenty minutes. Exposure to varied English improves paraphrase recognition in every module.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many correct answers do I need for band 7 in IELTS Listening?",
        a: "Approximately 30 out of 40, although the exact conversion can vary slightly between test versions. Treat it as a target rather than a guaranteed cut-off.",
      },
      {
        q: "How many correct answers do I need for band 7 in Academic Reading?",
        a: "Approximately 30 out of 40. General Training Reading uses a different conversion, so check your score with a converter for that version.",
      },
      {
        q: "How long does it take to go from band 6 to band 7?",
        a: "It depends on your starting level in each skill, how much time you can study and which areas need work. A focused plan over several weeks or more is common, but there is no fixed timeline.",
      },
      {
        q: "Which module is hardest to improve from 6 to 7?",
        a: "Many candidates find Writing the most challenging because it depends on accuracy, idea development and vocabulary together. Listening and Reading often improve faster because errors are easy to identify and target.",
      },
      {
        q: "Will learning advanced vocabulary get me band 7?",
        a: "Vocabulary helps only when it is used accurately and appropriately. Precise, natural word choice and correct collocation matter more than rare words.",
      },
    ],
    related: [
      { href: "/calculator", label: "Calculate your overall band score" },
      { href: "/band-descriptors", label: "Compare band 6 and 7 descriptors" },
      { href: "/study-plan", label: "Create a personalised study plan" },
      { href: "/model-answers", label: "Study band 7+ model answers" },
      { href: "/score-converter", label: "Convert raw scores to bands" },
    ],
  },
];
