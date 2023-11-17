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

  get users() {
    return this.instance.user
  }

  get refreshTokens() {
    return this.instance.refreshToken
  }

  get roles() {
    return this.instance.role
  }

  get posts() {
    return this.instance.post
  }

  get medicalRecords() {
    return this.instance.medicalRecord
  }

  get appointments() {
    return this.instance.appointment
  }

  get staffSchedules() {
    return this.instance.staffSchedules
  }

  get specializations() {
    return this.instance.specializations
  }

  get doctorProfiles() {
    return this.instance.doctorProfile
  }

  get bills() {
    return this.instance.bill
  }

  get prescriptions() {
    return this.instance.prescriptions
  }

  get prescriptionDetails() {
    return this.instance.prescriptionsDetail
  }

  get medicines() {
    return this.instance.medicines
  }
}

const databaseService = new DatabaseService()
export default databaseService
