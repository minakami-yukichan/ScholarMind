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
    title: "结构建议有据可循",
    copy: "围绕段落、章节与论证链条给出可解释的修改提示。"
  },
  {
    icon: "warning",
    title: "把不确定性明确标出",
    copy: "低可信建议单独标注，不把猜测伪装成结论。"
  },
  {
    icon: "compare",
    title: "版本对比可以回溯",
    copy: "每次接受、拒绝与手动编辑都进入版本历史，便于复盘。"
  }
];

const disciplines = [
  "理工科",
  "社会科学",
  "人文",
  "医学",
  "商科",
  "其他"
];

const stages = [
  "初稿整理",
  "结构优化",
  "语言润色",
  "最终校对"
];

const capabilityCan = [
  "建议段落结构",
  "提示逻辑断层",
  "改善表达流畅度",
  "标注措辞存疑处",
  "汇总待处理建议",
  "追踪版本变化"
];

const capabilityCannot = [
  "判断学科专业知识正误",
  "核实引用来源",
  "做出最终修改决策",
  "理解特定领域术语偏好",
  "替你承担署名责任",
  "保证建议一定适用于你的学科"
];

const baseDocuments = [
  {
    id: "doc-1",
    title: "数字平台劳动中的算法透明度叙事",
    discipline: "社会科学",
    modified: "今天 16:42",
    suggestions: 6,
    path: ["我的文档", "论文项目", "引言修订"],
    summary: "接受了 3 条建议 / 手动编辑了 2 处"
  },
  {
    id: "doc-2",
    title: "医学综述的方法段重写",
    discipline: "医学",
    modified: "昨天 21:18",
    suggestions: 2,
    path: ["我的文档", "综述", "方法部分"],
    summary: "新增了样本边界说明"
  },
  {
    id: "doc-3",
    title: "商学院案例研究结论",
    discipline: "商科",
    modified: "4 月 9 日 18:36",
    suggestions: 4,
    path: ["我的文档", "案例研究", "结论段"],
    summary: "拒绝了 2 条存疑建议"
  }
];

const editorSections = [
  {
    id: "sec-1",
    name: "研究背景",
    anchor: "1. 研究背景",
    paragraphs: [
      {
        id: "p-1",
        label: "背景铺陈",
        text: "近年来，关于平台劳动中的算法透明性讨论多聚焦于工具效率与流程管理，但学术写作者如何解释这种透明性，仍缺少细致分析。"
      },
      {
        id: "p-2",
        label: "研究空白",
        text: "现有研究往往直接将平台规则与写作行为并置，却没有解释制度期望如何转换为具体的写作策略，这使得引言在理论上出现了一步跳跃。"
      }
    ]
  },
  {
    id: "sec-2",
    name: "理论框架",
    anchor: "2. 理论框架",
    paragraphs: [
      {
        id: "p-3",
        label: "概念界定",
        text: "本文将算法透明性理解为作者对系统建议来源、边界与可信度的可感知程度，而不仅是模型性能的可展示结果。"
      },
      {
        id: "p-4",
        label: "分析维度",
        text: "在此基础上，文章从结构建议、表达润色与逻辑提示三个维度讨论 AI 协作对学术写作的影响，并说明作者如何在过程中保持判断权。"
      }
    ]
  },
  {
    id: "sec-3",
    name: "方法与讨论",
    anchor: "3. 方法与讨论",
    paragraphs: [
      {
        id: "p-5",
        label: "样本说明",
        text: "研究采用半结构访谈与版本记录对照的方式观察作者如何接收、拒绝或重写 AI 建议，但当前段落仍欠缺对样本边界的明确交代。"
      },
      {
        id: "p-6",
        label: "阶段结论",
        text: "初步结果显示，作者更愿意接受结构调整类建议，而会对涉及学科术语与引用判断的建议保持高度谨慎。"
      }
    ]
  }
];

const baseSuggestions = [
  {
    id: "s-1",
    paragraphId: "p-1",
    confidence: "high",
    type: "结构",
    text: "建议在本段末尾补一句研究问题定义，让下一段的“研究空白”更早出现。",
    note: "",
    status: "pending"
  },
  {
    id: "s-2",
    paragraphId: "p-2",
    confidence: "questionable",
    type: "逻辑",
    text: "本段从“制度期望”直接跳到“写作策略”，中间缺少转化机制的解释。",
    note: "该判断基于上下文推断，可能受到学科术语与写作范式差异影响。",
    status: "pending"
  },
  {
    id: "s-3",
    paragraphId: "p-2",
    confidence: "high",
    type: "结构",
    text: "将研究问题前置到第二句，可更快建立段落主旨。",
    note: "",
    status: "pending"
  },
  {
    id: "s-4",
    paragraphId: "p-4",
    confidence: "high",
    type: "措辞",
    text: "将“保持判断权”改为“保留最终学术判断权”，语义会更明确。",
    note: "",
    status: "accepted"
  },
  {
    id: "s-5",
    paragraphId: "p-5",
    confidence: "questionable",
    type: "结构",
    text: "AI 判断此处可能缺少研究限制声明，建议说明样本规模或语料边界。",
    note: "请结合学科规范确认是否应在本节或结论部分补充。",
    status: "pending"
  },
  {
    id: "s-6",
    paragraphId: "p-6",
    confidence: "high",
    type: "措辞",
    text: "最后一句可拆成两句，以提升结论段的阅读节奏。",
    note: "",
    status: "rejected"
  }
];

const logicSections = [
  {
    id: "logic-1",
    label: "研究背景",
    nodes: [
      { id: "p-1", label: "背景铺陈段", status: "normal" },
      { id: "p-2", label: "研究空白段", status: "weak" }
    ]
  },
  {
    id: "logic-2",
    label: "理论框架",
    nodes: [
      { id: "p-3", label: "概念界定段", status: "normal" },
      { id: "p-4", label: "分析维度段", status: "normal" }
    ]
  },
  {
    id: "logic-3",
    label: "方法与讨论",
    nodes: [
      { id: "p-5", label: "样本说明段", status: "weak" },
      { id: "p-6", label: "阶段结论段", status: "normal" }
    ]
  },
  {
    id: "logic-4",
    label: "结构缺口",
    nodes: [{ id: "missing-limitations", label: "研究限制声明", status: "missing" }]
  }
];

const logicDetails = {
  "p-1": "本段承担背景铺陈功能，建议保留问题意识，但可增加一句“为何需要新的协作视角”来抬高研究动机。",
  "p-2": "AI 判断该段与下一段之间缺少“制度期望如何转为写作策略”的过渡，因此标记为逻辑衔接弱。",
  "p-3": "概念界定清晰，当前结构稳定，适合作为理论框架的入口段。",
  "p-4": "本段承担分析维度展开功能，建议继续保持三分法结构，不需要再压缩。",
  "p-5": "AI 认为样本说明仍不完整，读者会难以判断结论边界，因此建议补一段限制说明或把边界前置。",
  "p-6": "该段主要承担阶段结论作用，建议维持判断谨慎的语气，避免过强概括。",
  "missing-limitations": "当前结构中缺少一段用于交代研究限制、样本语料边界或适用范围的说明，因此以红色虚线节点提示。"
};

const versionHistory = [
  {
    id: "v-1",
    time: "04-10 09:12",
    summary: "导入原始草稿",
    count: 0
  },
  {
    id: "v-2",
    time: "04-10 14:36",
    summary: "接受了 2 条结构建议",
    count: 2
  },
  {
    id: "v-3",
    time: "04-10 19:08",
    summary: "手动编辑了 3 处表达",
    count: 1
  },
  {
    id: "v-4",
    time: "04-11 16:42",
    summary: "接受了 3 条建议 / 手动编辑了 2 处",
    count: 4
  }
];

const diffSets = {
  default: [
    {
      label: "摘要首段",
      old: "目前关于算法透明性的讨论多集中在工具性能层面。",
      new: "目前关于算法透明性的讨论，多集中在工具性能与流程可解释性层面。",
      status: "modified"
    },
    {
      label: "研究问题",
      old: "本文尝试说明平台如何影响写作者决策。",
      new: "本文进一步说明平台约束如何影响写作者的决策路径。",
      status: "modified"
    },
    {
      label: "方法说明",
      old: "",
      new: "此外，我们补充了样本筛选标准，以便交代方法边界。",
      status: "added"
    },
    {
      label: "结论用语",
      old: "研究结论具有广泛适用性。",
      new: "研究结论的适用性仍需结合样本类型与制度语境审慎判断。",
      status: "modified"
    },
    {
      label: "稳定片段",
      old: "作者对学科术语的最终判断仍由人完成。",
      new: "作者对学科术语的最终判断仍由人完成。",
      status: "unchanged"
    }
  ]
};

