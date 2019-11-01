export interface ICityTemperature {
  city: string
  temperature: number
}

export interface ICityData extends ICityTemperature{
  time?: string
  note: string
}
