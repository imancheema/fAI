import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
type ModelContextType = {
  modelFile: File | null;
  setModelFile: (file: File | null) => void;
};

// Create the context
const ModelContext = createContext<ModelContextType | undefined>(undefined);

// Context provider component
export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [modelFile, setModelFile] = useState<File | null>(null);

  return (
    <ModelContext.Provider value={{ modelFile, setModelFile }}>
      {children}
    </ModelContext.Provider>
  );
};

// Hook to use the context
export const useModelContext = (): ModelContextType => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
};

//  proper module for TypeScript
export {};
