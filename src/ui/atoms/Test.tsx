import {Box, Stack, Button, Checkbox} from "@chakra-ui/react"

const Test = () => {
  return (
    <div>
<Box m={2} color='red.800'  justifyContent={'center'} className="test">Tomato</Box>

<Stack spacing={8}>
<Box m={2} color='red.800'>Tomato</Box>
<Box m={2} color='brown.800'>Potato</Box>
<Box m={2} color='green.800'>Cucumber</Box>
</Stack>
<Button variant={"ghost"}>Try Me</Button>
<Stack>
<Checkbox>Parent checkbox</Checkbox>
<Stack spacing={1} pl={3}>
<Checkbox>Child1</Checkbox>
<Checkbox>Child2</Checkbox>
</Stack>
</Stack>

    </div>
  )
}

export default Test