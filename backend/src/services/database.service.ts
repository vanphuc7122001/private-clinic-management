import { PrismaClient } from '@prisma/client'

class DatabaseService {
  private instance: PrismaClient
  constructor() {
    this.instance = new PrismaClient()
  }

  async Connect() {
    try {
      await this.instance.$connect()
      console.log('Connection to the database is successful')
    } catch (e) {
      console.log('Error when connecting to the database')
    } finally {
      await this.instance.$disconnect()
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService
