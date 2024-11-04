"use client";

const FlexColumn = ({
  children,
  gap,
}: {
  children: React.ReactNode;
  gap?: number;
}) => {
  return (
    <div style={{ gap, display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
};

export default FlexColumn;
