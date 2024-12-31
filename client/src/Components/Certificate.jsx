import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/img/ima-ams-logo.jpg"; // Logo path
import secretarySignature from "../assets/img/secretary-sign.jpg";
import chairmanSignature from "../assets/img/chairman-sign.png";

const Certificate = ({
  membershipNumber = "LM-12345",
  doctorName = "Dr. John Doe",
  address = "Hyderabad, Telangana",
  branch = "Hyderabad Branch",
  date = "10-Dec-2024",
}) => {
  const exportAsPDF = () => {
    const certificate = document.querySelector(".certificate");
    html2canvas(certificate, {
      scale: 3, // Increase resolution for better clarity
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Fit to A4 dimensions
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div>
      <div className="certificate" style={certificateStyle}>
        {/* Logo at the top center */}
        <p className="membership-number" style={membershipNumberStyle}>
          Life Membership No: {membershipNumber}
        </p>
        {logo && <img src={logo} alt="Logo" className="certificate-logo" style={logoStyle} />}

        <div className="certificate-header" style={headerStyle}>
          <h2 style={headerTextStyle}>I.M.A. ACADEMY OF MEDICAL SPECIALTIES</h2>
          <h3 style={subHeaderStyle}>Headquarters</h3>
          <p style={addressStyle}>#105, IMA Building, Esamia Bazar, Koti, Hyderabad, Telangana</p>
        </div>

        <div className="certificate-body" style={bodyStyle}>
          <p style={bodyTextStyle}>This is to certify that</p>
          <h3 style={doctorNameStyle}>{doctorName}</h3>
          <p style={bodyTextStyle}>Resident of</p>
          <h4 style={addressTextStyle}>{address}</h4>
          <p style={bodyTextStyle}>is a</p>
          <h2 className="life-member" style={lifeMemberStyle}>LIFE MEMBER</h2>
          <p style={bodyTextStyle}>of the I.M.A. Academy of Medical Specialties</p>
          <p style={bodyTextStyle}>{branch}</p>
        </div>

        <div className="certificate-footer" style={footerStyle}>
          <div className="signature" style={signatureStyle}>
            {chairmanSignature && (
              <img src={chairmanSignature} alt="Chairman Signature" style={signatureImageStyle} />
            )}
            <p style={signatureTextStyle}>Chairman</p>
          </div>
          <div className="signature" style={signatureStyle}>
            {secretarySignature && (
              <img src={secretarySignature} alt="Secretary Signature" style={signatureImageStyle} />
            )}
            <p style={signatureTextStyle}>Hony. Secretary</p>
          </div>
        </div>

        <p className="date" style={dateStyle}>Date: {date}</p>
      </div>

      {/* Export Button */}
      <button className="download-button" onClick={exportAsPDF} style={downloadButtonStyle}>
        Download Certificate
      </button>
    </div>
  );
};

// Styles
const certificateStyle = {
  width: "800px",
  margin: "0 auto",
  padding: "20px",
  border: "2px solid #000",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  textAlign: "center",
  fontFamily: "'Times New Roman', Times, serif",
};

const membershipNumberStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const logoStyle = {
  maxWidth: "150px",
  marginBottom: "20px",
};

const headerStyle = {
  marginBottom: "20px",
};

const headerTextStyle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#18805b",
};

const subHeaderStyle = {
  fontSize: "20px",
  color: "#007a39",
};

const addressStyle = {
  fontSize: "16px",
};

const bodyStyle = {
  marginTop: "20px",
};

const bodyTextStyle = {
  fontSize: "18px",
};

const doctorNameStyle = {
  fontSize: "24px",
  color: "#b30000",

  fontWeight: "bold",
};

const addressTextStyle = {
  fontSize: "20px",
  fontStyle: "italic",
};

const lifeMemberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#006600",
};

const footerStyle = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 30px",
};

const signatureStyle = {
  textAlign: "center",
};

const signatureImageStyle = {
  width: "100px",
  height: "auto",
  marginBottom: "10px",
};

const signatureTextStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "5px",
};

const dateStyle = {
  marginTop: "20px",
  fontSize: "18px",
};

const downloadButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#0044cc",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Certificate;
