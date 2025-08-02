import React, { useState } from 'react';
import heroBackground from '../Assets/hero_background.png';
import './HomePage.css';

interface Medicine {
  id: number;
  name: string;
  description: string;
  dosage: string;
  benefits: string[];
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter your health concerns');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockSuggestions: Medicine[] = [
        {
          id: 1,
          name: 'Tulsi (Holy Basil)',
          description: 'Natural immunity booster and respiratory health support',
          dosage: '1-2 leaves daily or as tea',
          benefits: ['Boosts immunity', 'Relieves cough and cold', 'Reduces fever']
        },
        {
          id: 2,
          name: 'Ginger (Adrak)',
          description: 'Powerful anti-inflammatory and digestive aid',
          dosage: '1 inch fresh ginger or 1 tsp powder',
          benefits: ['Improves digestion', 'Relieves nausea', 'Reduces inflammation']
        },
        {
          id: 3,
          name: 'Turmeric (Haldi)',
          description: 'Golden spice with powerful healing properties',
          dosage: '1/4 tsp with warm milk or water',
          benefits: ['Anti-inflammatory', 'Boosts immunity', 'Natural pain reliever']
        }
      ];
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 2000);
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
                    placeholder="Describe your health concerns"
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
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {suggestions.length > 0 && (
        <section className="results">
          <h2 className="section-title">Your Personalized Recommendations</h2>
          <div className="suggestions-grid">
            {suggestions.map((medicine) => (
              <div key={medicine.id} className="medicine-card">
                <h3 className="medicine-name">{medicine.name}</h3>
                <p className="medicine-description">{medicine.description}</p>
                <div className="medicine-details">
                  <div className="detail-item">
                    <span className="detail-label">💡 Dosage:</span>
                    <span className="detail-value">{medicine.dosage}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">✨ Benefits:</span>
                    <ul className="benefits-list">
                      {medicine.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="benefit-item">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage; 