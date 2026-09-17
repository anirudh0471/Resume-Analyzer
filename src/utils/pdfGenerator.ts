import { jsPDF } from 'jspdf';
import { ResumeAnalysisResult } from '../types';

export function generatePdfReport(data: ResumeAnalysisResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  }

  function drawHeaderFooter() {
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 165);
    doc.text('ResumeAI — Confidential AI Resume Analysis & Compatibility Report', margin, 10);
    doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 12, pageWidth - margin, 12);
  }

  // Cover / Header
  drawHeaderFooter();

  // Title Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('AI Resume Analysis Report', margin, y + 10);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generated on ${data.analyzedAt || new Date().toLocaleDateString()} | File: ${data.resumeFileName || 'Uploaded Resume'}`, margin, y);
  y += 8;

  // Candidate summary card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(data.candidate.name || 'Candidate', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Target Role: ${data.targetRole || 'Not specified'}${data.companyName ? ` @ ${data.companyName}` : ''}`, margin + 6, y + 14);

  const contactPieces = [
    data.candidate.email,
    data.candidate.phone,
    data.candidate.location,
    data.candidate.linkedin ? 'LinkedIn: Yes' : '',
    data.candidate.github ? 'GitHub: Yes' : '',
  ].filter(Boolean).join('  |  ');
  doc.text(contactPieces, margin + 6, y + 20);
  y += 32;

  // Overall ATS Score Block
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(67, 56, 202); // indigo-700
  doc.text('ATS-STYLE COMPATIBILITY SCORE', margin + 6, y + 8);

  doc.setFontSize(18);
  doc.text(`${data.overallScore} / 100`, margin + 6, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    '*AI-generated compatibility estimate based on our 7-category rubric. Not an official company ATS guarantee.',
    margin + 60,
    y + 16,
    { maxWidth: contentWidth - 65 }
  );
  y += 30;

  // Score Breakdown Table
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Score Breakdown (Defined Rubric)', margin, y);
  y += 6;

  const breakdownRows = [
    { label: 'Keyword Alignment', item: data.scoreBreakdown.keywordAlignment },
    { label: 'Required Skills Match', item: data.scoreBreakdown.skillsMatch },
    { label: 'Experience Relevance', item: data.scoreBreakdown.experienceRelevance },
    { label: 'Projects Relevance', item: data.scoreBreakdown.projectRelevance },
    { label: 'Resume Structure & Readability', item: data.scoreBreakdown.structure },
    { label: 'Achievement & Result Evidence', item: data.scoreBreakdown.achievements },
    { label: 'Education & Certification Relevance', item: data.scoreBreakdown.educationCertification },
  ];

  doc.setFontSize(9);
  breakdownRows.forEach(row => {
    checkPageBreak(12);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 9, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(row.label, margin + 4, y + 6);

    doc.setTextColor(79, 70, 229);
    doc.text(`${row.item?.score ?? 0} / ${row.item?.max ?? 0}`, margin + 85, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const explanation = row.item?.explanation || '';
    doc.text(explanation.slice(0, 75) + (explanation.length > 75 ? '...' : ''), margin + 110, y + 6, {
      maxWidth: contentWidth - 114,
    });
    doc.setFontSize(9);
    y += 9;
  });
  y += 8;

  // Top Strengths & Weaknesses
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Key Strengths & Areas to Improve', margin, y);
  y += 6;

  if (data.strengths && data.strengths.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(16, 185, 129); // emerald-600
    doc.text('Key Strengths Found:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    data.strengths.slice(0, 3).forEach(str => {
      checkPageBreak(8);
      doc.text(`• ${str}`, margin + 4, y, { maxWidth: contentWidth - 8 });
      y += 6;
    });
  }

  y += 2;
  if (data.weaknesses && data.weaknesses.length > 0) {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(245, 158, 11); // amber-600
    doc.text('Key Improvement Areas:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    data.weaknesses.slice(0, 3).forEach(w => {
      checkPageBreak(8);
      doc.text(`• ${w}`, margin + 4, y, { maxWidth: contentWidth - 8 });
      y += 6;
    });
  }
  y += 8;

  // Skills & Keywords Summary
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Skills & Keywords Alignment', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const safeJoin = (arr?: any[]) => {
    if (!arr || !Array.isArray(arr)) return 'None listed';
    return (
      arr
        .map((i) => (typeof i === 'string' ? i : i?.item || i?.skill || i?.keyword || i?.name || ''))
        .filter(Boolean)
        .join(', ') || 'None listed'
    );
  };

  const matchedSkills = safeJoin(data.skills?.matched);
  const missingSkills = safeJoin(data.skills?.missing);
  const matchedKeywords = safeJoin(data.keywords?.matched);
  const missingKeywords = safeJoin(data.keywords?.missing);

  doc.setFont('helvetica', 'bold');
  doc.text('Matched Skills:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(matchedSkills, margin + 30, y, { maxWidth: contentWidth - 32 });
  y += Math.max(7, Math.ceil(matchedSkills.length / 85) * 5);

  checkPageBreak(15);
  doc.setFont('helvetica', 'bold');
  doc.text('Missing Skills:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(missingSkills, margin + 30, y, { maxWidth: contentWidth - 32 });
  y += Math.max(7, Math.ceil(missingSkills.length / 85) * 5);

  checkPageBreak(15);
  doc.setFont('helvetica', 'bold');
  doc.text('Matched Keywords:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(matchedKeywords, margin + 30, y, { maxWidth: contentWidth - 32 });
  y += Math.max(7, Math.ceil(matchedKeywords.length / 85) * 5);

  checkPageBreak(15);
  doc.setFont('helvetica', 'bold');
  doc.text('Missing Keywords:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(missingKeywords, margin + 30, y, { maxWidth: contentWidth - 32 });
  y += Math.max(9, Math.ceil(missingKeywords.length / 85) * 5);

  // Top 5 Recommendations
  if (data.improvements && data.improvements.length > 0) {
    checkPageBreak(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('Top Improvement Priorities', margin, y);
    y += 6;

    data.improvements.slice(0, 5).forEach(imp => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(`${imp.priority}. ${imp.problem}`, margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Action: ${imp.recommendedAction}`, margin + 4, y, { maxWidth: contentWidth - 6 });
      y += 8;
    });
  }

  // Interview Questions Sample
  if (data.interviewQuestions && data.interviewQuestions.length > 0) {
    checkPageBreak(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('Interview Preparation (Sample Questions)', margin, y);
    y += 6;

    data.interviewQuestions.slice(0, 6).forEach((q, idx) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(79, 70, 229);
      doc.text(`[${q.category}] Q${idx + 1}: ${q.question}`, margin, y, { maxWidth: contentWidth });
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Why asked: ${q.whyAsked}`, margin + 4, y, { maxWidth: contentWidth - 6 });
      y += 7;
    });
  }

  // Save the PDF
  const filename = `${(data.candidateName || data.candidate?.name || 'Resume').replace(/\s+/g, '_')}_Analysis_Report.pdf`;
  doc.save(filename);
}

export const generateResumePdfReport = generatePdfReport;
