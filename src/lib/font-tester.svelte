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

<div class="fixed bottom-3 z-50 w-full flex justify-center">
  <div class="rounded-xl h-full space-y-2 p-3 w-full max-w-[20rem] bg-black">
    <p class="text-white font-bold">Font Tester</p>
    <select bind:value={font} class="h-14 w-full rounded-xl px-4">
      <option value="">Choose font</option>
      {#each fontOptions as item}
        <option>{item}</option>
      {/each}
    </select>
  </div>
</div>
