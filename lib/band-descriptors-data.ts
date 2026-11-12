/** IELTS Writing and Speaking band descriptor summaries (bands 5-9), shared by the interactive matrix and its server-rendered copy. */

export interface Criterion {
  name: string;
  bands: Record<number, string>;
}

export const TASK2_CRITERIA: Criterion[] = [
  {
    name: "Task Response (25%)",
    bands: {
      9: "Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas.",
      8: "Sufficiently addresses all parts of the task. Presents a well-developed response with relevant, extended and supported ideas.",
      7: "Addresses all parts of the task. Presents a clear position throughout the response. Presents, extends and supports main ideas, but there may be a tendency to over-generalise.",
      6: "Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position, although the conclusions may become unclear or repetitive.",
      5: "Addresses the task only partially; the format may be inappropriate in places. Expresses a position but the development is not always clear.",
    },
  },
  {
    name: "Coherence & Cohesion (25%)",
    bands: {
      9: "Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.",
      8: "Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.",
      7: "Logically organises information and ideas; there is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under-/over-use. Presents a clear central topic within each paragraph.",
      6: "Arranges information and ideas coherently and there is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical.",
      5: "Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices.",
    },
  },
  {
    name: "Lexical Resource (25%)",
    bands: {
      9: "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'.",
      8: "Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skilfully uses uncommon lexical items, with occasional inaccuracies in word choice and collocation.",
      7: "Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation.",
      6: "Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation.",
      5: "Uses a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that cause difficulty for the reader.",
    },
  },
  {
    name: "Grammatical Range & Accuracy (25%)",
    bands: {
      9: "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'.",
      8: "Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or non-systematic inaccuracies.",
      7: "Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.",
      6: "Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.",
      5: "Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors.",
    },
  },
];

export const TASK1_CRITERIA: Criterion[] = [
  {
    name: "Task Achievement (25%)",
    bands: {
      9: "Fully satisfies all the requirements of the task. Clearly presents a fully developed response with key trends, differences or stages highlighted with complete accuracy.",
      8: "Covers all requirements of the task appropriately, relevantly and sufficiently. Presents a clear overview of main trends, differences or stages. Clearly highlights key features/bullet points.",
      7: "Covers the requirements of the task. Presents a clear overview of main trends, differences or stages. Clearly presents and highlights key features/bullet points but could be more fully extended.",
      6: "Addresses the requirements of the task. Presents an overview with information appropriately selected. Highlights key features/bullet points but details may be incomplete or inaccurate.",
      5: "Generally addresses the task; the format may be inappropriate in places. Recounts detail mechanically with no clear overview. Inadequately covers key features/bullet points.",
    },
  },
  TASK2_CRITERIA[1],
  TASK2_CRITERIA[2],
  TASK2_CRITERIA[3],
];

export const SPEAKING_CRITERIA: Criterion[] = [
  {
    name: "Fluency & Coherence (25%)",
    bands: {
      9: "Speaks fluently with only rare repetition or self-correction; any hesitation is content-related rather than to find words or grammar. Speaks coherently with fully appropriate cohesive features.",
      8: "Speaks fluently with only occasional repetition or self-correction; hesitation is usually content-based. Develops topics coherently and appropriately.",
      7: "Speaks at length without noticeable effort or loss of coherence. May demonstrate language-related hesitation at times, or some repetition and/or self-correction.",
      6: "Is willing to speak at length, though may lose coherence at times through repetition, self-correction or hesitation. Uses a range of connectives and discourse markers.",
      5: "Usually maintains flow of speech but uses repetition, self-correction and/or slow speech to keep going. Over-uses certain connectives and discourse markers.",
    },
  },
  {
    name: "Lexical Resource (25%)",
    bands: {
      9: "Uses vocabulary with full flexibility and precision in all topics. Uses idiomatic language naturally and accurately.",
      8: "Uses a wide vocabulary resource readily and flexibly to convey precise meaning. Uses less common and idiomatic vocabulary skilfully, with occasional inaccuracies.",
      7: "Uses vocabulary resource flexibly to discuss a variety of topics. Uses some less common and idiomatic vocabulary and shows some awareness of style and collocation.",
      6: "Has a wide enough vocabulary to discuss topics at length and make meaning clear in spite of inaccuracies. Generally succeeds in paraphrasing.",
      5: "Manages to talk about familiar and unfamiliar topics but uses vocabulary with limited flexibility. Attempts paraphrase with mixed success.",
    },
  },
  {
    name: "Grammatical Range & Accuracy (25%)",
    bands: {
      9: "Uses a full range of structures naturally and appropriately. Produces consistently accurate structures apart from 'slips' characteristic of native speaker speech.",
      8: "Uses a wide range of structures flexibly. Produces a majority of error-free sentences with only very occasional inaccuracies or non-systematic errors.",
      7: "Uses a range of complex structures with some flexibility. Frequently produces error-free sentences, though some grammatical mistakes persist.",
      6: "Uses a mix of simple and complex structures, but with limited flexibility. May make frequent mistakes with complex structures, though these rarely cause comprehension problems.",
      5: "Produces basic sentence forms with reasonable accuracy. Uses a limited range of more complex structures, but these usually contain errors.",
    },
  },
  {
    name: "Pronunciation (25%)",
    bands: {
      9: "Uses a full range of pronunciation features with precision and subtlety. Sustains flexible use of features throughout. Is effortless to understand.",
      8: "Uses a wide range of pronunciation features. Sustains flexible use of features, with only occasional lapses. Is easy to understand throughout.",
      7: "Shows all the positive features of Band 6 and some, but not all, of the positive features of Band 8. Is generally easy to understand.",
      6: "Uses a range of pronunciation features with mixed control. Shows some effective use of features but this is not sustained. Can generally be understood throughout.",
      5: "Shows all the positive features of Band 4 and some of the positive features of Band 6. Pronunciation causes occasional difficulty for the listener.",
    },
  },
];
