import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
        <Outlet></Outlet>
      <div>
        {" "}
        <footer className="bg-gray-300 py-5 text-center dark:bg-gray-500 dark:text-white">
          <p>&copy; 2024 FinFlow. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}
