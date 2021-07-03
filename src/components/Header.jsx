import React from "react";
import { marvelLogo } from "../assets/SVG/file-svg";

const Header = () => {
  return (
    <div className="w-full bg-gray-900 h-24 flex items-center justify-center">
      <div>{marvelLogo}</div>
    </div>
  );
};

export default Header;
