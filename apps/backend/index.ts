import { Elysia } from 'elysia'
import { PrismaClient } from '@prisma/client'
import cors from '@elysiajs/cors'

const prisma = new PrismaClient()
const app = new Elysia()

app.use(cors())

app.get('/folders', async () => {
  const folders = await prisma.folder.findMany()
  return folders
})

app.get('/folders/:id/children', async ({ params }) => {
  const children = await prisma.folder.findMany({
    where: { parentId: Number(params.id) },
  })
  return children
})

app.get('/folders/tree', async () => {
  const allFolders = await prisma.folder.findMany()

  function buildTree(parentId: number | null): (typeof allFolders[0] & { children: any[] })[] {
    return allFolders
      .filter(folder => folder.parentId === parentId)
      .map(folder => ({
        ...folder,
        children: buildTree(folder.id)
      }))
  }
  
  return buildTree(null)
})

app.get('/folders/:id/contents', async ({ params }) => {
    const folderId = Number(params.id)
  
    const [subfolders, files] = await Promise.all([
      prisma.folder.findMany({ where: { parentId: folderId } }),
      prisma.file.findMany({ where: { folderId } })
    ])
  
    return { subfolders, files }
  })
  


app.listen(3000)
console.log("🚀 Backend running at http://localhost:3000")
