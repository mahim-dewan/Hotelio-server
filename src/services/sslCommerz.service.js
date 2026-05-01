// src/services/sslCommerz.service.js

const SSLCommerzPayment = require("sslcommerz-lts");
const { createPaymentRecord } = require("./payment.service");

const store_id = process.env.SSLC_STORE_ID;
const store_passwd = process.env.SSLC_STORE_PASS;
const is_live = false;

const createSSLPaymentService = async (payload) => {
  const { price, booking, paymentId } = await createPaymentRecord(payload);

  const tranId = `BOOK_${booking._id}_${Date.now()}`;

  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: tranId,

    success_url: `${process.env.SERVER_URL}/payments/sslc/successPayment`,
    fail_url: `${process.env.SERVER_URL}/payments/sslc/failPayment`,
    cancel_url: `${process.env.SERVER_URL}/payments/sslc/cancelPayment`,

    product_name: booking.room.title,
    product_category: "Hotel",
    product_profile: "general",

    cus_name: booking.user.name,
    cus_email: booking.user.email,

    shipping_method: "NO",

    value_a: paymentId.toString(),
  };

  const sslCZ = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const apiResponse = await sslCZ.init(data);

  return apiResponse.GatewayPageURL;
};

module.exports = { createSSLPaymentService };
