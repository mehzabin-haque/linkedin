const { PrismaClient } = require('@prisma/client')

const prisma = globalThis.prisma || new PrismaClient()
 
module.exports = prisma