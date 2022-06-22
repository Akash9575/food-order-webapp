import React, { useState } from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import '../styles/ProgressBar.css'

export const ProgressBar = () => {
  const step1Content = <span>step 1 content</span>;
  const step2Content = <span>step 2 content</span>;
  const step3Content = <span>step 3 content</span>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }

  const handleProgresBarSubmit = (e) => {
    console.log(e)
    console.log("he")
  }

//   const [progress,setprogress] =useState(75)

  return (
    <div className="progressBar">
      <StepProgressBar 
        //  percent={progress}
        startingStep={0}
        steps={[
          {
            label: "Briefing",
            name: "Briefing",
            content: step1Content
          },
          {
            label: "Image-Acquisition",
            name: "Image-Acquisition",
            content: step2Content
          },
          {
            label: "Image-processing",
            name: "Image Processing",
            content: step3Content,
            validator: step2Validator
          },
          {
            label: "Finish",
            name: "Finish",
            content: step3Content,
            validator: step3Validator
          }
        ]}
        onSubmit = {handleProgresBarSubmit}
        // primaryBtnClass="progressbar_buttons" 
        // secondaryBtnClass="progressbar_buttons"
      />
    </div>
  );
}


// ===

// import "react-step-progress-bar/styles.css";
// // import { ProgressBar, Step } from "react-step-progress-bar";

// const steps = [
//   {
//     status: "created"
//   },
//   {
//     status: "pendingApproval"
//   },
//   {
//     status: "cancelled"
//   },
//   {
//     status: "approved"
//   },
//   {
//     status: "pending"
//   },
//   {
//     status: "complete"
//   }
// ];

// export const ProgressBar = () => {
//   const transfer = {
//     status: "pendingApproval" // change transfer status to progress bar
//   };

//   const getStepPosition = (transferStatus) => {
//     return steps.findIndex(({ status }) => status === transferStatus);
//   };

//   return (
//     <>
//       <div style={{ margin: 50 }}>
//         <ProgressBar
//           width={750}
//           percent={
//             100 *
//               ((getStepPosition(transfer.status) + 1) / (steps.length - 1)) -
//             1
//           }
//           filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
//         >
//           {steps.map((step, index, arr) => {
//             return (
//               <Step
//                 // position={100 * (index / arr.length)}
//                 transition="scale"
//                 children={({ accomplished }) => (
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: "50%",
//                       width: 40,
//                       height: 40,
//                       color: "white",
//                       backgroundColor: accomplished ? "green" : "gray"
//                     }}
//                   >
//                     {index + 1}
//                   </div>
//                 )}
//               />
//             );
//           })}
//         </ProgressBar>
//       </div>
//     </>
//   );
// }
