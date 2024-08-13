import {useState} from 'react'

export default function TextExpander({ data }) {
  return (
    <div className="comp text-expander"> 
      <ExpanderBlock wordVisible={10} key={1}>{data[0]}</ExpanderBlock>
      <ExpanderBlock expandButtonText={'Show more'} collapseButtonText={'Show less'} buttonColor={'lightblue'} key={2}>{data[1]}</ExpanderBlock>
      <ExpanderBlock wordVisible={25} key={3}>{data[2]}</ExpanderBlock>
    </div>
  )
}

function ExpanderBlock({  
  buttonColor="#ff6622",
  wordVisible = 10, 
  expandButtonText="Show text", 
  collapseButtonText="Collapse text",
  children
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const splitText = () => children.split(/\s+/).slice(0, wordVisible).join(' ')

  const handleCollapse = () => {
    setIsCollapsed(s => !s)
  }

  return (
    <div>
      <span>{isCollapsed ? `${splitText()}... ` : `${children} `}</span>
      <span className='collapse-text' style={{color: buttonColor}} onClick={handleCollapse}>{isCollapsed ? expandButtonText : collapseButtonText}</span>
    </div>
  )
}