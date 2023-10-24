import { useCallback, useState } from "react";

export default function useToogle() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleToogle = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  return {
    isOpened,
    handleToogle,
  } as const;
}
