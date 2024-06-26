import { Colors } from '@/types/colors'
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    $colors: Colors;
  }
}