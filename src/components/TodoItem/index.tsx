import React from "react";

export default function TodoItem({
  onClick,
  children,
}: {
  onClick?: () => Promise<void>;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-[#141416] animate-show flex justify-start p-2 items-center w-[450px] mt-4 rounded-sm cursor-pointer hover:scale-105 transition-all select-none"
    >
      <div>{children}</div>
    </div>
  );
}
