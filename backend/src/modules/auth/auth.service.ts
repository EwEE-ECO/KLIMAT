import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../../common/prisma.service"
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) return null

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null

    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    }
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } })
      if (!user) return null
      return { id: user.id, email: user.email, name: user.name, role: user.role }
    } catch {
      return null
    }
  }
}
