<div align="center">
  <h1>🚀 SupaNext Next.js 13 Starter Kit 🚀</h1>
  <p>Ultimate Next.js and supabase starter kit for production apps.</p>
</div>

## Usage

```bash
npx create-next-app -e https://github.com/haramishra/supanext-nextjs13-starter
```

> **Warning**
> This repo is a work in progress.

##✨ Features
📦 Next.js 13 App Directory
🎨 Radix UI Primitives
💳 Stripe Integration(latest API)
🌈 Tailwind CSS
🚀 Icons from Lucide
🌒 Dark mode with next-themes
📏 Tailwind CSS class sorting, merging, and linting.
🕵️‍♂️ End-to-end testing with Playwright
🧪 Testing with Vite
🛠️ Pre-commit triggers with lint-staged and Husky
🔢 Version automation with Commitizen and Commitlint
🔄 Caching with SWR
🧩 State management with Zustand
📄 License
🚫 No server actions

## Local setup

#### Step 1: Clone the starter
```bash
npx create-next-app -e https://github.com/haramishra/supanext-nextjs13-starter
```
#### Step 2: Prepare husky
```bash
npm run prepare
```
#### Step 3: Run in Dev mode
```bash
npm run dev
```
#### Step 4: Commit your changes with Commitizen
```bash
npm run commit
```
## Setting Up Supabase for Your Project

Supabase is a powerful tool for creating and managing databases and authentication for your web applications. In this guide, we'll walk you through the steps to set up Supabase for your project. Follow these clear and educational steps to get started:

#### Step 1: Create a Supabase Project

