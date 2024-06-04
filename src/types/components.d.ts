import ThsStockList from '@/components/ThsStockList.vue'
declare module 'vue' {
  export interface GlobalComponents {
    ThsStockList: typeof ThsStockList
  }
}
// 组件实例类型
export type ThsStockListInstance = InstanceType<typeof ThsStockList>
