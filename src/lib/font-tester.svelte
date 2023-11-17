<script lang="ts">
  import { onMount } from "svelte";

  let fontOptions: string[] = [];
  let font = "";

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

<div class="__ft-container">
  <div class="__ft-box">
    <p class="__ft-header">Font Tester</p>
    <select class="__ft-select" bind:value={font}>
      <option value="">Choose font</option>
      {#each fontOptions as item}
        <option>{item}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  .__ft-container {
    position: fixed;
    bottom: 0.75rem;
    z-index: 50;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .__ft-box {
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
    background-color: white;
    font-weight: 700;
  }

  .__ft-select {
    height: 3.5rem;
    width: 100%;
    border-radius: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
