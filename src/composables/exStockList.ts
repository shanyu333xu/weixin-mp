import type { ThsStockListInstance } from '../types/components'
import { ref } from 'vue'

export const useStockList = () => {
  // 组件实例
  const stockListRef = ref<ThsStockListInstance | null>(null);

  // 滚动触底事件
  const onScrolltolower = () => {
    console.log('Scroll to lower');
    stockListRef.value?.getStockData();
  };

  return { stockListRef, onScrolltolower };
};
