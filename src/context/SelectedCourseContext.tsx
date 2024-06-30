import { createContext, useState, useContext, ReactNode } from 'react';

const SelectedCourseContext = createContext<SelectedCourseContextType | undefined>(undefined);

export const useSelectedCourse = () => {
  const context = useContext(SelectedCourseContext);
  if (context === undefined) {
    throw new Error('useSelectedCourse must be used within a SelectedCourseProvider');
  }
  return context;
};

export const SelectedCourseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [addCourse, setAddCourse] = useState<Course | null>(null);

  return (
    <SelectedCourseContext.Provider value={{ selectedCourse, setSelectedCourse, addCourse, setAddCourse }}>
      {children}
    </SelectedCourseContext.Provider>
  );
};
