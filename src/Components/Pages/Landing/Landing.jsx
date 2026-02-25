import { useDispatch } from "react-redux";
import { openModal } from "../../../store/uiSlice";
import style from "./Landing.module.css";
import heroImg from "../../../assets/images/Hero-Landing-Page.png";

export default function Landing() {
  const dispatch = useDispatch();

  return (
    <div className={style.landingWrapper}>
      <main className={style.landingRightSide}>
        <h1 className={style.landingHeader}>Welcome to Shopper!</h1>
        <p className={style.landingParagraph}>
          Create smart, shareable shopping lists you can access anywhere. Add
          products from our catalog or your own, track progress, and invite
          others to contribute to your own shopping list or to their own. You
          can share a read-only link for friends and family, absolutely free and
          no account needed, just paste the URL using the below button or create
          an account for free today!
        </p>
        <div className={style.landingButtonWrapper}>
          <button
            aria-label="Open a shared shopping list by URL"
            onClick={() => dispatch(openModal("url"))}
          >
            List URL
          </button>
          <button
            aria-label="Log in or create a free account"
            onClick={() => dispatch(openModal("auth"))}
          >
            Join / Login
          </button>
        </div>
      </main>
      <aside
        className={style.landingHero}
        role="complementary"
        aria-label="Promotional"
      >
        <img
          className={style.heroImg}
          src={heroImg}
          alt="Person checking shopping list."
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </aside>
      <div className={style.cardsSection} aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Key features
        </h2>

        <div className={style.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-list-check"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
            />
          </svg>
          <p>Your shopping list is accesible from every device!</p>
        </div>

        <div className={style.card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-currency-dollar"
            viewBox="0 0 16 16"
          >
            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
          </svg>
          <p>Shopper is completely free, no hidden costs!</p>
        </div>
      </div>
    </div>
  );
}
