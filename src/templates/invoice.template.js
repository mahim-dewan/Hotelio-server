const PDFDocument = require("pdfkit");

// variables
const primaryColor = "#00040e";
const white = "#ffffff";
const secondaryColor = "#4C8CE4";
const grayColor = "#b4b4b4";
const highlightColor = "#008000";

const primaryFont = "Helvetica";
const secondaryFont = "Helvetica-Oblique";
const boldFont = "Helvetica-Bold";

const buildPDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      drawHeader(doc, data);
      drawBooking(doc, data);
      drawRoom(doc, data);
      drawPayments(doc, data);
      drawSummary(doc, data);
      drawFooter(doc, data);

      doc.end();
    } catch (err) {
      console.log(err);
    }
  });
};

// Draw Header
const drawHeader = (doc, data) => {
  // HEADER BACKGROUND
  doc
    .rect(0, 0, 612, 110) // x, y, width, height
    .fill(primaryColor);

  // HOTEL NAME
  doc
    .fillColor(white)
    .font(boldFont)
    .fontSize(28)
    .text("HOTELIO", 50, 30, { characterSpacing: 2 });

  // SUBTITLE
  doc
    .font(primaryFont)
    .fontSize(10)
    .fillColor("#cbd5f5")
    .text("OFFICIAL PAYMENT CONFIRMATION", 50, 60);

  // QR CODE
  doc.image(data.qrCode, 480, 15, {
    width: 80,
    height: 80,
  });
};

// Draw Booking
const drawBooking = (doc, data) => {
  let y = 140;

  // Booking ID and Status
  doc
    .font(primaryFont)
    .fillColor(primaryColor)
    .fontSize(14)
    .text(`Booking ID : ${data.booking?._id}`, 50, y);

  // Badge background
  doc.roundedRect(444, y - 10, 115, 30, 8).fill("#dcfce7");

  // Badge text
  doc
    .fillColor("green") // green text
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(`Booking ${data.booking?.status}`, 454, y);

  y += 25;
  doc.rect(50, y, 512, 1).fill(grayColor);
};

// Draw Room Details
const drawRoom = (doc, data) => {
  let y = 180;

  doc
    .fillColor(secondaryColor)
    .font(primaryFont)
    .fontSize(18)
    .text("Reservation Details", 50, y);

  y += 30;
  //Room No.
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Room No.", 50, y);

  y += 15;

  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(data.room.number || "N/A", 50, y + 5);

  // Check In
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Check In", 250, y - 15);

  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(new Date(data.booking.checkIn).toLocaleDateString(), 250, y + 5);

  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(`02:00 PM`, 250, y + 20);

  // Check Out
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Check Out", 450, y - 15);

  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(new Date(data.booking.checkOut).toLocaleDateString(), 450, y + 5);

  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(`11:00 AM`, 450, y + 20);

  y += 50;

  // Guest Capacity
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Guest Occupancy", 50, y);
  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(`${data.room.capacity} Persons`, 50, y + 20);

  // Room Size
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Room Size", 250, y);
  doc
    .fillColor(primaryColor)
    .font(boldFont)
    .fontSize(16)
    .text(`${data.room.size} sq ft`, 250, y + 20);
};

// Draw Payments Detail
const drawPayments = (doc, data) => {
  let y = 330;

  doc
    .fillColor(secondaryColor)
    .font(primaryFont)
    .fontSize(18)
    .text(`Payment Details`, 50, y);

  y += 40;
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Payment_id", 50, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Method", 260, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Amount", 400, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Status", 500, y);
  doc.rect(50, y + 20, 512, 1).fill(grayColor);

  {
    data.payments?.forEach((payment) => {
      if (payment.status !== "success") return null;

      y += 40;

      doc
        .fillColor(primaryColor)
        .font(primaryFont)
        .fontSize(14)
        .text(`${payment._id}`, 50, y, { width: 200 });
      doc
        .fillColor(primaryColor)
        .font(primaryFont)
        .fontSize(14)
        .text(`${payment.method.toUpperCase()}`, 260, y);
      doc
        .fillColor(primaryColor)
        .font(primaryFont)
        .fontSize(14)
        .text(`${payment.amount} ${payment.currency}`, 400, y);
      doc
        .fillColor(primaryColor)
        .font(boldFont)
        .fontSize(14)
        .text(`PAID`, 510, y);
    });
  }
};

// Draw Summary
const drawSummary = (doc, data) => {
  let y = 500;
  // Calculation Box
  doc.roundedRect(250, y, 300, 150, 10).fill("#ececec");

  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Gross Total", 270, y + 20);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text(`${data.gross} USD`, 450, y + 20);

  y += 40;
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Discount", 270, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text(`${data.booking.discount} %`, 450, y);

  y += 20;
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text("Payable Amount", 270, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(14)
    .text(`${data.booking.totalPrice} USD`, 450, y);

  doc.rect(260, y + 20, 280, 1).fill(grayColor);

  y += 30;
  doc
    .fillColor(secondaryColor)
    .font(boldFont)
    .fontSize(20)
    .text("Total Paid", 270, y);
  doc
    .fillColor(secondaryColor)
    .font(boldFont)
    .fontSize(20)
    .text(`${data.totalPaidAmount} USD`, 450, y);

  y += 30;
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(16)
    .text("Due", 272, y);
  doc
    .fillColor(primaryColor)
    .font(primaryFont)
    .fontSize(16)
    .text(`${data.due} USD`, 450, y);
};

// Draw Footer
const drawFooter = (doc, data) => {
  let y = 730;

  doc.rect(50, y, 512, 1).fill(grayColor);

  y += 20;
  doc
    .fillColor(grayColor)
    .font(secondaryFont)
    .fontSize(10)
    .text(
      "This document serves as an official receipt for the transactions listed above. For assistance, please contact our concierge at support@hotelio.com.",
      50,
      y,
      { width: 300, align: "justify" },
    );
  doc
    .fillColor(grayColor)
    .font(secondaryFont)
    .fontSize(10)
    .text("Issue Date", 480, y);
  doc
    .fillColor(grayColor)
    .font(boldFont)
    .fontSize(10)
    .text(
      new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase(),
      480,
      y + 10,
    );
};

module.exports = buildPDF;
