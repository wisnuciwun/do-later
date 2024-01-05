"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

type ProviderPropTypes = {
     children: ReactNode
}

export function Providers({ children }: ProviderPropTypes) {
     return <Provider store={store}>{children}</Provider>;
}