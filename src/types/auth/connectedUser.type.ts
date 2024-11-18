export type ConnectedUserType = {
    id: string;
    email: string;
    name: string;
    phone: string;
    agent: null | {
        id: string;
        name: string;
        userId: string;
        personId: string;
        serviceId: string;
        balanceId: string;
        type: string;
    };
    service: any;
    sysRole: any;
} 