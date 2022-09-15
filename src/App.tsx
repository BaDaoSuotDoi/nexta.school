import root_route from './pages/rootRoute';
import { Routes ,Route} from 'react-router-dom';

function App() {
  console.log(root_route)
  return (
    <div >
      <Routes>
          {
            root_route.map(route =>{
              // console.log("Route===", route.path)
              return <Route path={route.path} element={<route.component/>} key={route.path}/>
            })
          }
      </Routes>
    </div>
  );
}

export default App;
