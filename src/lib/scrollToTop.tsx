import React from "react";
import { useLocation } from "react-router-dom";
import { useOwnerContext } from "@/lib/context/owner";

function ScrollToTop() {
  const {activeTab} = useOwnerContext()
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, activeTab]);

  return null;
}

export default ScrollToTop;
