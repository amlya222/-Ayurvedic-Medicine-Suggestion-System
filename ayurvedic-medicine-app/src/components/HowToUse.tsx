import React from 'react';
import './HowToUse.css';

const HowToUse: React.FC = () => {
  return (
    <main className="main">
      <section className="how-to-use">
        <h1 className="page-title">How to Use</h1>
        
        {/* How It Works Section */}
        <div className="section">
          <p className="section-description">
            Our system analyzes your health information based on Ayurvedic principles to recommend suitable medicines. 
            Simply input your details, and our algorithm will provide personalized suggestions.
          </p>
        </div>

        {/* Step by Step Instructions */}
        <div className="section">
          <h2 className="section-title">Step-by-Step Guide</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Describe Your Symptoms</h3>
                <p className="step-description">
                  Enter your health concerns, symptoms, or conditions in the search box on the home page. 
                  Be as detailed as possible for better recommendations.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Get Personalized Suggestions</h3>
                <p className="step-description">
                  Click "Get Suggestions" to receive personalized Ayurvedic medicine recommendations 
                  based on your specific health concerns.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Review Recommendations</h3>
                <p className="step-description">
                  Review the suggested medicines, their dosages, and benefits. 
                  Each recommendation includes detailed information about usage and effects.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Consult Healthcare Provider</h3>
                <p className="step-description">
                  Always consult with a qualified Ayurvedic practitioner or healthcare provider 
                  before starting any new treatment or medicine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="section">
          <h2 className="section-title">Tips for Better Results</h2>
          <div className="tips-container">
            <div className="tip">
              <h3 className="tip-title">🌿 Be Specific</h3>
              <p className="tip-description">
                Describe your symptoms in detail. Instead of "I feel sick," try "I have a fever with headache and body aches."
              </p>
            </div>

            <div className="tip">
              <h3 className="tip-title">📝 Include Duration</h3>
              <p className="tip-description">
                Mention how long you've been experiencing symptoms. This helps in providing more accurate recommendations.
              </p>
            </div>

            <div className="tip">
              <h3 className="tip-title">💊 Mention Current Medications</h3>
              <p className="tip-description">
                If you're taking any medications, include this information to avoid potential interactions.
              </p>
            </div>

            <div className="tip">
              <h3 className="tip-title">🏥 Professional Consultation</h3>
              <p className="tip-description">
                This system provides general recommendations. Always consult healthcare professionals for proper diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="section disclaimer-section">
          <h2 className="section-title">Important Disclaimer</h2>
          <div className="disclaimer-content">
            <p className="disclaimer-text">
              ⚠️ This Ayurvedic Medicine Suggestion System is for informational purposes only. 
              The recommendations provided are based on general Ayurvedic principles and should not replace 
              professional medical advice. Always consult with a qualified Ayurvedic practitioner or healthcare 
              provider for proper diagnosis and treatment. The system does not guarantee the effectiveness of 
              any suggested medicines and is not responsible for any adverse effects.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowToUse; 