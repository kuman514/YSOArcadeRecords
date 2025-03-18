export enum RouteHandlerCallResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface FailedRouteHandlerCallResponse {
  result: RouteHandlerCallResponseStatus.FAILED;
  error: string;
}

export interface BaseSuccessRouteHandlerCallResponse {
  result: RouteHandlerCallResponseStatus.SUCCESS;
}

export type SuccessRouteHandlerCallResponse<T extends object> =
  BaseSuccessRouteHandlerCallResponse & T;

export type RouteHandlerCallResponse<T extends object> =
  | FailedRouteHandlerCallResponse
  | SuccessRouteHandlerCallResponse<T>;
