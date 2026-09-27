import type { IconType } from 'react-icons';
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiHuggingface,
  SiLangchain,
  SiGooglegemini,
  SiUltralytics,
  SiOnnx,
  SiFastapi,
  SiFlask,
  SiMongodb,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiSvelte,
  SiExpo,
  SiFlutter,
  SiPostgresql,
  SiSqlalchemy,
  SiDocker,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiLinux,
  SiJupyter,
  SiStreamlit,
  SiPytest,
  SiVercel,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

// ---------------------------------------------------------------------------
// Site-wide identity. Single source of truth for the author name/title used
// in the header, footer, metadata, and paper author lists.
// ---------------------------------------------------------------------------
export const SITE = {
  name: 'Md. Ittesaf Hossain (IH Arik)',
  // Name exactly as printed in paper author lists; highlighted on the Research section.
  citationName: 'Md. Ittesaf Hossain',
  nickname: 'IH Arik',
  title: 'AI/ML Engineer & Researcher',
  summary:
    'I build deep learning systems for medical imaging and satellite change detection, and ship them as full-stack applications (FastAPI, Next.js, React Native). Researcher at the Visual Data Analysis Lab (VDAL).',
  email: 'ittesham02@gmail.com',
  github: 'https://github.com/IH-Arik',
  linkedin: 'https://www.linkedin.com/in/md-ittesaf-hossain-b4671b247/',
  researchgate: 'https://researchgate.net/profile/Md-Hossain-1936',
  location: 'Dhaka, Bangladesh',
  affiliation: 'Visual Data Analysis Lab (VDAL), Green University of Bangladesh',
} as const;

// ---------------------------------------------------------------------------
// Projects
//
// Every description, architecture detail and metric below is taken from the
// linked GitHub repository's README. Numbers marked TODO(verify) are claims
// from those READMEs — confirm each against your own experiment logs.
// ---------------------------------------------------------------------------
export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  role: string;
  featured: boolean;
  before: string;
  after: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  relatedLinks?: ProjectLink[];
  caseStudy: {
    overview: string;
    approach: string;
    challenges: string[];
    results: string[];
    metrics: CaseStudyMetric[];
  };
}

