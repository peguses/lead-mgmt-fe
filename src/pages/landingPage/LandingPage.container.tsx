import { Button, FormControl, Grid2 as Grid, MenuItem, Select, Tab, Tabs} from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { SubscriptionComponenet } from "../../shared/components/Subscription.component"
import { TabPanel } from "../../shared/components/TabPanel.component";
import { WorkInforamtionTab } from "./WorkInformation.tab";
import { PersonalInformation, setPersonalInforamtions } from "../../shared/redux/applicant.slice";
import PersonalInformationTab from "./PersonalInformation.tab";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux/hooks";

export const LandingPageContainer: React.FC<any> = () => {

    const dispatch = useDispatch()

    const [value, setValue] = useState<number>(1);

    const [jointLoan, setJointLoan] = useState<boolean>(false);

    const [applicantOnePersonalInforamtion, setApplicantOnePersonalInforamtion] = useState<PersonalInformation>();

    const [applicantTwoPersonalInforamtion, setApplicantTwoPersonalInforamtion] = useState<PersonalInformation>();

    const applicantOnePersonalInforamtionRef = useRef<any>();

    const applicantTwoPersonalInforamtionRef = useRef<any>();

    const applicants = useAppSelector((state): PersonalInformation[] => {
        return state.application.personalInforamtions;
    });

    // useEffect(() => {console.log(oppp)}, [oppp])

    const applicantStatus = [
        {code: "1APP", name: "1 Applicant"},
        {code: "2APP", name: "2 Applicants"}
    ]

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        if (applicantOnePersonalInforamtionRef?.current) {
            applicantOnePersonalInforamtionRef.current.triggerSubmit();
        }
        if (applicantTwoPersonalInforamtionRef?.current) {
            applicantTwoPersonalInforamtionRef.current.triggerSubmit();
        }
    }

    const onPersonalInformationSubmit = (applicant: number, data: PersonalInformation) => {

        
        const personalInformations: PersonalInformation[]  = [];
        personalInformations.push({...data, applicantId: applicant});
        dispatch(setPersonalInforamtions(personalInformations));
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
                        onChange={(event) => setJointLoan(event.target.value === "2APP")}
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
                    <PersonalInformationTab key={1} applicant={1} onSubmit={(data) => onPersonalInformationSubmit(1, data)} ref={applicantOnePersonalInforamtionRef}/>
                    </Grid>
                    <Grid size={5.5} offset={1}>
                    <PersonalInformationTab key={2} applicant={2} onSubmit={(data) => onPersonalInformationSubmit(2, data)} ref={applicantTwoPersonalInforamtionRef}/>
                    </Grid>
                    </Grid>
                ) : 
                <PersonalInformationTab applicant={1} onSubmit={(data) => onPersonalInformationSubmit(1, data)} ref={applicantOnePersonalInforamtionRef}/>
                }
                 <Grid size={jointLoan ? 2: 3} offset={jointLoan? 7.5: 9} sx={{marginTop: "20px"}}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
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