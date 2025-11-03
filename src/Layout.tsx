import "./Layout.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import MainSection from "./MainSection";

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
