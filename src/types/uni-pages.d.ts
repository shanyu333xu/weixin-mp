/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/home/home" |
       "/pages/contest/contest" |
       "/pages/favorites/favorites" |
       "/pages/market/market" |
       "/pages/search/search" |
       "/pages/stock-detail/stock-detail" |
       "/pages/trade/trade";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/home/home" | "/pages/market/market" | "/pages/favorites/favorites" | "/pages/trade/trade" | "/pages/contest/contest"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
