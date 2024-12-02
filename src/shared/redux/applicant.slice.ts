import { createSlice } from "@reduxjs/toolkit";

export interface WorkInformation {
  applicantId: number;
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
  hasPropertyOffer: boolean
  propertyOfferElaboration: string;
  applicantOptionalNote: string;
  referralOption: string;
  applicantAgreedOnConditions: boolean
}

export interface FinancialInformation {
  applicantId: number;
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
  applicantId: number;
}

export interface Application {
  applicationId: string;
  referrer: string;
  referrerId: string;
  jointLoan: boolean;
  personalInformation: PersonalInformation[];
  workInformation: WorkInformation[];
  financialInformation: FinancialInformation[];
  generalInformation: GeneralInformation | undefined;
  applicationStatus: ApplicationStatus
}

export enum ApplicationStatus {
  Inquiry = "INQUIRY",
  Deal = "DEAL",
  Processing = "PROCESSING",
  Approved = "APPROVED",
  Canceled = "CANCELLED",
  Settled = "SETTLED",
  Paid = "PAID"
}

const INITIAL_STATE: Application = {
  applicationId: "",
  referrer: "",
  referrerId: "",
  jointLoan: false,
  applicationStatus: ApplicationStatus.Inquiry,
  personalInformation: [],
  workInformation: [],
  financialInformation: [],
  generalInformation: {
    numberOfDependant: 0,
    hasPropertyOffer: false,
    propertyOfferElaboration: '',
    applicantOptionalNote: '',
    referralOption: '',
    applicantAgreedOnConditions: false
  }
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: INITIAL_STATE,
  reducers: {
    setJoinLoanApplication: (state, action) => {
      state.jointLoan = action.payload;
    },

    addOrUpdatePersonalInformation: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.personalInformation?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.personalInformation[index] = {
          ...state.personalInformation[index],
          ...data,
        };
      } else {
        state.personalInformation.push({ ...data, applicantId: applicantId });
      }
    },

    removePersonalInformation: (state, action) => {
      const { applicantId } = action.payload;
      state.personalInformation = state?.personalInformation?.filter(
        (a) => a.applicantId !== applicantId
      );
    },

    addOrUpdateWorkInformation: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.workInformation?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.workInformation[index] = {
          ...state.workInformation[index],
          ...data,
        };
      } else {
        state.workInformation.push({ ...data, applicantId: applicantId });
      }
    },

    removeWorkInformation: (state, action) => {
        const { applicantId } = action.payload;
        state.workInformation = state?.workInformation?.filter(
          (a) => a.applicantId !== applicantId
        );
    },

    addOrUpdateFinancialInformation: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.financialInformation?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.financialInformation[index] = {
          ...state.financialInformation[index],
          ...data,
        };
      } else {
        state.financialInformation.push({ ...data, applicantId: applicantId });
      }
    },

    removeFinancialInformation: (state, action) => {
      const { applicantId } = action.payload;
      state.financialInformation = state?.financialInformation?.filter(
        (a) => a.applicantId !== applicantId
      );
    },

    addOrUpdateGeneralInformation: (state, action) => {
      state.generalInformation = action.payload;
    },

    resetGeneralInformation:(state) => {
      state.generalInformation = undefined;
    },

    resetPersonalInformation: (state) => {
      state.personalInformation = [];
    },

    resetWorkInformation: (state) => {
      state.workInformation = [];
    },

    resetFinancialInformation: (state) => {
      state.financialInformation = [];
    },
    
  },
});

export const {
  resetPersonalInformation,
  setJoinLoanApplication,
  addOrUpdatePersonalInformation,
  addOrUpdateWorkInformation,
  removePersonalInformation,
  resetWorkInformation,
  removeWorkInformation,
  addOrUpdateFinancialInformation,
  resetGeneralInformation,
  addOrUpdateGeneralInformation,
  resetFinancialInformation
} = applicationSlice.actions;
export default applicationSlice.reducer;
