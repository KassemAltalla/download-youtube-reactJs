import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-400">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © 2024{" "}
          <a
            href="https://portfolio2-alpha-fawn.vercel.app/"
            className="hover:underline"
          >
            Kassem Altalla ™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
