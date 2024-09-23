import React from "react";
import { MederiLayout } from "../mederi/layout";

interface LoadingOrErrorProps {
  isLoading: boolean;
  errorMessage?: string;
  loadingMessage?: string;
}

export const Loading: React.FC<LoadingOrErrorProps> = ({
  isLoading,
  errorMessage,
  loadingMessage = "Cargando, por favor espere...",
}) => {
  return (
    <MederiLayout>
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <p className="text-lg text-[#F05A03] font-semibold">{loadingMessage}</p>
        ) : errorMessage ? (
          <p className="text-lg text-red-500 font-semibold">{errorMessage}</p>
        ) : null}
      </div>
    </MederiLayout>
  );
};
