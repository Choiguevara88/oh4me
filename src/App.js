import './Css/reset.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuroraProfile, AuroraView, Dna, ErrorPage, FindPass, FindUser, Join, Home, Login, Mentoring, View, Write, Push, Diary, MyPage,Update,Out  } from './Screens/';
import { MemberProvider } from './Contexts/MemberContext';

const router = createBrowserRouter([
  { path:"/", element:<Login/>, errorElement:<ErrorPage/>, exact:true },
  { path:"/aurora-profile", element:<AuroraProfile/>},
  { path:"/aurora-view", element:<AuroraView/>},
  { path:"/diary", element:<Diary/>},
  { path:"/dna", element:<Dna/>},
  { path:"/join", element:<Join/>},
  { path:"/findUser", element:<FindUser/> },
  { path:"/findPass", element:<FindPass/> },
  { path:"/home", element:<Home/>},
  { path:"/write", element:<Write/>},
  { path:"/view", element:<View/>},
  { path:"/mentoring", element:<Mentoring/>},
  { path:"/push", element:<Push/>},
  { path:"/mypage", element:<MyPage/>},
  { path:"/update", element:<Update/>},
  { path:"/out", element:<Out/>},
]);

function App() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

export default App;
