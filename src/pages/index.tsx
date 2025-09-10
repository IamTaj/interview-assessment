import PageLayoutComponent from "@/components/PageLayoutComponent";
import { persistor, store } from "@/store/appStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PageLayoutComponent />
        </PersistGate>
      </Provider>
    </>
  );
}
