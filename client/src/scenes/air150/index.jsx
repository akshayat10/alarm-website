import React from 'react'
import AirCheckTable from 'components/AirCheckTable';
import AirCheckChart from 'components/AirCheckChart';

const air150 = () => {
  return (
    <div>
    <AirCheckChart operation="Op150" />
    <AirCheckTable operation="Op150" style={{ marginBottom: '20px' }}/>
    <div style={{marginBottom:"100px"}} />
    </div>
  )
}

export default air150