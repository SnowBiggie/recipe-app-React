import './App.css';
import RootPage from "./pages/RootPage";
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    Children: [
      {
        index: true,
        element: <HomePage/>
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
