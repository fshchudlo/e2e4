import { ListRequest } from './list-request';
/**
 * Represents request to the server for list.
 * 
 * You can use this contract in your end-user code for better code completion.
 */
export interface PagedListRequest extends ListRequest {
    /**
     * How many items already loaded to the list and must be skipped on next request.
     */
    skip: number;
    /**
     * How many items must be loaded on next request.
     */
    take: number;
}