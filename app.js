const app = document.getElementById("app");

const clone = (value) => JSON.parse(JSON.stringify(value));
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const ICONS = {
  spark: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z"></path>
      <path d="M19 15l.9 2.6L22.5 18l-2.6.9L19 21.5l-.9-2.6-2.6-.9 2.6-.4.9-2.6Z"></path>
    </svg>
  `,
  home: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5"></path>
      <path d="M5.5 9.8v10.2H18.5V9.8"></path>
    </svg>
  `,
  file: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3.5h6l4 4V20.5H8Z"></path>
      <path d="M14 3.5v4h4"></path>
    </svg>
  `,
  history: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7"></path>
      <path d="M3 4v4h4"></path>
      <path d="M12 7.5v5l3 1.8"></path>
    </svg>
  `,
  settings: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Z"></path>
      <path d="M19.4 15.1 21 16l-1.4 2.5-1.8-.5a7.8 7.8 0 0 1-1.5 1l-.3 1.8h-2.8l-.3-1.8a7.8 7.8 0 0 1-1.5-1l-1.8.5L3 16l1.6-.9a7.7 7.7 0 0 1 0-2.2L3 12l1.4-2.5 1.8.5a7.8 7.8 0 0 1 1.5-1L8 7.2h2.8l.3 1.8a7.8 7.8 0 0 1 1.5 1l1.8-.5L21 12l-1.6.9a7.7 7.7 0 0 1 0 2.2Z"></path>
    </svg>
  `,
  info: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path>
      <path d="M12 10.5v5"></path>
      <path d="M12 7h.01"></path>
    </svg>
  `,
  plus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    </svg>
  `,
  paste: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1.5"></path>
      <path d="M9 5.2h6V3.5H9Z"></path>
      <path d="M9 10h6"></path>
      <path d="M9 14h6"></path>
    </svg>
  `,
  warning: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 21 20H3Z"></path>
      <path d="M12 9v4.5"></path>
      <path d="M12 17h.01"></path>
    </svg>
  `,
  compare: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5 4 9l4 4"></path>
      <path d="M4 9h10a4 4 0 0 1 4 4v1"></path>
      <path d="M16 19l4-4-4-4"></path>
      <path d="M20 15H10a4 4 0 0 1-4-4v-1"></path>
    </svg>
  `,
  user: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.5A4 4 0 1 0 8 8.5a4 4 0 0 0 4 4Z"></path>
      <path d="M5 20a7 7 0 0 1 14 0"></path>
    </svg>
  `,
  export: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15V4"></path>
      <path d="M8 8l4-4 4 4"></path>
      <path d="M5 14.5v4A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-4"></path>
    </svg>
  `,
  branch: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 6a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"></path>
      <path d="M17 20a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"></path>
      <path d="M17 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"></path>
      <path d="M7 6v10a4 4 0 0 0 4 4h4"></path>
      <path d="M7 10h6a4 4 0 0 0 4-4V6"></path>
    </svg>
  `,
  chevronLeft: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 6-6 6 6 6"></path>
    </svg>
  `,
  chevronRight: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 6 6-6 6"></path>
    </svg>
  `,
  refresh: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 7v5h-5"></path>
      <path d="M4 17v-5h5"></path>
      <path d="M6.5 9A7.5 7.5 0 0 1 19 7"></path>
      <path d="M17.5 15A7.5 7.5 0 0 1 5 17"></path>
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6 18 18"></path>
      <path d="M18 6 6 18"></path>
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4.2 4.2L19 6.5"></path>
    </svg>
  `,
  pen: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.5-1 8.7-8.7-3.5-3.5L5 15.5 4 20Z"></path>
      <path d="m12.8 5.2 3.5 3.5"></path>
    </svg>
  `,
  logout: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"></path>
      <path d="m14 16 4-4-4-4"></path>
      <path d="M18 12H9"></path>
    </svg>
  `
};

const featureHighlights = [
  {
    icon: "branch",
    title: "Structural suggestions are evidence-based",
    copy: "Provides explainable modification hints around paragraphs, sections, and argument chains."
  },
  {
    icon: "warning",
    title: "Clearly flag uncertainties",
    copy: "Low-confidence suggestions are separately flagged, not masquerading guesses as conclusions."
  },
  {
    icon: "compare",
    title: "Version comparison is traceable",
    copy: "Every accept, reject, and manual edit enters version history for review."
  }
];

const disciplines = [
  "STEM",
  "Social Sciences",
  "Humanities",
  "Medicine",
  "Business",
  "Other"
];

const stages = [
  "Drafting",
  "Structure",
  "Polishing",
  "Final Review"
];

const stageDescriptions = {
  "Drafting":      "Ideas first. ScholarMind will offer open-ended prompts and generous structural guidance to help you develop arguments freely.",
  "Structure":     "Organise before you refine. ScholarMind will focus on logical flow, section balance, and the sequencing of your core claims.",
  "Polishing":     "Language in focus. ScholarMind will suggest expression improvements, clarity edits, and fluency adjustments across your draft.",
  "Final Review":  "Almost there. ScholarMind will apply only conservative, clearly explained suggestions — minimising changes to preserve your voice.",
};

const capabilityCan = [
  "Suggest paragraph structures",
  "Identify logic gaps",
  "Improve readability",
  "Flag questionable phrasing",
  "Summarize pending suggestions",
  "Track version changes"
];

const capabilityCannot = [
  "Verify domain-specific knowledge",
  "Validate citation sources",
  "Make final editing decisions",
  "Understand field-specific terminology preferences",
  "Take authorship responsibility",
  "Guarantee suggestions fit your discipline"
];

const activityLog = [
  {
    id: "a-1",
    date: "Today",
    time: "16:42",
    docId: "doc-1",
    docTitle: "Algorithmic Transparency in Platform Labor",
    action: "accepted",
    label: "Suggestion accepted",
    detail: "Changed 'retain judgment' to 'retain final academic judgment'"
  },
  {
    id: "a-2",
    date: "Today",
    time: "14:30",
    docId: "doc-1",
    docTitle: "Algorithmic Transparency in Platform Labor",
    action: "rejected",
    label: "Suggestion rejected",
    detail: "Last sentence can be split for better reading flow"
  },
  {
    id: "a-3",
    date: "Yesterday",
    time: "21:18",
    docId: "doc-2",
    docTitle: "Medical Review Methods Section",
    action: "manual",
    label: "Manual edit",
    detail: "Added sample boundary explanation"
  },
  {
    id: "a-4",
    date: "Yesterday",
    time: "19:08",
    docId: "doc-1",
    docTitle: "Algorithmic Transparency in Platform Labor",
    action: "accepted",
    label: "Suggestion accepted",
    detail: "Moved research question to second sentence"
  },
  {
    id: "a-5",
    date: "Apr 9",
    time: "18:36",
    docId: "doc-3",
    docTitle: "Business School Case Study Conclusions",
    action: "rejected",
    label: "Suggestion rejected",
    detail: "Rejected 2 questionable suggestions"
  }
];

const baseCitations = [
  {
    id: "cit-1",
    paragraphId: "p-1",
    raw: "Algorithmic transparency discussions focus on tool efficiency and process management",
    author: "Zhang & Liu",
    year: "2021",
    title: "Algorithmic Transparency in Platform Labor",
    confidence: "high",
    status: "found",
    links: [
      { label: "Google Scholar", url: "#" },
      { label: "DOI 10.1145/3442188", url: "#" }
    ]
  },
  {
    id: "cit-2",
    paragraphId: "p-2",
    raw: "How institutional expectations translate into specific writing strategies",
    author: "Wang et al.",
    year: "2019",
    title: "Institutional Writing Expectations in Academia",
    confidence: "questionable",
    status: "found",
    links: [
      { label: "Google Scholar", url: "#" }
    ]
  },
  {
    id: "cit-3",
    paragraphId: "p-5",
    raw: "Semi-structured interviews paired with version record comparison",
    author: "Unidentified",
    year: "—",
    title: "—",
    confidence: "questionable",
    status: "searching",
    links: []
  },
  {
    id: "cit-4",
    paragraphId: "p-3",
    raw: "Authors perceived awareness of AI suggestion sources, boundaries, and reliability",
    author: "Chen & Park",
    year: "2023",
    title: "Perceived AI Transparency in Writing Assistants",
    confidence: "high",
    status: "found",
    links: [
      { label: "Google Scholar", url: "#" },
      { label: "PDF", url: "#" }
    ]
  }
];

const baseDocuments = [
  {
    id: "doc-1",
    title: "Algorithmic Transparency in Platform Labor",
    discipline: "Social Sciences",
    modified: "Today 16:42",
    suggestions: 6,
    path: ["My Documents", "Thesis", "Intro Revision"],
    summary: "3 accepted / 2 manual edits"
  },
  {
    id: "doc-2",
    title: "Medical Review Methods Section",
    discipline: "Medicine",
    modified: "Yesterday 21:18",
    suggestions: 2,
    path: ["My Documents", "Reviews", "Methods"],
    summary: "Added sample boundary explanation"
  },
  {
    id: "doc-3",
    title: "Business School Case Study Conclusions",
    discipline: "Business",
    modified: "Apr 9 18:36",
    suggestions: 4,
    path: ["My Documents", "Case Studies", "Conclusions"],
    summary: "Rejected 2 questionable suggestions"
  }
];

