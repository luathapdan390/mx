
export interface LeadershipMistake {
  id: number;
  part: string;
  category: string;
  mistake: string;
  solution: string;
}

export enum LeadershipPart {
  PART1 = "Tư duy & Bản thân",
  PART2 = "Kết nối & Phát triển",
  PART3 = "Tầm nhìn & Chiến lược",
  PART4 = "Văn hóa & Hệ thống",
  PART5 = "Phát triển Kế cận"
}
