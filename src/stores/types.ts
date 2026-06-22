export type Good = {
    id: number,
    name: string,
    description: string | null,
    price: number | undefined
} 

export interface Item extends Good {
    good_id: number,
    deal_id: number,
    quantity: number | undefined
}

export type Deal = {
    id: number,
    client_name: string | any,
    client_email: string,
    client_phone: string,
    client_buys: Item[],
    dealer_id?: number,
    dealer_name:string,
    deal_status: "successful" | "current" | "failed"
}

export type Report = {
    from_address: number | string,
    to_address: number | string,
    report: string,
    was_written: string,
    expires_at: string
}

export type Employee = {
    id: number,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    pos: string,
}