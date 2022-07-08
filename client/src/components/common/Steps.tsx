import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


interface StepsProps {
  steps: string[];
  activeStep: number;
};


const Steps: React.FC<StepsProps> = (props) => {
  const { steps, activeStep } = props;

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default Steps;
