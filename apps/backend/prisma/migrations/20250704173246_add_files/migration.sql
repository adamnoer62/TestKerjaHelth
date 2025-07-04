-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `folderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
