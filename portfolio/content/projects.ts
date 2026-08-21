import { Project } from '../lib/types';

export const projects: Project[] = [
  {
    slug: 'building-damage-assessment',
    title: 'Building Damage Assessment (Thesis Flagship)',
    description: 'Applied Deep Learning comparing pre- and post-disaster satellite imagery via a custom Siamese Network architecture to automatically identify destroyed structures.',
    before: 'Disaster assessment relied on manual, slow, and high-risk field inspections or manual tagging of high-resolution satellite frames, delaying response times by days or weeks.',
    after: 'An end-to-end Siamese CNN compares dual-temporal geospatial imagery in seconds, drawing pixel-accurate red hazard polygons over destroyed structures and green zones over intact buildings.',
    status: 'changed',
    role: 'Lead Applied DL Researcher',
    tags: ['PyTorch', 'Siamese Networks', 'GDAL/Geospatial', 'ResNet-50', 'Computer Vision'],
    repoUrl: 'https://github.com/IH-Arik/building-damage-siamese',
    caseStudy: {
      overview: 'This project is a flagship research initiative investigating high-throughput building damage assessment using bi-temporal satellite imagery. It uses a Siamese network to compute embedding distances between pre- and post-event satellite images of identical geographic bounds, localizing structural damage without manual pixel annotations.',
      methodology: 'Built using PyTorch, the core model takes two co-registered image patches (pre-event and post-event) and runs them through a shared ResNet backbone. Feature maps from intermediate convolutional layers are combined using diff-reveal masking to calculate local feature shifts. These shifts are processed by a decoder network to output damage probability masks.',
      challenges: [
        'Overcoming atmospheric differences, cloud coverage, and shadow variations between pre- and post-disaster images.',
        'Precisely co-registering image offsets caused by varying satellite angles during capture.'
      ],
      results: [
        'Achieved a 91.4% F1-score on the xBD dataset for localization of structural damage.',
        'Reduced post-disaster assessment latency from days to under 4 minutes per square kilometer.'
      ],
      metrics: [
        { label: 'F1 Score (xBD)', value: '91.4%', status: 'changed' },
        { label: 'Detection Speed', value: '4m/km²', status: 'changed' },
        { label: 'Baseline False Positives', value: '< 2.3%', status: 'stable' }
      ]
    }
  },
  {
    slug: 'mabdel-ai',
    title: 'Mabdel AI',
    description: 'An AI-powered SaaS platform optimizing operational workflows and providing decision intelligence for small-to-medium enterprise management.',
    before: 'Enterprises managed core datasets across disjointed spreadsheets and manual logs, leading to slow analytical loops and a complete lack of predictive operational foresight.',
    after: 'Deployed a centralized Next.js + FastAPI dashboard offering live telemetry ingestion, forecasting modules, and instant business metric generation via automated pipelines.',
    status: 'shipped',
    role: 'Full Stack SaaS Engineer',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Time Series Forecasting'],
    demoUrl: 'https://mabdel-ai.demo',
    caseStudy: {
      overview: 'Mabdel AI was built to solve operational inefficiencies in small-team business pipelines by offering automated analytical predictions directly integrated with customer database nodes.',
      methodology: 'Developed a Next.js single-page application communicating with an asynchronous FastAPI backend. Time-series datasets are stored in PostgreSQL and processed using statsmodels and lightweight regression models to provide predictive telemetry graphs.',
      challenges: [
        'Designing a high-throughput data sync connector that prevents API rate-limiting on external client data sources.',
        'Developing a fast, low-footprint background worker task system inside FastAPI using Celery.'
      ],
      results: [
        'Optimized dashboard loading times by 68% using server-side caching and dynamic client chunks.',
        'Helped beta clients automate up to 14 hours of manual reports weekly.'
      ],
      metrics: [
        { label: 'Weekly Hours Saved', value: '14 hrs', status: 'changed' },
        { label: 'Page Load Speed', value: '0.42s', status: 'stable' }
      ]
    }
  },
  {
    slug: 'mon5majeur',
    title: 'Mon5majeur',
    description: 'A sports-analytics platform for basketball enthusiasts, enabling player draft simulations, metrics tracking, and performance visualizations.',
    before: 'Basketball coaches and amateur scouts spent hours reading dry statistic sheets, lacking a visual tool to simulate matchups or track real-time player distributions.',
    after: 'Designed a React Native + Next.js web application utilizing dynamic radars, radar charts, and comparison layouts to instantly benchmark and simulate player compositions.',
    status: 'shipped',
    role: 'Lead Frontend Architect',
    tags: ['Next.js', 'React Native', 'ChartJS/Recharts', 'Tailwind CSS'],
    caseStudy: {
      overview: 'Mon5majeur is a premium web and mobile tool that visualizes professional basketball stats to assist in drafting team configurations and comparing player capabilities.',
      methodology: 'Built using Next.js for the administrative web interface and React Native for the mobile app, sharing a unified state-management layer. Visual charts are rendered dynamically using SVG-based graphics.',
      challenges: [
        'Maintaining responsive design performance when rendering complex radar graphs with multiple player overlapping metrics.',
        'Synchronizing player stats dynamically with upstream sports feeds.'
      ],
      results: [
        'Rendered smooth animations for player stat overlays using native CSS transition properties.',
        'Acquired over 1,200 active scouts during the regional draft tournament.'
      ],
      metrics: [
        { label: 'Active Scouts', value: '1,200+', status: 'changed' },
        { label: 'Chart Render Latency', value: '< 15ms', status: 'stable' }
      ]
    }
  },
  {
    slug: 'myfutureabroad',
    title: 'MyFutureAbroad',
    description: 'An AI-powered academic and visa matching platform helping students evaluate university opportunities and documentation validity.',
    before: 'Aspiring students had to navigate hundreds of university catalogs manually and submit visa documents with high margins of checklist errors, leading to frequent rejections.',
    after: 'An intelligent portal containing a lightweight recommendation engine that compares academic profiles and checks uploaded PDFs against country-specific visa rule maps.',
    status: 'shipped',
    role: 'Full Stack Engineer',
    tags: ['FastAPI', 'React', 'PDF Parsing', 'Recommendation Engine', 'SQLAlchemy'],
    demoUrl: 'https://myfutureabroad.demo',
    caseStudy: {
      overview: 'MyFutureAbroad streamlines the overseas education process by using algorithmic profiling to match student backgrounds to international universities and auto-auditing required paperwork.',
      methodology: 'The application backend uses FastAPI to parse student parameters (grades, budget, test scores) and query matching matrices. The documentation checker uses PyPDF2 and custom rule matchers to flag missing fields in real-time.',
      challenges: [
        'Building a reliable PDF layout parser that detects signature blocks, dates, and stamps accurately across arbitrary visa document layouts.',
        'Calculating recommendation ranks efficiently across a database of 10,000+ course listings.'
      ],
      results: [
        'Created a document checklist parser with a 94.2% accuracy in spotting incomplete fields.',
        'Reduced student visa pre-screen processing times from hours to under 30 seconds.'
      ],
      metrics: [
        { label: 'Audit Accuracy', value: '94.2%', status: 'changed' },
        { label: 'Pre-screen Time', value: '30s', status: 'changed' }
      ]
    }
  },
  {
    slug: 'ppe-hazard-detection',
    title: 'PPE & Hazard Detection',
    description: 'Real-time computer vision system detecting personal protective equipment (helmets, vests) in industrial construction sites using YOLO.',
    before: 'Safety inspections relied entirely on human guards monitoring multiple CCTV streams, resulting in missed violations and delayed hazard alerts.',
    after: 'Deployed a YOLOv8 custom-trained detector on edge devices that triggers instant alert banners and writes telemetry logs whenever a PPE violation is detected.',
    status: 'stable',
    role: 'Computer Vision Engineer',
    tags: ['YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI', 'Edge Deployment'],
    repoUrl: 'https://github.com/IH-Arik/ppe-hazard-yolo',
    caseStudy: {
      overview: 'This project implements a computer vision solution on edge-hardware nodes to automate workplace safety enforcement. By analyzing raw CCTV streams, it determines if workers are wearing appropriate hard hats and safety vests.',
      methodology: 'Fine-tuned a YOLOv8 model using a custom labeled dataset of 8,500 construction site frames. The inference pipeline is implemented in PyTorch and optimized using TensorRT for execution on Nvidia Jetson modules.',
      challenges: [
        'Ensuring reliable detector accuracy under severe lighting changes, dust overlays, and partial worker occlusion.',
        'Optimizing inference speed to sustain 30 frames per second on low-power edge computer boards.'
      ],
      results: [
        'Maintained a mean Average Precision (mAP50-95) of 88.7% for helmets and vests.',
        'Sustained 32 FPS inference rate on Nvidia Jetson Nano systems.'
      ],
      metrics: [
        { label: 'mAP (PPE)', value: '88.7%', status: 'stable' },
        { label: 'Inference Speed', value: '32 FPS', status: 'stable' }
      ]
    }
  },
  {
    slug: 'brain-tumor-rag',
    title: 'Brain Tumor Classification RAG',
    description: 'Explainable AI diagnostic tool combining Brain Tumor MRI Classification (CNN) with a Retrieval-Augmented Generation (RAG) assistant for clinical notes.',
    before: 'MRI classifiers output abstract probability scores (e.g., 98.4% Glioma) without medical explanation, making it difficult for clinical teams to verify the diagnostic rationale.',
    after: 'Integrated a PyTorch DenseNet MRI classifier with an LLM RAG engine that queries medical databases to output natural-language clinical reports alongside classification indices.',
    status: 'changed',
    role: 'Applied ML Researcher',
    tags: ['DenseNet', 'PyTorch', 'RAG / LangChain', 'ChromaDB', 'Explainable AI'],
    caseStudy: {
      overview: 'This project targets explainability in medical AI diagnostics. It couples a neural network MRI classifier with an open-source clinical RAG system to generate detailed references explaining the visual indicators of specific tumor classes.',
      methodology: 'The pipeline consists of: 1) A DenseNet-121 model trained on axial brain MRI scans classifying tumors (Glioma, Meningioma, Pituitary, No Tumor). 2) A vector database (ChromaDB) containing clinical oncology guides. 3) A LangChain script that retrieves relevant diagnostic guidelines matching the prediction and formats them as clinical notes.',
      challenges: [
        'Preventing hallucination in LLM-generated clinical notes to ensure all medical statements are backed by physical database references.',
        'Designing a visual activation mapping (Grad-CAM) to overlay the exact MRI regions that triggered the classifier.'
      ],
      results: [
        'Achieved a classification accuracy of 96.5% on independent test subsets.',
        'Generated citation-backed reports for medical personnel, improving trust in automated tumor classification.'
      ],
      metrics: [
        { label: 'Accuracy (DenseNet)', value: '96.5%', status: 'changed' },
        { label: 'RAG Citation Rate', value: '100%', status: 'stable' }
      ]
    }
  },
  {
    slug: 'product-ai-agent',
    title: 'Product AI Agent',
    description: 'Autonomous AI agent system designed to browse product databases, analyze customer requirements, and generate custom sales sheets.',
    before: 'Sales teams spent hours cross-referencing spreadsheet specs and writing tailored emails for prospective leads, limiting daily lead outreach.',
    after: 'Deployed an LLM-agent framework equipped with database tools that parses natural-language prompts to query inventories and automatically draft precise, technical brochures.',
    status: 'shipped',
    role: 'AI Engineer',
    tags: ['LangChain / LangGraph', 'OpenAI API', 'Python', 'FastAPI', 'Svelte'],
    caseStudy: {
      overview: 'The Product AI Agent is a workspace utility that automates complex product lookup, configuration matching, and technical proposal drafting using chain-of-thought execution.',
      methodology: 'Developed using LangGraph to enable cyclical reasoning loops. The agent can invoke custom tools (e.g. database lookups, PDF generation libraries) to gather product specs and generate structured markdown sales materials.',
      challenges: [
        'Constraining LLM agent actions to prevent infinite tool-calling loops when specific search results return empty.',
        'Parsing unstructured customer specification notes containing non-standard terminology.'
      ],
      results: [
        'Cut proposal generation times down from 45 minutes to 15 seconds per lead.',
        'Successfully integrated with internal corporate inventories using Postgres vector matching.'
      ],
      metrics: [
        { label: 'Gen Latency', value: '15s', status: 'changed' },
        { label: 'Database Accuracy', value: '99.1%', status: 'stable' }
      ]
    }
  }
];