export const projects: Project[] = [
  {
    slug: 'building-damage-assessment',
    title: 'Building Damage Assessment (Thesis)',
    description:
      'Change detection on pre- and post-disaster satellite imagery, using a transformer-based (BIT) model with a ResNet backbone to segment damaged areas.',
    role: 'Lead Applied DL Researcher',
    featured: true,
    before:
      'Disaster assessment relied on manual, slow, and high-risk field inspections or manual tagging of high-resolution satellite frames, delaying response times by days or weeks.',
    after:
      'A bi-temporal change-detection model — ResNet-152 backbone plus a BIT transformer encoder with multi-scale fusion — that segments damage from co-registered pre/post image pairs.',
    tags: ['PyTorch', 'BIT Transformer', 'ResNet-152', 'Change Detection', 'xView2'],
    repoUrl: 'https://github.com/IH-Arik/CNN-Based-Damage-Change-Segmentation',
    caseStudy: {
      overview:
        'Research into automated building damage assessment from bi-temporal satellite imagery: pre- and post-event image pairs are compared to produce pixel-wise damage masks.',
      approach:
        'A ResNet-152 backbone extracts multi-scale features from both images; a BIT transformer encoder (6 layers, 8 heads, 256-dim embeddings) models the changes between them, and a segmentation head outputs the damage mask. Trained for 100 epochs (lr 1e-4, batch 16) with rotation/flip, color jitter, Gaussian noise, random cropping and mixup augmentation.',
      challenges: [
        'Overcoming atmospheric differences, cloud coverage, and shadow variations between pre- and post-disaster images.',
        'Precisely co-registering image offsets caused by varying satellite angles during capture.',
      ],
      results: [
        // TODO(verify): from repo README
        'On the xView2 validation set: precision 92.3%, recall 89.7%, F1 90.9%, IoU 85.2%, Dice 91.4%.',
      ],
      metrics: [
        { label: 'F1 (xView2 val)', value: '90.9%' }, // TODO(verify)
        { label: 'IoU', value: '85.2%' }, // TODO(verify)
        { label: 'Dice', value: '91.4%' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'brain-tumor-rag',
    title: 'Brain Tumor Classification + RAG',
    description:
      'MRI brain tumor classifier (4 classes) combined with a retrieval-augmented Q&A system over a curated medical knowledge base.',
    role: 'Applied ML Researcher',
    featured: true,
    before:
      'MRI classifiers output abstract probability scores (e.g., 98.4% Glioma) without medical explanation, making it difficult for clinical teams to verify the diagnostic rationale.',
    after:
      'A ResNet18-based classifier (glioma, meningioma, pituitary, no tumor) served through Flask, paired with a FAISS + sentence-transformer retrieval pipeline that returns source-attributed medical information for each prediction.',
    tags: ['PyTorch', 'ResNet18', 'RAG', 'FAISS', 'Flask'],
    repoUrl: 'https://github.com/IH-Arik/brain-tumor-rag',
    caseStudy: {
      overview:
        'Pairs image classification with retrieval so that a prediction comes with relevant, source-attributed background information instead of a bare probability.',
      approach:
        'A modified ResNet18 classifies 224×224 MRI images into four classes. A knowledge base of 10+ medical documents is embedded with all-MiniLM-L6-v2 and indexed in FAISS (cosine similarity); retrieved passages feed a Hugging Face model (DialoGPT-medium) to generate answers. Flask endpoints cover prediction, prediction + RAG, and free-form Q&A, with Docker support.',
      challenges: [
        'Keeping generated medical answers grounded in retrieved sources rather than model hallucination.',
      ],
      results: [
        // TODO(verify): from repo README
        '~95% classification accuracy on the test set.',
        'Every RAG answer is returned together with its source documents.',
      ],
      metrics: [
        { label: 'Test accuracy', value: '~95%' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'mabdel-ai',
    title: 'GoCustify AI (Mabdel)',
    description:
      'AI-powered business communication platform: a unified multi-channel inbox, AI reply suggestions, call transcription and summaries, and AI-generated documents.',
    role: 'Full Stack SaaS Engineer',
    featured: true,
    before:
      'Businesses juggle conversations across WhatsApp, Instagram and Telegram, draft leases and agreements by hand, and make calls without any record or insight.',
    after:
      'A FastAPI + MongoDB backend with React web, React Native mobile and admin apps — GPT-4o for replies, documents and workflow prefill, Whisper for transcription, and LangGraph to route AI commands.',
    tags: ['FastAPI', 'MongoDB', 'LangGraph', 'GPT-4o / Whisper', 'React Native'],
    repoUrl: 'https://github.com/IH-Arik/Mabdel',
    relatedLinks: [{ label: 'Backend API repository', url: 'https://github.com/IH-Arik/Mabdel-AI' }],
    caseStudy: {
      overview:
        'A multi-app SaaS platform for real estate agents, sales teams and service businesses that combines messaging, AI calls, document automation and invoicing in one workspace.',
      approach:
        'Backend: FastAPI with async MongoDB (Motor), JWT auth with OTP verification and OAuth2 integrations, LangGraph for AI command routing, Twilio voice webhooks, and Pytest with mongomock-motor for API tests; deployable with Docker Compose or as a Vercel serverless function. Clients: a React 18 + Vite web app, a React Native mobile app, and a React admin dashboard.',
      challenges: [],
      results: [],
      metrics: [],
    },
  },
  {
    slug: 'idpdc-plant-disease',
    title: 'IDPDC — Plant Disease Classification',
    description:
      'Interpretable, lightweight EfficientViT-based framework for plant disease classification, benchmarked against CNN and transformer baselines. Paper under review.',
    role: 'Researcher', // TODO(verify): your role on this project
    featured: false,
    before:
      'Plant disease identification needs models that are accurate, efficient enough to deploy, and interpretable.',
    after:
      'A training and evaluation framework on PlantVillage (38 classes) comparing EfficientViT with ResNet, EfficientNet, ViT and Swin, using repeated evaluation runs with confidence intervals.',
    tags: ['PyTorch', 'EfficientViT', 'Swin / ViT', 'PlantVillage', 'Mixed precision'],
    repoUrl: 'https://github.com/IH-Arik/IDPDC',
    caseStudy: {
      overview:
        'Research code for developing efficient, interpretable deep learning models for plant disease identification on the PlantVillage dataset. The accompanying paper is under review.',
      approach:
        'A model factory builds ResNet-50/101, EfficientNet-B0/B3, ViT-B/16, Swin-T and EfficientViT models, trained with AdamW, cosine-annealing learning rate, mixed precision, gradient clipping and early stopping. PlantVillage (38 classes) uses a 70/20/10 split with rotation, flip, color-jitter and random-resized-crop augmentation. Evaluation is repeated over multiple runs to report confidence intervals, confusion matrices and per-class performance.',
      challenges: [],
      results: [],
      metrics: [],
    },
  },
  {
    slug: 'edrp-diabetes-risk',
    title: 'EDRP — Diabetes Risk Prediction',
    description:
      'Explainable stacking ensemble for diabetes risk prediction on the real-world DiaBD cohort (5,288 samples). Published at IEEE QPAIN 2026.',
    role: 'Lead author',
    featured: false,
    before: 'Early diabetes risk stratification from clinical records, where positive cases are under-represented.',
    after:
      'A stacking classifier (Logistic Regression, CatBoost, Gradient Boosting, XGBoost) with hybrid sampling and SHAP/LIME explanations, reaching 95.78% accuracy.', // TODO(verify)
    tags: ['Stacking ensemble', 'XGBoost / CatBoost', 'SHAP / LIME', 'Hybrid sampling', 'Class imbalance'],
    repoUrl: 'https://github.com/IH-Arik/EDRP',
    caseStudy: {
      overview:
        'Explainable diabetes risk prediction on a Bangladeshi dataset of 5,288 samples (DiaBD cohort), published at IEEE QPAIN 2026 (DOI 10.1109/QPAIN69676.2026.11545949).',
      // TODO(verify): the paper describes a stacking ensemble, but the EDRP repository README
      // describes a 1D CNN with focal loss. Update the repository so the code matches the paper.
      approach:
        'Paper: categorical encoding, normalization, feature engineering and hybrid sampling feed a stacking classifier built on Logistic Regression, CatBoost, Gradient Boosting and XGBoost, trained on an 80/20 split and compared against popular ML models; SHAP and LIME explain individual predictions. The repository additionally contains a 1D CNN baseline trained with focal loss and SMOTE-ENN.',
      challenges: [],
      results: [
        '95.78% accuracy, outperforming the other models tested.', // TODO(verify)
      ],
      metrics: [
        { label: 'Accuracy', value: '95.78%' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'multimodal-breast-cancer',
    title: 'Multi-Modal Breast Cancer Detection',
    description:
      'Deep learning framework for breast cancer detection across ultrasound, mammography and histology images, with attention- and gated-fusion across modalities.',
    role: 'Researcher', // TODO(verify): your role on this project
    featured: false,
    before: 'Detecting breast cancer across several imaging modalities — ultrasound, mammography and histology — within one framework.',
    after:
      'Per-modality classifiers (ResNet, EfficientNet, Swin-T, ViT and others) plus attention and gated fusion models, trained on BUSI, CBIS-DDSM and BreakHis.',
    tags: ['PyTorch', 'EfficientNet', 'Swin-T', 'Multi-modal fusion', 'Medical imaging'],
    repoUrl: 'https://github.com/IH-Arik/Multi-Modal-Breast-Cancer-Detection',
    caseStudy: {
      overview:
        'A framework supporting single-modality analysis and combined multi-modal approaches for breast cancer detection.',
      approach:
        'Supports 10+ backbones and three fusion methods (attention, gated, concatenation). Training uses mixed precision, AdamW with cosine scheduling, early stopping and modality-specific augmentation on a 70/15/15 split; evaluation includes bootstrap confidence intervals and calibration metrics.',
      challenges: [],
      results: [
        // TODO(verify): from repo README
        'Accuracy: ultrasound 94.2% (EfficientNet-B4), mammography 91.8% (EfficientNet-B0), histology 93.5% (Swin-T), multi-modal attention fusion 96.1%.',
      ],
      metrics: [
        { label: 'Multi-modal accuracy', value: '96.1%' }, // TODO(verify)
        { label: 'Multi-modal AUC', value: '0.98' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'ckd-risk-prediction',
    title: 'CKD Risk Prediction',
    description:
      'Chronic kidney disease detection pipeline with gradient-boosting ensembles, survival analysis and SHAP explanations, plus a FastAPI web app for per-patient risk.',
    role: 'Researcher', // TODO(verify): your role on this project
    featured: false,
    before: 'Early detection and risk stratification of chronic kidney disease from clinical data.',
    after:
      'An ensemble (Random Forest, XGBoost, LightGBM, CatBoost, neural network) with Cox and random-survival-forest models, served through a FastAPI app that returns a risk probability and the top SHAP features for each patient.',
    tags: ['XGBoost / LightGBM / CatBoost', 'Survival analysis', 'SHAP', 'FastAPI', 'scikit-learn'],
    repoUrl: 'https://github.com/IH-Arik/ckd',
    relatedLinks: [{ label: 'Web app repository', url: 'https://github.com/IH-Arik/CKD-ARIK' }],
    caseStudy: {
      overview:
        'A machine learning pipeline for early CKD detection and risk stratification, with a web application that explains each individual prediction.',
      approach:
        'Pipeline: automated preprocessing and feature selection, SMOTE for class imbalance, stratified k-fold validation, ensemble classifiers and survival models. App: a FastAPI backend taking 12 clinical inputs (age, creatinine, eGFR, HbA1c, blood pressure and others), applying median imputation and scaling, averaging scikit-learn and Keras model outputs, and returning SHAP explanations rendered with Chart.js.',
      challenges: [],
      results: [
        // TODO(verify): from repo README
        'Accuracy 94.2%, AUC-ROC 0.96, sensitivity 92.8%, specificity 95.1% with 10-fold cross-validation on 10,000 patients.',
      ],
      metrics: [
        { label: 'Accuracy', value: '94.2%' }, // TODO(verify)
        { label: 'AUC-ROC', value: '0.96' }, // TODO(verify)
        { label: 'Sensitivity', value: '92.8%' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'ppe-hazard-detection',
    title: 'PPE & Hazard Detection',
    description:
      'YOLO-based detection of personal protective equipment and safety violations on construction sites, with a Streamlit web app and an on-device mobile app.',
    role: 'Computer Vision Engineer',
    featured: false,
    before:
      'Safety inspections relied entirely on human guards monitoring multiple CCTV streams, resulting in missed violations and delayed hazard alerts.',
    after:
      'Detects helmets, vests, masks, boots, gloves and glasses — and their absence — in images, video and live camera feeds, in a Streamlit app and a React Native app running TFLite on-device.',
    tags: ['YOLO (Ultralytics)', 'TFLite', 'React Native / Expo', 'Streamlit', 'OpenCV'],
    repoUrl: 'https://github.com/IH-Arik/PPE-Detection',
    relatedLinks: [{ label: 'Streamlit hazard-detection app', url: 'https://github.com/IH-Arik/Hazard-Detection' }],
    caseStudy: {
      overview:
        'Automates construction-site safety checks by flagging missing protective equipment in images, video and live camera feeds.',
      approach:
        'Mobile: React Native + Expo with Vision Camera and react-native-fast-tflite (GPU delegation), overlaying live detections with FPS, latency and RAM stats; models are exported to TFLite, PyTorch and ONNX. Web: a Streamlit app running YOLO11 with pretrained construction-hazard and PPE models from the Hugging Face Hub, supporting uploads, webcam and image URLs with adjustable confidence thresholds.',
      challenges: [],
      results: [
        // TODO(verify): from repo READMEs
        '24+ FPS on modern mobile hardware with GPU delegation (mobile app); ~30 FPS on modern hardware (web app).',
      ],
      metrics: [
        { label: 'Mobile inference', value: '24+ FPS' }, // TODO(verify)
        { label: 'Web app', value: '~30 FPS' }, // TODO(verify)
      ],
    },
  },
  {
    slug: 'myfutureabroad',
    title: 'MyFutureAbroad',
    description:
      'Study-abroad platform with country, visa, citizenship and tax information, an AI assistant, and payments.',
    // TODO(verify): the repo README references another developer's machine paths —
    // confirm your role and whether this was a team project.
    role: 'Full Stack Engineer',
    featured: false,
    before:
      'Students planning to study abroad have to piece together visa, citizenship and cost information from many scattered sources.',
    after:
      'A React + TypeScript frontend, an Express.js core backend (Stripe, OpenAI chatbot, Resend email) and a separate FastAPI AI service using Gemini, backed by Supabase/PostgreSQL seeded with data for 28+ countries.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Gemini API', 'Supabase / PostgreSQL'],
    repoUrl: 'https://github.com/IH-Arik/MyFutureAbroad',
    caseStudy: {
      overview:
        'A platform that brings together country, visa, citizenship-requirement and tax information for students planning to study abroad.',
      approach:
        'Four parts: a React/TypeScript Vite frontend; an Express.js backend handling payments (Stripe), an OpenAI chatbot and email (Resend); a FastAPI AI service for Gemini integrations and structured data queries with Alembic migrations; and a Supabase/PostgreSQL database with row-level security. Also runnable via Docker Compose with Directus CMS.',
      challenges: [],
      results: [],
      metrics: [],
    },
  },
  {
    slug: 'mon5majeur',
    title: 'Mon5majeur',
    description:
      'Fantasy basketball app: build a starting five, join public or private leagues, and follow live scores.',
    role: 'Lead Frontend Architect', // TODO(verify): the repo covers backend, Flutter app and dashboards — confirm your role
    featured: false,
    before: '',
    after:
      'A FastAPI + MongoDB (Beanie) backend with a Flutter mobile app, a Next.js admin and analytics dashboard, and a Next.js landing page.',
    tags: ['Flutter', 'FastAPI', 'MongoDB', 'Next.js', 'Docker'],
    repoUrl: 'https://github.com/IH-Arik/Mon5majeur',
    caseStudy: {
      overview:
        'A fantasy basketball application where users build starting-five lineups, compete in leagues with friends, use tokens and booster cards, and track live scores.',
      approach:
        'Monorepo: a FastAPI backend using Beanie ODM on MongoDB (Docker Compose with Nginx for production), a Flutter iOS/Android app, a TypeScript Next.js admin dashboard and a Next.js landing page integrated with MailerLite.',
      challenges: [],
      results: [],
      metrics: [],
    },
  },
  {
    slug: 'product-ai-agent',
    title: 'Product AI Agent',
    // TODO(verify): no public repository found for this project — add a link or
    // confirm it can be described without one.
    description:
      'Autonomous AI agent system designed to browse product databases, analyze customer requirements, and generate custom sales sheets.',
    role: 'AI Engineer',
    featured: false,
    before:
      'Sales teams spent hours cross-referencing spreadsheet specs and writing tailored emails for prospective leads, limiting daily lead outreach.',
    after:
      'An LLM-agent framework equipped with database tools that parses natural-language prompts to query inventories and automatically draft technical brochures.',
    tags: ['LangChain / LangGraph', 'OpenAI API', 'Python', 'FastAPI', 'Svelte'],
    caseStudy: {
      overview:
        'A workspace utility that automates product lookup, configuration matching, and technical proposal drafting using chain-of-thought execution.',
      approach:
        'Developed using LangGraph to enable cyclical reasoning loops. The agent can invoke custom tools (e.g., database lookups, PDF generation libraries) to gather product specs and generate structured markdown sales materials.',
      challenges: [
        'Constraining LLM agent actions to prevent infinite tool-calling loops when specific search results return empty.',
        'Parsing unstructured customer specification notes containing non-standard terminology.',
      ],
      results: [],
      metrics: [],
    },
  },
];

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------
export type PaperStatus = 'preprint' | 'submitted' | 'under-review' | 'accepted' | 'published';

export interface Paper {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  date: string;
  status?: PaperStatus;
  researchGateUrl?: string;
  paperUrl?: string;
  codeUrl?: string;
  abstract: string;
  keyFindings: string[];
  metrics?: CaseStudyMetric[];
}

export const papers: Paper[] = [
  {
    slug: 'edrp-diabetes-risk',
    title: 'Explainable Ensemble Modeling for Diabetes Risk Prediction Using the Real-World DiaBD Cohort',
    authors: [
      'Md. Ittesaf Hossain',
      'Md. Rajibul Palas',
      'Mozdaher Abdul Quader',
      'Sabbir Hosen Mamun',
      'Md. Sharifur Rahman',
    ],
    // Verified via Crossref (DOI 10.1109/QPAIN69676.2026.11545949).
    venue: 'IEEE International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)',
    date: 'Apr 2026',
    status: 'published',
    paperUrl: 'https://doi.org/10.1109/QPAIN69676.2026.11545949',
    codeUrl: 'https://github.com/IH-Arik/EDRP',
    abstract:
      'EDRP (Ensemble-based Diabetes Risk Prediction): an explainable stacking classifier built on Logistic Regression, CatBoost, Gradient Boosting and XGBoost, predicting diabetes on a Bangladeshi dataset of 5,288 samples. Uses categorical encoding, normalization, feature engineering and hybrid sampling, with SHAP and LIME for transparency.',
    keyFindings: [
      '95.78% accuracy, outperforming the other models tested.',
      '80/20 train–test split on 5,288 samples from the DiaBD cohort.',
      'SHAP and LIME explanations for each prediction.',
    ],
    metrics: [
      { label: 'Accuracy', value: '95.78%' },
    ],
  },
  {
    slug: 'thyroid-ensemble-classifier',
    title: 'Explainable Ensemble Machine Learning Framework for Accurate Detection of Thyroid Disorders',
    authors: [
      'Md. Ittesaf Hossain',
      'Nur Hossain',
      'Md. Mustakim Hossain',
      'Md. Romzan Alom',
      'Kabiratun Ummi Oyshe',
      'Md. Ahsan Habib',
      'Muhammad Aminur Rahaman',
      'A B M Shawkat Ali',
    ],
    // Verified via Crossref (DOI 10.1109/i-COSTE68047.2025.11467458).
    venue: 'International Conference on Sustainable Technology and Engineering (i-COSTE), IEEE',
    date: 'Dec 2025',
    status: 'published',
    paperUrl: 'https://doi.org/10.1109/i-COSTE68047.2025.11467458',
    abstract:
      'ETDD (Ensemble-based Thyroid Disorder Detection): an explainable stacking classifier built on Random Forest, CatBoost, LightGBM and XGBoost, detecting thyroid disorders from a 9,172-sample medical dataset. Includes missing-data handling, categorical encoding, normalization and feature engineering, with SHAP and LIME for transparent predictions. Joint work between Green University of Bangladesh and BUBT.',
    keyFindings: [
      '96.24% accuracy and 99.03% AUC, outperforming the other models tested.',
      '80/20 train–test split on 9,172 samples, benchmarked against several leading ML models.',
      'SHAP and LIME explanations for each prediction.',
    ],
    metrics: [
      { label: 'Accuracy', value: '96.24%' },
      { label: 'AUC', value: '99.03%' },
    ],
  },
  {
    slug: 'rdws-eksd-kidney-stone',
    title:
      'RDWS-EKSD: ROI-Guided Dynamic Weighted Stacked Ensemble with Grad-CAM++ for Explainable Kidney Stone Detection',
    // TODO(verify): the author list you provided appeared cut off after the third name —
    // add any remaining authors in published order.
    authors: ['Md. Mustakim Hossain', 'Md. Ittesaf Hossain', 'Nur Hossain'],
    venue: '', // TODO(verify): venue
    date: '', // TODO(verify): year
    // TODO(verify): publication status (preprint / under review / accepted / published)
    status: undefined,
    abstract:
      'An ROI-guided, dynamically weighted stacked ensemble for explainable kidney stone detection from coronal CT images. Four ImageNet-pretrained backbones (InceptionV3, ResNet50, MobileNetV2, EfficientNetB0) are combined through learnable dynamic weighting and a meta-learner, with kidney-specific ROI localization and Grad-CAM++ explanations.',
    keyFindings: [
      '99.71% accuracy on the held-out test set.', // TODO(verify)
      'Evaluated on a public dataset of 1,799 coronal CT images from 433 patients (790 kidney stone, 1,009 normal).',
      'ROI localization, enhancement, augmentation and weighted sampling to improve anatomical focus and reduce class imbalance.',
      'Grad-CAM++ visual explanations highlight the discriminative kidney regions behind each prediction.',
    ],
    metrics: [
      { label: 'Accuracy', value: '99.71%' }, // TODO(verify)
    ],
  },
  {
    slug: 'iecsp-sudoku',
    title:
      'An Adaptive and Intelligent Ensemble Framework for Efficient Sudoku Solving: Integrating Classical CSP Algorithms',
    authors: ['Md. Ittesaf Hossain', 'Tanha Tabassum Tusmi', 'Mayeesha Farjana'],
    venue: '', // TODO(verify): venue
    date: '', // TODO(verify): year
    // TODO(verify): publication status (preprint / under review / accepted / published)
    status: undefined,
    codeUrl: 'https://github.com/IH-Arik/Adaptive-Ensemble-Sudoku-Solver',
    abstract:
      'IECSP: a constraint-satisfaction solver that picks a solving strategy per puzzle from real-time complexity analysis (empty-cell ratio and constraint density), combining backtracking, BFS, DFS, heuristic search, MRV, forward checking and arc consistency, with an AC-3 and naked/hidden-singles pre-processing pipeline.',
    keyFindings: [
      'Solved all 70 puzzles across four difficulty levels (2,800 experiments) with a 100% success rate.', // TODO(verify)
      'Better computational efficiency and scalability than the single-strategy baseline.',
    ],
    metrics: [
      { label: 'Success rate', value: '100%' }, // TODO(verify)
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills — every item is used in at least one project repository above.
// Items with no matching brand icon render as a plain text chip.
// ---------------------------------------------------------------------------
export interface SkillItem {
  name: string;
  Icon?: IconType;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'ML / DL & LLMs',
    items: [
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'TensorFlow / Keras', Icon: SiTensorflow },
      { name: 'scikit-learn', Icon: SiScikitlearn },
      { name: 'CNNs (ResNet, EfficientNet, InceptionV3, MobileNetV2)' },
      { name: 'Vision transformers (ViT, Swin, EfficientViT)' },
      { name: 'Stacking / ensemble learning' },
      { name: 'XGBoost / LightGBM / CatBoost' },
      { name: 'Class imbalance (focal loss, SMOTE-ENN, hybrid sampling)' },
      { name: 'Explainability (SHAP, LIME, Grad-CAM++)' },
      { name: 'Survival analysis (Cox, RSF)' },
      { name: 'RAG (FAISS, sentence-transformers)' },
      { name: 'LangGraph', Icon: SiLangchain },
      { name: 'OpenAI GPT-4o & Whisper' },
      { name: 'Gemini API', Icon: SiGooglegemini },
      { name: 'Hugging Face', Icon: SiHuggingface },
      { name: 'NumPy', Icon: SiNumpy },
      { name: 'Pandas', Icon: SiPandas },
    ],
  },
  {
    title: 'Computer Vision',
    items: [
      { name: 'Change detection (BIT transformer)' },
      { name: 'YOLO (Ultralytics)', Icon: SiUltralytics },
      { name: 'OpenCV', Icon: SiOpencv },
      { name: 'Medical imaging (MRI, ultrasound, mammography, histology)' },
      { name: 'Satellite imagery (xView2)' },
      { name: 'ONNX / TFLite export', Icon: SiOnnx },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Python', Icon: SiPython },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'Flask', Icon: SiFlask },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'PostgreSQL / Supabase', Icon: SiPostgresql },
      { name: 'SQLAlchemy / Alembic', Icon: SiSqlalchemy },
      { name: 'Node.js / Express', Icon: SiNodedotjs },
      { name: 'Docker', Icon: SiDocker },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: TbBrandNextjs },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'React Native / Expo', Icon: SiExpo },
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'Svelte', Icon: SiSvelte },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Linux', Icon: SiLinux },
      { name: 'Jupyter', Icon: SiJupyter },
      { name: 'Streamlit', Icon: SiStreamlit },
      { name: 'Pytest', Icon: SiPytest },
      { name: 'Vercel', Icon: SiVercel },
    ],
  },
];
