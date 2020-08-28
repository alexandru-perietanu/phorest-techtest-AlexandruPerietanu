export type ClientData = {
    clientId: String,
    version: String,
    firstName: String,
    lastName: String,
    mobile: String,
    email: String,
    createdAt: String,
    updatedAt: String,
    clientSince: String,
    gender: String,
    notes: String,
    smsMarketingConsent: Boolean,
    emailMarketingConsent: Boolean,
    smsReminderConsent: Boolean,
    emailReminderConsent: Boolean,
    preferredStaffId: String
    creditAccount: {
      creditDays: Number,
      creditLimit: Number
    },
    archived: Boolean,
    deleted: Boolean,
    banned: Boolean
}

export type VoucherData = {
  clientId: String,
  creatingBranchId: String,
  expiryDate: String,
  issueDate: String,
  originalBalance: Number,
  remainingBalance: Number,
  serialNumber: Number,
  voucherId: String
}

export type ValidField = {
  valid: Boolean, 
  errorMessage?: String
}