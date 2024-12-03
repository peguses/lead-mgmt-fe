import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApplication } from "../services/application.service";

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
  isLoading: boolean;
  loadingFailed: boolean;

}

export interface Loan {
    application: Application
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

const INITIAL_STATE: Loan = {

  application: {
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
    isLoading: false,
    loadingFailed: false,
  }

};

export const fetchApplicationAsync = createAsyncThunk('application/fetchApplication', async(props: any) => {
  const { applicationId } = props;
  const response = await fetchApplication(applicationId);
  return {
    application: response.data as any,
  };
});

export const applicationSlice = createSlice({
  name: "lead",
  initialState: INITIAL_STATE,
  reducers: {

    setJoinLoanApplication: (state, action) => {
      state.application.jointLoan = action.payload;
    },

    setApplication: (state, action) => {
      state.application = action.payload;
    },


    addOrUpdatePrimaryApplicantPersonalInformation: (state, action) => {
      state.application.primaryApplicant = {
        ...state.application.primaryApplicant,
        personalInformation: action.payload,
      };
    },

    addOrUpdatePrimaryApplicantWorkInformation: (state, action) => {
      state.application.primaryApplicant = {
        ...state.application.primaryApplicant,
        workInformation: action.payload,
      };
    },

    addOrUpdatePrimaryApplicantFinancialInformation: (state, action) => {
      state.application.primaryApplicant = {
        ...state.application.primaryApplicant,
        financialInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantPersonalInformation: (state, action) => {
      state.application.secondaryApplicant = {
        ...state.application.secondaryApplicant,
        personalInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantWorkInformation: (state, action) => {
      state.application.secondaryApplicant = {
        ...state.application.secondaryApplicant,
        workInformation: action.payload,
      };
    },

    addOrUpdateSecondaryApplicantFinancialInformation: (state, action) => {
      state.application.secondaryApplicant = {
        ...state.application.secondaryApplicant,
        financialInformation: action.payload,
      };
    },

    addOrUpdateGeneralInformation: (state, action) => {
      state.application.generalInformation = action.payload;
    },

    removeGeneralInformation: (state) => {
      state.application.generalInformation = undefined;
    },

    removePrimaryApplicant: (state) => {
      state.application.primaryApplicant = {
        ...state.application.primaryApplicant,
        personalInformation: undefined,
        workInformation: undefined,
        financialInformation: undefined,
      };
    },

    removeSecondaryApplicant: (state) => {
      state.application.secondaryApplicant = {
        ...state.application.secondaryApplicant,
        personalInformation: undefined,
        workInformation: undefined,
        financialInformation: undefined,
      };
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchApplicationAsync.pending, (state) => {
      state.application.isLoading = true;
      state.application.loadingFailed = false;
    });
    builder.addCase(fetchApplicationAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.application.isLoading = false;
      state.application.loadingFailed = false;
    });
    builder.addCase(fetchApplicationAsync.rejected, (state) => {
      state =  {...state};
      state.application.isLoading = false;
      state.application.loadingFailed = true;
    });
  }
});

export const {
  setApplication,
  setJoinLoanApplication,
  addOrUpdatePrimaryApplicantPersonalInformation,
  addOrUpdatePrimaryApplicantWorkInformation,
  addOrUpdatePrimaryApplicantFinancialInformation,
  addOrUpdateSecondaryApplicantPersonalInformation,
  addOrUpdateSecondaryApplicantWorkInformation,
  addOrUpdateSecondaryApplicantFinancialInformation,
  removeSecondaryApplicant,
  removeGeneralInformation,
  removePrimaryApplicant,
  addOrUpdateGeneralInformation,
} = applicationSlice.actions;
export default applicationSlice.reducer;
