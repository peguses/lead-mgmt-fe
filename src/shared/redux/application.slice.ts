import { createSlice } from "@reduxjs/toolkit";

export interface WorkInformation {
  employmentType: string;
  occupation: string;
  employerContactName: string;
  businessName: string;
  employerPhoneNumber: string;
  employerEmail: string;
  employerABN: string;
  employerAddress: string;
  employerSuburb: string;
  employerState: string;
  employerPostCode: string;
  currentEmploymentStartDate: Date;
  probationaryEmployee: boolean;
}

export interface GeneralInformation {
  numberOfDependant: number;
  hasPropertyOffer: boolean;
  propertyOfferElaboration: string;
  applicantOptionalNote: string;
  referralOption: string;
  applicantAgreedOnConditions: boolean;
}

export interface FinancialInformation {
  annualIncome: number;
  lengthOfEmployment: number;
  totalAmountSaved: number;
  parentWillBeGuarantors: boolean;
  totalLoanAmount: number;
  totalLoanRepayments: number;
  helpDebtTotalAmount: number;
  totalExistingHomeLoanAmount: number;
  totalExistingHomeLoanRepaymentAmt: number;
  totalPropertyValue: number;
  totalCreditCardLimits: number;
  livingExpenses: number;
  wereBankrupted: boolean;
  hasDefaulted: boolean;
  defaultedReason: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  state: string;
  residencyStatus: string;
  investmentType: string;
  firstTimeBuyer: boolean;
  stateCapitalCityBuyer: boolean;
  buyerAgreedToConnectWithAgent: boolean;
}

export interface Applicant {
  personalInformation?: PersonalInformation;
  workInformation?: WorkInformation;
  financialInformation?: FinancialInformation;
}

export interface Application {
  applicationId: string | undefined;
  referrer: string | undefined;
  referrerId: string;
  jointLoan: boolean;
  generalInformation: GeneralInformation | undefined;
  applicationStatus: ApplicationStatus;
  primaryApplicant: Applicant | undefined;
  secondaryApplicant: Applicant | undefined;
}

export enum ApplicationStatus {
  Inquiry = "INQUIRY",
  Deal = "DEAL",
  Processing = "PROCESSING",
  Approved = "APPROVED",
  Canceled = "CANCELLED",
  Settled = "SETTLED",
  Paid = "PAID",
}

const INITIAL_STATE: Application = {
  applicationId: "",
  referrer: "",
  referrerId: "",
  jointLoan: false,
  applicationStatus: ApplicationStatus.Inquiry,
  primaryApplicant: undefined,
  secondaryApplicant: undefined,
  generalInformation: {
    numberOfDependant: 0,
    hasPropertyOffer: false,
    propertyOfferElaboration: "",
    applicantOptionalNote: "",
    referralOption: "",
    applicantAgreedOnConditions: false,
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: INITIAL_STATE,
  reducers: {
    setJoinLoanApplication: (state, action) => {
      state.jointLoan = action.payload;
    },

    addOrUpdatePrimaryApplicantPersonalInformation: (state, action) => {
      state.primaryApplicant = {
        ...state.primaryApplicant,
        personalInformation: action.payload,
      };
    },

    addOrUpdatePrimaryApplicantWorkInformation: (state, action) => {
      state.primaryApplicant = {
        ...state.primaryApplicant,
        workInformation: action.payload,
      };
    },

    addOrUpdatePrimaryApplicantFinancialInformation: (state, action) => {
      state.primaryApplicant = {
        ...state.primaryApplicant,
        financialInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantPersonalInformation: (state, action) => {
      state.secondaryApplicant = {
        ...state.secondaryApplicant,
        personalInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantWorkInformation: (state, action) => {
      state.secondaryApplicant = {
        ...state.secondaryApplicant,
        workInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantFinancialInformation: (state, action) => {
      state.secondaryApplicant = {
        ...state.secondaryApplicant,
        financialInformation: action.payload,
      };
    },

    addOrUpdateGeneralInformation: (state, action) => {
      state.generalInformation = action.payload;
    },

    removeGeneralInforamtion: (state) => {
      state.generalInformation = undefined;
    },

    removePrimaryApplicant: (state) => {
      state.primaryApplicant = {
        ...state.primaryApplicant,
        personalInformation: undefined,
        workInformation: undefined,
        financialInformation: undefined,
      };
    },

    removeSecondaryApplicant: (state) => {
      state.secondaryApplicant = {
        ...state.secondaryApplicant,
        personalInformation: undefined,
        workInformation: undefined,
        financialInformation: undefined,
      };
    },
  },
});

export const {
  setJoinLoanApplication,
  addOrUpdatePrimaryApplicantPersonalInformation,
  addOrUpdatePrimaryApplicantWorkInformation,
  addOrUpdatePrimaryApplicantFinancialInformation,
  addOrUpdateSecondaryApplicantPersonalInformation,
  addOrUpdateSecondaryApplicantWorkInformation,
  addOrUpdateSecondaryApplicantFinancialInformation,
  removeSecondaryApplicant,
  removeGeneralInforamtion,
  removePrimaryApplicant,
  addOrUpdateGeneralInformation
} = applicationSlice.actions;
export default applicationSlice.reducer;
