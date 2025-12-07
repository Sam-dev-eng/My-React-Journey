//import { useState } from 'react'
import { increment,decrement } from './feature/counterSlice'
import { useDispatch,useSelector } from 'react-redux'



function App() {
  const count = useSelector((state) => state.counter.value)
  
  const dispatch = useDispatch()

  return (
    <>
    <p>{count}</p>
    <button onClick={() => dispatch(decrement())}>-</button>
    <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}

export default App
