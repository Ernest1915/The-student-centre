import axios from "axios";//my attempt on intergrating mpesa

interface MpesaPayload {
  phoneNumber: string;
  amount: number;
  transactionDesc: string;
}

interface MpesaResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
}

export async function initiateMpesaPayment(payload: MpesaPayload): Promise<MpesaResponse> {
  const { phoneNumber, amount, transactionDesc } = payload;

  const endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const headers = {
    Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  const requestBody = {
    BusinessShortCode: process.env.MPESA_SHORT_CODE,
    Password: process.env.MPESA_PASSWORD,
    Timestamp: new Date().toISOString(),
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORT_CODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: transactionDesc,
    TransactionDesc: transactionDesc,
  };

  try {
    const response = await axios.post(endpoint, requestBody, { headers });
    return response.data;
  } catch (error: any) {
    throw new Error(`M-Pesa Payment Failed: ${error.response?.data || error.message}`);
  }
}
