import { useEffect, useState } from "react";

function UseIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return isMounted
}
export default UseIsMounted