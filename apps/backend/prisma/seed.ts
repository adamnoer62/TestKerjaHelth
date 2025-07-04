import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Mulai seed...");

    const root = await prisma.folder.create({
        data: { name: 'Root' }
    })

    const documents = await prisma.folder.create({
        data: { 
            name: 'Documents', 
            parentId: root.id,
            files: {
                create: [
                    { name: 'Resume.pdf' },
                    { name: 'Budget.xlsx' }
                ]
            }
        }
    })

    const pictures = await prisma.folder.create({
        data: { 
            name: 'Pictures', 
            parentId: documents.id,
            files: {
                create: [
                    { name: 'Sunset.jpg' }
                ]
            }
        }
    })

    const work = await prisma.folder.create({
        data: { 
            name: 'Work', 
            parentId: pictures.id,
            files: {
                create: [
                    { name: 'Report.docx' },
                    { name: 'Presentation.pptx' }
                ]
            }
        }
    })

    const vacation = await prisma.folder.create({
        data: { 
            name: 'Vacation', 
            parentId: work.id,
            files: {
                create: [
                    { name: 'beach.png' },
                    { name: 'hotel.txt' }
                ]
            }
        }
    })

    console.log("✅ Data seeded successfully.")
}

main()
  .catch(e => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
