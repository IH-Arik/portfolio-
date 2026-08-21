import { QAEntry } from '../lib/types';

export const assistantQA: QAEntry[] = [
  {
    keywords: ['strongest', 'best', 'flagship', 'project', 'thesis', 'satellite', 'damage'],
    answer: 'Arik\'s flagship project is the Building Damage Assessment (thesis flagship) system. It features a custom bi-temporal Siamese Network in PyTorch that compares pre- and post-disaster satellite imagery. It automates structural damage assessment by mapping feature changes in embedding spaces, achieving a 91.4% F1-score and rendering results in seconds instead of days.',
    category: 'projects',
  },
  {
    keywords: ['fastapi', 'backend', 'python', 'async', 'api', 'celery'],
    answer: 'Arik is highly experienced in FastAPI. He uses it to architect asynchronous, type-safe API endpoints for SaaS platforms (such as Mabdel AI and MyFutureAbroad). His typical backend stack combines FastAPI with SQLAlchemy, PostgreSQL, Celery background tasks, and Docker orchestration for containerized microservice deployments.',
    category: 'skills',
  },
  {
    keywords: ['pytorch', 'deep learning', 'ml', 'machine learning', 'neural', 'models', 'densenet'],
    answer: 'Arik\'s deep learning capabilities are built on PyTorch. Key models he has designed and trained include: 1) Siamese networks for satellite imagery damage maps, 2) DenseNet-121 classifiers for brain tumor MRI classification, and 3) YOLOv8 custom boundary detectors for industrial site safety operations.',
    category: 'skills',
  },
  {
    keywords: ['computer vision', 'vision', 'yolo', 'opencv', 'segmentation', 'image'],
    answer: 'In computer vision, Arik specializes in object detection and image segmentation. He custom-trained a YOLOv8 safety compliance detector (PPE & Hazard Detection) on 8,500 frames and developed a dual-wavelet decomposition filter to segment ultrasound cavities (RDWS-EKSD kidney stone segmentation), suppressing 82% of ultrasonic speckle noise.',
    category: 'skills',
  },
  {
    keywords: ['research', 'publication', 'paper', 'papers', 'ieee', 'vdal', 'lab'],
    answer: 'Arik conducts applied AI research at the Visual Data Analysis Lab (VDAL). He has co-authored two papers: 1) A hybrid ML ensemble paper for high-accuracy Thyroid Disorder Classification (Dec 2025, 99.4% validation accuracy), and 2) the RDWS-EKSD kidney stone detection segmentation paper (IEEE, 97.8% segmentation IoU).',
    category: 'research',
  },
  {
    keywords: ['bio', 'about', 'who is', 'arik', 'education', 'university', 'green'],
    answer: 'Md. Hossain (Arik) is a final-year Computer Science & Engineering (CSE) student at the Green University of Bangladesh. He is a freelance software developer for small teams and a graduate researcher at the Visual Data Analysis Lab (VDAL). He specializes in applied computer vision and full-stack SaaS engineering.',
    category: 'bio',
  },
  {
    keywords: ['contact', 'hire', 'email', 'github', 'links', 'researchgate'],
    answer: 'You can establish connection with Arik via email at ittesham02@gmail.com. You can also explore his code repositories on GitHub (github.com/IH-Arik) or check his academic researcher index on ResearchGate (researchgate.net/profile/Md-Hossain-1936).',
    category: 'bio',
  },
  {
    keywords: ['saas', 'web', 'react', 'next', 'nextjs', 'typescript', 'frontend'],
    answer: 'Arik builds frontends using Next.js (App Router), React, React Native, and Svelte. He designs highly responsive, type-safe layouts optimized for swift page loads. Examples of his frontend work include Mabdel AI, the basketball scouting tool Mon5majeur, and MyFutureAbroad.',
    category: 'skills',
  }
];
