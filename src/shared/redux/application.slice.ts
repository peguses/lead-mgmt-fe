import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createApplication,
  fetchApplication,
  updateApplication,
} from "../services/application.service";
import { ApplicationStatus } from "./application.status.slice";

export interface GeneralInformation {
  numberOfDependant: number |undefined;
  hasPropertyOffer: boolean;
  propertyOfferElaboration: string;
  applicantOptionalNote: string;
  referralOption: string;
  applicantAgreedOnConditions: boolean;
}

export interface FinancialInformation {
  annualIncome: number | undefined;
  lengthOfEmployment: number | undefined;
  totalAmountSaved: number | undefined;
  parentWillBeGuarantors: boolean;
  totalLoanAmount: number | undefined;
  totalLoanRepayments: number | undefined;
  helpDebtTotalAmount: number | undefined;
  totalExistingHomeLoanAmount: number | undefined;
  totalExistingHomeLoanRepaymentAmt: number | undefined;
  totalPropertyValue: number | undefined;
  totalCreditCardLimits: number | undefined;
  livingExpenses: number | undefined;
  wereBankrupted: boolean | undefined;
  hasDefaulted: boolean;
  defaultedReason: string | undefined;
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
  financialInformation?: FinancialInformation;
}

export interface Status {
  statusId: number
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
  applicationId: number | undefined;
  referrer: string | undefined;
  referrerId: string;
  processingOfficer: string | undefined;
  processingOfficerId: number | undefined;
  jointLoan: boolean;
  generalInformation: GeneralInformation | undefined;
  applicationStatus: Status[] | undefined;
  primaryApplicant: Applicant | undefined;
  secondaryApplicant?: Applicant | undefined;
  isLoading: boolean;
  loadingFailed: boolean;
  createDateTime: Date | undefined;
  loaded: boolean;
  documents?: Document[]
}

export interface ManagedApplication {
  application: Application;
}

const INITIAL_STATE: ManagedApplication = {
  application: {
    applicationId: undefined,
    referrer: undefined,
    referrerId: "",
    processingOfficer: undefined,
    processingOfficerId: undefined,
    jointLoan: false,
    loaded: false,
    applicationStatus: undefined,
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
        firstTimeBuyer: true,
        stateCapitalCityBuyer: false,
        buyerAgreedToConnectWithAgent: false,
      },
      financialInformation: {
        annualIncome: undefined,
        lengthOfEmployment: undefined,
        totalAmountSaved: undefined,
        parentWillBeGuarantors: false,
        totalLoanAmount: undefined,
        totalLoanRepayments: undefined,
        helpDebtTotalAmount: undefined,
        totalExistingHomeLoanAmount: undefined,
        totalExistingHomeLoanRepaymentAmt: undefined,
        totalPropertyValue: undefined,
        totalCreditCardLimits: undefined,
        livingExpenses: undefined,
        wereBankrupted: false,
        hasDefaulted: false,
        defaultedReason: undefined,
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
        firstTimeBuyer: true,
        stateCapitalCityBuyer: false,
        buyerAgreedToConnectWithAgent: false,
      },
      financialInformation: {
        annualIncome: undefined,
        lengthOfEmployment: undefined,
        totalAmountSaved: undefined,
        parentWillBeGuarantors: false,
        totalLoanAmount: undefined,
        totalLoanRepayments: undefined,
        helpDebtTotalAmount: undefined,
        totalExistingHomeLoanAmount: undefined,
        totalExistingHomeLoanRepaymentAmt: undefined,
        totalPropertyValue: undefined,
        totalCreditCardLimits: undefined,
        livingExpenses: undefined,
        wereBankrupted: false,
        hasDefaulted: false,
        defaultedReason: undefined,
      },
    },
    generalInformation: {
      numberOfDependant: undefined,
      hasPropertyOffer: false,
      propertyOfferElaboration: "",
      applicantOptionalNote: "",
      referralOption: "",
      applicantAgreedOnConditions: false,
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
    const response = await updateApplication(data?.applicationId || 0, data);
    return {
      application: response.data as any,
    };
  }
);

export const createApplicationAsync = createAsyncThunk(
  "managedApplication/createApplication",
  async (data: Application) => {
    const response = await createApplication(data);
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

    setReferrerId: (state, action) => {
      state.application.referrerId = action.payload
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
        financialInformation: undefined,
      };
    },

    removeSecondaryApplicant: (state) => {
      state.application.secondaryApplicant = {
        ...state.application.secondaryApplicant,
        personalInformation: undefined,
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

    builder.addCase(createApplicationAsync.pending, (state) => {
      state.application.isLoading = true;
      state.application.loadingFailed = false;
    });
    builder.addCase(createApplicationAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.application.isLoading = false;
      state.application.loadingFailed = false;
      state.application.loaded = false;
    });
    builder.addCase(createApplicationAsync.rejected, (state) => {
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
  addOrUpdatePrimaryApplicantFinancialInformation,
  addOrUpdateSecondaryApplicantPersonalInformation,
  addOrUpdateSecondaryApplicantFinancialInformation,
  removeSecondaryApplicant,
  removeGeneralInformation,
  removePrimaryApplicant,
  addOrUpdateGeneralInformation,
  resetApplication,
  setReferrerId
} = applicationSlice.actions;
export default applicationSlice.reducer;
