import { createSlice } from "@reduxjs/toolkit";

export interface WorkInformation {
    
    applicantId: number;

};

export interface FinantialInformation {

    applicantId: number;

};

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

};

export interface Application {

    jointLoan: boolean
    personalInforamtions: PersonalInformation[];
    workInformations: WorkInformation[];
    finantialInformations: FinantialInformation[];

}

const INITIAL_STATE: Application = {
    jointLoan: false, personalInforamtions: [], workInformations: [], finantialInformations: []
};


export const applicationSlice = createSlice({
    name: 'application',
    initialState: INITIAL_STATE,
    reducers: {

        setJoinLoanApplication:  (state, action) => {
            state.jointLoan = action.payload;
        },

        setPersonalInforamtions: (state, action) => {
            state.personalInforamtions = action.payload;
        },

        resetPersonalInforamtions: (state) => {
            state.personalInforamtions = []
        },

    },
});

export const { setPersonalInforamtions, resetPersonalInforamtions, setJoinLoanApplication } = applicationSlice.actions;
export default applicationSlice.reducer;