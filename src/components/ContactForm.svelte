<script lang="ts">
  export let apiUrl: string;

  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let type = 'general';

  let loading = false;
  let success = false;
  let error = '';

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    success = false;
    error = '';

    try {
      const res = await fetch(`${apiUrl}/api/support-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          requester_email: email,
          subject,
          type,
          message,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error?.message ?? `Request failed (${res.status})`);
      }

      success = true;
      name = '';
      email = '';
      subject = '';
      message = '';
      type = 'general';
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'An unexpected error occurred.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit={handleSubmit} class="space-y-5 w-full">
  <!-- Success banner -->
  {#if success}
    <div class="bg-green-900/40 border border-green-600 text-green-300 rounded-lg px-4 py-3 text-sm flex items-start gap-3">
      <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Message sent! I'll get back to you as soon as possible.</span>
    </div>
  {/if}

  <!-- Error banner -->
  {#if error}
    <div class="bg-red-900/40 border border-red-600 text-red-300 rounded-lg px-4 py-3 text-sm flex items-start gap-3">
      <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
    </div>
  {/if}

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <!-- Name -->
    <div>
      <label for="cf-name" class="block text-sm font-medium text-navy-200 mb-1.5">
        Name <span class="text-red-400">*</span>
      </label>
      <input
        id="cf-name"
        type="text"
        bind:value={name}
        required
        placeholder="Your name"
        class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="cf-email" class="block text-sm font-medium text-navy-200 mb-1.5">
        Email <span class="text-red-400">*</span>
      </label>
      <input
        id="cf-email"
        type="email"
        bind:value={email}
        required
        placeholder="you@example.com"
        class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  </div>

  <!-- Subject -->
  <div>
    <label for="cf-subject" class="block text-sm font-medium text-navy-200 mb-1.5">
      Subject <span class="text-red-400">*</span>
    </label>
    <input
      id="cf-subject"
      type="text"
      bind:value={subject}
      required
      placeholder="How can I help?"
      class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  </div>

  <!-- Type -->
  <div>
    <label for="cf-type" class="block text-sm font-medium text-navy-200 mb-1.5">
      Inquiry Type
    </label>
    <select
      id="cf-type"
      bind:value={type}
      class="w-full bg-navy-900 border border-navy-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    >
      <option value="general">General</option>
      <option value="consulting">Consulting</option>
      <option value="project">Project Inquiry</option>
      <option value="support">Support</option>
      <option value="other">Other</option>
    </select>
  </div>

  <!-- Message -->
  <div>
    <label for="cf-message" class="block text-sm font-medium text-navy-200 mb-1.5">
      Message <span class="text-red-400">*</span>
    </label>
    <textarea
      id="cf-message"
      bind:value={message}
      required
      rows="6"
      placeholder="Tell me about your project or question..."
      class="w-full bg-navy-900 border border-navy-600 text-white placeholder-navy-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
    ></textarea>
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
      Sending…
    {:else}
      Send Message
    {/if}
  </button>
</form>
