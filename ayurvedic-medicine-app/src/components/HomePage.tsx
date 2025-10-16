import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../Assets/hero_background.png';
import { medicineService } from '../services/medicineService';
import { imageService } from '../services/imageService';
import { Medicine } from '../types/Medicine';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [medicineImages, setMedicineImages] = useState<Record<string, string>>({});
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});
  
  // Function to load image for a specific medicine
const loadMedicineImage = useCallback(async (diseaseName: string) => {
  const cacheKey = diseaseName.toLowerCase().trim();
  if (imageLoadingStates[cacheKey] || medicineImages[cacheKey]) {
    return;
  }

  setImageLoadingStates(prev => ({ ...prev, [cacheKey]: true }));

  try {
    const imageUrl = await imageService.generateDiseaseImage(diseaseName);
    setMedicineImages(prev => ({ ...prev, [cacheKey]: imageUrl }));
  } catch (error) {
    console.error('Failed to load image for:', diseaseName, error);
  } finally {
    setImageLoadingStates(prev => ({ ...prev, [cacheKey]: false }));
  }
},[imageLoadingStates, medicineImages]);

  // Load images for all suggestions
  useEffect(() => {
    console.log('useEffect triggered, suggestions:', suggestions.length);
    if (suggestions.length > 0) {
      console.log('Loading images for suggestions:', suggestions.map(m => m.Disease));
      suggestions.forEach(medicine => {
        loadMedicineImage(medicine.Disease);
      });
    }
  }, [suggestions, loadMedicineImage]);


  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter your health concerns');
      return;
    }

    setIsLoading(true);
    
    try {
      const allMedicines = await medicineService.getAllMedicines();
      const query = searchQuery.toLowerCase().trim();
      
      // Create a more intelligent search that looks for multiple keywords
      const searchTerms = query.split(/\s+/);
      
      const filteredMedicines = allMedicines.filter(medicine => {
        const searchableText = [
          medicine.Disease,
          medicine.Symptoms,
          medicine.AyurvedicHerbs,
          medicine.HindiName,
          medicine.MarathiName,
          medicine.Formulation,
          medicine.Doshas
        ].join(' ').toLowerCase();
        
        // Check if any search term matches
        return searchTerms.some(term => searchableText.includes(term));
      });
      
      // Sort by relevance (exact matches first, then partial matches)
      const sortedMedicines = filteredMedicines.sort((a, b) => {
        const aText = a.Disease.toLowerCase();
        const bText = b.Disease.toLowerCase();
        
        // Exact match gets highest priority
        if (aText === query) return -1;
        if (bText === query) return 1;
        
        // Starts with query gets second priority
        if (aText.startsWith(query)) return -1;
        if (bText.startsWith(query)) return 1;
        
        // Contains query gets third priority
        if (aText.includes(query)) return -1;
        if (bText.includes(query)) return 1;
        
        return 0;
      });
      
      if (sortedMedicines.length === 0) {
        alert('No medicines found for your query. Please try different keywords or visit our Advanced Medicine Search for more options.');
        setSuggestions([]);
      } else {
        setSuggestions(sortedMedicines.slice(0, 5)); // Limit to 5 suggestions
      }
    } catch (error) {
      console.error('Error searching medicines:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Sorry, there was an error searching for medicines: ${errorMessage}. Please try again or visit our Advanced Medicine Search.`);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Personalized Ayurvedic Medicine</h1>
            <p className="hero-subtitle">Enter your health details to receive tailored Ayurvedic medicine suggestions</p>
            
            <div className="search-container">
              <div className="search-box">
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., cough, fever, headache, diabetes, arthritis..."
                    className="search-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="search-button"
                >
                  {isLoading ? 'Analyzing...' : 'Get Suggestions'}
                </button>
              </div>
              <div className="advanced-search-link">
                <p>For detailed search with filters, visit our</p>
                <Link to="/medicine-search" className="advanced-link">
                  Advanced Medicine Search
                </Link>
              </div>
              
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {suggestions.length > 0 && (
        <section className="results">
          <h2 className="section-title">Your Personalized Recommendations</h2>
          <p className="results-info">Found {suggestions.length} medicine(s) for "{searchQuery}"</p>
          <div className="suggestions-grid">
            {suggestions.map((medicine, index) => {
              const cacheKey = medicine.Disease.toLowerCase().trim();
              const imageUrl = medicineImages[cacheKey];
              const isImageLoading = imageLoadingStates[cacheKey];
              
              return (
                <div key={index} className="medicine-card">
                  {/* Medicine Image */}
                  <div className="medicine-image-container">
                    {isImageLoading ? (
                      <div className="image-loading">
                        <div className="loading-spinner"></div>
                        <span>Generating image...</span>
                      </div>
                    ) : imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={`${medicine.Disease} medical illustration`}
                        className="medicine-image"
                        onError={(e) => {
                          console.error('Failed to load image:', imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>📋</span>
                        <span>Medical Image</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="medicine-name">{medicine.Disease}</h3>
                  <div className="disease-names">
                    {medicine.HindiName && <span className="hindi-name">Hindi: {medicine.HindiName}</span>}
                    {medicine.MarathiName && <span className="marathi-name">Marathi: {medicine.MarathiName}</span>}
                  </div>
                <div className="medicine-details">
                  {medicine.Symptoms && (
                    <div className="detail-item">
                      <span className="detail-label">🔍 Symptoms:</span>
                      <span className="detail-value">{medicine.Symptoms}</span>
                    </div>
                  )}
                  {medicine.AyurvedicHerbs && (
                    <div className="detail-item">
                      <span className="detail-label">🌿 Ayurvedic Herbs:</span>
                      <span className="detail-value">{medicine.AyurvedicHerbs}</span>
                    </div>
                  )}
                  {medicine.Formulation && (
                    <div className="detail-item">
                      <span className="detail-label">💊 Formulation:</span>
                      <span className="detail-value">{medicine.Formulation}</span>
                    </div>
                  )}
                  {medicine.Doshas && (
                    <div className="detail-item">
                      <span className="detail-label">⚖️ Doshas:</span>
                      <span className="detail-value">{medicine.Doshas}</span>
                    </div>
                  )}
                  {medicine.DietAndLifestyleRecommendations && (
                    <div className="detail-item">
                      <span className="detail-label">🍽️ Diet & Lifestyle:</span>
                      <span className="detail-value">{medicine.DietAndLifestyleRecommendations}</span>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage; 