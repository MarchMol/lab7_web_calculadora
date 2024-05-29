import Button from "./Button";
import { fn } from '@storybook/test'

const meta = {
    component: Button,
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
        text: '1+2',
        type: 0,
        onClick: fn(),
    }
}

export const onClick = {
    args:{
        text:'Clk',
        type: 0,
        onClick: fn(),
    }
}

export const NoText = {
    args:{
        text:'',
        type: 0
    }
}

export const NoOverflow = {
    args:{
        text:'This text has more than 3 chars',
        type: 0
    }
}

export const TypeCases0 = {
    args: {
        text:'T-0',
        type: 0
    }
}
export const TypeCases1 = {
    args: {
        text:'T-1',
        type: 1
    }
}
export const TypeCases2 = {
    args: {
        text:'T-2',
        type: 2
    }
}
export const TypeCasesOutOfRange = {
    args: {
        text:'T-x',
        type: 100
    }
}