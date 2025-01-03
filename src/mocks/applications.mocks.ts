export const data = [
  {
    applicationId: 1,
    referrer: "Yashith",
    referrerId: "001",
    jointLoan: true,
    createDateTime: new Date(),
    processingOfficer: "Jayan Wadusinghearach",
    processingOfficerId: "12",
    primaryApplicant: {
        personalInformation: {
            firstName: "Jayan",
            lastName: "Wadusinghearachchi",
            mobile: "0412345678",
            email: "jayan.2029@gmail.com",
            state: "NSW",
            residencyStatus: "AC",
            investmentType: "buy_established_home_to_live",
            firstTimeBuyer: true,
            stateCapitalCityBuyer: true,
            buyerAgreedToConnectWithAgent: true,
        },
        financialInformation: {
            annualIncome: 35000,
            lengthOfEmployment: 5,
            totalAmountSaved: 50000,
            parentWillBeGuarantors: false,
            totalLoanAmount: 10000,
            totalLoanRepayments: 500,
            helpDebtTotalAmount: 100,
            totalExistingHomeLoanAmount: 5000,
            totalExistingHomeLoanRepaymentAmt: 45,
            totalPropertyValue: 4500,
            totalCreditCardLimits: 4500,
            livingExpenses: 500,
            wereBankrupted: false,
            hasDefaulted: true,
            defaultedReason: "test",
        }
    },
    secondaryApplicant: {
        personalInformation: {
            firstName: "Prabashi",
            lastName: "Thennakoon",
            mobile: "0412345678",
            email: "prabashi.aye@gmail.com",
            state: "NSW",
            residencyStatus: "AC",
            investmentType: "buy_established_home_to_live",
            firstTimeBuyer: true,
            stateCapitalCityBuyer: true,
            buyerAgreedToConnectWithAgent: false,
        },
        financialInformation: {
            annualIncome: 35000,
            lengthOfEmployment: 5,
            totalAmountSaved: 60000,
            parentWillBeGuarantors: false,
            totalLoanAmount: 10000,
            totalLoanRepayments: 50,
            helpDebtTotalAmount: 200,
            totalExistingHomeLoanAmount: 4500,
            totalExistingHomeLoanRepaymentAmt: 250,
            totalPropertyValue: 20000,
            totalCreditCardLimits: 230,
            livingExpenses: 500,
            wereBankrupted: false,
            hasDefaulted: false,
            defaultedReason: null,
        }
    },
    generalInformation: {
        numberOfDependant: 2,
        hasPropertyOffer: true,
        propertyOfferElaboration: 'Test',
        applicantOptionalNote: 'Initial Test',
        referralOption: '001',
        applicantAgreedOnConditions: false
    },
    applicationStatus: [
        {
            note: "test1",
            status: { name: "Inquiry", status: "INQUIRY"},
            userId: 1,
            createDateTime: new Date()
        },
        {
            note: "test2",
            status: { name: "deal", status: "DEAL"},
            userId: 1,
            createDateTime: new Date().setDate(2)
        }
    ],
    documents: [
        {
            name: "birth_certificate_jayan",
            path: "birth_certificate_1",
            remark: "test1"
        },
        {
            name: "birth_certificate_P",
            path: "birth_certificate_1",
            remark: "test1"
        }
    ]
  },
  {
    applicationId: 3,
    referrer: "Lochana",
    referrerId: "001",
    processingOfficer: "Jayan Wadusinghearach",
    processingOfficerId: "12",
    jointLoan: true,
    createDateTime: new Date(),
    primaryApplicant: {
        personalInformation: {
            firstName: "Jayan",
            lastName: "Wadusinghearachchi",
            mobile: "0412345678",
            email: "jayan.2029@gmail.com",
            state: "NSW",
            residencyStatus: "AC",
            investmentType: "buy_established_home_to_live",
            firstTimeBuyer: true,
            stateCapitalCityBuyer: true,
            buyerAgreedToConnectWithAgent: false,
            applicantId: 1,
        },
        financialInformation: {
            annualIncome: 35000,
            lengthOfEmployment: 5,
            totalAmountSaved: 50000,
            parentWillBeGuarantors: false,
            totalLoanAmount: 10000,
            totalLoanRepayments: 500,
            helpDebtTotalAmount: 100,
            totalExistingHomeLoanAmount: 5000,
            totalExistingHomeLoanRepaymentAmt: 45,
            totalPropertyValue: 4500,
            totalCreditCardLimits: 4500,
            livingExpenses: 500,
            wereBankrupted: false,
            hasDefaulted: true,
            defaultedReason: "test",
        }
    },
    secondaryApplicant: {
        personalInformation: {
            firstName: "Prabashi",
            lastName: "Thennakoon",
            mobile: "0412345678",
            email: "prabashi.aye@gmail.com",
            state: "NSW",
            residencyStatus: "AC",
            investmentType: "buy_established_home_to_live",
            firstTimeBuyer: true,
            stateCapitalCityBuyer: true,
            buyerAgreedToConnectWithAgent: false,
        },
        financialInformation: {
            annualIncome: 35000,
            lengthOfEmployment: 5,
            totalAmountSaved: 60000,
            parentWillBeGuarantors: false,
            totalLoanAmount: 10000,
            totalLoanRepayments: 50,
            helpDebtTotalAmount: 200,
            totalExistingHomeLoanAmount: 4500,
            totalExistingHomeLoanRepaymentAmt: 250,
            totalPropertyValue: 20000,
            totalCreditCardLimits: 230,
            livingExpenses: 500,
            wereBankrupted: false,
            hasDefaulted: false,
            defaultedReason: null,
        }
    },
    generalInformation: {
        numberOfDependant: 2,
        hasPropertyOffer: true,
        propertyOfferElaboration: 'Test',
        applicantOptionalNote: 'Initial Test',
        referralOption: '001',
        applicantAgreedOnConditions: true
    },
    applicationStatus: [
        {
            note: "test1",
            status: { name: "Inquiry", status: "INQUIRY"},
            userId: 1,
            createDateTime: new Date()
        },
        {
            note: "test2",
            status: { name: "Cancelled", status: "CANCELLED"},
            userId: 1,
            createDateTime: new Date().setDate(2)
        }
    ],
  },
];
