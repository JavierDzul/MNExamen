
import InputForm from "../components/inputForm"
import { StartForm } from "../components/startForm"
import DashboardLayout from "../layouts/dashboardLayout"

export const HomePage = () => {

    
  
    return (
      
      <DashboardLayout>

        <div>
            <StartForm>
              <InputForm/>
            </StartForm>
        </div>
      
      </DashboardLayout>
      
      
  
  
    )
  }