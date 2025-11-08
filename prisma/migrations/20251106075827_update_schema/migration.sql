/*
  Warnings:

  - You are about to drop the column `status` on the `ServiceItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Service" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Completed';

-- AlterTable
ALTER TABLE "public"."ServiceItem" DROP COLUMN "status";
