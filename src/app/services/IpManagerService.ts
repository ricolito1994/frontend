import { AbstractApiService } from './ApiAbstract'
import { IP_MANAGER } from '@constants/api'

export default class IpManagerService extends AbstractApiService {
    protected ipManager: any;

    public constructor(
        accessToken: string|undefined|null, 
        baseURL? : string|undefined|null, 
        refreshToken? : string|undefined|null,
        onAuthTokenUpdate? : (data:any) => void
    ) {
        super (accessToken, baseURL, refreshToken, onAuthTokenUpdate)
        this.ipManager = IP_MANAGER;
    }

    async index <T=any> (page:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.ipManager.index(page), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async show <T=any> (id:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.ipManager.show(id), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async update <T=any> (id:number, userId:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.ipManager.patch(id, userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async store <T=any> (userId:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.ipManager.store(userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async kill <T=any> (id:number, userId:number, config: any) {
        try {
            let response = await this.requestV2<T>(this.ipManager.delete(id, userId), {}, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }
}