import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import UserList2 from "./Components/UserList2";
import UserDetails from "./Components/UserDetails";
import EmployeeList from "./Components/EmployeeList";
import Counter from "./Components/Counter";
import PostList3 from "./Components/PostList3";
import RecipeList from "./Components/RecipeList";
import CourseList4 from "./Components/CourseList4";
import CourseAdd from "./Components/CourseAdd";
import RegisterUser from "./Components/RegisterUser";
import CourseEdit from "./Components/CourseEdit";
import EmployeeCard from "./Components/EmployeeCard";

function App() {
  return (
    <Router>
      <div className="container my-3">
        <h1>My React Application</h1>
        {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              FLA
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/courses"
                  >
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/users"
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/posts"
                  >
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/employees"
                  >
                    Employees
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recipes">
                    Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}
        <EmployeeCard
          name="John Doe"
          position="HR Manager"
          department="HR"
          salary={2000}
        >
          <h4 className="text-secondary">More Info</h4>
          <p className="text-muted">
            John Doe is a Senior Employee who has been working with the company
            for 10 years.
          </p>
        </EmployeeCard>

        <EmployeeCard
          name="Usman Ghani"
          position="CEO"
          department="Executive"
          salary={4000}
        >
          <p className="text-muted">
            Usman Ghani is the founder of the company and has led it to success
            over the past 15 years.
          </p>
        </EmployeeCard>

        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<CourseList4 />} />
            <Route path="/add-course" element={<CourseAdd />} />
            <Route path="/edit-course/:id" element={<CourseEdit />} />
            <Route path="/users" element={<UserList2 />} />
            <Route path="/posts" element={<PostList3 />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
