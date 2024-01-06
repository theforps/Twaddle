import StartPage from "./components/start/StartPage";
import MainPage from "./components/main/MainPage";


const AppRoutes = [
  {
    path: '/join',
    element: <StartPage />
  },
  {
    path: '/',
    element: <MainPage />
  }
];

export default AppRoutes;
