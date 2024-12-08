<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <body
    style="
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    "
  >
    <div style="text-align: center">
      <h1 style="font-size: 72px; margin-bottom: 10px; color: #333">404</h1>
      <p style="font-size: 24px; color: #666; margin-bottom: 20px">
        Oops! Page not found.
      </p>
      <a
        href="/"
        style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
        "
        >Go to Home</a
      >
    </div>
  </body>
</template>

<!-- <template>
  <body
    style="
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f2f2f2;
      font-family: Arial, sans-serif;
    "
  >
    <div style="text-align: center">
      <h1 style="font-size: 72px; margin-bottom: 10px; color: #333">404</h1>
      <p style="font-size: 24px; color: #666; margin-bottom: 20px">
        Oops! Page not found.
      </p>
      <a
        href="/"
        style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
        "
        >Go to Home</a
      >
    </div>
  </body>
</template> -->