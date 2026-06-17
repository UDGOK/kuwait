"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Arabic (MSA) translations keyed by the exact English string.
// Any key not present falls back to English, so rendering is always safe.
export const AR = {
  // nav / chrome
  "Contact": "تواصل معنا",
  "Home": "الرئيسية",

  // hero
  "The systems behind ": "الأنظمة التي تقف خلف ",
  "Kuwait's flagship build.": "مشروع الكويت الرائد.",
  "UDGOK delivers the buildings, power, lighting, and mission-critical systems across the program's landmark projects — designed, powered, lit, secured, and sourced.":
    "تقدّم UDGOK المباني والطاقة والإضاءة والأنظمة الحيوية في المشاريع الكبرى للبرنامج — تصميماً، وتزويداً بالطاقة، وإضاءةً، وتأميناً، وتوريداً.",
  "Scroll": "مرّر للأسفل",
  "Capability pillars": "ركائز القدرات",
  "Flagship projects": "مشاريع رئيسية",
  "Named value": "قيمة معلنة",
  "Named project value": "قيمة المشاريع المعلنة",

  // statement
  "The brief": "الموجز",
  "Kuwait is building at national scale.": "الكويت تبني على مستوى وطني.",
  " UDGOK delivers the facility and systems scope inside it — ": " وتقدّم UDGOK نطاق المرافق والأنظمة داخله — ",
  "designed, powered, lit, secured, and sourced.": "تصميماً، وتزويداً بالطاقة، وإضاءةً، وتأميناً، وتوريداً.",

  // pillars section
  "Services we provide": "الخدمات التي نقدّمها",
  "Six pillars. One accountable delivery partner.": "ست ركائز. شريك تنفيذ واحد مسؤول.",
  "A complete capability set across the program — from healthcare design-build to network-powered lighting and mission-critical infrastructure.":
    "منظومة قدرات متكاملة عبر البرنامج — من التصميم والبناء للمنشآت الصحية إلى الإضاءة المدعومة بالشبكة والبنية التحتية الحيوية.",
  "New": "جديد",

  // pillar titles
  "Construction & Design-Build": "الإنشاء والتصميم والبناء",
  "Energy & Power": "الطاقة والكهرباء",
  "Lighting Systems": "أنظمة الإضاءة",
  "Mission-Critical Infrastructure": "البنية التحتية الحيوية",
  "Security Systems": "أنظمة الأمن",
  "Sourcing & Delivery": "التوريد والتسليم",

  // pillar labels (bold)
  "Healthcare": "الرعاية الصحية", "Commercial": "التجاري", "Industrial": "الصناعي",
  "Preconstruction": "ما قبل الإنشاء", "Commissioning": "التشغيل والتسليم",
  "Solar": "الطاقة الشمسية", "Storage": "التخزين", "EV Charging": "شحن المركبات الكهربائية",
  "Decorative": "الزخرفية", "Controls": "أنظمة التحكم",
  "AI data centers": "مراكز بيانات الذكاء الاصطناعي", "Resilience": "الموثوقية",
  "Access": "التحكم بالدخول", "Perimeter": "الحدود المحيطة",
  "Sourcing": "التوريد", "Build": "التنفيذ",

  // pillar descriptions
  "— medical, dental, surgery centers, eye clinics": "— مستشفيات وعيادات أسنان ومراكز جراحة وعيون",
  "— retail, restaurant, office, tenant improvement": "— تجزئة ومطاعم ومكاتب وتجهيز المستأجرين",
  "— warehouses, cold storage, manufacturing": "— مستودعات وتخزين مبرّد وتصنيع",
  "— budgeting, planning, scheduling": "— الموازنة والتخطيط والجدولة",
  "— quality assurance and handover": "— ضمان الجودة والتسليم",
  "— Virtual Design & Construction": "— التصميم والبناء الافتراضي",
  "— on-site solar generation (with solar-tec)": "— توليد شمسي بالموقع (مع solar-tec)",
  "— lithium-ion battery systems for backup power and peak shaving (with z1power)": "— أنظمة بطاريات ليثيوم للطاقة الاحتياطية وتقليل الأحمال (مع z1power)",
  "— smart AC & DC fast charging (with EVBOLT)": "— شحن ذكي سريع للتيار المتردد والمستمر (مع EVBOLT)",
  "— interior, exterior, and architectural fixtures": "— تجهيزات داخلية وخارجية ومعمارية",
  "— Power-over-Ethernet, network-powered smart lighting": "— إضاءة ذكية مدعومة بالشبكة عبر الإيثرنت",
  "— chandeliers, pendants, sconces, feature lighting": "— ثريات ومعلّقات وإضاءات جدارية ومميّزة",
  "— dimming and building-management integration": "— التعتيم والتكامل مع إدارة المباني",
  "— design & execution (NVIDIA, Cerebras)": "— التصميم والتنفيذ (NVIDIA، Cerebras)",
  "— UPS, redundancy, power and cooling": "— أنظمة عدم انقطاع وتكرار وطاقة وتبريد",
  "— access control system design and installation": "— تصميم وتركيب أنظمة التحكم بالدخول",
  "— site and perimeter security integration": "— تكامل أمن الموقع والمحيط",
  "— construction materials and equipment": "— مواد ومعدات البناء",
  "— full-scope construction services": "— خدمات إنشاء متكاملة",

  // program
  "Where we fit — Kuwait program": "أين ننسجم — برنامج الكويت",
  "Mapped to the flagship projects.": "مرتبطون بالمشاريع الرئيسية.",
  "UDGOK delivers the building, systems, and sourcing packages inside the program's landmark developments. Select a project to see the scope.":
    "تقدّم UDGOK حِزم المباني والأنظمة والتوريد داخل المشاريع الكبرى للبرنامج. اختر مشروعاً لعرض النطاق.",
  "named value across the ": "قيمة معلنة في ",
  "new airport": "المطار الجديد",
  " and ": " و",
  "Mubarak Al-Kabir port": "ميناء مبارك الكبير",
  " alone — two of five flagship projects UDGOK is positioned to serve.": " وحدهما — مشروعان من خمسة مشاريع رئيسية UDGOK مهيّأة لخدمتها.",
  "Scope": "النطاق",
  "New housing cities": "مدن سكنية جديدة",
  "Labor city": "مدينة العمّال",
  "New airport": "المطار الجديد",
  "Data & telecom infrastructure": "البنية التحتية للبيانات والاتصالات",
  "Multi-site": "مواقع متعددة", "National": "وطني",
  // chips
  "Hospitals & clinics": "مستشفيات وعيادات",
  "Schools, retail & community buildings": "مدارس ومرافق تجزئة ومبانٍ مجتمعية",
  "Interior & exterior LED lighting": "إضاءة LED داخلية وخارجية",
  "On-site solar & battery power": "طاقة شمسية وبطاريات بالموقع",
  "EV charging stations": "محطات شحن المركبات الكهربائية",
  "Access control & security": "التحكم بالدخول والأمن",
  "Materials & equipment sourcing": "توريد المواد والمعدات",
  "Worker clinics": "عيادات العمّال",
  "Dining & retail / service buildings": "مبانٍ للمطاعم والتجزئة والخدمات",
  "Cold storage & food facilities": "تخزين مبرّد ومرافق غذائية",
  "Interior & area lighting": "إضاءة داخلية ومحيطية",
  "Backup power (solar + lithium-ion)": "طاقة احتياطية (شمسية + ليثيوم)",
  "Full sourcing & delivery": "توريد وتسليم متكامل",
  "Terminal commercial fit-out & tenant improvement": "تجهيز تجاري للمبنى وتحسينات المستأجرين",
  "Architectural, decorative & PoE lighting": "إضاءة معمارية وزخرفية ومدعومة بالشبكة",
  "On-site data center & equipment rooms": "مركز بيانات وغرف معدات بالموقع",
  "Access control & security systems": "أنظمة التحكم بالدخول والأمن",
  "Backup power & energy storage": "طاقة احتياطية وتخزين",
  "EV charging plaza": "ساحة شحن للمركبات الكهربائية",
  "Cargo & catering cold storage": "تخزين مبرّد للشحن والتموين",
  "Warehouses, cold storage & industrial buildings": "مستودعات وتخزين مبرّد ومبانٍ صناعية",
  "High-mast, area & flood lighting": "إضاءة الصواري العالية والمناطق والكاشفات",
  "Access control & perimeter security": "التحكم بالدخول وأمن المحيط",
  "Power & energy storage": "طاقة وتخزين",
  "Fleet EV charging": "شحن أساطيل المركبات الكهربائية",
  "AI / HPC data centers": "مراكز بيانات الذكاء الاصطناعي والحوسبة الفائقة",
  "Data center design & build": "تصميم وبناء مراكز البيانات",
  "PoE network-powered lighting": "إضاءة مدعومة بشبكة PoE",
  "Physical access control": "التحكم بالدخول المادي",
  "Supporting power & backup systems": "أنظمة طاقة ودعم احتياطية",

  // AI section
  "AI infrastructure — design & execution": "بنية الذكاء الاصطناعي — التصميم والتنفيذ",
  "Built for the ": "مبنية من أجل ",
  "AI era.": "عصر الذكاء الاصطناعي.",
  "UDGOK designs and executes AI and high-performance data centers end to end — white space, high-density power, advanced cooling, and network fabric — engineered for the most demanding accelerated-compute platforms, and delivered complete with our dedicated partners.":
    "تُصمّم UDGOK وتنفّذ مراكز بيانات الذكاء الاصطناعي والحوسبة عالية الأداء من البداية إلى النهاية — المساحات والطاقة عالية الكثافة والتبريد المتقدّم وبنية الشبكة — مهندَسة لأكثر منصّات الحوسبة المتسارعة تطلّباً، وتُسلَّم متكاملة مع شركائنا المتخصّصين.",
  "Designed for": "مصمّمة لـ",
  "GPU compute clusters": "عناقيد حوسبة الرسوميات",
  "wafer-scale AI systems": "أنظمة ذكاء اصطناعي بمقياس الرقاقة",
  "Your dedicated stack": "منظومتك المخصّصة",
  "built with our partners": "تُبنى مع شركائنا",
  "Accelerated compute halls": "قاعات الحوسبة المتسارعة",
  "High-density GPU and wafer-scale deployments — DGX / HGX-class clusters and Cerebras CS systems.": "عمليات نشر عالية الكثافة للرسوميات وبمقياس الرقاقة — عناقيد من فئة DGX / HGX وأنظمة Cerebras CS.",
  "High-density power": "طاقة عالية الكثافة",
  "Busway distribution, UPS, and N+1 redundancy engineered for AI rack densities.": "توزيع عبر القضبان وأنظمة عدم انقطاع وتكرار N+1 مهندَسة لكثافات خزائن الذكاء الاصطناعي.",
  "Advanced cooling": "تبريد متقدّم",
  "Direct-to-chip and liquid cooling, rear-door heat exchangers, and thermal management.": "تبريد مباشر للرقاقة وتبريد سائل ومبادلات حرارية خلفية وإدارة حرارية.",
  "Low-latency fabric": "شبكة منخفضة الكمون",
  "High-bandwidth network and interconnect design for training and inference at scale.": "تصميم شبكة وربط عالي النطاق للتدريب والاستدلال على نطاق واسع.",
  "Design-build delivery": "تسليم بالتصميم والبناء",
  "Site, structure, MEP and fit-out — executed end to end and commissioned for uptime.": "الموقع والإنشاء والأنظمة الكهروميكانيكية والتجهيز — تُنفّذ بالكامل وتُشغَّل لضمان الجاهزية.",
  "Delivered with partners": "تُسلَّم مع شركائنا",
  "We design and deliver the complete facility with our specialist engineering partners.": "نصمّم ونسلّم المنشأة المتكاملة مع شركائنا الهندسيين المتخصّصين.",

  // lighting partners
  "Lighting — delivered with our partners": "الإضاءة — تُنفَّذ مع شركائنا",
  "From hotel lobby to data hall, lit by specialists.": "من بهو الفندق إلى قاعة البيانات، إضاءة بأيدي المتخصّصين.",
  "UDGOK's lighting scope is delivered with two established partners — spanning decorative hospitality fixtures to network-powered smart lighting.":
    "يُنفَّذ نطاق الإضاءة لدى UDGOK مع شريكين راسخين — من التجهيزات الزخرفية للضيافة إلى الإضاءة الذكية المدعومة بالشبكة.",
  "Partner 01 · Estelle's Group": "الشريك 01 · مجموعة Estelle's",
  "Our hospitality & multi-family lighting partner — certified fixtures, mirrors, doors and smart energy, delivered across North America and the Gulf.":
    "شريكنا في إضاءة الضيافة والوحدات السكنية — تجهيزات ومرايا وأبواب وطاقة ذكية معتمدة، تُسلَّم عبر أمريكا الشمالية والخليج.",
  "IHG-certified": "معتمد من IHG", "1,600+ projects": "+1,600 مشروع",
  "Company profile (PDF) ↓": "ملف الشركة (PDF) ↓",
  "Partner 02": "الشريك 02",
  "Power-over-Ethernet lighting — driverless, network-powered LED fixtures with smart controls and IoT integration.":
    "إضاءة عبر الإيثرنت — تجهيزات LED مدعومة بالشبكة بدون مشغّلات، مع تحكّم ذكي وتكامل إنترنت الأشياء.",
  "Power-over-Ethernet": "عبر الإيثرنت", "Smart & networked": "ذكية ومتّصلة",

  // energy partners
  "Energy & EV charging — partner network": "الطاقة وشحن المركبات — شبكة الشركاء",
  "Powered, stored, and ": "طاقة، وتخزين، و",
  "charged sustainably.": "شحن مستدام.",
  "UDGOK's energy scope — on-site generation, battery storage, and EV charging — is delivered with specialist partners across the program.":
    "يُنفَّذ نطاق الطاقة لدى UDGOK — التوليد بالموقع وتخزين البطاريات وشحن المركبات الكهربائية — مع شركاء متخصّصين عبر البرنامج.",
  "Partner 03": "الشريك 03",
  "Smart & sustainable EV charging — AC Level II and DC fast chargers up to 240kW+, with networked management and the EVBOLT+ app.":
    "شحن ذكي ومستدام للمركبات الكهربائية — شواحن تيار متردد المستوى الثاني وتيار مستمر سريعة حتى +240 كيلوواط، مع إدارة متّصلة وتطبيق EVBOLT+.",
  "AC & DC fast charging": "شحن سريع تيار متردد ومستمر",
  "Partner 04": "الشريك 04",
  "Battery energy storage — lithium-ion systems for backup power and peak shaving across program sites.":
    "تخزين الطاقة بالبطاريات — أنظمة ليثيوم للطاقة الاحتياطية وتقليل الأحمال عبر مواقع البرنامج.",
  "Battery storage": "تخزين البطاريات", "Backup & peak shaving": "احتياطي وتقليل الأحمال",
  "Partner 05": "الشريك 05",
  "Solar generation — on-site photovoltaic systems integrated with storage for clean, resilient power.":
    "التوليد الشمسي — أنظمة كهروضوئية بالموقع مدمجة مع التخزين لطاقة نظيفة وموثوقة.",
  "Solar PV": "الكهروضوئية", "On-site generation": "توليد بالموقع",

  // footer
  "Let's build it": "لنبنِها معاً",
  "Ready to map UDGOK into the ": "جاهزون لدمج UDGOK في ",
  "Kuwait program.": "برنامج الكويت.",
  "Start a service request →": "ابدأ طلب خدمة →",

  // modal chrome
  "PILLAR": "ركيزة",
  "Download company profile (PDF) ↓": "تنزيل ملف الشركة (PDF) ↓",
  "Request this service →": "اطلب هذه الخدمة →",

  // modal: construction
  "Full-scope vertical construction and design-build — from healthcare and commercial to heavy industrial, managed end to end.":
    "إنشاء رأسي متكامل وتصميم وبناء — من الرعاية الصحية والتجاري إلى الصناعي الثقيل، يُدار من البداية إلى النهاية.",
  "Sectors": "القطاعات", "Delivery": "التسليم",
  "Healthcare — hospitals, clinics, surgery & eye centers": "الرعاية الصحية — مستشفيات وعيادات ومراكز جراحة وعيون",
  "Commercial — retail, F&B, office, tenant improvement": "التجاري — تجزئة وأغذية ومكاتب وتجهيز المستأجرين",
  "Industrial — warehouses, cold storage, manufacturing": "الصناعي — مستودعات وتخزين مبرّد وتصنيع",
  "Mixed-use & community buildings": "مبانٍ متعددة الاستخدام ومجتمعية",
  "Preconstruction — budgeting & value engineering": "ما قبل الإنشاء — الموازنة وهندسة القيمة",
  "VDC / BIM coordination": "تنسيق VDC / BIM",
  "Quality assurance & commissioning": "ضمان الجودة والتشغيل",
  "Turnkey handover": "تسليم مفتاح باليد",

  // modal: energy
  "Clean, resilient power across every site — solar generation, lithium battery storage, and smart EV charging, delivered with our energy partners.":
    "طاقة نظيفة وموثوقة في كل موقع — توليد شمسي وتخزين ببطاريات ليثيوم وشحن ذكي للمركبات الكهربائية، تُسلَّم مع شركاء الطاقة لدينا.",
  "Solar — solar-tec": "الطاقة الشمسية — solar-tec",
  "Battery storage — z1power": "تخزين البطاريات — z1power",
  "EV charging — EVBOLT": "شحن المركبات — EVBOLT",
  "On-site photovoltaic generation": "توليد كهروضوئي بالموقع",
  "Solar + storage integration": "تكامل الطاقة الشمسية والتخزين",
  "Grid-tie & off-grid systems": "أنظمة مرتبطة بالشبكة ومستقلة",
  "LiFePO4 systems, UL 9540A certified": "أنظمة LiFePO4 معتمدة UL 9540A",
  "Backup power & peak shaving": "طاقة احتياطية وتقليل الأحمال",
  "4,000+ cycles, 10-year design life": "+4,000 دورة وعمر تصميمي 10 سنوات",
  "AC Level II chargers, 7.5–19 kW": "شواحن تيار متردد المستوى الثاني، 7.5–19 كيلوواط",
  "DC fast charging, 30–240 kW (to 320 kW)": "شحن سريع تيار مستمر، 30–240 كيلوواط (حتى 320)",
  "Networked management & EVBOLT+ app": "إدارة متّصلة وتطبيق EVBOLT+",
  "Hospitality, retail, fleet & parking": "ضيافة وتجزئة وأساطيل ومواقف",

  // modal: lighting
  "Specification-grade lighting for every environment — architectural, decorative, and network-powered — delivered with Estelle's Lighting and PoE Lighting.":
    "إضاءة بمواصفات احترافية لكل بيئة — معمارية وزخرفية ومدعومة بالشبكة — تُنفَّذ مع Estelle's Lighting وPoE Lighting.",
  "Fixtures — Estelle's Lighting": "التجهيزات — Estelle's Lighting",
  "Interior, exterior & architectural LED": "إضاءة LED داخلية وخارجية ومعمارية",
  "Decorative — chandeliers, pendants, sconces": "زخرفية — ثريات ومعلّقات وإضاءات جدارية",
  "Hospitality & commercial grade": "بمستوى الضيافة والتجاري",
  "Gulf-region offices (Oman, Riyadh)": "مكاتب في منطقة الخليج (عُمان، الرياض)",
  "PoE Lighting": "إضاءة PoE",
  "Power-over-Ethernet, network-powered": "مدعومة بالشبكة عبر الإيثرنت",
  "Driverless, low-voltage, smart-controlled": "بدون مشغّلات، جهد منخفض، تحكّم ذكي",
  "IoT & building-management integration": "تكامل إنترنت الأشياء وإدارة المباني",
  "Dimming, scenes & scheduling": "التعتيم والمَشاهد والجدولة",
  "DALI / 0–10V & wireless control": "DALI / 0–10 فولت وتحكّم لاسلكي",

  // modal: mission
  "AI, HPC, and mission-critical data center delivery — engineered for accelerated compute, uptime, and resilience.":
    "تسليم مراكز بيانات الذكاء الاصطناعي والحوسبة الفائقة والبنى الحيوية — مهندَسة للحوسبة المتسارعة والجاهزية والموثوقية.",
  "AI & data centers": "الذكاء الاصطناعي ومراكز البيانات",
  "Power & cooling": "الطاقة والتبريد",
  "Accelerated compute halls — NVIDIA & Cerebras": "قاعات حوسبة متسارعة — NVIDIA وCerebras",
  "Server hall design & build": "تصميم وبناء قاعات الخوادم",
  "White-space fit-out & equipment rooms": "تجهيز المساحات وغرف المعدات",
  "High-density power & busway": "طاقة عالية الكثافة وقضبان توزيع",
  "Direct-to-chip & liquid cooling": "تبريد مباشر للرقاقة وتبريد سائل",
  "UPS, N+1 redundancy & BMS": "أنظمة عدم انقطاع وتكرار N+1 وإدارة المباني",

  // modal: security
  "Integrated electronic security — from access control to perimeter protection and surveillance.":
    "أمن إلكتروني متكامل — من التحكم بالدخول إلى حماية المحيط والمراقبة.",
  "Access & identity": "الدخول والهوية",
  "Surveillance & perimeter": "المراقبة والمحيط",
  "Access control design & installation": "تصميم وتركيب التحكم بالدخول",
  "Credential & visitor management": "إدارة الاعتمادات والزوار",
  "Door hardware integration": "تكامل أجهزة الأبواب",
  "CCTV / IP video systems": "أنظمة كاميرات IP / CCTV",
  "Perimeter intrusion detection": "كشف اختراق المحيط",
  "Command & monitoring integration": "تكامل القيادة والمراقبة",

  // modal: sourcing
  "Global sourcing and full-scope build — materials, equipment, and logistics managed to the program's standards.":
    "توريد عالمي وبناء متكامل — مواد ومعدات ولوجستيات تُدار وفق معايير البرنامج.",
  "Construction materials & equipment": "مواد ومعدات البناء",
  "Vetted supplier network": "شبكة موردين موثوقة",
  "Specification & compliance": "المواصفات والامتثال",
  "Logistics & expediting": "اللوجستيات والتعجيل",
  "Full-scope construction services": "خدمات إنشاء متكاملة",
  "On-site delivery & install": "التسليم والتركيب بالموقع",

  // modal: estelles
  "Lighting partner · Estelle's Group": "شريك الإضاءة · مجموعة Estelle's",
  "Our lighting partner and a full hospitality & multi-family group — certified lighting, smart PoE controls, LED mirrors, architectural doors, solar and EV charging, delivered across North America and the Gulf.":
    "شريكنا في الإضاءة ومجموعة متكاملة للضيافة والوحدات السكنية — إضاءة معتمدة وتحكّم PoE ذكي ومرايا LED وأبواب معمارية وطاقة شمسية وشحن مركبات، تُسلَّم عبر أمريكا الشمالية والخليج.",
  "Projects delivered": "مشاريع منجزة", "Hospitality brands": "علامات ضيافة",
  "Certified vendor": "مورّد معتمد", "Est. in Houston": "تأسست في هيوستن",
  "Lighting": "الإضاءة",
  "Interior, architectural & exterior LED": "إضاءة LED داخلية ومعمارية وخارجية",
  "Lighted mirrors & bespoke fixtures": "مرايا مضيئة وتجهيزات حسب الطلب",
  "Hospitality, multi-family & commercial": "ضيافة ووحدات سكنية وتجاري",
  "Smart & sustainable": "ذكية ومستدامة",
  "PoE smart lighting & controls (LED Industries)": "إضاءة وتحكّم PoE ذكي (LED Industries)",
  "Solar energy (SolarTec)": "طاقة شمسية (SolarTec)",
  "EV charging (EVBOLT)": "شحن مركبات (EVBOLT)",
  "Group of companies": "مجموعة الشركات",
  "Estelles & Impulse Lighting": "Estelles وImpulse Lighting",
  "MAK Door Industries — fire-rated doors": "MAK Door Industries — أبواب مقاومة للحريق",
  "Bloorz — vanities, shower & surrounds": "Bloorz — خزائن وأحواض ودُش وتغليف",
  "Credentials & reach": "الاعتمادات والانتشار",
  "IHG-certified vendor (1 of 2 in N. America)": "مورّد معتمد من IHG (1 من 2 في أمريكا الشمالية)",
  "cUL, CSA, UL & DarkSky rated": "معتمد cUL وCSA وUL وDarkSky",
  "1,600+ projects since 2008": "+1,600 مشروع منذ 2008",
  "Houston HQ · Toronto · South Asia": "المقر هيوستن · تورنتو · جنوب آسيا",

  // clock
  "Kuwait City": "مدينة الكويت", "Central US": "وسط الولايات المتحدة",

  // ---- contact page ----
  "Service request — Kuwait program": "طلب خدمة — برنامج الكويت",
  "Tell us exactly what you ": "أخبرنا بالضبط بما ",
  "need.": "تحتاجه.",
  "Specify the projects and systems you're scoping and UDGOK will respond with the right team and packages. The more detail you share, the sharper our proposal.":
    "حدّد المشاريع والأنظمة التي تدرسها وستردّ UDGOK بالفريق والحِزم المناسبة. كلما زادت التفاصيل، كان عرضنا أدق.",
  "WhatsApp": "واتساب",
  "Your details": "بياناتك",
  "Which project(s)?": "أي مشروع أو مشاريع؟",
  "Services required": "الخدمات المطلوبة",
  "Scale & timeline": "الحجم والجدول الزمني",
  "Project details": "تفاصيل المشروع",
  "Full name *": "الاسم الكامل *",
  "Company / organization": "الشركة / المؤسسة",
  "Email *": "البريد الإلكتروني *",
  "Phone": "الهاتف",
  "Estimated scale": "الحجم التقديري",
  "Timeline": "الجدول الزمني",
  "Anything specific we should know": "أي تفاصيل مهمة",
  "Enter your name": "أدخل اسمك",
  "Organization name": "اسم المؤسسة",
  "Scope, sites, key requirements, deadlines, partners involved…": "النطاق والمواقع والمتطلبات الرئيسية والمواعيد والشركاء…",
  "Other / multiple": "أخرى / متعددة",
  "Data center": "مركز بيانات", "Telecom": "اتصالات",
  "Access control": "التحكم بالدخول", "Materials sourcing": "توريد المواد", "Full-scope build": "بناء متكامل",
  "LED": "LED", "PoE": "PoE", "VDC": "VDC",
  "To be discussed": "يُناقَش لاحقاً",
  "Under $5M": "أقل من 5 مليون دولار",
  "$5M – $25M": "5 – 25 مليون دولار",
  "$25M – $100M": "25 – 100 مليون دولار",
  "$100M+": "+100 مليون دولار",
  "Planning stage": "مرحلة التخطيط", "Immediate": "فوري",
  "1 – 3 months": "1 – 3 أشهر", "3 – 6 months": "3 – 6 أشهر", "6 – 12 months": "6 – 12 شهراً",
  "Send request": "إرسال الطلب", "Sending…": "جارٍ الإرسال…", "Copy summary": "نسخ الملخّص",
  "selected": "مختارة",
  "Sends your request straight to UDGOK. Prefer to send manually? Use \u201cCopy summary\u201d to copy it to your clipboard.":
    "يُرسل طلبك مباشرةً إلى UDGOK. تفضّل الإرسال يدوياً؟ استخدم «نسخ الملخّص» لنسخه إلى الحافظة.",
  "Thank you — your request has been sent to UDGOK. We'll be in touch shortly.": "شكراً لك — تم إرسال طلبك إلى UDGOK. سنتواصل معك قريباً.",
  "Sorry, that didn't go through. Please email ": "عذراً، لم يتم الإرسال. يُرجى مراسلة ",
  " directly, or try again.": " مباشرةً، أو المحاولة مجدداً.",
};

const LangCtx = createContext({ lang: "en", dir: "ltr", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("udgok-lang");
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    try { localStorage.setItem("udgok-lang", lang); } catch (e) {}
  }, [lang]);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const norm = (s) => (typeof s === "string" ? s.replace(/\u2019/g, "'") : s);
  const t = (s) => (lang === "ar" ? (AR[s] ?? AR[norm(s)] ?? s) : s);

  return <LangCtx.Provider value={{ lang, setLang, dir, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

export function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <button
      className={"lang-toggle " + className}
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      aria-label="Switch language"
    >
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );
}
