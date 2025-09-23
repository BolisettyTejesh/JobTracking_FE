import React, { useState } from 'react';
import './FAQ.css';
import Header from './Header_out';
const faqs = [
  {
    question: 'What is a Job Application Tracker?',
    answer: 'A Job Application Tracker helps you organize and monitor your job applications, including the roles you applied for, the companies, application status, and follow-ups.'
  },
  {
    question: 'How do I add a new job application?',
    answer: 'You can add a new job application by clicking the "Add Application" button and filling out the required job details such as company name, position, and application date.'
  },
  {
    question: 'Can I track multiple job applications at once?',
    answer: 'Yes, the tracker is designed to manage multiple applications simultaneously, allowing you to update and filter them as needed.'
  },
  {
    question: 'How do I update the status of my application?',
    answer: 'Select the relevant application record and use the status dropdown to update its current stage, such as Applied, Interview, Offer, or Rejected.'
  },
  {
    question: 'Is it possible to set reminders for follow-ups?',
    answer: 'Yes, you can set reminders or notes for each application to follow up with employers at appropriate times.'
  },
  {
    question: 'Can I upload my resume or cover letter with the application?',
    answer: 'Many trackers allow attaching files like resumes or cover letters to each job application for easy reference.'
  },
  {
    question: 'How do I search or filter job applications?',
    answer: 'Use the search bar or filter options to find applications by company name, job title, or status.'
  },
  {
    question: 'Is my data saved if I close the browser?',
    answer: 'Depending on the app, data may be saved locally in your browser or synced to cloud storage for persistent access.'
  },
  {
    question: 'Can I export my job application data?',
    answer: 'Some trackers allow exporting your data in formats like CSV or PDF to share or archive your progress.'
  },
  {
    question: 'Is this application free to use?',
    answer: 'Many job application trackers offer free tiers with optional premium features. Check the pricing page for details.'
  },
  {
    question: 'Can I use the tracker on mobile devices?',
    answer: 'Most modern trackers have responsive designs or dedicated mobile apps, enabling you to manage your applications anywhere.'
  },
  {
    question: 'How secure is my data?',
    answer: 'Reputable applications use encryption and secure servers to protect your personal information and job application details.'
  },
  {
    question: 'Can I customize the fields in my applications?',
    answer: 'Advanced trackers often allow customization of fields to suit your tracking preferences.'
  },
  {
    question: 'Is there a way to set job search goals?',
    answer: 'Some applications include features to help you set goals and track your progress over time.'
  },
  {
    question: 'What should I do if I encounter a bug or issue?',
    answer: 'Most apps provide support channels such as email or chat to report problems and get assistance.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" role="region" aria-label="Frequently Asked Questions">
      <Header></Header>
      <h1 className="faq-title">FAQ.S</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <button
              className="faq-question"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className={`arrow ${openIndex === index ? 'open' : ''}`} aria-hidden="true">&#9662;</span>
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`faq-answer ${openIndex === index ? 'show' : ''}`}
            >
              {faq.answer}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
