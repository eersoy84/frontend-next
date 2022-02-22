import { useEffect, useState } from "react";

function UseHasMounted() {
  const [hasMounted, setHasMounted] = useState(undefined);
  useEffect(() => {
    if (typeof window !== undefined) {
      setHasMounted(true);
    }
  }, []);
  if (!hasMounted) return null;
  return hasMounted
}
export default UseHasMounted