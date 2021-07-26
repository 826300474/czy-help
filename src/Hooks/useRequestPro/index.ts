import { message } from 'antd';
import useRequest from '@ahooksjs/use-request';
import 'antd/dist/antd.css';

import {
  BaseOptions,
  BasePaginatedOptions,
  BaseResult,
  CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  LoadMoreParams,
  LoadMoreResult,
  OptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedOptionsWithFormat,
  PaginatedParams,
  PaginatedResult,
} from '_@ahooksjs_use-request@2.8.10@@ahooksjs/use-request/lib/types';

let hide: (() => void) | null;

function onTodo(tip?: string, todo?: () => void) {
  if (tip) {
    hide?.();
    hide = null;
    todo?.();
  }
}

function useRequestPro<R = any, P extends any[] = any, U = any, UU extends U = any>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, UU>,
  tip?: string,
): BaseResult<U, P>;

function useRequestPro<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R, P>,
  tip?: string,
): BaseResult<R, P>;

function useRequestPro<R extends LoadMoreFormatReturn, RR>(
  service: CombineService<RR, LoadMoreParams<R>>,
  options: LoadMoreOptionsWithFormat<R, RR>,
  tip?: string,
): LoadMoreResult<R>;
function useRequestPro<R extends LoadMoreFormatReturn, RR extends R>(
  service: CombineService<R, LoadMoreParams<R>>,
  options: LoadMoreOptions<RR>,
  tip?: string,
): LoadMoreResult<R>;

function useRequestPro<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: PaginatedOptionsWithFormat<R, Item, U>,
  tip?: string,
): PaginatedResult<Item>;
function useRequestPro<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BasePaginatedOptions<U>,
  tip?: string,
): PaginatedResult<Item>;

function useRequestPro(service: any, options: any = {}, tip?: string) {

  const { onSuccess, onError, ...restOptions } = options;

  const { run, ...rest } = useRequest(service, {
    ...restOptions,
    onSuccess: (data, params) => {
      onTodo(tip, () => {
        message.success(`${tip}成功`);
        onSuccess?.(data, params);
      });
    },
    onError: (err, params) => {
      onTodo(tip, () => {
        onError(err, params);
      });
    },
  });

  return {
    run: (...args: any) => {
      if (tip && !hide) {
        hide = message.loading(`正在${tip}`);
      }
      run(args);
    },
    ...rest,
  };
}

export default useRequestPro;
