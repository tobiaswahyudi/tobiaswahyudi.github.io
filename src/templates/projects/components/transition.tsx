import React from 'react'

interface ProjectTransitionProps {
  topColor?: string
  bottomColor: string
  leftTab: boolean
}

export const ProjectTransition: React.FC<ProjectTransitionProps> = ({
  topColor = "#FCFCFA",
  bottomColor,
  leftTab
}: ProjectTransitionProps) => {
  return (
    <div className="project-transition" style={
      {
        backgroundColor: topColor,
        flexDirection: leftTab? "row" : "row-reverse"
      }
    }>
      <Tab color={bottomColor} flip={leftTab} />
    </div>
  )
}

interface TabProps {
  color: string
  flip?: boolean
}

const Tab: React.FC<TabProps> = ({ color, flip }: TabProps) => {
  return (
    <svg
      height="70"
      viewBox="0 0 551 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={flip ? "scale( -1, 1 )" : ""}
    >
      <path d="M47.5 12C43.8333 17.5 0 88.0001 0 88.0001H551V20C543.302 3.8779 538.18 0.0560744 528 0H68.5C55.5 0 51.1667 6.5 47.5 12Z" fill={color} />
    </svg>

  )
}