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
    'login'     : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/login`,      req: "post"}),
    'logout'    : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logout`,     req: "post"}),
    'refresh'   : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/refreshAccessToken`,    req: "post"}), 
    'me'        : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/me`,         req: "post"}),
    'findUser'  : (userId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/user/${userId}`, req: "get"}),         
}

const LOG: Object = {
    'index'   : (page: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs?page=${page}`,  req: "get"}),
    'store'   : ()             :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs`,       req: "post"}),
    'show'    : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "get"}),
    'patch'   : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "patch"}), 
    'delete'  : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "delete"}),                  
}

const IP_MANAGER: Object = {
    'index'   : (page: Number):   HTTPEnpointType => ({endpoint: `${BASE_URL}/ip/${page}`,  req: "get"}),
    'store'   : (userId: Number):   HTTPEnpointType => ({endpoint: `${BASE_URL}/ip/create/${userId}`,req: "post"}),
    'show'    : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ip/find/${id}`, req: "get"}),
    'patch'   : (id: Number, userId: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ip/update/${id}/${userId}`, req: "patch"}), 
    'delete'  : (id: Number, userId: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/ip/delete/${id}/${userId}`, req: "delete"}),                  
}

export { 
    AUTH,
    IP_MANAGER,
    LOG,
};