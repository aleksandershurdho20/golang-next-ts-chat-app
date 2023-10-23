import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCourse from './pages/Courses/CreateCourse';
import RouteWrapper from './routes/Routes';

function App() {

  return (
    <>
      {/* <CreateCourse/> */}
      <RouteWrapper/>
    </>
  )
}

export default App
