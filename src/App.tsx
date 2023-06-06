import './App.css'
import { useQuery, useMutation } from 'react-query'
import ChakraForm from './ui/atoms/ChakraForm'
import Form from './ui/atoms/Form'

const POST = [
  {id: 1, title:"post 1"},
  {id: 2, title:"post 2"},
]
function App() {
const postQuery = useQuery({
  queryKey: ["posts"],
  queryFn:() => wait(1000).then(()=>[...POST]),
})

if(postQuery.isLoading){
  return <h1>Loading...</h1>
}
  return (
    <>
      {postQuery.data?.map(post=>{
       return <div key={post.id}>{post.title}</div>
      })}
     <Form/>
     <ChakraForm/>
    </>
  )
}

function wait(duration: number){
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
