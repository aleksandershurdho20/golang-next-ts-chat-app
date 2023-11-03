import { useState } from "react";

export default function useStepper(initialValue: string) {
  const [tab, setTab] = useState<string>(initialValue);
  const onTabChange = (tab: string) => setTab(tab);

  return {
    tab,
    onTabChange,
  };
}
