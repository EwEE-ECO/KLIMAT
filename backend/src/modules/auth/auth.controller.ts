import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common"
import { Public } from "../../common/public.decorator"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() dto: { email: string; password: string }) {
    const result = await this.authService.validateUser(dto.email, dto.password)
    if (!result) throw new UnauthorizedException("Неверный email или пароль")
    return result
  }

  @Public()
  @Post("verify")
  async verify(@Body() dto: { token: string }) {
    const result = await this.authService.verifyToken(dto.token)
    if (!result) throw new UnauthorizedException("Токен недействителен")
    return { valid: true, user: result }
  }
}
