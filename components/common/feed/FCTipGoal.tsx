type Props = {
  children?: React.ReactNode
  className?: string
  [x: string]: any
}

export default function FCTipGoal({ children, className, ...rest }: Props) {
  return (
    <div className={`fc-tip-goal ${className ?? ''}`} {...rest}>
      <div className="flex-col">
        <div className="label font-size-xs margin-bottom-text">
          Im ur kitty girl?
        </div>
        <div className="flex-row tip-goal">
          <div className="progress-wrapper">
            <div className="progress" style={{ width: '16.6667%' }}></div>
          </div>
          <i className="fa-fw fal fa-dollar-sign flex-0 margin-right-1 tip-hover-blue"></i>
          <div className="tipped-percentage flex-0 margin-right-text bold">
            16.67%{' '}
          </div>
          <div className="flex-1"></div>
          <div className="tip-goal-amount flex-0 margin-right-1"> 100%</div>
          <div className="flex-0 margin-left-1">
            <i className="fa-fw fas fa-arrows-rotate pointer blue-1-hover-only hover-effect"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
