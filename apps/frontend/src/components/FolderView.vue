<template>
    <div>
      <h2 class="text-lg font-semibold mb-3 text-gray-800">Subfolders</h2>
      <ul class="space-y-2">
        <li
          v-for="folder in folders"
          :key="folder.id"
          class="flex items-center gap-2 p-2 border rounded-md bg hover:bg- transition"
        >
          📁 {{ folder.name }}
        </li>
      </ul>
  
      <h2 class="text-lg font-semibold mt-6 mb-3 text-white">Files</h2>
      <ul class="space-y-2">
        <li
          v-for="file in files"
          :key="file.id"
          class="flex items-center gap-2 p-2 border rounded-md  transition"
        >
          📄 {{ file.name }}
        </li>
      </ul>
  
      <p v-if="!files.length && !folders.length" class="text-gray-400 italic mt-4">No content in this folder</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    folders: any[]
    files: any[]
  }>()
  </script>
  