export enum Locations {
    Home = 'Home',
    Appointments = 'Appointments',
    Medications = 'Medications',
    TestResults = 'Test Results',
    TestResultDetails = 'Test Result Details',
    AccountBalance = 'Account Balance',
}

export interface SessionAttributes {
    location: Locations;
    previousLocation: Locations[];
    keyData: any[];
    itemIndex: number;
    lastRequest: number;
}