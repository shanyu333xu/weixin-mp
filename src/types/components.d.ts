import { ThsStockList } from 'components';
import {ref} from 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    ThsStockList: typeof ThsStockList;
  }
}

// 组件实例类型
export type ThsStockListInstance = InstanceType<typeof ThsStockList>;
