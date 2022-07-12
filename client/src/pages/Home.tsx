import Typography from '@mui/material/Typography'

import Page from './page/Page'
import PageBody from './page/PageBody'
import PageHeader from './page/PageHeader'

const HomePage = () => {
  return (
    <Page>
      <PageHeader title='Home'>
        <Typography variant='body2'>Header extra</Typography>
      </PageHeader>
      <PageBody>
        <Typography variant='h4'>Home page</Typography>
        <Typography variant='body2'>Body</Typography>
      </PageBody>
    </Page>
  )
}

export default HomePage
