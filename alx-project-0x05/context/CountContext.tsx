import { createContext, useContext, useState, ReactNode } from "react";

interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const CountContext = createContext<CountContextProps>({
  count: 0,
  increment: () => {},
  decrement: () => {},
});

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => (count > 0 ? count - 1 : 0));

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error("useCount must be within a Count Provider");
  }

  return context;
};