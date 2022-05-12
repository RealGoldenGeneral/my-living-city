import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY, STRIPE_PRODUCT_40 } from "src/lib/constants";

export default function StripeCheckoutButton() {
    const [stripeError, setStripeError] = useState(null);
    const [stripeLoading, setStripeLoading] = useState<boolean>(false);
    const item = {
      price: STRIPE_PRODUCT_40,
      quantity: 1,
    };
  let stripePromise: any;

  const getStripe = async () => {
    if (!stripePromise) {
      stripePromise = await loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: window.location.href,
    cancelUrl: window.location.href,
  };

  const redirectToCheckout = async () => {
    setStripeLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setStripeLoading(false);
  };

  if (stripeError) alert(stripeError);
  return (
    <button
      type="button"
      className="btn btn-primary btn-lg m-4"
      onClick={redirectToCheckout}
      disabled={stripeLoading}
    >
      {stripeLoading ? "Loading..." : "Upgrade Now"}
    </button>
  );
}
