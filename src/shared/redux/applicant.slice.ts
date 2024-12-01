import { createSlice } from "@reduxjs/toolkit";

export interface WorkInformation {
  applicantId: number;
  employementType: string;
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
  currentEmployementStartDate: Date;
  probationaryEmployee: boolean;
}

export interface GeneralInformation {
  numberOfDependants: number;
  hasPropertyOffer: boolean
  propertyOfferElaboration: string;
  applicantOptionalNote: string;
  referalOption: string;
  applicantAgreedOnConditions: boolean
}

export interface FinantialInformation {
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
  livinExpenses: number;
  wereBankrupted: boolean;
  hasDefalted: boolean;
  defaltedReason: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  state: string;
  residancyStatus: string;
  investmentType: string;
  firstTimeBuyer: boolean;
  stateCapitalCityBuyer: boolean;
  buyerAgreedToConnectWithAgent: boolean;
  applicantId: number;
}

export interface Application {
  jointLoan: boolean;
  personalInforamtions: PersonalInformation[];
  workInformations: WorkInformation[];
  finantialInformations: FinantialInformation[];
  generalInformation: GeneralInformation | undefined;
}

const INITIAL_STATE: Application = {
  jointLoan: false,
  personalInforamtions: [],
  workInformations: [],
  finantialInformations: [],
  generalInformation: {
    numberOfDependants: 0,
    hasPropertyOffer: false,
    propertyOfferElaboration: '',
    applicantOptionalNote: '',
    referalOption: '',
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

    addOrUpdatePersonalInforamtions: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.personalInforamtions?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.personalInforamtions[index] = {
          ...state.personalInforamtions[index],
          ...data,
        };
      } else {
        state.personalInforamtions.push({ ...data, applicantId: applicantId });
      }
    },

    removePersonalInformation: (state, action) => {
      const { applicantId } = action.payload;
      state.personalInforamtions = state?.personalInforamtions?.filter(
        (a) => a.applicantId !== applicantId
      );
    },

    addOrUpdateWorkInformation: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.workInformations?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.workInformations[index] = {
          ...state.workInformations[index],
          ...data,
        };
      } else {
        state.workInformations.push({ ...data, applicantId: applicantId });
      }
    },

    removeWorkInformation: (state, action) => {
        const { applicantId } = action.payload;
        state.workInformations = state?.workInformations?.filter(
          (a) => a.applicantId !== applicantId
        );
    },

    addOrUpdateFinantialInformation: (state, action) => {
      const { applicantId, data } = action.payload;
      const index = state?.finantialInformations?.findIndex(
        (a) => a.applicantId === applicantId
      );

      if (index !== -1) {
        state.finantialInformations[index] = {
          ...state.finantialInformations[index],
          ...data,
        };
      } else {
        state.finantialInformations.push({ ...data, applicantId: applicantId });
      }
    },

    removeFinantialInformation: (state, action) => {
      const { applicantId } = action.payload;
      state.finantialInformations = state?.finantialInformations?.filter(
        (a) => a.applicantId !== applicantId
      );
    },

    addOrUpdateGeneralInformation: (state, action) => {
      state.generalInformation = action.payload;
    },

    resetGeneralInformation:(state) => {
      state.generalInformation = undefined;
    },

    resetPersonalInforamtions: (state) => {
      state.personalInforamtions = [];
    },

    resetWorkInforamtions: (state) => {
      state.workInformations = [];
    },

    resetFinantialInforamtions: (state) => {
      state.finantialInformations = [];
    },
    
  },
});

export const {
  resetPersonalInforamtions,
  setJoinLoanApplication,
  addOrUpdatePersonalInforamtions,
  addOrUpdateWorkInformation,
  removePersonalInformation,
  resetWorkInforamtions,
  removeWorkInformation,
  addOrUpdateFinantialInformation,
  resetGeneralInformation,
  addOrUpdateGeneralInformation,
  resetFinantialInforamtions
} = applicationSlice.actions;
export default applicationSlice.reducer;
