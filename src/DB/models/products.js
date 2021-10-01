import mongoose from "mongoose";

const schema = new mongoose.Schema({
  productId: Number,
  productName: String,
  global: Boolean,
  denominationType: String,
  recipientCurrencyCode: String,
  minRecipientDenomination: Number,
  maxRecipientDenomination: Number,
  senderCurrencyCode: String,
  minSenderDenomination: Number,
  maxSenderDenomination: Number,
  fixedRecipientDenominations: [Number],
  fixedSenderDenominations: [Number],
  fixedRecipientToSenderDenominationsMap: Object,
  logoUrls: [String],
  brand: {
    brandId: Number,
    brandName: String,
  },
  country: {
    isoName: String,
    name: String,
    flagUrl: String,
  },
});

export default mongoose.model("Product", schema);
