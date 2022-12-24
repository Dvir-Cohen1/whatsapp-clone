import React from 'react'
import { IappProps } from '../@types/auth'

const Button = ({ children }: IappProps) => {
  return (
    <button className='bg-blue-500 px-5 py-3'>{children}</button>
  )
}

export default Button