import React from 'react'

import { useDrag } from 'react-dnd'

import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

import SectionGroup from '../../../types/SectionGroup'
import sectionTypeFull from '../../../utils/sectionTypes'

interface SectionGroupCardProps {
  sectionGroup: SectionGroup
}

const SectionGroupCard: React.FC<SectionGroupCardProps> = (props) => {
  let { sectionGroup } = props

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sectionGroup',
    item: sectionGroup,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <Card
      ref={drag}
      sx={{
        width: '100%',
        maxWidth: 300,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <CardContent>
        <Typography variant='body2'>
          {sectionTypeFull[sectionGroup.type]}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SectionGroupCard
