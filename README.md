# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- Packages -->

1. React Router Dom
   https://www.npmjs.com/package/react-router-dom
2. axios
   https://www.npmjs.com/package/axios
3. dotenv
   https://www.npmjs.com/package/dotenv
4. Firebase
   https://www.npmjs.com/package/firebase
5. Tailwind
   https://tailwindcss.com/docs/installation

<!-- Stripe payment integration steps  -->

1.  Inastall packages
    npm i @stripe/stripe-js
    npm i @stripe/react-stripe-js

2.  Import loadStripe and Elements in App.js/jsx
    import {loadStripe} from @stripe/stripe-js
    import {Elements} from @stripe/react-stripe-js

3.  Import CardElement, useStripe and useElements in your payment component and initialize on variable
    import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
    const stripe = useStripe();
    const elements = useElements();

4.  use your CardElement oinside the form tag
    <CardElement />
