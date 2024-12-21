import React, { useState, Suspense, useMemo } from "react";
// Lazy loading the components
const Header = React.lazy(() => import("../../components/Header/Header"));
const ExploreMenu = React.lazy(() => import("../../components/ExploreMenu/ExploreMenu"));
const FoodDisplay = React.lazy(() => import("../../components/FoodDisplay/FoodDisplay"));
const AppDownload = React.lazy(() => import("../../components/AppDownload/AppDownload"));

const Home = () => {
  const [category, setCategory] = useState("All");

  // Using useMemo to memoize the category
  const memoizedCategory = useMemo(() => category, [category]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <ExploreMenu category={memoizedCategory} setCategory={setCategory} />
        <FoodDisplay category={memoizedCategory} />
        <AppDownload />
      </Suspense>
    </div>
  );
};

export default Home;
