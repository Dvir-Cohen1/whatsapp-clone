import React from 'react'

const MainContent = (props: React.ComponentProps<any>) => {
     return (
          <div className="flex justify-center items-center align-middle w-full h-full my-auto text-center border-b-4 border-green-500" {...props}>{props.children}</div>
     )
}

export default MainContent