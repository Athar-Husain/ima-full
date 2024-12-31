import React from "react";
import ProfileForm from "./ProfileForm"; // Import ProfileForm component
import Certificate from "./Certificate"; // Import Certificate component
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const App = () => {
  // Function to trigger certificate download
  const handleDownloadCertificate = () => {
    const certificateComponent = document.querySelector(".certificate");
    if (certificateComponent) {
      html2canvas(certificateComponent, {
        scale: 3, // Increase resolution for better clarity
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Fit to A4 dimensions
        pdf.save("certificate.pdf"); // Download the PDF
      });
    }
  };

  return (
    <div>
      {/* ProfileForm with download certificate functionality */}
      <ProfileForm onDownloadCertificate={handleDownloadCertificate} />
      
      {/* Certificate Component for display */}
      <Certificate
        membershipNumber="LM-12345"
        doctorName="Dr. John Doe"
        address="Hyderabad, Telangana"
        branch="Hyderabad Branch"
        date="10-Dec-2024"
      />
    </div>
  );
};

export default App;
