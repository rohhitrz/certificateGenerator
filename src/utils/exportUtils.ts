import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Function to download certificate as PNG image
export const downloadAsPng = async (elementId: string, fileName: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Use html2canvas to generate image
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable cross-origin images
      logging: false,
      backgroundColor: '#ffffff' // Set white background
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error generating PNG:', error);
    throw error;
  }
};

// Function to download certificate as PDF
export const downloadAsPdf = async (elementId: string, fileName: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Use html2canvas to create an image
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 size in mm: 210 × 297
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 297; // A4 landscape width
    const imgHeight = 210; // A4 landscape height
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Helper function to format current date
export const formatCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}; 