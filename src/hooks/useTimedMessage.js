import { useEffect, useState } from "react";

export default function useTimedMessage(timeout = 5000) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, timeout);

    return () => clearTimeout(timer);
  }, [message, timeout]);

  return [message, setMessage];
}
