import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { SubscriptionComponenet } from "../shared/components/Subscription.component"
import { TabPanel } from "../shared/components/TabPanel.component";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { PhoneAndroid } from '@mui/icons-material';
import { AccountCircle } from '@mui/icons-material';

export const LandingPageContainer: React.FC<any> = () => {

    const [value, setValue] = useState<number>(1);

    const [residencyState, setResidencyState] = useState<string>('');

    const [residencyStatus, setResidencyStatus] = useState<string>('');

    const [investmentType, setInvestmentType] = useState<string>('');

    const [buyerStats, setBuyerStatus] = useState<string>('');

    const [stateCapitalCityBuyer, setSateCapitalCityBuyer] = useState<string>('');

    const [buyerAgreedToConnectWithAgent, setBuyerAgreedToConnectWithAgent] = useState<string>('');

    const states = [
        { code: 'NSW', name: 'New South Wales' },
        { code: 'VIC', name: 'Victoria' },
        { code: 'QLD', name: 'Queensland' },
        { code: 'SA', name: 'South Australia' },
        { code: 'WA', name: 'Western Australia' },
        { code: 'TAS', name: 'Tasmania' },
        { code: 'ACT', name: 'Australian Capital Territory' },
        { code: 'NT', name: 'Northern Territory' },
    ];

    const residancyStatus = [
        {code: "AC", name: "Austrailen Citizen"},
        {code: "PR", name: "Permanent Resident"}
    ]

    const investmentTypes = [
        {code: "buy_established_home_to_live", name: "Buy an established home to live in"},
        {code: "buy_land_and_build_new_home", name: "Buy land and build a new home to live"},
        {code: "buy_investment_property", name: "Buy an investment property"},
        {code: "refinance_existing_mortgage", name: "Refinancing an exsting mortgage"}
    ]

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleResidencyStateChange = (event) => {
        setResidencyState(event.target.value);
    };

    const handleResidencyStatus = (event) => {
        setResidencyStatus(event.target.value);
    };

    const handleInvestmentType = (event) => {
        setInvestmentType(event.target.value);
    };

    const handleBuyerStatus = (event) => {
        setBuyerStatus(event.target.value);
    }

    const handleStateCapitalCityBuyer = (event) => {
        setSateCapitalCityBuyer(event.target.value);
    }

    const handleBuyerAgreedToConnectWithAgent = (event) => {
        setBuyerAgreedToConnectWithAgent(event.target.value);
    }
    
    return(
        <Grid container size={4} offset={4}>
            <Grid size={12} sx={{marginTop: "20px", marginBottom: "20px"}}>
                <Tabs value={value} onChange={handleTabChange} centered>
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px", fontWeight: 700}} label="Personal" value={1} />
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px",  fontWeight: 700}} label="Work" value={2}/>
                    <Tab sx={{textTransform: "capitalize", fontSize: "16px",  fontWeight: 700}} label="Financial" value={3}/>
                </Tabs>
            </Grid>
            <Grid size={{ xl: 4, lg: 4, md: 4}} offset={{xl: 4, lg: 4, md: 4}}>
                <TabPanel value={value} index={1}>
                    <Typography>Step: User Details</Typography>
                    <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={"First Name"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "36px",
                                        marginTop: "20px"
                                    }
                                },
                            }}
                        />
                    <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={"Last Name"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "36px",
                                        marginTop: "20px"
                                    }
                                },
                            }}
                        />
                    <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={"Mobile"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <PhoneAndroid />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "36px",
                                        marginTop: "20px"
                                    }
                                },
                            }}
                        />
                     <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={"Email"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "36px",
                                        marginTop: "20px"
                                    }
                                },
                            }}
                        />
                    <FormControl fullWidth sx={{marginTop: "20px"}}>
                        <Select
                            labelId="state-label"
                            value={residencyState}
                            onChange={handleResidencyStateChange}
                            displayEmpty
                            style={{height: "36px"}}
                        >
                        <MenuItem value="" disabled>Select a state</MenuItem>
                            {states.map((stateObj) => (
                                <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop: "20px"}}>
                        <Select
                            labelId="residancy-state-label"
                            value={residencyStatus}
                            onChange={handleResidencyStatus}
                            displayEmpty
                            style={{height: "36px"}}
                        >
                        <MenuItem value="" disabled>Select Residency Status</MenuItem>
                            {residancyStatus.map((stateObj) => (
                                <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography sx={{marginTop: "20px"}}>Are you buying a home to live in, an investment property or refinanceing an exising mortgage ?</Typography>
                    
                    <FormControl fullWidth sx={{marginTop: "20px"}}>
                        <Select
                            labelId="residancy-state-label"
                            value={investmentType}
                            onChange={handleInvestmentType}
                            displayEmpty
                            style={{height: "36px"}}
                        >
                        <MenuItem value="" disabled>Select investment type</MenuItem>
                            {investmentTypes.map((stateObj) => (
                                <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography sx={{marginTop: "20px"}}>Are you a first time home buyer</Typography>

                    <FormControl>
                        <RadioGroup
                            row
                            defaultValue="yes"
                            name="radio-buttons-group-1"
                            value={buyerStats}
                            onChange={handleBuyerStatus}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <Typography sx={{marginTop: "20px"}}>Are you planning to buy in a State Capital City(Perth, Adelaide, Melbourne, Hobart, Canberra, Sydney or Brisbane) ?</Typography>

                    <FormControl>
                        <RadioGroup
                            row
                            defaultValue="yes"
                            name="radio-buttons-group-2"
                            value={stateCapitalCityBuyer}
                            onChange={handleStateCapitalCityBuyer}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <Typography sx={{marginTop: "20px"}}>Would you like to be connected with an Adviser who can find you and income protection and/or a life insurance policy suited to your needs ?</Typography>

                    <FormControl>
                        <RadioGroup
                            row
                            defaultValue="yes"
                            name="radio-buttons-group-3"
                            value={buyerAgreedToConnectWithAgent}
                            onChange={handleBuyerAgreedToConnectWithAgent}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </TabPanel>
            </Grid>
            <Grid size={{ xl: 4, lg: 4, md: 4}} offset={{xl: 4, lg: 4, md: 4}}>
                <TabPanel value={value} index={2}>Item Two</TabPanel>
            </Grid>
        
            <Grid size={{ xl: 4, lg: 4, md: 4}} offset={{xl: 4, lg: 4, md: 4}}>
                <TabPanel value={value} index={3}>Item three</TabPanel>
            </Grid>
            <SubscriptionComponenet></SubscriptionComponenet>
        </Grid>
    );
}