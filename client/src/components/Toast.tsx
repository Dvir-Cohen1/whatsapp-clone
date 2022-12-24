import * as React from 'react';
import Alert from '@mui/material/Alert';
import { IappProps } from '../@types/auth';

const Toast = ({children}:any) => {
     return (
          <div className='my-5'>
               <Alert severity="warning" color="warning">
                    {children}
               </Alert>
          </div>
     )
}

export default Toast