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

    personalInforamtions: PersonalInformation[];
    workInformations: WorkInformation[];
    finantialInformations: FinantialInformation[];

}

const INITIAL_STATE: Application = {
     personalInforamtions: [], workInformations: [], finantialInformations: []
};


export const applicationSlice = createSlice({
    name: 'application',
    initialState: INITIAL_STATE,
    reducers: {
        setPersonalInforamtions: (state, action) => {
            state.personalInforamtions = action.payload;
        },
    },
});

export const { setPersonalInforamtions } = applicationSlice.actions;
export default applicationSlice.reducer;