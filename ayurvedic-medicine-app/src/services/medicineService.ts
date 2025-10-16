import Papa from 'papaparse';
import { Medicine, MedicineSearchFilters, MedicineSearchResult } from '../types/Medicine';

class MedicineService {
  private medicines: Medicine[] = [];
  private isLoaded = false;

  private normalize(value?: string): string {
    return (value ?? '').toString().toLowerCase().trim();
  }

  async loadMedicines(): Promise<Medicine[]> {
    if (this.isLoaded && this.medicines.length > 0) {
      return this.medicines;
    }

    try {
      const response = await fetch('/AyurGenixAI_Dataset.csv');
      
      if (!response.ok) {
        throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('CSV parsing warnings:', results.errors);
            }
            this.medicines = results.data as Medicine[];
            this.isLoaded = true;
            console.log(`Loaded ${this.medicines.length} medicines from CSV`);
            resolve(this.medicines);
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error loading CSV file:', error);
      throw new Error(`Unable to load medicine database. Please ensure the CSV file is available. ${error}`);
    }
  }

  async getAllMedicines(): Promise<Medicine[]> {
    return this.loadMedicines();
  }

  async searchMedicines(filters: MedicineSearchFilters): Promise<MedicineSearchResult> {
    const allMedicines = await this.loadMedicines();
    
    let filteredMedicines = allMedicines;

    if (filters.disease) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        this.normalize(medicine.Disease).includes(this.normalize(filters.disease)) ||
        this.normalize(medicine.HindiName).includes(this.normalize(filters.disease)) ||
        this.normalize(medicine.MarathiName).includes(this.normalize(filters.disease))
      );
    }

    if (filters.doshas) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        this.normalize(medicine.Doshas).includes(this.normalize(filters.doshas))
      );
    }

    if (filters.ageGroup) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        this.normalize(medicine.AgeGroup).includes(this.normalize(filters.ageGroup))
      );
    }

    if (filters.gender) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        this.normalize(medicine.Gender).includes(this.normalize(filters.gender))
      );
    }

    if (filters.severity) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        this.normalize(medicine.SymptomSeverity).includes(this.normalize(filters.severity))
      );
    }

    return {
      medicines: filteredMedicines,
      totalCount: filteredMedicines.length
    };
  }

  async getMedicineByDisease(diseaseName: string): Promise<Medicine | undefined> {
    const allMedicines = await this.loadMedicines();
    return allMedicines.find(medicine =>
      this.normalize(medicine.Disease) === this.normalize(diseaseName) ||
      this.normalize(medicine.HindiName) === this.normalize(diseaseName) ||
      this.normalize(medicine.MarathiName) === this.normalize(diseaseName)
    );
  }

  async getUniqueDiseases(): Promise<string[]> {
    const allMedicines = await this.loadMedicines();
    const diseases = allMedicines.map(medicine => medicine.Disease).filter(Boolean) as string[];
    return Array.from(new Set(diseases)).sort();
  }

  async getUniqueDoshas(): Promise<string[]> {
    const allMedicines = await this.loadMedicines();
    const doshas = allMedicines.map(medicine => medicine.Doshas).filter(Boolean) as string[];
    return Array.from(new Set(doshas)).sort();
  }

  async getUniqueAgeGroups(): Promise<string[]> {
    const allMedicines = await this.loadMedicines();
    const ageGroups = allMedicines.map(medicine => medicine.AgeGroup).filter(Boolean) as string[];
    return Array.from(new Set(ageGroups)).sort();
  }
}

export const medicineService = new MedicineService();