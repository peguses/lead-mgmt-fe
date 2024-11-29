import { AccountCircle, PhoneAndroid } from "@mui/icons-material";
import {FormControl, FormControlLabel, FormHelperText, InputAdornment, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { forwardRef, useEffect, useImperativeHandle } from "react";


interface PersonalInformationTab {
    applicant: number;
    onSubmit: (data: any) => void,
    onValid: (isValid: boolean) => void
}

const PersonalInformationTab = forwardRef(( { applicant, onSubmit, onValid}: PersonalInformationTab, ref) => {

    const { control, register, handleSubmit, formState: { errors, isValid, isDirty  }, clearErrors } = useForm<any>({
        mode: "all",
        defaultValues: {
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            state: "",
            residancyStatus: "",
            investmentType: "",
            firstTimeBuyer: "",
            stateCapitalCityBuyer: "",
            buyerAgreedToConnectWithAgent: "",

        },
    });

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

    const triggerSubmit = () => {
        handleSubmit(onSubmit)();
    }

    useImperativeHandle(ref, () => ({
        triggerSubmit
    }));

    useEffect(() => {onValid(isValid && !!errors)}, [isValid, errors])

    return <>
                <Typography sx={{marginTop: "20px", fontSize: "14px", fontWeight: 700}}>Applicant {applicant} Details</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    {...register('firstName', {
                        required: 'First name is required',
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName ? String(errors.firstName.message) : ''}
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
                    {...register('lastName', {
                        required: 'Last name is required',
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? String(errors.lastName.message) : ''}
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
                            {...register('mobile', {
                                required: 'Mobile is required',
                                pattern: {
                                    value: /^(04\d{8}|(02|03|07|08)\d{8})$/,
                                    message: 'Enter valied australien mobile number',
                                  },
                            })}
                            error={!!errors.mobile}
                            helperText={errors.mobile ? String(errors.mobile.message) : ''}
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
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                  value: /\S+@\S+\.\S+/,
                                  message: 'Entered value does not match email format',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? String(errors.email.message) : ''}
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
                    <FormControl fullWidth sx={{marginTop: "20px"}} error={Boolean(errors.state)}>
                        <Controller
                            name="state"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'State is required' }}
                            render={({ field }) => (
                            <Select
                                labelId="state-label"
                                {...field}
                                value={field.value}
                                displayEmpty
                                style={{height: "36px"}}
                                onChange={(e) => {
                                    clearErrors("state");
                                    field.onChange(e);
                                }}
                            >
                            <MenuItem value="" disabled>Select a state</MenuItem>
                                {states.map((stateObj) => (
                                    <MenuItem key={stateObj.code} value={stateObj.code}>
                                    {stateObj.name}
                                    </MenuItem>
                                ))}
                            </Select> 
                            )}
                            
                        />
                        {errors.state && <FormHelperText>{String(errors.state?.message)}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop: "20px"}} error={Boolean(errors.residancyStatus)}>
                        <Controller
                            name="residancyStatus"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Residancy status is required' }}
                            render={({ field }) => (
                            <Select
                                labelId="residancyStatus-label"
                                {...field}
                                value={field.value}
                                displayEmpty
                                style={{height: "36px"}}
                                onChange={(e) => {
                                    clearErrors("residancyStatus");
                                    field.onChange(e);
                                }}
                            >
                            <MenuItem value="" disabled>Select Residency Status</MenuItem>
                            {residancyStatus.map((stateObj) => (
                                <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                                </MenuItem>
                            ))}
                            </Select> 
                            )}
                            
                        />
                        {errors.residancyStatus && <FormHelperText>{String(errors.residancyStatus?.message)}</FormHelperText>}
                    </FormControl>
                    <Typography sx={{marginTop: "20px", fontSize: "14px", fontWeight: 700}}>Are you buying a home to live in, an investment property or refinanceing an exising mortgage ?</Typography>
                    
                    <FormControl fullWidth sx={{marginTop: "20px"}} error={Boolean(errors.investmentType)}>
                        <Controller
                            name="investmentType"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Investment type is required' }}
                            render={({ field }) => (
                            <Select
                                labelId="investmentType-label"
                                {...field}
                                value={field.value}
                                displayEmpty
                                style={{height: "36px"}}
                                onChange={(e) => {
                                    clearErrors("investmentType");
                                    field.onChange(e);
                                }}
                            >
                            <MenuItem value="" disabled>Select investment type</MenuItem>
                            {investmentTypes.map((stateObj) => (
                                <MenuItem key={stateObj.code} value={stateObj.code}>
                                {stateObj.name}
                                </MenuItem>
                            ))}
                            </Select> 
                            )}
                            
                        />
                        {errors.investmentType && <FormHelperText>{String(errors.investmentType?.message)}</FormHelperText>}
                    </FormControl>

                    <Typography sx={{marginTop: "20px", fontSize: "14px", fontWeight: 700}}>Are you a first time home buyer</Typography>

                    <FormControl error={Boolean(errors.firstTimeBuyer)}>
                        <Controller
                            name="firstTimeBuyer"
                            control={control}
                            rules={{ required: 'Please select Yes/No' }}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    row
                                    defaultValue=""
                                    name="firstTimeBuyer"
                                    value={field?.value}
                                    onChange={(e) => {
                                        clearErrors("firstTimeBuyer");
                                        field.onChange(e);
                                    }}
                                >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                        )}
                        />
                        {errors.firstTimeBuyer && <FormHelperText>{String(errors.firstTimeBuyer.message)}</FormHelperText>}
                    </FormControl>

                    <Typography sx={{marginTop: "20px", fontSize: "14px", fontWeight: 700}}>Are you planning to buy in a State Capital City(Perth, Adelaide, Melbourne, Hobart, Canberra, Sydney or Brisbane) ?</Typography>

                    <FormControl error={Boolean(errors.stateCapitalCityBuyer)}>
                        <Controller
                                name="stateCapitalCityBuyer"
                                control={control}
                                rules={{ required: 'Please select Yes/No' }}  // Validation rule
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        row
                                        defaultValue=""
                                        name="stateCapitalCityBuyer"
                                        value={field?.value}
                                        onChange={(e) => {
                                            clearErrors("stateCapitalCityBuyer");
                                            field.onChange(e);
                                        }}
                                    >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                            )}
                        />
                        {errors.stateCapitalCityBuyer && <FormHelperText>{String(errors.stateCapitalCityBuyer.message)}</FormHelperText>}
                    </FormControl>

                    <Typography sx={{marginTop: "20px", fontSize: "14px", fontWeight: 700}}>Would you like to be connected with an Adviser who can find you and income protection and/or a life insurance policy suited to your needs ?</Typography>

                    <FormControl error={Boolean(errors.buyerAgreedToConnectWithAgent)}>
                        <Controller
                                name="buyerAgreedToConnectWithAgent"
                                control={control}
                                rules={{ required: 'Please select Yes/No' }}  // Validation rule
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        row
                                        defaultValue=""
                                        name="buyerAgreedToConnectWithAgent"
                                        value={field?.value}
                                        onChange={(e) => {
                                            clearErrors("buyerAgreedToConnectWithAgent");
                                            field.onChange(e);
                                        }}
                                    >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                            )}
                        />
                        {errors.buyerAgreedToConnectWithAgent && <FormHelperText>{String(errors.buyerAgreedToConnectWithAgent.message)}</FormHelperText>}
                    </FormControl>
    </>
});

export default PersonalInformationTab;