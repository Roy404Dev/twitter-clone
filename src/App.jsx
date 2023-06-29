import "./styles/App.scss";
import Home from "./pages/home/Home";
import TweetPage from "./pages/tweetpage/TweetPage";
import { DataProvider } from "./context/DataContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/:name/status/:id" element={<TweetPage />} />
        <Route path="Explore" element={<Home />} />
        <Route path="notifications" element={<Home />} />
        <Route path="messages" element={<Home />} />
        <Route path="lists" element={<Home />} />
        <Route path="bookmarks" element={<Home />} />
        <Route path="twitter_blue_sign_up" element={<Home />} />
        <Route path="profile" element={<Home />} />
      </Route>
    )
  );
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
