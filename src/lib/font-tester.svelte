<script lang="ts">
  import { onMount } from "svelte";
  import { dragElement } from "./draggable.js";

  let fontOptions: string[] = [];
  let font = "";
  let selectElement: HTMLSelectElement;
  let selectElementFocused = false;

  $: onChangeFont(font);

  onMount(async () => {
    const fonts = (await (await fetch("https://fonts.google.com/metadata/fonts")).json()) as {
      familyMetadataList: { family: string }[];
    };
    fontOptions = fonts.familyMetadataList.map((font) => font.family);
  });

  const onChangeFont = (value: string) => {
    if (typeof document === "undefined") return;

    document.body.style.fontFamily = value;
    font = value;
  };
</script>

<svelte:head>
  {#if font}
    <link href="https://fonts.googleapis.com/css2?family={font}&display=swap" rel="stylesheet" />
  {/if}
</svelte:head>

<button use:dragElement class="__ft-container" on:click={() => selectElement.focus()}>
  <div class="__ft-box">
    <p class="__ft-header">Font Test:</p>
    <p class="__ft-text-sample" style="font-family: {font};">
      Sphinx of black quartz, judge my vow.
    </p>
    <select
      class="__ft-select"
      bind:value={font}
      bind:this={selectElement}
      on:focus={() => (selectElementFocused = true)}
      on:blur={() => (selectElementFocused = false)}
    >
      <option value="">Choose font</option>
      {#each fontOptions as item}
        <option>{item}</option>
      {/each}
    </select>
    {#if selectElementFocused}
      <div class="__ft-info">You can use the Arrow Keys (left / right) to cycle through fonts</div>
    {/if}
  </div>
</button>

<style>
  .__ft-container {
    all: unset;
    position: fixed;
    z-index: 50000;
    width: 100%;
    cursor: grab;
    display: flex;
    justify-content: center;
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
    pointer-events: none;
  }

  .__ft-box {
    pointer-events: all;
    border-radius: 0.75rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    width: 100%;
    max-width: 20rem;
    background-color: black;
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
  }

  .__ft-info {
    background-color: rgb(33, 98, 141);
    padding: 10px;
    border-radius: 0.75rem;
    margin-top: 10px;
  }
</style>
