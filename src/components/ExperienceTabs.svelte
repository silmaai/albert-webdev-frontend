<script lang="ts">
  interface Section {
    heading: string;
    body: string;
  }

  interface Tab {
    label: string;
    sections: Section[];
    keywords?: string[];
  }

  export let tabs: Tab[] = [];

  let activeTab = 0;
</script>

<!-- Tab buttons -->
<div class="flex gap-2 mb-8 border-b border-navy-700">
  {#each tabs as tab, i}
    <button
      class="px-5 py-2.5 text-sm font-semibold font-mono rounded-t-md transition-colors
        {activeTab === i
          ? 'bg-navy-800 text-blue-400 border border-navy-700 border-b-navy-800 -mb-px'
          : 'text-navy-400 hover:text-white'}"
      on:click={() => (activeTab = i)}
    >
      {tab.label}
    </button>
  {/each}
</div>

<!-- Active tab content -->
{#if tabs[activeTab]}
  <div class="space-y-8">
    {#each tabs[activeTab].sections as section}
      <div>
        <h4 class="text-blue-400 font-semibold font-mono text-sm uppercase tracking-widest mb-3">
          {section.heading}
        </h4>
        <p class="text-navy-300 leading-relaxed font-mono text-sm">
          {section.body}
        </p>
      </div>
    {/each}

    {#if tabs[activeTab].keywords && tabs[activeTab].keywords.length > 0}
      <div>
        <h4 class="text-blue-400 font-semibold font-mono text-sm uppercase tracking-widest mb-3">
          Technologies
        </h4>
        <div class="flex flex-wrap gap-2">
          {#each tabs[activeTab].keywords as kw}
            <span class="bg-navy-800 border border-navy-700 text-navy-200 text-xs font-mono px-3 py-1 rounded-md">
              {kw}
            </span>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}
