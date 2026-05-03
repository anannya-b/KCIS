import { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [assessmentData, setAssessmentData] = useState(null);

  return (
    <AssessmentContext.Provider value={{ assessmentData, setAssessmentData }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}
