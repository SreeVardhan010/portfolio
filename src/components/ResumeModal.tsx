import React from 'react';
import { X, Download, Printer, FileText, ExternalLink } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const content = `SREEVARDHAN CAPILAI
Chennai, India | +91 8333932424 | sreevardhan886@gmail.com | linkedin.com/in/sreevardhan-capilai/ | github.com/SreeVardhan010

PROFESSIONAL SUMMARY
Final-year Computer Science undergraduate (CGPA 9.05) with hands-on experience building machine learning, web, and data engineering projects. Proficient in Python, Java, and SQL, with practical exposure to XGBoost, Apache Spark, and Apache Kafka. Certified in Machine Learning, Data Science, and Data Mining through NPTEL. Seeking a software engineering or data science role to apply strong problem-solving and analytical skills to real-world engineering challenges.

EDUCATION
• B.Tech, Computer Science and Engineering — SRM University, Chennai (Jul 2022 – May 2026)
  CGPA: 9.05 / 10
• Intermediate (MPC) — Narayana Junior College, Hyderabad (Jun 2020 – Mar 2022)
  CGPA: 9.6 / 10
• SSC — Narayana Olympiad School, Hyderabad (Jun 2019 – Mar 2020)
  CGPA: 10.0 / 10

TECHNICAL SKILLS
• Programming Languages: Python, Java, C, Data Structures & Algorithms
• Web Technologies: HTML, CSS, JavaScript
• Databases: SQL, MongoDB
• Machine Learning: XGBoost, Scikit-learn, TensorFlow, Feature Engineering, Model Evaluation, Jupyter Notebook
• Data Engineering: Apache Spark, Apache Kafka, Pandas, NumPy, Matplotlib, Seaborn, librosa
• Tools & Platforms: Git, GitHub, VS Code, Eclipse IDE, Linux, Kubernetes (basics)

PROJECTS
Telecom Customer Churn Prediction using Machine Learning & Big Data
• Built an end-to-end churn prediction pipeline using XGBoost and SMOTE to improve detection of at-risk customers on imbalanced data.
• Increased predictive performance over baseline models through systematic hyperparameter tuning and feature engineering.
• Engineered scalable data workflows with Apache Spark and implemented real-time data ingestion using Apache Kafka.
• Translated model outputs into visual dashboards to support data-driven customer retention strategies.

Speech Emotion Recognition System
• Developed a speech-emotion recognition pipeline to classify emotional states from raw audio using feature extraction and machine learning.
• Implemented end-to-end audio preprocessing and feature engineering (MFCCs, spectrograms) with librosa to convert audio into model-ready features.
• Trained and evaluated classification models with scikit-learn and TensorFlow in Jupyter Notebook, and tracked iterations using GitHub.

Tomato — Web-Based Food Ordering and Delivery System
• Built a full-stack food ordering platform enabling customers to browse restaurants, place orders, and track deliveries in real time.
• Developed restaurant-side tools for menu management, sales tracking, and live order-status updates.
• Integrated Stripe for secure online payment processing using HTML, CSS, and MySQL.

Music Recommendation System
• Designed a music recommendation engine that analyzed user listening patterns and song attributes from structured dataset inputs.
• Applied filtering techniques to generate personalized song suggestions based on user preferences and audio features.
• Improved recommendation relevance by incorporating real-time user feedback into the filtering process.

CERTIFICATIONS & COURSES
• NPTEL: Machine Learning, Data Science, Data Mining, Design & Analysis of Algorithms
• Other Certifications: JavaScript (Infosys) | Database Management Systems (Oracle) | Basic Linux (Simplilearn) | Basic Kubernetes (Simplilearn)

LANGUAGES
English (Advanced) | Telugu (Native) | Hindi (Intermediate)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sreevardhan_Capilai_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Controls Toolbar */}
        <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">SREEVARDHAN CAPILAI — RESUME (ORIGINAL FORMAT)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition-colors shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD TXT</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Original Clean PDF Document Wrapper */}
        <div className="p-6 sm:p-12 overflow-y-auto bg-slate-100 print:bg-white text-slate-900 font-sans leading-normal selection:bg-blue-200">
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-lg print:shadow-none print:p-0 rounded border border-slate-200 print:border-none space-y-6 text-sm text-slate-800">
            
            {/* Header */}
            <div className="text-center border-b border-slate-300 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                SREEVARDHAN CAPILAI
              </h1>
              <div className="mt-2 text-xs text-slate-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                <span>Chennai, India</span>
                <span>•</span>
                <span>+91 8333932424</span>
                <span>•</span>
                <a href="mailto:sreevardhan886@gmail.com" className="text-blue-700 hover:underline">
                  sreevardhan886@gmail.com
                </a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/sreevardhan-capilai/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-0.5">
                  linkedin.com/in/sreevardhan-capilai
                  <ExternalLink className="w-2.5 h-2.5 inline" />
                </a>
                <span>•</span>
                <a href="https://github.com/SreeVardhan010" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-0.5">
                  github.com/SreeVardhan010
                  <ExternalLink className="w-2.5 h-2.5 inline" />
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                Final-year Computer Science undergraduate (CGPA 9.05) with hands-on experience building machine learning, web, and data engineering projects. Proficient in Python, Java, and SQL, with practical exposure to XGBoost, Apache Spark, and Apache Kafka. Certified in Machine Learning, Data Science, and Data Mining through NPTEL. Seeking a software engineering or data science role to apply strong problem-solving and analytical skills to real-world engineering challenges.
              </p>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center font-bold text-slate-900">
                    <span>B.Tech, Computer Science and Engineering — SRM University, Chennai</span>
                    <span className="text-slate-600 font-normal text-xs">Jul 2022 – May 2026</span>
                  </div>
                  <div className="text-slate-700 text-xs italic">CGPA: 9.05 / 10</div>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center font-bold text-slate-900">
                    <span>Intermediate (MPC) — Narayana Junior College, Hyderabad</span>
                    <span className="text-slate-600 font-normal text-xs">Jun 2020 – Mar 2022</span>
                  </div>
                  <div className="text-slate-700 text-xs italic">CGPA: 9.6 / 10</div>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center font-bold text-slate-900">
                    <span>SSC — Narayana Olympiad School, Hyderabad</span>
                    <span className="text-slate-600 font-normal text-xs">Jun 2019 – Mar 2020</span>
                  </div>
                  <div className="text-slate-700 text-xs italic">CGPA: 10.0 / 10</div>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                <div>
                  <strong className="font-semibold text-slate-900">Programming Languages: </strong>
                  <span>Python, Java, C, Data Structures & Algorithms</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Web Technologies: </strong>
                  <span>HTML, CSS, JavaScript</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Databases: </strong>
                  <span>SQL, MongoDB</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Machine Learning: </strong>
                  <span>XGBoost, Scikit-learn, TensorFlow, Feature Engineering, Model Evaluation, Jupyter Notebook</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Data Engineering: </strong>
                  <span>Apache Spark, Apache Kafka, Pandas, NumPy, Matplotlib, Seaborn, librosa</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Tools & Platforms: </strong>
                  <span>Git, GitHub, VS Code, Eclipse IDE, Linux, Kubernetes (basics)</span>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                PROJECTS
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Telecom Customer Churn Prediction using Machine Learning & Big Data
                  </h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                    <li>Built an end-to-end churn prediction pipeline using XGBoost and SMOTE to improve detection of at-risk customers on imbalanced data.</li>
                    <li>Increased predictive performance over baseline models through systematic hyperparameter tuning and feature engineering.</li>
                    <li>Engineered scalable data workflows with Apache Spark and implemented real-time data ingestion using Apache Kafka.</li>
                    <li>Translated model outputs into visual dashboards to support data-driven customer retention strategies.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Speech Emotion Recognition System
                  </h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                    <li>Developed a speech-emotion recognition pipeline to classify emotional states from raw audio using feature extraction and machine learning.</li>
                    <li>Implemented end-to-end audio preprocessing and feature engineering (MFCCs, spectrograms) with librosa to convert audio into model-ready features.</li>
                    <li>Trained and evaluated classification models with scikit-learn and TensorFlow in Jupyter Notebook, and tracked iterations using GitHub.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Tomato — Web-Based Food Ordering and Delivery System
                  </h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                    <li>Built a full-stack food ordering platform enabling customers to browse restaurants, place orders, and track deliveries in real time.</li>
                    <li>Developed restaurant-side tools for menu management, sales tracking, and live order-status updates.</li>
                    <li>Integrated Stripe for secure online payment processing using HTML, CSS, and MySQL.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Music Recommendation System
                  </h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                    <li>Designed a music recommendation engine that analyzed user listening patterns and song attributes from structured dataset inputs.</li>
                    <li>Applied filtering techniques to generate personalized song suggestions based on user preferences and audio features.</li>
                    <li>Improved recommendation relevance by incorporating real-time user feedback into the filtering process.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Certifications & Courses */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                CERTIFICATIONS & COURSES
              </h2>
              <div className="space-y-1 text-xs sm:text-sm text-slate-800">
                <div>
                  <strong className="font-semibold text-slate-900">NPTEL: </strong>
                  <span>Machine Learning, Data Science, Data Mining, Design & Analysis of Algorithms</span>
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Other Certifications: </strong>
                  <span>JavaScript (Infosys) | Database Management Systems (Oracle) | Basic Linux (Simplilearn) | Basic Kubernetes (Simplilearn)</span>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                LANGUAGES
              </h2>
              <p className="text-xs sm:text-sm text-slate-800">
                English (Advanced) | Telugu (Native) | Hindi (Intermediate)
              </p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
