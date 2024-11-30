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

export interface FinantialInformation {
  applicantId: number;
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
}

const INITIAL_STATE: Application = {
  jointLoan: false,
  personalInforamtions: [],
  workInformations: [],
  finantialInformations: [],
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

    resetPersonalInforamtions: (state) => {
      state.personalInforamtions = [];
    },

    resetWorkInforamtions: (state) => {
      state.workInformations = [];
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
} = applicationSlice.actions;
export default applicationSlice.reducer;
