
export const DashboardLayout = ({children}) => {
  return (

    <div className=" container-fluid h-auto  w-auto  bg-primary ">
        <div>


                <div className="container-fluid">
                    { children }
                </div>
            

        </div>

    </div>
  )
}


export default DashboardLayout
