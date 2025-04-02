export class Money {
  private readonly amount: number
  constructor(amount: number) {
    if (!Number.isInteger(amount)){
      throw new Error("Money amount must be an integer (in minor units)")
    }
    this.amount = amount
  }

  public getAmount(): number{
    return this.amount
  }

  public add(other: Money): Money {
    return new Money(this.amount + other.amount)
  }

  public subtract(other: Money): Money {
    return new Money(this.amount - other.amount)
  }

  public format(): string {
    return (this.amount / 100).toFixed(2)
  }
}
