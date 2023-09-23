// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Nt72ESCyW4Cbry6NqmCgpUNqvVb93HAWGHXLeH4Rp3QFxKhO9uJ6T4m4Q2NLZlL5Fc4QkyRqLgFGYOYQV62LH6c00ctkxh6ki');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Nt7UBSCyW4Cbry6Qo94oehx',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(3000, () => console.log('Running on port 4242'));