import React, { useState } from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import '../../styles/ProgressBar.css'

export const ProgressBar = () => {
  const step1Content = <span>Order Placed</span>;
  const step2Content = <span>Accepted by Restaurant</span>;
  const step3Content = <span>Accepted by Delivery Man</span>;
  const step4Content = <span>Out for Delivery</span>;
  const step5Content = <span>Delivered</span>;

  const [progress,setprogress] =useState(0)

  return (
    <div className="progressBar">
      <StepProgressBar 
        percent={progress}
        startingStep={0}
        steps={[
          {
            label: "Order Placed",
            name: "Order Placed",
            content: step1Content
          },
          {
            label: "Accepted by Restaurant",
            name: "Accepted by Restaurant",
            content: step2Content
          },
          {
            label: "Accepted by Delivery Man",
            name: "Accepted by Delivery Man",
            content: step3Content,
          },
          {
            label: "Out for Delivery",
            name: "Out for Delivery",
            content: step4Content,
          },
          {
            label: "Delivered",
            name: "Delivered",
            content: step5Content,
          }
        ]}
      />
    </div>
  );
}