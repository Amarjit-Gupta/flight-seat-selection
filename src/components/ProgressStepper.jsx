import { Check } from "lucide-react";
import { getThemeColors } from "../utils/colors";

const steps = [
  { id: 1, title: "Passenger Selection" },
  { id: 2, title: "Seat Selection" },
  { id: 3, title: "Summary" },
];

const ProgressStepper = ({activeStep,darkMode,completed = false}) => {  

  const { headingText, mutedText, connectorBg, completedConnector, completedCircle, activeCircle, inactiveCircle } = getThemeColors(darkMode);

  return (
    <div className={`w-full px-3 py-6 transition-colors duration-300 sm:px-6 ${darkMode ? "bg-black" : "bg-slate-100"}`}>
      <div className="mx-auto max-w-3xl">
        <div className="flex w-full items-start">

          {steps?.map((step, index) => {
            const isCompleted =completed || step.id < activeStep;

            const isActive =!completed && step.id === activeStep;

            const circleClass = isCompleted? completedCircle: isActive? activeCircle: inactiveCircle;

            return (
              <div key={step.id} className={`flex min-w-0 items-start ${index !== steps.length - 1? "flex-1": "shrink-0"}`}>
                <div className="flex w-[72px] shrink-0 flex-col items-center sm:w-28">
                  <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${circleClass}`}>
                    {isCompleted ? (<Check size={18} strokeWidth={2.5}/>) : (
                      <span className="text-sm font-semibold">
                        {step.id}
                      </span>
                    )}
                  </div>
                  <span
                    className={`mt-2 w-full text-center text-[10px] font-semibold transition-colors duration-300 sm:text-xs ${isCompleted || isActive
                        ? headingText
                        : mutedText
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`relative mt-[17px] mx-1 h-[2px] min-w-0 flex-1 overflow-hidden sm:mx-3 ${connectorBg}`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-300 ${
                        isCompleted
                          ? `w-full ${completedConnector}`
                          : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
