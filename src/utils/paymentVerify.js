const axios = require("axios");

const sslcommerzValidator = async (val_id) => {
  const store_id = process.env.SSLC_STORE_ID;
  const store_passwd = process.env.SSLC_STORE_PASS;

  const url = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${store_id}&store_passwd=${store_passwd}&format=json`;

  const response = await axios.get(url);

  return response.data;
};

module.exports = { sslcommerzValidator };
