import { AbstractApiService } from './ApiAbstract'
import { LOG } from '@constants/api'

export default class LogsService extends AbstractApiService {
    protected log: any;

    public constructor(
        accessToken: string|undefined|null, 
        baseURL? : string|undefined|null, 
        refreshToken? : string|undefined|null,
        onAuthTokenUpdate? : (data:any) => void
    ) {
        super (accessToken, baseURL, refreshToken, onAuthTokenUpdate)
        this.log = LOG;
    }

    async index <T=any> (page:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.log.index(page), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async show <T=any> (id:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.log.show(id), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

}