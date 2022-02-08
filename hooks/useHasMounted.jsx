import { useEffect, useState } from "react";

function UseHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return hasMounted
}
export default UseHasMounted