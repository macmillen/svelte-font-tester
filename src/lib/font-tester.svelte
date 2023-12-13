<script lang="ts">
  import { dragElement } from "./draggable.js";
  import { GOOGLE_FONTS } from "./google-fonts.js";

  let font = "Agbalumo";
  let selectElement: HTMLSelectElement;
  let selectElementFocused = false;

  $: onChangeFont(font);

  const fontOptions = GOOGLE_FONTS.familyMetadataList.map((font) => font.family);

  const onChangeFont = (value: string) => {
    if (typeof document === "undefined") return;

    document.body.style.fontFamily = value;
  };
</script>

<svelte:head>
  {#if font}
    <link href="https://fonts.googleapis.com/css2?family={font}&display=swap" rel="stylesheet" />
  {/if}
</svelte:head>

<button use:dragElement class="__ft-container" on:click={() => selectElement.focus()}>
  <p class="__ft-header">Font Test:</p>
  <p class="__ft-text-sample" style="font-family: {font};">Sphinx of black quartz, judge my vow.</p>
  <label for="__ft-select">Select Font:</label>
  <select
    id="__ft-select"
    class="__ft-select"
    bind:this={selectElement}
    bind:value={font}
    on:focus={() => (selectElementFocused = true)}
    on:blur={() => (selectElementFocused = false)}
  >
    {#each fontOptions as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
  {#if selectElementFocused}
    <div class="__ft-info">You can use the Arrow Keys (left / right) to cycle through fonts</div>
  {/if}
</button>

<style>
  .__ft-container {
    all: unset;
    position: fixed;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    width: 100%;
    max-width: 20rem;
    background-color: black;
    z-index: 50000;
    cursor: grab;
    color: white;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .__ft-header {
    margin: 0;
  }

  .__ft-text-sample {
    font-size: 24px;
    margin: 10px 0;
    background-color: rgb(43, 43, 43);
    padding: 10px;
    border-radius: 0.75rem;
  }

  .__ft-select {
    height: 3.5rem;
    width: 100%;
    border-radius: 0.75rem;
    padding-left: 1rem;
    font-size: 20px;
    padding-right: 1rem;
    background-color: #86efac;
    color: black;
  }

  .__ft-info {
    background-color: rgb(33, 98, 141);
    padding: 10px;
    border-radius: 0.75rem;
    margin-top: 10px;
  }
</style>
