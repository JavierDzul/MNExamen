import { Navbar, Sidebar } from "../components/Design";

export const DashboardLayout = ({ children }) => {
  return (
    <div className=" container-fluid overflow-visible  ">
        <div className=" ">

            <Navbar />

            <Sidebar />

            <main>
              <div className=" container-fluid ">
                <div className="row">
                  <div className=" col">
                        <div className=" justify-content-center ">
                          { children }
                        </div>
                      </div>
                </div>
              </div>
            </main>

        </div>
        

    </div>
    
    
  )
}

export default DashboardLayout