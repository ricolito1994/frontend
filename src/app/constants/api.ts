import { HTTPEnpointType } from "@models/api.model";
/**
 * api routes
 * 
 * scheme:
 * each index at the most parent
 * are the prefix to contain
 * each individual route
 * according to its specific
 * business logic.
 * 
 * in the backend, we 
 * must acheive these or we map
 * our routes according to
 * this scheme.
 * 
 * for ex., user
 * under user there are
 * auth and get_users so the parent
 * is user as the prefix
 * 
 * endpoint ex: 
 * http://localhost:8080/user/auth or 
 * http://localhost:8080/user/get_user  
 * 
 */

const BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? '';
/*
*
* Use this pattern if you create your own endpoint
* and include it on the export 
* so that you can use it outside
* this file
* 
* EndpointType is a model that defines
* the return type of each endpoint object
* @return
* endpoint: string
* req: HTTPMethod - get | post | patch | delete 
* basic CRUD
*
*/
const AUTH: Object = {
    'login'     : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/login`,      req: "post"}),
    'logout'    : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/logout`,     req: "post"}),
    'refresh'   : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/refreshAccessToken`,    req: "post"}), 
    'me'        : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/me`,         req: "post"}),                  
}

const IP_MANAGER: Object = {
    'index'   : ()           :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager`,       req: "get"}),
    'store'   : ()           :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager`,       req: "post"}),
    'show'    : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "get"}),
    'patch'   : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "patch"}), 
    'delete'  : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "delete"}),                  
}

const LOG: Object = {
    'index'   : ()           :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager`,       req: "get"}),
    'store'   : ()           :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager`,       req: "post"}),
    'show'    : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "get"}),
    'patch'   : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "patch"}), 
    'delete'  : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ipmanager/${id}`, req: "delete"}),                  
}

/*
 * I added to export BASE_URL just in case
 * If you want to import this to your service class
 * you can do is import { API } from 'app/constants/api' 
 * if you want to include the BASE_URL
 * import { API, BASE_URL } from 'app/constants/api'
 * 
*/
export { 
    AUTH,
    IP_MANAGER,
    LOG,
};