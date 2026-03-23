export interface IPAddress {
    id : number,
    ip_address: string,
    ip_version: number,
    label?: string,
    created_by: string,
    deleted_at?: string,
    created_at: string,
    updated_by?: string,
}

export interface IPAddressData extends IPAddress {
    data: IPAddress [] 
}