const editorSections = [
  {
    id: "sec-1",
    name: "Background",
    anchor: "1. Background",
    summary: "Introduces algorithmic transparency in academic writing and identifies the gap in existing research.",
    paragraphs: [
      {
        id: "p-1",
        label: "Context Setting",
        text: "Recent discussions on algorithmic transparency in platform labor have focused on tool efficiency and process management, but how academic writers interpret this transparency remains underexplored."
      },
      {
        id: "p-2",
        label: "Research Gap",
        text: "Existing studies often juxtapose platform rules with writing behavior without explaining how institutional expectations translate into specific writing strategies, creating a theoretical leap in the introduction."
      }
    ]
  },
  {
    id: "sec-2",
    name: "Theoretical Framework",
    anchor: "2. Theoretical Framework",
    summary: "Defines algorithmic transparency as the author's perceived awareness and proposes three analysis dimensions.",
    paragraphs: [
      {
        id: "p-3",
        label: "Concept Definition",
        text: "This paper Understands algorithmic transparency as the author's perceived awareness of AI suggestion sources, boundaries, and reliability, not just the demonstrable model performance."
      },
      {
        id: "p-4",
        label: "Analysis Dimensions",
        text: "Based on this, the article discusses AI collaboration's impact on academic writing from three dimensions: structural suggestions, expression refinement, and logic cues, while explaining how authors maintain judgment throughout the process."
      }
    ]
  },
  {
    id: "sec-3",
    name: "Methods & Discussion",
    anchor: "3. Methods & Discussion",
    summary: "Describes semi-structured interview methodology and presents preliminary findings on suggestion acceptance.",
    paragraphs: [
      {
        id: "p-5",
        label: "Sample Description",
        text: "The study uses semi-structured interviews and version record comparison to observe how authors receive, reject, or rewrite AI suggestions, but the current paragraph still lacks a clear explanation of sample boundaries."
      },
      {
        id: "p-6",
        label: "Preliminary Conclusions",
        text: "Initial results show that authors are more willing to accept structural adjustment suggestions while remaining highly cautious about suggestions involving disciplinary terminology and citation judgments."
      }
    ]
  }
];

const baseSuggestions = [
  {
    id: "s-1",
    paragraphId: "p-1",
    confidence: "high",
    type: "Structure",
    text: "Consider adding a research question definition at the end of this paragraph to introduce the research gap earlier.",
    note: "",
    status: "pending"
  },
  {
    id: "s-2",
    paragraphId: "p-2",
    confidence: "questionable",
    type: "Logic",
    text: "This paragraph jumps from institutional expectations to writing strategies without explaining the transformation mechanism.",
    note: "This judgment is based on contextual inference and may be affected by disciplinary terminology differences.",
    status: "pending"
  },
  {
    id: "s-3",
    paragraphId: "p-2",
    confidence: "high",
    type: "Structure",
    text: "Moving the research question to the second sentence can establish the paragraph's main point more quickly.",
    note: "",
    status: "pending"
  },
  {
    id: "s-4",
    paragraphId: "p-4",
    confidence: "high",
    type: "Wording",
    text: "Change retain judgment to retain final academic judgment for clearer semantics.",
    note: "",
    status: "accepted"
  },
  {
    id: "s-5",
    paragraphId: "p-5",
    confidence: "questionable",
    type: "Structure",
    text: "AI suggests adding a research limitation statement to clarify sample size or corpus boundaries.",
    note: "Please confirm with disciplinary standards whether this should be added in this section or conclusions.",
    status: "pending"
  },
  {
    id: "s-6",
    paragraphId: "p-6",
    confidence: "high",
    type: "Wording",
    text: "The last sentence can be split into two for better reading flow in the conclusion.",
    note: "",
    status: "rejected"
  },
  {
    id: "s-7",
    paragraphId: "p-2",
    confidence: "high",
    type: "Wording",
    text: "Replace 'theoretical leap' with 'explanatory gap' for greater academic precision and to avoid a metaphorical register.",
    note: "",
    status: "pending"
  },
  {
    id: "s-8",
    paragraphId: "p-2",
    confidence: "questionable",
    type: "Structure",
    text: "Consider leading this paragraph with the identified research gap rather than opening with a critique of existing studies — it may strengthen the introduction's argument chain.",
    note: "This restructuring suggestion is based on general introduction conventions and may not apply to all disciplinary styles.",
    status: "pending"
  },
  {
    id: "s-9",
    paragraphId: "p-1",
    confidence: "questionable",
    type: "Logic",
    text: "The motivation for focusing specifically on 'academic writers' is not established — one sentence explaining why this group is particularly relevant to transparency discussions would strengthen the opening.",
    note: "This gap was inferred from context. If the rationale is addressed later, this suggestion can be ignored.",
    status: "pending"
  },
  {
    id: "s-10",
    paragraphId: "p-1",
    confidence: "high",
    type: "Wording",
    text: "The phrase 'remains underexplored' is common — consider a more specific framing such as 'has received limited empirical attention' to signal the paper's empirical contribution.",
    note: "",
    status: "pending"
  }
];

const logicSections = [
  {
    id: "logic-1",
    label: "Background",
    nodes: [
      { id: "p-1", label: "Context Setting Paragraph", status: "normal" },
      { id: "p-2", label: "Research Gap Paragraph", status: "weak" }
    ]
  },
  {
    id: "logic-2",
    label: "Theoretical Framework",
    nodes: [
      { id: "p-3", label: "Concept Definition Paragraph", status: "normal" },
      { id: "p-4", label: "Analysis Dimensions Paragraph", status: "normal" }
    ]
  },
  {
    id: "logic-3",
    label: "Methods & Discussion",
    nodes: [
      { id: "p-5", label: "Sample Description Paragraph", status: "weak" },
      { id: "p-6", label: "Preliminary Conclusion Paragraph", status: "normal" }
    ]
  },
  {
    id: "logic-4",
    label: "Structure Gap",
    nodes: [{ id: "missing-limitations", label: "Research Limitations Statement", status: "missing" }]
  }
];

const logicDetails = {
  "p-1": "This paragraph serves context setting. Keep problem awareness, but consider adding why a new collaboration perspective is needed to strengthen research motivation.",
  "p-2": "AI judges missing transition between this and next paragraph on how institutional expectations transform to writing strategies, marked as weak logic connection.",
  "p-3": "Concept definition is clear, current structure is stable, suitable as the entry paragraph for the theoretical framework.",
  "p-4": "This paragraph serves analysis dimension expansion. Keep the three-part structure, no need to compress further.",
  "p-5": "AI considers the sample description incomplete, readers cannot judge conclusion boundaries, so suggests adding a limitation statement or moving boundaries earlier.",
  "p-6": "This paragraph serves preliminary conclusion function. Maintain cautious tone, avoid strong generalizations.",
  "missing-limitations": "Current structure lacks a paragraph explaining research limitations, sample corpus boundaries, or scope, hence indicated with a red dashed node."
};

const versionHistory = [
  {
    id: "v-1",
    time: "04-10 09:12",
    summary: "Imported original draft",
    count: 0
  },
  {
    id: "v-2",
    time: "04-10 14:36",
    summary: "Accepted 2 structure suggestions",
    count: 2
  },
  {
    id: "v-3",
    time: "04-10 19:08",
    summary: "Manual edited 3 expressions",
    count: 1
  },
  {
    id: "v-4",
    time: "04-11 16:42",
    summary: "Accepted 3 suggestions / Manual edited 2 places",
    count: 4
  }
];

const diffSets = {
  default: [
    {
      label: "Abstract First Paragraph",
      old: "Current discussions on algorithmic transparency mostly focus on tool performance.",
      new: "Current discussions on algorithmic transparency mostly focus on tool performance and process explainability.",
      status: "modified"
    },
    {
      label: "Research Question",
      old: "This paper attempts to explain how platforms affect writer decisions.",
      new: "This paper further explains how platform constraints affect writer decision paths.",
      status: "modified"
    },
    {
      label: "Methods Statement",
      old: "",
      new: "Additionally, we added sample selection criteria to clarify methods boundaries.",
      status: "added"
    },
    {
      label: "Conclusion Language",
      old: "Research conclusions have broad applicability.",
      new: "Research conclusion applicability still requires careful judgment based on sample types and institutional context.",
      status: "modified"
    },
    {
      label: "Stable Fragment",
      old: "Final judgment of domain terminology remains with humans.",
      new: "Final judgment of domain terminology remains with humans.",
      status: "unchanged"
    }
  ]
};

const state = {
  page: "auth",
  authTab: "login",
  hasCompletedOnboarding: false,
  onboardingStep: 1,
  selectedDiscipline: "Social Sciences",
  selectedStage: "Structure",
  documents: clone(baseDocuments),
  currentDocId: "doc-1",
  selectedParagraphId: "p-2",
  selectedSuggestionId: "s-2",
  selectedStructureNodeId: "p-2",
  suggestions: clone(baseSuggestions),
  sidebarSelection: "home",
  docFilter: "all",
  historyFilter: "all",
  editorLeftTab: "navigation",
  selectedCitationId: "cit-1",
  leftCollapsed: false,
  rightCollapsed: false,
  overlay: null,
  restoreConfirm: false,
  versionA: "v-2",
  versionB: "v-4",
  versionJumpIndex: 0,
  serviceStatus: "online",
  localSaveTime: "",
  panelMode: "normal",
  contextDraft: "",
  quickPaste: "",
  authValues: {
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  },
  titleEditing: false,
  titleDraft: baseDocuments[0].title,
  userMenuOpen: false,
  toast: null,
  modifyPrompt: "",
  editedParagraphs: {},
  activeSectionId: null
};

const timers = {
  toast: null,
  recovery: null,
  online: null
};

function icon(name) {
  return `<span class="icon">${ICONS[name] || ICONS.spark}</span>`;
}

function currentDoc() {
  return state.documents.find((doc) => doc.id === state.currentDocId) || state.documents[0];
}

function currentDocTitle() {
  return currentDoc().title;
}

function updateCurrentDoc(updates) {
  state.documents = state.documents.map((doc) => {
    if (doc.id !== state.currentDocId) {
      return doc;
    }
    return { ...doc, ...updates };
  });
}

function currentBreadcrumb() {
  return currentDoc().path || ["My Documents", "Current Document"];
}

function findSectionByParagraph(paragraphId) {
  return editorSections.find((section) =>
    section.paragraphs.some((paragraph) => paragraph.id === paragraphId)
  );
}

function getParagraph(paragraphId) {
  for (const section of editorSections) {
    const paragraph = section.paragraphs.find((item) => item.id === paragraphId);
    if (paragraph) {
      return paragraph;
    }
  }
  return editorSections[0].paragraphs[0];
}

function paragraphSeverity(paragraphId) {
  const related = state.suggestions.filter(
    (suggestion) => suggestion.paragraphId === paragraphId && suggestion.status === "pending"
  );
  if (related.some((suggestion) => suggestion.confidence === "questionable")) {
    return "warning";
  }
  if (related.length > 0) {
    return "high";
  }
  return "none";
}

function suggestionStats() {
  return state.suggestions.reduce(
    (accumulator, suggestion) => {
      accumulator[suggestion.status] += 1;
      return accumulator;
    },
    { pending: 0, accepted: 0, rejected: 0 }
  );
}

