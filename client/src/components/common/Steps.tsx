import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepButton from '@mui/material/StepButton'

import {
  NavigateFunction,
  useMatch,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom'

export type Step = { label: string; path?: string }
interface StepsProps {
  steps: Step[]
  activeStep?: number
  clickable?: boolean
}

const Steps: React.FC<StepsProps> = (props) => {
  let navigate = useNavigate()

  const { steps, clickable, activeStep } = props

  const handleNavigation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault()
    navigate(path)
  }

  return (
    <Stepper
      nonLinear
      activeStep={
        clickable
          ? steps.findIndex((step) =>
              useMatch({ path: useResolvedPath(step.path!).pathname })
            )
          : activeStep!
      }
    >
      {steps.map((step) => (
        <Step key={step.label}>
          {clickable ? (
            <StepButton
              onClick={(event) => handleNavigation(event, step.path!)}
              disabled={false}
              disableRipple
            >
              {step.label}
            </StepButton>
          ) : (
            <StepLabel>{step.label}</StepLabel>
          )}
        </Step>
      ))}
    </Stepper>
  )
}

export default Steps
