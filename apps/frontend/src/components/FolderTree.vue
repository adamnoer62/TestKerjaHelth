<template>
    <ul class="pl-2 space-y-1">
      <li
        v-for="folder in folders"
        :key="folder.id"
        class="cursor-pointer"
      >
        <div
          :class="[
            'flex items-center gap-1 p-2 rounded text-black',
            folder.id === selectedId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
          ]"
          @click.stop="emit('folder-clicked', folder)"
        >
          <span>{{ folder.isOpen ? '📂' : '📁' }}</span>
          <span>{{ folder.name }}</span>
        </div>
  
        <!-- Recursive render jika folder dibuka -->
        <FolderTree
          v-if="folder.isOpen && folder.children?.length"
          :folders="folder.children"
          :selected-id="selectedId"
          @folder-clicked="emit('folder-clicked', $event)"
        />
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    folders: any[]
    selectedId: number | null
  }>()
  
  const emit = defineEmits(['folder-clicked'])
  </script>
  