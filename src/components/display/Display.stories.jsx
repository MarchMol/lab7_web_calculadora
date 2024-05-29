import {React} from "react";
import Display from "./Display";

  
const meta = {
    title:'components/Display',
    component: Display,
    decorators: [
        (Story) => (
          <div style={{  zoom: '3.4' }}>
            <Story />
          </div>
        ),
      ],
}

export default meta

export const Default = {
    args:{
        calcOptions:{
            displayText: '1234',
            operation: '123+',
        }
    }
}

export const noUpperText = {
    args:{
        calcOptions:{
            displayText: '1234',
            operation: '',
        }
    }
}

export const noLowerText = {
    args:{
        calcOptions:{
            displayText: '',
            operation: '123+',
        }
    }
}

export const noText = {
    args:{
        calcOptions:{
            displayText: '',
            operation: '',
        }
    }
}

export const overflow = {
    args:{
        calcOptions:{
            displayText: '123456789-10',
            operation: '123456789-10',
        }
    }
}

