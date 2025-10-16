import React, { useState, useEffect } from 'react';
import { Medicine, MedicineSearchFilters } from '../types/Medicine';
import { medicineService } from '../services/medicineService';
import './MedicineSearch.css';

const MedicineSearch: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<MedicineSearchFilters>({});
  const [uniqueDiseases, setUniqueDiseases] = useState<string[]>([]);
  const [uniqueDoshas, setUniqueDoshas] = useState<string[]>([]);
  const [uniqueAgeGroups, setUniqueAgeGroups] = useState<string[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [diseases, doshas, ageGroups] = await Promise.all([
        medicineService.getUniqueDiseases(),
        medicineService.getUniqueDoshas(),
        medicineService.getUniqueAgeGroups()
      ]);
      setUniqueDiseases(diseases);
      setUniqueDoshas(doshas);
      setUniqueAgeGroups(ageGroups);
    } catch (err) {
      setError('Failed to load initial data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await medicineService.searchMedicines(searchFilters);
      setMedicines(result.medicines);
    } catch (err) {
      setError('Failed to search medicines');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof MedicineSearchFilters, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const clearFilters = () => {
    setSearchFilters({});
    setMedicines([]);
  };

  return (
    <div className="medicine-search">
      <div className="search-header">
        <h2>Ayurvedic Medicine Search</h2>
        <p>Search through our comprehensive database of Ayurvedic treatments</p>
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label htmlFor="disease">Disease/Condition:</label>
          <select
            id="disease"
            value={searchFilters.disease || ''}
            onChange={(e) => handleFilterChange('disease', e.target.value)}
          >
            <option value="">All Diseases</option>
            {uniqueDiseases.map(disease => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="doshas">Doshas:</label>
          <select
            id="doshas"
            value={searchFilters.doshas || ''}
            onChange={(e) => handleFilterChange('doshas', e.target.value)}
          >
            <option value="">All Doshas</option>
            {uniqueDoshas.map(dosha => (
              <option key={dosha} value={dosha}>{dosha}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="ageGroup">Age Group:</label>
          <select
            id="ageGroup"
            value={searchFilters.ageGroup || ''}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
          >
            <option value="">All Ages</option>
            {uniqueAgeGroups.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={searchFilters.gender || ''}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="severity">Severity:</label>
          <select
            id="severity"
            value={searchFilters.severity || ''}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="filter-actions">
          <button onClick={handleSearch} disabled={loading} className="search-btn">
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button onClick={clearFilters} className="clear-btn">
            Clear Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="search-results">
        {medicines.length > 0 && (
          <div className="results-header">
            <h3>Search Results ({medicines.length} found)</h3>
          </div>
        )}

        <div className="medicine-cards">
          {medicines.map((medicine, index) => (
            <div key={index} className="medicine-card">
              <div className="card-header">
                <h3>{medicine.Disease}</h3>
                <div className="disease-names">
                  <span className="hindi-name">{medicine.HindiName}</span>
                  <span className="marathi-name">{medicine.MarathiName}</span>
                </div>
              </div>

              <div className="card-content">
                <div className="info-section">
                  <h4>Symptoms</h4>
                  <p>{medicine.Symptoms}</p>
                </div>

                <div className="info-section">
                  <h4>Ayurvedic Herbs</h4>
                  <p>{medicine.AyurvedicHerbs}</p>
                </div>

                <div className="info-section">
                  <h4>Formulation</h4>
                  <p>{medicine.Formulation}</p>
                </div>

                <div className="info-section">
                  <h4>Doshas</h4>
                  <p>{medicine.Doshas}</p>
                </div>

                <div className="info-section">
                  <h4>Diet & Lifestyle Recommendations</h4>
                  <p>{medicine.DietAndLifestyleRecommendations}</p>
                </div>

                <div className="info-section">
                  <h4>Yoga & Physical Therapy</h4>
                  <p>{medicine.YogaPhysicalTherapy}</p>
                </div>

                <div className="info-section">
                  <h4>Prevention</h4>
                  <p>{medicine.Prevention}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearch;