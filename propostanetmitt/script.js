const CONFIG = {
  cliente: {
    nome: "NETMIT Campo Bom",
    area: "1.200 m²",
    andares: 2,
    metaAlunos: 1000,
    periodoMetaMeses: 6,
    previsaoInauguracao: "Segunda semana de setembro",
  },

  consultores: {
    italovieira: {
      nome: "Ítalo Vieira",
      cargo: "Fundador e gestor do CT Ítalo Vieira",
      experiencia: "15 anos de experiência",
      foto: "",
    },
    lazarofernandes: {
      nome: "Lázaro Fernandes",
      cargo: "COO e gestor operacional do CT Ítalo Vieira",
      experiencia: "5 anos de experiência",
      foto: "",
    },
  },

  contato: {
    whatsapp: "5551997801697",
    telefone: "(51) 99780-1697",
    email: "",
    instagram: "@ctitalovieira",
    instagramUrl: "https://www.instagram.com/ctitalovieira",
  },

  comercial: {
    validadeProposta: "PREENCHER ANTES DA PUBLICAÇÃO",
    formaPagamento: "PREENCHER ANTES DA PUBLICAÇÃO",
    percentualEntrada: "PREENCHER ANTES DA PUBLICAÇÃO",
    parcelasImplementacao: "PREENCHER ANTES DA PUBLICAÇÃO",
    condicaoImplementacao: "PREENCHER ANTES DA PUBLICAÇÃO",
    inicioMensalidade: "PREENCHER ANTES DA PUBLICAÇÃO",
    vencimento: "PREENCHER ANTES DA PUBLICAÇÃO",
  },

  pacotes: {
    full: {
      implementacao: 49900,
      mensalidade: 9900,
      mesesMinimos: 6,
    },
    media: {
      implementacao: 29900,
      mensalidade: 5900,
      mesesMinimos: 6,
    },
    hyrox: {
      implementacao: 14900,
      mensalidade: 3500,
      mesesMinimos: 6,
    },
  },

  mensagens: {
    full: "Olá, gostaria de conversar sobre a implantação Full da nova NETMIT Campo Bom.",
    media: "Olá, gostaria de entender melhor as diferenças entre a entrega Média e a Full.",
    hyrox: "Olá, gostaria de conversar sobre a implantação do HYROX e funcional.",
  },

  escopo: {
    fullImplementation: [
      "Até quatro visitas durante a obra",
      "Uma reunião estratégica por semana durante a implantação",
      "Reuniões com proprietários, gestores e responsáveis pela obra",
      "Até quatro treinamentos de equipe, com até três horas cada",
      "Participação em até 12 entrevistas para funções estratégicas",
      "Apoio na escolha do gestor, líder comercial e liderança técnica",
      "Criação ou adaptação de até 15 processos",
      "Funil comercial completo e configuração inicial das etapas do CRM",
      "Um dashboard gerencial e um dashboard comercial",
      "Plano de pré-venda e checklist de inauguração",
      "Até dois dias presenciais na inauguração",
      "Suporte pelo WhatsApp em dias úteis, com retorno em até um dia útil",
    ],
    fullMonthly: [
      "Quatro reuniões estratégicas por mês",
      "Uma reunião mensal de indicadores",
      "Um relatório e um plano de ação mensal",
      "Um treinamento mensal de até duas horas",
      "Acompanhamento do CRM, vendas e retenção",
      "Acompanhamento dos líderes e revisão dos processos",
      "Suporte pelo WhatsApp, com retorno em até um dia útil",
    ],
    mediumImplementation: [
      "Uma reunião de diagnóstico e uma análise geral do layout",
      "Uma reunião de validação do espaço",
      "Quatro reuniões estratégicas durante a implantação",
      "Uma visita presencial antes da inauguração",
      "Até dois treinamentos de até três horas",
      "Apoio na seleção de até três cargos estratégicos",
      "Criação ou adaptação de até oito processos essenciais",
      "Funil comercial e configuração inicial de CRM básicos",
      "Dashboard simplificado, plano de pré-venda e checklist",
      "Suporte remoto na primeira semana, com retorno em até dois dias úteis",
    ],
    mediumMonthly: [
      "Duas reuniões estratégicas por mês",
      "Uma análise e um plano de ação mensal",
      "Revisão dos processos prioritários e acompanhamento básico do CRM",
      "Suporte aos líderes",
      "Um treinamento a cada dois meses, com até duas horas",
      "Suporte em dias úteis, com retorno em até dois dias úteis",
    ],
    hyroxImplementation: [
      "Uma análise presencial ou remota",
      "Desenho da pista, estações, fluxo e capacidade",
      "Lista de equipamentos essenciais e complementares",
      "Grade inicial e planejamento das primeiras 12 semanas",
      "Modelos de aula, progressões, regressões e segurança",
      "Até dois treinamentos de até três horas",
      "Uma simulação prática e processo de aula experimental",
      "Plano de lançamento, evento ou simulado",
      "Dashboard da modalidade e suporte na primeira semana",
    ],
    hyroxMonthly: [
      "Uma reunião mensal e planejamento do próximo ciclo",
      "Análise da ocupação e revisão da grade",
      "Suporte aos professores e ajustes de metodologia",
      "Indicadores e planejamento de ação trimestral",
      "Suporte em dias úteis, com retorno em até dois dias úteis",
    ],
  },
};

const PLACEHOLDER = "PREENCHER ANTES DA PUBLICAÇÃO";

function getConfigValue(path) {
  return path.split(".").reduce((value, key) => value?.[key], CONFIG);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function packageTotal(packageKey) {
  const packageData = CONFIG.pacotes[packageKey];
  return packageData.implementacao + packageData.mensalidade * packageData.mesesMinimos;
}

function whatsappUrl(messageKey) {
  const number = CONFIG.contato.whatsapp.replace(/\D/g, "");
  const message = CONFIG.mensagens[messageKey] || CONFIG.mensagens.full;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function populateConfigValues() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const path = element.dataset.config;
    const value = getConfigValue(path);
    if (typeof value === "number") {
      element.textContent = value.toLocaleString("pt-BR");
    } else if (value != null) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-package-value]").forEach((element) => {
    const [packageKey, field] = element.dataset.packageValue.split(".");
    const value = CONFIG.pacotes[packageKey]?.[field];
    element.textContent =
      field === "mesesMinimos" ? String(value) : formatCurrency(value);
  });

  document.querySelectorAll("[data-package-total]").forEach((element) => {
    element.textContent = formatCurrency(packageTotal(element.dataset.packageTotal));
  });

  document.querySelectorAll("[data-optional-config]").forEach((element) => {
    const value = getConfigValue(element.dataset.optionalConfig);
    element.textContent = value && value !== PLACEHOLDER ? value : "";
    if (!element.textContent) element.closest("article")?.setAttribute("hidden", "");
  });
}

function populateScopes() {
  document.querySelectorAll("[data-scope]").forEach((list) => {
    const items = CONFIG.escopo[list.dataset.scope] || [];
    list.replaceChildren(
      ...items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      }),
    );
  });
}

function populateContacts() {
  const contacts = {
    telefone: {
      value: CONFIG.contato.telefone,
      href: `tel:${CONFIG.contato.whatsapp.replace(/\D/g, "")}`,
    },
    whatsapp: {
      value: CONFIG.contato.telefone,
      href: whatsappUrl("full"),
    },
    email: {
      value: CONFIG.contato.email,
      href: `mailto:${CONFIG.contato.email}`,
    },
    instagram: {
      value: CONFIG.contato.instagram,
      href: CONFIG.contato.instagramUrl,
    },
  };

  Object.entries(contacts).forEach(([key, contact]) => {
    const row = document.querySelector(`[data-contact-row="${key}"]`);
    const link = document.querySelector(`[data-contact="${key}"]`);
    if (!row || !link) return;
    if (!contact.value || contact.value === PLACEHOLDER) {
      row.hidden = true;
      return;
    }
    link.textContent = contact.value;
    link.href = contact.href;
    if (key === "instagram" || key === "whatsapp") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.whatsapp);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".topbar nav");
  if (!button || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  };

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupRecommendation() {
  const questions = document.querySelector(".questions");
  const result = document.querySelector(".recommendation");
  if (!questions || !result) return;

  const title = result.querySelector("b");
  const explanation = result.querySelector("p");
  const action = result.querySelector("a");

  const update = () => {
    const data = Object.fromEntries(
      [...questions.querySelectorAll('input[type="checkbox"]')].map((input) => [
        input.name,
        input.checked,
      ]),
    );
    const focus = questions.querySelector('input[name="foco"]:checked')?.value;

    let packageKey = "full";
    let label = "Full";
    let reason =
      "O projeto combina obra, equipe, comercial, várias modalidades, inauguração e seis meses de consolidação.";

    if (focus === "hyrox") {
      packageKey = "hyrox";
      label = "Inicial HYROX";
      reason =
        "Esta entrega só é indicada quando o objetivo está exclusivamente limitado ao HYROX e funcional.";
    } else {
      const needsFull =
        data.obra ||
        data.estrutura ||
        data.zero ||
        data.modalidades ||
        data.inauguracao ||
        data.seisMeses;
      const readyForMedium = data.gestor && data.equipePronta && !needsFull;

      if (readyForMedium) {
        packageKey = "media";
        label = "Média";
        reason =
          "A entrega Média pode ser considerada porque já existe gestor experiente, equipe executora e não há necessidade de acompanhar obra e implantação completa.";
      }
    }

    const resultClass = packageKey === "media" ? "medium" : packageKey;
    result.classList.remove("full", "medium", "media", "hyrox");
    result.classList.add(resultClass);
    title.textContent = label;
    explanation.textContent = `${reason} O pacote final será confirmado em uma reunião de diagnóstico.`;
    action.dataset.whatsapp = packageKey;
    action.href = whatsappUrl(packageKey);
    action.textContent =
      packageKey === "full"
        ? "Conversar sobre o Full"
        : packageKey === "media"
          ? "Entender a entrega Média"
          : "Conversar sobre o HYROX";
  };

  questions.addEventListener("change", update);
  update();
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  elements.forEach((element) => observer.observe(element));
}

function setupScrollControls() {
  const backTop = document.querySelector(".back-top");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".topbar nav a")];

  const update = () => {
    backTop?.classList.toggle("show", window.scrollY > 700);
    const current = sections
      .filter((section) => section.getBoundingClientRect().top <= 120)
      .at(-1)?.id;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateConfigValues();
  populateScopes();
  populateContacts();
  setupMenu();
  setupRecommendation();
  setupReveal();
  setupScrollControls();
});