function suggestionsForParagraph(paragraphId) {
  return state.suggestions
    .filter((suggestion) => suggestion.paragraphId === paragraphId)
    .sort((left, right) => {
      const order = { pending: 0, accepted: 1, rejected: 2 };
      return order[left.status] - order[right.status];
    });
}

function firstSuggestionForParagraph(paragraphId) {
  return suggestionsForParagraph(paragraphId).find((suggestion) => suggestion.status === "pending")
    || suggestionsForParagraph(paragraphId)[0]
    || null;
}

function selectParagraph(paragraphId) {
  state.selectedParagraphId = paragraphId;
  const related = firstSuggestionForParagraph(paragraphId);
  state.selectedSuggestionId = related ? related.id : null;
}

function setRoute(page) {
  state.page = page;
  state.overlay = null;
  state.restoreConfirm = false;
  state.userMenuOpen = false;
  render();
}

function showToast(message, tone = "neutral", duration = 2800) {
  state.toast = { message, tone };
  window.clearTimeout(timers.toast);
  render();
  timers.toast = window.setTimeout(() => {
    state.toast = null;
    render();
  }, duration);
}

function formattedTime() {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function ensureDraftDocument() {
  const existing = state.documents.find((doc) => doc.id === "doc-new");
  if (!existing) {
    state.documents.unshift({
      id: "doc-new",
      title: "Untitled Document",
      discipline: state.selectedDiscipline,
      modified: "Just now",
      suggestions: 3,
      path: ["My Documents", "New Document", "Draft"],
      summary: "Waiting for first analysis"
    });
  }
}

function openDocument(docId) {
  state.currentDocId = docId;
  state.titleDraft = currentDocTitle();
  state.titleEditing = false;
  state.leftCollapsed = false;
  state.rightCollapsed = false;
  state.serviceStatus = "online";
  state.panelMode = "normal";
  selectParagraph("p-2");
  setRoute("editor");
}

function openOverlay(type) {
  state.overlay = type;
  state.restoreConfirm = false;
  render();
}

function closeOverlay() {
  state.overlay = null;
  state.restoreConfirm = false;
  render();
}

function getDiffEntries() {
  return diffSets.default;
}

function renderFeatureCards() {
  return featureHighlights
    .map(
      (item) => `
        <article class="auth-feature-card">
          <div class="auth-feature-card__icon">${icon(item.icon)}</div>
          <div>
            <strong>${item.title}</strong>
            <p>${item.copy}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAuthForm() {
  if (state.authTab === "register") {
    return `
      <form class="form-stack" data-form="register">
        <label class="field">
          <span class="field__label">Name</span>
          <input data-model="auth-name" name="name" placeholder="Enter your name" value="${escapeHtml(state.authValues.name)}" />
        </label>
        <label class="field">
          <span class="field__label">Email</span>
          <input data-model="auth-email" name="email" type="email" placeholder="name@university.edu" value="${escapeHtml(state.authValues.email)}" />
        </label>
        <label class="field">
          <span class="field__label">Password</span>
          <input data-model="auth-password" name="password" type="password" placeholder="At least 8 characters" value="${escapeHtml(state.authValues.password)}" />
        </label>
        <label class="field">
          <span class="field__label">Confirm Password</span>
          <input data-model="auth-confirm" name="confirmPassword" type="password" placeholder="Enter password again" value="${escapeHtml(state.authValues.confirmPassword)}" />
        </label>
        <button class="button button--primary button--block" type="submit">Create Account & Continue</button>
      </form>
    `;
  }

  return `
    <form class="form-stack" data-form="login">
      <label class="field">
        <span class="field__label">Email</span>
        <input data-model="auth-email" name="email" type="email" placeholder="name@university.edu" value="${escapeHtml(state.authValues.email)}" />
      </label>
      <label class="field">
        <span class="field__label">Password</span>
        <input data-model="auth-password" name="password" type="password" placeholder="Enter your password" value="${escapeHtml(state.authValues.password)}" />
      </label>
      <div class="checkbox-row">
        <label><input type="checkbox" checked />Remember me</label>
        <button class="inline-link" type="button">Forgot password</button>
      </div>
      <button class="button button--primary button--block" type="submit">Login to ScholarMind</button>
      <div class="toggle-meta">
        <strong>First login will enter capability boundary settings</strong>
        <p>After completing onboarding, subsequent logins will directly go to home and history.</p>
      </div>
    </form>
  `;
}

function renderAuthPage() {
  return `
    <section class="page auth-layout">
      <aside class="auth-brand-panel">
        <div class="brand-lockup">
          <span class="logo-mark">${icon("spark")}</span>
          <span>ScholarMind</span>
        </div>
        <div class="auth-brand-copy">
          <span class="eyebrow">Academic writing copilot</span>
          <h1 class="page-title">Let AI be your writing partner, not a black box</h1>
          <p>ScholarMind only gives suggestions on structure, expression, and logic. It can assist your thinking, but won't make domain judgments for you.</p>
        </div>
        <div class="auth-feature-list">${renderFeatureCards()}</div>
      </aside>

      <section class="auth-form-panel">
        <div class="auth-card">
          <div class="auth-card__topbar">
            <div class="brand-lockup brand-lockup--small">
              <span class="logo-mark">${icon("spark")}</span>
              <span>ScholarMind</span>
            </div>
            <button class="inline-link" data-action="open-limitations" type="button">
              ${icon("info")}AI Capabilities
            </button>
          </div>

          <div class="auth-card__header">
            <h2 class="section-title">Login / Register</h2>
            <p>Top brand area expresses value proposition, right form area brings users to real workflow.</p>
          </div>

          <div class="segmented" role="tablist" aria-label="Auth tabs">
            <button data-action="switch-auth-tab" data-tab="login" class="${state.authTab === "login" ? "is-active" : ""}" type="button">Login</button>
            <button data-action="switch-auth-tab" data-tab="register" class="${state.authTab === "register" ? "is-active" : ""}" type="button">Register</button>
          </div>

          <div class="auth-stack">
            ${renderAuthForm()}
            <div class="auth-sso">
              <div class="auth-divider">Or login with institutional account</div>
              <button class="button button--secondary button--block" data-action="sso-login" type="button">
                ${icon("user")}Enter with Institutional SSO
              </button>
            </div>
            <div class="auth-sso">
              <div class="auth-divider">Prototype demo</div>
              <button class="button button--ghost button--block" data-action="demo-fault-p7" type="button">
                ${icon("warning")}Demo: AI Misunderstanding (P7)
              </button>
              <button class="button button--ghost button--block" data-action="demo-fault-p8" type="button">
                ${icon("refresh")}Demo: Service Outage (P8)
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  `;
}

function renderOnboardingContent() {
  if (state.onboardingStep === 1) {
    return `
      <div class="onboarding-content">
        <div>
          <h2 class="section-title">What type of academic articles do you mainly write?</h2>
          <p>Select a primary discipline to make suggestion labels and examples closer to your writing context.</p>
        </div>
        <div class="option-grid">
          ${disciplines
            .map(
              (item) => `
                <button class="option-card ${state.selectedDiscipline === item ? "is-selected" : ""}" data-action="select-discipline" data-value="${item}" type="button">
                  <strong>${item}</strong>
                  <span>Use common structure and expression constraints of ${item} papers as default context.</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (state.onboardingStep === 2) {
    return `
      <div class="onboarding-content">
        <div>
          <h2 class="section-title">What writing stage are you currently in?</h2>
          <p>Different stages need different suggestion density. Closer to final draft, more conservative and explainable suggestions needed.</p>
        </div>
        <div class="option-grid">
          ${stages
            .map(
              (item) => `
                <button class="option-card ${state.selectedStage === item ? "is-selected" : ""}" data-action="select-stage" data-value="${item}" type="button">
                  <strong>${item}</strong>
                  <span>${stageDescriptions[item]}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  if (state.onboardingStep === 3) {
    return `
      <div class="onboarding-content">
        <div>
          <h2 class="section-title">Before starting, understand what AI can do</h2>
          <p>This is the core declaration. Suggestions will always distinguish between "tasks AI can assist" and "tasks the author is responsible for".</p>
        </div>
        <div class="boundary-grid">
          <section class="boundary-card boundary-card--good">
            <h3>AI Can Help You</h3>
            <ul>
              <li>Suggest paragraph structures</li>
              <li>Identify logic gaps</li>
              <li>Improve expression fluency</li>
              <li>Flag questionable phrasing</li>
            </ul>
          </section>
          <section class="boundary-card boundary-card--limit">
            <h3>AI Cannot Replace You</h3>
            <ul>
              <li>Verify domain knowledge accuracy</li>
              <li>Verify citation sources</li>
              <li>Make final editing decisions</li>
              <li>Understand field-specific terminology preferences</li>
            </ul>
          </section>
        </div>
      </div>
    `;
  }

  return `
    <div class="onboarding-content">
      <div>
        <h2 class="section-title">Setup Complete</h2>
        <p>You have confirmed your writing field, current stage, and AI capability boundaries. Here is the initialization summary.</p>
      </div>
      <div class="summary-list">
        <div class="summary-item"><span>Discipline</span><span>${state.selectedDiscipline}</span></div>
        <div class="summary-item"><span>Writing Stage</span><span>${state.selectedStage}</span></div>
        <div class="summary-item"><span>Boundary Declaration</span><span>Acknowledged</span></div>
      </div>
    </div>
  `;
}

function renderOnboardingPage() {
  const steps = [1, 2, 3, 4];

  return `
    <section class="page onboarding-screen">
      <div class="onboarding-shell">
        <div class="onboarding-topbar">
          <button class="inline-link" data-action="open-limitations" type="button">
            ${icon("info")}AI Capabilities
          </button>
        </div>
        <div class="onboarding-card">
          <div class="step-progress">
            <div class="step-progress__bar">
              ${steps
                .map(
                  (step) => `
                    <div class="step-progress__segment ${step === state.onboardingStep ? "is-active" : step < state.onboardingStep ? "is-complete" : ""}"></div>
                  `
                )
                .join("")}
            </div>
            <div class="step-progress__labels">
              ${steps
                .map(
                  (step) => `
                    <div class="step-progress__label ${step === state.onboardingStep ? "is-active" : ""}">
                      <span>Step ${step}/4</span>
                      <strong>${["Discipline", "Stage", "Boundaries", "Done"][step - 1]}</strong>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>

          ${renderOnboardingContent()}

          <div class="step-actions">
            <button class="button button--ghost" ${state.onboardingStep === 1 ? "disabled" : ""} data-action="onboarding-back" type="button">Back</button>
            ${state.onboardingStep < 3 ? `<button class="button button--primary" data-action="onboarding-next" type="button">Continue</button>` : ""}
            ${state.onboardingStep === 3 ? `<button class="button button--primary" data-action="onboarding-acknowledge" type="button">I understand, continue</button>` : ""}
            ${state.onboardingStep === 4 ? `<button class="button button--primary" data-action="enter-home" type="button">Enter ScholarMind</button>` : ""}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSidebar() {
  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "documents", label: "My Documents", icon: "file" },
    { id: "history", label: "History", icon: "history" },
    { id: "settings", label: "Settings", icon: "settings" }
  ];

  return `
    <aside class="sidebar">
      <div class="brand-lockup brand-lockup--small">
        <span class="logo-mark">${icon("spark")}</span>
        <span>ScholarMind</span>
      </div>

      <div class="sidebar__user">
        <div class="sidebar__user-meta">
          <img src="./img/avatar.png" class="avatar avatar--large" alt="User" />
          <div>
            <strong>Lin Zhiyao</strong>
            <span>${state.selectedDiscipline} / ${state.selectedStage}</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav" aria-label="Main navigation">
        ${navItems
          .map(
            (item) => `
              <button class="${state.sidebarSelection === item.id ? "is-active" : ""}" data-action="sidebar-nav" data-value="${item.id}" type="button">
                ${icon(item.icon)}${item.label}
              </button>
            `
          )
          .join("")}
      </nav>

      <div class="sidebar__foot">
        <div class="sidebar__capability">
          <strong>AI Capabilities</strong>
          <p>ScholarMind only suggests structure and expression, no domain-specific judgment ability.</p>
          <button class="button button--secondary button--block" data-action="open-limitations" type="button">View System Limitations</button>
        </div>
      </div>
    </aside>
  `;
}

function renderDashboardHome() {
  return `
    <div class="dashboard-stack">
      <div class="boundary-banner">
        <div class="boundary-banner__label">
          ${icon("warning")}AI only suggests structure and expression - no domain-specific judgment
        </div>
        <button class="inline-link" data-action="open-limitations" type="button">Learn more</button>
      </div>

      <section class="hero-card">
        <div>
          <span class="eyebrow">Quick start</span>
          <h1 class="page-title">Start a new academic writing session</h1>
          <p>Start with a blank document or paste text for ScholarMind to generate structural and expression suggestions.</p>
        </div>
        <button class="button button--primary" data-action="create-doc" type="button">${icon("plus")}New Document</button>
      </section>

      <div class="quick-grid">
        <section class="quick-card quick-card--cta">
          <div class="quick-card__body">
            <span class="eyebrow">Blank draft</span>
            <h2 class="section-title">New Document</h2>
            <p>Enter the three-column editor and start the complete writing flow with section navigation, suggestion panel, and version history.</p>
          </div>
          <button class="button button--secondary" data-action="create-doc" type="button">${icon("plus")}Create Blank Draft</button>
        </section>

        <section class="quick-card">
          <div class="quick-card__body">
            <span class="eyebrow">Paste text</span>
            <h2 class="section-title">Quick Text Paste</h2>
            <p>Paste your written introduction, abstract, or methods section directly into the suggestion panel.</p>
          </div>
          <label class="field field--textarea paste-box">
            <textarea data-model="quick-paste" placeholder="Paste your academic writing content">${escapeHtml(state.quickPaste)}</textarea>
          </label>
          <button class="button button--primary" data-action="create-doc" type="button">${icon("paste")}Import and Analyze</button>
        </section>
      </div>

      <section class="recent-docs">
        <div class="recent-docs__header">
          <div>
            <span class="eyebrow">Recent documents</span>
            <h2 class="section-title">Recent Documents</h2>
          </div>
          <span class="pill">${state.documents.length} documents</span>
        </div>

        <div class="doc-list">
          ${state.documents
            .filter((doc) => doc.id !== "doc-new")
            .map(
              (doc) => `
                <button class="doc-row" data-action="open-doc" data-doc-id="${doc.id}" type="button">
                  <div class="doc-row__main">
                    <div class="doc-row__title">
                      <strong>${doc.title}</strong>
                      <span class="tag">${doc.discipline}</span>
                    </div>
                    <div class="doc-row__meta">
                      <span>Last modified: ${doc.modified}</span>
                      <span>${doc.summary}</span>
                    </div>
                  </div>
                  <span class="doc-row__count">${doc.suggestions}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderDocumentsPage() {
  const allDisciplines = ["Social Sciences", "Medicine", "Business"];
  const filters = [{ value: "all", label: "All" }, ...allDisciplines.map((d) => ({ value: d, label: d }))];
  const filtered = state.documents
    .filter((doc) => doc.id !== "doc-new")
    .filter((doc) => state.docFilter === "all" || doc.discipline === state.docFilter);

  return `
    <div class="dashboard-stack">
      <div class="page-header-row">
        <div>
          <span class="eyebrow">My documents</span>
          <h1 class="page-title">My Documents</h1>
        </div>
        <button class="button button--primary button--compact" data-action="create-doc" type="button">${icon("plus")}New Document</button>
      </div>

      <div class="segmented" role="tablist" aria-label="Document filter">
        ${filters
          .map(
            (f) => `
              <button class="${state.docFilter === f.value ? "is-active" : ""}" data-action="doc-filter" data-value="${f.value}" type="button">${f.label}</button>
            `
          )
          .join("")}
      </div>

      ${filtered.length
        ? `
          <div class="doc-list">
            ${filtered
              .map(
                (doc) => `
                  <button class="doc-row" data-action="open-doc" data-doc-id="${doc.id}" type="button">
                    <div class="doc-row__main">
                      <div class="doc-row__title">
                        <strong>${doc.title}</strong>
                        <span class="tag">${doc.discipline}</span>
                      </div>
                      <div class="doc-row__meta">
                        <span>Path: ${doc.path.join(" / ")}</span>
                        <span>Last modified: ${doc.modified}</span>
                        <span>${doc.summary}</span>
                      </div>
                    </div>
                    <span class="doc-row__count">${doc.suggestions}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        `
        : `
          <div class="panel-empty">
            <p>No documents under current filter.</p>
          </div>
        `}
    </div>
  `;
}

function renderHistoryPage() {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "manual", label: "Manual Edit" }
  ];

  const filtered = activityLog.filter(
    (item) => state.historyFilter === "all" || item.action === state.historyFilter
  );

  const grouped = filtered.reduce((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
    return groups;
  }, {});

  const actionDotClass = { accepted: "activity-dot--accepted", rejected: "activity-dot--rejected", manual: "activity-dot--manual" };
  const actionIcon = { accepted: "check", rejected: "close", manual: "pen" };

  return `
    <div class="dashboard-stack">
      <div class="page-header-row">
        <div>
          <span class="eyebrow">Activity</span>
          <h1 class="page-title">History</h1>
        </div>
      </div>

      <div class="segmented" role="tablist" aria-label="History filter">
        ${filterOptions
          .map(
            (f) => `
              <button class="${state.historyFilter === f.value ? "is-active" : ""}" data-action="history-filter" data-value="${f.value}" type="button">${f.label}</button>
            `
          )
          .join("")}
      </div>

      ${Object.keys(grouped).length
        ? Object.entries(grouped)
            .map(
              ([date, items]) => `
                <div class="activity-group">
                  <span class="activity-date-label">${date}</span>
                  <div class="activity-list">
                    ${items
                      .map(
                        (item) => `
                          <div class="activity-item">
                            <span class="activity-dot ${actionDotClass[item.action] || ""}">${icon(actionIcon[item.action] || "spark")}</span>
                            <div class="activity-item__body">
                              <div class="activity-item__top">
                                <strong>${item.label}</strong>
                                <span class="tag">${item.docTitle}</span>
                              </div>
                              <p class="activity-item__detail">${item.detail}</p>
                            </div>
                            <div class="activity-item__side">
                              <span class="activity-time">${item.time}</span>
                              <button class="button button--ghost button--tiny" data-action="open-doc" data-doc-id="${item.docId}" type="button">Open Document</button>
                            </div>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              `
            )
            .join("")
        : `
          <div class="panel-empty">
            <p>No activity records under current filter.</p>
          </div>
        `}
    </div>
  `;
}

function renderSettingsPage() {
  return `
    <div class="dashboard-stack">
      <div class="page-header-row">
        <div>
          <span class="eyebrow">Preferences</span>
          <h1 class="page-title">Settings</h1>
        </div>
      </div>

      <div class="settings-stack">
        <div class="card">
          <div class="settings-section-header">
            <h2 class="section-title">Personal Information</h2>
          </div>
          <div class="settings-profile-row">
            <img src="./img/avatar.png" class="avatar avatar--large" alt="User" />
            <div class="settings-profile-info">
              <strong>Lin Zhiyao</strong>
              <span>lin@university.edu</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="settings-section-header">
            <h2 class="section-title">Writing Preferences</h2>
            <p>Current configuration was set in onboarding, can be reset anytime.</p>
          </div>
          <div class="settings-pref-row">
            <div class="settings-pref-item">
              <span class="field__label">Discipline</span>
              <span class="tag">${state.selectedDiscipline}</span>
            </div>
            <div class="settings-pref-item">
              <span class="field__label">Writing Stage</span>
              <span class="tag">${state.selectedStage}</span>
            </div>
          </div>
          <button class="button button--secondary button--compact" data-action="open-onboarding" type="button">${icon("refresh")}Reset Writing Preferences</button>
        </div>

        <div class="card">
          <div class="settings-section-header">
            <h2 class="section-title">AI Behavior Settings</h2>
            <p>Current active suggestion strategies, view only.</p>
          </div>
          <div class="settings-ai-rows">
            <div class="settings-ai-row">
              <span>Suggestion Density</span>
              <div class="segmented segmented--small">
                <button type="button">High</button>
                <button class="is-active" type="button">Medium</button>
                <button type="button">Low</button>
              </div>
            </div>
            <div class="settings-ai-row">
              <span>Show Questionable Suggestions</span>
              <span class="settings-toggle settings-toggle--on">${icon("check")}On</span>
            </div>
            <div class="settings-ai-row">
              <span>Auto-save Interval</span>
              <span class="tag">Every 30 seconds</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="settings-section-header">
            <h2 class="section-title">Account</h2>
          </div>
          <button class="button button--danger button--compact" data-action="logout" type="button">${icon("logout")}Logout</button>
        </div>
      </div>
    </div>
  `;
}

function renderHomePage() {
  let mainContent;
  if (state.sidebarSelection === "documents") {
    mainContent = renderDocumentsPage();
  } else if (state.sidebarSelection === "history") {
    mainContent = renderHistoryPage();
  } else if (state.sidebarSelection === "settings") {
    mainContent = renderSettingsPage();
  } else {
    mainContent = renderDashboardHome();
  }

  return `
    <section class="page workspace-layout">
      ${renderSidebar()}
      <main class="dashboard-main">
        ${mainContent}
      </main>
    </section>
  `;
}

function renderMiniLogicTree() {
  const currentSection = findSectionByParagraph(state.selectedParagraphId) || editorSections[0];
  const missingNode = logicSections[3].nodes[0];

  return `
    <div class="logic-mini-tree">
      ${currentSection.paragraphs
        .map(
          (paragraph) => `
            <div class="logic-mini-tree__item">
              <span class="logic-dot ${paragraphSeverity(paragraph.id) === "warning" ? "logic-dot--warning" : ""}"></span>
              <span>${paragraph.label}</span>
            </div>
          `
        )
        .join("")}
      <div class="logic-mini-tree__item">
        <span class="logic-dot logic-dot--missing"></span>
        <span>${missingNode.label}</span>
      </div>
    </div>
  `;
}

function renderParagraphCard(paragraph) {
  const related = suggestionsForParagraph(paragraph.id).filter((suggestion) => suggestion.status === "pending");
  const isSelected = state.selectedParagraphId === paragraph.id;
  const displayText = state.editedParagraphs[paragraph.id] !== undefined
    ? escapeHtml(state.editedParagraphs[paragraph.id])
    : escapeHtml(paragraph.text);
  return `
    <div class="editor-paragraph ${isSelected ? "is-selected" : ""}" data-severity="${paragraphSeverity(paragraph.id)}">
      <button class="editor-paragraph__header" data-action="select-paragraph" data-paragraph-id="${paragraph.id}" type="button">
        <small>${paragraph.label}${related.length ? ` · ${related.length} pending` : ""}</small>
      </button>
      <p class="editor-paragraph__text" contenteditable="true" data-editable-id="${paragraph.id}" data-action="focus-paragraph" data-paragraph-id="${paragraph.id}" spellcheck="false">${displayText}</p>
    </div>
  `;
}

function renderSuggestionCard(suggestion) {
  const confidenceClass = suggestion.confidence === "questionable" ? "pill--warning" : "pill--blue";
  const confidenceLabel = suggestion.confidence === "questionable" ? "Questionable" : "High";

  return `
    <article class="suggestion-card ${state.selectedSuggestionId === suggestion.id ? "is-selected" : ""}">
      <div class="suggestion-card__meta">
        <span class="pill ${confidenceClass}">${confidenceLabel}</span>
        <span class="tag">${suggestion.type}</span>
        <span class="pill">${suggestion.status === "pending" ? "Pending" : suggestion.status === "accepted" ? "Accepted" : "Rejected"}</span>
      </div>
      <div class="suggestion-card__body">
        <p>${suggestion.text}</p>
        ${suggestion.note ? `<small>${suggestion.note}</small>` : ""}
        ${suggestion.confidence === "questionable" && suggestion.status === "pending" ? `<button class="inline-link" data-action="show-misunderstanding" type="button">${icon("warning")}View Risk Reason</button>` : ""}
      </div>
      ${suggestion.status === "pending" ? `
        <div class="suggestion-card__actions">
          <button class="button button--primary button--tiny" data-action="accept-suggestion" data-suggestion-id="${suggestion.id}" type="button">Accept</button>
          <button class="button button--secondary button--tiny" data-action="modify-suggestion" data-suggestion-id="${suggestion.id}" type="button">Modify</button>
          <button class="button button--ghost button--tiny" data-action="reject-suggestion" data-suggestion-id="${suggestion.id}" type="button">Reject</button>
        </div>
      ` : ""}
    </article>
  `;
}

function renderSuggestionsPane() {
  const stats = suggestionStats();
  const related = suggestionsForParagraph(state.selectedParagraphId);
  const pending = related.filter((suggestion) => suggestion.status === "pending");

  if (state.rightCollapsed) {
    return `
      <aside class="editor-pane editor-pane--rail">
        <div class="collapsed-rail">
          <button data-action="toggle-right" type="button" title="Expand suggestions">${icon("chevronLeft")}</button>
          <button class="${pending.some((item) => item.confidence === "questionable") ? "is-alert" : ""}" data-action="toggle-right" type="button" title="Current suggestions count">${stats.pending}</button>
        </div>
      </aside>
    `;
  }

  if (state.serviceStatus === "offline" || state.serviceStatus === "recovering") {
    return `
      <aside class="editor-pane">
        <div class="suggestion-panel">
          <div class="suggestion-panel__header">
            <div class="split-row">
              <h3>Suggestions</h3>
              <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}Collapse</button>
            </div>
            <div class="suggestion-panel__counts">
              <span class="pill">Pending ${stats.pending}</span>
              <span class="pill pill--success">Accepted ${stats.accepted}</span>
              <span class="pill pill--danger">Rejected ${stats.rejected}</span>
            </div>
          </div>
          <div class="suggestion-scroll">
            <div class="panel-state panel-state--offline">
              <h4>Offline Mode — AI Suggestions Paused</h4>
              <p>Currently offline. Editor content is unaffected — you can continue writing. Cached suggestions from the last session are shown below for reference only.</p>
            </div>
            ${related.length
              ? `<p class="suggestion-cache-label">${icon("history")}Last connected suggestions · for reference only</p>
                 <div class="suggestion-list">${related.map(renderSuggestionCard).join("")}</div>`
              : `<div class="panel-empty"><p>No cached suggestions for current paragraph.</p></div>`}
          </div>
          <div class="suggestion-footer">
            <button class="button button--primary button--block" data-action="retry-connection" type="button">${icon("refresh")}${state.serviceStatus === "recovering" ? "Reconnecting..." : "Retry Connection"}</button>
          </div>
        </div>
      </aside>
    `;
  }

  if (state.panelMode === "misunderstood") {
    return `
      <aside class="editor-pane">
        <div class="suggestion-panel">
          <div class="suggestion-panel__header">
            <div class="split-row">
              <h3>Suggestions</h3>
              <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}Collapse</button>
            </div>
          </div>
          <div class="suggestion-scroll">
            <div class="panel-state panel-state--warning">
              <div class="panel-state__icon-row">
                ${icon("warning")}
                <h4>AI May Have Misunderstood This Paragraph</h4>
              </div>
              <p>Suggestion confidence for this paragraph is low — the AI may not have correctly recognised certain disciplinary terms or expressions. You can add context to trigger a re-analysis, or dismiss all suggestions.</p>
              <div class="fault-path">
                <span class="fault-path__label">Option 1 — Add context</span>
                <form class="form-stack" data-form="context">
                  <label class="field field--textarea">
                    <textarea data-model="context-draft" name="context" placeholder="e.g., This paragraph describes qualitative research methods, focusing on method boundaries rather than causal mechanisms.">${escapeHtml(state.contextDraft)}</textarea>
                  </label>
                  <button class="button button--primary button--block" type="submit">Submit Context & Re-analyze</button>
                </form>
              </div>
              <div class="fault-path">
                <span class="fault-path__label">Option 2 — Dismiss</span>
                <button class="button button--secondary button--block" data-action="ignore-current-paragraph" type="button">Ignore All Suggestions for This Paragraph</button>
              </div>
              <p class="muted">If this persists, adjust your discipline preferences in Settings.</p>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  return `
    <aside class="editor-pane">
      <div class="suggestion-panel">
        <div class="suggestion-panel__header">
          <div class="split-row">
            <h3>Suggestions</h3>
            <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}Collapse</button>
          </div>
          <div class="suggestion-panel__counts">
            <span class="pill">Pending ${stats.pending}</span>
            <span class="pill pill--success">Accepted ${stats.accepted}</span>
            <span class="pill pill--danger">Rejected ${stats.rejected}</span>
          </div>
        </div>
        <div class="suggestion-scroll">
          ${pending.length
            ? pending.map(renderSuggestionCard).join("")
            : `
              <div class="panel-empty">
                <p>No pending suggestions for current paragraph. Continue editing or re-analyze full text for new structure hints.</p>
              </div>
            `}
        </div>
        <div class="suggestion-footer">
          <button class="button button--ghost button--block" data-action="reject-all" type="button">Reject All</button>
          <button class="button button--secondary button--block" data-action="simulate-offline" type="button">Re-analyze</button>
        </div>
      </div>
    </aside>
  `;
}

function renderUserMenu() {
  return `
    <div class="editor-user-menu">
      <button class="button button--ghost button--compact" data-action="toggle-user-menu" type="button">${icon("user")}User</button>
      ${state.userMenuOpen
        ? `
          <div class="user-menu__panel">
            <button class="user-menu__item" data-action="open-limitations" type="button">${icon("info")}AI Capabilities</button>
            <button class="user-menu__item" data-action="logout" type="button">${icon("logout")}Logout</button>
          </div>
        `
        : ""}
    </div>
  `;
}

function renderCitationsPane() {
  const confidenceClass = (c) => c === "questionable" ? "pill--warning" : "pill--blue";
  const confidenceLabel = (c) => c === "questionable" ? "Questionable" : "High";

  return `
    <div class="editor-pane__body">
      <div class="citations-header">
        <span class="eyebrow">Citations Management</span>
        <span class="pill">Identified ${baseCitations.length} citations</span>
      </div>
      <p class="citations-hint">AI scanned the full text. Citations below need verification, click links to confirm sources.</p>
      <div class="citation-list">
        ${baseCitations
          .map(
            (cit) => `
              <div class="citation-card ${state.selectedCitationId === cit.id ? "is-selected" : ""}" data-action="select-citation" data-citation-id="${cit.id}" role="button" tabindex="0">
                <div class="citation-card__meta">
                  <span class="pill ${confidenceClass(cit.confidence)}">${confidenceLabel(cit.confidence)}</span>
                  ${cit.status === "searching"
                    ? `<span class="citation-searching">${icon("refresh")}Searching...</span>`
                    : `<span class="citation-card__author">${cit.author} · ${cit.year}</span>`}
                </div>
                <p class="citation-card__raw">「${cit.raw}」</p>
                ${cit.title !== "—" ? `<p class="citation-card__title">${cit.title}</p>` : ""}
                ${cit.links.length
                  ? `
                    <div class="citation-links">
                      ${cit.links.map((link) => `<button class="citation-link" data-action="open-citation-link" data-label="${escapeHtml(link.label)}" type="button">${link.label}</button>`).join("")}
                    </div>
                  `
                  : ""}
              </div>
            `
          )
          .join("")}
      </div>
      <button class="button button--secondary button--block" data-action="rescan-citations" type="button">${icon("spark")}Rescan Citations</button>
    </div>
  `;
}

function renderEditorPage() {
  const doc = currentDoc();
  const pendingCount = suggestionStats().pending;

  return `
    <section class="page editor-page">
      <header class="editor-topbar">
        <div class="editor-title-block">
          ${state.titleEditing
            ? `
              <form class="title-edit" data-form="rename-title">
                <input data-model="title-draft" name="title" value="${escapeHtml(state.titleDraft)}" />
                <button class="button button--primary button--compact" type="submit">${icon("check")}Save</button>
              </form>
            `
            : `
              <button class="title-button" data-action="start-title-edit" type="button">
                ${icon("pen")}
                <span>${doc.title}</span>
              </button>
            `}
          <div class="editor-breadcrumbs">
            ${currentBreadcrumb().map((item) => `<span>${item}</span>`).join("")}
          </div>
        </div>

        <div class="editor-warning-pill">
          ${icon("warning")}AI only suggests structure and expression, not domain judgment
          <button class="inline-link" data-action="open-limitations" type="button">Learn more</button>
        </div>

        <div class="editor-actions">
          <button class="button button--ghost button--compact" data-action="go-home" type="button">${icon("home")}Home</button>
          <button class="button button--primary button--compact" data-action="save-doc" type="button">${icon("check")}Save</button>
          <button class="button button--secondary button--compact" data-action="open-versions" type="button">${icon("compare")}Version History</button>
          <button class="button button--secondary button--compact" data-action="export-doc" type="button">${icon("export")}Export</button>
          ${renderUserMenu()}
        </div>
      </header>

      ${state.serviceStatus === "offline"
        ? `
          <div class="editor-banner editor-banner--offline">
            <strong>${icon("warning")}AI service temporarily unavailable, reconnecting…</strong>
            <span class="banner-save-confirm">${icon("check")}Draft auto-saved locally · ${state.localSaveTime || formattedTime()}</span>
            <button class="button button--secondary button--tiny" data-action="retry-connection" type="button">Retry Connection</button>
          </div>
        `
        : ""}

      ${state.serviceStatus === "recovering"
        ? `
          <div class="editor-banner editor-banner--recovering">
            <strong>${icon("refresh")}Reconnecting AI service...</strong>
            <p>Editor content unaffected, you can continue editing current paragraph.</p>
          </div>
        `
        : ""}

      ${state.serviceStatus === "recovered"
        ? `
          <div class="editor-banner editor-banner--recovered">
            <strong>${icon("check")}AI Service Recovered</strong>
            <p>Suggestions panel available again, offline banner will disappear in a few seconds.</p>
          </div>
        `
        : ""}

      <div class="editor-shell ${state.leftCollapsed ? "is-left-collapsed" : ""} ${state.rightCollapsed ? "is-right-collapsed" : ""}">
        <aside class="editor-pane editor-pane--rail">
          ${state.leftCollapsed
            ? `
              <div class="collapsed-rail">
                <button data-action="toggle-left" type="button" title="Expand left panel">${icon("chevronRight")}</button>
                <button data-action="open-structure" type="button" title="View structure">${icon("branch")}</button>
              </div>
            `
            : `
              <div class="editor-pane__header">
                <div class="editor-left-tabs">
                  <button class="${state.editorLeftTab === "navigation" ? "is-active" : ""}" data-action="editor-left-tab" data-tab="navigation" class="${state.editorLeftTab === "navigation" ? "is-active" : ""}" type="button">Section Navigation</button>
                  <button class="${state.editorLeftTab === "citations" ? "is-active" : ""}" data-action="editor-left-tab" data-tab="citations" class="${state.editorLeftTab === "citations" ? "is-active" : ""}" type="button">Citations Management</button>
                </div>
                <button class="button button--ghost button--tiny" data-action="toggle-left" type="button">${icon("chevronLeft")}Collapse</button>
              </div>
              ${state.editorLeftTab === "citations"
                ? renderCitationsPane()
                : `
                  <div class="editor-pane__body">
                    <div class="section-nav-header">
                      <span class="eyebrow">AI-generated section summaries</span>
                      <button class="button button--ghost button--tiny" data-action="refresh-summaries" type="button">${icon("refresh")}Refresh</button>
                    </div>
                    ${state.activeSectionId ? `
                      <div class="section-filter-bar">
                        <span class="section-filter-bar__label">Showing filtered section</span>
                        <button class="button button--ghost button--tiny" data-action="clear-section-filter" type="button">${icon("close")}Show All</button>
                      </div>
                    ` : ""}
                    <div class="section-list">
                      ${editorSections
                        .map(
                          (section) => `
                            <button class="section-button ${state.activeSectionId === section.id ? "is-active" : ""}" data-action="select-section" data-section-id="${section.id}" type="button">
                              <strong>${section.anchor}</strong>
                              <span>${section.paragraphs.length} paragraphs</span>
                              <span class="section-summary">${section.summary || ""}</span>
                            </button>
                          `
                        )
                        .join("")}
                    </div>
                    <button class="button button--secondary button--block" data-action="open-structure" type="button">${icon("branch")}Open Logic Analysis</button>
                  </div>
                `}
            `}
        </aside>

        <main class="editor-pane editor-main">
          <div class="editor-meta">
            <div class="editor-meta__title">
              <span class="eyebrow">Editing</span>
              <p>Current document uses 1.8 line-height. Suggestions and paragraph status shown by colored bars on the left.</p>
            </div>
            <div class="editor-stat-row">
              <span class="pill">Words 2,486</span>
              <span class="pill pill--blue">Pending ${pendingCount}</span>
              <span class="pill">${doc.discipline}</span>
            </div>
          </div>

          <div class="editor-document">
            ${editorSections
              .filter((section) => !state.activeSectionId || section.id === state.activeSectionId)
              .map(
                (section) => `
                  <section class="editor-section">
                    <div class="editor-section__heading">
                      <h2>${section.anchor}</h2>
                      <span class="tag">${section.name}</span>
                    </div>
                    ${section.paragraphs.map(renderParagraphCard).join("")}
                  </section>
                `
              )
              .join("")}
          </div>

          <div class="editor-toolbar">
            <div class="editor-toolbar__group">
              <button class="button button--secondary" data-action="analyze-paragraph" type="button">${icon("spark")}Analyze Paragraph</button>
              <button class="button button--primary" data-action="simulate-offline" type="button">${icon("refresh")}Analyze All</button>
            </div>
            <div class="editor-toolbar__group">
              <button class="button button--ghost" data-action="open-limitations" type="button">${icon("info")}View Limitations</button>
            </div>
          </div>
        </main>

        ${renderSuggestionsPane()}
      </div>
    </section>
  `;
}

function renderModifyOverlay() {
  const suggestion = state.suggestions.find((s) => s.id === state.selectedSuggestionId);
  if (!suggestion) return "";
  const confidenceClass = suggestion.confidence === "questionable" ? "pill--warning" : "pill--blue";
  const confidenceLabel = suggestion.confidence === "questionable" ? "Questionable" : "High";

  return `
    <div class="overlay" data-backdrop="true">
      <div class="overlay__card overlay__card--modify">
        <div class="overlay__header">
          <div>
            <h2>Customize This Suggestion</h2>
            <p>Describe how you'd like AI to adjust this suggestion for your specific needs.</p>
          </div>
          <button class="overlay__close" data-action="close-overlay" type="button">${icon("close")}</button>
        </div>

        <div class="modify-original">
          <div class="modify-original__label">
            <span class="pill ${confidenceClass}">${confidenceLabel}</span>
            <span class="tag">${suggestion.type}</span>
            <span class="eyebrow">Current suggestion</span>
          </div>
          <p class="modify-original__text">${escapeHtml(suggestion.text)}</p>
          ${suggestion.note ? `<small class="modify-original__note">${escapeHtml(suggestion.note)}</small>` : ""}
        </div>

        <form class="form-stack" data-form="modify-prompt">
          <label class="field field--textarea">
            <span class="field__label">Your instruction to AI</span>
            <textarea
              data-model="modify-prompt"
              name="prompt"
              placeholder="e.g., Make it more concise / Use passive voice / Focus on methodology / Adapt for a humanities audience"
              rows="4"
            >${escapeHtml(state.modifyPrompt)}</textarea>
          </label>
          <div class="step-actions">
            <button class="button button--secondary" data-action="close-overlay" type="button">Cancel</button>
            <button class="button button--primary" type="submit">${icon("spark")}Generate Customized Suggestion</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderLimitationsOverlay() {
  return `
    <div class="overlay" data-backdrop="true">
      <div class="overlay__card">
        <div class="overlay__header">
          <div>
            <h2>ScholarMind AI Capabilities</h2>
            <p>All suggestions serve structure and expression assistance only. Final writing decisions always remain with the author.</p>
          </div>
          <button class="overlay__close" data-action="close-overlay" type="button">${icon("close")}</button>
        </div>

        <div class="capability-grid">
          <section class="capability-column">
            <h3>${icon("check")}AI Can Do</h3>
            <ul>${capabilityCan.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
          <section class="capability-column">
            <h3>${icon("warning")}AI Cannot Do</h3>
            <ul>${capabilityCannot.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
        </div>

        <div class="capability-note">All AI suggestions are for reference only. Final writing decisions are yours. Questionable suggestions should be carefully considered with professional judgment.</div>

        <div class="step-actions">
          <div></div>
          <button class="button button--primary" data-action="close-overlay" type="button">Got it</button>
        </div>
      </div>
    </div>
  `;
}

function renderStructureOverlay() {
  const weakCount = logicSections.flatMap((section) => section.nodes).filter((node) => node.status === "weak").length;
  const missingCount = logicSections.flatMap((section) => section.nodes).filter((node) => node.status === "missing").length;
  const detail = logicDetails[state.selectedStructureNodeId] || logicDetails["p-2"];

  return `
    <div class="overlay" data-backdrop="true">
      <div class="fullscreen-modal">
        <div class="fullscreen-modal__header">
          <h2>Document Logic Structure</h2>
          <button class="overlay__close" data-action="close-overlay" type="button">${icon("close")}</button>
        </div>

        <div class="logic-modal__body">
          <div class="logic-graph">
            <div class="logic-root">${icon("branch")}${currentDocTitle()}</div>
            ${logicSections
              .map(
                (section) => `
                  <section class="logic-section">
                    <h3>${section.label}</h3>
                    <div class="logic-node-row">
                      ${section.nodes
                        .map(
                          (node) => `
                            <button class="logic-node ${state.selectedStructureNodeId === node.id ? "is-selected" : ""}" data-status="${node.status}" data-action="select-structure-node" data-node-id="${node.id}" type="button">
                              <strong>${node.label}</strong>
                              <span>${node.status === "weak" ? "Weak connection" : node.status === "missing" ? "Missing recommended" : "Normal structure"}</span>
                            </button>
                          `
                        )
                        .join("")}
                    </div>
                  </section>
                `
              )
              .join("")}
          </div>

          <aside class="logic-inspector">
            <span class="eyebrow">Node detail</span>
            <h3>${state.selectedStructureNodeId === "missing-limitations" ? "Missing Node Suggestion" : getParagraph(state.selectedStructureNodeId).label}</h3>
            <p>${detail}</p>
            ${state.selectedStructureNodeId !== "missing-limitations" ? `<button class="button button--secondary button--block" data-action="jump-to-selected-node" type="button">Highlight in Editor</button>` : ""}
          </aside>
        </div>

        <div class="fullscreen-modal__footer">
          <p>Issues: ${weakCount} weak connections in orange / ${missingCount} missing in red</p>
          <button class="button button--primary" data-action="close-overlay" type="button">Close & Return</button>
        </div>
      </div>
    </div>
  `;
}

function renderVersionOverlay() {
  const diffEntries = getDiffEntries();

  return `
    <div class="overlay" data-backdrop="true">
      <div class="fullscreen-modal">
        <div class="fullscreen-modal__header">
          <h2>Version History & Comparison</h2>
          <button class="overlay__close" data-action="close-overlay" type="button">${icon("close")}</button>
        </div>

        <div class="version-modal__body">
          <aside class="version-list">
            ${versionHistory
              .map(
                (version) => `
                  <button class="version-item ${state.versionB === version.id ? "is-active" : ""}" data-action="select-version-card" data-version-id="${version.id}" type="button">
                    <strong>${version.time}</strong>
                    <span>${version.summary}</span>
                    <small>${version.count} suggestions</small>
                  </button>
                `
              )
              .join("")}
          </aside>

          <section class="version-diff">
            <div class="version-diff__toolbar">
              <div class="split-row">
                <label class="field">
                  <span class="field__label">Version A</span>
                  <select data-model="version-a">
                    ${versionHistory
                      .map(
                        (version) => `
                          <option value="${version.id}" ${state.versionA === version.id ? "selected" : ""}>${version.time}</option>
                        `
                      )
                      .join("")}
                  </select>
                </label>
                <label class="field">
                  <span class="field__label">Version B</span>
                  <select data-model="version-b">
                    ${versionHistory
                      .map(
                        (version) => `
                          <option value="${version.id}" ${state.versionB === version.id ? "selected" : ""}>${version.time}</option>
                        `
                      )
                      .join("")}
                  </select>
                </label>
              </div>
              <div class="split-row">
                <button class="button button--ghost button--compact" data-action="prev-diff" type="button">${icon("chevronLeft")}Previous</button>
                <button class="button button--ghost button--compact" data-action="next-diff" type="button">Next${icon("chevronRight")}</button>
              </div>
            </div>

            <div class="diff-grid">
              <div class="diff-column">
                <h3>Old Version</h3>
                <div class="diff-lines">
                  ${diffEntries
                    .map(
                      (entry, index) => `
                        <article class="diff-line ${state.versionJumpIndex === index ? "is-focused" : ""}" data-change="${entry.status === "added" ? "unchanged" : entry.status === "modified" ? "removed" : "unchanged"}">
                          <small>${entry.label}</small>
                          <p>${entry.old || "—"}</p>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </div>
              <div class="diff-column">
                <h3>New Version</h3>
                <div class="diff-lines">
                  ${diffEntries
                    .map(
                      (entry, index) => `
                        <article class="diff-line ${state.versionJumpIndex === index ? "is-focused" : ""}" data-change="${entry.status === "added" ? "added" : entry.status === "modified" ? "added" : "unchanged"}">
                          <small>${entry.label}</small>
                          <p>${entry.new || "—"}</p>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="fullscreen-modal__footer">
          <button class="button button--danger" data-action="request-restore-version" type="button">Restore to This Version</button>
          <button class="button button--secondary" data-action="close-overlay" type="button">Close</button>
        </div>

        ${state.restoreConfirm
          ? `
            <div class="confirm-sheet">
              <div class="confirm-sheet__card">
                <h3>Confirm Restore History Version?</h3>
                <p>After restore, return to main editor and replace current content with selected version.</p>
                <div class="confirm-sheet__actions">
                  <button class="button button--secondary" data-action="cancel-restore" type="button">Cancel</button>
                  <button class="button button--danger" data-action="confirm-restore" type="button">Confirm Restore</button>
                </div>
              </div>
            </div>
          `
          : ""}
      </div>
    </div>
  `;
}

function renderOverlay() {
  if (state.overlay === "modify-suggestion") {
    return renderModifyOverlay();
  }
  if (state.overlay === "limitations") {
    return renderLimitationsOverlay();
  }
  if (state.overlay === "structure") {
    return renderStructureOverlay();
  }
  if (state.overlay === "versions") {
    return renderVersionOverlay();
  }
  return "";
}

function renderToast() {
  if (!state.toast) {
    return "";
  }
  const toneClass =
    state.toast.tone === "success"
      ? "toast--success"
      : state.toast.tone === "warning"
        ? "toast--warning"
        : state.toast.tone === "danger"
          ? "toast--danger"
          : "";

  return `<div class="toast ${toneClass}">${icon(state.toast.tone === "danger" ? "warning" : "check")}${state.toast.message}</div>`;
}

function renderPage() {
  if (state.page === "onboarding") {
    return renderOnboardingPage();
  }
  if (state.page === "home") {
    return renderHomePage();
  }
  if (state.page === "editor") {
    return renderEditorPage();
  }
  return renderAuthPage();
}

function clearRecoveryTimers() {
  window.clearTimeout(timers.recovery);
  window.clearTimeout(timers.online);
}

function triggerOfflineMode() {
  clearRecoveryTimers();
  state.serviceStatus = "offline";
  state.localSaveTime = formattedTime();
  state.panelMode = "normal";
  state.rightCollapsed = false;
  render();
}

function triggerReconnect() {
  clearRecoveryTimers();
  state.serviceStatus = "recovering";
  render();
  timers.recovery = window.setTimeout(() => {
    state.serviceStatus = "recovered";
    render();
    timers.online = window.setTimeout(() => {
      state.serviceStatus = "online";
      render();
    }, 3000);
  }, 1200);
}

function persistTitleDraft() {
  const nextTitle = state.titleDraft.trim();
  if (!nextTitle) {
    state.titleEditing = false;
    state.titleDraft = currentDocTitle();
    render();
    return;
  }
  updateCurrentDoc({ title: nextTitle, modified: "Just now" });
  state.titleEditing = false;
  showToast("Document title updated.", "success");
  render();
}

function handleClick(event) {
  if (event.target.dataset.backdrop === "true") {
    closeOverlay();
    return;
  }

  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    if (state.userMenuOpen && !event.target.closest(".editor-user-menu")) {
      state.userMenuOpen = false;
      render();
    }
    return;
  }

  const action = actionElement.dataset.action;

  if (action !== "toggle-user-menu") {
    state.userMenuOpen = false;
  }

  switch (action) {
    case "switch-auth-tab":
      state.authTab = actionElement.dataset.tab;
      render();
      return;
    case "open-limitations":
      openOverlay("limitations");
      return;
    case "close-overlay":
      closeOverlay();
      return;
    case "sidebar-nav":
      state.sidebarSelection = actionElement.dataset.value;
      render();
      return;
    case "create-doc":
      ensureDraftDocument();
      state.currentDocId = "doc-new";
      updateCurrentDoc({
        title: state.quickPaste.trim() ? "Imported Draft" : "Untitled Document",
        discipline: state.selectedDiscipline,
        modified: "Just now",
        suggestions: 6,
        path: ["My Documents", "New Document", "Draft"]
      });
      state.titleDraft = currentDocTitle();
      selectParagraph("p-2");
      state.serviceStatus = "online";
      state.panelMode = "normal";
      state.leftCollapsed = false;
      state.rightCollapsed = false;
      setRoute("editor");
      showToast(state.quickPaste.trim() ? "Text imported and entered editor." : "Blank draft created.", "success");
      return;
    case "open-doc":
      openDocument(actionElement.dataset.docId);
      return;
    case "toggle-left":
      state.leftCollapsed = !state.leftCollapsed;
      render();
      return;
    case "toggle-right":
      state.rightCollapsed = !state.rightCollapsed;
      render();
      return;
    case "select-section": {
      const sectionId = actionElement.dataset.sectionId;
      const section = editorSections.find((item) => item.id === sectionId);
      if (section) {
        state.activeSectionId = state.activeSectionId === sectionId ? null : sectionId;
        selectParagraph(section.paragraphs[0].id);
        state.panelMode = "normal";
        render();
      }
      return;
    }
    case "clear-section-filter":
      state.activeSectionId = null;
      render();
      return;
    case "focus-paragraph":
      if (state.selectedParagraphId !== actionElement.dataset.paragraphId) {
        selectParagraph(actionElement.dataset.paragraphId);
        state.panelMode = "normal";
        render();
      }
      return;
    case "select-paragraph":
      selectParagraph(actionElement.dataset.paragraphId);
      state.panelMode = "normal";
      render();
      return;
    case "accept-suggestion":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.id === actionElement.dataset.suggestionId ? { ...suggestion, status: "accepted" } : suggestion
      );
      state.selectedSuggestionId = firstSuggestionForParagraph(state.selectedParagraphId)?.id || null;
      showToast("Suggestion accepted and recorded in version history.", "success");
      render();
      return;
    case "reject-suggestion":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.id === actionElement.dataset.suggestionId ? { ...suggestion, status: "rejected" } : suggestion
      );
      state.selectedSuggestionId = firstSuggestionForParagraph(state.selectedParagraphId)?.id || null;
      showToast("Suggestion rejected.", "warning");
      render();
      return;
    case "modify-suggestion":
      state.selectedSuggestionId = actionElement.dataset.suggestionId;
      state.modifyPrompt = "";
      openOverlay("modify-suggestion");
      return;
    case "reject-all":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.paragraphId === state.selectedParagraphId && suggestion.status === "pending"
          ? { ...suggestion, status: "rejected" }
          : suggestion
      );
      state.selectedSuggestionId = null;
      showToast("All pending suggestions for current paragraph rejected.", "warning");
      render();
      return;
    case "show-misunderstanding":
      state.panelMode = "misunderstood";
      state.rightCollapsed = false;
      render();
      return;
    case "ignore-current-paragraph":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.paragraphId === state.selectedParagraphId && suggestion.status === "pending"
          ? { ...suggestion, status: "rejected" }
          : suggestion
      );
      state.panelMode = "normal";
      showToast("All suggestions for this paragraph marked as rejected.", "warning");
      render();
      return;
    case "simulate-offline":
      triggerOfflineMode();
      return;
    case "retry-connection":
      triggerReconnect();
      return;
    case "analyze-paragraph":
      if (suggestionsForParagraph(state.selectedParagraphId).some((item) => item.confidence === "questionable" && item.status === "pending")) {
        state.panelMode = "misunderstood";
        state.rightCollapsed = false;
        render();
      } else {
        showToast("Current paragraph analysis complete, no new high-risk issues found.", "success");
      }
      return;
    case "open-versions":
      openOverlay("versions");
      return;
    case "open-structure":
      state.selectedStructureNodeId = state.selectedParagraphId;
      openOverlay("structure");
      return;
    case "select-structure-node":
      state.selectedStructureNodeId = actionElement.dataset.nodeId;
      if (state.selectedStructureNodeId.startsWith("p-")) {
        selectParagraph(state.selectedStructureNodeId);
      }
      render();
      return;
    case "jump-to-selected-node":
      if (state.selectedStructureNodeId.startsWith("p-")) {
        selectParagraph(state.selectedStructureNodeId);
      }
      closeOverlay();
      return;
    case "prev-diff":
      state.versionJumpIndex = Math.max(0, state.versionJumpIndex - 1);
      render();
      return;
    case "next-diff":
      state.versionJumpIndex = Math.min(getDiffEntries().length - 1, state.versionJumpIndex + 1);
      render();
      return;
    case "request-restore-version":
      state.restoreConfirm = true;
      render();
      return;
    case "cancel-restore":
      state.restoreConfirm = false;
      render();
      return;
    case "confirm-restore":
      state.restoreConfirm = false;
      state.overlay = null;
      updateCurrentDoc({ modified: "Just now" });
      state.serviceStatus = "online";
      state.panelMode = "normal";
      showToast("Restored to selected version.", "success");
      render();
      return;
    case "start-title-edit":
      state.titleEditing = true;
      render();
      return;
    case "save-doc":
      updateCurrentDoc({ modified: formattedTime() });
      showToast("Document saved.", "success");
      render();
      return;
    case "export-doc":
      showToast("Export task queued.", "success");
      return;
    case "toggle-user-menu":
      state.userMenuOpen = !state.userMenuOpen;
      render();
      return;
    case "go-home":
      setRoute("home");
      return;
    case "doc-filter":
      state.docFilter = actionElement.dataset.value;
      render();
      return;
    case "history-filter":
      state.historyFilter = actionElement.dataset.value;
      render();
      return;
    case "editor-left-tab":
      state.editorLeftTab = actionElement.dataset.tab;
      render();
      return;
    case "select-citation":
      state.selectedCitationId = actionElement.dataset.citationId;
      render();
      return;
    case "refresh-summaries":
      showToast("AI re-analyzing section summaries…", "success");
      return;
    case "rescan-citations":
      showToast("AI re-scanning citations, please wait.", "success");
      return;
    case "open-citation-link": {
      const label = actionElement.dataset.label || "External source";
      showToast(`Opening "${label}" — external link (prototype simulation).`, "success");
      return;
    }
    case "open-onboarding":
      state.onboardingStep = 1;
      setRoute("onboarding");
      return;
    case "demo-fault-p7":
      state.hasCompletedOnboarding = true;
      openDocument("doc-1");
      selectParagraph("p-5");
      state.panelMode = "misunderstood";
      state.contextDraft = "";
      state.rightCollapsed = false;
      render();
      return;
    case "demo-fault-p8":
      state.hasCompletedOnboarding = true;
      openDocument("doc-1");
      triggerOfflineMode();
      return;
    case "logout":
      state.overlay = null;
      state.userMenuOpen = false;
      setRoute("auth");
      showToast("You have logged out.", "warning");
      return;
    case "onboarding-next":
      state.onboardingStep = Math.min(4, state.onboardingStep + 1);
      render();
      return;
    case "onboarding-back":
      state.onboardingStep = Math.max(1, state.onboardingStep - 1);
      render();
      return;
    case "onboarding-acknowledge":
      state.onboardingStep = 4;
      render();
      return;
    case "enter-home":
      state.hasCompletedOnboarding = true;
      setRoute("home");
      showToast("Initialization complete, entering home.", "success");
      return;
    case "select-discipline":
      state.selectedDiscipline = actionElement.dataset.value;
      render();
      return;
    case "select-stage":
      state.selectedStage = actionElement.dataset.value;
      render();
      return;
    default:
      return;
  }
}

function handleSubmit(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) {
    return;
  }

  event.preventDefault();

  switch (form.dataset.form) {
    case "login":
      if (state.hasCompletedOnboarding) {
        setRoute("home");
      } else {
        setRoute("onboarding");
      }
      return;
    case "register":
      state.hasCompletedOnboarding = false;
      state.onboardingStep = 1;
      setRoute("onboarding");
      return;
    case "context":
      if (!state.contextDraft.trim()) {
        showToast("Please add necessary context first.", "warning");
        return;
      }
      state.suggestions = state.suggestions.map((suggestion) => {
        if (suggestion.paragraphId === state.selectedParagraphId && suggestion.confidence === "questionable") {
          return {
            ...suggestion,
            confidence: "high",
            note: `Re-analyzed with added context: ${state.contextDraft.trim()}`
          };
        }
        return suggestion;
      });
      state.contextDraft = "";
      state.panelMode = "normal";
      showToast("Suggestions refreshed based on added context.", "success");
      render();
      return;
    case "rename-title":
      persistTitleDraft();
      return;
    case "modify-prompt": {
      if (!state.modifyPrompt.trim()) {
        showToast("Please enter an instruction for AI first.", "warning");
        return;
      }
      const targetId = state.selectedSuggestionId;
      const userPrompt = state.modifyPrompt.trim();
      const original = state.suggestions.find((s) => s.id === targetId);
      if (original) {
        const regenerated = `[Customized per instruction: "${userPrompt}"] ${original.text.replace(/^Consider |^Change |^Replace |^Moving /, "").charAt(0).toUpperCase() + original.text.replace(/^Consider |^Change |^Replace |^Moving /, "").slice(1)}`;
        state.suggestions = state.suggestions.map((s) =>
          s.id === targetId ? { ...s, text: regenerated, note: `Customized by user instruction: "${userPrompt}"` } : s
        );
      }
      state.modifyPrompt = "";
      state.overlay = null;
      showToast("AI regenerated suggestion based on your input.", "success");
      render();
      return;
    }
    default:
      return;
  }
}

function handleInput(event) {
  const model = event.target.dataset.model;
  if (!model) {
    return;
  }

  switch (model) {
    case "auth-email":
      state.authValues.email = event.target.value;
      return;
    case "auth-password":
      state.authValues.password = event.target.value;
      return;
    case "auth-name":
      state.authValues.name = event.target.value;
      return;
    case "auth-confirm":
      state.authValues.confirmPassword = event.target.value;
      return;
    case "context-draft":
      state.contextDraft = event.target.value;
      return;
    case "modify-prompt":
      state.modifyPrompt = event.target.value;
      return;
    case "quick-paste":
      state.quickPaste = event.target.value;
      return;
    case "title-draft":
      state.titleDraft = event.target.value;
      return;
    default:
      return;
  }
}

function handleChange(event) {
  const model = event.target.dataset.model;
  if (model === "version-a") {
    state.versionA = event.target.value;
    state.versionJumpIndex = 0;
    render();
    return;
  }
  if (model === "version-b") {
    state.versionB = event.target.value;
    state.versionJumpIndex = 0;
    render();
  }
}

function render() {
  document.body.classList.toggle("is-modal-open", Boolean(state.overlay));
  document.title =
    state.page === "editor"
      ? "ScholarMind - Editor"
      : state.page === "home"
        ? "ScholarMind - Home"
        : state.page === "onboarding"
          ? "ScholarMind · Onboarding"
          : "ScholarMind - Login";

  app.innerHTML = `${renderPage()}${renderOverlay()}${renderToast()}`;

  if (state.overlay === "versions") {
    window.requestAnimationFrame(() => {
      const focused = document.querySelector(".diff-line.is-focused");
      if (focused) {
        focused.scrollIntoView({ block: "nearest" });
      }
    });
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("focusout", function handleFocusOut(event) {
  const editableId = event.target.dataset.editableId;
  if (!editableId) return;
  const newText = event.target.innerText.trim();
  if (newText !== (state.editedParagraphs[editableId] ?? "")) {
    state.editedParagraphs[editableId] = newText;
  }
});

render();