const state = {
  page: "auth",
  authTab: "login",
  hasCompletedOnboarding: false,
  onboardingStep: 1,
  selectedDiscipline: "社会科学",
  selectedStage: "结构优化",
  documents: clone(baseDocuments),
  currentDocId: "doc-1",
  selectedParagraphId: "p-2",
  selectedSuggestionId: "s-2",
  selectedStructureNodeId: "p-2",
  suggestions: clone(baseSuggestions),
  sidebarSelection: "home",
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
  toast: null
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
  return currentDoc().path || ["我的文档", "当前文稿"];
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
      title: "未命名文稿",
      discipline: state.selectedDiscipline,
      modified: "刚刚",
      suggestions: 3,
      path: ["我的文档", "新建文稿", "草稿"],
      summary: "等待第一次分析"
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
          <span class="field__label">姓名</span>
          <input data-model="auth-name" name="name" placeholder="输入你的姓名" value="${escapeHtml(state.authValues.name)}" />
        </label>
        <label class="field">
          <span class="field__label">邮箱</span>
          <input data-model="auth-email" name="email" type="email" placeholder="name@university.edu" value="${escapeHtml(state.authValues.email)}" />
        </label>
        <label class="field">
          <span class="field__label">密码</span>
          <input data-model="auth-password" name="password" type="password" placeholder="至少 8 位字符" value="${escapeHtml(state.authValues.password)}" />
        </label>
        <label class="field">
          <span class="field__label">确认密码</span>
          <input data-model="auth-confirm" name="confirmPassword" type="password" placeholder="再次输入密码" value="${escapeHtml(state.authValues.confirmPassword)}" />
        </label>
        <button class="button button--primary button--block" type="submit">创建账户并继续</button>
      </form>
    `;
  }

  return `
    <form class="form-stack" data-form="login">
      <label class="field">
        <span class="field__label">邮箱</span>
        <input data-model="auth-email" name="email" type="email" placeholder="name@university.edu" value="${escapeHtml(state.authValues.email)}" />
      </label>
      <label class="field">
        <span class="field__label">密码</span>
        <input data-model="auth-password" name="password" type="password" placeholder="输入你的密码" value="${escapeHtml(state.authValues.password)}" />
      </label>
      <div class="checkbox-row">
        <label><input type="checkbox" checked />记住我</label>
        <button class="inline-link" type="button">忘记密码</button>
      </div>
      <button class="button button--primary button--block" type="submit">登录 ScholarMind</button>
      <div class="toggle-meta">
        <strong>首次登录会进入能力边界设置</strong>
        <p>完成一次 Onboarding 后，再次登录将直接进入主页与历史文档。</p>
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
          <h1 class="page-title">让 AI 成为你的写作伙伴，而非黑箱</h1>
          <p>ScholarMind 只在结构、表达与逻辑层面给建议。它可以辅助你思考，但不会替你做学科判断。</p>
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
              ${icon("info")}AI 能力说明
            </button>
          </div>

          <div class="auth-card__header">
            <h2 class="section-title">登录 / 注册</h2>
            <p>顶部品牌区负责表达价值主张，右侧表单区负责把用户带入真实工作流。</p>
          </div>

          <div class="segmented" role="tablist" aria-label="Auth tabs">
            <button data-action="switch-auth-tab" data-tab="login" class="${state.authTab === "login" ? "is-active" : ""}" type="button">登录</button>
            <button data-action="switch-auth-tab" data-tab="register" class="${state.authTab === "register" ? "is-active" : ""}" type="button">注册</button>
          </div>

          <div class="auth-stack">
            ${renderAuthForm()}
            <div class="auth-sso">
              <div class="auth-divider">或使用机构账号登录</div>
              <button class="button button--secondary button--block" data-action="sso-login" type="button">
                ${icon("user")}使用机构 SSO 进入
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
          <h2 class="section-title">你主要写哪类学术文章？</h2>
          <p>选择一个主要学科领域，让建议标签、示例语言与边界提醒更接近你的真实写作环境。</p>
        </div>
        <div class="option-grid">
          ${disciplines
            .map(
              (item) => `
                <button class="option-card ${state.selectedDiscipline === item ? "is-selected" : ""}" data-action="select-discipline" data-value="${item}" type="button">
                  <strong>${item}</strong>
                  <span>以 ${item} 论文的常见结构和表达约束作为默认上下文。</span>
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
          <h2 class="section-title">你目前处于哪个写作阶段？</h2>
          <p>不同阶段需要不同的提示密度。越接近定稿，越需要保守、可解释、可复核的建议。</p>
        </div>
        <div class="option-grid">
          ${stages
            .map(
              (item) => `
                <button class="option-card ${state.selectedStage === item ? "is-selected" : ""}" data-action="select-stage" data-value="${item}" type="button">
                  <strong>${item}</strong>
                  <span>让 ScholarMind 在结构、措辞与建议置信度上采用对应策略。</span>
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
          <h2 class="section-title">在开始之前，请了解 AI 能做什么</h2>
          <p>这一页是 Track A 的核心声明。你看到的建议会始终区分“可辅助的任务”和“必须由作者负责的任务”。</p>
        </div>
        <div class="boundary-grid">
          <section class="boundary-card boundary-card--good">
            <h3>AI 可以帮你</h3>
            <ul>
              <li>建议段落结构</li>
              <li>提示逻辑断层</li>
              <li>改善表达流畅度</li>
              <li>标注措辞存疑处</li>
            </ul>
          </section>
          <section class="boundary-card boundary-card--limit">
            <h3>AI 不能替代你</h3>
            <ul>
              <li>判断学科专业知识正误</li>
              <li>核实引用来源</li>
              <li>做出最终修改决策</li>
              <li>理解特定领域术语偏好</li>
            </ul>
          </section>
        </div>
      </div>
    `;
  }

  return `
    <div class="onboarding-content">
      <div>
        <h2 class="section-title">设置完成</h2>
        <p>你已经确认写作领域、当前阶段以及 AI 的能力边界。下面是本次初始化摘要。</p>
      </div>
      <div class="summary-list">
        <div class="summary-item"><span>学科领域</span><span>${state.selectedDiscipline}</span></div>
        <div class="summary-item"><span>写作阶段</span><span>${state.selectedStage}</span></div>
        <div class="summary-item"><span>边界声明</span><span>已了解并确认</span></div>
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
            ${icon("info")}AI 能力说明
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
                      <strong>${["学科", "阶段", "边界", "完成"][step - 1]}</strong>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>

          ${renderOnboardingContent()}

          <div class="step-actions">
            <button class="button button--ghost" ${state.onboardingStep === 1 ? "disabled" : ""} data-action="onboarding-back" type="button">上一步</button>
            ${state.onboardingStep < 3 ? `<button class="button button--primary" data-action="onboarding-next" type="button">继续</button>` : ""}
            ${state.onboardingStep === 3 ? `<button class="button button--primary" data-action="onboarding-acknowledge" type="button">我已了解，继续</button>` : ""}
            ${state.onboardingStep === 4 ? `<button class="button button--primary" data-action="enter-home" type="button">进入 ScholarMind</button>` : ""}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSidebar() {
  const navItems = [
    { id: "home", label: "主页", icon: "home" },
    { id: "documents", label: "我的文档", icon: "file" },
    { id: "history", label: "历史记录", icon: "history" },
    { id: "settings", label: "设置", icon: "settings" }
  ];

  return `
    <aside class="sidebar">
      <div class="brand-lockup brand-lockup--small">
        <span class="logo-mark">${icon("spark")}</span>
        <span>ScholarMind</span>
      </div>

      <div class="sidebar__user">
        <div class="sidebar__user-meta">
          <img src="./img/avatar.png" class="avatar avatar--large" alt="林知遥" />
          <div>
            <strong>林知遥</strong>
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
          <strong>AI 能力说明</strong>
          <p>ScholarMind 只建议结构与表达，不具备学科专业判断能力。</p>
          <button class="button button--secondary button--block" data-action="open-limitations" type="button">查看系统局限</button>
        </div>
      </div>
    </aside>
  `;
}

function renderHomePage() {
  return `
    <section class="page workspace-layout">
      ${renderSidebar()}
      <main class="dashboard-main">
        <div class="dashboard-stack">
          <div class="boundary-banner">
            <div class="boundary-banner__label">
              ${icon("warning")}AI 仅建议结构与表达 · 不具备学科专业判断能力
            </div>
            <button class="inline-link" data-action="open-limitations" type="button">了解详情</button>
          </div>

          <section class="hero-card">
            <div>
              <span class="eyebrow">Quick start</span>
              <h1 class="page-title">开始一篇新的学术写作会话</h1>
              <p>你可以从空白文稿开始，也可以先粘贴一段文字，让 ScholarMind 先生成结构与表达层面的初步建议。</p>
            </div>
            <button class="button button--primary" data-action="create-doc" type="button">${icon("plus")}新建文档</button>
          </section>

          <div class="quick-grid">
            <section class="quick-card quick-card--cta">
              <div class="quick-card__body">
                <span class="eyebrow">Blank draft</span>
                <h2 class="section-title">新建文档</h2>
                <p>进入三栏编辑器，从章节导航、建议面板和版本历史开始完整写作流程。</p>
              </div>
              <button class="button button--secondary" data-action="create-doc" type="button">${icon("plus")}创建空白草稿</button>
            </section>

            <section class="quick-card">
              <div class="quick-card__body">
                <span class="eyebrow">Paste text</span>
                <h2 class="section-title">粘贴文本快捷入口</h2>
                <p>把你已经写好的引言、摘要或方法段先放进来，直接进入建议面板。</p>
              </div>
              <label class="field field--textarea paste-box">
                <textarea data-model="quick-paste" placeholder="粘贴一段你的学术写作内容，原型会带着这段文本进入编辑器。">${escapeHtml(state.quickPaste)}</textarea>
              </label>
              <button class="button button--primary" data-action="create-doc" type="button">${icon("paste")}导入并分析</button>
            </section>
          </div>

          <section class="recent-docs">
            <div class="recent-docs__header">
              <div>
                <span class="eyebrow">Recent documents</span>
                <h2 class="section-title">最近文档</h2>
              </div>
              <span class="pill">${state.documents.length} 份文稿</span>
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
                          <span>最后修改：${doc.modified}</span>
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
  return `
    <button class="editor-paragraph ${state.selectedParagraphId === paragraph.id ? "is-selected" : ""}" data-action="select-paragraph" data-paragraph-id="${paragraph.id}" data-severity="${paragraphSeverity(paragraph.id)}" type="button">
      <small>${paragraph.label}${related.length ? ` · ${related.length} 条待处理建议` : ""}</small>
      <p>${paragraph.text}</p>
    </button>
  `;
}

function renderSuggestionCard(suggestion) {
  const confidenceClass = suggestion.confidence === "questionable" ? "pill--warning" : "pill--blue";
  const confidenceLabel = suggestion.confidence === "questionable" ? "存疑" : "高可信";

  return `
    <article class="suggestion-card ${state.selectedSuggestionId === suggestion.id ? "is-selected" : ""}">
      <div class="suggestion-card__meta">
        <span class="pill ${confidenceClass}">${confidenceLabel}</span>
        <span class="tag">${suggestion.type}</span>
        <span class="pill">${suggestion.status === "pending" ? "待处理" : suggestion.status === "accepted" ? "已接受" : "已拒绝"}</span>
      </div>
      <div class="suggestion-card__body">
        <p>${suggestion.text}</p>
        ${suggestion.note ? `<small>${suggestion.note}</small>` : ""}
        ${suggestion.confidence === "questionable" && suggestion.status === "pending" ? `<button class="inline-link" data-action="show-misunderstanding" type="button">${icon("warning")}查看风险原因</button>` : ""}
      </div>
      ${suggestion.status === "pending" ? `
        <div class="suggestion-card__actions">
          <button class="button button--primary button--tiny" data-action="accept-suggestion" data-suggestion-id="${suggestion.id}" type="button">接受</button>
          <button class="button button--secondary button--tiny" data-action="modify-suggestion" data-suggestion-id="${suggestion.id}" type="button">修改</button>
          <button class="button button--ghost button--tiny" data-action="reject-suggestion" data-suggestion-id="${suggestion.id}" type="button">拒绝</button>
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
          <button data-action="toggle-right" type="button" title="展开建议面板">${icon("chevronLeft")}</button>
          <button class="${pending.some((item) => item.confidence === "questionable") ? "is-alert" : ""}" data-action="toggle-right" type="button" title="当前建议数量">${stats.pending}</button>
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
              <h3>建议面板</h3>
              <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}收起</button>
            </div>
            <div class="suggestion-panel__counts">
              <span class="pill">待处理 ${stats.pending}</span>
              <span class="pill pill--success">已接受 ${stats.accepted}</span>
              <span class="pill pill--danger">已拒绝 ${stats.rejected}</span>
            </div>
          </div>
          <div class="suggestion-scroll">
            <div class="panel-state panel-state--offline">
              <h4>当前处于离线模式，AI 建议暂停加载</h4>
              <p>以下为上次联网时缓存下来的建议，仅供参考。编辑器正文仍可继续修改，草稿会自动保存到本地。</p>
            </div>
            <div class="suggestion-list">${related.length ? related.map(renderSuggestionCard).join("") : `<div class="panel-empty"><p>当前段落暂无缓存建议。</p></div>`}</div>
          </div>
          <div class="suggestion-footer">
            <button class="button button--primary button--block" data-action="retry-connection" type="button">${icon("refresh")}${state.serviceStatus === "recovering" ? "正在重连…" : "重试连接"}</button>
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
              <h3>建议面板</h3>
              <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}收起</button>
            </div>
          </div>
          <div class="suggestion-scroll">
            <div class="panel-state panel-state--warning">
              <h4>${icon("warning")}AI 可能误解了该段内容</h4>
              <p>AI 对此段落的建议可信度较低，可能因学科术语或表达方式未被正确识别。你可以补充语境后重新分析，或忽略本段全部建议。</p>
              <form class="form-stack" data-form="context">
                <label class="field field--textarea">
                  <textarea data-model="context-draft" name="context" placeholder="例如：本段为质性研究方法描述，强调的是方法边界而非因果机制。">${escapeHtml(state.contextDraft)}</textarea>
                </label>
                <button class="button button--primary button--block" type="submit">补充语境并重新分析</button>
              </form>
              <button class="button button--secondary button--block" data-action="ignore-current-paragraph" type="button">忽略所有建议</button>
              <p class="muted">如果问题持续出现，可在设置中调整学科背景偏好。</p>
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
            <h3>建议面板</h3>
            <button class="button button--ghost button--tiny" data-action="toggle-right" type="button">${icon("chevronRight")}收起</button>
          </div>
          <div class="suggestion-panel__counts">
            <span class="pill">待处理 ${stats.pending}</span>
            <span class="pill pill--success">已接受 ${stats.accepted}</span>
            <span class="pill pill--danger">已拒绝 ${stats.rejected}</span>
          </div>
        </div>
        <div class="suggestion-scroll">
          ${pending.length
            ? pending.map(renderSuggestionCard).join("")
            : `
              <div class="panel-empty">
                <p>当前段落没有待处理建议。你可以继续编辑，或重新分析全文获取新的结构提示。</p>
              </div>
            `}
        </div>
        <div class="suggestion-footer">
          <button class="button button--ghost button--block" data-action="reject-all" type="button">一键拒绝全部</button>
          <button class="button button--secondary button--block" data-action="simulate-offline" type="button">重新分析</button>
        </div>
      </div>
    </aside>
  `;
}

function renderUserMenu() {
  return `
    <div class="editor-user-menu">
      <button class="button button--ghost button--compact" data-action="toggle-user-menu" type="button">${icon("user")}林知遥</button>
      ${state.userMenuOpen
        ? `
          <div class="user-menu__panel">
            <button class="user-menu__item" data-action="open-limitations" type="button">${icon("info")}AI 能力说明</button>
            <button class="user-menu__item" data-action="logout" type="button">${icon("logout")}退出登录</button>
          </div>
        `
        : ""}
    </div>
  `;
}

function renderEditorPage() {
  const doc = currentDoc();
  const currentSection = findSectionByParagraph(state.selectedParagraphId) || editorSections[0];
  const pendingCount = suggestionStats().pending;

  return `
    <section class="page editor-page">
      <header class="editor-topbar">
        <div class="editor-title-block">
          ${state.titleEditing
            ? `
              <form class="title-edit" data-form="rename-title">
                <input data-model="title-draft" name="title" value="${escapeHtml(state.titleDraft)}" />
                <button class="button button--primary button--compact" type="submit">${icon("check")}保存</button>
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
          ${icon("warning")}AI 只建议结构与表达，不替代学科判断
          <button class="inline-link" data-action="open-limitations" type="button">了解详情</button>
        </div>

        <div class="editor-actions">
          <button class="button button--ghost button--compact" data-action="go-home" type="button">${icon("home")}主页</button>
          <button class="button button--secondary button--compact" data-action="open-versions" type="button">${icon("compare")}版本历史</button>
          <button class="button button--secondary button--compact" data-action="export-doc" type="button">${icon("export")}导出</button>
          ${renderUserMenu()}
        </div>
      </header>

      ${state.serviceStatus === "offline"
        ? `
          <div class="editor-banner editor-banner--offline">
            <strong>${icon("warning")}AI 服务暂时不可用，正在尝试重连…</strong>
            <p>草稿已自动保存于本地 · ${state.localSaveTime || formattedTime()}</p>
            <button class="button button--secondary button--tiny" data-action="retry-connection" type="button">重试连接</button>
          </div>
        `
        : ""}

      ${state.serviceStatus === "recovering"
        ? `
          <div class="editor-banner editor-banner--recovering">
            <strong>${icon("refresh")}正在重连 AI 服务…</strong>
            <p>编辑器正文不受影响，你可以继续修改当前段落。</p>
          </div>
        `
        : ""}

      ${state.serviceStatus === "recovered"
        ? `
          <div class="editor-banner editor-banner--recovered">
            <strong>${icon("check")}AI 服务已恢复</strong>
            <p>建议面板重新可用，离线横幅会在数秒后自动消失。</p>
          </div>
        `
        : ""}

      <div class="editor-shell ${state.leftCollapsed ? "is-left-collapsed" : ""} ${state.rightCollapsed ? "is-right-collapsed" : ""}">
        <aside class="editor-pane editor-pane--rail">
          ${state.leftCollapsed
            ? `
              <div class="collapsed-rail">
                <button data-action="toggle-left" type="button" title="展开左栏">${icon("chevronRight")}</button>
                <button data-action="open-structure" type="button" title="查看结构图">${icon("branch")}</button>
              </div>
            `
            : `
              <div class="editor-pane__header">
                <h3>章节导航</h3>
                <button class="button button--ghost button--tiny" data-action="toggle-left" type="button">${icon("chevronLeft")}收起</button>
              </div>
              <div class="editor-pane__body">
                <div class="section-list">
                  ${editorSections
                    .map(
                      (section) => `
                        <button class="section-button ${currentSection.id === section.id ? "is-active" : ""}" data-action="select-section" data-section-id="${section.id}" type="button">
                          <strong>${section.anchor}</strong>
                          <span>${section.paragraphs.length} 个段落</span>
                        </button>
                      `
                    )
                    .join("")}
                </div>
                <div>
                  <div class="split-row">
                    <h3>当前章节逻辑树</h3>
                    <span class="pill pill--warning">弱问题段落</span>
                  </div>
                  ${renderMiniLogicTree()}
                </div>
                <button class="button button--secondary button--block" data-action="open-structure" type="button">${icon("branch")}查看结构图</button>
              </div>
            `}
        </aside>

        <main class="editor-pane editor-main">
          <div class="editor-meta">
            <div class="editor-meta__title">
              <span class="eyebrow">Editing</span>
              <p>当前文稿采用 1.8 行距的宽松排版，建议与段落状态通过左侧彩色竖条表示。</p>
            </div>
            <div class="editor-stat-row">
              <span class="pill">字数 2,486</span>
              <span class="pill pill--blue">待处理建议 ${pendingCount}</span>
              <span class="pill">${doc.discipline}</span>
            </div>
          </div>

          <div class="editor-document">
            ${editorSections
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
              <button class="button button--secondary" data-action="analyze-paragraph" type="button">${icon("spark")}分析当前段落</button>
              <button class="button button--primary" data-action="simulate-offline" type="button">${icon("refresh")}分析全文</button>
            </div>
            <div class="editor-toolbar__group">
              <button class="button button--ghost" data-action="open-limitations" type="button">${icon("info")}查看系统局限</button>
            </div>
          </div>
        </main>

        ${renderSuggestionsPane()}
      </div>
    </section>
  `;
}

function renderLimitationsOverlay() {
  return `
    <div class="overlay" data-backdrop="true">
      <div class="overlay__card">
        <div class="overlay__header">
          <div>
            <h2>ScholarMind AI 的能力边界</h2>
            <p>所有建议都只服务于结构与表达层面的辅助，最终写作决策始终由作者负责。</p>
          </div>
          <button class="overlay__close" data-action="close-overlay" type="button">${icon("close")}</button>
        </div>

        <div class="capability-grid">
          <section class="capability-column">
            <h3>${icon("check")}AI 能够做到</h3>
            <ul>${capabilityCan.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
          <section class="capability-column">
            <h3>${icon("warning")}AI 无法做到</h3>
            <ul>${capabilityCannot.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
        </div>

        <div class="capability-note">AI 给出的所有建议仅供参考，最终的写作决策由你决定。存疑标签的建议请结合专业判断谨慎采纳。</div>

        <div class="step-actions">
          <div></div>
          <button class="button button--primary" data-action="close-overlay" type="button">我知道了</button>
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
          <h2>文章逻辑结构图</h2>
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
                              <span>${node.status === "weak" ? "逻辑衔接弱" : node.status === "missing" ? "推荐段落缺失" : "结构正常"}</span>
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
            <h3>${state.selectedStructureNodeId === "missing-limitations" ? "缺失节点建议" : getParagraph(state.selectedStructureNodeId).label}</h3>
            <p>${detail}</p>
            ${state.selectedStructureNodeId !== "missing-limitations" ? `<button class="button button--secondary button--block" data-action="jump-to-selected-node" type="button">在编辑器中高亮对应段落</button>` : ""}
          </aside>
        </div>

        <div class="fullscreen-modal__footer">
          <p>问题数量汇总：橙色 ${weakCount} 处衔接弱 / 红色 ${missingCount} 处缺失</p>
          <button class="button button--primary" data-action="close-overlay" type="button">关闭，返回编辑</button>
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
          <h2>版本历史与对比</h2>
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
                    <small>建议角标 ${version.count}</small>
                  </button>
                `
              )
              .join("")}
          </aside>

          <section class="version-diff">
            <div class="version-diff__toolbar">
              <div class="split-row">
                <label class="field">
                  <span class="field__label">A 版本</span>
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
                  <span class="field__label">B 版本</span>
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
                <button class="button button--ghost button--compact" data-action="prev-diff" type="button">${icon("chevronLeft")}上一处</button>
                <button class="button button--ghost button--compact" data-action="next-diff" type="button">下一处${icon("chevronRight")}</button>
              </div>
            </div>

            <div class="diff-grid">
              <div class="diff-column">
                <h3>旧版</h3>
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
                <h3>新版</h3>
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
          <button class="button button--danger" data-action="request-restore-version" type="button">恢复至此版本</button>
          <button class="button button--secondary" data-action="close-overlay" type="button">关闭</button>
        </div>

        ${state.restoreConfirm
          ? `
            <div class="confirm-sheet">
              <div class="confirm-sheet__card">
                <h3>确认恢复历史版本？</h3>
                <p>恢复后将返回主编辑器，并以当前选中的历史版本内容替换现有正文。</p>
                <div class="confirm-sheet__actions">
                  <button class="button button--secondary" data-action="cancel-restore" type="button">取消</button>
                  <button class="button button--danger" data-action="confirm-restore" type="button">确认恢复</button>
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
  updateCurrentDoc({ title: nextTitle, modified: "刚刚" });
  state.titleEditing = false;
  showToast("文档标题已更新。", "success");
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
      if (state.sidebarSelection === "settings") {
        showToast("设置页在本轮原型中折叠为能力边界说明入口。", "warning");
      }
      render();
      return;
    case "create-doc":
      ensureDraftDocument();
      state.currentDocId = "doc-new";
      updateCurrentDoc({
        title: state.quickPaste.trim() ? "导入文稿草稿" : "未命名文稿",
        discipline: state.selectedDiscipline,
        modified: "刚刚",
        suggestions: 3,
        path: ["我的文档", "新建文稿", "草稿"]
      });
      state.titleDraft = currentDocTitle();
      selectParagraph("p-1");
      state.serviceStatus = "online";
      state.panelMode = "normal";
      state.leftCollapsed = false;
      state.rightCollapsed = false;
      setRoute("editor");
      showToast(state.quickPaste.trim() ? "已导入文本并进入编辑器。" : "已创建空白草稿。", "success");
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
      const section = editorSections.find((item) => item.id === actionElement.dataset.sectionId);
      if (section) {
        selectParagraph(section.paragraphs[0].id);
        state.panelMode = "normal";
        render();
      }
      return;
    }
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
      showToast("建议已接受，并记录进版本历史。", "success");
      render();
      return;
    case "reject-suggestion":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.id === actionElement.dataset.suggestionId ? { ...suggestion, status: "rejected" } : suggestion
      );
      state.selectedSuggestionId = firstSuggestionForParagraph(state.selectedParagraphId)?.id || null;
      showToast("建议已拒绝。", "warning");
      render();
      return;
    case "modify-suggestion":
      state.selectedSuggestionId = actionElement.dataset.suggestionId;
      showToast("已定位到对应段落，请在正文中手动修改。", "success");
      render();
      return;
    case "reject-all":
      state.suggestions = state.suggestions.map((suggestion) =>
        suggestion.paragraphId === state.selectedParagraphId && suggestion.status === "pending"
          ? { ...suggestion, status: "rejected" }
          : suggestion
      );
      state.selectedSuggestionId = null;
      showToast("当前段落的待处理建议已全部拒绝。", "warning");
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
      showToast("本段所有建议已标记为已拒绝。", "warning");
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
        showToast("当前段落分析完成，未发现新的高风险异常。", "success");
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
      updateCurrentDoc({ modified: "刚刚" });
      state.serviceStatus = "online";
      state.panelMode = "normal";
      showToast("已恢复到所选历史版本。", "success");
      render();
      return;
    case "start-title-edit":
      state.titleEditing = true;
      render();
      return;
    case "export-doc":
      showToast("导出任务已加入队列。", "success");
      return;
    case "toggle-user-menu":
      state.userMenuOpen = !state.userMenuOpen;
      render();
      return;
    case "go-home":
      setRoute("home");
      return;
    case "logout":
      state.overlay = null;
      state.userMenuOpen = false;
      setRoute("auth");
      showToast("你已退出当前会话。", "warning");
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
      showToast("初始化已完成，进入主页。", "success");
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
        showToast("请先补充必要语境。", "warning");
        return;
      }
      state.suggestions = state.suggestions.map((suggestion) => {
        if (suggestion.paragraphId === state.selectedParagraphId && suggestion.confidence === "questionable") {
          return {
            ...suggestion,
            confidence: "high",
            note: `已结合补充语境重新分析：${state.contextDraft.trim()}`
          };
        }
        return suggestion;
      });
      state.contextDraft = "";
      state.panelMode = "normal";
      showToast("已根据补充语境刷新建议。", "success");
      render();
      return;
    case "rename-title":
      persistTitleDraft();
      return;
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
      ? "ScholarMind · 主编辑器"
      : state.page === "home"
        ? "ScholarMind · 主页"
        : state.page === "onboarding"
          ? "ScholarMind · Onboarding"
          : "ScholarMind · 登录 / 注册";

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

render();
