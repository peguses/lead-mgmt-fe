import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchApplication,
  updateApplication,
} from "../services/application.service";

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
  applicantsAgreedOnConditions: boolean;
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

export interface Status {
  note: string;
  status: ApplicationStatus;
  userId: number;
  createDateTime: Date;
}

export interface Document {
  remark: string;
  name: string;
  path: string;
}

export interface Application {
  applicationId: number;
  referrer: string | undefined;
  referrerId: string;
  processingOfficer: string;
  processingOfficerId: number;
  jointLoan: boolean;
  generalInformation: GeneralInformation | undefined;
  applicationStatus: Status[];
  primaryApplicant: Applicant | undefined;
  secondaryApplicant: Applicant | undefined;
  isLoading: boolean;
  loadingFailed: boolean;
  createDateTime: Date | undefined;
  loaded: boolean;
  documents: Document[]
}

export interface ManagedApplication {
  application: Application;
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

const INITIAL_STATE: ManagedApplication = {
  application: {
    applicationId: 0,
    referrer: "",
    referrerId: "",
    processingOfficer: "",
    processingOfficerId: 0,
    jointLoan: false,
    loaded: false,
    applicationStatus: [],
    createDateTime: undefined,
    primaryApplicant: {
      personalInformation: {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        state: "",
        residencyStatus: "",
        investmentType: "",
        firstTimeBuyer: false,
        stateCapitalCityBuyer: false,
        buyerAgreedToConnectWithAgent: false,
      },
      financialInformation: {
        annualIncome: 0,
        lengthOfEmployment: 0,
        totalAmountSaved: 0,
        parentWillBeGuarantors: false,
        totalLoanAmount: 0,
        totalLoanRepayments: 0,
        helpDebtTotalAmount: 0,
        totalExistingHomeLoanAmount: 0,
        totalExistingHomeLoanRepaymentAmt: 0,
        totalPropertyValue: 0,
        totalCreditCardLimits: 0,
        livingExpenses: 0,
        wereBankrupted: true,
        hasDefaulted: true,
        defaultedReason: "",
      },
    },
    secondaryApplicant: {
      personalInformation: {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        state: "",
        residencyStatus: "",
        investmentType: "",
        firstTimeBuyer: false,
        stateCapitalCityBuyer: false,
        buyerAgreedToConnectWithAgent: false,
      },
    },
    generalInformation: {
      numberOfDependant: 0,
      hasPropertyOffer: false,
      propertyOfferElaboration: "",
      applicantOptionalNote: "",
      referralOption: "",
      applicantsAgreedOnConditions: false,
    },
    isLoading: false,
    loadingFailed: false,
    documents: []
  },
};

export const fetchApplicationAsync = createAsyncThunk(
  "managedApplication/fetchApplication",
  async (props: any) => {
    const { applicationId, filterBy, filter } = props;
    const response = await fetchApplication({applicationId, filterBy, filter});
    return {
      application: response.data as any,
    };
  }
);

export const updateApplicationAsync = createAsyncThunk(
  "managedApplication/updateApplication",
  async (data: Application) => {
    const response = await updateApplication(data.applicationId, data);
    return {
      application: response.data as any,
    };
  }
);

export const applicationSlice = createSlice({
  name: "managedApplication",
  initialState: INITIAL_STATE,
  reducers: {
    setJoinLoanApplication: (state, action) => {
      state.application.jointLoan = action.payload;
      state.application.loaded = false;
    },

    setApplication: (state, action) => {
      state.application = action.payload;
      state.application.loaded = false;
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

    resetApplication: (state) => {
      state.application = INITIAL_STATE.application;
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
      state.application.loaded = true;
    });
    builder.addCase(fetchApplicationAsync.rejected, (state) => {
      state = { ...state };
      state.application.isLoading = false;
      state.application.loadingFailed = true;
    });

    builder.addCase(updateApplicationAsync.pending, (state) => {
      state.application.isLoading = true;
      state.application.loadingFailed = false;
    });
    builder.addCase(updateApplicationAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.application.isLoading = false;
      state.application.loadingFailed = false;
      state.application.loaded = false;
    });
    builder.addCase(updateApplicationAsync.rejected, (state) => {
      state = { ...state };
      state.application.isLoading = false;
      state.application.loadingFailed = true;
    });
  },
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
  resetApplication,
} = applicationSlice.actions;
export default applicationSlice.reducer;
