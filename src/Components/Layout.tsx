import "./Layout.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import MainSection from "./Components/MainSection";

function Layout() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <MainSection></MainSection>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
