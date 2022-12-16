import React from 'react'

const AppWrapper = (props: React.ComponentProps<any>) => {
     return (
          <section id='AppWrapper'
               className='w-full my-10 mx-4 sm:mx-10 md:mx-16 lg:mx-20 lg:my-8 flex text-mainTextColor'
               {...props}>
               {props.children}
          </section>
     )
}

export default AppWrapper