1. Go to the [Supabase website](https://supabase.com/) and create a Supabase account if you haven't already.

2. Once you've created an account, create a new project. You can give it any name you like.

3. Generate an access token by visiting [https://app.supabase.com/account/tokens](https://app.supabase.com/account/tokens). You'll need this token later in the setup process.

#### Step 2: Run `schema.sql`

1. In your GitHub fork, locate the `schema.sql` file. This file contains the SQL code needed to define the structure of your database tables.

2. Navigate to your Supabase project, and within the project, go to the SQL editor.

3. Create a new query and paste the code from `schema.sql` into the query editor.

4. Execute the query. This will create the necessary tables and Row-Level Security (RLS) policies in your Supabase database.

#### Step 3: Set Up Redirect Wildcards for Deploy Previews

1. For authentication redirects like magic links or OAuth providers to work correctly in deploy previews, go to the auth settings within your Supabase project. The URL will look like this: `https://app.supabase.com/project/:project-id/auth/url-configuration`.

2. Add the following wildcard URL to the "Redirect URLs" section: `https://**vercel.app/*/*`. This configuration ensures that authentication processes function seamlessly during deployment previews. For more details, consult the [Supabase documentation](https://supabase.com/docs/guides/auth#redirect-urls-and-wildcards).

#### Step 4 [Optional]: Set Up OAuth Providers

1. Supabase allows you to integrate third-party login providers such as GitHub or Google. To configure these providers, refer to the [Supabase documentation](https://supabase.io/docs/guides/auth#third-party-logins).

2. Once you've configured these providers, you can add them to the `provider` array of the `Auth` component in your project's `signin.tsx` file.

#### Step 5: Generate Types from Your Supabase Database

1. To install Supabase cli

```bash
npm install supabase --save-dev
yarn add supabase --dev
```

2. Connect to Supabase

```bash
npx supabase login
```

3. Enter the access token you created earlier. (As mentioned above, you can generate an access token from https://app.supabase.com/account/tokens.)

4. Generate types

```bash
npx supabase gen types typescript --project-id [YOUR-PROJECT-REF] --schema public > types_db.ts
```
#### Set up Supabase environment variables

Next, we need to set up environment variables for our Supabase project. We can copy these from `Supabase > Project Settings > API` and paste them into the Vercel deployment interface. Copy project API keys and paste into the `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` fields, and copy the project URL and paste to Vercel as `NEXT_PUBLIC_SUPABASE_URL`. 

This completes Supabase setup.


# Configure Stripe

Next, we'll need to configure [Stripe](https://stripe.com/) to handle test payments. If you don't already have a Stripe account, create one now.

For the following steps, make sure you have the ["Test Mode" toggle](https://stripe.com/docs/testing) switched on.

## Create a webhook

We need to create a webhook in the `Developers` section of Stripe. Pictured in the architecture diagram above, this webhook is the piece that connects Stripe to your Vercel Serverless Functions.

1. Click the "Add Endpoint" button on the [test Endpoints page](https://dashboard.stripe.com/test/webhooks).
2. Enter any placeholder text for the endpoint URL. (We will return later and change this to `https://your-deployment-url.vercel.app/api/webhooks` once we complete deployment to Vercel.)
3. Click `Select events` under the `Select events to listen to` heading.
4. Click `Select all events` in the `Select events to send` section.
5. Copy `Signing secret` as we'll need that in the next step.

## Set Stripe environment variables

To securely interact with Stripe, we need to add a few more [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) in the Vercel deployment interface.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET_LIVE`

You can find the first two keys on the [API keys tab](https://dashboard.stripe.com/test/apikeys) in Stripe. The `STRIPE_WEBHOOK_SECRET_LIVE` is the `Signing secret` copied in the previous webhook configuration step.

#### Complete Vercel deployment

Once you've set your environment variables in the Vercel deployment interface, complete your deployment. Vercel may take a few minutes to build your application. It will then provide you with a domain URL for your deployment. Copy this URL and add it as an [Environment Variable](https://vercel.com/docs/concepts/projects/environment-variables) in the Vercel deployment interface:

```markdown
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.vercel.app
```

For this variable, check the box to apply it to the "Production" environment, but make sure to leave the "Development" and "Preview" boxes unchecked.

Keep the url on your clipboard, because you will also need it for the next step.

*NOTE:* Vercel assigns you a domain that is stable from deployment to redeployment (`https://your-deployment-url.vercel.app`) and a dynamic URL that changes every time you redploy (e.g., `https://your-deployment-url.vercel-12345678-your-organization.app`). You want to use the stable one, not the dynamic one!

#### Complete Stripe webhook configuration

Now that we have a deployment URL, we can complete our Stripe webhook configuration. Go back to the Stripe [test Webhooks page](https://dashboard.stripe.com/test/webhooks). Click your endpoint, and then click `... > Update Details`. In the `Endpoint URL` field, paste your deployment URL and add `/api/webhooks` to the end. For example, if your deployment URL is `https://your-deployment-url.vercel.app`, then your endpoint URL should be `https://your-deployment-url.vercel.app/api/webhooks`. Click `Update endpoint`.

#### Create product and pricing information

Your application's webhook listens for product updates on Stripe and automatically propagates them to your Supabase database. So with your webhook listener running, you can now create your product and pricing information in the [Stripe Dashboard](https://dashboard.stripe.com/test/products).

Stripe Checkout currently supports pricing that bills a predefined amount at a specific interval. More complex plans (e.g., different pricing tiers or seats) are not yet supported.

For example, you can create business models with different pricing tiers, e.g.:

- Product 1: Hobby
  - Price 1: 10 USD per month
  - Price 2: 100 USD per year
- Product 2: Freelancer
  - Price 1: 20 USD per month
  - Price 2: 200 USD per year

Optionally, to speed up the setup, we have added a [fixtures file](fixtures/stripe-fixtures.json) to bootstrap test product and pricing data in your Stripe account. The [Stripe CLI](https://stripe.com/docs/stripe-cli#install) `fixtures` command executes a series of API requests defined in this JSON file. Simply run `stripe fixtures fixtures/stripe-fixtures.json`.

**Important:** Be sure webhook forwarding is active when you create your products, or the products created will not be imported into your database.

#### Configure the Stripe customer portal

1. Set your custom branding in the [settings](https://dashboard.stripe.com/settings/branding)
1. Configure the Customer Portal [settings](https://dashboard.stripe.com/test/settings/billing/portal)
1. Toggle on "Allow customers to update their payment methods"
1. Toggle on "Allow customers to update subscriptions"
1. Toggle on "Allow customers to cancel subscriptions"
1. Add the products and prices that you want
1. Set up the required business information and links

### That's it

That's it. Now you're ready to earn recurring revenue from your customers. 🥳

## Develop locally

If you haven't already done so, clone your Github repository to your local machine.

Next, use the [Vercel CLI](https://vercel.com/download) to link your project:

```bash
vercel login
vercel link
```

### Setting up the env vars locally

Use the Vercel CLI to download the development env vars:

```bash
vercel env pull .env.local
```

Running this command will create a new `.env.local` file in your project folder. For security purposes, you will need to set the `SUPABASE_SERVICE_ROLE_KEY` manually from your [Supabase dashboard](https://app.supabase.io/) (`Settings > API`). You will also need to manually change the `NEXT_PUBLIC_SITE_URL` variable in `.env.local` to "http://localhost:3000".

### Use the Stripe CLI to test webhooks

[Install the Stripe CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start local webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/webhooks
```

Running this Stripe command will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

### Install dependencies and run the Next.js client

In a separate terminal, run the following commands to install dependencies and start the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Note that webhook forwarding and the development server must be running concurrently in two separate terminals for the application to work correctly.

Finally, navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application rendered.

## Going live

#### Archive testing products

Archive all test mode Stripe products before going live. Before creating your live mode products, make sure to follow the steps below to set up your live mode env vars and webhooks.

#### Configure production environment variables

To run the project in live mode and process payments with Stripe, switch Stripe from "test mode" to "production mode." Your Stripe API keys will be different in production mode, and you will have to create a separate production mode webhook. Copy these values and paste them into Vercel, replacing the test mode values.

#### Redeploy

Afterward, you will need to rebuild your production deployment for the changes to take effect. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy." 

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.

## A note on reliability

This template mirrors completed Stripe transactions to the Supabase database. This means that if the Supabase database is unavailable, the Stripe transaction will still succeed, but the Supabase database will not be updated, and the application will pass an error code back to Stripe. [By default](https://stripe.com/docs/webhooks/best-practices), Stripe will retry sending its response to the webhook for up to three days, or until the database update succeeds. This means that the Stripe transaction will eventually be reflected in the Supabase database as long as the database comes back online within three days. You may want to implement a process to automatically reconcile the Supabase database with Stripe in case of a prolonged outage.


##Credits
[nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments)
[next-template](https://github.com/shadcn-ui/next-template)
[nextcn-saas-boilerplate](https://github.com/haramishra/nextcn-saas-boilerplate)

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
