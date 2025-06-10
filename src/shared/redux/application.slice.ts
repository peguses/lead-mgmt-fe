import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createApplication,
  createStatus,
  fetchApplication,
  updateApplication,
  uploadDocument,
} from "../services/application.service";
import { ApplicationStatus } from "./application.status.slice";

export interface GeneralInformation {
  numberOfDependant: number | undefined;
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
  statusId: number;
  note: string;
  status: ApplicationStatus | string;
  userId: number;
  createDateTime: Date;
}

export interface Document {
  remark: string;
  name: string;
  path: string;
  id: number;
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
  createDateTime: Date | undefined;
  loaded: boolean;
  documents?: Document[];
}

export interface UpdateStatusRequest {
  applicationId: number;
  statusId: number;
  userId: number;
  note: string;
}

export interface ManagedApplication {
  application: Application;
  loadingFailed: boolean;
  isDocumentDownloading?: boolean | undefined;
  isDocumentUploading?: boolean | undefined;
  upDocumentLoadingProgress: number;
  isLoading?: boolean | undefined;
  isDocumentUploadingFail?: boolean | undefined;
  errorMessageIfFailed?: any | undefined | undefined;
}

const INITIAL_STATE: ManagedApplication = {
  errorMessageIfFailed: "",
  isLoading: false,
  loadingFailed: false,
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
    documents: [],
  },
  isDocumentDownloading: false,
  isDocumentUploading: false,
  upDocumentLoadingProgress: 0,
  isDocumentUploadingFail: false,
};

export const fetchApplicationAsync = createAsyncThunk(
  "managedApplication/fetchApplication",
  async (props: any, { rejectWithValue }) => {
    try {
      const { applicationId, filterBy, filter } = props;
      const response = await fetchApplication({
        applicationId,
        filterBy,
        filter,
      });
      return {
        application: response.data.data as any,
      };

    } catch(error: any) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const assignOfficeAsync = createAsyncThunk(
  "managedApplication/updateApplication",
  async (data: Application | any, { rejectWithValue }) => {
    try {
      const response = await updateApplication(data?.applicationId || 0, {
        processingOfficerId: data.processingOfficerId,
      });
      return {
        application: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.errors || error.response.data.message
      );
    }
  }
);

export const createApplicationAsync = createAsyncThunk(
  "managedApplication/createApplication",
  async (data: Application, { rejectWithValue }) => {
    try {
      const response = await createApplication(data);
      return {
        application: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.errors || error.response.data.message
      );
    }
  }
);

export const createApplicationStatusAsync = createAsyncThunk(
  "managedApplication/createStatus",
  async (data: UpdateStatusRequest, { rejectWithValue }) => {
    try {
      const response = await createStatus(data);
      return {
        status: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.errors || error.response.data.message || error.message
      );
    }
  }
);

export const uploadDocumentAsync = createAsyncThunk(
  "managedApplication/uploadDocument",
  async (data: FormData, {dispatch, rejectWithValue }) => {
    try {
      const response = await uploadDocument(data, (event) => {
        const progress = Math.round((event.loaded * 100) / event.total);
        dispatch(updateFileUploadProgress(progress));
      });
      return {
        document: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.errors || error.response.data.message
      );
    }
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
      state.application.referrerId = action.payload;
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

    resetApplicationSubmitError: (state) => {
      state.errorMessageIfFailed = undefined;
    },

    updateFileUploadProgress: (state, action) => {
      state.upDocumentLoadingProgress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchApplicationAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(fetchApplicationAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.isLoading = false;
      state.loadingFailed = false;
    });
    builder.addCase(fetchApplicationAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });

    builder.addCase(assignOfficeAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(assignOfficeAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.isLoading = false;
      state.loadingFailed = false;
      state.errorMessageIfFailed = undefined;
    });
    builder.addCase(assignOfficeAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });

    builder.addCase(createApplicationAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(createApplicationAsync.fulfilled, (state, action) => {
      state.application = action.payload.application;
      state.isLoading = false;
      state.loadingFailed = false;
      state.errorMessageIfFailed = undefined;
    });
    builder.addCase(createApplicationAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });

    builder.addCase(createApplicationStatusAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(createApplicationStatusAsync.fulfilled, (state, action) => {
      state.application.applicationStatus = action.payload.status;
      state.isLoading = false;
      state.loadingFailed = false;
      state.errorMessageIfFailed = undefined;
    });
    builder.addCase(createApplicationStatusAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });

    builder.addCase(uploadDocumentAsync.pending, (state) => {
      state.isDocumentUploading =  true;
      state.isLoading =  false;
      state.isDocumentDownloading =  false;
      state.isDocumentUploadingFail =  false;
      state.upDocumentLoadingProgress =  0;
    });
    builder.addCase(uploadDocumentAsync.fulfilled, (state, action) => {
      state.isDocumentUploading =  false;
      state.isLoading =  false;
      state.isDocumentDownloading =  false;
      state.isDocumentUploadingFail =  false;
      state.upDocumentLoadingProgress =  100;
    });
    builder.addCase(uploadDocumentAsync.rejected, (state, action) => {
      state.isDocumentUploading =  false;
      state.isLoading =  false;
      state.isDocumentDownloading =  false;
      state.isDocumentUploadingFail =  true;
      state.upDocumentLoadingProgress =  0;
      state.errorMessageIfFailed = action.payload || "Uploading failed";
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
  setReferrerId,
  resetApplicationSubmitError,
  updateFileUploadProgress,
} = applicationSlice.actions;
export default applicationSlice.reducer;
