"use client";

import React, { ReactNode } from "react";

function NodeCard({children, nodeId}: { nodeId: string; children: ReactNode;}) {
  return (
    <div>
      {children}
    </div>
  )
}

export default NodeCard;
