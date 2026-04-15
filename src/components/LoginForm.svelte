<script lang="ts">
  export let apiUrl: string;

  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    error = '';

    try {
      const res = await fetch(`${apiUrl}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body?.error?.message ?? body?.message ?? `Login failed (${res.status})`
        );
      }

      const data = await res.json();
      const token: string = data?.jwt ?? data?.token ?? '';

      if (!token) {
        throw new Error('No token received from server.');
      }

      localStorage.setItem('authToken', token);
      window.location.href = '/';
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'An unexpected error occurred.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit={handleSubmit} class="space-y-5 w-full">
  <!-- Error banner -->
  {#if error}
    <div class="bg-red-900/40 border border-red-600 text-red-300 rounded-lg px-4 py-3 text-sm flex items-start gap-3">
      <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
    </div>
  {/if}

  <!-- Email -->
  <div>
    <label for="login-email" class="block text-sm font-medium text-navy-200 mb-1.5">
      Email address
    </label>
    <input
      id="login-email"
      type="email"
      bind:value={email}
      required
      autocomplete="email"
      placeholder="you@example.com"
      class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  </div>

  <!-- Password -->
  <div>
    <label for="login-password" class="block text-sm font-medium text-navy-200 mb-1.5">
      Password
    </label>
    <input
      id="login-password"
      type="password"
      bind:value={password}
      required
      autocomplete="current-password"
      placeholder="••••••••"
      class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  </div>

  <!-- Submit -->
  <button
    type="submit"
    disabled={loading}
    class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-navy-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
  >
    {#if loading}
      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Signing in…
    {:else}
      Sign In
    {/if}
  </button>

  <p class="text-center text-navy-400 text-xs">
    Don't have an account?
    <a href="/contact" class="text-blue-400 hover:text-blue-300 transition-colors">Get in touch</a>
  </p>
</form>
