import { Button, FormControl, Grid2 as Grid, MenuItem, Select, Tab, Tabs} from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { SubscriptionComponenet } from "../../shared/components/Subscription.component"
import { TabPanel } from "../../shared/components/TabPanel.component";
import { WorkInforamtionTab } from "./WorkInformation.tab";
import { addOrUpdatePersonalInforamtions, PersonalInformation, removePersonalInformation, setJoinLoanApplication } from "../../shared/redux/applicant.slice";
import PersonalInformationTab from "./PersonalInformation.tab";
import { batch, useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux/hooks";

export const LandingPageContainer: React.FC<any> = () => {

    const dispatch = useDispatch()

    const [value, setValue] = useState<number>(1);

    const [jointLoan, setJointLoan] = useState<boolean>(false);

    const [applicantOneValid, setApplicantOneValid] = useState<boolean>(false);

    const [applicantTwoValid, setApplicantTwoValid] = useState<boolean>(false);

    const [allowWorkTab, setAllowWorkTab] = useState<boolean>(false);

    const applicantOnePersonalInforamtionRef = useRef<any>();

    const applicantTwoPersonalInforamtionRef = useRef<any>();

    const applicants = useAppSelector((state): PersonalInformation[] => {
        return state.application.personalInforamtions;
    });

    useEffect(() => {

        if (jointLoan) {
            setAllowWorkTab(applicantOneValid && applicantTwoValid);
        } else {
            setAllowWorkTab(applicantOneValid);
        }

    }, [applicantOneValid, applicantTwoValid])

    const applicantStatus = [
        {code: "1APP", name: "1 Applicant"},
        {code: "2APP", name: "2 Applicants"}
    ]

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        batch(() => {
            if (applicantOnePersonalInforamtionRef?.current) {
                applicantOnePersonalInforamtionRef.current.triggerSubmit();
            }
            if (applicantTwoPersonalInforamtionRef?.current) {
                applicantTwoPersonalInforamtionRef.current.triggerSubmit();
            }
        })
        setValue(2);
    }

    const  onPersonalInformationSubmit = (applicant: number, data: PersonalInformation) => {
        dispatch(addOrUpdatePersonalInforamtions({applicantId: applicant, data}));
    }
    
    return(
        <Grid container size={jointLoan ? 12: 4} offset={jointLoan ? 12: 4}>
            <Grid size={12} sx={{marginTop: "5px", marginBottom: "20px"}}>
                <Tabs value={value} onChange={handleTabChange} centered>
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px", fontWeight: 700}} label="Personal" value={1} />
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px",  fontWeight: 700}} label="Work" value={2}/>
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px",  fontWeight: 700}} label="Financial" value={3}/>
                </Tabs>
            </Grid>
            <Grid size={jointLoan ? 12 : { xl: 5, lg: 6, md: 6, sm: 8, xs:8}} offset={jointLoan ? 1 : {xl: 3.5, lg: 3, md: 3, sm:2, xs: 2}}>
                <TabPanel value={value} index={1}>
                <Grid size={jointLoan ? 8: { xl: 12, lg: 12, md: 12, sm: 12, xs:12}} offset={jointLoan ? 1.5: { xl: 0, lg: 0, md: 0, sm: 0, xs:0}}>
                    <FormControl fullWidth sx={{marginTop: "5px"}}>
                    <Select
                        labelId="applicantStatus-label"
                        value={jointLoan === true ? "2APP" : "1APP"}
                        displayEmpty
                        style={{height: "36px"}}
                        onChange={(event) => {
                            if (event.target.value === "2APP") {
                                setJointLoan(true);
                                setApplicantTwoValid(false);
                                setApplicantOneValid(false);
                                dispatch(setJoinLoanApplication(true));
                            } else {
                                setJointLoan(false);
                                setApplicantOneValid(false);
                                setApplicantTwoValid(true);
                                dispatch(setJoinLoanApplication(false));
                                dispatch(removePersonalInformation({ applicantId: 2}));
                            }
                        }}
                        >
                        <MenuItem value="" disabled>Select if Joint Loan</MenuItem>
                            {applicantStatus.map((stateObj) => (
                            <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                            </MenuItem>
                        ))}
                    </Select> 
                    </FormControl>
                </Grid>
                {jointLoan 
                ? (
                <Grid container size={8} offset={1.5}>
                    <Grid size={5.5}>
                        <PersonalInformationTab key={1} applicant={1} onValid={(isValid) => setApplicantOneValid(isValid)} onSubmit={(data) => onPersonalInformationSubmit(1,data)} ref={applicantOnePersonalInforamtionRef}/>
                    </Grid>
                    <Grid size={5.5} offset={1}>
                        <PersonalInformationTab key={2} applicant={2} onValid={(isValid) => setApplicantTwoValid(isValid)} onSubmit={(data) => onPersonalInformationSubmit(2,data)} ref={applicantTwoPersonalInforamtionRef}/>
                    </Grid>
                    </Grid>
                ) : 
                <PersonalInformationTab applicant={1} onValid={(isValid) => setApplicantOneValid(isValid)} onSubmit={(data) => onPersonalInformationSubmit(1,data)} ref={applicantOnePersonalInforamtionRef}/>
                }
                 <Grid size={jointLoan ? 2: 3} offset={jointLoan? 7.5: 9} sx={{marginTop: "20px"}}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={!allowWorkTab}>
                        Next
                    </Button>
                </Grid>
                </TabPanel>
            </Grid>
            <Grid size={{ xl: 4, lg: 4, md: 4}} offset={{xl: 4, lg: 4, md: 4}}>
                <TabPanel value={value} index={2}>
                    <WorkInforamtionTab/>
                </TabPanel>
            </Grid>
        
            <Grid size={{ xl: 4, lg: 4, md: 4}} offset={{xl: 4, lg: 4, md: 4}}>
                <TabPanel value={value} index={3}>Item three</TabPanel>
            </Grid>
            <Grid size={12} offset={1}>
                <SubscriptionComponenet/>
            </Grid>
        </Grid>
    );
}