import { Cube } from "./Cube";
import { Fear } from "./Fear";
import { Map } from "./Map";

export class Game {
  /**
   * Время существования мира (в часах)
   */
  private lifetime: number;

  /**
   * Время начала игры (от 0 до 23)
   */
  private startTime: number;

  /**
   * Карта мира
   */
  private map: Map;
  /**
   * Кубик — гг, управляемый персонаж
   */
  private cube: Cube;
  /**
   * Страхи — враги кубика
   */
  private fears: Fear[];

  /**
   * Таймер времени существования мира
   */
  private lifetimeTimer: Timer | null;

  constructor() {
    this.lifetime = 0;
    this.startTime = 12;

    this.map = new Map(15);
    this.cube = new Cube(0, 0);
    this.fears = [];

    this.lifetimeTimer = null;
  }

  /**
   * Время от 0 до 23, где 0 — полночь, а 12 — полдень
   */
  get time(): number {
    return (this.startTime + this.lifetime) % 24;
  }

  /**
   * Время суток — утро (с 6 до 12)
   */
  get isMorning() {
    return this.time >= 6 && this.time < 12;
  }

  /**
   * Время суток — день (с 12 до 18)
   */
  get isAfternoon() {
    return this.time >= 12 && this.time < 18;
  }

  /**
   * Время суток — вечер (с 18 до полуночи)
   */
  get isEvening() {
    return this.time >= 18;
  }

  /**
   * Время суток — ночь (с полуночи до 6)
   */
  get isNight() {
    return this.time < 6;
  }

  /**
   * Среагировать на нажатие пользователем клавиш
   */
  protected onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      // Ход вверх
      case "KeyW":
        this.cube.moveUp();
        break;

      // Ход вниз
      case "KeyS":
        this.cube.moveDown();
        break;

      // Ход вправо
      case "KeyD":
        this.cube.moveRight();
        break;

      // Ход влево
      case "KeyA":
        this.cube.moveLeft();
        break;

      default:
        // игнорируем нажатия на любые другие клавиши
        break;
    }
  };

  /**
   * Запустить мир
   */
  start() {
    // Запуск отсчёта времени мира
    this.lifetimeTimer = setInterval(() => {
      this.lifetime += 1;
    }, 10 * 60 * 1000);

    // Запуск отслеживания действий игрока
    window.addEventListener("keydown", this.onKeyDown);
  }

  /**
   * Остановить мир
   */
  stop() {
    // Остановка отсчёта времени мира
    if (this.lifetimeTimer) {
      clearInterval(this.lifetimeTimer);
      this.lifetimeTimer = null;
    }

    // Остановка отслеживания действий игрока
    window.removeEventListener("keydown", this.onKeyDown);
  }
}