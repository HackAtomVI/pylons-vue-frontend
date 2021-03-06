import { Reader, Writer } from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Trade } from "../pylons/trade";
import { Fighter } from "../pylons/fighter";
import { RedeemInfo } from "../pylons/redeem_info";
import { PaymentInfo } from "../pylons/payment_info";
import { Username, AccountAddr } from "../pylons/accounts";
import { Item } from "../pylons/item";
import { GoogleInAppPurchaseOrder } from "../pylons/google_iap_order";
import { Execution } from "../pylons/execution";
import { Recipe } from "../pylons/recipe";
import { Cookbook } from "../pylons/cookbook";
export declare const protobufPackage = "Pylonstech.pylons.pylons";
export interface QueryListTradesByCreatorRequest {
    creator: string;
    pagination: PageRequest | undefined;
}
export interface QueryListTradesByCreatorResponse {
    Trades: Trade[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryFightRequest {
    ID: number;
}
export interface QueryFightResponse {
    Fighter: Fighter | undefined;
}
/** this line is used by starport scaffolding # 3 */
export interface QueryGetRedeemInfoRequest {
    ID: string;
}
export interface QueryGetRedeemInfoResponse {
    RedeemInfo: RedeemInfo | undefined;
}
export interface QueryAllRedeemInfoRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllRedeemInfoResponse {
    RedeemInfo: RedeemInfo[];
    pagination: PageResponse | undefined;
}
export interface QueryGetPaymentInfoRequest {
    purchaseID: string;
}
export interface QueryGetPaymentInfoResponse {
    PaymentInfo: PaymentInfo | undefined;
}
export interface QueryAllPaymentInfoRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllPaymentInfoResponse {
    PaymentInfo: PaymentInfo[];
    pagination: PageResponse | undefined;
}
export interface QueryGetUsernameByAddressRequest {
    address: string;
}
export interface QueryGetAddressByUsernameRequest {
    username: string;
}
export interface QueryGetUsernameByAddressResponse {
    username: Username | undefined;
}
export interface QueryGetAddressByUsernameResponse {
    address: AccountAddr | undefined;
}
export interface QueryGetTradeRequest {
    ID: number;
}
export interface QueryGetTradeResponse {
    Trade: Trade | undefined;
}
export interface QueryListItemByOwnerRequest {
    owner: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
export interface QueryListItemByOwnerResponse {
    Items: Item[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryGetGoogleInAppPurchaseOrderRequest {
    PurchaseToken: string;
}
export interface QueryGetGoogleInAppPurchaseOrderResponse {
    Order: GoogleInAppPurchaseOrder | undefined;
}
export interface QueryListExecutionsByItemRequest {
    CookbookID: string;
    ItemID: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
export interface QueryListExecutionsByItemResponse {
    CompletedExecutions: Execution[];
    PendingExecutions: Execution[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryListExecutionsByRecipeRequest {
    CookbookID: string;
    RecipeID: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
export interface QueryListExecutionsByRecipeResponse {
    CompletedExecutions: Execution[];
    PendingExecutions: Execution[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryGetExecutionRequest {
    ID: string;
}
export interface QueryGetExecutionResponse {
    Execution: Execution | undefined;
    Completed: boolean;
}
export interface QueryListRecipesByCookbookRequest {
    CookbookID: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
export interface QueryListRecipesByCookbookResponse {
    Recipes: Recipe[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryGetItemRequest {
    CookbookID: string;
    ID: string;
}
export interface QueryGetItemResponse {
    Item: Item | undefined;
}
export interface QueryGetRecipeRequest {
    CookbookID: string;
    ID: string;
}
export interface QueryGetRecipeResponse {
    Recipe: Recipe | undefined;
}
export interface QueryListCookbooksByCreatorRequest {
    creator: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
export interface QueryListCookbooksByCreatorResponse {
    Cookbooks: Cookbook[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export interface QueryGetCookbookRequest {
    ID: string;
}
export interface QueryGetCookbookResponse {
    Cookbook: Cookbook | undefined;
}
export declare const QueryListTradesByCreatorRequest: {
    encode(message: QueryListTradesByCreatorRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListTradesByCreatorRequest;
    fromJSON(object: any): QueryListTradesByCreatorRequest;
    toJSON(message: QueryListTradesByCreatorRequest): unknown;
    fromPartial(object: DeepPartial<QueryListTradesByCreatorRequest>): QueryListTradesByCreatorRequest;
};
export declare const QueryListTradesByCreatorResponse: {
    encode(message: QueryListTradesByCreatorResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListTradesByCreatorResponse;
    fromJSON(object: any): QueryListTradesByCreatorResponse;
    toJSON(message: QueryListTradesByCreatorResponse): unknown;
    fromPartial(object: DeepPartial<QueryListTradesByCreatorResponse>): QueryListTradesByCreatorResponse;
};
export declare const QueryFightRequest: {
    encode(message: QueryFightRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryFightRequest;
    fromJSON(object: any): QueryFightRequest;
    toJSON(message: QueryFightRequest): unknown;
    fromPartial(object: DeepPartial<QueryFightRequest>): QueryFightRequest;
};
export declare const QueryFightResponse: {
    encode(message: QueryFightResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryFightResponse;
    fromJSON(object: any): QueryFightResponse;
    toJSON(message: QueryFightResponse): unknown;
    fromPartial(object: DeepPartial<QueryFightResponse>): QueryFightResponse;
};
export declare const QueryGetRedeemInfoRequest: {
    encode(message: QueryGetRedeemInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRedeemInfoRequest;
    fromJSON(object: any): QueryGetRedeemInfoRequest;
    toJSON(message: QueryGetRedeemInfoRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRedeemInfoRequest>): QueryGetRedeemInfoRequest;
};
export declare const QueryGetRedeemInfoResponse: {
    encode(message: QueryGetRedeemInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRedeemInfoResponse;
    fromJSON(object: any): QueryGetRedeemInfoResponse;
    toJSON(message: QueryGetRedeemInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRedeemInfoResponse>): QueryGetRedeemInfoResponse;
};
export declare const QueryAllRedeemInfoRequest: {
    encode(message: QueryAllRedeemInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRedeemInfoRequest;
    fromJSON(object: any): QueryAllRedeemInfoRequest;
    toJSON(message: QueryAllRedeemInfoRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllRedeemInfoRequest>): QueryAllRedeemInfoRequest;
};
export declare const QueryAllRedeemInfoResponse: {
    encode(message: QueryAllRedeemInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllRedeemInfoResponse;
    fromJSON(object: any): QueryAllRedeemInfoResponse;
    toJSON(message: QueryAllRedeemInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllRedeemInfoResponse>): QueryAllRedeemInfoResponse;
};
export declare const QueryGetPaymentInfoRequest: {
    encode(message: QueryGetPaymentInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPaymentInfoRequest;
    fromJSON(object: any): QueryGetPaymentInfoRequest;
    toJSON(message: QueryGetPaymentInfoRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetPaymentInfoRequest>): QueryGetPaymentInfoRequest;
};
export declare const QueryGetPaymentInfoResponse: {
    encode(message: QueryGetPaymentInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPaymentInfoResponse;
    fromJSON(object: any): QueryGetPaymentInfoResponse;
    toJSON(message: QueryGetPaymentInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetPaymentInfoResponse>): QueryGetPaymentInfoResponse;
};
export declare const QueryAllPaymentInfoRequest: {
    encode(message: QueryAllPaymentInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPaymentInfoRequest;
    fromJSON(object: any): QueryAllPaymentInfoRequest;
    toJSON(message: QueryAllPaymentInfoRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllPaymentInfoRequest>): QueryAllPaymentInfoRequest;
};
export declare const QueryAllPaymentInfoResponse: {
    encode(message: QueryAllPaymentInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllPaymentInfoResponse;
    fromJSON(object: any): QueryAllPaymentInfoResponse;
    toJSON(message: QueryAllPaymentInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllPaymentInfoResponse>): QueryAllPaymentInfoResponse;
};
export declare const QueryGetUsernameByAddressRequest: {
    encode(message: QueryGetUsernameByAddressRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUsernameByAddressRequest;
    fromJSON(object: any): QueryGetUsernameByAddressRequest;
    toJSON(message: QueryGetUsernameByAddressRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetUsernameByAddressRequest>): QueryGetUsernameByAddressRequest;
};
export declare const QueryGetAddressByUsernameRequest: {
    encode(message: QueryGetAddressByUsernameRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAddressByUsernameRequest;
    fromJSON(object: any): QueryGetAddressByUsernameRequest;
    toJSON(message: QueryGetAddressByUsernameRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAddressByUsernameRequest>): QueryGetAddressByUsernameRequest;
};
export declare const QueryGetUsernameByAddressResponse: {
    encode(message: QueryGetUsernameByAddressResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetUsernameByAddressResponse;
    fromJSON(object: any): QueryGetUsernameByAddressResponse;
    toJSON(message: QueryGetUsernameByAddressResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetUsernameByAddressResponse>): QueryGetUsernameByAddressResponse;
};
export declare const QueryGetAddressByUsernameResponse: {
    encode(message: QueryGetAddressByUsernameResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAddressByUsernameResponse;
    fromJSON(object: any): QueryGetAddressByUsernameResponse;
    toJSON(message: QueryGetAddressByUsernameResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetAddressByUsernameResponse>): QueryGetAddressByUsernameResponse;
};
export declare const QueryGetTradeRequest: {
    encode(message: QueryGetTradeRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTradeRequest;
    fromJSON(object: any): QueryGetTradeRequest;
    toJSON(message: QueryGetTradeRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetTradeRequest>): QueryGetTradeRequest;
};
export declare const QueryGetTradeResponse: {
    encode(message: QueryGetTradeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTradeResponse;
    fromJSON(object: any): QueryGetTradeResponse;
    toJSON(message: QueryGetTradeResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetTradeResponse>): QueryGetTradeResponse;
};
export declare const QueryListItemByOwnerRequest: {
    encode(message: QueryListItemByOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListItemByOwnerRequest;
    fromJSON(object: any): QueryListItemByOwnerRequest;
    toJSON(message: QueryListItemByOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryListItemByOwnerRequest>): QueryListItemByOwnerRequest;
};
export declare const QueryListItemByOwnerResponse: {
    encode(message: QueryListItemByOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListItemByOwnerResponse;
    fromJSON(object: any): QueryListItemByOwnerResponse;
    toJSON(message: QueryListItemByOwnerResponse): unknown;
    fromPartial(object: DeepPartial<QueryListItemByOwnerResponse>): QueryListItemByOwnerResponse;
};
export declare const QueryGetGoogleInAppPurchaseOrderRequest: {
    encode(message: QueryGetGoogleInAppPurchaseOrderRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetGoogleInAppPurchaseOrderRequest;
    fromJSON(object: any): QueryGetGoogleInAppPurchaseOrderRequest;
    toJSON(message: QueryGetGoogleInAppPurchaseOrderRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetGoogleInAppPurchaseOrderRequest>): QueryGetGoogleInAppPurchaseOrderRequest;
};
export declare const QueryGetGoogleInAppPurchaseOrderResponse: {
    encode(message: QueryGetGoogleInAppPurchaseOrderResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetGoogleInAppPurchaseOrderResponse;
    fromJSON(object: any): QueryGetGoogleInAppPurchaseOrderResponse;
    toJSON(message: QueryGetGoogleInAppPurchaseOrderResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetGoogleInAppPurchaseOrderResponse>): QueryGetGoogleInAppPurchaseOrderResponse;
};
export declare const QueryListExecutionsByItemRequest: {
    encode(message: QueryListExecutionsByItemRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListExecutionsByItemRequest;
    fromJSON(object: any): QueryListExecutionsByItemRequest;
    toJSON(message: QueryListExecutionsByItemRequest): unknown;
    fromPartial(object: DeepPartial<QueryListExecutionsByItemRequest>): QueryListExecutionsByItemRequest;
};
export declare const QueryListExecutionsByItemResponse: {
    encode(message: QueryListExecutionsByItemResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListExecutionsByItemResponse;
    fromJSON(object: any): QueryListExecutionsByItemResponse;
    toJSON(message: QueryListExecutionsByItemResponse): unknown;
    fromPartial(object: DeepPartial<QueryListExecutionsByItemResponse>): QueryListExecutionsByItemResponse;
};
export declare const QueryListExecutionsByRecipeRequest: {
    encode(message: QueryListExecutionsByRecipeRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListExecutionsByRecipeRequest;
    fromJSON(object: any): QueryListExecutionsByRecipeRequest;
    toJSON(message: QueryListExecutionsByRecipeRequest): unknown;
    fromPartial(object: DeepPartial<QueryListExecutionsByRecipeRequest>): QueryListExecutionsByRecipeRequest;
};
export declare const QueryListExecutionsByRecipeResponse: {
    encode(message: QueryListExecutionsByRecipeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListExecutionsByRecipeResponse;
    fromJSON(object: any): QueryListExecutionsByRecipeResponse;
    toJSON(message: QueryListExecutionsByRecipeResponse): unknown;
    fromPartial(object: DeepPartial<QueryListExecutionsByRecipeResponse>): QueryListExecutionsByRecipeResponse;
};
export declare const QueryGetExecutionRequest: {
    encode(message: QueryGetExecutionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetExecutionRequest;
    fromJSON(object: any): QueryGetExecutionRequest;
    toJSON(message: QueryGetExecutionRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetExecutionRequest>): QueryGetExecutionRequest;
};
export declare const QueryGetExecutionResponse: {
    encode(message: QueryGetExecutionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetExecutionResponse;
    fromJSON(object: any): QueryGetExecutionResponse;
    toJSON(message: QueryGetExecutionResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetExecutionResponse>): QueryGetExecutionResponse;
};
export declare const QueryListRecipesByCookbookRequest: {
    encode(message: QueryListRecipesByCookbookRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListRecipesByCookbookRequest;
    fromJSON(object: any): QueryListRecipesByCookbookRequest;
    toJSON(message: QueryListRecipesByCookbookRequest): unknown;
    fromPartial(object: DeepPartial<QueryListRecipesByCookbookRequest>): QueryListRecipesByCookbookRequest;
};
export declare const QueryListRecipesByCookbookResponse: {
    encode(message: QueryListRecipesByCookbookResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListRecipesByCookbookResponse;
    fromJSON(object: any): QueryListRecipesByCookbookResponse;
    toJSON(message: QueryListRecipesByCookbookResponse): unknown;
    fromPartial(object: DeepPartial<QueryListRecipesByCookbookResponse>): QueryListRecipesByCookbookResponse;
};
export declare const QueryGetItemRequest: {
    encode(message: QueryGetItemRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetItemRequest;
    fromJSON(object: any): QueryGetItemRequest;
    toJSON(message: QueryGetItemRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetItemRequest>): QueryGetItemRequest;
};
export declare const QueryGetItemResponse: {
    encode(message: QueryGetItemResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetItemResponse;
    fromJSON(object: any): QueryGetItemResponse;
    toJSON(message: QueryGetItemResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetItemResponse>): QueryGetItemResponse;
};
export declare const QueryGetRecipeRequest: {
    encode(message: QueryGetRecipeRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRecipeRequest;
    fromJSON(object: any): QueryGetRecipeRequest;
    toJSON(message: QueryGetRecipeRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetRecipeRequest>): QueryGetRecipeRequest;
};
export declare const QueryGetRecipeResponse: {
    encode(message: QueryGetRecipeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetRecipeResponse;
    fromJSON(object: any): QueryGetRecipeResponse;
    toJSON(message: QueryGetRecipeResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetRecipeResponse>): QueryGetRecipeResponse;
};
export declare const QueryListCookbooksByCreatorRequest: {
    encode(message: QueryListCookbooksByCreatorRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListCookbooksByCreatorRequest;
    fromJSON(object: any): QueryListCookbooksByCreatorRequest;
    toJSON(message: QueryListCookbooksByCreatorRequest): unknown;
    fromPartial(object: DeepPartial<QueryListCookbooksByCreatorRequest>): QueryListCookbooksByCreatorRequest;
};
export declare const QueryListCookbooksByCreatorResponse: {
    encode(message: QueryListCookbooksByCreatorResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryListCookbooksByCreatorResponse;
    fromJSON(object: any): QueryListCookbooksByCreatorResponse;
    toJSON(message: QueryListCookbooksByCreatorResponse): unknown;
    fromPartial(object: DeepPartial<QueryListCookbooksByCreatorResponse>): QueryListCookbooksByCreatorResponse;
};
export declare const QueryGetCookbookRequest: {
    encode(message: QueryGetCookbookRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCookbookRequest;
    fromJSON(object: any): QueryGetCookbookRequest;
    toJSON(message: QueryGetCookbookRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCookbookRequest>): QueryGetCookbookRequest;
};
export declare const QueryGetCookbookResponse: {
    encode(message: QueryGetCookbookResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCookbookResponse;
    fromJSON(object: any): QueryGetCookbookResponse;
    toJSON(message: QueryGetCookbookResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCookbookResponse>): QueryGetCookbookResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of listTradesByCreator items. */
    ListTradesByCreator(request: QueryListTradesByCreatorRequest): Promise<QueryListTradesByCreatorResponse>;
    /** Queries a list of fight items. */
    Fight(request: QueryFightRequest): Promise<QueryFightResponse>;
    /** Queries a redeemInfo by index. */
    RedeemInfo(request: QueryGetRedeemInfoRequest): Promise<QueryGetRedeemInfoResponse>;
    /** Queries a list of redeemInfo items. */
    RedeemInfoAll(request: QueryAllRedeemInfoRequest): Promise<QueryAllRedeemInfoResponse>;
    /** Queries a paymentInfo by index. */
    PaymentInfo(request: QueryGetPaymentInfoRequest): Promise<QueryGetPaymentInfoResponse>;
    /** Queries a list of paymentInfo items. */
    PaymentInfoAll(request: QueryAllPaymentInfoRequest): Promise<QueryAllPaymentInfoResponse>;
    /** Queries a list of getAccountByAddress items. */
    UsernameByAddress(request: QueryGetUsernameByAddressRequest): Promise<QueryGetUsernameByAddressResponse>;
    /** Queries a username by account. */
    AddressByUsername(request: QueryGetAddressByUsernameRequest): Promise<QueryGetAddressByUsernameResponse>;
    /** Queries a trade by id. */
    Trade(request: QueryGetTradeRequest): Promise<QueryGetTradeResponse>;
    /** Queries a list of listItemByOwner items. */
    ListItemByOwner(request: QueryListItemByOwnerRequest): Promise<QueryListItemByOwnerResponse>;
    /** Queries a googleIAPOrder by PurchaseToken. */
    GoogleInAppPurchaseOrder(request: QueryGetGoogleInAppPurchaseOrderRequest): Promise<QueryGetGoogleInAppPurchaseOrderResponse>;
    /** Queries a list of listExecutionsByItem items. */
    ListExecutionsByItem(request: QueryListExecutionsByItemRequest): Promise<QueryListExecutionsByItemResponse>;
    /** Queries a list of listExecutionsByRecipe items. */
    ListExecutionsByRecipe(request: QueryListExecutionsByRecipeRequest): Promise<QueryListExecutionsByRecipeResponse>;
    /** Queries a execution by id. */
    Execution(request: QueryGetExecutionRequest): Promise<QueryGetExecutionResponse>;
    /** Queries a list of listRecipesByCookbook items. */
    ListRecipesByCookbook(request: QueryListRecipesByCookbookRequest): Promise<QueryListRecipesByCookbookResponse>;
    /** Queries a item by ID. */
    Item(request: QueryGetItemRequest): Promise<QueryGetItemResponse>;
    /** Retrieves a recipe by ID. */
    Recipe(request: QueryGetRecipeRequest): Promise<QueryGetRecipeResponse>;
    /** Retrieves the list of cookbooks owned by an address */
    ListCookbooksByCreator(request: QueryListCookbooksByCreatorRequest): Promise<QueryListCookbooksByCreatorResponse>;
    /** Retrieves a cookbook by ID. */
    Cookbook(request: QueryGetCookbookRequest): Promise<QueryGetCookbookResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ListTradesByCreator(request: QueryListTradesByCreatorRequest): Promise<QueryListTradesByCreatorResponse>;
    Fight(request: QueryFightRequest): Promise<QueryFightResponse>;
    RedeemInfo(request: QueryGetRedeemInfoRequest): Promise<QueryGetRedeemInfoResponse>;
    RedeemInfoAll(request: QueryAllRedeemInfoRequest): Promise<QueryAllRedeemInfoResponse>;
    PaymentInfo(request: QueryGetPaymentInfoRequest): Promise<QueryGetPaymentInfoResponse>;
    PaymentInfoAll(request: QueryAllPaymentInfoRequest): Promise<QueryAllPaymentInfoResponse>;
    UsernameByAddress(request: QueryGetUsernameByAddressRequest): Promise<QueryGetUsernameByAddressResponse>;
    AddressByUsername(request: QueryGetAddressByUsernameRequest): Promise<QueryGetAddressByUsernameResponse>;
    Trade(request: QueryGetTradeRequest): Promise<QueryGetTradeResponse>;
    ListItemByOwner(request: QueryListItemByOwnerRequest): Promise<QueryListItemByOwnerResponse>;
    GoogleInAppPurchaseOrder(request: QueryGetGoogleInAppPurchaseOrderRequest): Promise<QueryGetGoogleInAppPurchaseOrderResponse>;
    ListExecutionsByItem(request: QueryListExecutionsByItemRequest): Promise<QueryListExecutionsByItemResponse>;
    ListExecutionsByRecipe(request: QueryListExecutionsByRecipeRequest): Promise<QueryListExecutionsByRecipeResponse>;
    Execution(request: QueryGetExecutionRequest): Promise<QueryGetExecutionResponse>;
    ListRecipesByCookbook(request: QueryListRecipesByCookbookRequest): Promise<QueryListRecipesByCookbookResponse>;
    Item(request: QueryGetItemRequest): Promise<QueryGetItemResponse>;
    Recipe(request: QueryGetRecipeRequest): Promise<QueryGetRecipeResponse>;
    ListCookbooksByCreator(request: QueryListCookbooksByCreatorRequest): Promise<QueryListCookbooksByCreatorResponse>;
    Cookbook(request: QueryGetCookbookRequest): Promise<QueryGetCookbookResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
