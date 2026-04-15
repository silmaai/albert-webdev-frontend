<script lang="ts">
  export let products: { guid: string; title: string; description: string; popular: boolean; features: string[]; price_month: number; price_year: number; stripe_id_monthly: string; stripe_id_yearly: string }[];
  export let apiUrl: string;

  type BillingCycle = 'monthly' | 'yearly';
  let billingCycle: BillingCycle = 'monthly';

  function formatPrice(cents: number): string {
    if (!cents && cents !== 0) return 'Custom';
    const dollars = cents / 100;
    return '$' + dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function getPrice(p: typeof products[0]): string {
    return billingCycle === 'monthly' ? formatPrice(p.price_month) : formatPrice(p.price_year);
  }

  function getStripeId(p: typeof products[0]): string {
    return billingCycle === 'monthly' ? p.stripe_id_monthly : p.stripe_id_yearly;
  }

  function toggleCycle() {
    billingCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly';
  }
</script>

<div class="w-full">
  <!-- Billing toggle -->
  <div class="flex items-center justify-center gap-4 mb-10">
    <span class={billingCycle === 'monthly' ? 'text-sm font-medium text-white transition-colors' : 'text-sm font-medium text-slate-400 transition-colors'}>
      Monthly
    </span>

    <button
      on:click={toggleCycle}
      class={billingCycle === 'yearly'
        ? 'relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600'
        : 'relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700'}
      aria-label="Toggle billing cycle"
    >
      <span
        class={billingCycle === 'yearly'
          ? 'inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform translate-x-7'
          : 'inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform translate-x-1'}
      ></span>
    </button>

    <span class={billingCycle === 'yearly' ? 'text-sm font-medium text-white transition-colors' : 'text-sm font-medium text-slate-400 transition-colors'}>
      Yearly
      <span class="ml-1.5 inline-block bg-green-800 text-green-300 text-xs font-semibold px-1.5 py-0.5 rounded-full">
        Save ~17%
      </span>
    </span>
  </div>

  <!-- Pricing cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
    {#each products as product (product.guid)}
      <div
        class={product.popular
          ? 'relative flex flex-col rounded-2xl border border-blue-500 p-8 w-full max-w-sm bg-slate-800 shadow-2xl shadow-blue-900'
          : 'relative flex flex-col rounded-2xl border border-slate-700 p-8 w-full max-w-sm bg-slate-900'}
      >
        <!-- Popular badge -->
        {#if product.popular}
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span class="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Most Popular
            </span>
          </div>
        {/if}

        <!-- Title + description -->
        <div class="mb-6">
          <h3 class="text-white font-bold text-xl mb-2">{product.title}</h3>
          <p class="text-slate-300 text-sm leading-relaxed">{product.description}</p>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-end gap-1">
            <span class="text-4xl font-extrabold text-white">{getPrice(product)}</span>
            {#if product.price_month !== 0}
              <span class="text-slate-400 text-sm mb-1">
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            {/if}
          </div>
          {#if billingCycle === 'yearly' && product.price_year}
            <p class="text-green-400 text-xs mt-1 font-medium">
              Billed annually
            </p>
          {/if}
        </div>

        <!-- Features list -->
        <ul class="space-y-3 mb-8 flex-1">
          {#each (product.features ?? []) as feature}
            <li class="flex items-start gap-2.5 text-sm text-slate-200">
              <svg class="w-4 h-4 mt-0.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          {/each}
        </ul>

        <!-- CTA -->
        <a
          href={getStripeId(product) ? apiUrl + '/api/checkout?plan=' + getStripeId(product) : '/contact'}
          class={product.popular
            ? 'block text-center font-semibold py-3 rounded-xl text-sm transition-colors bg-blue-600 hover:bg-blue-500 text-white'
            : 'block text-center font-semibold py-3 rounded-xl text-sm transition-colors bg-slate-700 hover:bg-slate-600 text-slate-100'}
        >
          Get Started
        </a>
      </div>
    {/each}
  </div>
</div>
