import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import axios from "axios"

@Injectable()
export class TelegramService {
  private token: string
  private chatId: string

  constructor(private config: ConfigService) {
    this.token = config.get("TELEGRAM_BOT_TOKEN", "")
    this.chatId = config.get("TELEGRAM_CHAT_ID", "")
  }

  async sendMessage(text: string) {
    if (!this.token || !this.chatId) return
    try {
      await axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`, { chat_id: this.chatId, text })
    } catch {}
  }

  async notifyNewOrder(order: any) {
    const message = [
      `🆕 Новый заказ #${order.orderNumber}`,
      ``,
      `👤 ${order.customerName}`,
      `📞 ${order.customerPhone}`,
      `📧 ${order.customerEmail || "—"}`,
      `💳 Сумма: ${order.total} ₽`,
      `📍 ${order.city || ""} ${order.street || ""} ${order.house || ""}`.trim(),
      `💬 Связь: ${order.contactMethod || "звонок"}`,
      `📝 ${order.comment || ""}`,
    ].join("\n")
    await this.sendMessage(message)
  }
}
