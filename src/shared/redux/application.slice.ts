import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createApplication,
  fetchApplication,
  updateApplication,
} from "../services/application.service";
import { ApplicationStatus } from "./application.status.slice";

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
  parentWillBeGuarantors: boolean | undefined;
  totalLoanAmount: number;
  totalLoanRepayments: number;
  helpDebtTotalAmount: number;
  totalExistingHomeLoanAmount: number;
  totalExistingHomeLoanRepaymentAmt: number;
  totalPropertyValue: number;
  totalCreditCardLimits: number;
  livingExpenses: number;
  wereBankrupted: boolean | undefined;
  hasDefaulted: boolean | undefined;
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
  firstTimeBuyer: boolean | undefined;
  stateCapitalCityBuyer: boolean | undefined;
  buyerAgreedToConnectWithAgent: boolean | undefined;
}

export interface Applicant {
  personalInformation?: PersonalInformation;
  workInformation?: WorkInformation;
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
        firstTimeBuyer: undefined,
        stateCapitalCityBuyer: undefined,
        buyerAgreedToConnectWithAgent: undefined,
      },
      financialInformation: {
        annualIncome: 0,
        lengthOfEmployment: 0,
        totalAmountSaved: 0,
        parentWillBeGuarantors: undefined,
        totalLoanAmount: 0,
        totalLoanRepayments: 0,
        helpDebtTotalAmount: 0,
        totalExistingHomeLoanAmount: 0,
        totalExistingHomeLoanRepaymentAmt: 0,
        totalPropertyValue: 0,
        totalCreditCardLimits: 0,
        livingExpenses: 0,
        wereBankrupted: undefined,
        hasDefaulted: undefined,
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
        firstTimeBuyer: undefined,
        stateCapitalCityBuyer: undefined,
        buyerAgreedToConnectWithAgent: undefined,
      },
      financialInformation: {
        annualIncome: 0,
        lengthOfEmployment: 0,
        totalAmountSaved: 0,
        parentWillBeGuarantors: undefined,
        totalLoanAmount: 0,
        totalLoanRepayments: 0,
        helpDebtTotalAmount: 0,
        totalExistingHomeLoanAmount: 0,
        totalExistingHomeLoanRepaymentAmt: 0,
        totalPropertyValue: 0,
        totalCreditCardLimits: 0,
        livingExpenses: 0,
        wereBankrupted: undefined,
        hasDefaulted: undefined,
        defaultedReason: "",
      },
    },
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
  setReferrerId
} = applicationSlice.actions;
export default applicationSlice.reducer;
