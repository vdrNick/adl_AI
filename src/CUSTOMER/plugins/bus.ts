import { type App } from 'vue';
import mitt, { type Emitter } from 'mitt';
import type { Events as ProtoEvents } from '@/CORE/plugins/bus';
/**
 * bus merging from CORE/plugins/bus
 * 因為 declare module '@vue/runtime-core' 目前無法合併 interface
 * 僅能先將 CORE/plugins/bus 的 declare module 複製到此檔案
 */
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $bus: Emitter<Events>;
  }
}

export type Events = ProtoEvents & {
  Foo: 'bar';
};

export const emitter: Emitter<Events> = mitt<Events>();

/** 自訂插件，全域bus $bus */
export default {
  install: (app: App<Element>) => {
    app.config.globalProperties.$bus = emitter;
  }
};
