import Header from "../component/Header";
import Footer from "../component/Footer";

export default function DefaultTemplate({
  className = "container-fluid",
  title,
  children,
}) {
  return (
    <div className={className} id="wrapper">
      <Header />
      <div className="row">
        <h3>{title}</h3>
      </div>
      {children}
      <Footer />
    </div>
  );
}
