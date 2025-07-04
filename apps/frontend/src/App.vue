<template>
  <div class="flex h-screen font-sans">
    <div class="w-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4 text-gray-800">File Explorer</h2>
      <input
        v-model="searchTerm"
        placeholder="Search folders..."
        class="w-full p-2 border rounded mb-4"
        type="text"
      />
      <FolderTree
        :folders="filteredFolders"
        :selected-id="selectedFolderId"
        @folder-clicked="handleSelect"
      />
    </div>

    <div class="w-2/3 p-6 overflow-y-auto">
      <FolderView :folders="selectedChildren" :files="selectedFiles" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FolderTree from './components/FolderTree.vue'
import FolderView from './components/FolderView.vue'

const selectedFolderId = ref<number | null>(null)
const folderTree = ref<any[]>([])
const selectedChildren = ref<any[]>([])
const files = ref<any[]>([])
const searchTerm = ref('')
const selectedFiles = ref<any[]>([]) 


  const fetchAllFolders = async () => {
  const res = await fetch('http://localhost:3000/folders')
  const data = await res.json()
  console.log('📦 All folders:', data) 
  folderTree.value = buildTree(data, null)
}


const buildTree = (folders: any[], parentId: number | null = null): any[] => {
  return folders
    .filter(f => f.parentId === parentId)
    .map(f => ({ 
      ...f, 
      isOpen: false,
      children: buildTree(folders, f.id)
    }))
}


const handleSelect = async (folder: any) => {
  folder.isOpen = !folder.isOpen
  selectedFolderId.value = folder.id

  const res = await fetch(`http://localhost:3000/folders/${folder.id}/contents`)
  const data = await res.json()
  selectedChildren.value = data.subfolders || []
  selectedFiles.value = data.files || []
}

const filterTree = (nodes: any[]): any[] => {
  return nodes
    .filter(node => node.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || node.children?.some(child => child.name.toLowerCase().includes(searchTerm.value.toLowerCase())))
    .map(node => ({
      ...node,
      children: filterTree(node.children || [])
    }))
}

const filteredFolders = computed(() => filterTree(folderTree.value))

onMounted(fetchAllFolders)
</script>
