import html2canvas from 'html2canvas';


export const downloadPoster = async (elementRef, filename = 'poster') => {
  if (!elementRef.current) {
    console.error('Element reference is null');
    return;
  }
  
  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1200,
      windowHeight: 800
    });
    
  
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = url;
        link.click();
        
       
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);
  } catch (error) {
    console.error('Error downloading poster:', error);
    throw error;
  }
};
