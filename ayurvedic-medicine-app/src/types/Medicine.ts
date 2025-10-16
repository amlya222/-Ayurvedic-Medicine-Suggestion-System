export interface Medicine {
  Disease: string;
  HindiName: string;
  MarathiName: string;
  Symptoms: string;
  DiagnosisTests: string;
  SymptomSeverity: string;
  DurationOfTreatment: string;
  MedicalHistory: string;
  CurrentMedications: string;
  RiskFactors: string;
  EnvironmentalFactors: string;
  SleepPatterns: string;
  StressLevels: string;
  PhysicalActivityLevels: string;
  FamilyHistory: string;
  DietaryHabits: string;
  Allergies: string;
  SeasonalVariation: string;
  AgeGroup: string;
  Gender: string;
  OccupationAndLifestyle: string;
  CulturalPreferences: string;
  HerbalAlternativeRemedies: string;
  AyurvedicHerbs: string;
  Formulation: string;
  Doshas: string;
  ConstitutionPrakriti: string;
  DietAndLifestyleRecommendations: string;
  YogaPhysicalTherapy: string;
  MedicalIntervention: string;
  Prevention: string;
  Prognosis: string;
  Complications: string;
  PatientRecommendations: string;
}

export interface MedicineSearchFilters {
  disease?: string;
  doshas?: string;
  ageGroup?: string;
  gender?: string;
  severity?: string;
}

export interface MedicineSearchResult {
  medicines: Medicine[];
  totalCount: number;
}