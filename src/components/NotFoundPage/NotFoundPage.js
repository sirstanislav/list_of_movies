import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="notfoundpage">
      <h2 className="notfoundpage__title">404</h2>
      <p className="notfoundpage__text">Page not found</p>
      <button className="notfoundpage__back" onClick={() => navigate(-1)}>
        Back
      </button>
    </section>
  );
};

export { NotFoundPage };
