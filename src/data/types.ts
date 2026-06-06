export type Good = {
    id: number,
    name: string,
    desc: string,
    price: number,
    quantity: number
} 

export type Deal = {
    dealId: number,
    clientName: string,
    clientEmail: string,
    clientPhoneNumber: string,
    clientBuys: Good[],
    dealerName: string,
    dealStatus: "successful" | "current" | "failed" 
}

export type Report = {
    from: string,
    to: string,
    report: string,
    wasWritten: string,
    expiresAt: string
}